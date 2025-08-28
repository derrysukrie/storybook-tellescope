export const AvatarSizeValues = {
    extraSmall: 'extra small',
    small: 'small',
    medium: 'medium',
    large: 'large',
}

export const AvatarColorValues = {
    primary: 'primary',
    secondary: 'secondary',
    default: 'default',
}

export const AvatarSizeDimensions: { [key: string]: number } = {
    [AvatarSizeValues.extraSmall]: 24,
    [AvatarSizeValues.small]: 32,
    [AvatarSizeValues.medium]: 40,
    [AvatarSizeValues.large]: 56,
}

export const AvatarColorBorderValue: { [key: string]: string } = {
    [AvatarColorValues.primary]: 'solid 2px var(--primary-light)',
    [AvatarColorValues.secondary]: 'solid 2px var(--secondary-light)',
}

export type AvatarSize = 'extra small' | 'small' | 'medium' | 'large'

export type AvatarColor = 'primary' | 'secondary' | 'default'
