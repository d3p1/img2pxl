/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        This class will manage how the renderer manager,
 *              debug manager, the image, the pointer
 *              and the motion (pixels' default motion, noise, etc.)
 *              interact between each other
 */
import * as THREE from 'three'
import RendererManager from './lib/renderer-manager.js'
import DebugManager from './lib/debug-manager.js'
import Image from './app/image.js'
import Pointer from './app/pointer.js'
import parsVertexShader from './app/shader/pars_vertex.glsl'
import positionVertexShader from './app/shader/position_vertex.glsl'

export default class App {
  /**
   * @type {Image}
   */
  #image: Image

  /**
   * @type {Pointer}
   */
  #pointer: Pointer

  /**
   * @type {RendererManager}
   */
  #rendererManager: RendererManager

  /**
   * @type {DebugManager}
   */
  #debugManager: DebugManager

  /**
   * Constructor
   *
   * @param {Image}           image
   * @param {Pointer}         pointer
   * @param {RendererManager} rendererManager
   * @param {DebugManager}    debugManager
   * @param {string}          noiseImageSrc
   * @param {number}          noiseFrequency
   * @param {number}          noiseAmplitude
   * @param {number}          displacementFrequency
   * @param {number}          displacementAmplitude
   */
  constructor(
    image: Image,
    pointer: Pointer,
    rendererManager: RendererManager,
    debugManager: DebugManager,
    noiseImageSrc: string,
    noiseFrequency: number = 0.1,
    noiseAmplitude: number = 5,
    displacementFrequency: number = 5,
    displacementAmplitude: number = 50,
  ) {
    this.#image = image
    this.#pointer = pointer
    this.#rendererManager = rendererManager
    this.#debugManager = debugManager
    this.#initImage(
      noiseImageSrc,
      noiseFrequency,
      noiseAmplitude,
      displacementFrequency,
      displacementAmplitude,
    )
    this.#initPointer()
  }

  /**
   * Update
   *
   * @param   {number} elapsed
   * @returns {void}
   */
  update(elapsed: number): void {
    this.#image.points.material.uniforms.uTime.value = elapsed
    this.#pointer.update()
    this.#rendererManager.update()
  }

  /**
   * Enable debug mode
   *
   * @returns {void}
   */
  debug(): void {
    this.#pointer.debug()

    this.#image.debug()

    const pixelMotionFolder = this.#debugManager.addFolder({
      title: 'Image Pixel Motion',
    })

    this.#debugManager.addBindingWithOnChange(
      this.#image.points.material.uniforms.uDisFrequency,
      'value',
      'frequency',
      {min: 0, max: 10 * 2 * Math.PI, step: 0.01},
      pixelMotionFolder,
    )

    this.#debugManager.addBindingWithOnChange(
      this.#image.points.material.uniforms.uDisAmplitude,
      'value',
      'amplitude',
      {min: 0, max: this.#rendererManager.width, step: 1},
      pixelMotionFolder,
    )

    const imageMotionFolder = this.#debugManager.addFolder({
      title: 'Image Motion',
    })

    this.#debugManager.addBindingWithOnChange(
      this.#image.points.material.uniforms.uNoiseFrequency,
      'value',
      'frequency',
      {min: 0, max: 2 * Math.PI, step: 0.01},
      imageMotionFolder,
    )

    this.#debugManager.addBindingWithOnChange(
      this.#image.points.material.uniforms.uNoiseAmplitude,
      'value',
      'amplitude',
      {min: 0, max: this.#rendererManager.width, step: 1},
      imageMotionFolder,
    )
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose(): void {
    this.#image.dispose()
    this.#pointer.dispose()
  }

  /**
   * Init image
   *
   * @param   {string} noiseImageSrc
   * @param   {number} noiseFrequency
   * @param   {number} noiseAmplitude
   * @param   {number} displacementFrequency
   * @param   {number} displacementAmplitude
   * @returns {void}
   */
  #initImage(
    noiseImageSrc: string,
    noiseFrequency: number,
    noiseAmplitude: number,
    displacementFrequency: number,
    displacementAmplitude: number,
  ): void {
    this.#rendererManager.scene.add(this.#image.points)
    this.#addDisplacementAttributesToImage()
    this.#addDisplacementHandlerToImage(
      noiseImageSrc,
      noiseFrequency,
      noiseAmplitude,
      displacementFrequency,
      displacementAmplitude,
    )
  }

  /**
   * Init pointer
   *
   * @returns {void}
   */
  #initPointer(): void {
    this.#pointer.raycasterPlane.position.copy(this.#image.points.position)
    this.#pointer.raycasterPlane.position.z += 0.01

    this.#rendererManager.scene.add(this.#pointer.raycasterPlane)
  }

  /**
   * Add logic that handles vertex/point/pixel displacement to image
   *
   * @param   {string} noiseImageSrc
   * @param   {number} noiseFrequency
   * @param   {number} noiseAmplitude
   * @param   {number} displacementFrequency
   * @param   {number} displacementAmplitude
   * @returns {void}
   * @note    Take into consideration that the pointer canvas/image/texture
   *          is called `uDisTexture` inside the shader because
   *          it is considered that the shader does not need to know
   *          that this texture is related to a pointer
   * @note    Force shader compilation with `compile()`.
   *          If it is not forced the shader compilation, then
   *          uniforms will be undefined until first render of the scene
   * {@link   https://github.com/mrdoob/three.js/pull/10960}
   */
  #addDisplacementHandlerToImage(
    noiseImageSrc: string,
    noiseFrequency: number,
    noiseAmplitude: number,
    displacementFrequency: number,
    displacementAmplitude: number,
  ): void {
    const textureLoader = new THREE.TextureLoader()
    const noiseTexture = textureLoader.load(noiseImageSrc)
    noiseTexture.wrapS = THREE.RepeatWrapping

    this.#image.points.material.onBeforeCompile = (
      shader: THREE.WebGLProgramParametersWithUniforms,
    ) => {
      shader.uniforms['uTime'] = new THREE.Uniform(0)
      shader.uniforms['uDisFrequency'] = new THREE.Uniform(
        displacementFrequency,
      )
      shader.uniforms['uDisAmplitude'] = new THREE.Uniform(
        displacementAmplitude,
      )
      shader.uniforms['uDisTexture'] = new THREE.Uniform(
        this.#pointer.canvas.texture,
      )
      shader.uniforms['uNoiseFrequency'] = new THREE.Uniform(noiseFrequency)
      shader.uniforms['uNoiseAmplitude'] = new THREE.Uniform(noiseAmplitude)
      shader.uniforms['uNoiseTexture'] = new THREE.Uniform(noiseTexture)

      shader.vertexShader = shader.vertexShader.replace(
        'varying vec4 vColor;',
        parsVertexShader,
      )
      shader.vertexShader = shader.vertexShader.replace(
        'vec3 vertexPosition = position;',
        positionVertexShader,
      )
    }

    this.#rendererManager.compile()
  }

  /**
   * Add attributes that handle displacement to image
   *
   * @returns {void}
   */
  #addDisplacementAttributesToImage(): void {
    const vertices = this.#image.points.geometry.attributes.position.count
    const disAngle = new Float32Array(vertices)
    const disAmplitude = new Float32Array(vertices)
    for (let i = 0; i < vertices; i++) {
      disAngle[i] = Math.random() * 2 * Math.PI
      disAmplitude[i] = Math.random()
    }
    this.#image.points.geometry.setAttribute(
      'aDisAngle',
      new THREE.BufferAttribute(disAngle, 1),
    )
    this.#image.points.geometry.setAttribute(
      'aDisAmplitude',
      new THREE.BufferAttribute(disAmplitude, 1),
    )
  }
}
