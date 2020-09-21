/** @format */

import React from "react";

const Splash = (WrapperComponent) => {
  const colors = ["red", "pink", "orange", "blue", "green", "yellow"];
  const randomColor = colors[Math.floor(Math.random() * 5)];
  const classNmae = randomColor + "-text";
  return (props) => {
    const { isAuthenticated } = props;
    console.log(props);
    console.log(props.isAuthenticated);
    const isLoading = isAuthenticated ? (
      <div className={classNmae}>
        <WrapperComponent {...props} />
      </div>
    ) : (
      <p>Loading..</p>
    );

    return isLoading;
  };
};

export default Splash;
