import { create } from "zustand";
import {devtools} from 'zustand/middleware'


const useSearchHistory = create(devtools((set)=>({
    searchHistory: [],
    setSearchHistory: (val) =>
        set((state) => {
        const newHistory = state.searchHistory.filter(
            (item) => item.query !== val
        );
        newHistory.unshift({ query: val });
        return { searchHistory: newHistory };
    }),
})))

export default useSearchHistory

