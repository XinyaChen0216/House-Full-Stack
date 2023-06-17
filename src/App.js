import House from "./house";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";

function App() {
  return (
    <HashRouter>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Navigate to="/house/home" />} />
          <Route path="/house/*" element={<House />} />
        </Routes>
      </div >
    </HashRouter >
  )
}
export default App;


