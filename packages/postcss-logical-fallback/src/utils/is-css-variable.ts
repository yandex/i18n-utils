export const isCssVariable = (value: string): boolean => /var\(--[^)]+\)/.test(value);
