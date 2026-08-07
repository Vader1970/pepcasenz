import {
  BriefcaseIcon,
  DiamondIcon,
  GridIcon,
  ShieldIcon,
} from "@/components/ui/icons";

export type FeatureIconName = "shield" | "grid" | "diamond" | "briefcase";

interface FeatureIconProps {
  name: FeatureIconName;
}

export function FeatureIcon({ name }: FeatureIconProps) {
  switch (name) {
    case "shield":
      return <ShieldIcon className="h-5 w-5" />;
    case "grid":
      return <GridIcon className="h-5 w-5" />;
    case "diamond":
      return <DiamondIcon className="h-5 w-5" />;
    case "briefcase":
      return <BriefcaseIcon className="h-5 w-5" />;
  }
}
