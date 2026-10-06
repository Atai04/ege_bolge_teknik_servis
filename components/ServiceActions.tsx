import { COMPANY } from "../lib/data";
import { PhoneIcon } from "./PhoneIcon";

export function ServiceActions() {
  return <div className="actions phone-actions">
    <a className="button phone-button" href={COMPANY.phoneHref}><PhoneIcon />Hemen Ara</a>
  </div>;
}
