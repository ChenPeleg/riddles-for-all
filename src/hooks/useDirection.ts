import { useI18n } from '../context/I18nContext';

/**
 * Hook that provides RTL/LTR direction utilities
 * Returns helpers for building direction-aware class names and attributes
 */
export function useDirection() {
  const { lang, isRTL } = useI18n();

  /**
   * Get the direction attribute value ('rtl' or 'ltr')
   */
  const dir = isRTL ? 'rtl' : 'ltr';

  /**
   * Get a directional class name based on RTL state
   * @param rtlClass - The class to use for RTL languages
   * @param ltrClass - The class to use for LTR languages (optional, defaults to '')
   * @returns The appropriate class string
   *
   * @example
   * getDirectionalClass('text-right', 'text-left') // returns 'text-right' for Hebrew, 'text-left' for English
   * getDirectionalClass('right-0', 'left-0')
   */
  const getDirectionalClass = (rtlClass: string, ltrClass: string = ''): string => {
    return isRTL ? rtlClass : ltrClass;
  };

  /**
   * Get positioning class (commonly used for absolute positioning)
   * @param side - Which side to position: 'start' (left in LTR, right in RTL) or 'end' (right in LTR, left in RTL)
   * @returns The appropriate positioning class
   *
   * @example
   * getPositionClass('start') // returns 'left-0' for English, 'right-0' for Hebrew
   * getPositionClass('end') // returns 'right-0' for English, 'left-0' for Hebrew
   */
  const getPositionClass = (side: 'start' | 'end'): string => {
    if (side === 'start') {
      return isRTL ? 'right-0' : 'left-0';
    }
    return isRTL ? 'left-0' : 'right-0';
  };

  /**
   * Get flex direction class for RTL support
   * @param orientation - Flex orientation: 'row' (default) or 'col'
   * @returns 'flex-row-reverse' for RTL row, empty string for LTR row, 'items-end' for RTL col, 'items-start' for LTR col
   */
  const getFlexDirection = (orientation: 'row' | 'col' = 'row'): string => {
    if (orientation === 'col') {
      return isRTL ? 'items-end' : 'items-start';
    }
    return isRTL ? 'flex-row-reverse' : '';
  };

  /**
   * Get text alignment class
   * @param defaultAlign - Default alignment for LTR (defaults to 'left')
   * @returns The appropriate text alignment class
   */
  const getTextAlign = (defaultAlign: 'left' | 'center' | 'right' = 'left'): string => {
    if (defaultAlign === 'center') return 'text-center';

    if (isRTL) {
      return defaultAlign === 'left' ? 'text-right' : 'text-left';
    }
    return defaultAlign === 'left' ? 'text-left' : 'text-right';
  };

  return {
    lang,
    isRTL,
    dir,
    getDirectionalClass,
    getPositionClass,
    getFlexDirection,
    getTextAlign,
  };
}
