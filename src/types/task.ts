export interface NewTask {
  title: string
  deadline: string
}

export interface Task extends NewTask {
  id: number
}

export interface TodoTasksState {
  currentId: number
  tasks: Task[]
}
