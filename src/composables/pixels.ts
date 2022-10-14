import { Dimensions, PixelRatio } from 'react-native'
import { useState } from 'react'

const { width, height } = Dimensions.get('window')

const useBounds = (value: number, limit = 2): number[] => {
  return [
    PixelRatio.roundToNearestPixel(value - limit),
    PixelRatio.roundToNearestPixel(value + limit),
  ]
}

export const usePixel = (value: number): number => {
  const [dimensions, setDimensions] = useState<number[]>([width, height])

  Dimensions.addEventListener('change', ({ window }) => {
    const { width, height } = window
    setDimensions([width, height])
  })

  const dimension = Math.min(...dimensions)

  // calibrated as 1px on iPhone 6/7/8 screen
  const result = value * (0.8 + 0.05335 * (dimension / 100))

  const [lower, upper] = useBounds(value)
  if (result < lower)
    return lower

  if (result > upper)
    return upper

  return result
}
