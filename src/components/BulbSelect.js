import React from "react";

import "../css/BulbSelect.css";

class BulbSelect extends React.Component {
  // arrows invisible until select bulb clicked
  // when clicked, arrows become visible and first
  // bulb in row becomes highlighted if display active
  // then it is toggled to inactive during size change
  // highlighted bulb changes with left/right arrows
  // user can adjust each bulb like this
  // after adding desired sizes to bulbs 
  // user clicks select bulb button again to finalize
  // changes and resume display if previously active

  render() {
    return (
      <div className="bulb-select">
        <div 
          className="arrow left"
          style={this.props.style}
          onClick={() => this.props.cycle("-")}
        />
        <div 
          className="select"
          onClick={this.props.bulbSelector}
        >
          {this.props.status}
        </div>
        <div
          className="arrow right"
          style={this.props.style}
          onClick={() => this.props.cycle("+")}
        />
      </div>
    );
  }
}

export default BulbSelect;
