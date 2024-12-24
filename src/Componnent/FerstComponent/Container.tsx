/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import HeaderContainer from "./HeaderContainer";
import BodyContainer from "./BodyContainer";

export default function Container() {
  return (
    <div className="w-full h-auto mt-10">
      <HeaderContainer/>
      <BodyContainer/>
    </div>
  );
}
