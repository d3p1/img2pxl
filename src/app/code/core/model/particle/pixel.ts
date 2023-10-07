/**
 * @description Pixel entity
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        A pixel is a particle with RGBA color
 */
import {Color, IPixel} from '../../api/data/particle/pixel'

export default class Pixel implements IPixel {
  /**
   * Constructor
   *
   * @param {number[]} color
   * @param {number}   x
   * @param {number}   y
   */
  constructor(
    public color: Color,
    public x: number,
    public y: number,
  ) {}
}
