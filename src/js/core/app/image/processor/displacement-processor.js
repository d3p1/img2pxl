/**
 * @description Displacement processor
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'

export default class DisplacementProcessor {
  /**
   * @type {HTMLImageElement}
   * @note Image used to displace pixels
   */
  displacementImage

  /**
   * @type {number}
   * @note This value defines how many pixels are affected by the effect
   *       in relation to the image resolution
   */
  displacementSize

  /**
   * @type {number}
   * @note This value defines the strength of the trailing effect on the
   *       displacement of the pixels
   */
  displacementTrailingFactor

  /**
   * @type {THREE.CanvasTexture}
   */
  texture

  /**
   * @type {HTMLCanvasElement}
   */
  canvas

  /**
   * @type {CanvasRenderingContext2D}
   */
  #context

  /**
   * Constructor
   *
   * @param {number} resolutionWidth
   * @param {number} resolutionHeight
   * @param {string} displacementImageSrc
   * @param {number} displacementSize
   * @param {number} displacementTrailingFactor
   */
  constructor(
    resolutionWidth,
    resolutionHeight,
    displacementImageSrc,
    displacementSize = 0.1,
    displacementTrailingFactor = 0.05,
  ) {
    this.displacementSize = displacementSize
    this.displacementTrailingFactor = displacementTrailingFactor
    this.#initDisplacementImage(displacementImageSrc)
    this.#initCanvasTexture(resolutionWidth, resolutionHeight)
  }

  /**
   * Update
   *
   * @param   {number[]|null} intersection
   * @returns {void}
   * @note    It is given the UV coordinates of the pointer intersection.
   *          It is required to convert them to canvas coordinate
   *          to draw image correctly
   */
  update(intersection) {
    this.#clear()

    if (intersection) {
      const dx = intersection[0] * this.canvas.width
      const dy = (1 - intersection[1]) * this.canvas.height
      this.#draw(dx, dy)
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
   * Draw
   *
   * @param   {number} dx
   * @param   {number} dy
   * @returns {void}
   * @note    It is calculated the size of the displacement image.
   *          Then, it is moved half its size so it is drawn at the center
   *          of the pointer
   * @note    The aspect ratio of the image is always square.
   *          It is proportional to the canvas width.
   *          This approach is considered correct because web elements
   *          adjust their width to fit in the page
   */
  #draw(dx, dy) {
    const size = this.canvas.width * this.displacementSize
    dx -= size / 2
    dy -= size / 2

    this.#context.save()
    this.#context.globalCompositeOperation = 'lighten'
    this.#context.drawImage(this.displacementImage, dx, dy, size, size)
    this.#context.restore()
  }

  /**
   * Clear
   *
   * @returns {void}
   * @note    The idea is to draw a white displacement image that will
   *          indicate how much points inside them will be displaced.
   *          That is why it is required to clear the canvas with black color
   */
  #clear() {
    this.#context.save()
    this.#context.globalAlpha = this.displacementTrailingFactor
    this.#context.fillStyle = '#000'
    this.#context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.#context.restore()
  }

  /**
   * Init canvas texture used to detect pointer location and
   * displace points
   *
   * @param   {number} resolutionWidth
   * @param   {number} resolutionHeight
   * @returns {void}
   * @note    The canvas will have the same number of pixels as the
   *          image.
   *          That is why it is used the image resolution as its dimensions
   */
  #initCanvasTexture(resolutionWidth, resolutionHeight) {
    this.canvas = document.createElement('canvas')
    this.canvas.width = resolutionWidth
    this.canvas.height = resolutionHeight
    this.texture = new THREE.CanvasTexture(this.canvas)

    this.#context = this.canvas.getContext('2d')
  }

  /**
   * Init displacement image
   *
   * @param   {string} displacementImageSrc
   * @returns {void}
   * @note    It is considered that the displacement image will be
   *          a white image that will indicate how pixels should be displaced
   */
  #initDisplacementImage(displacementImageSrc) {
    this.displacementImage = new Image()
    this.displacementImage.src = displacementImageSrc
  }
}
