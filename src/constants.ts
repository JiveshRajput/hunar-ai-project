import {
  ICampaignEvaluation,
  ICampaignSettings,
  ILevelVisual,
  TWeatherLevel,
} from '@/types';

/**
 * Default campaign settings used to initialize the application.
 * These values represent the optimal configuration, resulting in a campaign
 * score of `100` and a Level 1 weather forecast.
 */
export const INITIAL_SETTINGS: ICampaignSettings = {
  callingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  callingWindow: [8, 21],
  redialCount: 5,
  redialInterval: 3,
};

/**
 * Maps the configured redial count to its corresponding penalty score.
 * The key represents the maximum number of redial attempts, while the value
 * represents the penalty applied during campaign evaluation.
 */
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

/**
 * Maps the configured redial interval, in hours, to its corresponding
 * penalty score.
 * Only the predefined interval values are supported.
 */
export const REDIAL_INTERVAL_PENALTY: Record<number, number> = {
  3: 0,
  6: 0,
  9: -12,
  12: -22,
  24: -34,
};

/**
 * Maps the number of selected calling days to its corresponding penalty score.
 * The key represents the number of active calling days in a week.
 */
export const CALLING_DAYS_PENALTY: Record<number, number> = {
  1: -40,
  2: -30,
  3: -20,
  4: -10,
  5: 0,
  6: 0,
  7: 0,
};

/**
 * Maps the duration of the calling window, in hours, to its corresponding
 * penalty score.
 * The key represents the total length of the configured calling window.
 */
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

/**
 * Defines the campaign score ranges for each weather level.
 *
 * Each level is selected when the campaign score falls within the inclusive
 * `min` and `max` range.
 */
export const WEATHER_LEVELS = [
  { level: 1 as const, min: 82, max: 100 },
  { level: 2 as const, min: 62, max: 81 },
  { level: 3 as const, min: 42, max: 61 },
  { level: 4 as const, min: 0, max: 41 },
];

/**
 * Minimum number of calling days that must remain selected.
 */
export const MIN_CALLING_DAYS = 1;

/**
 * Earliest hour available for the calling window.
 *
 * Represented using a 24-hour clock.
 */
export const WINDOW_MIN_HOUR = 8;

/**
 * Latest hour available for the calling window.
 *
 * Represented using a 24-hour clock.
 */
export const WINDOW_MAX_HOUR = 21;

/**
 * Minimum allowed duration, in hours, for the calling window.
 */
export const WINDOW_MIN_LENGTH = 3;

/**
 * Minimum supported redial count.
 */
export const REDIAL_COUNT_MIN = 0;

/**
 * Maximum supported redial count.
 */
export const REDIAL_COUNT_MAX = 10;

/**
 * Labels displayed for the selectable calling days.
 */
export const DAY_LABELS = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
] as const;

/**
 * Tick labels displayed beneath the calling window slider.
 */
export const WINDOW_TICKS = [8, 11, 14, 17, 21];

/**
 * Tick labels displayed beneath the redial count slider.
 */
export const COUNT_TICKS = [0, 2, 4, 6, 8, 10];

/**
 * Available redial interval options, in hours.
 */
export const REDIAL_INTERVAL_OPTIONS = [3, 6, 9, 12, 24] as const;

/**
 * Maps each weather level to its corresponding visual configuration.
 *
 * The configuration determines whether a warning banner should be displayed
 * for the evaluated campaign level.
 */
export const LEVEL_VISUALS: Record<TWeatherLevel, ILevelVisual> = {
  1: { warning: false },
  2: { warning: false },
  3: { warning: true },
  4: { warning: true },
};

/**
 * Configuration describing the penalty rows displayed in the weather
 * forecast panel.
 *
 * Each entry maps a penalty key from the campaign evaluation to its
 * corresponding display label.
 */
export const PENALTY_ROWS: {
  key: keyof ICampaignEvaluation['penalties'];
  label: string;
}[] = [
  { key: 'callingDays', label: 'Calling days penalty' },
  { key: 'callingWindow', label: 'Calling window penalty' },
  { key: 'redialCount', label: 'Redial count penalty' },
  { key: 'redialInterval', label: 'Redial interval penalty' },
];
