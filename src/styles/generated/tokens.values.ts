export const tokens = {
  "color": {
    "background": {
      "primary": "--color-background-primary",
      "secondary": "--color-background-secondary"
    },
    "accent": {
      "primary": "--color-accent-primary",
      "secondary": "--color-accent-secondary"
    },
    "text": {
      "primary": "--color-text-primary",
      "secondary": "--color-text-secondary"
    },
    "glass": {
      "primary": "--color-glass-primary",
      "secondary": "--color-glass-secondary"
    }
  },
  "radius": {
    "sm": "--radius-sm",
    "md": "--radius-md",
    "lg": "--radius-lg",
    "full": "--radius-full"
  },
  "shadow": {
    "sm": "--shadow-sm",
    "md": "--shadow-md",
    "lg": "--shadow-lg",
    "xl": "--shadow-xl"
  },
  "spacing": {
    "xs": "--spacing-xs",
    "sm": "--spacing-sm",
    "md": "--spacing-md",
    "lg": "--spacing-lg",
    "xl": "--spacing-xl",
    "2xl": "--spacing-2xl"
  },
  "font": {
    "family": {
      "base": "--font-family-base",
      "brand": "--font-family-brand"
    }
  },
  "z-index": {
    "dropdown": "--z-index-dropdown",
    "modal": "--z-index-modal",
    "tooltip": "--z-index-tooltip"
  }
} as const;