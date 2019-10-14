import React from "react";
import LightsDisplay from "./components/LightsDisplay.js";
import LightController from "./components/LightController.js";
import BulbSelect from "./components/BulbSelect.js";

import "./css/App.css";

class App extends React.Component {
  state = {
    numRows: 1,
    bulbs: [10, 10, 10, 10, 10, 10, 10], // bulb intensity
    sizes: [50, 50, 50, 50, 50, 50, 50], // bulb sizes
    bulbColors: [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "indigo",
      "violet"
    ],
    newColorIndex: 0,
    colors: [
      "purple",
      "cyan",
      "turquoise",
      "white",
      "silver",
      "gold",
      "magenta",
      "pink",
      "darkblue",
      "darkred",
      "darkgreen",
      "grey",
      "skyblue",
      "whitesmoke",
      "darkcyan",
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "indigo",
      "violet"
    ],
    currentBulb: 0, // current bulb for display
    intensity: 110, // intensity of active bulb
    inactiveIntensity: 10, // intensity of inactive bulb
    displayActive: false,
    timeInterval: 250,
    arrowVisibility: { visibility: "hidden" },
    // need to rename bulbStatus
    bulbStatus: "Resize", // will toggle between 'Resize' and 'Done'
    selectedBulb: 0, // current bulb in select bulb mode
    bulbBorders: [0, 0, 0, 0, 0, 0, 0] // border sizes of selected bulbs
  };

  cycleColors = oprnd => {
    if (this.state.bulbStatus === "Resize") return;
    let selected = this.state.selectedBulb;
    let displayColors = this.state.bulbColors;
    let nextColorIndex = this.state.newColorIndex;
    if (oprnd === "+") {
      nextColorIndex = nextColorIndex < 21 ? ++nextColorIndex : 0;
    } else {
      nextColorIndex = nextColorIndex > 0 ? --nextColorIndex : 21;
    }
    displayColors[selected] = this.state.colors[nextColorIndex];
    this.setState({
      bulbColors: displayColors,
      newColorIndex: nextColorIndex
    });
  };

  cycleBulbs = oprnd => {
    let selected = this.state.selectedBulb;
    let bulbs = [0, 0, 0, 0, 0, 0, 0];
    if (oprnd === "+") {
      selected = selected < 6 ? ++selected : 0;
    } else {
      selected = selected > 0 ? --selected : 6;
    }
    bulbs[selected] = 5;
    this.setState({
      bulbBorders: bulbs,
      selectedBulb: selected
    });
  };

  selectBulb = () => {
    if (this.state.displayActive) return;
    const stat = this.state.bulbStatus === "Resize" ? "Done!" : "Resize";
    let isVisible = this.state.arrowVisibility;
    let newVisibility =
      isVisible.visibility === "hidden" ? "visible" : "hidden";
    isVisible = { visibility: newVisibility };
    let borders = [0, 0, 0, 0, 0, 0, 0];
    let selected = 0;
    let bulb = stat === "Done!" ? 5 : 0;
    borders[selected] = bulb;
    this.setState({
      bulbStatus: stat,
      arrowVisibility: isVisible,
      bulbBorders: borders,
      selectedBulb: selected
    });
  };

  getRows = () => {
    let newRows = this.state.numRows;
    newRows = newRows <= 6 ? ++newRows : 1;
    this.setState({
      numRows: newRows
    });
  };

  adjustSize = oprnd => {
    if (this.state.displayActive) return;
    if (this.state.bulbStatus === "Resize") return;
    let selected = this.state.selectedBulb;
    const bulbSizes = this.state.sizes;
    let selectedSize = bulbSizes[selected];
    if (oprnd === "+") {
      selectedSize += 5;
      selectedSize = selectedSize > 60 ? 60 : selectedSize;
    } else {
      selectedSize -= 5;
      selectedSize = selectedSize < 10 ? 10 : selectedSize;
    }
    bulbSizes[selected] = selectedSize;
    this.setState({
      sizes: bulbSizes
    });
  };

