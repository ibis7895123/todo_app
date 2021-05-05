import { useDispatch, useSelector } from 'react-redux'
import { NewTask, Task } from 'src/types/task'
import { addTask, deleteTask, updateTask } from './slice'

const TasksHooks = () => {
  const dispatch = useDispatch()

  return {
    tasks: useSelector((state) => state.task.tasks),
    addTasks: (task: NewTask) => dispatch(addTask(task)),
    deleteTasks: (task: Task) => dispatch(deleteTask(task)),
    updateTasks: (task: Task) => dispatch(updateTask(task)),
  }
}

export default TasksHooks
