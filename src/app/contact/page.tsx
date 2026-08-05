"use client";

import * as React from "react";
import { Check, Copy, Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { InputField } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/anim/reveal";
import { cn } from "@/lib/utils";
import { SOCIAL } from "@/config/site.config";

/** Brand icons: lucide v1.x omits brand logos, so inline SVGs (same as footer). */
const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    className={className}
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    className={className}
  >
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
  </svg>
);

interface FormState {
  name: string;
  email: string;
  message: string;
}

const INITIAL_STATE: FormState = { name: "", email: "", message: "" };

const DETAILS = [
  {
    label: "Availability",
    value: "Open to select opportunities",
    highlight: true,
  },
  {
    label: "Current focus",
    value: "Founding Elion · AI automation and intelligent business systems",
  },
  {
    label: "Preferred work",
    value:
      "Automation, full-stack products, trading tools, intelligent systems",
  },
  {
    label: "Response time",
    value: "Usually within 48 hours",
  },
];

/**
 * CopyEmail: click-to-copy with inline feedback. Falls back to a mailto:
 * when the Clipboard API is unavailable.
 */
function CopyEmail() {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SOCIAL.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${SOCIAL.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      data-magnetic
      aria-live="polite"
      className={cn(
        "group inline-flex w-fit items-center gap-3 rounded-lg border bg-surface px-5 py-4 text-body-md",
        "transition-[border-color,background-color,box-shadow] duration-fast ease-standard",
        copied
          ? "border-accent-border bg-accent-soft shadow-glow"
          : "border-border-subtle hover:border-accent-border hover:bg-accent-soft",
      )}
    >
      <Mail className="size-5 text-accent" aria-hidden />
      <span className="text-text-secondary transition-colors duration-fast ease-standard group-hover:text-text-primary">
        {SOCIAL.email}
      </span>
      <span
        className={cn(
          "inline-flex items-center gap-1 font-mono text-caption uppercase tracking-[0.12em]",
          copied ? "text-accent" : "text-text-tertiary",
        )}
      >
        {copied ? (
          <>
            <Check className="size-3.5" aria-hidden />
            Copied
          </>
        ) : (
          <>
            <Copy className="size-3.5" aria-hidden />
            Copy
          </>
        )}
      </span>
    </button>
  );
}

/**
 * ContactPage: premium contact experience. A simple, honest form that composes
 * a mailto: link (no backend, nothing stored), plus availability details and
 * direct channels.
 */
