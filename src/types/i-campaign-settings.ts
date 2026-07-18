export type TWeatherLevel = 1 | 2 | 3 | 4;

export interface ICampaignSettings {
  /** Selected calling days, e.g. ["Mon","Tue",…]. Order-independent. */
  callingDays: string[];
  /** Daily calling window as [startHour, endHour] on a 24h clock (8–21). */
  callingWindow: [number, number];
  /** Number of redials (0–10). */
  redialCount: number;
  /** Hours between redials — one of 3 | 6 | 9 | 12 | 24. */
  redialInterval: number;
}

export interface ICampaignEvaluation {
  penalties: {
    callingDays: number;
    callingWindow: number;
    redialCount: number;
    redialInterval: number;
  };
  score: number;
  level: TWeatherLevel;
}
