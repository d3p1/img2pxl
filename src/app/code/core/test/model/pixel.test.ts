/**
 * @description Pixel unit test
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {IPixel} from '../../api/data/particle/pixel'
import Pixel from '../../model/particle/pixel'

/**
 * @note Init data set
 */
type DataSet = Array<
  Omit<IPixel, 'update'> & {
    updatedX: number
    updatedY: number
  }
>
const dataSet: DataSet = [
  {
    size: 10,
    color: [255, 0, 0, 0],
    vx: 1,
    vy: 1,
    x: 0,
    y: 0,
    updatedX: 1,
    updatedY: 1,
  },
  {
    size: 10,
    color: [255, 0, 0, 0],
    vx: -1,
    vy: -1,
    x: 0,
    y: 0,
    updatedX: -1,
    updatedY: -1,
  },
]

describe.each(dataSet)(
  'Pixel (' +
    'size: $size -' +
    'color: $color -' +
    'vx: $vx -' +
    'vy: $vy -' +
    'x: $x -' +
    'y: $y -' +
    'updatedX: $updatedX -' +
    'updatedY: $updatedY' +
    ')',
  ({size, color, vx, vy, x, y, updatedX, updatedY}) => {
    let pixel: IPixel

    beforeEach(() => {
      pixel = new Pixel(size, color, vx, vy, x, y)
    })

    it('Update pixel: move pixel taking velocity into account', () => {
      pixel.update()
      expect(pixel.x).toBe(updatedX)
      expect(pixel.y).toBe(updatedY)
    })
  },
)
