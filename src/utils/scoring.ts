/**
 * Scoring engine for the Redial & Guardrails forecast.
 */
import {
  CALLING_DAYS_PENALTY,
  CALLING_WINDOW_PENALTY,
  REDIAL_COUNT_PENALTY,
  REDIAL_INTERVAL_PENALTY,
  WEATHER_LEVELS,
  WINDOW_MIN_LENGTH,
} from '@/constants';
import { ICampaignEvaluation, ICampaignSettings, TWeatherLevel } from '@/types';

/** Look a value up in a penalty table, clamping to the table's known range. */
function lookup(table: Record<number, number>, key: number): number {
  if (key in table) return table[key];
  const keys = Object.keys(table).map(Number);
  const min = Math.min(...keys);
  const max = Math.max(...keys);
  return table[Math.min(Math.max(key, min), max)] ?? 0;
}

export function callingDaysPenalty(days: string[]): number {
  // Penalty depends only on how many days are selected. Zero days is treated
  // as the worst case (same as one day) since the dictionary starts at 1.
  const count = Math.max(days.length, 1);
  return lookup(CALLING_DAYS_PENALTY, count);
}

export function callingWindowPenalty([start, end]: [number, number]): number {
  const length = Math.max(end - start, WINDOW_MIN_LENGTH);
  return lookup(CALLING_WINDOW_PENALTY, length);
}

export function redialCountPenalty(count: number): number {
  return lookup(REDIAL_COUNT_PENALTY, count);
}

export function redialIntervalPenalty(interval: number): number {
  return lookup(REDIAL_INTERVAL_PENALTY, interval);
}

export function weatherLevelForScore(score: number): TWeatherLevel {
  return (
    WEATHER_LEVELS.find((band) => score >= band.min && score <= band.max)
      ?.level ?? 4
  );
}

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
