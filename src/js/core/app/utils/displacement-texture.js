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
   * @type {number|null}
   */
  #dx = null

  /**
   * @type {number|null}
   */
  #dy = null

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
   * @param   {number[]|null} intersection
   * @returns {void}
   * @note    It is given the UV coordinates of the pointer intersection.
   *          It is required to convert them to canvas coordinate
   *          to draw glow image correctly
   */
  update(intersection) {
    this.#clearCanvas()

    if (intersection) {
      const dx = intersection[0] * this.#canvas.width
      const dy = (1 - intersection[1]) * this.#canvas.height
      this.#drawCanvas(dx, dy)
    }

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
   * Draw canvas
   *
   * @param   {number} dx
   * @param   {number} dy
   * @returns {void}
   */
  #drawCanvas(dx, dy) {
    const size = this.#canvas.width * this.#displacementFactor
    this.#dx = dx - size / 2
    this.#dy = dy - size / 2

    this.#context.drawImage(this.#image, this.#dx, this.#dy, size, size)
  }

  /**
   * Clear canvas
   *
   * @returns {void}
   * @note    The idea is to draw a white glow image that will
   *          indicate how much points inside them will be displaced.
   *          That is why it is required to clear the canvas with black color
   */
  #clearCanvas() {
    this.#context.fillStyle = '#000'
    this.#context.fillRect(0, 0, this.#canvas.width, this.#canvas.height)
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
    this.texture = new THREE.CanvasTexture(this.#canvas)

    this.#context = this.#canvas.getContext('2d')

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
