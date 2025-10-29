import React from "react";

// Simple green spinner loader

const Loader = ({ fullScreen = true, size = "w-12 h-12" }) => {
  const containerClass = fullScreen
    ? "w-full h-screen flex items-center justify-center"
    : "flex items-center justify-center";

  return (
    <div className={containerClass}>
      <div
        // Tailwind spinner: green border with transparent top to create the spin illusion
        className={`border-4 border-green-400 border-t-transparent rounded-full animate-spin ${size}`}
        aria-label="Loading"
        role="status"
      />
    </div>
  );
};

export default Loader;
