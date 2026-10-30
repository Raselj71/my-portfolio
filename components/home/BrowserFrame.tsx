import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  /** Optional phone screenshot shown overlapping the bottom-right corner. */
  overlay?: { src: string; alt: string };
};

export function BrowserFrame({ src, alt, overlay }: Props) {
  return (
    <div className="relative min-h-[230px] w-full overflow-hidden bg-surface2">
      <div className="absolute inset-[26px_0_0_26px] overflow-hidden rounded-tl-[10px] border-l border-t border-line bg-surface shadow-[0_10px_40px_rgba(0,0,0,.18)]">
        <div className="flex h-[22px] items-center gap-[5px] bg-surface2 px-2.5">
          <i className="size-[7px] rounded-full bg-line" />
          <i className="size-[7px] rounded-full bg-line" />
          <i className="size-[7px] rounded-full bg-line" />
        </div>
        <Image
          src={src}
          alt={alt}
          width={1157}
          height={458}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="block h-[calc(100%-22px)] w-full object-cover object-left-top"
        />
      </div>
      {overlay && (
        <Image
          src={overlay.src}
          alt={overlay.alt}
          width={320}
          height={552}
          sizes="96px"
          className="absolute -bottom-3 right-4 w-[72px] rounded-[14px] border-[3px] border-[#0E1412] shadow-[0_10px_30px_rgba(0,0,0,.35)] sm:w-24"
        />
      )}
    </div>
  );
}
