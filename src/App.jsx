import './App.css';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';

import {Form} from "./components/Form";
import {Parse} from "./components/Page2/Parse";

export const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Form />}/>
          <Route path='/next' element={<Parse />}/>
        </Routes>
      </div>
    </Router>
  )
}
