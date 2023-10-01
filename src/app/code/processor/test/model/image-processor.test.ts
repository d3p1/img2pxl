/**
 * @description Image processor unit test
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
/// <reference types='jest-canvas-mock' />
import {IPixel} from '../../../core/api/data/particle/pixel'
import CanvasManager from '../../../core/test/model/canvas-manager'
import PixelPoolManager from '../../../core/test/model/particle/pixel-pool-manager'
import PixelUpdateHandler from '../../model/image-processor/handler/pixel-update-handler'
import IImageProcessor from '../../api/image-processor'
import ImageProcessor from '../../model/image-processor'

describe('Image Processor', () => {
    let context: CanvasRenderingContext2D
    let pixels: IPixel[]
    let pixelUpdateHandler: PixelUpdateHandler
    let imageProcessor: IImageProcessor

    beforeEach(() => {
      const width  = 300
      const height = 300 
      const pixelPoolManager = new PixelPoolManager(1, [0, 0, 0, 0], 1, 1)
      const canvasManager = new CanvasManager()
      const canvas = canvasManager.createCanvas(width, height)
      pixels = pixelPoolManager.generatePixels(width, height)
      pixelUpdateHandler = new PixelUpdateHandler()
      context = canvas.getContext('2d') as CanvasRenderingContext2D
      imageProcessor = new ImageProcessor(context, pixels, pixelUpdateHandler)
    })

    it('Draw pixels: render pixel on canvas and update position', () => {
      imageProcessor.render()
      expect(pixelUpdateHandler.updatePixel).toHaveBeenCalledTimes(1)
      expect(context.__getEvents()).toMatchSnapshot()
    })
  },
)
