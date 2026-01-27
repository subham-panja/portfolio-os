import { create } from "zustand";

interface Track {
  title: string;
  artist: string;
  url: string;
  cover: string;
}

interface MusicState {
  isPlaying: boolean;
  volume: number;
  currentTrackIndex: number;
  playlist: Track[];
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  isPlaying: false,
  volume: 0.5,
  currentTrackIndex: 0,
  playlist: [
    {
      title: "Lofi Beats 24/7",
      artist: "Lofi Girl",
      url: "https://stream.zeno.fm/0r0xa792kwzuv",
      cover: "https://i1.sndcdn.com/artworks-000572183204-k724r2-t500x500.jpg",
    },
    {
      title: "Ambient Coding",
      artist: "System",
      url: "https://stream.zeno.fm/0r0xa792kwzuv", // Placeholder for now
      cover: "https://f4.bcbits.com/img/a3435449909_65",
    },
  ],
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setVolume: (volume) => set({ volume }),
  nextTrack: () =>
    set((state) => ({
      currentTrackIndex: (state.currentTrackIndex + 1) % state.playlist.length,
    })),
  prevTrack: () =>
    set((state) => ({
      currentTrackIndex:
        (state.currentTrackIndex - 1 + state.playlist.length) %
        state.playlist.length,
    })),
}));
