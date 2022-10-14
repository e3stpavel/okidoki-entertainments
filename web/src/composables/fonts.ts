import { useCallback, useEffect, useState } from 'react'

export const useCustomFonts = (_map: Record<string, Promise<typeof import('*.ttf') | typeof import('*.otf')>>) => {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false)

  const map = Object.entries(_map).map(async ([name, promise]) => {
    const { default: source } = await promise
    const font = new FontFace(name, `url(${source})`)

    // @ts-expect-error FontFaceSet add method is missing from `lib.dom.d.ts`
    document.fonts.add(font)

    await font.load()

    return font
  })

  useEffect(() => {
    (async () => {
      try {
        await Promise.all([
          ...map,
          document.fonts.ready,
        ])

        setIsFontsLoaded(true)
      }
      catch (error) {
        console.error(error)
      }
    })()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    // TODO: figure out what to do here and how splashscreen should look on web
    return new Promise<void>(resolve => resolve())
  }, [isFontsLoaded])

  return { isFontsLoaded, onLayoutRootView }
}
