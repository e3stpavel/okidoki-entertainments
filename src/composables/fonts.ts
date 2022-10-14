import type { FontSource } from 'expo-font'
import { useCallback, useEffect, useState } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

export const useCustomFonts = (map: Record<string, FontSource>) => {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false)

  const [loaded] = useFonts(map)

  useEffect(() => {
    (async () => {
      await SplashScreen.preventAutoHideAsync()
    })()

    setIsFontsLoaded(loaded)
  }, [loaded])

  const onLayoutRootView = useCallback(async () => {
    if (isFontsLoaded)
      await SplashScreen.hideAsync()
  }, [isFontsLoaded])

  return { isFontsLoaded, onLayoutRootView }
}
