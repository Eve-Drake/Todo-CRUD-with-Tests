import { useState } from 'react';
import './App.css';

interface Task{
  task: string,
  id: number,
  complete: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskText, setTaskText] = useState<string>('')


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

  

  return (
    <>
      <div>
        <label htmlFor='taskInput'>Task:</label>
        <input type='text' onChange={(e) => setTaskText(e.target.value)} value={taskText} id='taskInput' placeholder='Task'/>
        <button onClick={(e) => addTask()}>Add</button>
      </div>

      {tasks.map((el) =>(
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
