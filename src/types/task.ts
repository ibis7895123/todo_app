export interface NewTask {
  title: string
}

export interface Task extends NewTask {
  id: number
  deadline: string
  isDone: boolean
}

export interface TaskState {
  currentId: number
  tasks: Task[]
}
