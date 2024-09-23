export const getAudioContext = () => {
    if (typeof window !== 'undefined') {
      return new (window.AudioContext || window.webkitAudioContext)();
    } else {
      return null;
    }
  };
  
  const normalizeData = (filteredData) => {
    const multiplier = Math.pow(Math.max(...filteredData), -1);
    return filteredData.map((n) => n * multiplier);
  };
  
  export async function getAudioData(url) {
    try {
      const audioContext = getAudioContext();
      if (audioContext) {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  
        const rawData = audioBuffer.getChannelData(0);
        const samples = 44;
        const blockSize = Math.floor(rawData.length / samples);
        const filteredData = [];
  
        for (let i = 0; i < samples; i++) {
          let blockStart = blockSize * i;
          let sum = 0;
          for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(rawData[blockStart + j]);
          }
          filteredData.push(sum / blockSize);
        }
  
        return normalizeData(filteredData);
      } else {
        throw new Error('AudioContext is not available in the current environment.');
      }
    } catch (error) {
      console.error('Error getting audio data:', error);
      throw error;
    }
  }
  