import './App.css';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { Route, Routes} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:searchContent" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
