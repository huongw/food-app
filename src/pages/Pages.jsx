import Home from "./Home";
import Cuisine from "./Cuisine";
import SearchResults from "./SearchResults";
import Recipe from "./Recipe";
import {Route, Routes} from "react-router-dom";

import React from 'react'

function Pages() {
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cuisine/:type" element={<Cuisine/>}/>
        <Route path="/searched/:search" element={<SearchResults/>}/>
        <Route path="/recipe/:name" element={<Recipe/>}/>
      </Routes>
  )
}

export default Pages