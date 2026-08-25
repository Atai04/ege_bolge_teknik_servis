"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

export function Reveal({children,variant="fade-up",delay=0,className=""}:{children:ReactNode;variant?:"fade-up"|"fade-left"|"fade-right"|"scale-soft";delay?:number;className?:string}){
  const ref=useRef<HTMLDivElement>(null); const [shown,setShown]=useState(false);
  useEffect(()=>{const node=ref.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setShown(true);observer.disconnect()}},{threshold:.18});observer.observe(node);return()=>observer.disconnect()},[]);
  return <div ref={ref} className={`reveal reveal-${variant} ${shown?"is-visible":""} ${className}`} style={{transitionDelay:`${delay}ms`}}>{children}</div>;
}
