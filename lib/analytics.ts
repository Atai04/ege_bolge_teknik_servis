export type EventName="phone_click"|"whatsapp_click"|"service_form_start"|"service_form_submit"|"directions_click"|"service_page_view";
export function trackEvent(name:EventName,params:Record<string,string>={}){if(typeof window!=="undefined")window.dataLayer?.push({event:name,...params})}declare global{interface Window{dataLayer?:Record<string,unknown>[]}}
