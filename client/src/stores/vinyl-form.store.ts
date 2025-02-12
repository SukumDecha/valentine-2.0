import { VinylForm } from '@/types/vinyl/vinylForm'
import {create} from 'zustand'


interface VinylFormState {
  form: VinylForm;
  setForm: (key: string, value: any) => void;
}

export const useVinylFormStore = create<VinylFormState>((set) => ({
  form: {templateId: '', track: null , images: null},
  setForm: (key: string, value: any) => set((state) => ({form: {...state.form, [key]: value}}))
}))