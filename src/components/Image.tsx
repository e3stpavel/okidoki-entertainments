import type { ImageSourcePropType, ImageProps as ReactNativeImageProps } from 'react-native'
import { PixelRatio, Image as ReactNativeImage } from 'react-native'

import { useEffect, useState } from 'react'
import Skeleton from '~/components/Skeleton'
import type { Size } from '~/types'

interface ImageProps<T> extends Omit<ReactNativeImageProps, 'source'> {
  /** source of typeof dynamic `import()` or uri string */
  source: Promise<T> | string

  /** the desired width of the image, if not provided {@link Skeleton} will not be shown */
  width?: number

  /** the desired height of the image, if not provided {@link Skeleton} will not be shown */
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
  const [imageSize, setImageSize] = useState<Size>({
    width: props.width ?? 0,
    height: props.height ?? 0,
  })
  const [source, setSource] = useState<ImageSourcePropType>()

  useEffect(() => {
    (async () => {
      try {
        let _src = props.source as string

        if (props.source instanceof Promise) {
          // get image size to pass to skeleton for fallback (if image is loading for quite long time)
          const { default: awaited } = await props.source
          _src = awaited
        }

        const src: number | string = _src

        let imageSourcePropType = { uri: src }
        if (typeof src === 'number')
          imageSourcePropType = ReactNativeImage.resolveAssetSource(src)

        if (Object.values(imageSize).some(x => x <= 0))
          setImageSize(await getImageSize(imageSourcePropType.uri))

        setSource({
          ...imageSourcePropType,
          width: PixelRatio.getPixelSizeForLayoutSize(imageSize.width),
          height: PixelRatio.getPixelSizeForLayoutSize(imageSize.height),
        })
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
