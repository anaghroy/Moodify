export function detectEmotion(blendshapes) {
  const get = (name) =>
    blendshapes.find((b) => b.categoryName === name)?.score || 0;

  const emotions = {
    Happy:
      get("mouthSmileLeft") + get("mouthSmileRight") + get("cheekSquintLeft"),

    Sad: get("mouthFrownLeft") + get("mouthFrownRight"),

    Angry: get("browDownLeft") + get("browDownRight") + get("mouthPressLeft"),

    Surprise: get("jawOpen") + get("eyeWideLeft") + get("browInnerUp"),

    Talking: get("jawOpen"),

    Blink: get("eyeBlinkLeft") + get("eyeBlinkRight"),
  };

  const [emotion] = Object.entries(emotions).sort((a, b) => b[1] - a[1])[0];

  // ✅ Emoji Mapping
  const emojiMap = {
    Happy: "😄",
    Sad: "😢",
    Angry: "😠",
    Surprise: "😲",
    Talking: "🗣️",
    Blink: "😉",
  };

  return { emotion, emoji: emojiMap[emotion] || "😐" };
}
