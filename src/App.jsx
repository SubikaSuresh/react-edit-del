import Home from "./Pages/Home"
import About from "./Pages/About"
import Contact from "./Pages/Contact"
import { useState } from "react"
//import Button from "./components/button/button"
import { Route, Routes} from "react-router-dom"
import Navlinks from "./components/Navlinks/Navlinks"
import Addmarks from "./Pages/Addmarks"
function App() {
  const [state, setsstate]=useState("myreactapp")
  const handleButtonClick = () => {
    setsstate("button clicked")
  }
  return (

    <div className="App" style={{height:"100vh",width:"100vw"}}>

      {/* <div onClick={handleButtonClick}><Button text={"click me"}/></div>
      <Button text ={"New Button"}handleButtonClick={handleButtonClick} />
     <p>{state} </p> */}
     <Navlinks/>
    
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/About page" element={<About page/>}/>
      <Route path="/Contact page" element={<Contact page/>}/>
      <Route path="/Addmarks" element={<Addmarks />} />  

     </Routes>
    
    </div>

  )
}

export default App

