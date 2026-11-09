import React from 'react';
import { Play, Sparkles, BookOpen, ExternalLink, ChevronRight, Tv } from 'lucide-react';
import { sfx } from '../utils/soundEffects';

interface VideoSectionProps {
  onStartStory?: () => void;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ onStartStory }) => {
  const videoId = 'rBTRYTXqarI';
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0`;
  const youtubeUrl = `https://youtu.be/rBTRYTXqarI?si=oXW7MjOEDlMjpNpJ`;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-500/10 via-amber-500/10 to-orange-500/10 rounded-2xl p-5 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 tracking-wider">
            <span className="text-base">📺</span>
            <span>ANIMATED STORY VIDEO · 動畫視頻觀看</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mt-0.5">
            The Land of Darkness (Chapter 7 Animation)
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            觀看原創西遊記動畫視頻，跟隨齊天大聖大鬧幽冥地府、勾銷生死簿！
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sfx.playClick()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-700 hover:text-red-600 hover:bg-stone-50 shadow-2xs transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in YouTube</span>
          </a>

          {onStartStory && (
            <button
              onClick={() => {
                sfx.playClick();
                onStartStory();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 shadow-xs transition-colors"
            >
              <span>Read Story 📖</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Video Theater Player Frame */}
      <div className="bg-stone-900 rounded-3xl p-3 sm:p-5 shadow-xl border border-stone-800">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
          <iframe
            src={embedUrl}
            title="Journey to the West: The Land of Darkness Animated Video"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Video Player Caption Bar */}
        <div className="mt-3 px-2 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-stone-400 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-medium text-stone-300">
              西遊記：第七話《幽冥界與生死簿》精選動畫視頻
            </span>
          </div>
          <span className="text-[11px] text-stone-500">
            建議全螢幕觀看並開啟聲音，享受完整雙語動畫體驗
          </span>
        </div>
      </div>

      {/* Story Highlights & Learning Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs space-y-1.5">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-xs">
            <span className="w-5 h-5 rounded-md bg-amber-100 flex items-center justify-center text-[11px]">1</span>
            <span>如意金箍棒 (The Iron Pillar)</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            孫悟空在東海龍宮得到定海神針，並以口訣將神珍鐵縮小成繡花針藏於耳中。
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs space-y-1.5">
          <div className="flex items-center gap-2 text-sky-700 font-bold text-xs">
            <span className="w-5 h-5 rounded-md bg-sky-100 flex items-center justify-center text-[11px]">2</span>
            <span>幽冥拘魂 (The Spirits Attack)</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            花果山慶祝盛宴後，兩名地府鬼差趁悟空熟睡將其魂魄強行拉入陰森的幽冥界。
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs space-y-1.5">
          <div className="flex items-center gap-2 text-purple-700 font-bold text-xs">
            <span className="w-5 h-5 rounded-md bg-purple-100 flex items-center justify-center text-[11px]">3</span>
            <span>大鬧森羅殿 (Palace of Darkness)</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            悟空震怒揮舞金箍棒打倒鬼差，直闖森羅殿對質掌管生死大權的幽冥判官。
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
            <span className="w-5 h-5 rounded-md bg-emerald-100 flex items-center justify-center text-[11px]">4</span>
            <span>勾銷生死簿 (Cross Out Directory)</span>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            悟空拔下毫毛化作濃墨毛筆，一筆勾銷自己與所有猴屬猴孫之名，得證長生！
          </p>
        </div>
      </div>
    </div>
  );
};
