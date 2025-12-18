import { useState } from "react";

const teams = {
  red: ["Sir Dank Shrek", "Soka", "Ptijudpomme", "Darkji", "Ekha", "Tomtomgun"],
  blue: ["Arkak", "Greed", "Ozmooz", "Jeckel", "M2o", "Liandar"],
  white: ["Saladofrez", "Yujambo", "Pepitos", "José", "Gus", "Sooul"],
  black: ["JumpLight", "Psy16", "Seven", "Beadwarf", "Gargamel", "Tartuffiño"],
};

const positions = ["1", "2", "3", "4", "5"];

export default function TeamPicker() {
  const [blueTeam, setBlueTeam] = useState("");
  const [redTeam, setRedTeam] = useState("");

  const [bluePlayers, setBluePlayers] = useState([]);
  const [redPlayers, setRedPlayers] = useState([]);

  const [blueBench, setBlueBench] = useState([]);
  const [redBench, setRedBench] = useState([]);

  const movePlayer = (players, setPlayers, index, direction) => {
    const newPlayers = [...players];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= players.length) return;
    [newPlayers[index], newPlayers[targetIndex]] = [
      newPlayers[targetIndex],
      newPlayers[index],
    ];
    setPlayers(newPlayers);
  };

  const benchPlayer = (players, setPlayers, bench, setBench, index) => {
    const newPlayers = [...players];
    const [removed] = newPlayers.splice(index, 1);
    setPlayers(newPlayers);
    setBench([...bench, removed]);
  };

  const saveTeam = (teamName, players, side) => {
    if (players.length < 5) {
      alert("Sélectionne 5 joueurs minimum avant de sauvegarder !");
      return;
    }
    const existing = JSON.parse(localStorage.getItem("side")) || {};
    existing[side] = {
        team: teamName,
        players: players.slice(0, 5),
    };

    localStorage.setItem("side", JSON.stringify(existing));
    alert(`Équipe ${teamName} sauvegardée !`);
  };

  const TeamColumn = ({
    title,
    team,
    setTeam,
    players,
    setPlayers,
    bench,
    setBench,
    disabledTeam,
    color,
    side
  }) => {
    const capitalize = (str = "") => str.charAt(0).toUpperCase() + str.slice(1);

    return (
      <div style={{ width: "45%" }}>
        <h3 style={{ textAlign: "center", color }}>{title}</h3>

        <select
          value={team}
          onChange={(e) => {
            const selected = e.target.value;
            setTeam(selected);
            setPlayers(selected ? [...teams[selected]] : []);
            setBench([]);
          }}
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "1rem",
            marginBottom: "1rem",
            borderRadius: "5px",
          }}
        >
          <option value=""></option>
          {Object.keys(teams).map((t) => (
            <option key={t} value={t} disabled={t === disabledTeam}>
              {capitalize(t)}
            </option>
          ))}
        </select>

        {/* LISTE DES JOUEURS */}
        <ul style={{ padding: 0 }}>
          {players.map((player, index) => (
            <li
              key={player}
              style={{
                listStyle: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
                backgroundColor: color + "20",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                fontWeight: "500",
                transition: "0.2s",
                cursor: "grab",
              }}
            >
              {/* Nom + position dynamiquement selon l'ordre */}
              <span>
                {player}{" "}
                {index < positions.length && (
                  <strong style={{ color }}>{`(${positions[index]})`}</strong>
                )}
              </span>

              <div>
                <button
                  onClick={() => movePlayer(players, setPlayers, index, -1)}
                  style={{
                    marginRight: "0.3rem",
                    backgroundColor: color,
                    color: "#fff",
                    border: "none",
                    borderRadius: "3px",
                    padding: "0 5px",
                    cursor: "pointer",
                  }}
                >
                  ↑
                </button>
                <button
                  onClick={() => movePlayer(players, setPlayers, index, 1)}
                  style={{
                    marginRight: "0.3rem",
                    backgroundColor: color,
                    color: "#fff",
                    border: "none",
                    borderRadius: "3px",
                    padding: "0 5px",
                    cursor: "pointer",
                  }}
                >
                  ↓
                </button>
                <button
                  onClick={() =>
                    benchPlayer(players, setPlayers, bench, setBench, index)
                  }
                  style={{
                    backgroundColor: "red",
                    color: "#fff",
                    border: "none",
                    borderRadius: "3px",
                    padding: "0 5px",
                    cursor: "pointer",
                  }}
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* BANC */}
        {bench.length > 0 && (
          <div
            style={{
              marginTop: "0.5rem",
              fontStyle: "italic",
              backgroundColor: "#eee",
              padding: "0.5rem",
              borderRadius: "5px",
            }}
          >
            <strong>Banc:</strong> {bench.join(", ")}
          </div>
        )}

        {/* Bouton sauvegarde */}
        {players.length > 0 && (
          <button
            style={{
              marginTop: "1rem",
              width: "100%",
              padding: "0.5rem",
              fontWeight: "bold",
              borderRadius: "5px",
              backgroundColor: color,
              color: "#fff",
              border: "none",
              cursor: "pointer",
              transition: "0.2s",
            }}
            onClick={() => saveTeam(team, players, side)}
            onMouseOver={(e) => (e.target.style.opacity = 0.8)}
            onMouseOut={(e) => (e.target.style.opacity = 1)}
          >
            Sauvegarder les 5 joueurs
          </button>
        )}
      </div>
    );
  };

  return (
    <div
        style={{
            maxWidth: "1280px", margin: "0 auto"}}>
        <button style={{backgroundColor: "red"}} onClick={() => {localStorage.clear()}}>RESET</button>
        <div
        style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
        }}
        >
        <TeamColumn
            title="BLUE SIDE"
            team={blueTeam}
            setTeam={setBlueTeam}
            players={bluePlayers}
            setPlayers={setBluePlayers}
            bench={blueBench}
            setBench={setBlueBench}
            disabledTeam={redTeam}
            color="#007bff"
            side="left"
        />

        <TeamColumn
            title="RED SIDE"
            team={redTeam}
            setTeam={setRedTeam}
            players={redPlayers}
            setPlayers={setRedPlayers}
            bench={redBench}
            setBench={setRedBench}
            disabledTeam={blueTeam}
            color="#dc3545"
            side="right"
        />
        </div>
    </div>
  );
}
