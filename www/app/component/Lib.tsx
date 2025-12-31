/**
 * @description Library component
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
'use client'

import {useEffect} from 'react'
import Img2Pxl from '@d3p1/img2pxl'

export default function Lib() {
  useEffect(() => {
    new Img2Pxl({
      images: {
        0: {
          src: '/img2pxl/media/images/services/meisje-met-de-parel.png',
          width: 512 * 0.5,
          height: 600 * 0.5,
          resolution: {
            width: 512 * 0.3,
            height: 600 * 0.3,
          },
          pixel: {
            size: 2,
            alphaTest: 0.9,
            motion: {
              displacement: {
                frequency: 1,
                amplitude: 40,
              },
            },
          },
          motion: {
            noise: {
              frequency: 0.025,
              amplitude: 40,
            },
          },
        },
        820: {
          src: '/img2pxl/media/images/services/meisje-met-de-parel.png',
          width: 512 * 1.3,
          height: 600 * 1.3,
          resolution: {
            width: 512 * 0.5,
            height: 600 * 0.5,
          },
          pixel: {
            size: 2,
            motion: {
              displacement: {
                frequency: 1,
                amplitude: 40,
              },
            },
          },
          motion: {
            noise: {
              frequency: 0,
              amplitude: 0,
            },
          },
        },
      },
      pointer: {
        size: 0.1,
      },
      containerSelector: '#img2pxl',
      isDebugging: true,
    })
  }, [])

  return (
    <div
      id="img2pxl"
      className="w-full h-full flex flex-col justify-center items-center"
    ></div>
  )
}
