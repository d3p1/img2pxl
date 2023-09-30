/**
 * @description Object manager to create unit test helper related to canvas
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        The main purpose of this entity is to generalize the way
 *              unit test helpers are created and helps control how
 *              their dependencies behaves
 */
import Canvas from '../canvas'
export default abstract class ObjectManger<T> {
  /**
   * @type {HTMLCanvasElement}
   */
  public canvas: HTMLCanvasElement

  /**
   * @type {CanvasRenderingContext2D}
   */
  public context: CanvasRenderingContext2D

  /**
   * Constructor
   *
   * @param {number} width
   * @param {number} height
   */
  constructor(width: number, height: number) {
    this.canvas = this._initCanvas(width, height)
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
  }

  /**
   * Create unit test helper
   *
   * @returns {Object}
   */
  public abstract create(): T

  /**
   * Init canvas
   *
   * @param   {number}            width
   * @param   {number}            height
   * @returns {HTMLCanvasElement}
   */
  protected _initCanvas(width: number, height: number): HTMLCanvasElement {
    return Canvas.initCanvasWithImageData(width, height)
  }
}
