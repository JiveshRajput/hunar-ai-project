import { IMAGES } from '@/assets';
import { LEVEL_VISUALS, PENALTY_ROWS } from '@/constants';
import { ICampaignEvaluation } from '@/types';
import Image from 'next/image';
import { WeatherPenaltyCard } from './weather-penalty-card';
import { WeatherWarningBanner } from './weather-warning-banner';

/**
 * Props for the {@link WeatherForecastPanel} component.
 */
interface IWeatherForecastPanelProps {
  evaluation: ICampaignEvaluation;
}

/**
 * Displays the weather forecast panel for the current campaign evaluation.
 * The panel visualizes the campaign's overall score using a level-specific
 * illustration, conditionally displays a warning banner for higher severity
 * levels, and provides a detailed breakdown of penalties contributing to the
 * final score.
 * @param props - The component props.
 * @returns A weather forecast panel showing the campaign score, warning state,
 * and penalty details.
 */
export function WeatherForecastPanel(props: IWeatherForecastPanelProps) {
  const { evaluation } = props;
  const { level, score, penalties } = evaluation;
  const visual = LEVEL_VISUALS[level];
  const levelImage =
    IMAGES.GUARDRAILS_LEVEL[level] || IMAGES.GUARDRAILS_LEVEL[1];

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-[#e4e4e7] bg-white">
      {/* Forecast scene with the live campaign score overlaid */}
      <div className="relative w-full">
        <Image
          src={levelImage}
          alt="Level of Redail Guardrail"
          className="object-contain w-full"
          loading="eager"
        />
        <div className="absolute inset-x-0 top-14 flex flex-col items-center text-white">
          <span
            className="md:text-[64px] text-[48px] font-bold leading-none tabular-nums drop-shadow-sm transition-all"
            aria-live="polite"
          >
            {score}
          </span>
          <span className="mt-3 text-sm font-semibold">Campaign score</span>
        </div>
      </div>

      {/* Warning banner appears once the forecast hits Level 3 */}
      {visual.warning && <WeatherWarningBanner />}

      {/* Per-input penalty breakdown */}
      <div>
        {PENALTY_ROWS.map(
          (row: {
            key: keyof ICampaignEvaluation['penalties'];
            label: string;
          }) => {
            const { key, label } = row;
            const value = penalties[key];
            return <WeatherPenaltyCard value={value} key={key} label={label} />;
          },
        )}
      </div>
    </div>
  );
}
