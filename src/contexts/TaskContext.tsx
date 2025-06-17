import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

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
  availableTasks: Task[];
  activeTask: Task | null;
  erranderActiveTask: Task | null;
  createTask: (taskData: Omit<Task, 'id' | 'status' | 'createdAt'>) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  acceptTask: (taskId: string) => void;
  getTaskById: (taskId: string) => Task | undefined;
  newTaskNotification: Task | null;
  clearNewTaskNotification: () => void;
  completeErranderTask: (taskId: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Mock available tasks for erranders to see
const MOCK_AVAILABLE_TASKS: Task[] = [
  {
    id: 'available-1',
    type: 'groceries',
    status: 'pending',
    title: 'Grocery Shopping at Sarit Center',
    description: 'Pick up groceries including milk, bread, eggs, and vegetables',
    userLocation: 'Westlands, Nairobi',
    taskLocation: 'Sarit Center, Westlands',
    amount: 650,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'available-2',
    type: 'packages',
    status: 'pending',
    title: 'Document Delivery',
    description: 'Collect documents from office and deliver to client',
    userLocation: 'CBD, Nairobi',
    taskLocation: 'Upperhill, Nairobi',
    amount: 400,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'available-3',
    type: 'shopping',
    status: 'pending',
    title: 'Electronics Purchase',
    description: 'Buy phone charger and headphones from electronics shop',
    userLocation: 'Karen, Nairobi',
    taskLocation: 'Junction Mall, Ngong Road',
    amount: 300,
    createdAt: new Date().toISOString(),
  }
];

// Default erranders pool for assignment
const DEFAULT_ERRANDERS = [
  {
    id: 'errander-1',
    name: 'James Mwangi',
    phone: '+254 712 345 678',
    rating: 4.8
  },
  {
    id: 'errander-2',
    name: 'Sarah Wanjiku',
    phone: '+254 723 456 789',
    rating: 4.9
  },
  {
    id: 'errander-3',
    name: 'Peter Kimani',
    phone: '+254 734 567 890',
    rating: 4.7
  },
  {
    id: 'errander-4',
    name: 'Grace Achieng',
    phone: '+254 745 678 901',
    rating: 4.6
  },
  {
    id: 'errander-5',
    name: 'David Mutua',
    phone: '+254 756 789 012',
    rating: 4.8
  },
  {
    id: 'errander-6',
    name: 'Mary Njeri',
    phone: '+254 767 890 123',
    rating: 4.9
  }
];

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [availableTasks, setAvailableTasks] = useState<Task[]>(MOCK_AVAILABLE_TASKS);
  const [erranderActiveTask, setErranderActiveTask] = useState<Task | null>(null);
  const [newTaskNotification, setNewTaskNotification] = useState<Task | null>(null);

  // Simulate live updates for available tasks
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add a new task every 30 seconds
      if (Math.random() > 0.7) {
        const newTask: Task = {
          id: `available-${Date.now()}`,
          type: ['groceries', 'packages', 'cleaning', 'shopping'][Math.floor(Math.random() * 4)] as Task['type'],
          status: 'pending',
          title: `New Task - ${['Grocery Run', 'Package Delivery', 'Quick Cleaning', 'Shopping Errand'][Math.floor(Math.random() * 4)]}`,
          description: 'A new task has been posted and is available for acceptance',
          userLocation: ['Westlands', 'CBD', 'Karen', 'Kilimani'][Math.floor(Math.random() * 4)] + ', Nairobi',
          taskLocation: ['Mall', 'Office', 'Residence', 'Shop'][Math.floor(Math.random() * 4)] + ' Location',
          amount: Math.floor(Math.random() * 500) + 200,
          createdAt: new Date().toISOString(),
        };
        
        setAvailableTasks(prev => [newTask, ...prev.slice(0, 9)]); // Keep only 10 latest tasks
        
        // Show notification for erranders
        setNewTaskNotification(newTask);
        
        // Auto-clear notification after 5 seconds
        setTimeout(() => {
          setNewTaskNotification(null);
        }, 5000);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Listen for storage events to sync across tabs/devices
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'errandash-tasks') {
        const updatedTasks = JSON.parse(e.newValue || '[]');
        setTasks(updatedTasks);
      } else if (e.key === 'errandash-available-tasks') {
        const updatedAvailableTasks = JSON.parse(e.newValue || '[]');
        setAvailableTasks(updatedAvailableTasks);
      } else if (e.key === 'errandash-errander-active') {
        const updatedErranderTask = JSON.parse(e.newValue || 'null');
        setErranderActiveTask(updatedErranderTask);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sync tasks to localStorage for cross-tab communication
  useEffect(() => {
    localStorage.setItem('errandash-tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('errandash-available-tasks', JSON.stringify(availableTasks));
  }, [availableTasks]);

  useEffect(() => {
    localStorage.setItem('errandash-errander-active', JSON.stringify(erranderActiveTask));
  }, [erranderActiveTask]);

  const createTask = (taskData: Omit<Task, 'id' | 'status' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    setTasks(prev => [newTask, ...prev]);
    
    // Add to available tasks for erranders immediately
    setAvailableTasks(prev => [newTask, ...prev]);
    
    // Show live notification to erranders
    setNewTaskNotification(newTask);
    
    // Auto-clear notification after 5 seconds
    setTimeout(() => {
      setNewTaskNotification(null);
    }, 5000);
    
    // Simulate task assignment after 3 seconds if not accepted by errander
    setTimeout(() => {
      const randomErrander = DEFAULT_ERRANDERS[Math.floor(Math.random() * DEFAULT_ERRANDERS.length)];
      updateTaskStatus(newTask.id, 'assigned');
      
      // Add mock errander
      setTasks(prev => prev.map(task => 
        task.id === newTask.id 
          ? {
              ...task,
              assignedErrander: {
                ...randomErrander,
                id: randomErrander.id
              },
              estimatedTime: '25-35 mins'
            }
          : task
      ));
      
      // Remove from available tasks if auto-assigned
      setAvailableTasks(prev => prev.filter(task => task.id !== newTask.id));
    }, 3000);

    // Simulate progress updates
    setTimeout(() => updateTaskStatus(newTask.id, 'en-route'), 8000);
    setTimeout(() => updateTaskStatus(newTask.id, 'in-progress'), 15000);
    setTimeout(() => updateTaskStatus(newTask.id, 'completed'), 25000);
    setTimeout(() => updateTaskStatus(newTask.id, 'checkout'), 26000);
  };

  const acceptTask = (taskId: string) => {
    const taskToAccept = availableTasks.find(task => task.id === taskId);
    if (taskToAccept) {
      const acceptedTask: Task = {
        ...taskToAccept,
        status: 'assigned',
        assignedErrander: {
          id: 'current-errander',
          name: 'You',
          phone: '+254 700 000 000',
          rating: 4.9
        },
        estimatedTime: '20-30 mins'
      };
      
      // Remove from available tasks
      setAvailableTasks(prev => prev.filter(task => task.id !== taskId));
      
      // Set as errander's active task
      setErranderActiveTask(acceptedTask);
      
      // Update the main tasks list if this task exists there
      setTasks(prev => prev.map(task => 
        task.id === taskId ? acceptedTask : task
      ));
      
      // Clear notification if this was the notified task
      if (newTaskNotification?.id === taskId) {
        setNewTaskNotification(null);
      }
      
      // Simulate task progress for accepted task
      setTimeout(() => {
        setErranderActiveTask(prev => prev ? { ...prev, status: 'en-route' } : null);
      }, 5000);
      
      setTimeout(() => {
        setErranderActiveTask(prev => prev ? { ...prev, status: 'in-progress' } : null);
      }, 10000);
    }
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
    
    // Update errander's active task if it matches
    setErranderActiveTask(prev => 
      prev && prev.id === taskId ? { ...prev, status } : prev
    );
  };

  const getTaskById = (taskId: string) => {
    return tasks.find(task => task.id === taskId);
  };

  const clearNewTaskNotification = () => {
    setNewTaskNotification(null);
  };

  const completeErranderTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'completed' } : task
    ));
    
    // Update errander's active task if it matches
    setErranderActiveTask(prev => 
      prev && prev.id === taskId ? { ...prev, status: 'completed' } : prev
    );
  };

  const activeTask = tasks.find(task => 
    ['pending', 'assigned', 'en-route', 'in-progress', 'completed', 'checkout'].includes(task.status)
  ) || null;

  return (
    <TaskContext.Provider value={{
      tasks,
      availableTasks,
      activeTask,
      erranderActiveTask,
      createTask,
      updateTaskStatus,
      acceptTask,
      getTaskById,
      newTaskNotification,
      clearNewTaskNotification,
      completeErranderTask
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
