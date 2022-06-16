import React,{useState,useContext,useEffect,useRef} from 'react';
import Query from './Query';
import categoryContext from "../categoryContext";
import useData from '../hooks/useData';
import showContext from '../context/showContext';
import rvalueContext from '../context/rvalueContext';
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-github";
import toast, { Toaster } from 'react-hot-toast';
import "./css/Editor.css";
import CsvDownload from 'react-json-to-csv'
import dataContext from '../context/dataContext';

function Editor() {
  const notify = () => toast.error("Run a query")
    const [value, setValue] = useState("");
    const runRef=useRef();
    const cRef=useRef();
    const [click,setclick]=useState(false);
    const {category}  = useContext(categoryContext);
    const {sqlval}  = useContext(dataContext);
    const { data, runtime } = useData(category);
    const { setrvalue}  = useContext(rvalueContext);
    const {setshow} = useContext(showContext);

    function onChange(newValue) {
      
        setValue(newValue)
      }
      useEffect(()=>{
        setValue(sqlval);
      },[sqlval])
      useEffect(() => {
        setValue(`select * from ${category}`);
        setshow(false)
        setclick(false)
      }, [category])

      useEffect(()=>{
        document.onkeydown=(e)=>{
          if(e.ctrlKey&&e.code==="KeyM"){
            runRef.current.click()
           }
        }
       
      },[])
      
      function handleRun() {
     setshow({data:data.slice(0,50),runtime});
     setclick(true)
      setrvalue(value);
      toast.success("Done")
      const rlist=JSON.parse(localStorage.getItem('rlist'));
    
      const myArray = value.split();
     
    
        if(rlist){
          
       
            if(rlist.length>9){
                rlist.shift();
                const result=JSON.stringify([...rlist,...myArray]);
                console.log(rlist);
                localStorage.setItem("rlist",result);
            }
            else{
              const result=JSON.stringify([...rlist,...myArray]);
                localStorage.setItem("rlist",result);
            }
            setrvalue([...rlist,...myArray].reverse());
        }
        else{
          localStorage.setItem("rlist",JSON.stringify(myArray));
      
            
        }
      }
     
  return (
    <div className='editor-container'>
      <div className='editor'>
      <Toaster/>
      <p className='edit-title'>Editor</p>
     <AceEditor
          id="editor"
          aria-label="editor"
          mode="mysql"
          theme="github"
          name="editor"
          fontSize={16}
          minLines={15}
          maxLines={14}
          width="100%"
          showPrintMargin={false}
          showGutter
          placeholder="Write your Query here..."
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
          value={value}
          onChange={onChange}
          showLineNumbers
        />

        <div className='editor-utility'>
          <a href="#focus"> <button ref={runRef} onClick={handleRun} className='run-btn'><i class="fa-solid fa-play"></i>Run Query OR CTRL+M</button></a>
           
            {click?
            <>
            <CsvDownload  style={{display:"none",border:"none",width: "75px",
            height: "35px",backgroundColor:"transparent"}} data={data} >
                        <button ref={cRef} style={{display:"none"}} ></button>
                        </CsvDownload>
                        <button onClick={()=>{toast.success("Downloaded successfully");cRef.current.click()}} className='export-btn'> Export</button></>
                        :
                        
                         <button onClick={()=>notify()} className='export-btn'> Export</button>
          }
            
            
        </div>
        </div>
      <Query value={value}/>
    </div>
  )
}

export default Editor