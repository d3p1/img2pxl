/**
 * @description Pixel creation handler interface
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        The main purpose of this entity is to act as a middleware
 *              in the pixel creation logic (i.e.: add a factory entity to
 *              create the pixel and/or allow the customization of the pixel
 *              color)
 */
import { Color, IPixel } from "../../../../core/api/data/particle/pixel";

export default interface IPixelCreationHandler {
  /**
   * Init pixel
   * 
   * @param   {number}   size 
   * @param   {number[]} color 
   * @param   {number}   vx 
   * @param   {number}   vy 
   * @param   {number}   x 
   * @param   {number}   y
   * @returns {Object}
   */
  initPixel(
    size: number,
    color: Color,
    vx: number,
    vy: number,
    x: number,
    y: number
  ): IPixel
}