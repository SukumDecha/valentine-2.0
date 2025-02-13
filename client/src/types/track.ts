
export interface ITrack {
    trackId: string;
    trackImage: string;
    trackName: string;
    artistName: string;
}

export interface ITrackResponse {
    success: boolean;
    message?: string;
    tracks?: ITrack[];
}