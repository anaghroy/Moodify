import { useRef } from "react";
import useFaceExpression from "../hooks/useFaceExpression";

export default function FaceExpression() {
  const videoRef = useRef(null);

  const { emotion, startDetection, stopDetection, isDetecting } =
    useFaceExpression(videoRef);

  return (
    <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width={700}
        style={{ borderRadius: "12px" }}
      />

      <h2>{emotion}</h2>

      {!isDetecting ? (
        <button onClick={startDetection}>Detect Expression</button>
      ) : (
        <button onClick={stopDetection}>Stop Detection</button>
      )}
    </div>
  );
}
