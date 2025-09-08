import "./App.css";
import { Component } from "react";
import { Stage, Layer, Line } from "react-konva";

class App extends Component {
  state = {
    value: 0,
    binary: [0, 0, 0, 0, 0, 0, 0, 0],
    numSubnets: 1,
    numHosts: Math.pow(2, 8) - 2,
  };
  calculateNumSubnets = (position) => {
    return Math.pow(2, position);
  };
  calculateNumHosts = (position) => {
    const numHostBits = 8 - position;
    let numHosts = Math.pow(2, numHostBits);
    if (numHostBits == 0) {
      numHosts = 0;
    } else if (numHostBits > 1) {
      numHosts -= 2;
    }
    return numHosts;
  };
  render() {
    const points = [50, 0, 50, 200];
    const GRID_SIZE = 52;

    const handleDragMove = (e) => {
      const node = e.target;

      // Get how far the line has been dragged
      const { x, y } = node.position();

      // Snap offset to nearest GRID_SIZE
      const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE;

      // Update Konva node position
      node.position({ x: snappedX, y: 0 });
      let position = Math.round(x / GRID_SIZE);
      console.log(position);
      if (position < 0) {
        position = 0;
      } else if (position > 8) {
        position = 8;
      }
      const binary = [0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < position; i++) {
        binary[i] = 1;
      }
      const numSubnets = this.calculateNumSubnets(position);
      const numHosts = this.calculateNumHosts(position);
      this.setState({
        value: position,
        binary: binary,
        numSubnets: numSubnets,
        numHosts: numHosts,
      });
    };
    return (
      <div className="App">
        <div className="binary-positions">
          {[...Array(8)].map((e, i) => (
            <div className="binary-position">
              <div className="binary-container border">
                {this.state.binary[i]}
              </div>
            </div>
          ))}
        </div>
        <Stage width={500} height={500} className="line-stage">
          <Layer>
            <Line
              points={points}
              stroke="black"
              strokeWidth={4}
              hitStrokeWidth={200}
              draggable
              onDragMove={handleDragMove}
            />
          </Layer>
        </Stage>
        <div className="count-container">
          <div>Mask=/{this.state.value}</div>
          <div>
            Number of Subnets=2^{this.state.value}={this.state.numSubnets}
          </div>
          <div>
            Number of Hosts Per Subnet=(2^{8 - this.state.value})-2=
            {this.state.numHosts}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
