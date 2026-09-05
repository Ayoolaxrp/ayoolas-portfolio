"use client";

import * as React from "react";
import { X, Maximize, Minimize, Download, ChevronLeft, ChevronRight, RotateCcw, RotateCw, ZoomIn, ZoomOut } from "lucide-react";

import { cn } from "@/lib/utils";
import { stopSmoothScroll, startSmoothScroll } from "@/lib/scroll";

interface ImageLightboxProps {
  /** Array of image sources to display */
  images: Array<{ src: string; alt: string; caption?: string }>;
  /** Index of initially opened image */
  defaultIndex?: number;
  /** Trigger element ref (for focus restoration) */
  triggerRef?: React.RefObject<HTMLElement>;
  /** Whether the lightbox is open (controlled) */
  isOpen?: boolean;
  /** Callback when closed */
  onClose?: () => void;
  /** Custom className */
  className?: string;
}

interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

/**
 * ImageLightbox: a premium full-screen image viewer with:
 * - Keyboard navigation (arrows, escape)
 * - Zoom/pan with mouse wheel and drag
 * - Rotation support
 * - Download capability
 * - Caption display
 * - Smooth transitions
 * - Focus management
 * - Accessibility compliant
 */
export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  defaultIndex = 0,
  triggerRef,
  isOpen: controlledOpen,
  onClose,
  className,
}) => {
  const [index, setIndex] = React.useState(defaultIndex);
  const [scale, setScale] = React.useState(1);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [rotation, setRotation] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const imageRef = React.useRef<HTMLImageElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);

  // Sync with controlled open prop
  React.useEffect(() => {
    if (controlledOpen !== undefined) {
      setIsOpen(controlledOpen);
      if (controlledOpen) {
        setIndex(defaultIndex);
      }
    }
  }, [controlledOpen, defaultIndex]);

  const currentImage = images[index];

  // Handle keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    previousFocusRef.current = previousFocus;
    stopSmoothScroll();
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => closeBtnRef.current?.focus(), 50);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrev();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        zoomIn();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        zoomOut();
      } else if (event.key === " ") {
        event.preventDefault();
        goToNext();
      } else if (event.key === "r" || event.key === "R") {
        event.preventDefault();
        rotate();
      } else if (event.key === "0") {
        event.preventDefault();
        resetTransform();
      }
      if (event.key === "Tab") {
        // Trap focus within lightbox
        const focusable = containerRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable && focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      clearTimeout(t);
      document.body.style.overflow = "";
      startSmoothScroll();
      previousFocusRef.current?.focus();
      if (onClose) onClose();
    };
  }, [isOpen]);

  // Reset transform when image changes
  React.useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
    setImageLoaded(false);
    setImageError(false);
  }, [index]);

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const goToNext = () => {
    setIndex(prev => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const zoomIn = () => setScale(prev => Math.min(prev * 1.2, 5));
  const zoomOut = () => setScale(prev => Math.max(prev / 1.2, 0.2));
  const rotate = () => setRotation(prev => (prev + 90) % 360);
  const resetTransform = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  };

  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    if (event.ctrlKey || event.metaKey) {
      // Zoom with Ctrl/Cmd + wheel
      if (event.deltaY < 0) zoomIn();
      else zoomOut();
    } else if (event.shiftKey) {
      // Horizontal pan with Shift + wheel
      setPosition(prev => ({ ...prev, x: prev.x - event.deltaY * 0.5 }));
    } else {
      // Vertical pan
      setPosition(prev => ({ ...prev, y: prev.y - event.deltaY * 0.5 }));
    }
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return; // Only left click
    if (scale <= 1) return; // Only drag when zoomed
    setIsDragging(true);
    setDragStart({ x: event.clientX - position.x, y: event.clientY - position.y });
    event.currentTarget.style.cursor = "grabbing";
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: event.clientX - dragStart.x,
      y: event.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      if (containerRef.current) {
        containerRef.current.style.cursor = "grab";
      }
    }
  };

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = currentImage.src;
    link.download = currentImage.alt.replace(/\s+/g, "-").toLowerCase() + ".jpg";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen && !controlledOpen) return null;

  const transform = `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`;

  return (
    <div
      className={cn("fixed inset-0 z-[90] flex items-center justify-center", className)}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${images.length}: ${currentImage.alt}`}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close lightbox"
        onClick={handleClose}
        className="absolute inset-0 bg-overlay backdrop-blur-sm animate-[fadeIn_var(--motion-normal)_var(--ease-standard)]"
      />

      {/* Lightbox container */}
      <div
        ref={containerRef}
        className="relative w-full h-full max-w-[90vw] max-h-[90vh] animate-[fadeIn_var(--motion-normal)_var(--ease-emphasized)]"
        onWheel={handleWheel}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Image wrapper with transform */}
        <div
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            transform,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.1s ease-out",
          }}
        >
          {/* Loading state */}
          {!imageLoaded && !imageError && (
            <div className="flex items-center justify-center text-text-tertiary">
              <div className="size-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>
          )}

          {/* Error state */}
          {imageError && (
            <div className="flex flex-col items-center justify-center gap-4 p-8 text-center text-text-secondary">
              <X className="size-12 text-text-tertiary" />
              <p>Failed to load image</p>
              <button
                onClick={() => setImageError(false)}
                className="text-accent hover:underline"
              >
                Retry
              </button>
            </div>
          )}

          {/* Image */}
          <img
            ref={imageRef}
            src={currentImage.src}
            alt={currentImage.alt}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={cn(
              "max-w-full max-h-[80vh] object-contain",
              "transition-opacity duration-300 ease-out",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            style={{
              userSelect: "none",
              cursor: scale > 1 ? "grab" : "zoom-in",
            }}
            onMouseDown={handleMouseDown}
          />
        </div>

        {/* Caption */}
        {currentImage.caption && (
          <div className="absolute bottom-[-60px] left-0 right-0 text-center">
            <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-raised/90 backdrop-blur border border-border-subtle text-body-sm text-text-secondary">
              {currentImage.caption}
            </p>
          </div>
        )}

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 left-4 font-mono text-caption text-text-tertiary">
            {index + 1} / {images.length}
          </div>
        )}

        {/* Close button */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={handleClose}
          aria-label="Close lightbox"
          className="absolute top-4 right-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-surface-raised/90 backdrop-blur border border-border-subtle text-text-secondary transition-[background-color,border-color,color,transform] duration-fast ease-standard hover:bg-accent-soft hover:border-accent-border hover:text-accent hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          <X className="size-5" />
        </button>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 inline-flex size-12 items-center justify-center rounded-full bg-surface-raised/90 backdrop-blur border border-border-subtle text-text-secondary transition-[background-color,border-color,color,transform] duration-fast ease-standard hover:bg-accent-soft hover:border-accent-border hover:text-accent hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 inline-flex size-12 items-center justify-center rounded-full bg-surface-raised/90 backdrop-blur border border-border-subtle text-text-secondary transition-[background-color,border-color,color,transform] duration-fast ease-standard hover:bg-accent-soft hover:border-accent-border hover:text-accent hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}

        {/* Toolbar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 rounded-full bg-surface-raised/90 backdrop-blur border border-border-subtle">
          <button
            type="button"
            onClick={zoomOut}
            aria-label="Zoom out"
            className="inline-flex size-9 items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
          >
            <ZoomOut className="size-4" />
          </button>
          <button
            type="button"
            onClick={resetTransform}
            aria-label="Reset view"
            className="inline-flex size-9 items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
          >
            <Minimize className="size-4" />
          </button>
          <button
            type="button"
            onClick={zoomIn}
            aria-label="Zoom in"
            className="inline-flex size-9 items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
          >
            <ZoomIn className="size-4" />
          </button>
          <button
            type="button"
            onClick={rotate}
            aria-label="Rotate"
            className="inline-flex size-9 items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
          >
            <RotateCw className="size-4" />
          </button>
          <button
            type="button"
            onClick={downloadImage}
            aria-label="Download image"
            className="inline-flex size-9 items-center justify-center rounded-full text-text-secondary hover:text-text-primary hover:bg-canvas transition-colors"
          >
            <Download className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * LightboxTrigger: wraps an image to open the lightbox on click
 */
export interface LightboxTriggerProps {
  /** Image source */
  src: string;
  /** Image alt text */
  alt: string;
  /** Optional caption */
  caption?: string;
  /** All images in the gallery (for navigation) */
  gallery?: Array<{ src: string; alt: string; caption?: string }>;
  /** Index of this image in the gallery */
  galleryIndex?: number;
  /** Custom className for the image */
  className?: string;
  /** Children render prop (receives open function) */
  children?: (open: () => void) => React.ReactNode;
}

export const LightboxTrigger: React.FC<LightboxTriggerProps> = ({
  src,
  alt,
  caption,
  gallery = [],
  galleryIndex = 0,
  className,
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  const allImages = gallery.length > 0 ? gallery : [{ src, alt, caption }];
  const startIndex = gallery.length > 0 ? galleryIndex : 0;

  const open = () => {
    setIsOpen(true);
  };

  if (children) {
    return children(open);
  }

  return (
    <div
      ref={triggerRef}
      onClick={open}
      className={cn("cursor-zoom-in", className)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
    >
      <img src={src} alt={alt} className={cn("transition-transform duration-300 hover:scale-[1.02]", className)} />
    </div>
  );
};

LightboxTrigger.displayName = "LightboxTrigger";

/**
 * LightboxProvider: context provider for global lightbox state
 */
interface LightboxContextValue {
  openLightbox: (images: LightboxImage[], index?: number) => void;
}

const LightboxContext = React.createContext<LightboxContextValue | null>(null);

export const LightboxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lightboxImages, setLightboxImages] = React.useState<LightboxImage[]>([]);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);

  const openLightbox = React.useCallback((images: LightboxImage[], index = 0) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  return (
    <LightboxContext.Provider value={{ openLightbox }}>
      {children}
      <ImageLightbox
        images={lightboxImages}
        defaultIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </LightboxContext.Provider>
  );
};

export const useLightbox = () => {
  const context = React.useContext(LightboxContext);
  if (!context) {
    throw new Error("useLightbox must be used within a LightboxProvider");
  }
  return context;
};

ImageLightbox.displayName = "ImageLightbox";