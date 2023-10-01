/**
 * @description Point type & Particle interface
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        A particle is a point with velocity
 */

/**
 * @type {{x: number, y: number}}
 */
export type Point = {
  x: number
  y: number
}

/**
 * @interface
 */
export interface IParticle extends Point {
  /**
   * @type {number}
   */
  vx: number

  /**
   * @type {number}
   */
  vy: number

  /**
   * Update pixel position
   *
   * @returns {void}
   */
  update(): void
}
