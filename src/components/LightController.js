import React from "react";

import "../css/LightController.css";


class LightController extends React.Component {
  toggleRows = () => {
    this.props.transmitRows();
  };

  render() {
    return (
      <div className="light-controller">
        <div className="option" onClick={this.props.startDisplay}>
          Start/Stop
        </div>
        <div className="tweaks">
          <div
            className="button"
            onClick={() => this.props.speedController("+")}
          >
            Faster
          </div>
          <div
            className="button"
            onClick={() => this.props.speedController("-")}
          >
            Slower
          </div>
        </div>
        <div className="tweaks">
          <div 
            className="button"
            onClick={() => this.props.intensityController("+")}
          >
            Brighter
          </div>
          <div 
           className="button"
           onClick={() => this.props.intensityController("-")}
          >
            Dimmer
          </div>
        </div>
        <div className="tweaks">
          <div 
            className="button"
            onClick={() => this.props.sizeController("+")}
          >
            Bigger
          </div>
          <div 
            className="button"
            onClick={() => this.props.sizeController("-")}
          >
            Smaller
          </div>
        </div>
        <div className="tweaks">
          <div className="color-control" style={{color: this.props.colors[this.props.selectedBulb]}}>
            {this.props.bulbStatus === "Done!" ? this.props.colors[this.props.selectedBulb] : ""}
          </div>
          <div className="color-control">
            <div className="arrow-container">
              <div 
                className="arrow-down"
                onClick={() => this.props.colorController("-")}
              >
              </div>
            </div>
            <div className="arrow-container">
              <div 
                className="arrow-up"
                onClick={() => this.props.colorController("+")}
              >
              </div>
            </div>
          </div>
        </div>
        <div className="option" onClick={this.toggleRows}>
          Row(s)
        </div>
      </div>
    );
  }
}

export default LightController;