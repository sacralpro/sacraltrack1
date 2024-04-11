"use client"
import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import UserProfileCard from "../components/UserProfileCard";
import { useProfileStore } from "../stores/profiles";
import ClientOnly from "../components/ClientOnly";

export default function People() {
  const { allProfiles, setAllProfiles } = useProfileStore();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        await setAllProfiles();
        setUserList(allProfiles);
      } catch (error) {
        console.error("Ошибка при получении профилей:", error);
      }
    };

    fetchProfiles();
  }, [setAllProfiles, allProfiles]);
  
  return (
    <>
      <MainLayout>
        <div className="mt-[80px] w-full max-w-[690px] ml-auto" style={{ display: 'flex', flexWrap: 'wrap' }}>
          <ClientOnly>
            {userList.map(user => (
              <UserProfileCard key={user.id} profile={user} style={{ width: '50%' }} />
            ))}
          </ClientOnly>
        </div>
      </MainLayout>
    </>
  );
}