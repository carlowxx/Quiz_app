import {
  Award,
  BookOpen,
  Check,
  ChevronLeft,
  CircleCheckBig,
  Disc3,
  Flame,
  Gift,
  HeartPulse,
  LifeBuoy,
  Lightbulb,
  ListChecks,
  Lock,
  Map as MapIcon,
  Sparkles,
  Star,
  Target,
  Timer,
  Trophy,
  UserRound,
  Wind,
  X,
  Zap,
  type LucideProps,
} from "lucide-react-native";

const MAPA = {
  Award,
  BookOpen,
  Check,
  ChevronLeft,
  CircleCheckBig,
  Disc3,
  Flame,
  Gift,
  HeartPulse,
  LifeBuoy,
  Lightbulb,
  ListChecks,
  Lock,
  Map: MapIcon,
  Sparkles,
  Star,
  Target,
  Timer,
  Trophy,
  UserRound,
  Wind,
  X,
  Zap,
} as const;

export type NomeIcone = keyof typeof MAPA;

/** ícone Lucide (react-native-svg por baixo). `color` default herda do texto ao redor não existe em RN — sempre passe explicitamente quando não for o padrão. */
export function Icon({ name, size = 18, color = "#0A2540" }: { name: string; size?: number; color?: string }) {
  const C = MAPA[name as NomeIcone];
  if (!C) return null;
  return <C size={size} color={color} />;
}

export type { LucideProps };
