import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SingleCharacter from "./pages/SingleCharacter"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:name" element={<SingleCharacter />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App