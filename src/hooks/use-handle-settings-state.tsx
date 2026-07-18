import { INITIAL_SETTINGS } from '@/constants';
import { ICampaignSettings } from '@/types';
import { evaluateCampaign, formatHour } from '@/utils';
import { useMemo, useState } from 'react';

/**
 * Manages the campaign settings lifecycle, including state management,
 * campaign evaluation, settings updates, and submission handling.
 *
 * The hook initializes the campaign settings with default values, derives the
 * current campaign evaluation whenever the settings change, and exposes
 * dedicated handlers for updating individual settings. It also provides a
 * generic update helper for modifying any setting by key and a submit handler
 * for processing the current configuration.
 *
 * @returns An object containing the current campaign settings, evaluation,
 * update helpers, change handlers, and submit function.
 */
export const useHandleSettingsState = () => {
  /** Current campaign settings. */
  const [settings, setSettings] = useState<ICampaignSettings>(INITIAL_SETTINGS);

  const evaluation = useMemo(() => evaluateCampaign(settings), [settings]);

  /**
   * Updates a specific campaign setting while preserving the remaining values.
   * @param key - The setting property to update.
   * @param value - The new value for the specified setting.
   * @returns Void.
   */
  const updateSettings: <K extends keyof ICampaignSettings>(
    key: K,
    value: ICampaignSettings[K],
  ) => void = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  /**
   * Updates the selected calling days.
   * @param days - Array of selected calling day abbreviations.
   * @returns Void.
   */
  const onCallingDaysChange: (days: string[]) => void = (days: string[]) =>
    updateSettings('callingDays', days);

  /**
   * Updates the configured calling time window.
   * @param window - Tuple containing the start and end hours.
   * @returns Void.
   */
  const onCallingWindowChange: (window: [number, number]) => void = (
    window: [number, number],
  ) => updateSettings('callingWindow', window);

  /**
   * Updates the maximum number of redial attempts.
   * @param count - Number of redial attempts.
   * @returns Void.
   */
  const onRedialCountChange: (count: number) => void = (count: number) =>
    updateSettings('redialCount', count);

  /**
   * Updates the interval, in hours, between consecutive redial attempts.
   * @param interval - Redial interval in hours.
   * @returns Void.
   */
  const onRedialIntervalChange: (interval: number) => void = (
    interval: number,
  ) => updateSettings('redialInterval', interval);

  /**
   * Handles campaign submission.
   * Currently logs a formatted summary of the configured campaign settings
   * to the console. This function can be extended to submit the configuration
   * to an API or other persistence layer.
   * @returns Void.
   */
  const handleSubmit = () => {
    const displayMessage: string = `
      ---------------------------------------------------
        Calling Days: ${settings.callingDays.join(', ')} (${settings.callingDays.length} days)
        Calling Window: ${formatHour(settings.callingWindow[0])} – ${formatHour(settings.callingWindow[1])} (${settings.callingWindow[1] - settings.callingWindow[0]} Hours)
        Redail Count: ${settings.redialCount}
        Redail Interval: ${settings.redialInterval} Hours
      ---------------------------------------------------
    `;
    console.log(displayMessage, settings);
  };

  return {
    evaluation,
    handleSubmit,
    onCallingDaysChange,
    onCallingWindowChange,
    onRedialCountChange,
    onRedialIntervalChange,
    setSettings,
    settings,
    updateSettings,
  };
};

export default useHandleSettingsState;
