import React, { useEffect, useState } from "react";
import BanRow from "./BanRow";
import TeamColumn from "./TeamColumn";
import { subscribeToChampSelect } from "../api/socket";

const CHAMPION_NAME_MAP = {
  "Wukong": "MonkeyKing",
  "Nunu & Willump": "Nunu",
  "Kai'Sa": "KaiSa",
  "Kha'Zix": "Khazix",
  "Cho'Gath": "Chogath",
  "Vel'Koz": "Velkoz",
  "Rek'Sai": "RekSai",
  "Bel'Veth": "Belveth",
  "Miss Fortune": "MissFortune",
  "K'Sante": "KSante",
  "Master Yi": "MasterYi"
};

function normalizeChampionName(name) {
  return CHAMPION_NAME_MAP[name] || name;
}

export default function ChampSelect() {
  const [bans1, setBans1] = useState([]);
  const [bans2, setBans2] = useState([]);
  const [picks1, setPicks1] = useState([]);
  const [picks2, setPicks2] = useState([]);
  const [state, setState] = useState({});
  const [timerWidth, setTimerWidth] = useState(100);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    subscribeToChampSelect((data) => {
      setTimerActive(true);
      console.log("WEBSOCKET DATA", data);
      return setState(data);
    });
  }, []);

  let team1;
  let team2;

  const side = JSON.parse(localStorage.getItem("side"));

  if (!side) {
    team1 = {players: ["Player1", "Player2", "Player3", "Player4", "Player5"], side: "left" };
    team2 = {players: ["Player6", "Player7", "Player8", "Player9", "Player10"], side: "right" };
  } else {
    team1 = side.left;
    team2 = side.right;
  }

  useEffect(() => {
    if (state && state.bans) {
      state.bans.myTeam = state.bans.myTeam.map(normalizeChampionName);
      state.bans.enemyTeam = state.bans.enemyTeam.map(normalizeChampionName);
      setBans1(state.bans.myTeam);
      setBans2(state.bans.enemyTeam);

      state.picks.myTeam = state.picks.myTeam.map(normalizeChampionName);
      state.picks.enemyTeam = state.picks.enemyTeam.map(normalizeChampionName);
      setPicks1(state.picks.myTeam);
      setPicks2(state.picks.enemyTeam);
      
      // Réinitialiser le timer à 100% à chaque mise à jour
      setTimerWidth(100);
    }
  }, [state]);

  // Animation du timer
  useEffect(() => {
    if (!timerActive) return;
    if (timerWidth > 0) {
      const timer = setTimeout(() => {
        setTimerWidth(prev => Math.max(0, prev - 0.2));
      }, 60); // Diminue de 0.2% toutes les 60ms (30 secondes pour atteindre 0)
      
      return () => clearTimeout(timer);
    }
  }, [timerWidth, timerActive]);

  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "flex-end" }}>
      <div style={{ display: "flex", flexDirection: "column", color: "white", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <BanRow bans={bans1} enemyBans={bans2} side={"left"} picks={picks1} enemyPicks={picks2}/>
          <BanRow bans={bans2} enemyBans={bans1} side={"right"} picks={picks2} enemyPicks={picks1}/>
        </div>
        <div className="timer" style={{ display: "flex", justifyContent: "center", overflow: "hidden" }}>
          <div 
            style={{ 
              height: "5px", 
              width: `${timerWidth / 2}%`, 
              backgroundColor: "white",
              transition: "width 0.06s linear",
              transformOrigin: "right"
            }}
          ></div>
          <div 
            style={{ 
              height: "5px", 
              width: `${timerWidth / 2}%`, 
              backgroundColor: "white",
              transition: "width 0.06s linear",
              transformOrigin: "left"
            }}
          ></div>
        </div>
        <div style={{ display: "flex", height: "100%", backgroundColor: "#211f2e" }}>
          <TeamColumn team={team1} side={"left"} picks={picks1} enemyPicks={picks2} bans={bans1} enemyBans={bans2} />
          <div className="" style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px", flex: 1, fontFamily: "Amarillo", fontWeight: 700, WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" }}>
            <span style={{ fontSize: "26px" }}>PHASE DE GROUPE</span><br />
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "20px" }}>PATCH 25.23</span>
            <div className="" style={{ flexGrow: 1, display: "flex", width: "80%", justifyContent: "space-between", marginTop: "40px" }}>
              <div>A</div>
              <div></div>
              <div>C</div>
            </div>
          </div>
          <TeamColumn team={team2} side={"right"} picks={picks2} enemyPicks={picks1} bans={bans2} enemyBans={bans1} />
        </div>
      </div>
    </div>
  );
}