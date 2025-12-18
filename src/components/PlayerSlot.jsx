import React, { useEffect, useState } from "react";
import "./PlayerSlot.css";

export default function PlayerSlot({ index, player, side, pick, picks, enemyPicks, bans, enemyBans }) {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (pick) {
            setAnimate(false);
            requestAnimationFrame(() => setAnimate(true));
        }
    }, [pick]);

    return (
        <div
            style={{
                width: "150px",
                height: "250px",
                position: "relative"
            }}
        >
            <div style={{ 
                width: "100%", 
                height: "85%", 
                position: "absolute", 
                top: "50%", 
                transform: "translateY(-50%)", 
                borderLeft: side === "right" ? (index == 0 ? undefined : "2px solid rgba(255,255,255,0.2)") : undefined,
                borderRight: side === "left" ? "2px solid rgba(255,255,255,0.2)" : undefined,
            }}></div>

            {/* Image de fond avec animation */}
            {pick && (
                <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    zIndex: 1
                }}>
                    <img
                        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${pick.split(" ").join("")}_0.jpg`}
                        alt={pick}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "top center",   
                            position: "absolute",
                            top: "10%",
                            left: 0,
                            zIndex: 1,
                            opacity: animate ? 1 : 0,
                            transform: animate ? "translateY(0) scale(1.25)" : "translateY(-20px) scale(1.5)",
                            transition: "opacity 0.6s ease-out, transform 0.6s ease-out"
                        }}
                    />
                </div>
            )}

            {(
                (!pick && index == 0 && side == "left" && picks.length == 0 && enemyPicks.length == 0 && bans.length == 3 && enemyBans.length == 3) ||
                (!pick && index == 1 && side == "left" && picks.length == 1 && enemyPicks.length == 2 && bans.length == 3 && enemyBans.length == 3) ||
                (!pick && index == 2 && side == "left" && picks.length == 2 && enemyPicks.length == 2 && bans.length == 3 && enemyBans.length == 3) ||
                (!pick && index == 3 && side == "left" && picks.length == 3 && enemyPicks.length == 4 && bans.length == 5 && enemyBans.length == 5) ||
                (!pick && index == 4 && side == "left" && picks.length == 4 && enemyPicks.length == 4 && bans.length == 5 && enemyBans.length == 5)
                  ||
                (!pick && index == 0 && side == "right" && picks.length == 0 && enemyPicks.length == 1 && bans.length == 3 && enemyBans.length == 3) ||
                (!pick && index == 1 && side == "right" && picks.length == 1 && enemyPicks.length == 1 && bans.length == 3 && enemyBans.length == 3) ||
                (!pick && index == 2 && side == "right" && picks.length == 2 && enemyPicks.length == 3 && bans.length == 3 && enemyBans.length == 3) ||
                (!pick && index == 3 && side == "right" && picks.length == 3 && enemyPicks.length == 3 && bans.length == 5 && enemyBans.length == 5) ||
                (!pick && index == 4 && side == "right" && picks.length == 4 && enemyPicks.length == 5 && bans.length == 5 && enemyBans.length == 5)
                ) &&
                <div className={side == "left" ? "glow-left" : "glow-right"} style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    zIndex: 1
                }}>

                </div>
            }
            {index == 0 && 
                <img src="/top.png" style={{ opacity: "0.5", width: "40px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} />
            }
            {index == 1 && 
                <img src="/jungle.png" style={{ opacity: "0.5", width: "40px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} />
            }
            {index == 2 && 
                <img src="/mid.png" style={{ opacity: "0.5", width: "40px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} />
            }
            {index == 3 && 
                <img src="/bot.png" style={{ opacity: "0.5", width: "40px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} />
            }
            {index == 4 && 
                <img src="/supp.png" style={{ opacity: "0.5", width: "40px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} />
            }

            {/* Texte du joueur */}
            <div className="rajdhani-semibold"
                style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#fff",
                    zIndex: 2,
                    textShadow: "0 0 5px rgba(0,0,0,0.7)",
                    textAlign: "center",
                    textTransform: "uppercase"
                }}
            >
                {player}
            </div>
        </div>
    );
}
