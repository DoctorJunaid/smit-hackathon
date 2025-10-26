import { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

export default function VideoPlayerModal({ isOpen, onClose, videoId, title = "Video Player" }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    
    const modalRef = useRef(null);
    const playerRef = useRef(null);
    const controlsTimeoutRef = useRef(null);

    // YouTube embed URL - optimized for better compatibility and autoplay
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&showinfo=0&enablejsapi=1&playsinline=1`;
    
    // Debug logging
    console.log('VideoPlayerModal - isOpen:', isOpen, 'videoId:', videoId, 'embedUrl:', embedUrl);

    useEffect(() => {
        if (isOpen) {
            // Animate modal opening
            requestAnimationFrame(() => {
                if (modalRef.current) {
                    modalRef.current.style.opacity = '1';
                    modalRef.current.style.transform = 'scale(1)';
                }
                if (playerRef.current) {
                    setTimeout(() => {
                        playerRef.current.style.opacity = '1';
                        playerRef.current.style.transform = 'translateY(0)';
                    }, 100);
                }
            });
            
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
        if (modalRef.current && playerRef.current) {
            modalRef.current.style.opacity = '0';
            modalRef.current.style.transform = 'scale(0.9)';
            playerRef.current.style.opacity = '0';
            setTimeout(onClose, 300);
        } else {
            onClose();
        }
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
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
        <div 
            style={{ 
                position: 'fixed', 
                top: '0', 
                left: '0', 
                right: '0',
                bottom: '0',
                width: '100vw', 
                height: '100vh',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}
        >
            {/* Backdrop */}
            <div 
                onClick={handleClose}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    backdropFilter: 'blur(4px)'
                }}
            />
            
            {/* Modal Container */}
            <div 
                ref={modalRef}
                style={{ 
                    opacity: 0,
                    transform: 'scale(0.9)',
                    transition: 'all 0.3s ease',
                    zIndex: 10,
                    position: 'relative',
                    width: '100%',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    style={{
                        position: 'absolute',
                        top: '-60px',
                        right: '0',
                        zIndex: 30,
                        padding: '12px',
                        color: 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#ef4444';
                        e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                    aria-label="Close video"
                >
                    <X size={28} />
                </button>

                {/* Video Player Container */}
                <div 
                    ref={playerRef}
                    style={{ 
                        opacity: 0,
                        transform: 'translateY(20px)',
                        transition: 'all 0.5s ease',
                        width: '100%',
                        position: 'relative',
                        backgroundColor: 'black',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Video Title */}
                    <div 
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            zIndex: 20,
                            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent)',
                            padding: '24px',
                            transition: 'opacity 0.3s',
                            opacity: showControls ? 1 : 0
                        }}
                    >
                        <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '500', paddingRight: '64px', margin: 0 }}>
                            {title}
                        </h3>
                    </div>

                    {/* YouTube Iframe */}
                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, width: '100%' }}>
                        {videoId ? (
                            <iframe
                                src={embedUrl}
                                style={{ 
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    border: 'none'
                                }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                title={title}
                                loading="lazy"
                                referrerPolicy="strict-origin-when-cross-origin"
                                onLoad={() => console.log('Video iframe loaded successfully')}
                                onError={() => console.error('Video iframe failed to load')}
                            />
                        ) : (
                            <div style={{ 
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%', 
                                height: '100%', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                backgroundColor: '#1f2937', 
                                color: 'white' 
                            }}>
                                <p>Video not available</p>
                            </div>
                        )}
                    </div>

                    {/* Custom Controls Overlay */}
                    <div 
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            zIndex: 20,
                            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)',
                            padding: '24px',
                            transition: 'opacity 0.3s',
                            opacity: showControls ? 1 : 0
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {/* Left Controls */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <button
                                    onClick={togglePlay}
                                    style={{ 
                                        padding: '8px', 
                                        color: 'white', 
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'color 0.2s',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#d1d5db'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                                    aria-label={isPlaying ? 'Pause' : 'Play'}
                                >
                                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                </button>
                                
                                <button
                                    onClick={toggleMute}
                                    style={{ 
                                        padding: '8px', 
                                        color: 'white', 
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'color 0.2s',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#d1d5db'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
                                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                                >
                                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                </button>
                            </div>

                            {/* Right Controls */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <button
                                    onClick={toggleFullscreen}
                                    style={{ 
                                        padding: '8px', 
                                        color: 'white', 
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'color 0.2s',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#d1d5db'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = 'white'}
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