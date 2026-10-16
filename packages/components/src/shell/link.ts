import type * as React from "react";

export type LinkComponent = React.ComponentType<React.ComponentProps<"a"> & { href: string }>;
