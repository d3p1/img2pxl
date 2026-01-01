/**
 * @description Hook
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import type {Config} from '../../core'
import {Img2Pxl} from '../../core'
import {useEffect, useRef} from 'react'

export default function useImg2Pxl(config: Config) {
  const instanceRef = useRef<Img2Pxl>(null)

  useEffect(() => {
    if (instanceRef.current) return

    instanceRef.current = new Img2Pxl(config)

    return () => instanceRef.current?.dispose()
  }, [config])

  return instanceRef
}
