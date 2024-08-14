import { useState } from 'react';

const useTogglePaidPosts = () => {
  const [showPaidPosts, setShowPaidPosts] = useState(false);

  const toggleShowPaidPosts = () => setShowPaidPosts((prevState) => !prevState);

  return { showPaidPosts, toggleShowPaidPosts };
};

export default useTogglePaidPosts;