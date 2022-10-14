import { useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet } from 'react-native'
import Theme from 'theme'
import type { Size } from '~/types'

const styles = StyleSheet.create({
  view: {
    backgroundColor: Theme.colors['gray-300'],
  },
})

const Skeleton = (props: { overlay: Size; rounded?: boolean }) => {
  const color = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const config = {
      duration: 750,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }

    Animated.loop(
      Animated.sequence([
        Animated.timing(color, {
          toValue: 1,
          ...config,
        }),
        Animated.timing(color, {
          toValue: 0,
          ...config,
        }),
      ]),
    ).start()
  }, [color])

  const backgroundColor = color.interpolate({
    inputRange: [0, 1],
    outputRange: [Theme.colors['gray-300'], Theme.colors['gray-100']],
  })

  const borderRadius = props.rounded ? 9999 : 8

  return (
    <Animated.View
      style={[
        styles.view,
        {
          width: props.overlay.width,
          height: props.overlay.height,
          backgroundColor,
          borderRadius,
        },
      ]} />
  )
}

export default Skeleton
