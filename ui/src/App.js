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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/model" exact element={<Model />} />
        <Route path="/presentation" exact element={<Presentation />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
