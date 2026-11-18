import { Img } from './Img';
import { profile } from '../../data/profile';

interface Props { src?: string; className?: string; textClass?: string }

export function Avatar({ src = profile.photo, className = '', textClass = 'text-lg' }: Props) {
  return (
    <span className={`grad relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full font-bold text-white ${className}`}>
      <span className={textClass} aria-hidden>{profile.initials}</span>
      <Img src={src} alt={profile.name} eager className="absolute inset-0 h-full w-full object-cover" fallback={null} />
    </span>
  );
}