export default function ContactPage() {
  const [form, setForm] = React.useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = React.useState<Partial<FormState>>({});
  const [sent, setSent] = React.useState(false);

  const update =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
      if (errors[field]) {
        setErrors((current) => ({ ...current, [field]: undefined }));
      }
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors: Partial<FormState> = {};
    if (!form.name.trim()) nextErrors.name = "Please add your name.";
    if (!form.email.trim()) {
      nextErrors.email = "Please add your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "That email doesn't look right.";
    }
    if (!form.message.trim()) nextErrors.message = "Please add a message.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\nFrom ${form.name} (${form.email})`,
    );
    window.location.href = `mailto:${SOCIAL.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <>
      <Section spacing="hero">
        <Container>
          <div className="max-w-4xl">
            <Reveal>
              <p className="mb-8 flex items-center gap-4">
                <span
                  aria-hidden
                  className="text-serif-display-italic text-2xl leading-none text-accent md:text-3xl"
                >
                  07
                </span>
                <span aria-hidden className="h-px w-12 bg-border-strong" />
                <span className="font-mono text-caption uppercase tracking-[0.18em] text-text-tertiary">
                  Contact
                </span>
              </p>
              <Heading as="h1" variant="display-lg" className="mb-8">
                Let&apos;s build something real.
              </Heading>
              <p className="max-w-2xl text-body-lg text-text-secondary">
                A product, an automation, a system: if you have a problem worth
                solving, tell me about it. I read everything and reply to every
                thoughtful message.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section variant="default">
        <Container>
          {/* Availability details */}
          <Reveal>
            <dl className="mb-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {DETAILS.map((detail) => (
                <div
                  key={detail.label}
                  className={
                    detail.highlight
                      ? "flex flex-col gap-1.5 rounded-md border border-accent-border bg-accent-soft px-4 py-3"
                      : "flex flex-col gap-1.5 rounded-md border border-border-subtle bg-surface px-4 py-3"
                  }
                >
                  <dt className="eyebrow text-text-tertiary">{detail.label}</dt>
                  <dd className="flex items-center gap-2 text-body-sm text-text-primary">
                    {detail.highlight && (
                      <span
                        aria-hidden
                        className="size-1.5 shrink-0 rounded-full bg-accent motion-safe:animate-breathe-dot"
                      />
                    )}
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal>
                {sent ? (
                  <div
                    role="status"
                    className="rounded-lg border border-accent-border bg-accent-soft p-8"
                  >
                    <Heading as="h2" variant="h3" className="mb-3">
                      Your email client should have opened.
                    </Heading>
                    <p className="text-body-md text-text-secondary reading-width">
                      If it didn&apos;t, you can email me directly at{" "}
                      <a
                        href={`mailto:${SOCIAL.email}`}
                        className="text-text-link hover:text-text-link-hover"
                      >
                        {SOCIAL.email}
                      </a>
                      . I&apos;ll get back to you within 48 hours.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="flex flex-col gap-5"
                  >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <InputField
                        label="Name"
                        id="contact-name"
                        required
                        error={errors.name}
                        inputProps={{
                          placeholder: "Your name",
                          autoComplete: "name",
                          value: form.name,
                          onChange: update("name"),
                        }}
                      />
                      <InputField
                        label="Email"
                        id="contact-email"
                        required
                        error={errors.email}
                        inputProps={{
                          type: "email",
                          placeholder: "you@example.com",
                          autoComplete: "email",
                          value: form.email,
                          onChange: update("email"),
                        }}
                      />
                    </div>
                    <InputField
                      label="Message"
                      id="contact-message"
                      required
                      error={errors.message}
                      as="textarea"
                      textareaProps={{
                        rows: 6,
                        placeholder:
                          "Tell me about the problem you're trying to solve...",
                        value: form.message,
                        onChange: update("message"),
                      }}
                    />
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <Button
                        type="submit"
                        size="lg"
                        variant="primary"
                        data-magnetic
                        trailingIcon={<Send aria-hidden />}
                      >
                        Send message
                      </Button>
                      <p className="text-body-sm text-text-tertiary">
                        This opens your email app. Nothing is stored.
                      </p>
                    </div>
                  </form>
                )}
              </Reveal>
            </div>

            {/* Direct contact */}
            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="flex flex-col gap-6">
                  <div>
                    <Heading as="h2" variant="h3" className="mb-4">
                      Prefer direct?
                    </Heading>
                    <div className="flex flex-col gap-3">
                      <CopyEmail />
                      <a
                        href={SOCIAL.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-magnetic
                        className="group inline-flex w-fit items-center gap-3 rounded-lg border border-border-subtle bg-surface px-5 py-4 text-body-md text-text-secondary transition-[border-color,background-color,color] duration-fast ease-standard hover:border-border-strong hover:text-text-primary"
                      >
                        <GithubIcon className="size-5 text-accent" />
                        GitHub
                      </a>
                      <a
                        href={SOCIAL.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-magnetic
                        className="group inline-flex w-fit items-center gap-3 rounded-lg border border-border-subtle bg-surface px-5 py-4 text-body-md text-text-secondary transition-[border-color,background-color,color] duration-fast ease-standard hover:border-border-strong hover:text-text-primary"
                      >
                        <LinkedinIcon className="size-5 text-accent" />
                        LinkedIn
                      </a>
                    </div>
                  </div>

                  <div className="rounded-lg border border-border-subtle bg-surface p-6">
                    <Heading as="h3" variant="h4" className="mb-3">
                      What happens next
                    </Heading>
                    <p className="text-body-md text-text-secondary reading-width">
                      I&apos;ll read your message and reply within 48 hours. If
                      it&apos;s a project, we&apos;ll set up a short call to
                      understand the problem before anything else.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
