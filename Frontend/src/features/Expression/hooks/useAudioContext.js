import { useContext } from "react";
import { AudioContext } from "../context/AudioContext";

const useAudioContext = () => {
  return useContext(AudioContext);
};

export default useAudioContext;
