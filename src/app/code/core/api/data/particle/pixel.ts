/**
 * @description Pixel interface
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        A pixel is a particle with size and RGBA color
 */
import {IParticle} from '../particle'

/**
 * @type {number[]}
 */
export type Color = [number, number, number, number]

/**
 * @interface
 */
export interface IPixel extends IParticle {
  /**
   * @type {number}
   */
  size: number

  /**
   * @type {number[]}
   */
  color: Color
}
