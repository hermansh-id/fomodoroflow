import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Trash2 } from "lucide-react";

interface Task {
  id: number;
  title: string;
  pomodoros: number;
  done: boolean;
}

interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

export function TaskList({ tasks, toggleTask, deleteTask }: TaskListProps) {
  return (
    <ScrollArea className="h-[200px]">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              className={`w-6 h-6 rounded-full mr-2 ${
                task.done ? "bg-green-500 text-white" : ""
              }`}
              onClick={() => toggleTask(task.id)}
            >
              {task.done && <Check className="h-4 w-4" />}
            </Button>
            <span className={task.done ? "line-through text-gray-500" : ""}>
              {task.title} ({task.pomodoros}{" "}
              {task.pomodoros === 1 ? "pomodoro" : "pomodoros"})
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </ScrollArea>
  );
}
