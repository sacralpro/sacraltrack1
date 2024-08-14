import { useState } from 'react';
import { storage } from '@/libs/AppWriteClient';
import { toast } from 'react-hot-toast';

interface UseFileDownloadProps {
  bucketId: string;
  fileId: string;
}

const useFileDownload = ({ bucketId, fileId }: UseFileDownloadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const downloadFile = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const downloadURL = await storage.getFileDownload(bucketId, fileId);
      const response = await fetch(downloadURL);
      const contentDisposition = response.headers.get('content-disposition');
      const fileName = contentDisposition?.split('filename=')[1].replace(/"/g, '');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName || '');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Ошибка при скачивании файла');
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { downloadFile, isLoading, error };
};

export default useFileDownload;
