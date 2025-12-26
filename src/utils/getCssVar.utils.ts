export function getCssVar(variableName: string, asNumber?: false): string;
export function getCssVar(variableName: string, asNumber: true): number;
export function getCssVar(
  variableName: string,
  asNumber = false,
): string | number {
  if (!variableName.startsWith('--')) {
    throw new Error(
      `getCssVar: переменная должна начинаться с "--". Получено: ${variableName}`,
    );
  }

  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();

  if (asNumber) {
    const numericValue = parseFloat(value);

    if (isNaN(numericValue)) {
      throw new Error(
        `getCssVar: не удалось преобразовать значение в число. Переменная: ${variableName}, значение: ${value}`,
      );
    }

    return numericValue;
  }

  return value;
}
