/**
 * @description Particle class
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        This class does not need to know about canvas and its
 *              render context. Because of that, other class will be
 *              responsible of its render logic
 */
export default abstract class Particle {
  /**
   * Constructor
   *
   * @param {number} vx
   * @param {number} vy
   * @param {number} _x
   * @param {number} _y
   */
  constructor(
    public vx: number,
    public vy: number,
    protected _x: number,
    protected _y: number,
  ) {}

  /**
   * Get x coordinate of current location
   *
   * @returns {number}
   */
  get x(): number {
    return this._x;
  }

  /**
   * Get y coordinate of current location
   *
   * @returns {number}
   */
  get y(): number {
    return this._y;
  }

  /**
   * Update pixel position
   *
   * @returns {void}
   */
  public update(): void {
    this._x += this.vx;
    this._y += this.vy;
  }
}
