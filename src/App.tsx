import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useCustomFonts } from '@composables/fonts'

import { Image } from './components/'
import Comp from '~/comp'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 48,
    height: 48,
  },
})

export default function App() {
  const { isFontsLoaded, onLayoutRootView } = useCustomFonts({
    'Carmen Sans Medium': import('@assets/fonts/carmen-sans/CarmenSans-Medium.ttf'),
    'Carmen Sans SemiBold': import('@assets/fonts/carmen-sans/CarmenSans-SemiBold.ttf'),
    'Carmen Sans Bold': import('@assets/fonts/carmen-sans/CarmenSans-Bold.ttf'),
    'Carmen Sans ExtraBold': import('@assets/fonts/carmen-sans/CarmenSans-ExtraBold.ttf'),
  })

  if (!isFontsLoaded)
    return null

  return (
    <View style={styles.container} onLayout={ onLayoutRootView }>
      <Text style={{ fontFamily: 'Carmen Sans Medium' }}>Open up App.tsx to start working on your app!</Text>
      <Comp />
      {/* <Image style={ styles.image } source={ favicon as ImageSourcePropType } /> */}
      <Image style={ styles.image } source={ import('@assets/images/favicon.png') } />
      <StatusBar style="auto" />
    </View>
  )
}
