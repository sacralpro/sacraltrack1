// app/context/ProfileContext.tsx
import { createContext, useState, useContext } from 'react';

interface ProfileContextValue {
  showPaidPosts: boolean;
  toggleShowPaidPosts: () => void;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [showPaidPosts, setShowPaidPosts] = useState(false);

  const toggleShowPaidPosts = () => {
    console.log('toggleShowPaidPosts called');
    setShowPaidPosts((prevState) => {
      console.log(`showPaidPosts changed from ${prevState} to ${!prevState}`);
      return !prevState;
    });
  };

  console.log('ProfileProvider rendered');

  return (
    <ProfileContext.Provider value={{ showPaidPosts, toggleShowPaidPosts }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }
  return context;
};

export default ProfileContext;