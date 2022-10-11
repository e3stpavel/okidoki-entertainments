// import type { LayoutChangeEvent } from 'react-native'
import { Animated, StyleSheet } from 'react-native'
// import { useCallback } from 'react'
import Theme from 'theme'
import type { Size } from '~/types'

const styles = StyleSheet.create({
  view: {
    backgroundColor: Theme.colors['gray-300'],
  },
})

const Skeleton = (props: { overlay: Size }) => {
  // const onLayoutSkeletonView = useCallback((event: LayoutChangeEvent) => {
  //   const { width, height } = event.nativeEvent.layout
  //   console.log({ width, height })
  // }, [])

  console.log(props.overlay)

  return (
    <Animated.View
      style={{ width: props.overlay.width, height: props.overlay.height, ...styles.view }} />
  )
}

export default Skeleton
