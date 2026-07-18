import {
  ICampaignEvaluation,
  ICampaignSettings,
  ILevelVisual,
  TWeatherLevel,
} from '@/types';

/**
 * The initial, warning-free defaults (score 100, Level 1).
 */
export const INITIAL_SETTINGS: ICampaignSettings = {
  callingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  callingWindow: [8, 21],
  redialCount: 5,
  redialInterval: 3,
};

/** Number of redials attempted (0–10). Optimal = 5. */
export const REDIAL_COUNT_PENALTY: Record<number, number> = {
  0: -100,
  1: -90,
  2: -55,
  3: -31,
  4: -13,
  5: 0,
  6: 0,
  7: 0,
  8: -19,
  9: -43,
  10: -76,
};

/** Hours between redials. Only these discrete stops are selectable. Optimal = 3h/6h. */
export const REDIAL_INTERVAL_OPTIONS = [3, 6, 9, 12, 24] as const;
export const REDIAL_INTERVAL_PENALTY: Record<number, number> = {
  3: 0,
  6: 0,
  9: -12,
  12: -22,
  24: -34,
};

/** Number of calling days per week (1–7). Optimal = 5 (Mon–Fri). */
export const CALLING_DAYS_PENALTY: Record<number, number> = {
  1: -40,
  2: -30,
  3: -20,
  4: -10,
  5: 0,
  6: 0,
  7: 0,
};

/** Length of the daily calling window in hours (3–13). Optimal = 13h (8 AM–9 PM). */
export const CALLING_WINDOW_PENALTY: Record<number, number> = {
  3: -33,
  4: -26,
  5: -20,
  6: -13,
  7: -7,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 0,
};

/** Weather levels keyed by the inclusive score band that produces them. */
export const WEATHER_LEVELS = [
  { level: 1 as const, min: 82, max: 100 },
  { level: 2 as const, min: 62, max: 81 },
  { level: 3 as const, min: 42, max: 61 },
  { level: 4 as const, min: 0, max: 41 },
];

/** The calling window runs on a 24h clock: 8 (8 AM) … 21 (9 PM). */
export const WINDOW_MIN_HOUR = 8;
export const WINDOW_MAX_HOUR = 21;
/** Shortest selectable window (dictionary starts at 3h). */
export const WINDOW_MIN_LENGTH = 3;

export const REDIAL_COUNT_MIN = 0;
export const REDIAL_COUNT_MAX = 10;

export const DAY_LABELS = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
] as const;

/** Fixed axis ticks under the calling-window slider (8 AM … 9 PM). */
export const WINDOW_TICKS = [8, 11, 14, 17, 21];
export const COUNT_TICKS = [0, 2, 4, 6, 8, 10];

/**
 * Per-level warning level for the forecast scene.
 */
export const LEVEL_VISUALS: Record<TWeatherLevel, ILevelVisual> = {
  1: { warning: false },
  2: { warning: false },
  3: { warning: true },
  4: { warning: true },
};

export const PENALTY_ROWS: {
  key: keyof ICampaignEvaluation['penalties'];
  label: string;
}[] = [
  { key: 'callingDays', label: 'Calling days penalty' },
  { key: 'callingWindow', label: 'Calling window penalty' },
  { key: 'redialCount', label: 'Redial count penalty' },
  { key: 'redialInterval', label: 'Redial interval penalty' },
];
