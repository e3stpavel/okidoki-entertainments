import type { ImageSourcePropType, ImageProps as ReactNativeImageProps } from 'react-native'
import { Image as ReactNativeImage, Text } from 'react-native'

import { useEffect, useState } from 'react'

interface ImageProps<T> extends Omit<ReactNativeImageProps, 'source'> {
  source: Promise<T>
}

const Image = <T extends typeof import('*.jpg') | typeof import('*.png')>(props: ImageProps<T>) => {
  const [source, setSource] = useState<ImageSourcePropType | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const { default: src } = await props.source
        setSource(src as ImageSourcePropType)
      }
      catch (error) {
        console.error(error)
      }
    })()
  }, [])

  // TODO: use skeleton to enhance UX, e.g. get approx Image size and render gray div with infinite animation
  if (!source)
    return <Text style={{ fontFamily: 'Carmen Sans Medium' }}>Loading...</Text>

  return (
    <ReactNativeImage {...props} source={ source } />
  )
}

export default Image
