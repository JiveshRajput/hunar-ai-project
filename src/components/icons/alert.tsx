/**
 * Renders an alert icon using an inline SVG.
 * @returns A reusable alert icon component.
 */
export function AlertIcon() {
  return (
    <span className="flex size-4.5 shrink-0 items-center justify-center">
      <svg viewBox="0 0 16 16" fill="none" className="size-4">
        <path d="M8 1.5 15 14H1L8 1.5Z" fill="#12367e" />
        <path
          d="M8 6v3.2"
          stroke="#eff6ff"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="8" cy="11.4" r="0.9" fill="#eff6ff" />
      </svg>
    </span>
  );
}
