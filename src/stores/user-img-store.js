import { create } from 'zustand'

export const useUserImg = create((set) => ({
    userImg: "../public/user-img.png",
    changeUserImg: (img) =>
        set((state) => ({
            userImg: img,
        }))
}))