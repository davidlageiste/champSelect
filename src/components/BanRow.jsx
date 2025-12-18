import React from "react";
import "./BanRow.css";

export default function BanRow({ bans, enemyBans, side, picks, enemyPicks }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: side === "left" ? "row-reverse" : "row",
        alignItems: side === "left" ? "flex-end" : "flex-start",
        margin: "0 20px 10px",
        borderTop: "1px solid rgba(255, 255, 255, 0.5)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "2px",
          backgroundColor: "rgba(255,255,255,0.3)",
          marginTop: 10,
        }}
      ></div>

      {bans &&
        [0, 1, 2, 3, 4].map((e, i) => (
          <div
            key={i}
            className="square"
            style={{ position: "relative", width: 70, height: 70 }}
          >
            {bans[i] ? (
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/15.23.1/img/champion/${bans[i]}.png`}
                alt=""
                className="ban-image"
              />
            ) : (
              <>
                {console.log("bans", bans.length)}
                {console.log("enemyBans", enemyBans.length)}
                {console.log("side", side)}
                {console.log("i", i)}
                {
                  (
                    (bans.length == 0 && enemyBans.length == 0 && side == "left" && i == 0) ||
                    (bans.length == 1 && enemyBans.length == 1 && side == "left" && i == 1) ||
                    (bans.length == 2 && enemyBans.length == 2 && side == "left" && i == 2) ||
                    (bans.length == 3 && enemyBans.length == 4 && side == "left" && i == 3 && picks.length == 3 && enemyPicks.length == 3) ||
                    (bans.length == 4 && enemyBans.length == 5 && side == "left" && i == 4 && picks.length == 3 && enemyPicks.length == 3)
                      ||
                    (bans.length == 0 && enemyBans.length == 1 && side == "right" & i == 0) ||
                    (bans.length == 1 && enemyBans.length == 2 && side == "right" & i == 1) ||
                    (bans.length == 2 && enemyBans.length == 3 && side == "right" & i == 2) ||
                    (bans.length == 3 && enemyBans.length == 3 && side == "right" && i == 3 && picks.length == 3 && enemyPicks.length == 3) ||
                    (bans.length == 4 && enemyBans.length == 4 && side == "right" && i == 4 && picks.length == 3 && enemyPicks.length == 3)

                  ) ? <div className={side == "left" ? "glow-left" : "glow-right"} style={{ position: "relative", width: 70, height: 70 }}></div> : <div style={{ width: 70, height: 70 }}></div>
                }
              </>
            )}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) rotate(-45deg)",
                width: "2px",
                height: "60%",
                backgroundColor: "rgba(255,255,255,1)",
              }}
            ></div>
          </div>
        ))}
    </div>
  );
}
