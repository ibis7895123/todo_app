import { Task } from '../task'

export interface TaskEditDialogProps {
  initialTask: Task
  isVisible: boolean
  dialogClose: () => void
  onCheck: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface DeleteConfirmDialogProps {
  task: Task
  isVisible: boolean
  dialogClose: () => void
  onDelete: () => void
}
