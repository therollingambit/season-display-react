import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
class App extends React.Component {
  state = { lat: null, errorMessage: "" }; //babel implemented constructor for us

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      //mozilla geolocation api
      (position) => this.setState({ lat: position.coords.latitude }), //call setState whenever wanna update state
      (err) => this.setState({ errorMessage: err.message })
    );
  }

  componentDidUpdate() {}

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    return <Spinner message="Please accept location request" />;
  }

  //React says we have to define render!!
  render() {
    //render will get called all the time
    return (
      //BEST PRACTICE: only have one return in render method
      <div className="border red">{this.renderContent()}</div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
