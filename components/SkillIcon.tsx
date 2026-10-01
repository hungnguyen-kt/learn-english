import {
  Blocks, Library, AudioLines, Headphones, Mic, BookOpen, PenLine, RotateCcw, Dumbbell,
  type LucideProps,
} from "lucide-react";
import type { SkillKey } from "@/lib/data";

const ICONS: Record<SkillKey, React.ComponentType<LucideProps>> = {
  grammar: Blocks,
  vocabulary: Library,
  pronunciation: AudioLines,
  listening: Headphones,
  speaking: Mic,
  reading: BookOpen,
  writing: PenLine,
  review: RotateCcw,
  practice: Dumbbell,
};

export default function SkillIcon({ skill, ...props }: { skill: SkillKey } & LucideProps) {
  const Icon = ICONS[skill];
  return <Icon aria-hidden {...props} />;
}
