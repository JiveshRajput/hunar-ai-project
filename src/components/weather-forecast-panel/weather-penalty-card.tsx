import { formatPenalty } from '@/utils';

/**
 * Props for the {@link WeatherPenaltyCard} component.
 */
interface IWeatherPenaltyCardProps {
  value: number;
  label: string;
}

/**
 * Displays a single campaign penalty entry within the weather forecast panel.
 *
 * The component renders the penalty label alongside its formatted value and
 * applies conditional styling to indicate whether the penalty is optimal
 * (green) or non-optimal (red).
 *
 * @param props - The component props.
 * @returns A styled penalty card displaying the label and formatted penalty value.
 */
export const WeatherPenaltyCard = (props: IWeatherPenaltyCardProps) => {
  const { value, label } = props;

  return (
    <div className="flex items-center justify-between border-b border-[#f4f4f5] px-6 py-4 last:border-b-0">
      <span className="text-sm font-semibold text-[#71717a]">{label}</span>
      <span
        className={`text-sm font-semibold tabular-nums transition-colors ${value === 0 ? 'text-green-600' : 'text-red-600'}`}
      >
        {formatPenalty(value)}
      </span>
    </div>
  );
};

export default WeatherPenaltyCard;
