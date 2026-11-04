import { ImagePlus } from "lucide-react";

/**
 * Renders an image from media.js, or a blank labelled slot when the
 * value is still null. `slot` is the media.js key shown on the placeholder.
 */
export default function ImageSlot({
  src,
  alt = "",
  slot,
  size,
  className = "",
  imgClassName = "",
  eager = false,
  hideLabel = false,
  labelPosition = "center",
}) {
  if (src) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      </div>
    );
  }

  const pos = {
    "bottom-right": "items-end justify-end p-5 md:p-8",
    right: "items-center justify-center md:justify-end md:pr-[20%]",
    center: "items-center justify-center p-4",
  }[labelPosition];

  return (
    <div
      className={`img-slot relative overflow-hidden ${className}`}
      role="img"
      aria-label={alt ? `${alt} (image coming soon)` : "Image coming soon"}
    >
      {!hideLabel && (
        <div className={`absolute inset-0 flex ${pos}`}>
          <div className="flex flex-col items-center gap-1.5 text-center text-[#C7708C]">
            <ImagePlus className="h-6 w-6" strokeWidth={1.25} aria-hidden="true" />
            {slot && (
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em]">
                {slot}
              </span>
            )}
            {size && <span className="font-sans text-[10px] tracking-wider opacity-80">{size}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
