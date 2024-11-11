"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TimerDisplay } from "./pomodoro/timer-display";
import { TaskList } from "./pomodoro/task-list";
import { TaskInput } from "./pomodoro/task-input";

const POMODORO = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

interface Task {
  id: number;
  title: string;
  pomodoros: number;
  done: boolean;
}

export function EnhancedPomodoroTimer() {
  const [time, setTime] = useState(POMODORO);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"pomodoro" | "shortBreak" | "longBreak">(
    "pomodoro"
  );
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPomodoros, setNewTaskPomodoros] = useState(1);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    switch (mode) {
      case "pomodoro":
        setTime(POMODORO);
        break;
      case "shortBreak":
        setTime(SHORT_BREAK);
        break;
      case "longBreak":
        setTime(LONG_BREAK);
        break;
    }
  };

  const changeMode = (newMode: "pomodoro" | "shortBreak" | "longBreak") => {
    setMode(newMode);
    setIsActive(false);
    switch (newMode) {
      case "pomodoro":
        setTime(POMODORO);
        break;
      case "shortBreak":
        setTime(SHORT_BREAK);
        break;
      case "longBreak":
        setTime(LONG_BREAK);
        break;
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTaskTitle,
          pomodoros: newTaskPomodoros,
          done: false,
        },
      ]);
      setNewTaskTitle("");
      setNewTaskPomodoros(1);
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const progress =
    (((mode === "pomodoro"
      ? POMODORO
      : mode === "shortBreak"
      ? SHORT_BREAK
      : LONG_BREAK) -
      time) /
      (mode === "pomodoro"
        ? POMODORO
        : mode === "shortBreak"
        ? SHORT_BREAK
        : LONG_BREAK)) *
    100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            PomoFlow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={mode} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="pomodoro"
                onClick={() => changeMode("pomodoro")}
              >
                Pomodoro
              </TabsTrigger>
              <TabsTrigger
                value="shortBreak"
                onClick={() => changeMode("shortBreak")}
              >
                Short Break
              </TabsTrigger>
              <TabsTrigger
                value="longBreak"
                onClick={() => changeMode("longBreak")}
              >
                Long Break
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <TimerDisplay
            time={time}
            isActive={isActive}
            progress={progress}
            toggleTimer={toggleTimer}
            resetTimer={resetTimer}
          />

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Tasks</h3>
            <TaskInput
              newTaskTitle={newTaskTitle}
              newTaskPomodoros={newTaskPomodoros}
              setNewTaskTitle={setNewTaskTitle}
              setNewTaskPomodoros={setNewTaskPomodoros}
              addTask={addTask}
            />
            <TaskList
              tasks={tasks}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
