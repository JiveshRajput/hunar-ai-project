/**
 * Format a 24h-clock hour as a compact 12h label, e.g. 8 -> "8 AM", 21 -> "9 PM".
 * @param {number} - Hours to convert
 */
export function formatHour(hour: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h} ${period}`;
}

/**
 * Render a penalty number as it appears in the UI: "0" or "-10".
 * @param {number} - Value to be checked
 */
export function formatPenalty(value: number): string {
  return value === 0 ? '0' : `${value}`;
}
