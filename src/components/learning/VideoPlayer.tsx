'use client';

import React from 'react';

interface VideoPlayerProps {
  youtubeId: string;
  title: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ youtubeId, title }) => {
  return (
    <div className="w-full rounded-2xl overflow-hidden glass-panel border border-cyan-500/30 shadow-card">
      <div className="relative w-full pb-[56.25%] bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full border-none"
        />
      </div>
      <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="truncate text-slate-300 font-medium">{title}</span>
        </span>
        <span className="text-cyan-400 font-mono text-[11px] flex-shrink-0 ml-2">
          HD • YouTube
        </span>
      </div>
    </div>
  );
};
