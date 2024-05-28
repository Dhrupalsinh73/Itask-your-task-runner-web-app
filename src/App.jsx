import { useState,useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setShowfinished] = useState(false)



  useEffect(() => {
    let todostring=localStorage.getItem("todos")
    if(todostring){
      let todos=JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
    

  const localstr=(params) => {   
     localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggalfinished=(e)=>{
      setShowfinished(!showfinished)
  }

  const handleEdit=(e,id)=>{
      let t=todos.filter(i=>i.id===id)
      setTodo(t[0].todo)
      let newTodos=todos.filter(i=>{
        return i.id!==id;
      });
      setTodos(newTodos)
      localstr()
  }


  const handledelete=(e,id)=>{
     let newTodos= todos.filter(item=>{
         return item.id !== id;
     });
     setTodos(newTodos);
     localstr()
  }
  const handleadd=()=>{
      setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
      setTodo("")
      localstr()
  }
  const handlechange=(e)=>{
      setTodo(e.target.value)
  }
  const handlechakebox=(e)=>{
      let id=e.target.name;
      let index=todos.findIndex(item=>{
              return item.id === id;
      })
      let newTodos=[...todos];
      newTodos[index].isCompleted=!newTodos[index].isCompleted;
      setTodos(newTodos);
      localstr()
      
  }

  return (
    <>
    <Navbar/>
    <div className="container mx-auto md:w-1/2 text-white  md:my-5 md:rounded-xl  p-4 md:min-h-[80vh] min-h-[100vh]">
        <h1 className="title font-bold text-center text-xl text-violet-500">iTask-manager</h1>
         <div className="addtodo my-5">
         <h2 className='my-5 font-bold text-lg'>Add todos</h2>
         <input onChange={handlechange} value={todo}  className="w-full text-black rounded-full px-3 py-1 my-2" type="text" name="" id="" />
         <button onClick={handleadd} disabled={todo.length<=3} className="bg-violet-800  hover:bg-green-500 hover:text-black text-white font-bold text-sm w-full  rounded-full p-2 py-1">Add</button>
         </div>
         <input onChange={toggalfinished} className='my-4' type="checkbox" chacked={showfinished}/> show finished
        <h2 className='font-bold text-xl my-5'>Your todos</h2>
        <div className="todos">
          {todos.length===0 && <div className="mx-36">No Todos for display</div>}
            {todos.map(item=>{
              return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex  my-3 justify-between">
                <div className="flex gap-5">
                <input  name={item.id} onChange={handlechakebox} type="checkbox" chacked={item.isCompleted} id="" />
                  <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
                  </div>
                  <div className="buttons flex h-full">
                    <button onClick={(e)=>handleEdit(e,item.id)} className="bg-violet-800 hover:bg-green-600  text-white font-bold text-sm rounded-md p-2 py-1 mx-2"><FaEdit /></button>
                    <button onClick={(e)=>{handledelete(e,item.id)}} className="bg-violet-800 hover:bg-red-950  text-white font-bold text-sm rounded-full p-2 py-1 mx-2"><MdDelete /></button>
                  </div>
                  </div>
                })}
              </div>
        </div>
    </>
  )
}

export default App
