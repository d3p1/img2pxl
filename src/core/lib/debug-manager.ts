/**
 * @description Debug manager
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        The idea behind this class is to encapsulate and wrap the
 *              debug management logic
 */
import {BindingParams, FolderApi, FolderParams, Pane} from 'tweakpane'
import {BindingApi} from '@tweakpane/core'
import {getSettings} from './debug-manager/copy/settings.ts'

export default class DebugManager {
  /**
   * @type {Pane}
   */
  #debugger: Pane

  /**
   * Constructor
   */
  constructor() {
    this.#debugger = new Pane()
    this.#addCopyButton()
  }

  /**
   * Enable. Show debugger
   *
   * @returns {void}
   */
  enable(): void {
    this.#debugger.element.style.display = 'block'
  }

  /**
   * Disable. Hide debugger
   *
   * @returns {void}
   */
  disable(): void {
    this.#debugger.element.style.display = 'none'
  }

  /**
   * Add folder
   *
   * @param   {{title: string; expanded?: boolean;}} config
   * @returns {object}
   */
  addFolder(config: FolderParams): FolderApi {
    config = {expanded: false, ...config}
    return this.#debugger.addFolder(config)
  }

  /**
   * Add binding with on change handler
   *
   * @param   {object} object
   * @param   {string} property
   * @param   {string} label
   * @param   {object} config
   * @returns {object}
   */
  addBindingWithOnChange<T extends string>(
    object: {[key in T]: string | number},
    property: T,
    label: string,
    config: BindingParams | undefined,
  ): BindingApi<unknown, string | number> {
    return this.addBinding(label, object[property], config).on(
      'change',
      (e) => {
        object[property] = e.value
      },
    )
  }

  /**
   * Add binding
   *
   * @param   {string}             label
   * @param   {string | number}    value
   * @param   {object | undefined} config
   * @returns {object}
   */
  addBinding(
    label: string,
    value: string | number,
    config: BindingParams | undefined,
  ): BindingApi<unknown, string | number> {
    return this.#debugger.addBinding(
      {
        [label]: value,
      },
      label,
      config,
    )
  }

  /**
   * Add copy button
   *
   * @returns {void}
   */
  #addCopyButton(): void {
    const btn = this.#debugger.addButton({
      title: 'Copy',
    })
    btn.on('click', () => {
      const state = this.#debugger.exportState()

      if (state.children && state.children instanceof Array) {
        const pointer = state.children[0]
        const pointerSize = pointer.children[0]['binding']['value']
        const pointerTrailing = pointer.children[1]['binding']['value']

        const imageResolution = state.children[2]
        const imageResolutionWidth =
          imageResolution.children[0]['binding']['value']
        const imageResolutionHeight =
          imageResolution.children[1]['binding']['value']

        const imagePixel = state.children[3]
        const imagePixelSize = imagePixel.children[0]['binding']['value']

        const imagePixelMotion = state.children[4]
        const imagePixelMotionFrequency =
          imagePixelMotion.children[0]['binding']['value']
        const imagePixelMotionAmplitude =
          imagePixelMotion.children[1]['binding']['value']

        const imageMotion = state.children[5]
        const imageMotionFrequency = imageMotion.children[0]['binding']['value']
        const imageMotionAmplitude = imageMotion.children[1]['binding']['value']

        const settings = getSettings(
          imageResolutionWidth,
          imageResolutionHeight,
          imagePixelSize,
          imagePixelMotionFrequency,
          imagePixelMotionAmplitude,
          imageMotionFrequency,
          imageMotionAmplitude,
          pointerSize,
          pointerTrailing,
        )

        navigator.clipboard.writeText(settings).then(() => {
          btn.title = 'Copied!'
          setTimeout(() => {
            btn.title = 'Copy'
          }, 1000)
        })
      }
    })
  }
}
