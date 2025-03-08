/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'
import RendererManager from '../lib/renderer-manager.js'
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
   */
  constructor(image, pointer, rendererManager) {
    this.#image = image
    this.#pointer = pointer
    this.#rendererManager = rendererManager
    this.#initImage()
    this.#initPointer()
  }

  /**
   * Update
   *
   * @param   {number} elapsed
   * @returns {void}
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
   * @returns {void}
   */
  #initImage() {
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

    this.#image.points.material.onBeforeCompile = (shader) => {
      shader.uniforms['uTime'] = new THREE.Uniform(0)
      shader.uniforms['uDisFrequency'] = new THREE.Uniform(5)
      shader.uniforms['uDisAmplitude'] = new THREE.Uniform(50)
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
}
