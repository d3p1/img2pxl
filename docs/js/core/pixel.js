/**
 * @description Pixel class
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
export default class Pixel {
  /**
   * @type {number}
   */
  x

  /**
   * @type {number}
   */
  y

  /**
   * @type {number}
   */
  width

  /**
   * @type {number}
   */
  height

  /**
   * @param {HTMLImageElement}
   */
  #img

  /**
   * @type {number}
   */
  #imgX

  /**
   * @type {number}
   */
  #imgY

  /**
   * @type {number}
   */
  #force

  /**
   * Constructor
   *
   * @param {HTMLImageElement} img
   * @param {number}           x
   * @param {number}           y
   * @param {number}           width
   * @param {number}           height
   * @param {number}           force
   */
  constructor(img, x, y, width, height, force) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.#img = img
    this.#imgX = x
    this.#imgY = y
    this.#force = force
  }

  /**
   * Draw particle
   *
   * @param   {CanvasRenderingContext2D} ctx
   * @returns {void}
   */
  draw(ctx) {
    ctx.drawImage(
      this.#img,
      this.#imgX,
      this.#imgY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    )
  }

  /**
   * Update pixel location
   *
   * @param   {number} t Elapsed time (in milliseconds) from last drawing
   * @returns {void}
   * @todo    Use integer values for pixel coordinates to avoid antti-aliasing
   */
  update(t) {
    if (this.x === this.#imgX && this.y === this.#imgY) {
      return
    }

    const xDistance = this.x - this.#imgX
    const yDistance = this.y - this.#imgY
    this.x -= xDistance * this.#force * (t / 250)
    this.y -= yDistance * this.#force * (t / 250)
  }
}
