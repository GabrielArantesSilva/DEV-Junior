import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/dashboard';
import Home from './pages/home';
import {List} from './pages/list';

import { Toaster } from 'sonner';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/list" element={<List />} />
    </Routes>
    
    <Toaster />
    </>
  )
    }

export default App;