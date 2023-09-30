/**
 * @description Image builder unit test
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import PixelPoolManager from '../../../core/test/model/particle/pixel-pool-manager'
import CanvasManager from '../../../core/test/model/canvas-manager'
import IImageBuilder from '../../api/image-builder'
import ImageBuilder from '../../model/image-builder'

/**
 * @note Init data set to test image build with different situations
 */
type DataSet = Array<{
  pixelSize: number
  width: number
  height: number
  numPixels: number
}>
const dataSet: DataSet = [
  {pixelSize: 1, width: 100, height: 100, numPixels: 10000},
  {pixelSize: 2, width: 100, height: 100, numPixels: 2500},
  {pixelSize: 2, width: 1, height: 1, numPixels: 1},
]

/**
 * @note Execute test suite for the data set
 * @note It is considered that the image and canvas
 *       have the same dimensions (width and height)
 *       and that the dimensions cannot be 0
 */
describe.each(dataSet)(
  'Image Builder (' +
    'pixelSize: $pixelSize - ' +
    'width: $width - ' +
    'height: $height - ' +
    'numPixels: $numPixels' +
    ')',
  ({pixelSize, width, height, numPixels}) => {
    let context: CanvasRenderingContext2D
    let imageBuilder: IImageBuilder

    beforeEach(() => {
      const pixelPoolManager = new PixelPoolManager()
      const canvasManager = new CanvasManager()
      const canvas = canvasManager.createCanvasWithImageData(
        width,
        height,
        pixelPoolManager.generateRawPixels(width, height),
      )
      context = canvas.getContext('2d') as CanvasRenderingContext2D
      imageBuilder = new ImageBuilder(
        context,
        document.createElement('img'),
        pixelSize,
      )
    })

    it('Build image: draw image on canvas and init pixels', () => {
      const pixels = imageBuilder.build()
      const imageData = context.getImageData(0, 0, width, height)
      expect(context.drawImage).toHaveBeenCalledTimes(1)
      expect(pixels.length).toBe(numPixels)
      expect(pixels[0].color).toEqual([
        imageData?.data[0],
        imageData?.data[1],
        imageData?.data[2],
        imageData?.data[3],
      ])
    })
  },
)
