import type { PageSection } from "@locusgraph/components";
import { DocLink, GuideArticle, GuideSection, Prose } from "../guide-layout";

export const principlesSections: PageSection[] = [
  { id: "people-decide", title: "People decide" },
  { id: "square-and-ruled", title: "Square and ruled" },
  { id: "color-means-state", title: "Color means state" },
  { id: "three-typefaces", title: "Three typefaces" },
  { id: "quiet-by-default", title: "Quiet by default" },
  { id: "dark-first", title: "Dark first, light equal" },
];

export function PrinciplesPage() {
  return (
    <GuideArticle
      title="Principles"
      lead="The rules every component, block and Loop part follows. Use them when you build a screen the kit does not cover yet."
    >
      <GuideSection id="people-decide" title="People decide">
        <Prose>
          <p>
            An agent proposes; a person approves, edits or stops it. Anything that writes data,
            spends money or deletes something waits for a decision, shows what will change and
            records who decided. <DocLink href="/human-in-the-loop">Human in the loop</DocLink>{" "}
            walks through the parts.
          </p>
        </Prose>
      </GuideSection>
      <GuideSection id="square-and-ruled" title="Square and ruled">
        <Prose>
          <p>
            Containers, fields, menus and code have no radius. Group with ruled lines from{" "}
            <DocLink href="/display/rule-grid/rule-grid">Rule Grid</DocLink>, not cards and shadows.
            A line that splits a cell runs edge to edge. Anything you press that has a fill is a
            pill: buttons, segmented tabs, toggles, badges, chips, avatars and bars. Line tabs have
            no shape, only an underline. Nothing sits in between.
          </p>
        </Prose>
      </GuideSection>
      <GuideSection id="color-means-state" title="Color means state">
        <Prose>
          <ul>
            <li>Interactive blue on hover, memory violet for what an agent remembered.</li>
            <li>Good green, warn amber for waiting, destructive red.</li>
            <li>
              Bars and meters use the brighter fill tokens, <code>bg-good-fill</code> and{" "}
              <code>bg-warn-fill</code>, on a quiet track.
            </li>
            <li>Everything else is grey. Chart series never carry meaning.</li>
          </ul>
        </Prose>
      </GuideSection>
      <GuideSection id="three-typefaces" title="Three typefaces">
        <Prose>
          <ul>
            <li>Archivo for headings, labels, buttons and the wordmark.</li>
            <li>IBM Plex Sans for everything you read, inputs and menus.</li>
            <li>IBM Plex Mono for code, ids and commands.</li>
          </ul>
          <p>
            Sizes come from one short scale. Small labels use <code>locus-eyebrow</code>: Archivo,
            sentence case, muted.
          </p>
        </Prose>
      </GuideSection>
      <GuideSection id="quiet-by-default" title="Quiet by default">
        <Prose>
          <p>
            One primary action per view. Status lives in an icon or a word, not a tinted panel.
            Motion is short and stops under reduced motion. Every text tone passes WCAG AA on the
            page, on cards and on muted fills.
          </p>
        </Prose>
      </GuideSection>
      <GuideSection id="dark-first" title="Dark first, light equal">
        <Prose>
          <p>
            The docs open in dark, and every part is designed in both themes. Light uses a grey page
            with white cards so cells lift off it. See <DocLink href="/theming">Theming</DocLink> to
            add one brand color.
          </p>
        </Prose>
      </GuideSection>
    </GuideArticle>
  );
}
