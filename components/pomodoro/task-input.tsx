import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface TaskInputProps {
  newTaskTitle: string;
  newTaskPomodoros: number;
  setNewTaskTitle: (title: string) => void;
  setNewTaskPomodoros: (pomodoros: number) => void;
  addTask: () => void;
}

export function TaskInput({
  newTaskTitle,
  newTaskPomodoros,
  setNewTaskTitle,
  setNewTaskPomodoros,
  addTask,
}: TaskInputProps) {
  return (
    <div className="flex space-x-2 mb-2">
      <Input
        type="text"
        placeholder="New task"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Pomodoros"
        value={newTaskPomodoros}
        onChange={(e) => setNewTaskPomodoros(Number(e.target.value))}
        className="w-24"
        min={1}
      />
      <Button onClick={addTask}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
