import { Routes, Route } from 'react-router-dom';
import Homepage from "./components/Homepage";
import UpdateInformation from "./components/UpdateInformation";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/update-information" element={<UpdateInformation />} />
      </Routes>
    </>
  );
}

export default App;
