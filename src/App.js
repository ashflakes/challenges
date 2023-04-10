import React, { useEffect, useState } from 'react';

// components
import EntryInBetween from './components/EntryInBetween/EntryInBetween';
import SortRegisterQueue from './components/SortRegisterQueue/SortRegisterQueue';
import Thesaurus from './components/ThesaurusComp/Thesaurus';

// styles
import './App.css'
import './components/SpawnCircles/SpawnCircles.css'
import SpawnCircles from './components/SpawnCircles/SpawnCircles';

function App() {
  return (
    <div className="App" >
      <SpawnCircles />
    </div>
  );
}

export default App;
