"use client";
import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import UserProfileCard from "../components/UserProfileCard";
import { useProfileStore } from "../stores/profiles";
import ClientOnly from "../components/ClientOnly";
import { Profile } from '../types';

export default function People() {
  const { allProfiles, setAllProfiles } = useProfileStore();
  const [userList, setUserList] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        await setAllProfiles();
      } catch (error) {
        console.error("Ошибка при получении профилей:", error);
      }
    };

    fetchProfiles();
  }, [setAllProfiles]);

  useEffect(() => {
    setUserList(allProfiles as Profile[]);
  }, [allProfiles]);

  return (
    <>
      <MainLayout>
        <div className="mt-[80px] w-full  max-w-[690px] ml-auto" style={{ display: 'flex', flexWrap: 'wrap' }}>
          <ClientOnly>
            {userList.map(user => (
              <UserProfileCard key={user.id} profile={user} />
            ))}
          </ClientOnly>
        </div>
      </MainLayout>
    </>
  );
}