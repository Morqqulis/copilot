"use client";
import React from "react";

export default function BackToTopButton() {
  const [hasScrolled, setHasScrolled] = React.useState(false);
  const scrollLimit = 400;

  React.useEffect(() => {
    window.addEventListener("scroll", scrollFunction);
    return () => window.removeEventListener("scroll", scrollFunction);
  }, []);

  const scrollFunction = () => {
    if (
      document.body.scrollTop > scrollLimit ||
      document.documentElement.scrollTop > scrollLimit
    ) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  };
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={backToTop}
      className={`fixed bottom-5 transform right-5 md:bottom-7 md:right-7 rounded-full bg-gray-950 hover:bg-black p-3 md:p-4 text-xs md:text-lg font-medium uppercase leading-tight text-white transition duration-150 ease-in-out ${
        hasScrolled ? "" : "translate-x-36"
      }`}
    >
      <span className="[&>svg]:w-4 md:[&>svg]:w-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
          />
        </svg>
      </span>
    </button>
  );
}
