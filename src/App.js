import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks';
import { useState, useEffect } from "react"
import AddTask from './components/AddTask';

const  App = () =>  {
  const [showAddTask, setShowAdd] = useState(false)
  const [tasks, setTasks] = useState ([])

   
  useEffect(() => {
    const getTask =  async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }
    
    getTask()
  }, [])


  // fetch tasks 
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

   const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }



    // add task 
      const addTask = async (task) => {
        const res = await fetch(`http://localhost:5000/tasks`, {
          method:'POST',
          headers:{
            'Content-type': 'application/json',
          }, body:JSON.stringify(task),
        
      })
      const data = await res.json()
      setTasks([...tasks, data])
      // const id = Math.floor(Math.random() * 100000) + 1 
      //  const newTask = { id, ...task}
      //  setTasks([...tasks, newTask])
    }

    // delete task 
    const deleteTask = async (id) => {
      await fetch(`http://localhost:5000/tasks/${id}`, {method:'DELETE',})
    
      setTasks(tasks.filter((task) =>task.id !== id ));
      
    }
    //toggle reminder 
    const toggleRemind = async (id) => {
      const taskToggle = await fetchTask(id)
      const uptTask = {...taskToggle, remider:!taskToggle.remider}

      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method:'PUT',
        headers:{
          'Content-type': 'application/json',
        }, body:JSON.stringify(uptTask)
      
      
    }) 

      const data = await res.json()

      setTasks(tasks.map((task) => task.id === id ? {...task, remider: data.remider} : task ))
    }
 
  return (
    <div className ='container'> 
      <Header onAdd = {() => setShowAdd(!showAddTask)} showAdd = {showAddTask} />
      {showAddTask && <AddTask  onAdd = {addTask} />}
      { tasks.length > 0 ? (
      <Tasks tasks={tasks} onDelete = {deleteTask} onToggle = {toggleRemind}/>
      ):(
        <h3 style={{color:'blue'}}>'NO TASK AVALIABLE'</h3>
        )
      }
    </div>
  ); 
}

export default App; 