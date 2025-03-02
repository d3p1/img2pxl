/**
 * @description Displacement texture utility
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'

export default class DisplacementTexture {
  /**
   * @type {THREE.Texture}
   */
  texture

  /**
   * @type {HTMLCanvasElement}
   */
  #canvas

  /**
   * @type {CanvasRenderingContext2D}
   */
  #context

  /**
   * Constructor
   *
   * @param {number} pixelCount
   */
  constructor(pixelCount) {
    this.#initTexture(pixelCount)
  }

  /**
   * Update
   *
   * @param   {number} elapsedTime
   * @param   {number} deltaTime
   * @returns {void}
   */
  update(elapsedTime, deltaTime) {}

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose() {
    this.texture.dispose()
  }

  /**
   * Init canvas texture used to detect pointer location and
   * displace points
   *
   * @param   {number} pixelCount
   * @returns {void}
   * @note    The canvas will have the same number of pixels as the
   *          image. That is why it is used the pixel count as its dimensions
   */
  #initTexture(pixelCount) {
    this.#canvas = document.createElement('canvas')
    this.#canvas.width = pixelCount
    this.#canvas.height = pixelCount
    this.#context = this.#canvas.getContext('2d')
    this.texture = new THREE.CanvasTexture(this.#canvas)

    this.#canvas.style.position = 'fixed'
    this.#canvas.style.top = '0'
    this.#canvas.style.left = '0'
    this.#canvas.style.width = '512px'
    this.#canvas.style.height = '512px'
    this.#canvas.style.border = '5px solid #fff'
    document.body.appendChild(this.#canvas)
  }
}
