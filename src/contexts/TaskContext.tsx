
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Task {
  id: string;
  type: 'groceries' | 'packages' | 'cleaning' | 'shopping' | 'custom';
  status: 'pending' | 'assigned' | 'en-route' | 'in-progress' | 'completed' | 'checkout';
  title: string;
  description: string;
  userLocation: string;
  taskLocation: string;
  amount: number;
  createdAt: string;
  assignedErrander?: {
    id: string;
    name: string;
    phone: string;
    rating: number;
  };
  estimatedTime?: string;
}

interface TaskContextType {
  tasks: Task[];
  activeTask: Task | null;
  createTask: (taskData: Omit<Task, 'id' | 'status' | 'createdAt'>) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  getTaskById: (taskId: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const createTask = (taskData: Omit<Task, 'id' | 'status' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    setTasks(prev => [newTask, ...prev]);
    
    // Simulate task assignment after 3 seconds
    setTimeout(() => {
      updateTaskStatus(newTask.id, 'assigned');
      // Add mock errander
      setTasks(prev => prev.map(task => 
        task.id === newTask.id 
          ? {
              ...task,
              assignedErrander: {
                id: 'errander-1',
                name: 'James Mwangi',
                phone: '+254 712 345 678',
                rating: 4.8
              },
              estimatedTime: '25-35 mins'
            }
          : task
      ));
    }, 3000);

    // Simulate progress updates
    setTimeout(() => updateTaskStatus(newTask.id, 'en-route'), 8000);
    setTimeout(() => updateTaskStatus(newTask.id, 'in-progress'), 15000);
    setTimeout(() => updateTaskStatus(newTask.id, 'completed'), 25000);
    setTimeout(() => updateTaskStatus(newTask.id, 'checkout'), 26000);
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };

  const getTaskById = (taskId: string) => {
    return tasks.find(task => task.id === taskId);
  };

  const activeTask = tasks.find(task => 
    ['pending', 'assigned', 'en-route', 'in-progress', 'completed', 'checkout'].includes(task.status)
  ) || null;

  return (
    <TaskContext.Provider value={{
      tasks,
      activeTask,
      createTask,
      updateTaskStatus,
      getTaskById
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
