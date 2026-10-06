import { COMPANY } from "../lib/data";

// Preserve native links: the existing consent-gated WhatsApp listener handles clicks.
export function ServiceActions({ whatsappLabel }: { whatsappLabel: string }) {
  return <div className="actions">
    <a className="button amber" href={COMPANY.phoneHref}>Hemen Ara</a>
    <a className="button outline" href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer">{whatsappLabel}</a>
  </div>;
}
