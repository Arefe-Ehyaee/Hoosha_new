import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Mainpage from "./components/Mainpage";
import Services from "./components/Pages/Services";
import AboutUs from "./components/Pages/AboutUs";
import Voice from "./components/Pages/Voice";
import ChatMain from "./components/Pages/ChatMain";
import ChatText from "./components/Pages/ChatText";
import VoiceChat from "./components/Pages/Voice";


export default function App() {
  
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/chat" element={<ChatMain />} />
            <Route path="/voice" element={<Voice />} />
            <Route path="/textChat" element={<ChatText />} />
            <Route path="/voiceChat" element={<VoiceChat />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

