"use client"

import { useGeneralStore } from "../stores/general";
import AuthOverlay from "./AuthOverlay";
import EditProfileOverlay from "./profile/EditProfileOverlay";
import ClientOnly from "./ClientOnly";
import { RecoilRoot } from "recoil";

export default function AllOverlays() {
    let { isLoginOpen, isEditProfileOpen } = useGeneralStore();
    return (
        <>
        <RecoilRoot>
            <ClientOnly>
                {isLoginOpen ? <AuthOverlay /> : null}
                {isEditProfileOpen ? <EditProfileOverlay /> : null}
            </ClientOnly>
        </RecoilRoot>
        </>
    )
}
