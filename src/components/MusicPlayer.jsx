import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, ListMusic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import track1 from '../assets/track-1.mp3';
import track2 from '../assets/track-2.mp3';
import track3 from '../assets/track-3.mp3';
import track4 from '../assets/track-4.mp3';
import albumArt from '../assets/album-art.png';

const PLAYLIST = [
    {
        id: 1,
        title: "Teri Aankhon Mein",
        artist: "Meloby",
        src: track1,
        cover: albumArt
    },
    {
        id: 2,
        title: "Meri Dhadkan Tu",
        artist: "Melody",
        src: track2,
        cover: albumArt
    },
    {
        id: 3,
        title: "Ehsaas Instrumental",
        artist: "Ehsaas Band",
        src: track3,
        cover: albumArt
    },
    {
        id: 4,
        title: "Khoon Khaulda",
        artist: "EHSAAS Band",
        src: track4,
        cover: albumArt
    }
];

const VisualizerBar = ({ delay, isPlaying }) => (
    <motion.div
        animate={isPlaying ? {
            height: [10, 30, 10, 40, 15],
        } : { height: 10 }}
        transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay,
            repeatType: "reverse"
        }}
        className="w-1 bg-ehsaas-gold rounded-full mx-[1px]"
    />
);

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);
    const [showPlaylist, setShowPlaylist] = useState(false);

    const audioRef = useRef(null);

    // Initialize audio on mount
    useEffect(() => {
        audioRef.current = new Audio(PLAYLIST[0].src);
        audioRef.current.volume = 0.7;
    }, []);

    const currentTrack = PLAYLIST[currentTrackIndex];

    // Handle track changes
    useEffect(() => {
        if (!audioRef.current) return;

        // Check if track actually changed
        if (audioRef.current.src !== currentTrack.src && !audioRef.current.src.endsWith(currentTrack.src)) {
            const wasPlaying = isPlaying;
            audioRef.current.src = currentTrack.src;
            audioRef.current.load();
            if (wasPlaying || isPlaying) {
                audioRef.current.play().catch(e => console.error("Playback error:", e));
            }
        }
    }, [currentTrackIndex]);

    // Setup event listeners
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            setProgress(audio.currentTime);
            setDuration(audio.duration || 0);
        };

        const onEnded = () => {
            handleNext();
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('ended', onEnded);
        audio.addEventListener('loadedmetadata', updateProgress);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('ended', onEnded);
            audio.removeEventListener('loadedmetadata', updateProgress);
        };
    }, []);

    // Handle volume changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Handle play/pause
    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.play().catch(e => {
                console.error("Playback error:", e);
                setIsPlaying(false);
            });
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
        setIsPlaying(true);
    };

    const handlePrev = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
        setIsPlaying(true);
    };

    const handleSeek = (e) => {
        if (!audioRef.current) return;
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const newTime = percentage * duration;

        audioRef.current.currentTime = newTime;
        setProgress(newTime);
    };

    const handleVolumeSeek = (e) => {
        const volumeBar = e.currentTarget;
        const rect = volumeBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        setVolume(percentage);
        e.stopPropagation(); // Prevent toggling playlist if nested
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-ehsaas-dark/95 backdrop-blur-md text-ehsaas-cream rounded-xl p-6 shadow-2xl max-w-2xl mx-auto border border-ehsaas-gold/20 relative overflow-hidden group hover:border-ehsaas-gold/50 transition-colors duration-500">

            {/* Dynamic Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-ehsaas-gold/10 rounded-full blur-3xl group-hover:bg-ehsaas-gold/20 transition-all duration-700"></div>

            <div className="flex items-center gap-6 relative z-10">
                <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0 shadow-lg border border-ehsaas-gold/30">
                    <img
                        src={currentTrack.cover}
                        alt="Album Art"
                        className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-110' : 'scale-100'}`}
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        {isPlaying ? (
                            <div className="flex items-center justify-center h-12 items-end gap-0.5">
                                {[...Array(5)].map((_, i) => <VisualizerBar key={i} delay={i * 0.1} isPlaying={isPlaying} />)}
                            </div>
                        ) : (
                            <div className="w-8 h-8 rounded-full border-2 border-ehsaas-cream/50 flex items-center justify-center">
                                <Play className="w-4 h-4 text-ehsaas-cream fill-current ml-0.5" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                        <div className="overflow-hidden">
                            <motion.h3
                                key={currentTrack.title}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xl font-bold tracking-wide truncate pr-2"
                            >
                                {currentTrack.title}
                            </motion.h3>
                            <p className="text-ehsaas-gold text-sm uppercase tracking-widest truncate">{currentTrack.artist}</p>
                        </div>
                        {isPlaying && (
                            <div className="flex items-center gap-0.5 h-4 flex-shrink-0">
                                {[...Array(8)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: [4, 16, 4] }}
                                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05, repeatType: "reverse" }}
                                        className="w-0.5 bg-ehsaas-green rounded-full"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div
                        className="w-full bg-white/10 h-1.5 rounded-full mb-1 overflow-hidden cursor-pointer group/progress"
                        onClick={handleSeek}
                    >
                        <motion.div
                            className="h-full bg-ehsaas-gold rounded-full relative"
                            style={{ width: `${(progress / duration) * 100 || 0}%` }}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-ehsaas-cream rounded-full opacity-0 group-hover/progress:opacity-100 shadow-md"></div>
                        </motion.div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 font-mono mb-3">
                        <span>{formatTime(progress)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handlePrev}
                                className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform"
                            >
                                <SkipBack className="w-5 h-5" />
                            </button>
                            <button
                                onClick={togglePlay}
                                className="w-12 h-12 bg-ehsaas-gold rounded-full flex items-center justify-center text-ehsaas-dark hover:scale-110 hover:shadow-[0_0_15px_rgba(197,160,89,0.5)] transition-all duration-300"
                            >
                                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 pl-1" />}
                            </button>
                            <button
                                onClick={handleNext}
                                className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform"
                            >
                                <SkipForward className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <div
                                className="flex items-center gap-2 text-gray-400 group/volume cursor-pointer"
                            >
                                <Volume2 className="w-4 h-4 group-hover/volume:text-ehsaas-gold transition-colors" />
                                <div
                                    className="w-20 bg-white/10 h-1 rounded-full overflow-hidden"
                                    onClick={handleVolumeSeek}
                                >
                                    <div
                                        className="h-full bg-ehsaas-gold rounded-full group-hover/volume:bg-white transition-colors"
                                        style={{ width: `${volume * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowPlaylist(!showPlaylist)}
                                className={`transition-colors hover:scale-110 transform ${showPlaylist ? 'text-ehsaas-gold' : 'text-gray-400 hover:text-white'}`}
                                title="Toggle Playlist"
                            >
                                <ListMusic className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Playlist Overlay */}
            <AnimatePresence>
                {showPlaylist && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-4 border-t border-white/10 pt-4"
                    >
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                            {PLAYLIST.map((track, index) => (
                                <div
                                    key={track.id}
                                    onClick={() => {
                                        setCurrentTrackIndex(index);
                                        setIsPlaying(true);
                                    }}
                                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${index === currentTrackIndex
                                        ? 'bg-ehsaas-gold/20 border border-ehsaas-gold/30'
                                        : 'hover:bg-white/5 border border-transparent'
                                        }`}
                                >
                                    <div className="w-10 h-10 rounded overflow-hidden relative flex-shrink-0">
                                        <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                                        {index === currentTrackIndex && isPlaying && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                <div className="flex items-end gap-0.5 h-3">
                                                    {[...Array(3)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            animate={{ height: [3, 12, 3] }}
                                                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1, repeatType: "reverse" }}
                                                            className="w-0.5 bg-ehsaas-gold rounded-full"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-bold truncate ${index === currentTrackIndex ? 'text-ehsaas-gold' : 'text-ehsaas-cream'}`}>
                                            {track.title}
                                        </p>
                                        <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MusicPlayer;
