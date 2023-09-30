/**
 * @description Pixel unit test helper
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {Color, IPixel} from '../../../../api/data/particle/pixel'
import BasePixel from '../../../../model/particle/pixel'

export default class Pixel {
  /**
   * Generate pixel objects
   *
   * @param   {number}   width
   * @param   {number}   height
   * @param   {number}   pixelSize
   * @param   {number}   vx
   * @param   {number}   vy
   * @returns {IPixel[]}
   * @note    To calculate pixel coordinates, it is used the pixel index and
   *          it is divided by the image width to get
   *          the number of row/y and it is used
   *          the modulus of the width to get the number of column/x
   */
  public static generatePixelObjects(
    width: number,
    height: number,
    pixelSize: number = 1,
    vx: number = 0,
    vy: number = 0,
  ): IPixel[] {
    const pixels: IPixel[] = []
    _generatePixels(width, height, (index) => {
      const x = index % width
      const y = Math.floor(index / width)
      pixels.push(_generateWhitePixelObject(pixelSize, vx, vy, x, y))
    })
    return pixels
  }

  /**
   * Generate pixels
   *
   * @param   {number}   width
   * @param   {number}   height
   * @returns {number[]}
   */
  public static generatePixels(width: number, height: number): number[] {
    let pixels: number[] = []
    _generatePixels(width, height, () => {
      pixels = pixels.concat(_generateWhitePixel())
    })
    return pixels
  }
}

/**
 * Generate pixels
 *
 * @param   {number}   width
 * @param   {number}   height
 * @param   {Function} callback
 * @returns {void}
 */
function _generatePixels(
  width: number,
  height: number,
  callback: (index: number) => void,
): void {
  const numPixels: number = width * height
  for (let pixel = 0; pixel < numPixels; pixel++) {
    callback(pixel)
  }
}

/**
 * Generate white pixel object
 *
 * @param   {number} size
 * @param   {number} vx
 * @param   {number} vy
 * @param   {number} x
 * @param   {number} y
 * @returns {IPixel}
 */
function _generateWhitePixelObject(
  size: number,
  vx: number,
  vy: number,
  x: number,
  y: number,
): IPixel {
  return new BasePixel(size, _generateWhitePixel(), vx, vy, x, y)
}

/**
 * Generate white pixel
 *
 * @returns {Color}
 */
function _generateWhitePixel(): Color {
  return [255, 255, 255, 255]
}
