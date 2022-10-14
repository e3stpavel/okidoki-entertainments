import type { ImageSourcePropType, ImageProps as ReactNativeImageProps } from 'react-native'
import { Image as ReactNativeImage } from 'react-native'

import { useEffect, useState } from 'react'
import Skeleton from '~/components/Skeleton'
import type { Size } from '~/types'

interface ImageProps<T> extends Omit<ReactNativeImageProps, 'source'> {
  /** source of typeof dynamic `import()` or uri string */
  source: Promise<T> | string
  width?: number
  height?: number
}

const getImageSize = (uri: string): Promise<Size> => {
  return new Promise((resolve) => {
    ReactNativeImage.getSize(uri, (width, height) => {
      resolve({ width, height })
    })
  })
}

const Image = <T extends typeof import('*.jpg') | typeof import('*.png')>(props: ImageProps<T>) => {
  const [imageSize, setImageSize] = useState<Size>({ width: props.width ?? 0, height: props.height ?? 0 })
  const [source, setSource] = useState<ImageSourcePropType>()

  useEffect(() => {
    // trying to get current component width and height thru style

    (async () => {
      // doing this because Image.prefecth method is unimplemented well
      if (typeof props.source === 'string') {
        const uri = props.source

        setImageSize(await getImageSize(uri))
        setSource({ uri })
        return
      }

      try {
        // get image size to pass to skeleton for fallback (if image is loading for quite long time)
        const { default: src } = await props.source
        setSource(src as ImageSourcePropType)

        const uri = typeof src === 'number' ? ReactNativeImage.resolveAssetSource(src).uri : src

        setImageSize(await getImageSize(uri))
      }
      catch (error) {
        console.error(error)
      }
    })()
  }, [])

  if (!source)
    return <Skeleton overlay={ imageSize } />

  return (
    <ReactNativeImage {...props}
      source={ source }
      style={{ ...imageSize }} />
  )
}

export default Image
