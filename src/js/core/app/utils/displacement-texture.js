/**
 * @description Displacement texture utility
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'
import glowImage from './media/glow.png'

export default class DisplacementTexture {
  /**
   * @type {THREE.Texture}
   */
  texture

  /**
   * @type {HTMLImageElement}
   */
  #image

  /**
   * @type {HTMLCanvasElement}
   */
  #canvas

  /**
   * @type {CanvasRenderingContext2D}
   */
  #context

  /**
   * @type {number}
   */
  #displacementFactor

  /**
   * Constructor
   *
   * @param {number} pixelCount
   * @param {number} displacementFactor
   */
  constructor(pixelCount, displacementFactor = 0.2) {
    this.#initTexture(pixelCount)
    this.#initDisplacementImage()
    this.#displacementFactor = displacementFactor
  }

  /**
   * Update
   *
   * @returns {void}
   * @note    The idea is to draw a white glow image that will
   *          indicate how much points inside them will be displaced.
   *          That is why it is required to clear the canvas with black color
   */
  update() {
    this.#context.fillStyle = '#000'
    this.#context.fillRect(0, 0, this.#canvas.width, this.#canvas.height)
    const size = this.#canvas.width * this.#displacementFactor
    const dx = 0 - size / 2
    const dy = 0 - size / 2
    this.#context.drawImage(this.#image, dx, dy, size, size)

    this.texture.needsUpdate = true
  }

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
    this.#canvas.style.width = '256px'
    this.#canvas.style.height = '256px'
    this.#canvas.style.border = '5px solid #fff'
    document.body.appendChild(this.#canvas)
  }

  /**
   * Init displacement image
   *
   * @returns {void}
   */
  #initDisplacementImage() {
    this.#image = new Image()
    this.#image.src = glowImage
  }
}
