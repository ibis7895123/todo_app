import { Task } from '../task'

export interface TaskListItemProps {
  task: Task
  onCheck: (event: React.ChangeEvent<HTMLInputElement>) => void
}
