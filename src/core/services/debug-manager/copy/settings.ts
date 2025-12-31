/**
 * @description Debug manager raw settings
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        It is returned a plain text of the settings that
 *              should be used to instance current effect.
 *              This plain text is used by the copy button of the
 *              debug manager
 */
export const getSettings = (
  imagePixelSize: string,
  imagePixelMotionFrequency: string,
  imagePixelMotionAmplitude: string,
  imageMotionFrequency: string,
  imageMotionAmplitude: string,
  pointerSize: string,
  pointerTrailing: string,
) => {
  return `{
    images: {
      0: {
        src: <image-src>,
        width: <image-width>,
        height: <image-height>,
        resolution: {
          width: <image-resolution-width>,
          height: <image-resolution-height>
        },
        pixel: {
          size: ${imagePixelSize},
          motion: {
            displacement: {
              frequency: ${imagePixelMotionFrequency},
              amplitude: ${imagePixelMotionAmplitude}
            }
          }
        },
        motion: {
          noise: {
            frequency: ${imageMotionFrequency},
            amplitude: ${imageMotionAmplitude}
          }
        }
      }
    },
    pointer: {
      size: ${pointerSize},
      trailing: {
        factor: ${pointerTrailing}
      }
    }
  }`
}
