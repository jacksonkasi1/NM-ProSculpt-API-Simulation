import axios from "axios";

export const fetchAudio = async (text: string, voice: string) => {
  const response = await axios.post(
    "/api/11labs/tts",
    { text, voice },
    { responseType: "arraybuffer" },
  );
  const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
  const audioUrl = URL.createObjectURL(audioBlob);
  return new Audio(audioUrl);
};
