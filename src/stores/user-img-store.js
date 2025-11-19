import { create } from 'zustand'

export const useUserImg = create((set) => ({
    userImg: "https://media.licdn.com/dms/image/v2/D4E03AQGy1OWBIfOy2A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1691031045223?e=1764201600&v=beta&t=O2Nwj1howzF6UzghUIPliAHVF8_z0qfA3KVrEAACU4s",
    changeUserImg: (img) =>
        set((state) => ({
            userImg: img,
        }))
}))