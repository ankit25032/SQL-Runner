import React,{useContext,useState,useEffect} from 'react'
import Select from 'react-select'
import dataContext from '../context/dataContext'
import categoryContext from '../categoryContext';
import rvalueContext from '../context/rvalueContext';
import toast from 'react-hot-toast';
function Query() {
    const {sqlval, setsqlval}  = useContext(dataContext);
    const {category, setCategory}  = useContext(categoryContext);
    const {rvalue, setrvalue}  = useContext(rvalueContext);
    const [list,setlist]=useState(["fff"]);
    const options = [
        { value: 'order_details', label: 'select * from order_details' },
        { value: 'categories', label: 'select * from categories' },
        { value: 'customers', label: 'select * from customers' },
        { value: 'shippers', label: 'select * from shippers' },
        { value: 'employees', label: 'select * from employees' },
        { value: 'products', label: 'select * from products' },
      ]

      
useEffect(() => {
  const rlist=JSON.parse(localStorage.getItem('rlist'))
  
  if(rlist){
  setrvalue(rlist);
  }
  
}, [])

  return (
    <div className='q-container'>
    <p>Query</p>
  
    <Select onChange={(val)=>{
        setsqlval(val.label)
        setCategory(val.value)
    }} options={options} />
    
<div className='recent'>
<p className="p1">Recents Queries</p>
{rvalue.map((val,index)=>{
    return (

    <div key={index} className='ritem'>
    <p key={index+20} className='p2'>{val}</p>
    <button key={index+40} className='copy' onClick={()=>{
      navigator.clipboard.writeText(val);
      toast.success("Copied")
    }
    
    }>Copy</button>
    </div>
    
    )
})}
</div>
    </div>
  )
}

export default Query