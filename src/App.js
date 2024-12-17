import { Routes, Route } from 'react-router-dom';
import Homepage from './views/pages/Homepage';
import UpdateInformation from './views/pages/UpdateInformation';

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
