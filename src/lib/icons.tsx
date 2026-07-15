// Minimal line icons (stroke = currentColor) — used instead of emoji for a
// more elegant, less playful look. Check-in ratings keep their emoji.
type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconChart({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 19V10" />
      <path d="M11 19V5" />
      <path d="M18 19v-7" />
      <path d="M3 19h18" />
    </svg>
  );
}

export function IconPlate({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

export function IconDumbbell({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M6.5 9v6" />
      <path d="M17.5 9v6" />
      <path d="M3.5 10.5v3" />
      <path d="M20.5 10.5v3" />
      <path d="M6.5 12h11" />
    </svg>
  );
}

export function IconCheckCircle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.2l2.3 2.3 4.7-4.9" />
    </svg>
  );
}

export function IconLock({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="5" y="10.5" width="14" height="9" rx="2" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function IconSparkle({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
    </svg>
  );
}

export function IconCompass({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M14.8 9.2l-1.6 4.4-4.4 1.6 1.6-4.4z" />
    </svg>
  );
}

export function IconRemote({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="4" y="3" width="10" height="18" rx="2" />
      <path d="M17 8c1.9 1.1 3 2.9 3 4.8s-1.1 3.7-3 4.8" />
      <path d="M19.5 5.5c2.6 1.6 4.2 4.1 4.2 7s-1.6 5.4-4.2 7" />
    </svg>
  );
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C11.5 19 5 12.5 4.5 6c0-1.1.9-2 2-2z" />
    </svg>
  );
}

export function IconMail({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4.5 7l7.5 6 7.5-6" />
    </svg>
  );
}

export function IconPalette({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 3.5a8.5 7.5 0 1 0 0 15c1.1 0 1.8-.7 1.8-1.6 0-.4-.2-.8-.4-1.1-.3-.4-.1-1 .4-1.1H15c2.5 0 4.5-1.9 4.5-4.7 0-3.6-3.4-6.5-7.5-6.5z" />
      <circle cx="8.2" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.8" cy="10.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconShieldCheck({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 3.5l7 2.5v5.3c0 4.4-2.9 7.7-7 9.2-4.1-1.5-7-4.8-7-9.2V6l7-2.5z" />
      <path d="M9 12l2 2 4-4.2" />
    </svg>
  );
}

export function IconFileSpreadsheet({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M6 3h9l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M8.5 13h7" />
      <path d="M8.5 16.5h7" />
      <path d="M12 13v6.5" />
    </svg>
  );
}
