/**
 * @description Canvas unit test helper
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        This class is intended to help in Jest unit test cases.
 *              It is necessary to import this file explicitly because it was
 *              considered that expose it globally using
 *              Jest `setupFiles` configuration could cause
 *              mantainability issues
 * @link        https://jestjs.io/docs/configuration#setupfiles-array
 */
export default class Canvas {
  /**
   * Init canvas with random image data
   *
   * @param   {number}            width
   * @param   {number}            height
   * @returns {HTMLCanvasElement}
   */
  static initCanvasWithRandomImageData(
    width: number,
    height: number,
  ): HTMLCanvasElement {
    const canvas = _initCanvas(width, height);
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    const imageData = new ImageData(
      new Uint8ClampedArray(_generateRandomPixels(width, height)),
      width,
      height,
    );
    context.getImageData = jest.fn().mockReturnValue(imageData);
    return canvas;
  }
}

/**
 * Generate random pixels
 *
 * @param   {number}   width
 * @param   {number}   height
 * @returns {number[]}
 */
function _generateRandomPixels(width: number, height: number): number[] {
  let pixels: number[] = [];
  const numPixels: number = width * height;
  for (let pixel = 0; pixel < numPixels; pixel++) {
    pixels = pixels.concat(_generateRandomPixel());
  }
  return pixels;
}

/**
 * Generate random pixel. Each pixel has an RGBA value between 0 and 255
 *
 * @returns {number[]}
 */
function _generateRandomPixel(): number[] {
  return [
    Math.floor(255 * Math.random()),
    Math.floor(255 * Math.random()),
    Math.floor(255 * Math.random()),
    Math.floor(255 * Math.random()),
  ];
}

/**
 * Init canvas
 *
 * @param   {number}            width
 * @param   {number}            height
 * @returns {HTMLCanvasElement}
 */
function _initCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}
