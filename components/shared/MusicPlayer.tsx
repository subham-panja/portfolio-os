"use client";

import { useEffect, useRef } from "react";
import { useMusicStore } from "@/lib/store/useMusicStore";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

export default function MusicPlayer() {
  const {
    isPlaying,
    volume,
    currentTrackIndex,
    playlist,
    setIsPlaying,
    setVolume,
    nextTrack,
    prevTrack,
  } = useMusicStore();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const track = playlist[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, setIsPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex flex-col gap-4 border border-white/20">
      <audio
        ref={audioRef}
        src={track.url}
        onEnded={nextTrack}
        crossOrigin="anonymous"
      />

      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-lg bg-cover bg-center shadow-lg"
          style={{ backgroundImage: `url(${track.cover})` }}
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium text-sm truncate">
            {track.title}
          </h3>
          <p className="text-white/60 text-xs truncate">{track.artist}</p>
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <button
          onClick={prevTrack}
          className="text-white/80 hover:text-white transition-colors"
        >
          <SkipBack size={20} />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
        >
          {isPlaying ? (
            <Pause size={20} fill="currentColor" />
          ) : (
            <Play size={20} fill="currentColor" className="ml-0.5" />
          )}
        </button>
        <button
          onClick={nextTrack}
          className="text-white/80 hover:text-white transition-colors"
        >
          <SkipForward size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <Volume2 size={16} className="text-white/60" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full h-1 bg-white/30 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
        />
      </div>
    </div>
  );
}
