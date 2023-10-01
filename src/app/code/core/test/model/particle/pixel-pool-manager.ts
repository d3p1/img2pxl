/**
 * @description Pixel pool manager for unit test
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {Color, IPixel} from '../../../api/data/particle/pixel'
import Pixel from '../../../model/particle/pixel'

export default class PixelPoolManager {
  /**
   * Constructor
   *
   * @param {number}   pixelSize
   * @param {number[]} pixelColor
   * @param {number}   pixelVelocityX
   * @param {number}   pixelVelocityY
   */
  constructor(
    public pixelSize: number = 1,
    public pixelColor: Color = [255, 255, 255, 255],
    public pixelVelocityX: number = 0,
    public pixelVelocityY: number = 0,
  ) {}

  /**
   * Generate pixel objects
   * taking image dimension (width and height) into account
   *
   * @param   {number}   imgWidth
   * @param   {number}   imgHeight
   * @returns {Object[]}
   * @note    To calculate pixel coordinates, it is used the pixel index and
   *          it is divided by the image width to get
   *          the number of row/y and it is used
   *          the modulus of the width to get the number of column/x
   */
  public generatePixels(imgWidth: number, imgHeight: number): IPixel[] {
    const pixels: IPixel[] = []
    this.#generatePixels(imgWidth, imgHeight, (index) => {
      const x = index % imgWidth
      const y = Math.floor(index / imgHeight)
      pixels.push(this._generatePixelObject(x, y))
    })
    return pixels
  }

  /**
   * Generate raw pixels
   * taking image dimension (width and height) into account
   *
   * @param   {number}   imgWidth
   * @param   {number}   imgHeight
   * @returns {number[]}
   */
  public generateRawPixels(imgWidth: number, imgHeight: number): number[] {
    let pixels: number[] = []
    this.#generatePixels(imgWidth, imgHeight, () => {
      pixels = pixels.concat(this.pixelColor)
    })
    return pixels
  }

  /**
   * Generate pixel object on a given location (x and y coordinates)
   *
   * @param   {number} x
   * @param   {number} y
   * @returns {Object}
   */
  protected _generatePixelObject(x: number, y: number): IPixel {
    const pixel = new Pixel(
      this.pixelSize,
      this.pixelColor,
      this.pixelVelocityX,
      this.pixelVelocityY,
      x,
      y,
    )
    jest.spyOn(pixel, 'update')
    return pixel
  }

  /**
   * Generate pixels taking image dimension (width and height) into account
   *
   * @param   {number}   imgWidth
   * @param   {number}   imgHeight
   * @param   {function} callback
   * @returns {void}
   */
  #generatePixels(
    imgWidth: number,
    imgHeight: number,
    callback: (index: number) => void,
  ): void {
    const numPixels: number = imgWidth * imgHeight
    for (let pixel = 0; pixel < numPixels; pixel++) {
      callback(pixel)
    }
  }
}
