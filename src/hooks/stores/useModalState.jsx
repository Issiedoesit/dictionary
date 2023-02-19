import { create } from "zustand";
import {devtools} from 'zustand/middleware'


const useModalState = create(devtools((set)=>({
    isModalOpen: false,
    changeModalOpen: (val) => set({isModalOpen: val}),
})))

export default useModalState