import Image from "next/image";
import { SERVICE_VISUALS } from "../lib/data";

export function ServiceVisual({visual,priority=false,className=""}:{visual:keyof typeof SERVICE_VISUALS;priority?:boolean;className?:string}){
  const asset=SERVICE_VISUALS[visual];
  return <div className={`service-visual ${className}`}><Image src={asset.src} alt={asset.alt} fill priority={priority} sizes="(max-width: 800px) 92vw, (max-width: 1200px) 45vw, 570px" className="service-sheet" /></div>;
}
