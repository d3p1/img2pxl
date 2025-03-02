/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @todo        Analyze to add orbit controls to zoom-in/zoom-out the image.
 *              Take into consideration that this could required to use
 *              a perspective camera and handle point size relative to
 *              `z` distance in the image vertex shader
 */
import * as THREE from 'three'
import Image from './app/image.js'

export default class App {
  /**
   * @type {THREE.Mesh}
   */
  #raycasterPlane

  /**
   * @type {THREE.Raycaster}
   */
  #raycaster

  /**
   * @type {THREE.Vector2}
   */
  #pointer

  /**
   * @type {Image}
   */
  #image

  /**
   * @type {THREE.WebGLRenderer}
   */
  #renderer

  /**
   * @type {THREE.OrthographicCamera}
   * @note It is used an orthographic camera because it is desired
   *       to draw a 2d image without a perspective
   */
  #camera

  /**
   * @type {THREE.Scene}
   */
  #scene

  /**
   * @type {Function}
   */
  #boundPointerMove

  /**
   * Constructor
   *
   * @param {Image}  image
   * @param {number} width
   * @param {number} height
   * @param {number} imageFactor
   */
  constructor(image, width, height, imageFactor = 0.9) {
    this.#initScene()
    this.#initCamera()
    this.#initImage(image, imageFactor)
    this.#initRenderer(width, height)
    this.#initRaycaster()
  }

  /**
   * Update
   *
   * @returns {void}
   */
  update() {
    if (this.#pointer.x && this.#pointer.y) {
      this.#image.update(this.#processRaycaster())
    }

    this.#renderer.render(this.#scene, this.#camera)
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose() {
    this.#image.dispose()
    this.#disposeScene()
    this.#disposeRenderer()
  }

  /**
   * Process raycaster
   *
   * @returns {number[]|null}
   */
  #processRaycaster() {
    this.#raycaster.setFromCamera(this.#pointer, this.#camera)
    const intersections = this.#raycaster.intersectObject(this.#raycasterPlane)
    if (intersections.length) {
      return [intersections[0].uv.x, intersections[0].uv.y]
    }
    return null
  }

  /**
   * Process pointer
   *
   * @param   {PointerEvent} event
   * @returns {void}
   * @note    Pointer coordinates are normalized to clip space to
   *          be able to use it for raycasting
   */
  #processPointer(event) {
    this.#pointer.x =
      (event.offsetX / this.#renderer.domElement.width - 0.5) * 2
    this.#pointer.y =
      -(event.offsetY / this.#renderer.domElement.height - 0.5) * 2
  }

  /**
   * Dispose scene
   *
   * @returns {void}
   */
  #disposeScene() {
    while (this.#scene.children.length > 0) {
      this.#scene.remove(this.#scene.children[0])
    }
  }

  /**
   * Dispose renderer
   *
   * @returns {void}
   */
  #disposeRenderer() {
    this.#renderer.domElement.removeEventListener(
      'pointermove',
      this.#boundPointerMove,
    )
    this.#renderer.dispose()
  }

  /**
   * Init raycaster
   *
   * @returns {void}
   * @note    It will be used a low poly plane in front of the image
   *          to avoid performance issues that could arise while
   *          working between the raycaster and image points
   */
  #initRaycaster() {
    this.#raycaster = new THREE.Raycaster()
    this.#pointer = new THREE.Vector2(null, null)

    this.#boundPointerMove = this.#processPointer.bind(this)
    this.#renderer.domElement.addEventListener(
      'pointermove',
      this.#boundPointerMove,
    )

    this.#raycasterPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(),
      new THREE.MeshBasicMaterial({color: 0xffffff}),
    )
    this.#raycasterPlane.position.copy(this.#image.points.position)
    this.#raycasterPlane.position.z += 0.1
    this.#raycasterPlane.visible = false
    this.#scene.add(this.#raycasterPlane)
  }

  /**
   * Init scene
   *
   * @returns {void}
   */
  #initScene() {
    this.#scene = new THREE.Scene()
  }

  /**
   * Init camera
   *
   * @returns {void}
   */
  #initCamera() {
    const far = 1
    this.#camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, far)
    this.#scene.add(this.#camera)

    this.#camera.position.z = far
  }

  /**
   * Init image
   *
   * @param   {Image}  image
   * @param   {number} imageFactor
   * @returns {void}
   * @note    The image should occupy the full renderer size.
   *          To achieve that, the total image size that will be shown
   *          will go from camera left position to camera right position
   *          for the width, and from camera bottom position to camera top
   *          position for the height
   * @note    It is used an image factor to reduce final image size
   *          and give it a margin related to the full renderer size
   */
  #initImage(image, imageFactor) {
    const imageWidth = (-this.#camera.left + this.#camera.right) * imageFactor
    const imageHeight = (-this.#camera.bottom + this.#camera.top) * imageFactor
    image.points.geometry.width = imageWidth
    image.points.geometry.height = imageHeight
    this.#image = image
    this.#scene.add(this.#image.points)
  }

  /**
   * Init renderer
   *
   * @param   {number} width
   * @param   {number} height
   * @returns {void}
   */
  #initRenderer(width, height) {
    const canvas = document.createElement('canvas')
    document.body.append(canvas)

    const pr = window.devicePixelRatio
    let antialias = false
    if (pr <= 1) {
      antialias = true
    }
    this.#renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: antialias,
    })
    this.#renderer.setPixelRatio(Math.min(pr, 2))
    this.#renderer.setSize(width, height)
  }
}
