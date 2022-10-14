import type { ThemeConfig } from '~/types'

/**
 * Type helper to make it easier to use `theme.config.ts`
 * accepts a direct {@link ThemeConfig} object, or a function that returns it.
 */
export function defineCustomTheme(config: ThemeConfig): ThemeConfig {
  return config
}
