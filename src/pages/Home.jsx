
import React, {useState} from "react";

import "./css/Home.css";
import categoryContext from "../categoryContext";
import showContext from "../context/showContext";
import dataContext from "../context/dataContext";
import rvalueContext from "../context/rvalueContext";

const  Category =React.lazy( ()=> import("../components/Category")) ;
const Editor =React.lazy( ()=> import("../components/Editor"));
const Navbar =React.lazy( ()=> import( "../components/Navbar"));
const Table =React.lazy( ()=> import( "../components/Table"));
function Home() {
 
  const [category, setCategory] = useState("categories");
  const [show,setshow]=useState(false);
  const [sqlval,setsqlval]=useState("Enter or select an Query");
  const [rvalue,setrvalue]=useState([]);

  


  return (
    <>
    <categoryContext.Provider value={{ category, setCategory }}>
    <showContext.Provider value={{show,setshow}}>
      <dataContext.Provider value={{sqlval,setsqlval}}>
        <rvalueContext.Provider value={{rvalue,setrvalue}}>
     <div className="Home">
        <Navbar />
        <div className="Home-container">
            <Category />
            <div className="workstation">
                <Editor />
                <Table />
            </div>
           
        </div>
     </div>
     </rvalueContext.Provider>
     </dataContext.Provider>
      </showContext.Provider>
     </categoryContext.Provider>
    </>
   
  )
}

export default Home