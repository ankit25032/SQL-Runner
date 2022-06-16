import React,{useContext,useEffect, useState } from 'react'
import categoryContext from "../categoryContext";
import showContext from "../context/showContext";
import useData from '../hooks/useData';
import Table_data from '../components/Table_data';
import "./css/Table.css"
function Table() {
  
    const {category, setCategory}  = useContext(categoryContext);
    //const [data,setdata]=useState([]);
    // const { data, runtime, error } = useData(category);
    const {show,setshow}  = useContext(showContext);
    const [isdata,setisdata]=useState(false);

    // function getData() {
     
    //   setdata(data);
    // }
    

    
    
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