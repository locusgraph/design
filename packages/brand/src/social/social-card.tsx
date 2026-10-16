import { LocusGraphMark } from "../locusgraph-mark";
import type { BrandTheme } from "../themes/brand-themes";
import { socialCardStyles } from "./social-card-styles";

export type SocialCardProps = {
  title: string;
  description?: string;
  product?: string;
  url?: string;
  theme?: BrandTheme;
};

export function SocialCard({ title, description, product, url, theme = "dark" }: SocialCardProps) {
  const styles = socialCardStyles(theme);
  const hasFooter = Boolean(product || url);
  return (
    <div data-slot="social-card" style={styles.root}>
      <div style={styles.brandRow}>
        <LocusGraphMark width={44} height={40} style={{ color: styles.brandRow.color }} />
        <div style={{ display: "flex" }}>
          <span style={{ fontWeight: 700 }}>locus</span>
          <span style={{ fontWeight: 300 }}>graph</span>
        </div>
      </div>
      <div style={styles.body}>
        <div style={styles.title}>{title}</div>
        {description && <div style={styles.description}>{description}</div>}
      </div>
      {hasFooter ? (
        <div style={styles.footer}>
          <div style={styles.productLabel}>
            {product && <div style={styles.productDot} />}
            {product && <span>{product}</span>}
          </div>
          {url && <span>{url}</span>}
        </div>
      ) : (
        <div style={{ display: "flex", height: 1 }} />
      )}
    </div>
  );
}
