import type { ImageSourcePropType, ImageProps as ReactNativeImageProps } from 'react-native'
import { Image as ReactNativeImage } from 'react-native'

import { useEffect, useState } from 'react'
import Skeleton from '~/components/Skeleton'
import type { Size } from '~/types'

interface ImageProps<T> extends Omit<ReactNativeImageProps, 'source'> {
  source: Promise<T>
}

const Image = <T extends typeof import('*.jpg') | typeof import('*.png')>(props: ImageProps<T>) => {
  const [imageSize, setImageSize] = useState<Size>({ width: 0, height: 0 })
  const [source, setSource] = useState<ImageSourcePropType>()

  useEffect(() => {
    (async () => {
      try {
        // get image size to pass to skeleton for fallback (if image is loading for quite long time)
        const { default: src } = await props.source
        setSource(src as ImageSourcePropType)

        const uri = typeof src === 'number' ? ReactNativeImage.resolveAssetSource(src).uri : src

        ReactNativeImage.getSize(uri, (width, height) => setImageSize({ width, height }))
      }
      catch (error) {
        console.error(error)
      }
    })()
  }, [])

  // TODO: use skeleton to enhance UX, e.g. get approx Image size and render gray div with infinite animation
  // if (!source)
  //   return <Text style={{ fontFamily: 'Carmen Sans Medium' }}>Loading...</Text>

  // return (
  //   <ReactNativeImage {...props} source={ source } />
  // )

  return (
    <Skeleton overlay={ imageSize } />
  )
}

export default Image
