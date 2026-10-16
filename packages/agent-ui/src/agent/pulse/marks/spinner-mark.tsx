export function SpinnerMark() {
  return (
    <svg
      aria-hidden
      data-slot="loader-spinner"
      viewBox="0 0 16 16"
      className="size-[1.1em] motion-safe:animate-spin"
      fill="none"
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
      <path
        d="M8 1.5a6.5 6.5 0 0 1 6.5 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
