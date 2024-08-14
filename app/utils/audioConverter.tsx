import { Action } from '@/app/types';
import { FFmpeg } from '@ffmpeg/ffmpeg';

// Function to get the file extension
function getFileExtension(file_name: string) {
  const regex = /(?:\.([^.]+))?$/;
  const match = regex.exec(file_name);
  if (match && match[1]) {
    return match[1];
  }
  return '';
}

// Function to remove the file extension
function removeFileExtension(file_name: string) {
  const lastDotIndex = file_name.lastIndexOf('.');
  if (lastDotIndex !== -1) {
    return file_name.slice(0, lastDotIndex);
  }
  return file_name;
}


export async function convertWavToMp3(ffmpeg: FFmpeg, wavFile: File): Promise<{ mp3Url: string, mp3Blob: Blob } | { error: string }> {
  try {
    const file_name = wavFile.name;
    const outputMp3 = removeFileExtension(file_name) + '.mp3';

    // Записываем файл WAV в FFmpeg
    ffmpeg.writeFile(file_name, new Uint8Array(await wavFile.arrayBuffer()));

    const mp3Conversion = [
      '-i',
      file_name,
      '-b:a',
      '320k',
      outputMp3,
    ]

    // Выполняем конвертацию в MP3
    await ffmpeg.exec(mp3Conversion);

    // Читаем данные файла MP3
    const mp3Data = await ffmpeg.readFile(outputMp3);
    const mp3Blob = new Blob([mp3Data], { type: 'audio/mp3' });
    const mp3Url = URL.createObjectURL(mp3Blob);

   
    // Автоматическое скачивание файла MP3
    const downloadLink = document.createElement('a');
    downloadLink.href = mp3Url;
    downloadLink.download = 'converted_audio.mp3';
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    return { mp3Url, mp3Blob };
  } catch (error) {
    return { error: 'Произошла ошибка при конвертации аудиофайла' };
  }
}