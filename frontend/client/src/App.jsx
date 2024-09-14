import SignUpPage from "./components/SignUpForm/SignUpForm";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/login" element={<SignUpPage />}/>
        <Route path="/" element={<Home />}/>
        
      </Routes>
    </div>
  );
}

export default App;
