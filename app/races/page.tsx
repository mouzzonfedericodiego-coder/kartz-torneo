"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { races } from "../data/races";
import Link from "next/link"; // Asegúrate de tener el import para el logo

function getPositionLabel(position: number) {
  if (position === 1) return "🥇";
  if (position === 2) return "🥈";
  if (position === 3) return "🥉";
  return `#${position}`;
}

export default function RacesPage() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const race = races[current];
  const hasMany = races.length > 1;
  const currentThumbs = useMemo(() => races, []);

  // --- LÓGICA DE VUELTA RÁPIDA ---
  const globalBestLap = useMemo(() => {
    const laps = race.results
      .map((r) => r.bestLap)
      .filter((lap): lap is string => !!lap && lap !== "—");
    
    if (laps.length === 0) return null;
    
    // Compara strings (funciona para formato SS.ms) o podrías parsear a float
    return laps.reduce((min, curr) => (curr < min ? curr : min));
  }, [race]);

  function goTo(index: number) {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }

  function goPrev() {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? races.length - 1 : prev - 1));
  }

  function goNext() {
    setDirection(1);
    setCurrent((prev) => (prev === races.length - 1 ? 0 : prev + 1));
  }

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -80 || velocity < -500) goNext();
    if (offset > 80 || velocity > 500) goPrev();
  }

  return (
    <main className="container racesSliderPage racesCompactPage netflixRacesPage">
      <section className="racesHeroCard racesHeroCardCompact">
        <div className="racesHeroGlow" />
        <div className="racesHeroContent">
          <span className="sectionEyebrow">HISTORIAL DE CARRERAS</span>
          <h1 className="sectionTitle compactTitle">Carreras disputadas</h1>
          <p className="sectionText compactText">
            Deslizá entre las fechas del torneo para ver resultados, podio y
            detalles clave en una navegación más fluida y visual.
          </p>
        </div>
      </section>

      <section className="sliderShell compactShell netflixShell">
        <div className="sliderTopbar compactTopbar netflixTopbar">
          <div>
            <span className="raceBadge">{race.mode ?? "Carrera"}</span>
            <h2 className="raceTitle compactRaceTitle">{race.title}</h2>
            <p className="raceMeta">
              <span>{race.date}</span>
              <span className="raceMetaDot">•</span>
              <span>{race.track}</span>
            </p>
          </div>

          {hasMany && (
            <div className="sliderControls netflixControls">
              <button className="sliderBtn netflixBtn" onClick={goPrev} aria-label="Anterior">
                ←
              </button>
              <div className="sliderCounter netflixCounter">
                {current + 1} / {races.length}
              </div>
              <button className="sliderBtn netflixBtn" onClick={goNext} aria-label="Siguiente">
                →
              </button>
            </div>
          )}
        </div>

        <div className="netflixViewport">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={race.id}
              className="raceSlide compactRaceSlide netflixRaceSlide"
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 70 : -70, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: direction >= 0 ? -70 : 70, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
              drag={hasMany ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={handleDragEnd}
            >
              <div className="raceSlideMedia compactMedia netflixMedia">
                <img
                  src={race.podiumImage ?? "/kart-race.png"}
                  alt={race.title}
                  className="raceSlideImage netflixImage"
                />
                <div className="netflixImageOverlay" />
              </div>

              <div className="raceSlideContent compactContent netflixContent">
                {race.description && (
                  <p className="raceDescription compactDescription">
                    {race.description}
                  </p>
                )}

                <div className="podiumMini compactPodiumMini netflixPodiumMini">
                  {race.results.slice(0, 3).map((result, index) => (
                    <motion.div
                      className="podiumMiniCard compactPodiumCard netflixPodiumCard"
                      key={`${race.id}-${result.driver}`}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.08 + index * 0.08 }}
                    >
                      <div className="podiumMiniPos">
                        {getPositionLabel(result.position)}
                      </div>
                      <div className="podiumMiniName">{result.driver}</div>
                      
                      <div className="pointsPill compactPointsPill">+{result.points}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="compactResultsCard netflixResultsCard">
                  <table className="compactRaceTable compactRaceTableDetailed">
                    <thead>
                      <tr>
                        <th>Pos.</th>
                        <th>Piloto</th>
                        <th>Pts</th>
                        <th>Peso (kg)</th>
                        <th>Clasif.</th>
                        <th>V. rápida</th>
                        <th>Kart</th>
                        <th>Tiempo total</th>
                        <th>Dif. 1ro</th>
                        <th>Vueltas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {race.results.map((result) => {
                        // Verificamos si este resultado es la vuelta rápida
                        const isFastest = globalBestLap && result.bestLap === globalBestLap;

                        return (
                          <tr key={`${race.id}-${result.position}-${result.driver}`}>
                            <td className="compactPosCell">
                              {getPositionLabel(result.position)}
                            </td>
                            <td className="compactDriverCell">{result.driver}</td>
                            <td className="compactPointsCell">
                              <div className="pointsContainer">
                                <span className="pointsPill compactPointsPill">
                                  {result.points}
                                </span>
                                
                                {result.puntos_best_lap > 0 && (
                                  <p className="pointsPill compactPointsPill bonusPill" style={{ 
                                    color: 'var(--fastest-lap)'
                                }}>
                                    +{result.puntos_best_lap}
                                  </p>
                                )}
                                {result.puntos_clasif > 0 && (
                                  <p className="pointsPill compactPointsPill bonusPill" style={{ 
                                    color: "yellow"
                                }}>
                                    +{result.puntos_clasif}
                                  </p>
                                )}
                              </div>
                            </td>
                            <td className="compactDriverCell">{result.peso}</td>
                            <td>{result.clasificacion === 1 ? "🕒" : "—"}</td>
                            <td style={{ 
                                color: isFastest ? 'var(--fastest-lap)' : undefined, 
                                fontWeight:900 
                            }}>
                              {result.bestLap ?? "—"}
                            </td>
                            <td>{result.kart ?? "—"}</td>
                            <td>{result.tiempo_tot ?? "—"}</td>
                            <td>{result.dif_primero ?? "—"}</td>
                            <td>{result.vueltas ?? "—"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="sliderThumbs netflixThumbs">
          {currentThumbs.map((raceItem, index) => (
            <button
              key={raceItem.id}
              className={`thumb netflixThumb ${index === current ? "active" : ""}`}
              onClick={() => goTo(index)}
            >
              <span className="netflixThumbTitle">{raceItem.title}</span>
              <span className="netflixThumbMeta">{raceItem.date}</span>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}