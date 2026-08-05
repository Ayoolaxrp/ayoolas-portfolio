"use client";

import * as React from "react";
import { Award, Download, Expand, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { stopSmoothScroll, startSmoothScroll } from "@/lib/scroll";
import type { Certificate } from "@/lib/about";

/* ----------------------------------------------------------------------------
 * CertificateImage: renders the certificate preview, falling back to an
 * elegant placeholder while the real asset is still missing.
 * -------------------------------------------------------------------------- */

const CertificateImage: React.FC<{
  certificate: Certificate;
  className?: string;
  /** Called once when the asset fails to load (e.g. not added yet). */
  onMissing?: () => void;
}> = ({ certificate, className, onMissing }) => {
  const [failed, setFailed] = React.useState(false);

  const markFailed = React.useCallback(() => {
    setFailed(true);
    onMissing?.();
  }, [onMissing]);

  if (failed) {
    return (
      <div
        className={cn(
          "flex aspect-[4/3] flex-col items-center justify-center gap-3 border border-dashed border-border-default bg-canvas text-center",
          className,
        )}
      >
        <Award className="size-8 text-accent" aria-hidden />
        <p className="px-6 font-mono text-caption text-text-tertiary">
          Preview pending
          <br />
          add {certificate.image.replace("/images/certificates/", "")}
        </p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- certificate assets are local files added later
    <img
      src={certificate.image}
      alt={certificate.alt}
      loading="lazy"
      onError={markFailed}
      className={cn(
        "aspect-[4/3] w-full object-cover transition-transform duration-slow ease-emphasized group-hover:scale-[1.03]",
        className,
      )}
    />
  );
};

/* ----------------------------------------------------------------------------
 * CertificateCard: a single certificate tile.
 * - Hover: lift, accent border, image zoom, "View" affordance.
 * - Download button (works once the asset exists).
 * - Click anywhere opens the lightbox.
 * -------------------------------------------------------------------------- */

const CertificateCard: React.FC<{
  certificate: Certificate;
  onOpen: () => void;
}> = ({ certificate, onOpen }) => {
  const [available, setAvailable] = React.useState(true);

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border-subtle bg-surface transition-[border-color,box-shadow,transform] duration-slow ease-emphasized hover:-translate-y-1 hover:border-accent-border hover:shadow-glow">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${certificate.title} certificate`}
        className="relative block w-full text-left"
      >
        <CertificateImage
          certificate={certificate}
          onMissing={() => setAvailable(false)}
        />
        {/* Hover affordance */}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-border-default bg-canvas/80 px-2.5 py-1 font-mono text-caption text-text-secondary opacity-0 backdrop-blur-sm transition-opacity duration-fast ease-standard group-hover:opacity-100">
          <Expand className="size-3" aria-hidden />
          View
        </span>
        {/* Bottom label strip */}
        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-canvas/95 via-canvas/60 to-transparent px-4 pb-3 pt-10">
          <span className="flex flex-col gap-0.5">
            <span className="font-mono text-caption text-accent">
              {certificate.year}
            </span>
            <span className="text-body-sm font-medium text-text-primary">
              {certificate.title}
            </span>
          </span>
        </span>
      </button>

      <div className="flex items-center justify-between gap-3 border-t border-border-subtle px-4 py-3">
        <span className="text-body-sm text-text-tertiary">
          {certificate.issuer}
        </span>
        {available ? (
          <a
            href={certificate.image}
            download={`${certificate.id}.png`}
            className="inline-flex items-center gap-1.5 font-mono text-caption uppercase tracking-[0.12em] text-text-secondary transition-colors duration-fast ease-standard hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            <Download className="size-3.5" aria-hidden />
            Download
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 font-mono text-caption uppercase tracking-[0.12em] text-text-tertiary">
            <Download className="size-3.5" aria-hidden />
            Pending
          </span>
        )}
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------
 * LightboxPreview: the large certificate view with its own load state.
 * Keyed by certificate id so it remounts fresh whenever a new certificate
 * is opened (no state reset inside an effect).
 * -------------------------------------------------------------------------- */

const LightboxPreview: React.FC<{ certificate: Certificate }> = ({
  certificate,
}) => {
  const [imageFailed, setImageFailed] = React.useState(false);

  if (imageFailed) {
    return (
      <div className="flex aspect-[4/3] w-full max-w-xl flex-col items-center justify-center gap-3 border border-dashed border-border-default bg-surface text-center">
        <Award className="size-10 text-accent" aria-hidden />
        <p className="px-6 font-mono text-caption text-text-tertiary">
          Certificate image not available yet.
          <br />
          Add it at {certificate.image}
        </p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- certificate assets are local files added later
    <img
      src={certificate.image}
      alt={certificate.alt}
      onError={() => setImageFailed(true)}
      className="max-h-[70vh] w-auto max-w-full rounded-md border border-border-default object-contain shadow-lg"
    />
  );
};

/* ----------------------------------------------------------------------------
 * CertificateLightbox: modal preview with download. Escape/backdrop close,
 * focus management, and smooth-scroll pause while open.
 * -------------------------------------------------------------------------- */

const CertificateLightbox: React.FC<{
  certificate: Certificate | null;
  onClose: () => void;
}> = ({ certificate, onClose }) => {
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!certificate) return undefined;

    const previousFocus = document.activeElement as HTMLElement | null;
    stopSmoothScroll();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeRef.current?.focus(), 30);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      document.body.style.overflow = previousOverflow;
      startSmoothScroll();
      previousFocus?.focus();
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${certificate.title} certificate`}
    >
      <button
        type="button"
        aria-label="Close certificate preview"
        onClick={onClose}
        className="absolute inset-0 bg-overlay backdrop-blur-sm animate-[fadeIn_var(--motion-slow)_var(--ease-standard)]"
      />

      <div className="relative w-full max-w-3xl animate-[fadeIn_var(--motion-slow)_var(--ease-emphasized)]">
        <div className="overflow-hidden rounded-lg border border-border-default bg-surface-raised shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between gap-4 border-b border-border-subtle px-5 py-4">
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-caption text-accent">
                {certificate.year}
              </span>
              <h3 className="text-body-md font-medium text-text-primary">
                {certificate.title}
              </h3>
              <span className="text-body-sm text-text-tertiary">
                {certificate.issuer}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={certificate.image}
                download={`${certificate.id}.png`}
                className="inline-flex items-center gap-1.5 rounded-md border border-accent-border bg-accent-soft px-3 py-1.5 font-mono text-caption uppercase tracking-[0.12em] text-accent transition-[background-color,color] duration-fast ease-standard hover:bg-accent hover:text-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              >
                <Download className="size-3.5" aria-hidden />
                Download
              </a>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="inline-flex size-9 items-center justify-center rounded-md border border-border-subtle text-text-secondary transition-colors duration-fast ease-standard hover:border-border-strong hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-center justify-center bg-canvas p-4 md:p-8">
            <LightboxPreview key={certificate.id} certificate={certificate} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------------------------------------------
 * CertificatesGrid: manages lightbox state and renders the responsive grid.
 * -------------------------------------------------------------------------- */

export const CertificatesGrid: React.FC<{
  certificates: readonly Certificate[];
}> = ({ certificates }) => {
  const [active, setActive] = React.useState<Certificate | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <CertificateCard
            key={certificate.id}
            certificate={certificate}
            onOpen={() => setActive(certificate)}
          />
        ))}
      </div>
      <CertificateLightbox
        certificate={active}
        onClose={() => setActive(null)}
      />
    </>
  );
};

CertificatesGrid.displayName = "CertificatesGrid";
