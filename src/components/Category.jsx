import React,{useContext} from 'react'
import TABLE_NAMES from '../constants/Table_Name'
import "./css/Category.css"
import categoryContext from "../categoryContext";

function Category() {
   
    const {category, setCategory}  = useContext(categoryContext);
 
    function handleCategory(idx,e) {
    const table=TABLE_NAMES[idx];
    document.querySelectorAll(".cat-focus").forEach(el=>el.classList.remove("cat-focus"));
    e.target.classList.add("cat-focus");
    setCategory(table);
      
    }

  return (
    <div className='cat-container'>
        <div className='cat-title'>
            TABLE
            </div>
       {TABLE_NAMES.map((table,index)=>{
            return <div onClick={(e)=>{handleCategory(index,e)}} className='cat-item' key={index}>
                <p>{index+1}</p>
                <div className='cat-item-name'>{table.toLocaleUpperCase()}</div>
            </div>

       })}
    </div>
  )
}

export default Category