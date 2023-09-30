/**
 * @description Image processor unit test
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
/// <reference types='jest-canvas-mock' />
import {IPixel} from '../../api/data/particle/pixel'
import IImageProcessor from '../../api/image-processor'
import Pixel from '../helper/util/particle/pixel'
import ImageProcessorFactory from '../helper/processor/image-processor-factory'

/**
 * @note Init data set to test image build with different situations
 */
type DataSet = {
  pixelSize: number
  pixelVelocityX: number
  pixelVelocityY: number
  width: number
  height: number
}
const dataSet: DataSet[] = [
  {
    pixelSize: 1,
    pixelVelocityX: 0,
    pixelVelocityY: 0,
    width: 100,
    height: 100,
  },
  {
    pixelSize: 10,
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
    'pixelVelocityX: $pixelVelocityX - ' +
    'pixelVelocityY: $pixelVelocityY - ' +
    'width: $width - ' +
    'height: $height' +
    ')',
  ({pixelSize, pixelVelocityX, pixelVelocityY, width, height}) => {
    let imageProcessorFactory: ImageProcessorFactory
    let imageProcessor: IImageProcessor
    let pixels: IPixel[]

    beforeEach(() => {
      pixels = Pixel.generatePixelObjects(
        width,
        height,
        pixelSize,
        pixelVelocityX,
        pixelVelocityY,
      )
      imageProcessorFactory = new ImageProcessorFactory(pixels, width, height)
      imageProcessor = imageProcessorFactory.create()
    })

    it('Draw pixels', () => {
      const pixel = pixels[0]
      const oldPixelX = pixel.x
      const oldPixelY = pixel.y
      imageProcessor.render()
      expect(pixel.update).toHaveBeenCalledTimes(1)
      expect(oldPixelX + pixelVelocityX).toBe(pixel.x)
      expect(oldPixelY + pixelVelocityY).toBe(pixel.x)
      expect(imageProcessorFactory.context.__getEvents()).toMatchSnapshot()
    })
  },
)
