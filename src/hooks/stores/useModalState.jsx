import { create } from "zustand";
import {devtools} from 'zustand/middleware'


const useModalState = create(devtools((set)=>({
    isModalOpen: false,
    changeModalOpen: () => set((state) => ({isModalOpen: !state.isModalOpen})),
})))

export default useModalState