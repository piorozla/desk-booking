import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Area from './components/area/Area';
import './App.css';
import Home from './components/home/Home';
import Header from './components/shared/header/Header';
import { DBProvider } from './db/useDb';

function App() {
  return (
    <DBProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Area />} />
        </Routes>
      </Router>
    </DBProvider>
  );
}

export default App;
