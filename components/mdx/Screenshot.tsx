import Image from 'next/image';

export function Screenshot({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-lg border border-border">
        <Image src={src} alt={alt} width={width} height={height} />
      </div>
      {caption && (
        <figcaption className="mt-2 text-sm text-text-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
