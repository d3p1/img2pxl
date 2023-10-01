/**
 * @description Pixel update handler
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        The main purpose of this entity is to act as a middleware
 *              in the pixel update logic (i.e.: handle out of canvas pixels)
 */
import { IPixel } from "../../../../core/api/data/particle/pixel";
import IPixelUpdateHandler from "../../../../processor/api/image-processor/handler/pixel-update-handler";

export default class PixelUpdateHandler implements IPixelUpdateHandler {
  /**
   * @inheritdoc
   */
  updatePixel(pixel: IPixel, context: CanvasRenderingContext2D): void {
    const canvas = context.canvas
    if (pixel.x < 0 || pixel.x >= canvas.width) {
      pixel.vx *= -1
    }
    if (pixel.y < 0 || pixel.y >= canvas.height) {
      pixel.vy *= -1
    }
    pixel.update()
  }
}