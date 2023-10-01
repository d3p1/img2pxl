/**
 * @description Pixel update handler interface
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        The main purpose of this entity is to act as a middleware
 *              in the pixel update logic (i.e.: handle out of canvas pixels)
 */
import {IPixel} from '../../../../core/api/data/particle/pixel'

export default interface IPixelUpdateHandler {
  /**
   * Update pixel
   *
   * @param   {Object}                   pixel
   * @param   {CanvasRenderingContext2D} context
   * @returns {void}
   * @note    The default logic may validate if the pixel is out of canvas
   *          to revert its velocity in that case. Also, it will considered
   *          that pixel coordinates and canvas coordinates have their origin
   *          at the top left corner to avoid over-complications
   *          (the image builder also considers that the origin is at the
   *          top left corner to draw the image and get its pixels)
   */
  updatePixel(pixel: IPixel, context: CanvasRenderingContext2D): void
}
