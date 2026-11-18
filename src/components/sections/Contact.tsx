import { Mail, MapPin, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card } from '../common/Card';
import { Avatar } from '../common/Avatar';
import { EmptyNote } from '../common/EmptyNote';
import { Item, Stagger } from '../common/Motion';
import { profile } from '../../data/profile';
import { getIcon } from '../../utils/icons';

interface Row { icon: LucideIcon; label: string; text: string; href: string }

export function Contact() {
  const rows: Row[] = [];
  if (profile.email) rows.push({ icon: Mail, label: 'Email', text: profile.email, href: `mailto:${profile.email}` });
  if (profile.phone) rows.push({ icon: Phone, label: 'Phone', text: profile.phone, href: `tel:${profile.phone}` });
  if (profile.location) rows.push({ icon: MapPin, label: 'Location', text: profile.location, href: '' });
  profile.socials.forEach((s) => rows.push({ icon: getIcon(s.icon), label: s.label, text: s.url, href: s.url }));
  return (
    <div className="space-y-6">
      <Card className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
        <Avatar className="h-24 w-24 ring-4 ring-brand/30" textClass="text-3xl" />
        <div>
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="mt-1 text-sm text-muted">{profile.title}</p>
        </div>
      </Card>
      {rows.length === 0 ? (
        <EmptyNote text="Add your email, phone, location and social links in src/data/profile.ts and they will appear here." />
      ) : (
        <Stagger className="grid gap-4 md:grid-cols-2">
          {rows.map((r) => (
            <Item key={r.label}>
              <Card hover className="flex h-full items-center gap-4 !p-5">
                <span className="grad grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white"><r.icon size={20} aria-hidden /></span>
                <div className="min-w-0">
                  <p className="text-sm text-muted">{r.label}</p>
                  {r.href ? <a href={r.href} className="block truncate font-medium hover:text-accent" {...(r.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>{r.text}</a> : <p className="font-medium">{r.text}</p>}
                </div>
              </Card>
            </Item>
          ))}
        </Stagger>
      )}
    </div>
  );
}
