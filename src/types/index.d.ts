/** Component's Size object */
export interface Size {
  width: number
  height: number
}

export interface ThemeConfig {
  /** User defined colors {@link https://reactnative.dev/docs/colors in supported format} */
  colors: Record<string, string>
}
