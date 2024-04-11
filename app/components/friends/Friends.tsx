import React from "react";
import { useEffect } from "react"
import { useUser } from "@/app/context/user"
import ClientOnly from "@/app/components/ClientOnly"
import { useGeneralStore } from "@/app/stores/general"
// import { useCreateBucketUrl } from "@/app/hooks/useCreateBucketUrl"

import PostUser from "@/app/components/profile/PostUser"
import MainLayout from "@/app/layouts/MainLayout"
import { BsPencil } from "react-icons/bs"

import { ProfilePageTypes, User } from "@/app/types"

interface Friend {
  id: string;
  name: string;
  isClose: boolean;
}

interface FriendsProps {
  friends: Friend[];
}

const Friends: React.FC<FriendsProps> = ({ friends }) => {
  return (
    <div>
      <h2>Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            {friend.name} - {friend.isClose ? "Close friend" : "Not so close"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;