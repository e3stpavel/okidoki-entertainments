import type { FontSource } from 'expo-font'
import { loadAsync } from 'expo-font'
import { useCallback, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'

export const useCustomFonts = (_map: Record<string, Promise<typeof import('*.ttf') | typeof import('*.otf')>>) => {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false)
  const promises = Object.values(_map)

  useEffect(() => {
    (async () => {
      await SplashScreen.preventAutoHideAsync()

      const values = await Promise.all(promises)
      const map = Object.fromEntries<FontSource>(
        Object.keys(_map).map((key, i) => {
          return [
            key, values[i].default,
          ]
        }),
      )

      try {
        await loadAsync(map)
        setIsFontsLoaded(true)
      }
      catch (error) {
        console.error(error)
      }
    })()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (isFontsLoaded)
      await SplashScreen.hideAsync()
  }, [isFontsLoaded])

  return { isFontsLoaded, onLayoutRootView }
}
