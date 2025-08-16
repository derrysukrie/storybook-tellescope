import React from 'react';
import { SvgIcon } from '@mui/material';
import type { SvgIconProps } from '@mui/material';

export type IconSize = 'small' | 'medium' | 'large';

export interface IconProps extends Omit<SvgIconProps, 'fontSize'> {
  /**
   * The size of the icon
   * @default 'medium'
   */
  size?: IconSize;
  /**
   * The icon component to render (MUI icon component) or path to SVG file
   */
  icon: React.ElementType | string;
}

/**
 * Icon component that wraps MUI SvgIcon with predefined size variants
 * Can use either MUI icons or SVG files
 */
export const Icon = ({ 
  size = 'medium', 
  icon,
  style,
  className,
  ...props 
}: IconProps) => {
  // Map size to fontSize prop
  const fontSizeMap: Record<IconSize, SvgIconProps['fontSize']> = {
    small: 'small',
    medium: 'medium',
    large: 'large',
  };

  // Size in pixels for direct SVG rendering
  const sizeInPixels: Record<IconSize, number> = {
    small: 20,
    medium: 24,
    large: 32,
  };

  // If icon is a string, treat it as an SVG file path
  if (typeof icon === 'string') {
    return (
      <img 
        src={icon} 
        alt=""
        className={className}
        style={{ 
          width: sizeInPixels[size], 
          height: sizeInPixels[size],
          ...style
        }}
      />
    );
  }

  // Otherwise render using MUI SvgIcon
  return (
    <SvgIcon
      component={icon}
      fontSize={fontSizeMap[size]}
      style={style}
      className={className}
      {...props}
    />
  );
};

export default Icon; 