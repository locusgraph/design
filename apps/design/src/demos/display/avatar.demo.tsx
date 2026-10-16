import { Avatar, AvatarFallback, AvatarImage } from "@locusgraph/components";
import { defineDemo, select, text, toggle } from "../../registry/define-demo";

const memberPhoto =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjNjM2NmYxIi8+PGNpcmNsZSBjeD0iMTYiIGN5PSIxMyIgcj0iNiIgZmlsbD0iI2UwZTdmZiIvPjxyZWN0IHg9IjYiIHk9IjIyIiB3aWR0aD0iMjAiIGhlaWdodD0iMTIiIHJ4PSI2IiBmaWxsPSIjZTBlN2ZmIi8+PC9zdmc+";

const sizes = ["size-8", "size-6", "size-10", "size-12"] as const;

function Fallback() {
  return (
    <Avatar>
      <AvatarFallback>NA</AvatarFallback>
    </Avatar>
  );
}

function Sizes() {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-6">
        <AvatarImage src={memberPhoto} alt="Jane Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src={memberPhoto} alt="Jane Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar className="size-10">
        <AvatarImage src={memberPhoto} alt="Jane Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarImage src={memberPhoto} alt="Jane Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
  );
}

function MemberStack() {
  return (
    <div className="flex -space-x-1.5 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-card">
      <Avatar>
        <AvatarImage src={memberPhoto} alt="Jane Doe" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MK</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-muted text-muted-foreground">+9</AvatarFallback>
      </Avatar>
    </div>
  );
}

function WithName() {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-10">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="text-sm">
        <p className="font-medium">Jane Doe</p>
        <p className="text-muted-foreground">Owner</p>
      </div>
    </div>
  );
}

export default defineDemo({
  title: "Avatar",
  description:
    "A round image for a member or organization, with initials shown while the image loads or when it is missing.",
  controls: { image: toggle(true), fallback: text("JD"), size: select(sizes) },
  playground: ({ image, fallback, size }) => (
    <Avatar key={String(image)} className={size}>
      {image ? <AvatarImage src={memberPhoto} alt="Jane Doe" /> : null}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  ),
  code: ({ image, fallback, size }) =>
    `<Avatar${size === "size-8" ? "" : ` className="${size}"`}>${image ? `\n  <AvatarImage src="/avatars/jane.png" alt="Jane Doe" />` : ""}\n  <AvatarFallback>${fallback}</AvatarFallback>\n</Avatar>`,
  props: [
    { name: "className", type: "string", defaultValue: "size-8" },
    { name: "AvatarImage.src", type: "string" },
    { name: "AvatarImage.alt", type: "string" },
    { name: "AvatarFallback.delayMs", type: "number" },
  ],
  examples: {
    Fallback: {
      description: "Initials stand in when there is no image.",
      component: Fallback,
    },
    Sizes: { description: "Set the size with a size utility class.", component: Sizes },
    MemberStack: {
      description: "Overlapping avatars show the members of an organization.",
      component: MemberStack,
    },
    WithName: {
      description: "An avatar beside a name and role in a member list.",
      component: WithName,
    },
  },
  composition: {
    name: "Avatar",
    children: [{ name: "AvatarImage" }, { name: "AvatarFallback" }],
  },
});
