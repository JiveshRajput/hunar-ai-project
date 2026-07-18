import { ReactNode } from 'react';
import { Button } from '../ui/button';

/**
 * Props for the {@link MainLayout} component.
 */
interface IMainLayoutProps {
  children: ReactNode;
  handleSubmit: () => void;
}

/**
 * Provides the primary application layout with a consistent header, content area,
 * and footer.
 * @param props - The component props.
 * @returns The main application layout component.
 */
export const MainLayout = (props: IMainLayoutProps) => {
  const { children, handleSubmit } = props;
  return (
    <div className="flex min-h-full flex-col bg-white text-[#27272a] max-w-[1124px] w-full mx-auto">
      {/* Header */}
      <header className="px-5 py-6">
        <h1 className="text-[28px] font-bold leading-tight text-[#27272a]">
          Redial &amp; Guardrails
        </h1>
      </header>

      {/* Body */}
      {children}

      {/* Footer */}
      <footer className="border-t border-[#e4e4e7] px-5 py-6">
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            className="h-9 rounded-lg bg-[#27272a] px-4 text-sm font-semibold text-white cursor-pointer"
          >
            Submit
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
