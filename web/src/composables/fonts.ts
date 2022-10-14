import type { FontSource } from 'expo-font'
import { useCallback, useEffect, useState } from 'react'

export const useCustomFonts = (map: Record<string, FontSource>) => {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false)

  const fontFaceMap = Object.entries(map).map(async ([name, source]) => {
    const font = new FontFace(name, `url(${source})`)

    // @ts-expect-error FontFaceSet add method is missing from `lib.dom.d.ts`
    document.fonts.add(font)

    await font.load()

    return font
  })

  useEffect(() => {
    (async () => {
      await Promise.all([
        ...fontFaceMap,
        document.fonts.ready,
      ])

      setIsFontsLoaded(true)
    })()
  }, [fontFaceMap])

  const onLayoutRootView = useCallback(async () => {
    // TODO: figure out what to do here and how splashscreen should look on web
    return new Promise<void>(resolve => resolve())
  }, [fontFaceMap])

  return { isFontsLoaded, onLayoutRootView }
}
