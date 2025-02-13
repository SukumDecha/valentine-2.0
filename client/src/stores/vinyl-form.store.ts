import { ITrack } from '@/types/track';
import { IVinyl, VinylForm } from '@/types/vinyl/vinyl';
import { create } from 'zustand'


interface VinylFormState {
  form: VinylForm;
  setForm: (key: string, value: any) => void;
  setId: (id: string) => void;
  setTemplateId: (id: string) => void;
  setTrack: (track: ITrack) => void;
  addImages: (image: IVinyl) => void;
}

export const useVinylFormStore = create<VinylFormState>((set) => ({
  form: { id: '', templateId: '', track: null, images: [] },
  setForm: (key: string, value: any) => set((state) => ({ form: { ...state.form, [key]: value } })),
  setId: (id: string) => set((state) => ({ form: { ...state.form, id: id } })),
  setTemplateId: (templateId: string) => set((state) => ({ form: { ...state.form, templateId: templateId } })),
  setTrack: (track: ITrack) => set((state) => ({ form: { ...state.form, track: track } })),
  addImages: (image: IVinyl) => set((state) => ({ form: { ...state.form, images: [...state.form.images, image] } }))
}))