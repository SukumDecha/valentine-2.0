import { ITrack } from "../track";

export type VinylForm = {
    templateId: string;
    track: ITrack | null;
    images: IVinyl[] | null;
}

export interface IVinyl {
    file: File;
    text: string;
}

export interface IVinylResponse {
    success: boolean;
    message?: string;
    images?: IVinyl[];
}

export interface IUserResponse {
    success: boolean;
    message?: string;
    trackId?: string;
    trackImage?: string;
    images?: IVinyl[];
    template?: string;
}
