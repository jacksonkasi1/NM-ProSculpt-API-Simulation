import axios from "axios";
import { Voice } from "@/types/voice";

let voices: Voice[] = [];

export const fetchVoices = async (apiKey: string): Promise<Voice[]> => {
  if (voices.length === 0) {
    try {
      const response = await axios.get("https://api.elevenlabs.io/v1/voices", {
        headers: { "xi-api-key": apiKey },
      });
      voices = response.data.voices.map((voice: any) => ({
        voice_id: voice.voice_id,
        name: voice.name,
        language: voice.fine_tuning.language,
        category: voice.category,
        labels: voice.labels,
        preview_url: voice.preview_url,
      }));
    } catch (error) {
      console.error("Error fetching voices:", error);
      throw error;
    }
  }
  return voices;
};
