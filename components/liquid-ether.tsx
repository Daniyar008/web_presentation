"use client"

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface LiquidEtherProps {
    mouseForce?: number
    cursorSize?: number
    isViscous?: boolean
    viscous?: number
    iterationsViscous?: number
    iterationsPoisson?: number
    dt?: number
    BFECC?: boolean
    resolution?: number
    isBounce?: boolean
    colors?: string[]
    style?: React.CSSProperties
    className?: string
    autoDemo?: boolean
    autoSpeed?: number
    autoIntensity?: number
    takeoverDuration?: number
    autoResumeDelay?: number
    autoRampDuration?: number
}

export default function LiquidEther({
    mouseForce = 20,
    cursorSize = 100,
    isViscous = false,
    viscous = 30,
    iterationsViscous = 32,
    iterationsPoisson = 32,
    dt = 0.014,
    BFECC = true,
    resolution = 0.5,
    isBounce = false,
    colors = ['#9D4EDD', '#C77DFF', '#E0AAFF'],
    style = {},
    className = '',
    autoDemo = true,
    autoSpeed = 0.5,
    autoIntensity = 2.2,
    takeoverDuration = 0.25,
    autoResumeDelay = 1000,
    autoRampDuration = 0.6
}: LiquidEtherProps) {
    const mountRef = useRef<HTMLDivElement>(null)
    const webglRef = useRef<any>(null)
    const rafRef = useRef<number | null>(null)
    const isVisibleRef = useRef(true)

    useEffect(() => {
        if (!mountRef.current) return

        function makePaletteTexture(stops: string[]) {
            let arr: string[]
            if (Array.isArray(stops) && stops.length > 0) {
                if (stops.length === 1) {
                    arr = [stops[0], stops[0]]
                } else {
                    arr = stops
                }
            } else {
                arr = ['#ffffff', '#ffffff']
            }
            const w = arr.length
            const data = new Uint8Array(w * 4)
            for (let i = 0; i < w; i++) {
                const c = new THREE.Color(arr[i])
                data[i * 4 + 0] = Math.round(c.r * 255)
                data[i * 4 + 1] = Math.round(c.g * 255)
                data[i * 4 + 2] = Math.round(c.b * 255)
                data[i * 4 + 3] = 255
            }
            const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat)
            tex.magFilter = THREE.LinearFilter
            tex.minFilter = THREE.LinearFilter
            tex.wrapS = THREE.ClampToEdgeWrapping
            tex.wrapT = THREE.ClampToEdgeWrapping
            tex.generateMipmaps = false
            tex.needsUpdate = true
            return tex
        }

        const paletteTex = makePaletteTexture(colors)
        const bgVec4 = new THREE.Vector4(0, 0, 0, 0)

        // Common class for managing renderer
        class CommonClass {
            width = 0
            height = 0
            aspect = 1
            pixelRatio = 1
            time = 0
            delta = 0
            container: HTMLElement | null = null
            renderer: THREE.WebGLRenderer | null = null
            clock: THREE.Clock | null = null

            init(container: HTMLElement) {
                this.container = container
                this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
                this.resize()
                this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
                this.renderer.autoClear = false
                this.renderer.setClearColor(new THREE.Color(0x000000), 0)
                this.renderer.setPixelRatio(this.pixelRatio)
                this.renderer.setSize(this.width, this.height)
                this.renderer.domElement.style.width = '100%'
                this.renderer.domElement.style.height = '100%'
                this.renderer.domElement.style.display = 'block'
                this.clock = new THREE.Clock()
                this.clock.start()
            }

            resize() {
                if (!this.container) return
                const rect = this.container.getBoundingClientRect()
                this.width = Math.max(1, Math.floor(rect.width))
                this.height = Math.max(1, Math.floor(rect.height))
                this.aspect = this.width / this.height
                if (this.renderer) this.renderer.setSize(this.width, this.height, false)
            }

            update() {
                if (!this.clock) return
                this.delta = this.clock.getDelta()
                this.time += this.delta
            }
        }
        const Common = new CommonClass()

        // Mouse class
        class MouseClass {
            mouseMoved = false
            coords = new THREE.Vector2()
            coords_old = new THREE.Vector2()
            diff = new THREE.Vector2()
            timer: ReturnType<typeof setTimeout> | null = null
            container: HTMLElement | null = null
            isHoverInside = false
            hasUserControl = false
            isAutoActive = false
            autoIntensity = 2.0
            takeoverActive = false
            takeoverStartTime = 0
            takeoverDuration = 0.25
            takeoverFrom = new THREE.Vector2()
            takeoverTo = new THREE.Vector2()
            onInteract: (() => void) | null = null
            listenerTarget: Window | null = null

            init(container: HTMLElement) {
                this.container = container
                this.listenerTarget = window
                this.listenerTarget.addEventListener('mousemove', this.onMouseMove)
                this.listenerTarget.addEventListener('touchstart', this.onTouchStart, { passive: true })
                this.listenerTarget.addEventListener('touchmove', this.onTouchMove, { passive: true })
            }

            dispose() {
                if (this.listenerTarget) {
                    this.listenerTarget.removeEventListener('mousemove', this.onMouseMove)
                    this.listenerTarget.removeEventListener('touchstart', this.onTouchStart)
                    this.listenerTarget.removeEventListener('touchmove', this.onTouchMove)
                }
            }

            isPointInside(clientX: number, clientY: number) {
                if (!this.container) return false
                const rect = this.container.getBoundingClientRect()
                return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom
            }

            setCoords(x: number, y: number) {
                if (!this.container) return
                if (this.timer) clearTimeout(this.timer)
                const rect = this.container.getBoundingClientRect()
                if (rect.width === 0 || rect.height === 0) return
                const nx = (x - rect.left) / rect.width
                const ny = (y - rect.top) / rect.height
                this.coords.set(nx * 2 - 1, -(ny * 2 - 1))
                this.mouseMoved = true
                this.timer = setTimeout(() => { this.mouseMoved = false }, 100)
            }

            setNormalized(nx: number, ny: number) {
                this.coords.set(nx, ny)
                this.mouseMoved = true
            }

            onMouseMove = (event: MouseEvent) => {
                this.isHoverInside = this.isPointInside(event.clientX, event.clientY)
                if (!this.isHoverInside) return
                if (this.onInteract) this.onInteract()
                this.setCoords(event.clientX, event.clientY)
                this.hasUserControl = true
            }

            onTouchStart = (event: TouchEvent) => {
                if (event.touches.length !== 1) return
                const t = event.touches[0]
                this.isHoverInside = this.isPointInside(t.clientX, t.clientY)
                if (!this.isHoverInside) return
                if (this.onInteract) this.onInteract()
                this.setCoords(t.clientX, t.clientY)
                this.hasUserControl = true
            }

            onTouchMove = (event: TouchEvent) => {
                if (event.touches.length !== 1) return
                const t = event.touches[0]
                this.isHoverInside = this.isPointInside(t.clientX, t.clientY)
                if (!this.isHoverInside) return
                if (this.onInteract) this.onInteract()
                this.setCoords(t.clientX, t.clientY)
            }

            update() {
                this.diff.subVectors(this.coords, this.coords_old)
                this.coords_old.copy(this.coords)
                if (this.isAutoActive) this.diff.multiplyScalar(this.autoIntensity)
            }
        }
        const Mouse = new MouseClass()

        // AutoDriver for automatic animation
        class AutoDriver {
            enabled: boolean
            speed: number
            resumeDelay: number
            active = false
            current = new THREE.Vector2(0, 0)
            target = new THREE.Vector2()
            lastTime = performance.now()
            margin = 0.2
            lastUserInteraction: number
            mouse: MouseClass

            constructor(mouse: MouseClass, lastUserInteraction: number, opts: { enabled: boolean; speed: number; resumeDelay: number }) {
                this.mouse = mouse
                this.enabled = opts.enabled
                this.speed = opts.speed
                this.resumeDelay = opts.resumeDelay
                this.lastUserInteraction = lastUserInteraction
                this.pickNewTarget()
            }

            pickNewTarget() {
                this.target.set(
                    (Math.random() * 2 - 1) * (1 - this.margin),
                    (Math.random() * 2 - 1) * (1 - this.margin)
                )
            }

            forceStop() {
                this.active = false
                this.mouse.isAutoActive = false
            }

            update(lastUserInteraction: number) {
                if (!this.enabled) return
                const now = performance.now()
                const idle = now - lastUserInteraction

                if (idle < this.resumeDelay || this.mouse.isHoverInside) {
                    if (this.active) this.forceStop()
                    return
                }

                if (!this.active) {
                    this.active = true
                    this.current.copy(this.mouse.coords)
                    this.lastTime = now
                }

                this.mouse.isAutoActive = true
                let dtSec = (now - this.lastTime) / 1000
                this.lastTime = now
                if (dtSec > 0.2) dtSec = 0.016

                const dir = new THREE.Vector2().subVectors(this.target, this.current)
                const dist = dir.length()
                if (dist < 0.01) {
                    this.pickNewTarget()
                    return
                }
                dir.normalize()
                const step = this.speed * dtSec
                const move = Math.min(step, dist)
                this.current.addScaledVector(dir, move)
                this.mouse.setNormalized(this.current.x, this.current.y)
            }
        }

        // Shader sources
        const face_vert = `
      attribute vec3 position;
      uniform vec2 px;
      uniform vec2 boundarySpace;
      varying vec2 uv;
      precision highp float;
      void main(){
        vec3 pos = position;
        vec2 scale = 1.0 - boundarySpace * 2.0;
        pos.xy = pos.xy * scale;
        uv = vec2(0.5)+(pos.xy)*0.5;
        gl_Position = vec4(pos, 1.0);
      }
    `

        const mouse_vert = `
      precision highp float;
      attribute vec3 position;
      attribute vec2 uv;
      uniform vec2 center;
      uniform vec2 scale;
      uniform vec2 px;
      varying vec2 vUv;
      void main(){
        vec2 pos = position.xy * scale * 2.0 * px + center;
        vUv = uv;
        gl_Position = vec4(pos, 0.0, 1.0);
      }
    `

        const advection_frag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform float dt;
      uniform bool isBFECC;
      uniform vec2 fboSize;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
        if(isBFECC == false){
          vec2 vel = texture2D(velocity, uv).xy;
          vec2 uv2 = uv - vel * dt * ratio;
          vec2 newVel = texture2D(velocity, uv2).xy;
          gl_FragColor = vec4(newVel, 0.0, 0.0);
        } else {
          vec2 spot_new = uv;
          vec2 vel_old = texture2D(velocity, uv).xy;
          vec2 spot_old = spot_new - vel_old * dt * ratio;
          vec2 vel_new1 = texture2D(velocity, spot_old).xy;
          vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
          vec2 error = spot_new2 - spot_new;
          vec2 spot_new3 = spot_new - error / 2.0;
          vec2 vel_2 = texture2D(velocity, spot_new3).xy;
          vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
          vec2 newVel2 = texture2D(velocity, spot_old2).xy;
          gl_FragColor = vec4(newVel2, 0.0, 0.0);
        }
      }
    `

        const color_frag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform sampler2D palette;
      uniform vec4 bgColor;
      varying vec2 uv;
      void main(){
        vec2 vel = texture2D(velocity, uv).xy;
        float lenv = clamp(length(vel), 0.0, 1.0);
        vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
        vec3 outRGB = mix(bgColor.rgb, c, lenv);
        float outA = mix(bgColor.a, 1.0, lenv);
        gl_FragColor = vec4(outRGB, outA);
      }
    `

        const divergence_frag = `
      precision highp float;
      uniform sampler2D velocity;
      uniform float dt;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;
        float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;
        float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;
        float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;
        float divergence = (x1 - x0 + y1 - y0) / 2.0;
        gl_FragColor = vec4(divergence / dt);
      }
    `

        const externalForce_frag = `
      precision highp float;
      uniform vec2 force;
      uniform vec2 center;
      uniform vec2 scale;
      uniform vec2 px;
      varying vec2 vUv;
      void main(){
        vec2 circle = (vUv - 0.5) * 2.0;
        float d = 1.0 - min(length(circle), 1.0);
        d *= d;
        gl_FragColor = vec4(force * d, 0.0, 1.0);
      }
    `

        const poisson_frag = `
      precision highp float;
      uniform sampler2D pressure;
      uniform sampler2D divergence;
      uniform vec2 px;
      varying vec2 uv;
      void main(){
        float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;
        float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;
        float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;
        float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;
        float div = texture2D(divergence, uv).r;
        float newP = (p0 + p1 + p2 + p3) / 4.0 - div;
        gl_FragColor = vec4(newP);
      }
    `

        const pressure_frag = `
      precision highp float;
      uniform sampler2D pressure;
      uniform sampler2D velocity;
      uniform vec2 px;
      uniform float dt;
      varying vec2 uv;
      void main(){
        float step = 1.0;
        float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;
        float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;
        float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;
        float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;
        vec2 v = texture2D(velocity, uv).xy;
        vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
        v = v - gradP * dt;
        gl_FragColor = vec4(v, 0.0, 1.0);
      }
    `

        // Simplified simulation classes
        class ShaderPass {
            scene: THREE.Scene
            camera: THREE.Camera
            material: THREE.RawShaderMaterial | null = null
            plane: THREE.Mesh | null = null
            uniforms: any
            output: THREE.WebGLRenderTarget | null

            constructor(props: any) {
                this.scene = new THREE.Scene()
                this.camera = new THREE.Camera()
                this.output = props.output || null
                this.uniforms = props.material?.uniforms
                if (this.uniforms) {
                    this.material = new THREE.RawShaderMaterial(props.material)
                    const geometry = new THREE.PlaneGeometry(2.0, 2.0)
                    this.plane = new THREE.Mesh(geometry, this.material)
                    this.scene.add(this.plane)
                }
            }

            update() {
                if (!Common.renderer) return
                Common.renderer.setRenderTarget(this.output)
                Common.renderer.render(this.scene, this.camera)
                Common.renderer.setRenderTarget(null)
            }
        }

        // Simulation class
        class Simulation {
            options: any
            fbos: { [key: string]: THREE.WebGLRenderTarget }
            fboSize = new THREE.Vector2()
            cellScale = new THREE.Vector2()
            boundarySpace = new THREE.Vector2()
            advection: ShaderPass | null = null
            externalForce: any = null
            divergence: ShaderPass | null = null
            poisson: ShaderPass | null = null
            pressure: ShaderPass | null = null

            constructor(options: any) {
                this.options = {
                    iterations_poisson: iterationsPoisson,
                    iterations_viscous: iterationsViscous,
                    mouse_force: mouseForce,
                    resolution: resolution,
                    cursor_size: cursorSize,
                    viscous: viscous,
                    isBounce: isBounce,
                    dt: dt,
                    isViscous: isViscous,
                    BFECC: BFECC,
                    ...options
                }
                this.fbos = {}
                this.init()
            }

            init() {
                this.calcSize()
                this.createAllFBO()
                this.createShaderPass()
            }

            createAllFBO() {
                const isIOS = /(iPad|iPhone|iPod)/i.test(navigator.userAgent)
                const type = isIOS ? THREE.HalfFloatType : THREE.FloatType
                const opts: THREE.RenderTargetOptions = {
                    type,
                    depthBuffer: false,
                    stencilBuffer: false,
                    minFilter: THREE.LinearFilter,
                    magFilter: THREE.LinearFilter,
                    wrapS: THREE.ClampToEdgeWrapping,
                    wrapT: THREE.ClampToEdgeWrapping
                }
                const keys = ['vel_0', 'vel_1', 'div', 'pressure_0', 'pressure_1']
                for (const key of keys) {
                    this.fbos[key] = new THREE.WebGLRenderTarget(this.fboSize.x, this.fboSize.y, opts)
                }
            }

            createShaderPass() {
                // Advection
                this.advection = new ShaderPass({
                    material: {
                        vertexShader: face_vert,
                        fragmentShader: advection_frag,
                        uniforms: {
                            boundarySpace: { value: this.cellScale },
                            px: { value: this.cellScale },
                            fboSize: { value: this.fboSize },
                            velocity: { value: this.fbos.vel_0.texture },
                            dt: { value: this.options.dt },
                            isBFECC: { value: true }
                        }
                    },
                    output: this.fbos.vel_1
                })

                // External Force
                const mouseScene = new THREE.Scene()
                const mouseCamera = new THREE.Camera()
                const mouseGeom = new THREE.PlaneGeometry(1, 1)
                const mouseMat = new THREE.RawShaderMaterial({
                    vertexShader: mouse_vert,
                    fragmentShader: externalForce_frag,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false,
                    uniforms: {
                        px: { value: this.cellScale },
                        force: { value: new THREE.Vector2(0, 0) },
                        center: { value: new THREE.Vector2(0, 0) },
                        scale: { value: new THREE.Vector2(this.options.cursor_size, this.options.cursor_size) }
                    }
                })
                const mouseMesh = new THREE.Mesh(mouseGeom, mouseMat)
                mouseScene.add(mouseMesh)
                this.externalForce = { scene: mouseScene, camera: mouseCamera, mesh: mouseMesh, uniforms: mouseMat.uniforms }

                // Divergence
                this.divergence = new ShaderPass({
                    material: {
                        vertexShader: face_vert,
                        fragmentShader: divergence_frag,
                        uniforms: {
                            boundarySpace: { value: this.boundarySpace },
                            velocity: { value: this.fbos.vel_1.texture },
                            px: { value: this.cellScale },
                            dt: { value: this.options.dt }
                        }
                    },
                    output: this.fbos.div
                })

                // Poisson
                this.poisson = new ShaderPass({
                    material: {
                        vertexShader: face_vert,
                        fragmentShader: poisson_frag,
                        uniforms: {
                            boundarySpace: { value: this.boundarySpace },
                            pressure: { value: this.fbos.pressure_0.texture },
                            divergence: { value: this.fbos.div.texture },
                            px: { value: this.cellScale }
                        }
                    },
                    output: this.fbos.pressure_1
                })

                // Pressure
                this.pressure = new ShaderPass({
                    material: {
                        vertexShader: face_vert,
                        fragmentShader: pressure_frag,
                        uniforms: {
                            boundarySpace: { value: this.boundarySpace },
                            pressure: { value: this.fbos.pressure_0.texture },
                            velocity: { value: this.fbos.vel_1.texture },
                            px: { value: this.cellScale },
                            dt: { value: this.options.dt }
                        }
                    },
                    output: this.fbos.vel_0
                })
            }

            calcSize() {
                const width = Math.max(1, Math.round(this.options.resolution * Common.width))
                const height = Math.max(1, Math.round(this.options.resolution * Common.height))
                this.cellScale.set(1.0 / width, 1.0 / height)
                this.fboSize.set(width, height)
            }

            resize() {
                this.calcSize()
                for (const key in this.fbos) {
                    this.fbos[key].setSize(this.fboSize.x, this.fboSize.y)
                }
            }

            update() {
                this.boundarySpace.copy(this.cellScale)

                // Advection
                if (this.advection) {
                    this.advection.uniforms.dt.value = this.options.dt
                    this.advection.update()
                }

                // External Force
                if (this.externalForce && Common.renderer) {
                    const forceX = (Mouse.diff.x / 2) * this.options.mouse_force
                    const forceY = (Mouse.diff.y / 2) * this.options.mouse_force
                    const cursorSizeX = this.options.cursor_size * this.cellScale.x
                    const cursorSizeY = this.options.cursor_size * this.cellScale.y
                    const centerX = Math.min(Math.max(Mouse.coords.x, -1 + cursorSizeX), 1 - cursorSizeX)
                    const centerY = Math.min(Math.max(Mouse.coords.y, -1 + cursorSizeY), 1 - cursorSizeY)

                    this.externalForce.uniforms.force.value.set(forceX, forceY)
                    this.externalForce.uniforms.center.value.set(centerX, centerY)
                    this.externalForce.uniforms.scale.value.set(this.options.cursor_size, this.options.cursor_size)

                    Common.renderer.setRenderTarget(this.fbos.vel_1)
                    Common.renderer.render(this.externalForce.scene, this.externalForce.camera)
                    Common.renderer.setRenderTarget(null)
                }

                // Divergence
                if (this.divergence) {
                    this.divergence.uniforms.velocity.value = this.fbos.vel_1.texture
                    this.divergence.update()
                }

                // Poisson iterations
                if (this.poisson) {
                    for (let i = 0; i < this.options.iterations_poisson; i++) {
                        const p_in = i % 2 === 0 ? this.fbos.pressure_0 : this.fbos.pressure_1
                        const p_out = i % 2 === 0 ? this.fbos.pressure_1 : this.fbos.pressure_0
                        this.poisson.uniforms.pressure.value = p_in.texture
                        this.poisson.output = p_out
                        this.poisson.update()
                    }
                }

                // Pressure
                if (this.pressure) {
                    this.pressure.uniforms.velocity.value = this.fbos.vel_1.texture
                    this.pressure.uniforms.pressure.value = this.fbos.pressure_0.texture
                    this.pressure.update()
                }
            }
        }

        // Output class
        class Output {
            simulation: Simulation
            scene: THREE.Scene
            camera: THREE.Camera
            output: THREE.Mesh

            constructor() {
                this.simulation = new Simulation({})
                this.scene = new THREE.Scene()
                this.camera = new THREE.Camera()
                this.output = new THREE.Mesh(
                    new THREE.PlaneGeometry(2, 2),
                    new THREE.RawShaderMaterial({
                        vertexShader: face_vert,
                        fragmentShader: color_frag,
                        transparent: true,
                        depthWrite: false,
                        uniforms: {
                            velocity: { value: this.simulation.fbos.vel_0.texture },
                            boundarySpace: { value: new THREE.Vector2() },
                            palette: { value: paletteTex },
                            bgColor: { value: bgVec4 }
                        }
                    })
                )
                this.scene.add(this.output)
            }

            resize() {
                this.simulation.resize()
            }

            update() {
                this.simulation.update()
                if (Common.renderer) {
                    Common.renderer.setRenderTarget(null)
                    Common.renderer.render(this.scene, this.camera)
                }
            }
        }

        // Initialize
        const container = mountRef.current
        container.style.position = container.style.position || 'relative'
        container.style.overflow = container.style.overflow || 'hidden'

        Common.init(container)
        Mouse.init(container)
        Mouse.autoIntensity = autoIntensity

        let lastUserInteraction = performance.now()
        Mouse.onInteract = () => {
            lastUserInteraction = performance.now()
            if (autoDriver) autoDriver.forceStop()
        }

        const autoDriver = new AutoDriver(Mouse, lastUserInteraction, {
            enabled: autoDemo,
            speed: autoSpeed,
            resumeDelay: autoResumeDelay
        })

        container.prepend(Common.renderer!.domElement)
        const output = new Output()
        let running = true

        const loop = () => {
            if (!running) return
            autoDriver.update(lastUserInteraction)
            Mouse.update()
            Common.update()
            output.update()
            rafRef.current = requestAnimationFrame(loop)
        }

        const handleResize = () => {
            Common.resize()
            output.resize()
        }

        window.addEventListener('resize', handleResize)
        loop()

        webglRef.current = { output, autoDriver }

        return () => {
            running = false
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            window.removeEventListener('resize', handleResize)
            Mouse.dispose()
            if (Common.renderer) {
                const canvas = Common.renderer.domElement
                if (canvas && canvas.parentNode) canvas.parentNode.removeChild(canvas)
                Common.renderer.dispose()
            }
        }
    }, [colors, autoDemo, autoSpeed, autoIntensity, autoResumeDelay, mouseForce, cursorSize, resolution, dt, BFECC, isBounce, isViscous, viscous, iterationsPoisson, iterationsViscous, takeoverDuration, autoRampDuration])

    return (
        <div
            ref={mountRef}
            className={`liquid-ether-container ${className || ''}`}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                touchAction: 'none',
                ...style
            }}
        />
    )
}
