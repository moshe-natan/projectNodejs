import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/Main';

const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />}/>
        <Route path='/items*' element={<Main />}/>
      </Routes>
    </BrowserRouter>
   );
}
 
export default App;
