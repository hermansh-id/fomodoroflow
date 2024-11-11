import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Pause, Play, RotateCcw } from "lucide-react";

interface TimerDisplayProps {
  time: number;
  isActive: boolean;
  progress: number;
  toggleTimer: () => void;
  resetTimer: () => void;
}

export function TimerDisplay({
  time,
  isActive,
  progress,
  toggleTimer,
  resetTimer,
}: TimerDisplayProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <div className="text-center mb-6">
        <div className="text-6xl font-bold mb-4">{formatTime(time)}</div>
        <Progress value={progress} className="w-full h-2" />
      </div>

      <div className="flex justify-center space-x-4 mb-8">
        <Button variant="outline" size="icon" onClick={resetTimer}>
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button size="lg" onClick={toggleTimer}>
          {isActive ? (
            <Pause className="mr-2 h-4 w-4" />
          ) : (
            <Play className="mr-2 h-4 w-4" />
          )}
          {isActive ? "Pause" : "Start"}
        </Button>
      </div>
    </>
  );
}
