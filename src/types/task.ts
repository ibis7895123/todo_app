export interface NewTask {
  title: string
}

export interface Task extends NewTask {
  id: number
  deadline?: string
}

export interface TodoTasksState {
  currentId: number
  tasks: Task[]
}
