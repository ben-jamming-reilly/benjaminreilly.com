"use client";

import { useState } from "react";
import Image from "next/image";

type ProfileProps = {
  className?: string;
};

export function Profile({ className }: ProfileProps) {
  const [showSide, setShowSide] = useState(false);
  return (
    <button
      onMouseEnter={() => setShowSide(true)}
      onMouseLeave={() => setShowSide(false)}
      className={
        "w-44 h-44 bg-inherit rounded-3xl border-4 border-gray-950 dark:border-white " +
        className
      }
    >
      {showSide ? (
        <Image
          src="/static/images/me-side.png"
          className="m-auto rounded-full"
          height="257"
          width="201"
          alt="a picture of ben reilly"
        />
      ) : (
        <Image
          src="/static/images/me-front.png"
          className="m-auto rounded-full"
          height="266"
          width="203"
          alt="a picture of ben reilly"
        />
      )}
    </button>
  );
}
