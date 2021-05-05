import { useDispatch, useSelector } from 'react-redux'
import { NewTask, Task } from 'src/types/task'
import { addTodoTask, deleteTodoTask, updateTodoTask } from './slice'

const TodoTasksHooks = () => {
  const dispatch = useDispatch()

  return {
    todoTasks: useSelector((state) => state.todoTasks.tasks),
    addTodoTasks: (task: NewTask) => dispatch(addTodoTask(task)),
    deleteTodoTasks: (task: Task) => dispatch(deleteTodoTask(task)),
    updateTodoTasks: (task: Task) => dispatch(updateTodoTask(task)),
  }
}

export default TodoTasksHooks
