import React from "react";

import "../css/LightsDisplay.css";

const LightRow = (props) => {
  const bulbStyles = [];
  const bulbs = props.bulbs;
  const sizes = props.sizes;
  const colors = props.colors;
  
  for (let i = 0; i < bulbs.length; i++) {
    bulbStyles.push({
      filter: "brightness(" + bulbs[i] + "%)",
      width: "" + sizes[i] + "px",
      height: "" + sizes[i] + "px",
      borderRadius: "" + sizes[i] + "px",
      border: `${props.border[i]}px solid white`,
      backgroundColor: colors[i]
    });
  }
  return (
    <div className="light-row">
      <p className="bulb" style={bulbStyles[0]} />
      <p className="bulb" style={bulbStyles[1]} />
      <p className="bulb" style={bulbStyles[2]} />
      <p className="bulb" style={bulbStyles[3]} />
      <p className="bulb" style={bulbStyles[4]} />
      <p className="bulb" style={bulbStyles[5]} />
      <p className="bulb" style={bulbStyles[6]} />
    </div>
  );
};

const LightsDisplay = (props) => {
  const bulbs = props.bulbs;
  const sizes = props.sizes;
  const selectBorder = props.selectBorder;
  const colors = props.colors;
  const rows = new Array(props.numberOfRows).fill(<LightRow 
    bulbs={bulbs} 
    sizes={sizes}
    border={selectBorder}
    colors={colors}
  />);
  return <div className="light-board">{rows.map((row) => {
    return <div>{row}</div>
  })}</div>;
}

export default LightsDisplay;