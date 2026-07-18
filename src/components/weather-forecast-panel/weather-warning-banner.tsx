import { AlertIcon } from '../icons';

/**
 * Displays a warning banner when the current campaign settings are not
 * optimized.
 *
 * The banner includes an alert icon, a warning message, and guidance to help
 * users understand that their current settings may negatively impact calling
 * operations and campaign completion.
 *
 * @returns A warning banner highlighting non-optimal campaign settings.
 */
export function WeatherWarningBanner() {
  return (
    <div className="bg-[#eff6ff] px-6 py-4 space-y-2">
      <div className="flex items-start gap-2">
        <AlertIcon />
        <p className="text-sm font-semibold text-[#12367e]">
          Your settings are not optimized!
        </p>
      </div>
      <p className="text-sm font-medium leading-snug text-[#27272a]">
        Your settings may slow down your calling operations and campaign
        completion. We recommend fixing your settings.
      </p>
    </div>
  );
}
