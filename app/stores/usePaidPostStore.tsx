import { create } from 'zustand';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';
import useGetPaidPostByUserId, { PaidPostData } from '@/app/hooks/useGetPaidPostByUserId';
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
            // Получаем все оплаченные посты пользователя
            const paidPostData = await useGetPaidPostByUserId(userId);
            console.log('Полученные данные из базы cartpaid:', paidPostData);

            console.log('Начинаем получение всех постов из базы данных');
            // Получаем все посты из базы данных
            const allPosts = await useGetAllPostsForDownloads();
            console.log('Все посты из базы данных:', allPosts);

            // Фильтруем посты, которые есть в списке оплаченных
            console.log('Фильтруем посты, которые есть в списке оплаченных');
            const filteredPosts = allPosts.filter((post) =>
              post && paidPostData.some((paidPost) => {
                // Преобразуем строку JSON в массив
                const cartItems = typeof paidPost.cart_items === 'string' ? JSON.parse(paidPost.cart_items) : [];
                return cartItems.some((item: string) => item === post.id);
              })
            );

            console.log('Отфильтрованные посты:', filteredPosts);

            // Получаем профили пользователей для каждого поста
            const postsWithProfiles = await Promise.all(
              (filteredPosts.length > 0 ? filteredPosts : allPosts).map(async (post) => {
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

            set({ paidPosts: postsWithProfiles as Post[] }); // изменить тип на Post[]
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
