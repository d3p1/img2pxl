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
  red

  /**
   * @type {number}
   */
  green

  /**
   * @type {number}
   */
  blue

  /**
   * @type {number}
   */
  #force

  /**
   * @type {number}
   */
  #originX

  /**
   * @type {number}
   */
  #originY

  /**
   * Constructor
   *
   * @param {number} x
   * @param {number} y
   * @param {number} red
   * @param {number} green
   * @param {number} blue
   * @param {number} force
   */
  constructor(x, y, red, green, blue, force) {
    this.x = x
    this.y = y
    this.red = red
    this.green = green
    this.blue = blue
    this.#force = force
    this.#originX = x
    this.#originY = y
  }

  /**
   * Draw particle
   *
   * @param   {CanvasRenderingContext2D} ctx
   * @returns {void}
   * @note   It is used a rect instead of a circle as pixel shape for
   *         performance reasons
   * @note   The save and restore of drawing state is delegate to caller logic
   *         for performance reasons.
   *         It is very important to restore drawing
   *         state after this method execution, to avoid pixel styles being
   *         applied to other rendered shapes
   */
  draw(ctx) {
    ctx.fillStyle = `rgb(${this.red}, ${this.green}, ${this.blue})`
    ctx.fillRect(this.x, this.y, 1, 1)
  }

  /**
   * Update pixel location
   *
   * @param   {number} t Elapsed time (in milliseconds) from last drawing
   * @returns {void}
   * @todo    Use integer values for pixel coordinates to avoid antti-aliasing
   */
  update(t) {
    if (this.x === this.#originX && this.y === this.#originY) {
      return
    }

    const xDistance = this.x - this.#originX
    const yDistance = this.y - this.#originY
    this.x -= xDistance * this.#force * (t / 250)
    this.y -= yDistance * this.#force * (t / 250)
  }
}
