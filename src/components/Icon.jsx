import {
  Smartphone, Headphones, Tv, ShieldCheck, BadgeCheck, Tag, UserCheck, Store, MapPin, Settings,
} from "lucide-react";

const map = { Smartphone, Headphones, Tv, ShieldCheck, BadgeCheck, Tag, UserCheck, Store, MapPin, Settings };

export default function Icon({ name, ...props }) {
  const C = map[name] || Settings;
  return <C aria-hidden="true" {...props} />;
}
