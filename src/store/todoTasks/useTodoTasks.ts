import { useDispatch, useSelector } from 'react-redux'
import { NewTask, Task } from '../../types/task'
import { addTodoTask, deleteTodoTask, updateTodoTask } from './slice'

const TodoTasksContainer = () => {
  const dispatch = useDispatch()

  return {
    todoTasks: useSelector((state) => state.todoTasks.tasks),
    addTodoTasks: (task: NewTask) => dispatch(addTodoTask(task)),
    deleteTodoTasks: (task: Task) => dispatch(deleteTodoTask(task)),
    updateTodoTasks: (task: Task) => dispatch(updateTodoTask(task)),
  }
}

export default TodoTasksContainer
