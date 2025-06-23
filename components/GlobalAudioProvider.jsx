'use client';
import { createContext, useContext, useRef, useState, useEffect } from "react";

const AudioContext = createContext();

export function GlobalAudioProvider({ children }) {

  const [isMuted, setIsMuted] = useState(false);
  const [audioSrc, setAudioSrc] = useState("/audio/ambient.mp3");
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(() => {});
    }
  }, [audioSrc]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const changeMusic = (src) => setAudioSrc(src);
  const toggleMute = () => setIsMuted((m) => !m);

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, changeMusic, audioSrc }}>
      <button
        onClick={toggleMute}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 10000,
          background: "rgba(255,255,255,0.2)",
          border: "none",
          borderRadius: "50%",
          width: 50,
          height: 50,
          color: "white",
          fontSize: "1.2rem",
          cursor: "pointer",
          transition: "background 0.3s"
        }}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
      <audio ref={audioRef} src={audioSrc} loop autoPlay style={{ display: "none" }} />
      {children}
    </AudioContext.Provider>
  );
}

export function useGlobalAudio() {
  return useContext(AudioContext);
}
