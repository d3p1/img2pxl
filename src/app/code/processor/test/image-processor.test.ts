/**
 * @description Image processor unit test
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
/// <reference types='jest-canvas-mock' />
import {Color, IPixel} from '../../core/api/data/particle/pixel'
import PixelPoolManager from '../../core/test/model/particle/pixel-pool-manager'
import CanvasManager from '../../core/test/model/canvas-manager'
import IImageProcessor from '../api/image-processor'
import ImageProcessor from '../model/image-processor'

/**
 * @note Init data set to test image build with different situations
 */
type DataSet = Array<{
  pixelSize: number
  pixelColor: Color
  pixelVelocityX: number
  pixelVelocityY: number
  width: number
  height: number
}>
const dataSet: DataSet = [
  {
    pixelSize: 1,
    pixelColor: [255, 255, 255, 255],
    pixelVelocityX: 0,
    pixelVelocityY: 0,
    width: 100,
    height: 100,
  },
  {
    pixelSize: 10,
    pixelColor: [255, 255, 255, 255],
    pixelVelocityX: 1,
    pixelVelocityY: 1,
    width: 100,
    height: 100,
  },
]

/**
 * @note The image processor is responsible of drawing the pixels
 *       in the location defined by them.
 *       It is not responsible of managing the pixels around the canvas,
 *       for example, draw out of the canvas pixels in a position defined by
 *       certain logic. There will be an other entity that
 *       will manage these situations
 * @note Also, this image processor is only responsible of render the pixels.
 *       There will be an other entity that will refresh the image pixels per
 *       each frame. In that way, the mentioned class could add effects on the
 *       refresh (i.e.: generate a trailing effect)
 */
describe.each(dataSet)(
  'Image Processor (' +
    'pixelSize: $pixelSize - ' +
    'pixelColor: $pixelColor - ' +
    'pixelVelocityX: $pixelVelocityX - ' +
    'pixelVelocityY: $pixelVelocityY - ' +
    'width: $width - ' +
    'height: $height' +
    ')',
  ({pixelSize, pixelColor, pixelVelocityX, pixelVelocityY, width, height}) => {
    let context: CanvasRenderingContext2D
    let pixels: IPixel[]
    let imageProcessor: IImageProcessor

    beforeEach(() => {
      const pixelPoolManager = new PixelPoolManager(
        pixelSize,
        pixelColor,
        pixelVelocityX,
        pixelVelocityY,
      )
      pixels = pixelPoolManager.generatePixels(width, height)
      const canvasManager = new CanvasManager()
      const canvas = canvasManager.createCanvasWithImageData(
        width,
        height,
        pixels.flatMap((pixel) => pixel.color),
      )
      context = canvas.getContext('2d') as CanvasRenderingContext2D
      imageProcessor = new ImageProcessor(context, pixels)
    })

    it('Draw pixels: render pixel on canvas and update position', () => {
      const pixel = pixels[0]
      const oldPixelX = pixel.x
      const oldPixelY = pixel.y
      imageProcessor.render()
      expect(pixel.update).toHaveBeenCalledTimes(1)
      expect(oldPixelX + pixelVelocityX).toBe(pixel.x)
      expect(oldPixelY + pixelVelocityY).toBe(pixel.x)
      expect(context.__getEvents()).toMatchSnapshot()
    })
  },
)
