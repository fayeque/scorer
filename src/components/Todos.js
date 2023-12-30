import { useState , useEffect } from 'react'
// import "./App.css"
import { FaEdit , FaCheckCircle , FaToggleOff , FaToggleOn  } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";

export default function Todos() {
  const [item, setItems] = useState([])
  const [todo, setTodo] = useState("")
  const [itemSelected , setItemSelected] = useState(false)
  const [updateId , setUpdateID] = useState(null)
  const [toggleTheme , setToggleTheme] = useState(true)

  useEffect(() => {
    if(localStorage.getItem('data') !== null ){
      const storedObject = localStorage.getItem('data');
      const items = JSON.parse(storedObject);
      setItems(items);
    }
  }, []);


  useEffect(()=>{
    console.log('item in useEffect',item)
    if(item.length > 0){
        console.log('item in useEffect inside if',item)
    localStorage.setItem('data', JSON.stringify(item))
    }
  },[item])
  





  const updateItem = (idx) => {
    setItemSelected(true)
    setTodo(item[idx])
    setUpdateID(idx)
   
  }  

  const addItem = () => {
    console.log("todo here", todo)
    if (todo && !itemSelected) {
      
      setItems([...item , todo])
      console.log('item outer',item);
      setTodo("")
    }
    else if(todo && itemSelected){
      
      item[updateId] = todo
      
      /*setItem(
        .map((id)=>{
          if(id === updateId){
            item[updateId] = todo
          }
          return id
        })

      )*/
      localStorage.setItem('data', JSON.stringify(item))
      setTodo("")
      setItemSelected(false)
    }
    // else{
    //   alert('Please enter your to do work')
    // }

  }

  const deleteItem = (id) => {
      const updatedList = item.filter((ele , idx) => {
        return idx !== id
      });

    localStorage.setItem('data', JSON.stringify(updatedList));
    setItems(updatedList)

  }

  
  
  /*(id) =>{
    const selectedItem = item[id]
    
    item.filter((ele , idx) => {
        if(id === idx){
          return ele[idx]
        } 
    })
    console.log(selectedItem)
  }*/





  const listItem = item.map((ele, idx) => {
    return (
      <ul key={idx} className='list-container' >
        <li className={` ${toggleTheme ? "list" : "list-white"}`}>
          {ele}



          <div className='li-btn'>
          <button
            onClick={()=> updateItem(idx)}
            className={` ${!toggleTheme ? "update-btn" : "update-btn-black"}`}
          >
            {/* < FaEdit className={` ${!toggleTheme ? "update-icon" : "update-icon-black"}`}  /> */}
          </button>

          <button 
            onClick= { () => deleteItem(idx) } 
            className={` ${!toggleTheme ? "delete-btn" : "delete-btn-black"}`}
          >
            {/* < AiFillDelete  className={` ${!toggleTheme ? "delete-icon" : "delete-icon-black"}`} /> */}
          </button>

          </div>

        </li>

      </ul>
    )
  })

  


  return (
    <div className={`${toggleTheme ? "container " : "container-white"}`} >
       
       {/* { !toggleTheme ? <FaToggleOff className='toggle-off' onClick={()=> setToggleTheme(true)} /> :  */}
    {/* //    <FaToggleOn className='toggle-on' onClick={() => setToggleTheme(false)} / > } */}

        <h1 className={` ${!toggleTheme ? "header-black " : "header-white"}`}>To Do List</h1>
        <form
          onSubmit={(event) => { event.preventDefault();
        addItem() } }
          className='input-form'
        >
            <input
              type="text"
              placeholder='Type your work here'
              value={todo}
              onChange={(e) => { setTodo(e.target.value); } }
              className={` ${toggleTheme ? "input " : "input-white"}`} />

            {
            !itemSelected ?
              <button onClick={addItem}
                className={` ${!toggleTheme ? "add-btn-white " : "add-btn"}`}
               > 
               {/* <IoIosAddCircle /> */}
              </button> :
              <button 
                onClick={addItem}
                className={` ${!toggleTheme ? "add-btn-white " : "add-btn"}`}
              > 
               {/* <FaCheckCircle />  */}
              </button>
              }
          </form>
          <h2 className={` ${!toggleTheme ? "h2-black" : "h2-white"}`} >Works to do </h2>
      {listItem}
        
    </div>
  )

}
