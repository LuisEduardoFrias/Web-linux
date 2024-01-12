'use client'
import { CSSProperties, ReactElement } from "react";
import styles from "st/icon.module.css";

export default function Icon({
  children,
  className,
  onclick,
  style,
  id,
}: {
  children: string;
  className?: object;
  onclick?: () => void;
  style?: CSSProperties;
  id?: string;
}): JSX.Element {
  const default_external_className: any = className ?? "icon_";
  
  return (
    <i
      className={`material-symbols-outlined ${styles.__icon__} ${default_external_className}`}
      style={{
        ...style,
      }}
      id={id}
      onClick={onclick}
    >
      {children}
    </i>
  );
}
