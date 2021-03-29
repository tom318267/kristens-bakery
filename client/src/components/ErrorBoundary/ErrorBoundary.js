import React from "react";
import icecream from "../../assets/icecream.png";
import "./ErrorBoundary.scss";

class ErrorBoundary extends React.Component {
  state = {
    hasErrored: false,
  };
  static getDerivedStateFromError(error) {
    // process the error
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div className="ErrorBoundary">
          <img src={icecream} alt="icecream" />
          <h1>Sorry this page is broken</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
