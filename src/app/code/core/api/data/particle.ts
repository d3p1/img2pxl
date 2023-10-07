/**
 * @description Point type & Particle interface
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        A particle is just an abstraction of a point.
 *              For the moment, there is no difference between a point and
 *              a particle, but a point is like an static coordinate in space,
 *              and a particle refers to a point that could have a change
 *              in position over time
 */

/**
 * @type {{x: number, y: number}}
 */
export type Point = {
  readonly x: number
  readonly y: number
}

/**
 * @interface
 */
export interface IParticle extends Point {}
