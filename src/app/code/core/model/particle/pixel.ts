/**
 * @description Pixel entity
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        A pixel is a particle with size and RGBA color
 */
import {Point} from '../../api/data/particle'
import {Color, IPixel} from '../../api/data/particle/pixel'

export default class Pixel implements IPixel {
  /**
   * Constructor
   *
   * @param {number}   size
   * @param {number[]} color
   * @param {number}   vx
   * @param {number}   vy
   * @param {number}   x
   * @param {number}   y
   */
  constructor(
    public size: number,
    public color: Color,
    public vx: number,
    public vy: number,
    public x: number,
    public y: number,
  ) {}

  /**
   * @inheritdoc
   */
  public update(): void {
    this.x += this.vx
    this.y += this.vy
  }

  /**
   * @inheritdoc
   */
  public checkAndHandleCollision(
    point: Point,
    handleCollision: (instance: this) => void,
  ): void {
    if (this.x === point.x && this.y === point.y) {
      handleCollision(this)
    }
  }
}
