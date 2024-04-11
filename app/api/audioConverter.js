import ffmpeg from 'fluent-ffmpeg';

export async function convertWavToMp3(inputPath, outputPath) {
    try {
        // Проверка существования входного файла
        const responseInput = await fetch(inputPath);
        if (!responseInput.ok) {
            throw new Error('Input file does not exist');
        }

        // Проверка существования выходного файла
        const responseOutput = await fetch(outputPath);
        if (responseOutput.ok) {
            throw new Error('Output file already exists');
        }

        // Выполнение конвертации аудио
        ffmpeg(inputPath)
            .input(inputPath)
            .audioCodec('libmp3lame')
            .audioBitrate('320k')
            .audioChannels(2)
            .audioFrequency(44100)
            .output(outputPath)
            .on('end', () => resolve(outputPath))
            .on('error', (err) => {
                console.error('Error converting file:', err);
                reject(err);
            })
            .run();
    } catch (error) {
        console.error('Error during conversion:', error);
        throw error;
    }
}