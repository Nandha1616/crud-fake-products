import {BrowserRouter as Router,Routes, Route} from "react-router-dom"
import Viewpage from "./viewpage"
import Update from "./update"
import Adduser from "./adduser"

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Viewpage/>}></Route>
          <Route path="/update/:id" element={<Update/>}></Route>
          <Route path="/adduser" element={<Adduser/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
