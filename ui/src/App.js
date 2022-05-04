import { useState } from 'react';
import { Model } from './pages/Model';
import { Presentation } from './pages/Presentation';
import { Home } from './pages/Home';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


function App() {
  const [slideNumber, setSlideNumber] = useState(1); // top-level state so slide number is persisted during demo

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/model" exact element={<Model />} />
        <Route path="/presentation" exact element={<Presentation slideNumber={slideNumber} setSlideNumber={setSlideNumber} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
