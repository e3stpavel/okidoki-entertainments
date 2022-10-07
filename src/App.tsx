import { StatusBar } from 'expo-status-bar'
import { Image, StyleSheet, Text, View } from 'react-native'
import Comp from '~/comp'
import * as v from '~/../assets/favicon.png'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

console.log(v)

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Comp />
      <Image source={v.default} />
      <StatusBar style="auto" />
    </View>
  )
}
