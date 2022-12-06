import React from "react";
import { FadeLoader } from "react-spinners";

export const Loading = ({ position }: { position?: any }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(255,255,255,0.7)",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: position ? position : "fixed",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}>
      <FadeLoader color='gray' />
    </div>
  );
};

export const LoadingBlur = () => {
  return (
    <div
      style={{
        // backgroundColor: "rgba(200,200,200,0.25)",
        // backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        zIndex: "10",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}>
      <FadeLoader />
    </div>
  );
};
