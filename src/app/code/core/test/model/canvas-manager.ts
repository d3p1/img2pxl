/**
 * @description Canvas manager for unit test
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
export default class CanvasManager {
  /**
   * Create canvas with image data
   *
   * @param   {number}            width
   * @param   {number}            height
   * @param   {number[]}          imagePixels
   * @returns {HTMLCanvasElement}
   */
  public createCanvasWithImageData(
    width: number,
    height: number,
    imagePixels: number[],
  ): HTMLCanvasElement {
    const canvas = this.createCanvas(width, height)
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const imageData = new ImageData(
      new Uint8ClampedArray(imagePixels),
      width,
      height,
    )
    context.getImageData = jest.fn().mockReturnValue(imageData)
    return canvas
  }

  /**
   * Create canvas
   *
   * @param   {number}            width
   * @param   {number}            height
   * @returns {HTMLCanvasElement}
   */
  public createCanvas(width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return canvas
  }
}
