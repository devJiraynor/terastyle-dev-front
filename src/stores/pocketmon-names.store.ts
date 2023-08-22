import { create } from "zustand"

interface PocketmonNames {
    pocketmonNames: string[],
    setPocketmonNames: (names: string[]) => void
}

const useStore = create<PocketmonNames>(set => ({
    pocketmonNames: [],
    setPocketmonNames: (pocketmonNames) => set((state) => ({ ...state, pocketmonNames }))
}));

export default useStore;