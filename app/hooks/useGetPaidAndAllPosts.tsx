import { useState, useEffect } from 'react';
import useGetPaidPostByUserId from './useGetPaidPostByUserId';
import useGetAllPostsForDownloads from './useGetAllPostsForDownloads';

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
}

interface PaidPostData {
  id: string;
  user_id: string;
  cart_items: string[];
}

interface PostWithPaid extends Post {
  isPaid: boolean;
}

const useGetPaidAndAllPosts = (userId: string) => {
  const [paidAndAllPosts, setPaidAndAllPosts] = useState<PostWithPaid[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Начинаем получение оплаченных и всех постов для пользователя:', userId);

        const paidPostData: PaidPostData[] = await useGetPaidPostByUserId(userId);
        console.log('Полученные данные из базы cartpaid:', paidPostData);

        console.log('Начинаем получение всех постов из базы данных');
        const allPostsRaw: (Post | null)[] = await useGetAllPostsForDownloads();
        const allPosts: Post[] = allPostsRaw.filter((post): post is Post => post !== null); // Filter out null elements
        console.log('Все посты из базы данных:', allPosts);

        const paidAndAllPosts: PostWithPaid[] = allPosts.map((post) => ({
          ...post,
          isPaid: paidPostData.some((paidPost) => paidPost.cart_items.includes(post.id)),
        }));

        setPaidAndAllPosts(paidAndAllPosts);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();

  }, [userId]);

  return paidAndAllPosts;
};

export default useGetPaidAndAllPosts;


