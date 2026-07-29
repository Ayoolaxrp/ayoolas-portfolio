"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * FAQItem — single question + answer in an accordion.
 *
 * Spec: COMPONENTS.md §12.
 * - Border-bottom between items (border.subtle).
 * - Chevron rotates 180° on open.
 * - Single-open behavior by default (FAQList enforces this).
 *
 * Accessibility:
 * - <button aria-expanded> for the question.
 * - Answer id linked via aria-controls.
 * - Animation respects prefers-reduced-motion (globals.css).
 */
export interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  /** Stable id for the panel — required when controlled. */
  id?: string;
  /** Initial open state. Defaults to false. */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Change handler. Receives new open state. */
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

let counter = 0;

export const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  id,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  className,
}) => {
  const generatedId = React.useMemo(() => id ?? `faq-${++counter}`, [id]);
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleToggle = () => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div className={cn("border-b border-border-subtle", className)}>
      <h3 className="m-0">
        <button
          type="button"
          id={`${generatedId}-trigger`}
          aria-expanded={isOpen}
          aria-controls={`${generatedId}-panel`}
          onClick={handleToggle}
          className={cn(
            "flex w-full items-center justify-between gap-4 py-5 text-left",
            "text-h4 text-text-primary",
            "transition-colors duration-fast ease-standard",
            "hover:text-accent",
            "focus-visible:outline-none focus-visible:text-accent",
          )}
        >
          <span>{question}</span>
          <ChevronDown
            className={cn(
              "size-5 shrink-0 text-text-tertiary",
              "transition-transform duration-normal ease-emphasized",
              isOpen && "rotate-180 text-accent",
            )}
            aria-hidden
          />
        </button>
      </h3>

      <div
        id={`${generatedId}-panel`}
        role="region"
        aria-labelledby={`${generatedId}-trigger`}
        hidden={!isOpen}
        className="pb-5"
      >
        <div className="text-body-md text-text-secondary reading-width">
          {answer}
        </div>
      </div>
    </div>
  );
};

FAQItem.displayName = "FAQItem";

/**
 * FAQList — vertical stack of FAQItems with single-open behavior.
 *
 * When one item opens, others close (per COMPONENTS §12).
 * Pass `singleOpen={false}` to allow multiple open at once.
 */
export interface FAQListProps {
  items: Array<{
    question: string;
    answer: React.ReactNode;
  }>;
  singleOpen?: boolean;
  className?: string;
}

export const FAQList: React.FC<FAQListProps> = ({
  items,
  singleOpen = true,
  className,
}) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className={cn("border-t border-border-subtle", className)}>
      {items.map((item, index) => (
        <FAQItem
          key={index}
          question={item.question}
          answer={item.answer}
          open={openIndex === index}
          onOpenChange={(next) => {
            if (!next) {
              setOpenIndex(null);
              return;
            }
            setOpenIndex(
              singleOpen ? index : openIndex === index ? null : index,
            );
          }}
        />
      ))}
    </div>
  );
};

FAQList.displayName = "FAQList";
