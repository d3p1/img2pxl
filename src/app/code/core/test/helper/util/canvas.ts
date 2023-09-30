/**
 * @description Canvas unit test helper
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        This entity is intended to help in Jest unit test cases.
 *              It is necessary to import this file explicitly because it was
 *              considered that expose it globally using
 *              Jest `setupFiles` configuration could cause
 *              mantainability issues (i.e.: it would be necessary to maintain
 *              a declaration file)
 * @link        https://jestjs.io/docs/configuration#setupfiles-array
 */
import Pixel from './particle/pixel'

export default class Canvas {
  /**
   * Init canvas
   *
   * @param   {number}            width
   * @param   {number}            height
   * @returns {HTMLCanvasElement}
   */
  public static initCanvas(width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return canvas
  }

  /**
   * Init canvas with image data
   *
   * @param   {number}            width
   * @param   {number}            height
   * @returns {HTMLCanvasElement}
   */
  public static initCanvasWithImageData(
    width: number,
    height: number,
  ): HTMLCanvasElement {
    const canvas = this.initCanvas(width, height)
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const imageData = new ImageData(
      new Uint8ClampedArray(Pixel.generatePixels(width, height)),
      width,
      height,
    )
    context.getImageData = jest.fn().mockReturnValue(imageData)
    return canvas
  }
}
