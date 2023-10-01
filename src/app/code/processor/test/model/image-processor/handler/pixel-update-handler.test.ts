/**
 * @description Pixel update handler unit test
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {IPixel} from '../../../../../core/api/data/particle/pixel'
import Pixel from '../../../../../core/model/particle/pixel'
import CanvasManager from '../../../../../core/test/model/canvas-manager'
import PixelUpdateHandler from '../../../../model/image-processor/handler/pixel-update-handler'

const canvasManager = new CanvasManager()
const canvas = canvasManager.createCanvas(300, 300)
type DataSet = Array<{
  pixel: IPixel
  expectedVelocityX: number,
  expectedVelocityY: number,
  expectedX: number,
  expectedY: number,
}>
const dataSet: DataSet = [
  {
    pixel: new Pixel(1, [0, 0, 0, 0], 1, 2, 150, 150),
    expectedVelocityX: 1,
    expectedVelocityY: 2,
    expectedX: 151,
    expectedY: 152,
  },
  {
    pixel: new Pixel(1, [0, 0, 0, 0], 1, 2, 300, 300),
    expectedVelocityX: -1,
    expectedVelocityY: -2,
    expectedX: 299,
    expectedY: 298,
  },
  {
    pixel: new Pixel(1, [0, 0, 0, 0], -1, -2, -1, -1),
    expectedVelocityX: 1,
    expectedVelocityY: 2,
    expectedX: 0,
    expectedY: 1,
  }
]

describe.each(dataSet)(
  'Pixel Update Handler (' + 
   'pixel.vx: $pixel.vx - ' +
   'pixel.vy: $pixel.vy - ' +
   'pixel.x: $pixel.x - ' +
   'pixel.y: $pixel.y - ' +
   'expectedVelocityX: $expectedVelocityX - ' +
   'expectedVelocityY: $expectedVelocityY - ' +
   'expectedX: $expectedX - ' +
   'expectedY: $expectedY' +
   ')',
  ({pixel, expectedVelocityX, expectedVelocityY, expectedX, expectedY}) => {
    let context: CanvasRenderingContext2D
    let pixelUpdateHandler: PixelUpdateHandler

    beforeEach(() => {
      context = canvas.getContext('2d') as CanvasRenderingContext2D
      pixelUpdateHandler = new PixelUpdateHandler()
    })

    it('Update pixel: move pixel', () => {
      pixelUpdateHandler.updatePixel(pixel, context)
      expect(pixel.update).toHaveBeenCalledTimes(1)
      expect(pixel.vx).toBe(expectedVelocityX)
      expect(pixel.vy).toBe(expectedVelocityY)
      expect(pixel.x).toBe(expectedX)
      expect(pixel.y).toBe(expectedY)
    })
  },
)