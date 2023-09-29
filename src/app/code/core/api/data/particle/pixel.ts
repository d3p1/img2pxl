/**
 * @description Pixel interface
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        This entity does not need to know about canvas and its
 *              render context. Because of that, other entity will be
 *              responsible of its render logic
 */

/**
 * @type {Color}
 */
export type Color = [number, number, number, number]

/**
 * @interface
 */
export interface IPixel {
  /**
   * @type {number}
   */
  size: number

  /**
   * @type {Color}
   */
  color: Color

  /**
   * Get x coordinate of current location
   *
   * @returns {number}
   */
  get x(): number

  /**
   * Get y coordinate of current location
   *
   * @returns {number}
   */
  get y(): number

  /**
   * Update pixel position
   *
   * @returns {void}
   */
  update(): void
}
