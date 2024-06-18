import Navbar from "./components/Navbar";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [lists, setlists] = useState([]);
  const [addtodo, setaddtodo] = useState("");

  const handlechange = (e) => {
    setaddtodo(e.target.value);
  };

  useEffect(() => {
    let todostring=JSON.parse(localStorage.getItem("lists"))
    if (todostring!==null) {
      let todos=JSON.parse(localStorage.getItem("lists"))
    setlists(todos)
    }
    
  
    
  }, [])
  

  const savetoLS=()=>{
    localStorage.setItem("lists",JSON.stringify(lists))
  }

  
  const handlelistadd = () => {
    setlists([...lists, {id:uuidv4(), addtodo,isCompleted:false }]);
    setaddtodo("");
    savetoLS()
    
    //console.log(lists);
  };

  const handleComplete=(e)=>{
    let name=e.target.name;
    let index=lists.findIndex(item=>{
      return item.id===name
    });
    let newlists=[...lists]
    newlists[index].isCompleted=!newlists[index].isCompleted;
    setlists(newlists);
    savetoLS()


  }

  const handleDelete=(e,id)=>{
    let newlists=lists.filter(item=>{
      return item.id!==id
    })
    setlists(newlists)
    savetoLS()
  }

  const handleEdit=(e)=>{
    let name=e.target.name;
    let index=lists.findIndex(item=>{
      return item.id===name
    });
    setaddtodo(lists[index].addtodo);
    handleDelete(e,name)
    savetoLS()


  }

  return (
    <>
      <Navbar />

      <div className="container py-3 bg-slate-100 h-96 w-96 mx-auto my-28 rounded-xl relative min-h-96 ">
        <div className="todos flex-col gap-3 ">
          {lists.map((item) => {
            return (<div key={item.id} className="todo text-gray-600 flex justify-center items-center gap-7 py-2">
            <input onChange={handleComplete} type="checkbox" name={item.id} checked={item.isCompleted} id="" />
                <div className={item.isCompleted?"line-through":""}>{item.addtodo}</div>
                <button name={item.id} onClick={(e)=>{handleEdit(e)}} className="bg-purple-400 text-white p-1 rounded-xl">Edit</button>
                <button onClick={(e)=>{handleDelete(e,item.id)}} className="bg-purple-400 text-white p-1 rounded-xl">Delete</button>
              </div>
            );
          })}
        </div>
        <div>
          <input
            onChange={handlechange}
            className="absolute inset-x-24 bottom-0 border-4 border-purple-400"
            type="text"
            name="addTodo"
            value={addtodo}
          />
          <button disabled={addtodo.length<3} className="absolute right-11 bottom-0 p-1 text-white bg-purple-400" onClick={handlelistadd}>
            Add
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
