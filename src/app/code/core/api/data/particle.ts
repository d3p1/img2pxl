/**
 * @description Particle interface
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

  /**
   * Check and handle collision
   *
   * @param   {{x: number, y: number}} point
   * @param   {function}               handleCollision
   * @returns {void}
   * @note    It was considered to add an instance parameter to the callback
   *          to be more expressive and point out that this callback should
   *          make some modification to the current object if there is a
   *          collision
   */
  checkAndHandleCollision(
    point: Point,
    handleCollision: (instance: this) => void,
  ): void
}
