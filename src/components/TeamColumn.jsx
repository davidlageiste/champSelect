import React, { useState, useEffect } from "react";
import PlayerSlot from "./PlayerSlot";

export default function TeamColumn({ team, side, picks, enemyPicks, bans, enemyBans }) {

  console.log("team", team);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: side === "left" ? "row-reverse" : "row",
        alignItems: side === "left" ? "flex-end" : "flex-start",
        overflow: "hidden",
        paddingRight: side == "left" ? "2px" : undefined,
        paddingLeft: side == "right" ? "2px" : undefined,
        position: side == "right" ? "relative" : undefined
      }}
    >
      { side == "right" && 
        <div style={{ borderLeft: '2px solid rgba(75, 69, 69, 0.2)', width: "3px", height: "85%", position: "absolute", top: "50%", transform: "translateY(-50%)", left: "0"}}></div>
      }
      {team.players.map((player, index) => (
        <PlayerSlot key={index} index={index} player={player} side={side} pick={picks[index]} picks={picks} enemyPicks={enemyPicks} bans={bans} enemyBans={enemyBans}/>
      ))}
    </div>
  );
}
