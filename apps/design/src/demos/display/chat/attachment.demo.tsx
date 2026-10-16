import {
  Warning as AlertCircleIcon,
  DataTable as FileSpreadsheetIcon,
  Document as FileTextIcon,
  Image as ImageIcon,
  Reset as RotateCcwIcon,
  Close as XIcon,
} from "@carbon/icons-react";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  Spinner,
} from "@locusgraph/components";
import { formatProp } from "../../../registry/control-values";
import { defineDemo, select } from "../../../registry/define-demo";

const states = ["done", "uploading", "processing", "error", "idle"] as const;
const sizes = ["default", "sm", "xs"] as const;

const files = [
  { name: "invoice-0042.pdf", meta: "PDF · 84 KB", Icon: FileTextIcon },
  { name: "usage-march.csv", meta: "CSV · 1.2 MB", Icon: FileSpreadsheetIcon },
  { name: "org-chart.png", meta: "PNG · 640 KB", Icon: ImageIcon },
];

const descriptions: Record<(typeof states)[number], string> = {
  done: "PDF · 84 KB",
  uploading: "Uploading · 64%",
  processing: "Reading invoice…",
  error: "Upload failed",
  idle: "Drop a file here",
};

function States() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Attachment state="uploading" className="w-full">
        <AttachmentMedia>
          <Spinner />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>usage-march.csv</AttachmentTitle>
          <AttachmentDescription>Uploading · 64%</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Cancel upload of usage-march.csv">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment state="error" className="w-full">
        <AttachmentMedia>
          <AlertCircleIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>contract.docx</AttachmentTitle>
          <AttachmentDescription>File is larger than 20 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Retry contract.docx">
            <RotateCcwIcon />
          </AttachmentAction>
          <AttachmentAction aria-label="Remove contract.docx">
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment className="w-full">
        <AttachmentMedia>
          <FileSpreadsheetIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>seats-export.xlsx</AttachmentTitle>
          <AttachmentDescription>XLSX · 32 KB</AttachmentDescription>
        </AttachmentContent>
      </Attachment>
    </div>
  );
}

function Group() {
  return (
    <AttachmentGroup className="w-full max-w-sm">
      {files.map((file) => (
        <Attachment key={file.name} orientation="vertical">
          <AttachmentMedia>
            <file.Icon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>{file.name}</AttachmentTitle>
            <AttachmentDescription>{file.meta}</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      ))}
    </AttachmentGroup>
  );
}

function Sizes() {
  return (
    <div className="flex flex-col items-start gap-3">
      {sizes.map((size) => (
        <Attachment key={size} size={size}>
          <AttachmentMedia>
            <FileTextIcon />
          </AttachmentMedia>
          <AttachmentContent>
            <AttachmentTitle>invoice-0042.pdf</AttachmentTitle>
            <AttachmentDescription>Size {size}</AttachmentDescription>
          </AttachmentContent>
        </Attachment>
      ))}
    </div>
  );
}

export default defineDemo({
  title: "Attachment",
  isNew: true,
  description:
    "A file attached to a chat message, with an icon or preview, a name and its upload state.",
  controls: {
    state: select(states),
    size: select(sizes),
    orientation: select(["horizontal", "vertical"]),
  },
  playground: ({ state, size, orientation }) => (
    <Attachment state={state} size={size} orientation={orientation}>
      <AttachmentMedia>
        {state === "uploading" || state === "processing" ? <Spinner /> : <FileTextIcon />}
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>invoice-0042.pdf</AttachmentTitle>
        <AttachmentDescription>{descriptions[state]}</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Remove invoice-0042.pdf">
          <XIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  ),
  code: ({ state, size, orientation }) =>
    `<Attachment${formatProp("state", state, "done")}${formatProp("size", size, "default")}${formatProp("orientation", orientation, "horizontal")}>\n  <AttachmentMedia>\n    <FileTextIcon />\n  </AttachmentMedia>\n  <AttachmentContent>\n    <AttachmentTitle>invoice-0042.pdf</AttachmentTitle>\n    <AttachmentDescription>${descriptions[state]}</AttachmentDescription>\n  </AttachmentContent>\n  <AttachmentActions>\n    <AttachmentAction aria-label="Remove invoice-0042.pdf">\n      <XIcon />\n    </AttachmentAction>\n  </AttachmentActions>\n</Attachment>`,
  props: [
    { name: "state", type: states.join(" | "), defaultValue: "done" },
    { name: "size", type: sizes.join(" | "), defaultValue: "default" },
    { name: "orientation", type: "horizontal | vertical", defaultValue: "horizontal" },
    { name: "AttachmentMedia.variant", type: "icon | image", defaultValue: "icon" },
    { name: "AttachmentTrigger.asChild", type: "boolean", defaultValue: "false" },
  ],
  examples: {
    States: {
      description: "Uploading, failed and finished files in a message composer.",
      component: States,
    },
    Group: {
      description: "AttachmentGroup scrolls a row of vertical previews.",
      component: Group,
    },
    Sizes: { description: "Three sizes for composers and dense threads.", component: Sizes },
  },
  composition: {
    name: "AttachmentGroup",
    children: [
      {
        name: "Attachment",
        children: [
          { name: "AttachmentMedia" },
          {
            name: "AttachmentContent",
            children: [{ name: "AttachmentTitle" }, { name: "AttachmentDescription" }],
          },
          { name: "AttachmentActions", children: [{ name: "AttachmentAction" }] },
          { name: "AttachmentTrigger" },
        ],
      },
    ],
  },
});