  adjustBulbIntensity = oprnd => {
    // if display is active, adjust current bulb
    if (this.state.displayActive) {
      let crrntBulbIntensity = this.state.intensity;
      // check to prevent intensity from going above or below max/min intensity
      if (
        (crrntBulbIntensity >= 300 && oprnd === "+") ||
        (crrntBulbIntensity <= 0 && oprnd === "-")
      ) {
        crrntBulbIntensity = oprnd === "+" ? 300 : 0;
        this.setState({
          intensity: crrntBulbIntensity
        });
      }
      // first we need to stop the timer
      this.toggleTimer(true);
      const incrmnt = oprnd === "+" ? 50 : -50;
      crrntBulbIntensity += incrmnt;
      this.setState({
        intensity: crrntBulbIntensity
      });
      // now we start the timer again
      this.toggleTimer(false, false, crrntBulbIntensity);
      // if display not active, adjust all other inactive bulbs
    } else {
      const bulbs = this.state.bulbs;
      let bulbIntensity = this.state.inactiveIntensity;
      // as above, check if intensity is above/below max/min
      if (
        (bulbIntensity >= 300 && oprnd === "+") ||
        (bulbIntensity <= 0 && oprnd === "-")
      ) {
        bulbIntensity = oprnd === "+" ? 300 : 0;
        this.setState({
          inactiveIntensity: bulbIntensity
        });
      }
      const incrementBy = oprnd === "+" ? 50 : -50;
      bulbIntensity += incrementBy;
      // set inactive bulbs to new intensity
      for (let i = 0; i < bulbs.length; i++) {
        bulbs[i] = bulbIntensity;
      }
      let currentBulb = this.state.currentBulb;
      currentBulb -= 1;
      if (currentBulb === 0 || currentBulb === 6) {
        currentBulb = currentBulb === 0 ? 6 : 0;
      }
      bulbs[currentBulb] = this.state.intensity;
      this.setState({
        bulbs: bulbs,
        inactiveIntensity: bulbIntensity
      });
    }
  };

  adjustSpeed = oprnd => {
    if (!this.state.displayActive) return;
    let currentInterval = this.state.timeInterval;
    let intervalChange;
    if (
      (currentInterval >= 500 && oprnd === "-") ||
      (currentInterval <= 50 && oprnd === "+")
    ) {
      return;
    }
    this.toggleTimer(true);
    intervalChange = oprnd === "+" ? -25 : 25;
    currentInterval += intervalChange;
    this.setState({
      timeInterval: currentInterval
    });
    this.toggleTimer(false, currentInterval);
  };

  // perhaps timer should also handle displayActive boolean?
  toggleTimer = (reset, interval, intensity) => {
    const newInterval = interval ? interval : this.state.timeInterval;
    if (!intensity) {
      intensity = this.state.intensity;
    }
    if (reset) {
      clearInterval(this.state.timer);
    } else {
      this.setState({
        timer: setInterval(() => {
          const x = this.state.inactiveIntensity; // use x to make it easier to fill newDisplay
          const newDisplay = [x, x, x, x, x, x, x];
          let litBulb = this.state.currentBulb;
          newDisplay[litBulb] = intensity;
          litBulb = litBulb < 6 ? ++litBulb : 0;
          this.setState({
            bulbs: newDisplay,
            currentBulb: litBulb
          });
        }, newInterval)
      });
    }
  };

  activateDisplay = () => {
    if (this.state.bulbStatus === "Done!") return;
    let display = this.state.displayActive;
    const toReset = display ? true : false;
    this.toggleTimer(toReset, false);
    display = !display;
    this.setState({
      displayActive: display
    });
  };

  render() {
    return (
      <div className="App">
        <LightsDisplay
          numberOfRows={this.state.numRows}
          bulbs={this.state.bulbs}
          sizes={this.state.sizes}
          colors={this.state.bulbColors}
          selectBorder={this.state.bulbBorders}
        />
        <LightController
          transmitRows={this.getRows}
          startDisplay={this.activateDisplay}
          speedController={this.adjustSpeed}
          sizeController={this.adjustSize}
          intensityController={this.adjustBulbIntensity}
          colorController={this.cycleColors}
          colors={this.state.bulbColors}
          bulbStatus={this.state.bulbStatus}
          selectedBulb={this.state.selectedBulb}
        />
        <BulbSelect
          style={this.state.arrowVisibility}
          status={this.state.bulbStatus}
          cycle={this.cycleBulbs}
          bulbSelector={this.selectBulb}
        />
      </div>
    );
  }
}

export default App;
