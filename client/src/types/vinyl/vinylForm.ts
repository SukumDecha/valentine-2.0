import { ImageWithText, Track } from "../service/main";

export type VinylForm = {
  templateId: string;
  track: Track | null;
  images: ImageWithText[] | null;
}