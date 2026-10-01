import { skillByKey, type SkillKey } from "@/lib/data";
import SkillIcon from "./SkillIcon";

export default function SkillChip({ skill }: { skill: SkillKey }) {
  const s = skillByKey(skill);
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ backgroundColor: `${s.color}18`, color: s.color }}
    >
      <SkillIcon skill={skill} size={13} strokeWidth={2.2} />
      {s.label}
    </span>
  );
}
