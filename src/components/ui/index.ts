/**
 * UI primitives: the 13-component V1 library per COMPONENTS.md §9.1.
 * Re-exported here so consumers can import from a single location.
 */

export { Button, buttonVariants, type ButtonProps } from "./button";
export { Heading, type HeadingProps, type HeadingVariant } from "./heading";
export { Container, type ContainerProps } from "./container";
export { Section, type SectionProps } from "./section";
export { Card, CardBody, CardHeader, CardFooter, type CardProps } from "./card";
export {
  Badge,
  Tag,
  badgeVariants,
  tagVariants,
  type BadgeProps,
  type TagProps,
} from "./badge";
export { Input, Textarea, type InputProps, type TextareaProps } from "./input";
export {
  Field,
  InputField,
  type FieldProps,
  type InputFieldProps,
} from "./field";
export { FAQItem, FAQList, type FAQItemProps, type FAQListProps } from "./faq";
export { Stat, type StatProps } from "./stat";
export { LogoCloud, type LogoCloudProps } from "./logo-cloud";
export { Skeleton, type SkeletonProps } from "./skeleton";
export { CTAStrip, type CTAStripProps } from "./cta-strip";
