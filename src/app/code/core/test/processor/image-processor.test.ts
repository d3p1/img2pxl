/**
 * @description Image processor unit test
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
/// <reference types='jest-canvas-mock' />
import {IPixel} from '../../api/data/particle/pixel'
import IImageProcessor from '../../api/image-processor'
import ImageProcessorFactory from '../helper/processor/image-processor-factory'

/**
 * @note The image processor is responsible of drawing the pixels
 *       in the location defined by them.
 *       It is not responsible of managing the pixels around the canvas,
 *       for example, draw out of the canvas pixels in a position defined by
 *       certain logic. There will be an other entity that
 *       will manage these situations
 */
describe('Image Processor', () => {
  let imageProcessorFactory: ImageProcessorFactory
  let imageProcessor: IImageProcessor
  const pixels: IPixel[] = []

  beforeEach(() => {
    imageProcessorFactory = new ImageProcessorFactory(pixels, 300, 300)
    imageProcessor = imageProcessorFactory.create()
  })

  it('Draw pixels', () => {
    imageProcessor.render()
    expect(pixels[0].update).toHaveBeenCalledTimes(1)
    expect(imageProcessorFactory.context.__getEvents()).toMatchSnapshot()
  })
})
