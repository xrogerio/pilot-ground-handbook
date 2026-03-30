export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  hex = hex.replace(/^#/, '')
  let r = 0,
    g = 0,
    b = 0
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16)
    g = parseInt(hex[1] + hex[1], 16)
    b = parseInt(hex[2] + hex[2], 16)
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16)
    g = parseInt(hex.substring(2, 4), 16)
    b = parseInt(hex.substring(4, 6), 16)
  }
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h = 0,
    s = 0,
    l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export function generatePalette(primaryHex: string, isDark: boolean) {
  const { h, s, l } = hexToHsl(primaryHex)

  const primary = `${h} ${s}% ${l}%`
  const primaryFg = l > 50 ? `${h} ${s}% 10%` : `${h} ${s}% 98%`

  const ring = primary
  const accent = primary
  const accentFg = primaryFg

  let bg, fg, card, cardFg, border, muted, mutedFg, secondary, secondaryFg

  if (isDark) {
    bg = `${h} ${Math.min(s, 20)}% 5%`
    fg = `${h} ${Math.min(s, 20)}% 95%`
    card = `${h} ${Math.min(s, 20)}% 8%`
    cardFg = fg
    border = `${h} ${Math.min(s, 20)}% 15%`
    muted = `${h} ${Math.min(s, 20)}% 15%`
    mutedFg = `${h} ${Math.min(s, 20)}% 65%`
    secondary = `${h} ${Math.min(s, 20)}% 15%`
    secondaryFg = fg
  } else {
    bg = `${h} ${Math.min(s, 10)}% 98%`
    fg = `${h} ${Math.min(s, 20)}% 10%`
    card = `0 0% 100%`
    cardFg = fg
    border = `${h} ${Math.min(s, 20)}% 90%`
    muted = `${h} ${Math.min(s, 20)}% 92%`
    mutedFg = `${h} ${Math.min(s, 20)}% 45%`
    secondary = `${h} ${Math.min(s, 20)}% 92%`
    secondaryFg = fg
  }

  return {
    '--primary': primary,
    '--primary-foreground': primaryFg,
    '--accent': accent,
    '--accent-foreground': accentFg,
    '--ring': ring,
    '--background': bg,
    '--foreground': fg,
    '--card': card,
    '--card-foreground': cardFg,
    '--border': border,
    '--muted': muted,
    '--muted-foreground': mutedFg,
    '--secondary': secondary,
    '--secondary-foreground': secondaryFg,
  }
}
