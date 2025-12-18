import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ChampSelect from './components/ChampSelect'
import Settings from './components/Settings'

function App() {
  const state = {
    picks: {
      myTeam: [
        { name: "Player1", championId: 1, spells: [4, 7] },
        { name: "Player1", championId: 1, spells: [4, 7] },
        { name: "Player1", championId: 1, spells: [4, 7] },
        { name: "Player1", championId: 1, spells: [4, 7] },
        { name: "Player1", championId: 1, spells: [4, 7] },
      ],
      enemyTeam: [
        { name: "Player6", championId: 2, spells: [4, 11] },
        { name: "Player6", championId: 2, spells: [4, 11] },
        { name: "Player6", championId: 2, spells: [4, 11] },
        { name: "Player6", championId: 2, spells: [4, 11] },
        { name: "Player6", championId: 2, spells: [4, 11] },
      ],
    },
    bans: {
      myTeam: [ 'Zaahen', 'Lillia', 'Nautilus', 'Teemo', '' ],
      enemyTeam: [ 'Caitlyn', 'Sion', 'Mel', 'Ashe', 'Yunara' ]
    },
  };
  
  const currentPath = window.location.pathname;

  return (
    <>
      {currentPath == "/" &&
        <ChampSelect state={state}></ChampSelect>
      }
      {currentPath == "/settings" &&
        <Settings></Settings>
      }
    </>
  )
}

export default App
