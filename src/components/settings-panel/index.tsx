import { ICampaignSettings } from '@/types';
import { GuardrailsSettings } from './guardrails-settings';
import { RedialSettings } from './redial-settings';

/**
 * Props for the {@link SettingsPanel} component.
 */
interface ISettingsPanelProps {
  onCallingDaysChange: (days: string[]) => void;
  onCallingWindowChange: (window: [number, number]) => void;
  onRedialCountChange: (count: number) => void;
  onRedialIntervalChange: (interval: number) => void;
  settings: ICampaignSettings;
}

/**
 * Renders the campaign settings panel by composing the guardrails and
 * redial configuration sections.
 *
 * The component acts as a container that passes the current settings and
 * corresponding change handlers to the appropriate child components.
 *
 * @param props - The component props.
 * @returns The campaign settings panel containing guardrails and redial settings.
 */
export const SettingsPanel = (props: ISettingsPanelProps) => {
  const {
    settings,
    onCallingDaysChange,
    onCallingWindowChange,
    onRedialCountChange,
    onRedialIntervalChange,
  } = props;
  return (
    <>
      <GuardrailsSettings
        callingDays={settings.callingDays}
        onCallingDaysChange={onCallingDaysChange}
        callingWindow={settings.callingWindow}
        onCallingWindowChange={onCallingWindowChange}
      />
      <RedialSettings
        redialCount={settings.redialCount}
        onRedialCountChange={onRedialCountChange}
        redialInterval={settings.redialInterval}
        onRedialIntervalChange={onRedialIntervalChange}
      />
    </>
  );
};

export default SettingsPanel;
