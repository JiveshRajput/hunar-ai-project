'use client';

import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  DAY_LABELS,
  WINDOW_MAX_HOUR,
  WINDOW_MIN_HOUR,
  WINDOW_MIN_LENGTH,
  WINDOW_TICKS,
} from '@/constants';
import { formatHour } from '@/utils/format';
import { SettingsField } from './settings-field';
import { SettingLayoutWrapper } from './settings-layout-wrapper';

/**
 * Props for the {@link GuardrailsSettings} component.
 */
interface IGuardrailsSettingsProps {
  callingDays: string[];
  onCallingDaysChange: (days: string[]) => void;
  callingWindow: [number, number];
  onCallingWindowChange: (window: [number, number]) => void;
}

/**
 * Renders the guardrails configuration section for a campaign.
 *
 * The component allows users to:
 * - Select the days on which calls can be placed.
 * - Configure the allowable calling time window using a range slider.
 *
 * At least one calling day must remain selected, and the calling window
 * enforces a minimum duration between the start and end times.
 *
 * @param props - The component props.
 * @returns A settings section for configuring campaign guardrails.
 */
export function GuardrailsSettings(props: IGuardrailsSettingsProps) {
  const {
    callingDays,
    onCallingDaysChange,
    callingWindow,
    onCallingWindowChange,
  } = props;
  const [start, end] = callingWindow;

  return (
    <SettingLayoutWrapper title="Guardrails">
      <SettingsField label="Calling days">
        <ToggleGroup
          type="multiple"
          value={callingDays}
          onValueChange={(days) => {
            // Keep at least one day selected.
            if (days.length > 0) onCallingDaysChange(days);
          }}
          spacing={2}
          className="w-full"
        >
          {DAY_LABELS.map((day) => (
            <ToggleGroupItem
              key={day}
              value={day}
              aria-label={day}
              className="h-10 flex-1 rounded-lg border border-[#e4e4e7] bg-white text-sm font-medium text-[#27272a] hover:bg-[#fafafa] data-[state=on]:border-[#27272a] data-[state=on]:bg-[#27272a] data-[state=on]:text-white"
            >
              {day}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </SettingsField>

      <SettingsField
        label="Calling window"
        value={`${formatHour(start)} – ${formatHour(end)}`}
      >
        <div className="pt-1">
          <Slider
            value={callingWindow}
            min={WINDOW_MIN_HOUR}
            max={WINDOW_MAX_HOUR}
            step={1}
            minStepsBetweenThumbs={WINDOW_MIN_LENGTH}
            onValueChange={(v) =>
              onCallingWindowChange([v[0], v[1]] as [number, number])
            }
            className="[&_[data-slot=slider-thumb]]:size-3.5 [&_[data-slot=slider-track]]:bg-[#e4e4e7]"
          />
          <div className="mt-3 flex justify-between text-sm font-medium text-[#71717a]">
            {WINDOW_TICKS.map((h) => (
              <span key={h}>{formatHour(h)}</span>
            ))}
          </div>
        </div>
      </SettingsField>
    </SettingLayoutWrapper>
  );
}
