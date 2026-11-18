import { useEffect, useState, type ReactNode } from 'react';

const EXTS = ['.jpg', '.jpeg', '.png', '.webp'];
const hasExt = (s: string) => /\.[a-z0-9]{3,4}$/i.test(s);

interface Props { src?: string; alt: string; className?: string; fallback: ReactNode; eager?: boolean }

/**
 * Shows a picture if the file exists, otherwise the fallback.
 * `src` may omit the extension ('/images/profile/photo'); .jpg, .jpeg, .png and .webp are tried in turn.
 */
export function Img({ src, alt, className, fallback, eager }: Props) {
  const [i, setI] = useState(0);
  useEffect(() => setI(0), [src]);
  if (!src) return <>{fallback}</>;
  const list = hasExt(src) ? [src] : EXTS.map((e) => src + e);
  if (i >= list.length) return <>{fallback}</>;
  return <img key={list[i]} src={list[i]} alt={alt} loading={eager ? 'eager' : 'lazy'} onError={() => setI(i + 1)} className={className} />;
}
