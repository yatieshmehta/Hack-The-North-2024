import SignUpPage from "./components/SignUpForm/SignUpForm";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import CandidatesPage from "./components/CandidatesPage";
import ProjectsPage from "./components/ProjectsPage";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<SignUpPage />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/candidates" element={<CandidatesPage />}/>
        <Route path="/projects" element={<ProjectsPage />}/>
      </Routes>
    </div>
  );
}

export default App;
