/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'
import RendererManager from './lib/renderer-manager.js'
import Image from './app/image.js'
import Pointer from './app/pointer.js'
import parsVertexShader from './app/shader/pars_vertex.glsl'
import positionVertexShader from './app/shader/position_vertex.glsl'

export default class App {
  /**
   * @type {Image}
   */
  #image

  /**
   * @type {Pointer}
   */
  #pointer

  /**
   * @type {RendererManager}
   */
  #rendererManager

  /**
   * Constructor
   *
   * @param {Image}           image
   * @param {Pointer}         pointer
   * @param {RendererManager} rendererManager
   * @param {number}          displacementFrequency
   * @param {number}          displacementAmplitude
   */
  constructor(
    image,
    pointer,
    rendererManager,
    displacementFrequency = 5,
    displacementAmplitude = 50,
  ) {
    this.#image = image
    this.#pointer = pointer
    this.#rendererManager = rendererManager
    this.#initImage(displacementFrequency, displacementAmplitude)
    this.#initPointer()
  }

  /**
   * Update
   *
   * @param   {number} elapsed
   * @returns {void}
   * @note    It is required to validate if `uTime` is set
   *          because the `beforeCompile` image material shader logic
   *          (which adds this uniform)
   *          only runs after the first render of the scene
   */
  update(elapsed) {
    if (this.#image.points.material.uniforms.uTime) {
      this.#image.points.material.uniforms.uTime.value = elapsed
      this.#pointer.update()
    }
    this.#rendererManager.update()
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose() {
    this.#image.dispose()
    this.#pointer.dispose()
    this.#rendererManager.dispose()
  }

  /**
   * Init image
   *
   * @param   {number} displacementFrequency
   * @param   {number} displacementAmplitude
   * @returns {void}
   */
  #initImage(displacementFrequency, displacementAmplitude) {
    this.#addDisplacementAttributesToImage()
    this.#addDisplacementHandlerToImage(
      displacementFrequency,
      displacementAmplitude,
    )
    this.#rendererManager.scene.add(this.#image.points)
  }

  /**
   * Init pointer
   *
   * @returns {void}
   */
  #initPointer() {
    this.#pointer.raycasterPlane.position.copy(this.#image.points.position)
    this.#pointer.raycasterPlane.position.z += 0.01

    this.#rendererManager.scene.add(this.#pointer.raycasterPlane)
  }

  /**
   * Add logic that handles vertex/point/pixel displacement to image
   *
   * @param   {number} displacementFrequency
   * @param   {number} displacementAmplitude
   * @returns {void}
   */
  #addDisplacementHandlerToImage(displacementFrequency, displacementAmplitude) {
    this.#image.points.material.onBeforeCompile = (shader) => {
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

      shader.vertexShader = shader.vertexShader.replace(
        'varying vec4 vColor;',
        parsVertexShader,
      )
      shader.vertexShader = shader.vertexShader.replace(
        'vec3 vertexPosition = position;',
        positionVertexShader,
      )
    }
  }

  /**
   * Add attributes that handle displacement to image
   *
   * @returns {void}
   */
  #addDisplacementAttributesToImage() {
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
