import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useCustomFonts } from '@composables/fonts'

import Image from './components/Image'
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
      <Image style={ styles.image } source={ import('@assets/images/favicon.png') } />
      <Image
        source="https://images.unsplash.com/photo-1664127543072-8615a3b17367?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        // by providing this properties you set the initial expected image size (skeleton will use that)
        width={ 48 }
        height={ 48 } />
      <StatusBar style="auto" />
    </View>
  )
}
