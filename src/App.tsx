import  React, { FormEvent, Fragment, useEffect, useState } from "react";
import { getResult } from "./config/Services";
import { IForm } from "./models/IFrom";
import "./Style.css"

function App() {

 // const [eda, setEda] = useState<IForm>()
  const [form, setForm] = useState<IForm>()
  const [formData, setFormData] = useState<any[]>([])
  const [list, setList] = useState<string[]>([])
  
  

  useEffect(() => {
      getResult().then(res => {
        const data: IForm = res.data
      // console.log(data)
      setForm(data)
      getForm(data)
      })   
  }, [])




function getForm(form: IForm) { 
  //console.log(formData.forms[0].bilgiler.formjson.children[0].children[0].children[0].children[1])
 const objx = form.forms[0].bilgiler.formjson.children[0].children[0].children[0].children
 // console.log(objx)

 const arr:any = []
 objx.map((item, index) => {
if (item.children !== undefined) {
  //console.log(item.children)  
   item.children.map((item,index) =>{
    if (item.children !== undefined){
      //console.log(item)
      item.children.map((item, index) =>{
       // console.log(item)
        arr.push(item)
        //console.log(arr)
      })
    }
    arr.push(item)
   })
   }
   arr.push(item)
 } )
  setFormData(arr)
  //console.log(formData)
}

function Send(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  console.log('eda', list)
}

  return (
    <>
    { React.createElement('h1', {} , 'Form Example') }
    <hr />

 
 <form onSubmit={ (e) => Send(e)  }> 
 {formData  && formData.map((item,index) => {
    //  {console.log(item)}
     if ( item.children !== null && item.tag !== "select" &&  item.class !== "radio inline") {
       //console.log(item)
      return(
        <React.Fragment key={index} >
          { React.createElement(String(item.tag), {
            className: item.class,
            id: item.id,
            key: index,
            type: item.type,
            placeholder: item.placeholder,
            html: item.html ? item.html : null,
            onChange: (e:any) => { list.push(e.target.value); setList(list) }
            
          }, item.html) }
       </React.Fragment>
         )
     }else if(item.tag === "select") {
      // {console.log(item)}
  return( 
     <Fragment key={index}>
        { React.createElement(
          item.tag, {
          className: item.class,
          checked: item.checked,
          type: item.type,
          html: item.html ? item.html : null,
          onChange: (e) => { list.push(e.target.value); setList(list) }
        }, item.html, 
        item.children.map((item:any, index:number) =>{
          return(
            <Fragment key={index}>
          { React.createElement(
          item.tag, {
          className: item.class,
          type: item.type,
          html: item.html ? item.html : null,
        }, item.html )}
            </Fragment>
          )
        })
       ) }
     </Fragment>
          
          )
    
     } else if(item.tag === "label" && item.class === "radio inline"){
        //console.log(item) 
      return(
        <React.Fragment key={index}>
          { React.createElement(String(item.tag), {
            className: item.class,
            id: item.id,
            key: index,
            type: item.type,
            placeholder: item.placeholder,
            html: item.html ? item.html : null
          }, item.html,   item.children.map((item:any, index:number) =>{
            return(
              <Fragment key={index}>
            { React.createElement(
            item.tag, {
            className: item.class,
            type: item.type,
            html: item.html ? item.html : null,
            onChange: (e) => { list.push(e.target.value); setList.bind(list) }
            
          }, item.html )}
              </Fragment>
            )
          })   ) }
       </React.Fragment>
         )
     }
   
   })  }
 </form>

  
    </>
  );
}

export default App;
