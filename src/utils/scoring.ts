import {
  CALLING_DAYS_PENALTY,
  CALLING_WINDOW_PENALTY,
  MIN_CALLING_DAYS,
  REDIAL_COUNT_PENALTY,
  REDIAL_INTERVAL_PENALTY,
  WEATHER_LEVELS,
  WINDOW_MIN_LENGTH,
} from '@/constants';
import { ICampaignEvaluation, ICampaignSettings, TWeatherLevel } from '@/types';

/**
 * Retrieves the penalty associated with the given key from a lookup table.
 * If the provided key is outside the supported range, it is clamped to the
 * nearest available key before performing the lookup.
 *
 * @param table - Mapping of input values to penalty scores.
 * @param key - Value whose penalty should be retrieved.
 * @returns The corresponding penalty score, or `0` if no value is found.
 */
function lookup(table: Record<number, number>, key: number): number {
  if (key in table) return table[key];
  const keys = Object.keys(table).map(Number);
  const min = Math.min(...keys);
  const max = Math.max(...keys);
  return table[Math.min(Math.max(key, min), max)] ?? 0;
}

/**
 * Calculates the penalty based on the number of selected calling days.
 * At least one day is always considered when calculating the penalty to
 * ensure a valid lookup.
 *
 * @param days - Array of selected calling days.
 * @returns The penalty associated with the selected number of calling days.
 */
export function callingDaysPenalty(days: string[]): number {
  const count = Math.max(days.length, MIN_CALLING_DAYS);
  return lookup(CALLING_DAYS_PENALTY, count);
}

/**
 * Calculates the penalty for the configured calling window.
 * The window length is constrained to the minimum supported duration before
 * determining the penalty.
 *
 * @param window - Calling window represented as `[startHour, endHour]`.
 * @returns The penalty associated with the configured calling window.
 */
export function callingWindowPenalty([start, end]: [number, number]): number {
  const length = Math.max(end - start, WINDOW_MIN_LENGTH);
  return lookup(CALLING_WINDOW_PENALTY, length);
}

/**
 * Calculates the penalty based on the configured redial count.
 * @param count - Maximum number of redial attempts.
 * @returns The penalty associated with the configured redial count.
 */
export function redialCountPenalty(count: number): number {
  return lookup(REDIAL_COUNT_PENALTY, count);
}

/**
 * Calculates the penalty based on the configured redial interval.
 * @param interval - Interval between redial attempts, in hours.
 * @returns The penalty associated with the configured redial interval.
 */
export function redialIntervalPenalty(interval: number): number {
  return lookup(REDIAL_INTERVAL_PENALTY, interval);
}

/**
 * Determines the weather level corresponding to a campaign score.
 *
 * The score is matched against the configured weather level ranges. If no
 * matching range is found, the highest severity level is returned.
 *
 * @param score - Campaign score.
 *
 * @returns The weather level associated with the provided score.
 */
export function weatherLevelForScore(score: number): TWeatherLevel {
  return (
    WEATHER_LEVELS.find((band) => score >= band.min && score <= band.max)
      ?.level ?? 4
  );
}

/**
 * Evaluates the current campaign configuration by calculating penalties,
 * deriving the overall score, and determining the corresponding weather level.
 *
 * The overall score starts at `100` and is adjusted by applying penalties for
 * the configured calling days, calling window, redial count, and redial
 * interval. The final score is clamped to the range `0–100`.
 *
 * @param settings - Campaign settings to evaluate.
 * @returns The evaluated campaign, including:
 * - `penalties` - Penalty breakdown for each setting.
 * - `score` - Final campaign score.
 * - `level` - Weather level derived from the score.
 */
export function evaluateCampaign(
  settings: ICampaignSettings,
): ICampaignEvaluation {
  const penalties = {
    callingDays: callingDaysPenalty(settings.callingDays),
    callingWindow: callingWindowPenalty(settings.callingWindow),
    redialCount: redialCountPenalty(settings.redialCount),
    redialInterval: redialIntervalPenalty(settings.redialInterval),
  };

  const raw =
    100 +
    penalties.callingDays +
    penalties.callingWindow +
    penalties.redialCount +
    penalties.redialInterval;

  const score = Math.max(0, Math.min(100, raw));

  return { penalties, score, level: weatherLevelForScore(score) };
}
