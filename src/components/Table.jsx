import React,{useContext } from 'react'
import categoryContext from "../categoryContext";
import showContext from "../context/showContext";

import Table_data from '../components/Table_data';
import "./css/Table.css"
function Table() {
  
    const {category}  = useContext(categoryContext);
    const {show}  = useContext(showContext);
    
  return (
    <div className='table-container'>
 
       {show?
        <>
             <p className='qr'>Query Results</p>
      <p className='qr2'>Speed:{show.runtime.toFixed(2)}ms</p>
         <Table_data data2={show.data} category={category}/>
        </>:
       <div className='table-demo'>
       Run a Query to see Results
       </div>
        }
    </div>
  )
}

export default Table