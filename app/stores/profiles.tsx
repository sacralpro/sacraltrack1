import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import { Profile } from '../types'; // Подключите типы профилей, если они уже определены
import useGetProfileById from '../hooks/useGetProfileById';
import useGetAllProfiles from '../hooks/useGetAllProfiles';

interface ProfileStore {
    allProfiles: Profile[];
    profileById: Profile | null;
    setAllProfiles: () => void;
    setProfileById: (profileId: string) => void;
}


export const useProfileStore = create<ProfileStore>()( 
    devtools(
        persist(
            (set) => ({
                allProfiles: [],
                profileById: null,

                setAllProfiles: async () => {
                    const result = await useGetAllProfiles()
                    set({ allProfiles: result });
                },
                setProfileById: async (profileId: string) => {
                    const result = await useGetProfileById(profileId)
                    set({ profileById: result });
                },
            }),
            { 
                name: 'profileStore', 
                storage: createJSONStorage(() => localStorage) 
            }
        )
    )
)