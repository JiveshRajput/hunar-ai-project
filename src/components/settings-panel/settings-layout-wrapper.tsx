import type { ReactNode } from 'react';

/**
 * Props for the {@link SettingLayoutWrapper} component.
 */
interface ISettingLayoutWrapperProps {
  title: string;
  children: ReactNode;
}

/**
 * Provides a reusable layout wrapper for grouping related settings.
 *
 * The component renders a titled container with consistent styling and spacing,
 * allowing multiple settings fields to be displayed within a visually distinct
 * section.
 *
 * @param props - The component props.
 * @returns A styled wrapper for organizing related settings.
 */
export function SettingLayoutWrapper(props: ISettingLayoutWrapperProps) {
  const { title, children } = props;
  return (
    <div className="rounded-2xl bg-[#f4f4f5] p-0.5 pt-0">
      <div className="px-4.5 py-2.5">
        <h3 className="text-sm font-semibold text-[#27272a]">{title}</h3>
      </div>
      <div className="space-y-8 rounded-2xl border border-[#e4e4e7] bg-white p-5">
        {children}
      </div>
    </div>
  );
}
