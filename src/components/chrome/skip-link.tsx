import * as React from "react";

/**
 * SkipLink: skip-to-content link (UX_PRINCIPLES §5.2).
 * Hidden until focused, then snaps to the top of the page.
 */
export const SkipLink: React.FC = () => (
  <a href="#main-content" className="skip-link">
    Skip to content
  </a>
);

SkipLink.displayName = "SkipLink";
