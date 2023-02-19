import { create } from "zustand";
import {devtools} from 'zustand/middleware'


const useThemeStore = create(devtools((set)=>({
    theme: {
        "variant":"light",
        "primary": "hsl(230, 77%, 56%)"
    },
    changeTheme: (val) =>
        set({theme: val}),
})))

export default useThemeStore