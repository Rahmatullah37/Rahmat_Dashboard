import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Avatar } from '../common/Avatar';
import { Img } from '../common/Img';
import { Item, Stagger } from '../common/Motion';
import { profile } from '../../data/profile';
import { education } from '../../data/education';

export function About() {
  return (
    <Stagger className="grid gap-6 lg:grid-cols-3">
      <Item>
        <Card className="overflow-hidden !p-0 lg:sticky lg:top-24">
          <div className="grad relative aspect-[4/5] overflow-hidden">
            <Img src={profile.aboutPhoto} alt={profile.name} className="absolute inset-0 h-full w-full object-cover"
              fallback={<Avatar className="h-full w-full !rounded-none" textClass="text-7xl" />} />
          </div>
          <div className="p-5">
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <p className="mt-1 text-sm text-muted">{profile.title}</p>
          </div>
        </Card>
      </Item>
      <div className="space-y-6 lg:col-span-2">
        <Item>
          <Card className="space-y-4">
            <h2 className="text-lg font-semibold">Introduction</h2>
            {profile.bio.map((p) => <p key={p} className="max-w-prose leading-relaxed text-muted">{p}</p>)}
          </Card>
        </Item>
        <div className="grid gap-6 md:grid-cols-2">
          <Item>
            <Card className="h-full">
              <h2 className="mb-3 text-lg font-semibold">Academic background</h2>
              <ul className="space-y-3 text-sm text-muted">
                {education.map((e) => <li key={e.degree}><span className="block font-medium text-ink">{e.degree}</span>{e.institution}</li>)}
              </ul>
            </Card>
          </Item>
          <Item>
            <Card className="h-full">
              <h2 className="mb-3 text-lg font-semibold">Interests</h2>
              <div className="flex flex-wrap gap-2">{profile.interests.map((i) => <Badge key={i}>{i}</Badge>)}</div>
            </Card>
          </Item>
        </div>
      </div>
    </Stagger>
  );
}
