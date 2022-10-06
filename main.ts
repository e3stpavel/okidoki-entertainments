import { registerRootComponent } from 'expo'
import { Platform, UIManager } from 'react-native'

import App from './src/'

if (Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
)
  UIManager.setLayoutAnimationEnabledExperimental(true)

registerRootComponent(App)
