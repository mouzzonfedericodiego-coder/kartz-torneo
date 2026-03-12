import { races } from "../data/races";

function getPositionLabel(position: number) {
  if (position === 1) return "🥇";
  if (position === 2) return "🥈";
  if (position === 3) return "🥉";
  return `#${position}`;
}

export default function RacesPage() {
  return (
    <main className="container racesPage">
      <section className="racesHeroCard">
        <div className="racesHeroGlow" />
        <div className="racesHeroContent">
          <span className="sectionEyebrow">HISTORIAL DE CARRERAS</span>
          <h1 className="sectionTitle">Carreras disputadas</h1>
          <p className="sectionText">
            Acá podés ver cada fecha del torneo con detalle de posiciones, tiempos,
            puntos y datos clave. Todo queda fijo en código para mantenerlo simple,
            claro y sin panel de carga.
          </p>
        </div>
      </section>

      <section className="racesGrid">
        {races.map((race, index) => (
          <article
            key={race.id}
            className={`raceCard ${race.featured ? "raceCardFeatured" : ""}`}
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <div className="raceCardTop">
              <div>
                <span className="raceBadge">{race.mode ?? "Carrera"}</span>
                <h2 className="raceTitle">{race.title}</h2>
                <p className="raceMeta">
                  <span>{race.date}</span>
                  <span className="raceMetaDot">•</span>
                  <span>{race.track}</span>
                </p>
              </div>

              <div className="raceCountBox">
                <span className="raceCountValue">{race.results.length}</span>
                <span className="raceCountLabel">pilotos</span>
              </div>
            </div>

            {race.description && <p className="raceDescription">{race.description}</p>}

            <div className="raceTableWrap">
              <table className="raceTable">
                <thead>
                  <tr>
                    <th>Pos.</th>
                    <th>Piloto</th>
                    <th>Kart</th>
                    <th>Tiempo</th>
                    <th>V. rápida</th>
                    <th>Puntos</th>
                  </tr>
                </thead>
                <tbody>
                  {race.results.map((result) => (
                    <tr key={`${race.id}-${result.position}-${result.driver}`}>
                      <td className="racePosition">{getPositionLabel(result.position)}</td>
                      <td className="raceDriver">{result.driver}</td>
                      <td>{result.kart ?? "—"}</td>
                      <td>{result.time}</td>
                      <td>{result.bestLap ?? "—"}</td>
                      <td>
                        <span className="pointsPill">+{result.points}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}