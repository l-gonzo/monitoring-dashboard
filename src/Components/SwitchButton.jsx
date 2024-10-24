import React, { useState } from "react";
import "./../styles/SwitchButton.css"

const SwitchButton = ({ onToggle }) => {
  const [isOn, setIsOn] = useState(true);

  const toggleSwitch = () => {
    const newState = !isOn;
    setIsOn(newState);
    onToggle(newState); 
  };

  return (
    <div className={`switch ${isOn ? "on" : "off"}`} onClick={toggleSwitch}>
      <div className="knob" />
      
    </div>
  );
};

export default SwitchButton;
