import { Section, type SectionHeadingProps } from "../section/section";
import { WaitlistForm, type WaitlistFormProps } from "./waitlist-form";

type WaitlistProps = SectionHeadingProps &
  WaitlistFormProps & {
    id?: string;
  };

export function Waitlist({
  eyebrow,
  title,
  description,
  align = "center",
  id,
  className,
  ...form
}: WaitlistProps) {
  return (
    <Section
      slot="marketing-waitlist"
      id={id}
      eyebrow={eyebrow}
      title={title}
      description={description}
      align={align}
      className={className}
    >
      <WaitlistForm {...form} className={align === "center" ? "mx-auto" : undefined} />
    </Section>
  );
}
