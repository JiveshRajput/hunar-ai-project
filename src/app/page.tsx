'use client';

import { MainLayout } from '@/components/layout';
import { SettingsPanel } from '@/components/settings-panel';
import { WeatherForecastPanel } from '@/components/weather-forecast-panel';
import { useHandleSettingsState } from '@/hooks';

/**
 * Home page component that serves as the main entry point of the application.
 * It manages application state through the `useHandleSettingsState` hook and
 * composes the primary layout by rendering:
 * - A settings panel for configuring calling preferences.
 * - A weather forecast panel that displays the evaluated forecast based on the
 *   current settings.
 *
 * @returns The main application page containing the settings and weather forecast panels.
 */
export default function Home() {
  const {
    evaluation,
    handleSubmit,
    settings,
    onCallingDaysChange,
    onCallingWindowChange,
    onRedialCountChange,
    onRedialIntervalChange,
  } = useHandleSettingsState();

  return (
    <MainLayout handleSubmit={handleSubmit}>
      {/* Body */}
      <main className="flex-1 p-5 py-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-[20px]">
          {/* Settings */}
          <div className="flex w-full flex-col gap-6 lg:w-[525px] lg:shrink-0">
            <SettingsPanel
              settings={settings}
              onCallingDaysChange={onCallingDaysChange}
              onCallingWindowChange={onCallingWindowChange}
              onRedialCountChange={onRedialCountChange}
              onRedialIntervalChange={onRedialIntervalChange}
            />
          </div>

          {/* Forecast */}
          <div className="w-full lg:w-[450px] lg:shrink-0">
            <WeatherForecastPanel evaluation={evaluation} />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
