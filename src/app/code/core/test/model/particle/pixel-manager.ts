/**
 * @description Pixel manager for unit test
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {Color, IPixel} from '../../../api/data/particle/pixel'
import Pixel from '../../../model/particle/pixel'

export default class PixelManager {
  /**
   * Create pixel
   *
   * @param   {number}   size
   * @param   {number[]} color
   * @param   {number}   vx
   * @param   {number}   vy
   * @param   {number}   x
   * @param   {number}   y
   * @returns {Object}
   */
  public createPixel(
    size: number,
    color: Color,
    vx: number,
    vy: number,
    x: number,
    y: number,
  ): IPixel {
    const pixel = new Pixel(size, color, vx, vy, x, y)
    jest.spyOn(pixel, 'update')
    return pixel
  }
}
