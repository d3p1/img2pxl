/**
 * @description Image builder factory unit test helper
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Canvas from "../util/canvas";
import ImageBuilder from "../../../builder/image-builder";

export default class ImageBuilderFactory {
  /**
   * @type {HTMLCanvasElement}
   */
  public canvas: HTMLCanvasElement;

  /**
   * Constructor
   *
   * @param {number} pixelSize
   * @param {number} width
   * @param {number} height
   */
  constructor(
    public pixelSize: number,
    width: number,
    height: number,
  ) {
    this.canvas = Canvas.initCanvasWithRandomImageData(width, height);
  }

  /**
   * Create
   *
   * @returns {ImageBuilder}
   */
  create(): ImageBuilder {
    return new ImageBuilder(
      document.createElement("img"),
      this.pixelSize,
      this.canvas.getContext("2d") as CanvasRenderingContext2D,
    );
  }
}
