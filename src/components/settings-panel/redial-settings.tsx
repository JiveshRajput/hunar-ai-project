'use client';

import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  COUNT_TICKS,
  REDIAL_COUNT_MAX,
  REDIAL_COUNT_MIN,
  REDIAL_INTERVAL_OPTIONS,
} from '@/constants';
import { SettingsField } from './settings-field';
import { SettingLayoutWrapper } from './settings-layout-wrapper';

/**
 * Props for the {@link RedialSettings} component.
 */
interface IRedialSettingsProps {
  redialCount: number;
  onRedialCountChange: (count: number) => void;
  redialInterval: number;
  onRedialIntervalChange: (interval: number) => void;
}

/**
 * Renders the redial configuration section for a campaign.
 *
 * The component allows users to configure the maximum number of redial
 * attempts using a slider and select the interval between redial attempts
 * using a toggle group.
 *
 * @param props - The component props.
 * @returns A settings section for configuring redial behavior.
 */
export function RedialSettings(props: IRedialSettingsProps) {
  const {
    redialCount,
    onRedialCountChange,
    redialInterval,
    onRedialIntervalChange,
  } = props;

  return (
    <SettingLayoutWrapper title="Redial">
      <SettingsField label="Redial count" value={`${redialCount} redials`}>
        <div className="pt-1">
          <Slider
            value={[redialCount]}
            min={REDIAL_COUNT_MIN}
            max={REDIAL_COUNT_MAX}
            step={1}
            onValueChange={(v) => onRedialCountChange(v[0])}
            className="[&_[data-slot=slider-range]]:bg-[#27272a] [&_[data-slot=slider-thumb]]:size-3.5 [&_[data-slot=slider-track]]:bg-[#e4e4e7]"
          />
          <div className="mt-3 flex justify-between text-sm font-medium text-[#71717a]">
            {COUNT_TICKS.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>
      </SettingsField>

      <SettingsField label="Redial interval">
        <ToggleGroup
          type="single"
          value={String(redialInterval)}
          onValueChange={(v) => {
            if (v) onRedialIntervalChange(Number(v));
          }}
          spacing={0}
          className="w-full rounded-lg bg-[#f4f4f5] p-0.5"
        >
          {REDIAL_INTERVAL_OPTIONS.map((hours) => (
            <ToggleGroupItem
              key={hours}
              value={String(hours)}
              className="h-10 flex-1 rounded-lg border-none bg-transparent text-sm font-medium text-[#27272a] data-[state=on]:bg-white data-[state=on]:shadow-[0_1px_2px_rgba(0,0,0,0.06)] data-[state=on]:ring-1 data-[state=on]:ring-[#e4e4e7]"
            >
              {hours} hours
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </SettingsField>
    </SettingLayoutWrapper>
  );
}
