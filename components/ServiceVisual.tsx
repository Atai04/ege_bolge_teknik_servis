import Image from "next/image";
import { SERVICE_VISUALS } from "../lib/data";

export function ServiceVisual({visual,priority=false,className=""}:{visual:keyof typeof SERVICE_VISUALS;priority?:boolean;className?:string}){
  const asset=SERVICE_VISUALS[visual]; const [x,y]=asset.position.split(" ").map(Number);
  return <div className={`service-visual ${className}`} aria-hidden="false"><Image src={asset.src} alt={asset.alt} width={1254} height={1254} priority={priority} sizes="(max-width: 800px) 92vw, (max-width: 1100px) 45vw, 360px" className="service-sheet" style={{left:`-${x*100}%`,top:`-${y*100}%`}} /></div>;
}
