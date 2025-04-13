/**
 * @description Types
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */

/**
 * @note Image that should be rendered
 */
export interface ImgSource {
  src: string
  width: number
  height: number
  resolution: {
    width: number
    height: number
  }
  pixel?: {
    size?: number
    alphaTest?: number
    motion?: {
      displacement?: {
        frequency?: number
        amplitude?: number
      }
    }
  }
  motion?: {
    noise?: {
      src?: string
      frequency?: number
      amplitude?: number
    }
  }
}

/**
 * @note Image by breakpoint
 */
export interface ImgSourceCollection {
  [breakpoint: number]: ImgSource
}

/**
 * @note Configuration that sets up library behavior
 */
export interface Config {
  containerSelector?: string
  images: ImgSourceCollection
  pointer?: {
    src?: string
    size?: number
    trailing?: {
      factor?: number
    }
  }
  isDebugging?: boolean
}
