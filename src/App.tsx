import { FormEvent, useState } from "react"
import {AccountForm} from "./AccountForm"
import {AddressForm} from "./AddressForm"
import { useMultiStepForm } from "./useMultiStepForm"
import {UserForm} from "./UserForm"

function App() {

  type FormData ={
    firstName:string,
    lastName:string,
    age:string,
    street:string,
    city:string,
    state:string,
    zip:string,
    email:string,
    password:string
  }

  const INITIAL_DATA:FormData ={
    firstName:"",
    lastName:"",
    age:"",
    street:"",
    city:"",
    state:"",
    zip:"",
    email:"",
    password:""
  }

  const [data,setData] = useState(INITIAL_DATA)
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
  useMultiStepForm([<UserForm {...data} updateFields={updateData}/>,
  <AddressForm {...data} updateFields={updateData}/>,
  <AccountForm {...data} updateFields={updateData}/>])

  function updateData(fields:Partial<FormData>){
    setData(prev => { return {...prev,...fields}} )
  }

  function onSubmit(e:FormEvent){
      e.preventDefault()
      if(!isLastStep) return next();
      alert("SuccessFully Created Account")
  }

  return ( 
    <div style={{
      position:"relative",
      background:"white",
      border:"1px solid black",
      padding:"2rem",
      margin:"1rem",
      borderRadius:"0.5rem",
      fontFamily:"Arial",
      maxWidth:"max-content"
    }}>
      <form onSubmit={onSubmit}>
          <div style={{position:"absolute", top:"0.5rem", right:"0.5rem"}}>
              {currentStepIndex + 1} / {steps.length}
          </div>
          {step}
          <div style={{marginTop:"1rem",display:"flex",gap:"0.5rem", justifyContent:"flex-end"}}>
           {!isFirstStep && (<button type="button" onClick={back}>Back</button>)} 
            <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
          </div>
      </form>
    </div>

    )
}

export default App
