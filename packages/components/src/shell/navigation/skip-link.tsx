const shellContentId = "content";

function SkipLink({ href = `#${shellContentId}` }: { href?: string }) {
  return (
    <a
      data-slot="skip-link"
      href={href}
      className="sr-only z-60 bg-background text-sm font-medium locus-focus-ring focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:px-3 focus:py-2"
    >
      Skip to content
    </a>
  );
}

export { SkipLink, shellContentId };
