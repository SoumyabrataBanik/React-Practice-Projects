import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./Components/StarRating/StarRating";
import PropTypes from "prop-types";
// import './index.css';
// import App from './App';

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  message: PropTypes.array,
};

function Test() {
  const [testRating, setTestRating] = useState(0);

  return (
    <div>
      <StarRating
        maxRating={10}
        size={32}
        color="blue"
        onSetTestRating={setTestRating}
      />
      <p>This movie has been rated {testRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} color="#fcc419" size={24} className="test" />
    <StarRating
      maxRating={5}
      color="red"
      size={30}
      className="test"
      message={["Bad", "Average", "Okay", "Good", "Amazing"]}
    />

    <Test />
  </React.StrictMode>
);
