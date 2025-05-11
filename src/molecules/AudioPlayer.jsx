import React, { useState, useRef } from 'react';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50); // Default volume at 50%
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false); // To show volume slider
  const audioRef = useRef(null);
  const currentTime = audioRef.current
    ? formatDuration(audioRef.current.currentTime)
    : '00:00';
  const duration =
    audioRef.current && !isNaN(audioRef.current.duration)
      ? formatDuration(audioRef.current.duration)
      : '00:00';

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    let percentage = (currentTime / duration) * 100;
    if (isNaN(percentage)) percentage = 0;
    if (percentage == 100) setIsPlaying(!isPlaying);
    setProgress(percentage);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    const value = e.target.value;
    audio.currentTime = (value / 100) * audio.duration;
    setProgress(value);
  };

  const handleVolumeChange = (e) => {
    const value = e.target.value;
    audioRef.current.volume = value / 100;
    setVolume(value);
    setIsMuted(value === '0');
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume / 100;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  if (!src) return;

  return (
    <div
      className={`${
        src ? '' : ''
      } w-full mx-auto p-4 bg-gray-800 text-white rounded-lg shadow-lg`}
    >
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} src={src} />

      {/* Controls Row: Play/Pause, Progress Bar, Volume */}
      <div className="flex items-center justify-between relative gap-5">
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayPause}
          className="text-2xl p-2 bg-gray-700 hover:bg-gray-600 rounded-full"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        {/* Progress Bar */}
        <div className="w-full h-full flex flex-col items-center justify-end gap-2 pt-4">
          <input
            type="range"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-2 rounded appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #3b82f6 ${progress}%, #4b5563 ${progress}%)`,
            }}
          />
          <div className="w-full flex justify-between px-2 items-center">
            <span className="text-xs">{currentTime}</span>
            <span className="text-xs">{duration}</span>
          </div>
        </div>

        {/* Volume Button with Vertical Slider on Hover */}
        <div
          className="relative flex items-center"
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          <button
            onClick={toggleMute}
            className="text-2xl p-2 bg-gray-700 hover:bg-gray-600 rounded-full"
          >
            {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>

          {/* Vertical Volume Slider (appears on hover) */}
          <div
            className={`absolute bottom-[6rem] -right-6 flex items-center transition-opacity duration-300 ease-in-out ${
              showVolumeSlider ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <input
              type="range"
              value={volume}
              onChange={handleVolumeChange}
              max="100"
              min="0"
              className="w-24 h-2 bg-gray-600 rounded appearance-none cursor-pointer accent-blue-500 transform -rotate-90" // Flipped vertically
              style={{
                background: `linear-gradient(to right,#3b82f6 ${volume}%, #4b5563 ${volume}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Pad with zeros if needed
  const paddedMinutes = String(minutes).padStart(2, '0');
  const paddedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${paddedMinutes}:${paddedSeconds}`;
}

export default AudioPlayer;
