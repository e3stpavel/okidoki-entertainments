// import type { LayoutChangeEvent } from 'react-native'
import { Animated, StyleSheet } from 'react-native'
// import { useCallback } from 'react'
import type { Size } from '~/types'

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#aaaaaa',
    // width: 100,
    // height: 100,
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
