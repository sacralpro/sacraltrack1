import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import useGetPaidPostByUserId from '@/app/hooks/useGetPaidPostByUserId';
import useGetAllPostsForDownloads from '@/app/hooks/useGetAllPostsForDownloads';
import useGetProfileByUserId from '@/app/hooks/useGetProfileByUserId';

interface Post {
  id: string;
  user_id: string;
  audio_url: string;
  mp3_url: string;
  trackname: string;
  image_url: string;
  text: string;
  created_at: string;
  price: number;
  genre: string;
  likes: number;
  comments: number;
  profile: {
    id: string;
    user_id: string;
    name: string;
    image: string;
  };
}

interface PaidPostStore {
  paidPosts: Post[] | null[];
  setPaidPosts: (userId: string) => Promise<void>;
}

export const usePaidPostStore = create<PaidPostStore>()(
  devtools(
    persist(
      (set) => ({
        paidPosts: [],
        setPaidPosts: async (userId: string) => {
          try {
            console.log('Начинаем получение оплаченных постов для пользователя:', userId);
            const paidPostData = await useGetPaidPostByUserId(userId);
            console.log('Полученные данные из базы cartpaid:', paidPostData);

            console.log('Начинаем получение всех постов из базы данных');
            const allPosts = await useGetAllPostsForDownloads();
            console.log('Все посты из базы данных:', allPosts);

            console.log('Фильтруем посты, которые есть в списке оплаченных');
            const filteredPosts = allPosts.filter((post) =>
              post && paidPostData.some((paidPost) => {
                const cartItems = typeof paidPost.cart_items === 'string' ? JSON.parse(paidPost.cart_items) : [];
                return cartItems.some((item: string) => item === post.id);
              })
            );

            console.log('Отфильтрованные посты:', filteredPosts);

            const postsWithProfiles = await Promise.all(
              filteredPosts.map(async (post) => {
                if (!post) return null;
                const profile = await useGetProfileByUserId(post.user_id);
                return {
                  ...post,
                  profile: {
                    id: profile.id,
                    name: profile.name,
                    image: profile.image,
                  },
                };
              })
            );

            set({ paidPosts: postsWithProfiles as Post[] });
          } catch (error) {
            console.error('Ошибка при получении данных:', error);
          }
        },
      }),
      {
        name: 'paid-post-store',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
