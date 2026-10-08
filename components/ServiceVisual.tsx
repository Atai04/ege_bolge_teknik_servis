import Image from "next/image";
import { SERVICE_VISUALS } from "../lib/data";

export function ServiceVisual({visual,priority=false,className="",sizes="(max-width: 800px) calc(100vw - 32px), (max-width: 1228px) 43vw, 528px"}:{visual:keyof typeof SERVICE_VISUALS;priority?:boolean;className?:string;sizes?:string}){
  const asset=SERVICE_VISUALS[visual];
  return <div className={`service-visual ${className}`}><Image src={asset.src} alt={asset.alt} fill priority={priority} sizes={sizes} className="service-sheet" /></div>;
}
