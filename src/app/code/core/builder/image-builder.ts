/**
 * @description Image builder
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {Color, IPixel} from '../api/data/particle/pixel'
import IImageBuilder from '../api/image-builder'
import Pixel from '../model/particle/pixel'

export default class ImageBuilder implements IImageBuilder {
  /**
   * Constructor
   *
   * @param {CanvasRenderingContext2D} _context
   * @param {HTMLImageElement}         _image
   * @param {number}                   _imagePixelSize
   */
  constructor(
    protected _context: CanvasRenderingContext2D,
    protected _image: HTMLImageElement,
    protected _imagePixelSize: number = 1,
  ) {}

  /**
   * @inheritdoc
   */
  build(): IPixel[] {
    /**
     * @note Init pixel information and load image data
     */
    const pixels: IPixel[] = []
    const imageData: ImageData = this._loadImageData()

    /**
     * @note Loop image information. It is considered the pixel size
     *       to determine the space (number of rows and number of columns)
     *       that a pixel occupies
     */
    for (let y = 0; y < imageData.height; y += 1 * this._imagePixelSize) {
      for (let x = 0; x < imageData.width; x += 1 * this._imagePixelSize) {
        pixels.push(
          this._createPixel(
            [
              imageData.data[x],
              imageData.data[x + 1],
              imageData.data[x + 2],
              imageData.data[x + 3],
            ],
            x,
            y,
          ),
        )
      }
    }

    /**
     * @note Return created pixels
     */
    return pixels
  }

  /**
   * Create pixel from image information
   *
   * @param   {Color}  color
   * @param   {number} x
   * @param   {number} y
   * @returns {IPixel}
   */
  protected _createPixel(color: Color, x: number, y: number): IPixel {
    return new Pixel(this._imagePixelSize, color, 0, 0, x, y)
  }

  /**
   * Load image data
   *
   * @returns {ImageData}
   * @note    It is considered that the image and canvas
   *          have the same dimensions to avoid creating a distorted image
   */
  protected _loadImageData(): ImageData {
    this._context.drawImage(this._image, 0, 0)
    const imageData = this._context.getImageData(
      0,
      0,
      this._context.canvas.width,
      this._context.canvas.height,
    )
    return imageData
  }
}
