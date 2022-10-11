/** Component's Size object */
export interface Size {
  width: number
  height: number
}

export interface ThemeConfig {
  /** User defined colors {@link https://reactnative.dev/docs/colors in supported format} */
  colors: Record<string, string>
}

/**
 * Type helper to make it easier to use `theme.config.ts`
 * accepts a direct {@link ThemeConfig} object, or a function that returns it.
 */
export declare function defineCustomTheme(config: ThemeConfig): ThemeConfig
