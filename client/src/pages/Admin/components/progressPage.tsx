import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  value: number;
}

export function ProgressIndicator({ value }: ProgressIndicatorProps) {
  return <Progress value={value} className="w-[60%]" />;
}
