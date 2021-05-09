import { useDispatch, useSelector } from 'react-redux'
import { NewTask, Task } from 'src/types/task'
import { addTask, deleteTask, updateTask } from './slice'

const TaskHooks = () => {
  const dispatch = useDispatch()

  return {
    tasks: useSelector((state) => state.task.tasks),
    addTask: (task: NewTask) => dispatch(addTask(task)),
    deleteTask: (task: Task) => dispatch(deleteTask(task)),
    updateTask: (task: Task) => dispatch(updateTask(task)),
  }
}

export default TaskHooks
