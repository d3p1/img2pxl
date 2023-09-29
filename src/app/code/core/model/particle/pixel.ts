/**
 * @description Pixel class. A pixel is a particle but with RGBA color and size
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        This class does not need to know about canvas and its
 *              render context. Because of that, other class will be
 *              responsible of its render logic
 */
import {Color, IPixel} from '../../api/data/particle/pixel'
import Particle from '../particle'

export default class Pixel extends Particle implements IPixel {
  /**
   * Constructor
   *
   * @param {number} size
   * @param {Color}  color
   * @param {number} vx
   * @param {number} vy
   * @param {number} _x
   * @param {number} _y
   */
  constructor(
    public size: number,
    public color: Color,
    public vx: number,
    public vy: number,
    protected _x: number,
    protected _y: number,
  ) {
    super(vx, vy, _x, _y)
    this.size = size
    this.color = color
  }
}
