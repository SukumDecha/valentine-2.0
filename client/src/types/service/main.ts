export interface ImageWithText {
    file: File;
    text: string;
  }

export interface UploadImagesWithTextsResponse {
    success: boolean;
    message?: string;
    images?: ImageWithText[];
}

export interface SearchTrackResponse {
    success: boolean;
    message?: string;
    tracks?: Track[];
}

export interface UserDataResponse {
    success: boolean;
    message?: string;
    trackId?: string;
    trackImage?: string;
    images?: ImageWithTextResponse[];
    template?: string;
}

export interface ImageWithTextResponse {
    url: string;
    text: string;
}

export interface Track {
    trackId: string;
    trackImage: string;
    trackName: string;
    artistName: string;
}
