export interface UserContextTypes {
    id: string | null;
    user: User | null;
    register: (name: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkUser: () => Promise<void>;
}

export interface Product {
    post: PostMainCompTypes;
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    onDeleteItem: () => void;
    item: {
        id: string;
      };
  }

  export interface RoyaltyPayment {
    id: string;
    user_id: string;
    user_name: string; // Assuming you have this to display the user's name
    amount: string;
    card: string;
    card_name: string;
    card_date: string;
  }
  

  export interface PaidPostData {
    id: string;
    title: string;
    description: string;
    audio_url: string;
    image_url: string; // Add the image_url property
    cart_items: string[];
    created_at: string;
    updated_at: string;
    posts?: PostWithProfile[];

  }



export interface User {
    id: string,
    name: string,
    bio: string,
    image: string,
}

export interface Profile {
    id: string;
    user_id: string;
    name: string;
    image: string;
    bio: string;
}

export interface Friend {
    id: string;
    user_id: string;
    name: string;
    image: string;
}

export interface FriendsStore {
    allFriends: Friend[];
    setAllFriends: () => Promise<void>;
    addFriend: (userId: string) => Promise<void>;
    removeFriend: (userId: string) => Promise<void>;
  }

export interface RandomUsers {
    id: string;
    name: string;
    image: string;
    type: string;
    profile: {
        user_id: string;
        name: string;
        image: string;
    }

    
}

export interface CropperDimensions {
    height?: number | null;
    width?: number | null;
    left?: number | null;
    top?: number | null;
}

export interface Like {
    id: string;
    user_id: string;
    post_id: string;
  }

export interface Post {
    id: string;
    user_id: string;
    audio_url: string;
    image_url: string;
    mp3_url: string;
    text: string;
    created_at: string;
    trackname: string;
    price: any;
    genre: string;
    type: string;  // Add the 'type' property to the interface
    name: string;
    image: string;
    profile: {
        user_id: string;
        name: string;
        image: string;
    }
}

export interface PostWithProfile {
    id: string;
    user_id: string;
    audio_url: string;
    image_url: string;
    mp3_url: string;
    text: string;
    price: any;
    trackname: string;
    created_at: string;
    genre: string;
    profile: {
        user_id: string;
        name: string;
        image: string;
    }
}

export interface CommentWithProfile {
    id: string;
    user_id: string;
    post_id: string;
    text: string;
    created_at: string;
    profile: {
        user_id: string;
        name: string;
        image: string;
    }
}

export type Action = {
    file: File; // файл WAV, который вы хотите конвертировать
    file_name: string; // имя файла
  };

  export type GenresContextProps = {
    genres: string[];
    tracks: Track[];
    filteredTracks: Track[];
  };

  export const genres: string[] = [
    "Instrumental",
    "Techno",
    "K-pop",
    "Deep",
    "Hip-hop",
    "Meditative",
    "Electronic",
    "Rave",
    "House",
    "DnB",
    "Bass",
    "Minimal",
    "Lo-fi",
    "Neurofunk",
    "Psy",
    "Trap",
    "Ambient",
    "Acapella",
    "Ai",
    "Films",
    "Games"]

export interface Genre {
    id: string;
    name: string;
  };

  export interface Track {
    id: string;
    name: string;
  };


export interface Comment {
    id: string;
    user_id: string;
    post_id: string;
    text: string;
    created_at: string;
}

export interface ShowErrorObject {
    type: string;
    message: string;
}

export interface UploadError {
    type: string;
    message: string;
}


export interface ProfileType {
    id:string
    user_id: string;
    image_url: string;
    created_at: string;
}

//////////////////////////////////////////////
//////////////////////////////////////////////

export interface UserProfileCompTypes {
    profile: Profile
}



// COMPONENT TYPES
export interface CommentsHeaderCompTypes {
    params: { userId: string; postId: string; };
    post: PostWithProfile
}


export interface CommentsCompTypes {
    params: { userId: string; postId: string; };
}

export interface PostPageTypes {
    params: { userId: string; postId: string; };
    
}

export interface ProfilePageTypes {
    params: { id: string; };

}

export interface SingleCommentCompTypes {
    params: { userId: string; postId: string; };
    comment: CommentWithProfile
}

export interface Cart {
    id: string;
    items: CartItem[];
    total: number;
  }
  
  export interface CartItem {
    product: string;
    audio: string;
    audio_url: string;
    trackname: string;
    image: string;
    postId: string;
    quantity: number;
    price: number;
    name: string;
    totalAmount: number;
  }


export interface PostUserCompTypes {
    params: { userId: string; postId: string; };
    post: PostWithProfile;
    userId: string;
}

export interface PostMainCompTypes {
    router: any;
    post: PostWithProfile
    id: string;
    user_id: string;
    audio_url: string;
    image_url: string;
    price: any;
    mp3_url: string;
    text: string;
    trackname: string;
    created_at: string;
    genre: string;
    profile: {
        user_id: string;
        name: string;
        image: string;
    }
}

export interface PostMainLikesCompTypes {
    post: PostWithProfile
}

export interface TextInputCompTypes {
    string: string;
    inputType: string;
    placeholder: string;
    onUpdate: (newValue: string) => void;
    error: string;
}
export interface PeopleCardCompTypes {
    id: string;
    user_id: string;
    image_url: string;
    created_at: string;
}


//////////////////////////////////////////////
//////////////////////////////////////////////

// LAYOUT INCLUDE TYPES
export interface MenuItemTypes {
    iconString: string,
    colorString: string,
    sizeString: string
}

export interface MenuItemFollowCompTypes {
    user: RandomUsers
}