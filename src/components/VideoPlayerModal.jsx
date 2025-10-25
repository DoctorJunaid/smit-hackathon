import { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { gsap } from 'gsap';
import { videoPlayerAnimations } from '@/utils/animations';

export default function VideoPlayerModal({ isOpen, onClose, videoId, title = "Video Player" }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    
    const modalRef = useRef(null);
    const playerRef = useRef(null);
    const controlsRef = useRef(null);
    const controlsTimeoutRef = useRef(null);

    // YouTube embed URL - simplified for better compatibility
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0&showinfo=0`;
    
    // Debug logging
    console.log('VideoPlayerModal - isOpen:', isOpen, 'videoId:', videoId, 'embedUrl:', embedUrl);

    useEffect(() => {
        if (isOpen) {
            // Simple animations without complex GSAP
            if (modalRef.current) {
                modalRef.current.style.opacity = '1';
                modalRef.current.style.transform = 'scale(1)';
            }
            if (playerRef.current) {
                setTimeout(() => {
                    playerRef.current.style.opacity = '1';
                    playerRef.current.style.transform = 'translateY(0)';
                }, 200);
            }
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            setIsPlaying(true);
        } else {
            // Restore body scroll
            document.body.style.overflow = 'unset';
            setIsPlaying(false);
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleClose = () => {
        if (modalRef.current) {
            modalRef.current.style.opacity = '0';
            modalRef.current.style.transform = 'scale(0.8)';
            setTimeout(onClose, 300);
        } else {
            onClose();
        }
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
        // Add button animation
        const playButton = document.querySelector('[aria-label="Pause"], [aria-label="Play"]');
        if (playButton) {
            videoPlayerAnimations.playButtonPulse(playButton);
        }
        // In a real implementation, you'd control the YouTube player here
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        // In a real implementation, you'd control the YouTube player here
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            playerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleMouseMove = () => {
        setShowControls(true);
        clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => {
            setShowControls(false);
        }, 3000);
    };

    const handleMouseLeave = () => {
        clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => {
            setShowControls(false);
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                onClick={handleClose}
            />
            
            {/* Modal */}
            <div 
                ref={modalRef}
                className="relative w-full max-w-6xl mx-4 opacity-0 transform scale-90 transition-all duration-300"
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute -top-12 right-0 z-10 p-3 text-white hover:text-gray-300 transition-all duration-200 hover:scale-110 bg-black/20 rounded-full backdrop-blur-sm"
                    aria-label="Close video"
                >
                    <X size={20} />
                </button>

                {/* Video Player Container */}
                <div 
                    ref={playerRef}
                    className="relative bg-black rounded-lg overflow-hidden shadow-2xl opacity-0 transform translate-y-8 transition-all duration-500"
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Video Title */}
                    <div className={`absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/70 to-transparent p-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                        <h3 className="text-white text-xl font-medium">{title}</h3>
                    </div>

                    {/* YouTube Iframe */}
                    <div className="relative aspect-video">
                        <iframe
                            src={embedUrl}
                            className="w-full h-full"
                            style={{ border: 'none' }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            title={title}
                        />
                    </div>

                    {/* Custom Controls Overlay */}
                    <div 
                        ref={controlsRef}
                        className={`absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/70 to-transparent p-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="flex items-center justify-between">
                            {/* Left Controls */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={togglePlay}
                                    className="p-2 text-white hover:text-gray-300 transition-colors"
                                    aria-label={isPlaying ? 'Pause' : 'Play'}
                                >
                                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                </button>
                                
                                <button
                                    onClick={toggleMute}
                                    className="p-2 text-white hover:text-gray-300 transition-colors"
                                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                                >
                                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                </button>
                            </div>

                            {/* Right Controls */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={toggleFullscreen}
                                    className="p-2 text-white hover:text-gray-300 transition-colors"
                                    aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                                >
                                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}