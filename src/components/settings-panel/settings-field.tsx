import type { ReactNode } from 'react';

/**
 * Props for the {@link SettingsField} component.
 */
interface ISettingsFieldProps {
  label: string;
  value?: ReactNode;
  children: ReactNode;
}

/**
 * Renders a reusable settings field consisting of a label, an optional
 * value indicator, and the associated form control.
 *
 * This component provides a consistent layout for settings inputs throughout
 * the application.
 *
 * @param props - The component props.
 * @returns A styled settings field container.
 */
export function SettingsField(props: ISettingsFieldProps) {
  const { label, value, children } = props;
  return (
    <div className="space-y-3.5">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-semibold text-[#27272a]">{label}</label>
        {value !== undefined && (
          <span className="text-xs font-medium text-[#71717a] tabular-nums">
            {value}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
