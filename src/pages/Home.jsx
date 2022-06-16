
import React, {useState,useEffect,createContext, useContext} from "react";
import Category from "../components/Category";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import "./css/Home.css";
import categoryContext from "../categoryContext";
import showContext from "../context/showContext";
import dataContext from "../context/dataContext";
import rvalueContext from "../context/rvalueContext";
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