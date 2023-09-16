import { useEffect, useState } from 'react';
import './App.css';

interface Task{
  task: string,
  id: number,
  complete: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskText, setTaskText] = useState<string>('')
  const [currentTasks, setCurrentTasks] = useState<Task[]>([])

  const addTask = () =>{
    if(taskText){
      setTasks([...tasks, {task : taskText, id: Math.floor(Math.random()* 10000), complete: false }]);
      setTaskText('')
    }
  }

  const deleteTask = (id : number) =>{
    setTasks(tasks.filter(el => el.id !== id))
  }

  const completeTask = (id: number) =>{
    setTasks(tasks.map((el) => {
      if(el.id === id){
        return {...el, complete: !el.complete};
      }
      else{
        return el;
      }
    }))
  }

  const setViewed = (e : string) =>{
    if(e === 'complete'){
      setCurrentTasks(tasks.filter((el) => el.complete !== false))
    }
    else if(e === 'incomplete'){
      setCurrentTasks(tasks.filter((el) => el.complete !== true))
    }
    else{
      setCurrentTasks(tasks)
    }
  }

  useEffect(() =>{
    setCurrentTasks(tasks);
  }, [tasks])


  return (
    <>
    <div>
      <label htmlFor="selectTasks">Select: </label>
      <select name='currentTaskList' id='selectTasks' onChange={(e) => setViewed(e.target.value)}>
        <option value='all' >All</option>
        <option value='complete'>Completed</option>
        <option value='incomplete'>Incomplete</option>
      </select>
    </div>

    <div>
      <label htmlFor='taskInput'>Task:</label>
      <input type='text' onChange={(e) => setTaskText(e.target.value)} value={taskText} id='taskInput' placeholder='Task'/>
      <button onClick={(e) => addTask()}>Add</button>
    </div>

    {currentTasks.map((el) =>(
      <div key={el.id}>
        <h1 className={el.complete? 'complete' : 'incomplete'}>{el.task}</h1>
        <button onClick={(e) => deleteTask(el.id)}>Delete</button>
        <button onClick={(e) => completeTask(el.id)}>{(el.complete ?  'Mark Incomplete' :'Mark Complete')}</button>
      </div>
    ))}

    
    </>
  );
}

export default App;
