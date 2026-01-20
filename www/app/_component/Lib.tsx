/**
 * @description Library component
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
'use client'

import {useImg2Pxl} from '@d3p1/img2pxl/react'
import {lib} from '@/app/_etc/lib'

export default function Lib() {
  useImg2Pxl(lib)

  return (
    <div
      id="img2pxl"
      className="w-full h-full flex flex-col justify-center items-center"
    ></div>
  )
}
