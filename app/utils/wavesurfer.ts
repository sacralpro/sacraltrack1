import WaveSurfer from "wavesurfer.js";
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl";
import { PostMainCompTypes } from "@/app/types";

export const setupWaveSurfer = (
  waveformRef: React.RefObject<HTMLDivElement>,
  post: PostMainCompTypes
): WaveSurfer | null => {
  if (waveformRef.current) {
    const newWaveSurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#ffffff",
      progressColor: "#018CFD",
      dragToSeek: true,
      width: "47vw",
      hideScrollbar: true,
      normalize: true,
      barGap: 1,
      height: 40,
      barHeight: 20,
      barRadius: 20,
      barWidth: 4,
    });

    newWaveSurfer.load(useCreateBucketUrl(post?.mp3_url));

    newWaveSurfer.on("finish", () => {
      console.log("Песня закончилась");
    });

    newWaveSurfer.on("ready", () => {
      console.log("Волновая форма готова");
    });

    return newWaveSurfer;
  }

  return null;
};
