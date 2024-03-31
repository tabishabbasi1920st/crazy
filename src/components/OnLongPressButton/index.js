import React, { useState, useRef } from "react";

function LongPressButton({ onLongPress }) {
  const [pressing, setPressing] = useState(false);
  const timerId = useRef(null);

  const handleTouchStart = () => {
    timerId.current = setTimeout(() => {
      setPressing(true);
      onLongPress(); // Call the function passed as prop
    }, 500); // Adjust the duration (in milliseconds) for a long press
  };

  const handleTouchMove = () => {
    clearTimeout(timerId.current);
    setPressing(false);
  };

  const handleTouchEnd = () => {
    clearTimeout(timerId.current);
    setPressing(false);
  };

  return (
    <div>
      <button
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={pressing ? "pressed" : ""}
      >
        {pressing ? "Long Pressed" : "Press and hold"}
      </button>
    </div>
  );
}

export default LongPressButton;
