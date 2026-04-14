import { races } from "../data/races";

type StandingRow = {
  driver: string;
  points: number;
  races: number;
  wins: number;
  podiums: number;
  puntos_lap: number;
  puntos_clasif: number;
  bestFinish: number;
};

function buildStandings(): StandingRow[] {
  const map = new Map<string, StandingRow>();

  for (const race of races) {
    for (const result of race.results) {
      const current = map.get(result.driver) ?? {
        driver: result.driver,
        points: 0,
        races: 0,
        wins: 0,
        podiums: 0,
        bestFinish: Number.POSITIVE_INFINITY,
      };

      current.points = current.points + result.points + result.puntos_best_lap + result.puntos_clasif;
      current.races += 1;

      if (result.position === 1) current.wins += 1;
      if (result.position <= 3) current.podiums += 1;
      if (result.position < current.bestFinish) current.bestFinish = result.position;

      map.set(result.driver, current);
    }
  }

  return Array.from(map.values()).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (b.podiums !== a.podiums) return b.podiums - a.podiums;
    return a.bestFinish - b.bestFinish;
  });
}

function getRankBadge(index: number) {
  if (index === 0) return "🥇";
  if (index === 1) return "🥈";
  if (index === 2) return "🥉";
  return `#${index + 1}`;
}

export default function StatsPage() {
  const standings = buildStandings();
  const totalRaces = races.length;
  const totalDrivers = standings.length;

  return (
    <main className="container statsPage">
      <section className="statsHeroCard">
        <div className="statsHeroGlow" />
        <div className="statsHeroContent">
          <span className="sectionEyebrow">CAMPEONATO GENERAL</span>
          <h1 className="sectionTitle">Tabla del torneo</h1>
          <p className="sectionText">
            Ranking acumulado en base a todas las carreras hardcodeadas del torneo.
            Los puntos se calculan tomando los resultados cargados en cada fecha.
          </p>
        </div>
      </section>

      <section className="statsSummaryGrid">
        <article className="summaryCard">
          <span className="summaryLabel">Carreras corridas</span>
          <strong className="summaryValue">{totalRaces}</strong>
        </article>

        <article className="summaryCard">
          <span className="summaryLabel">Pilotos en ranking</span>
          <strong className="summaryValue">{totalDrivers}</strong>
        </article>

        <article className="summaryCard">
          <span className="summaryLabel">Líder actual</span>
          <strong className="summaryValue">
            {standings[0]?.driver ?? "—"}
          </strong>
        </article>
      </section>

      <section className="standingsCard">
        <div className="standingsHeader">
          <div>
            <span className="raceBadge">Stats</span>
            <h2 className="raceTitle">Clasificación general</h2>
          </div>
        </div>

        {standings.length === 0 ? (
          <p className="raceDescription">
            No hay carreras hardcodeadas todavía. Agregá fechas en{" "}
            <strong>app/data/races.ts</strong>.
          </p>
        ) : (
          <div className="raceTableWrap">
            <table className="raceTable">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Piloto</th>
                  <th>Puntos</th>
                  <th>Carreras</th>
                  <th>Victorias</th>
                  <th>Podios</th>
                  <th>Mejor puesto</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((row, index) => (
                  <tr key={row.driver}>
                    <td className="racePosition">{getRankBadge(index)}</td>
                    <td className="raceDriver">{row.driver}</td>
                    <td>
                      <span className="pointsPill">{row.points}</span>
                    </td>
                    <td>{row.races}</td>
                    <td>{row.wins}</td>
                    <td>{row.podiums}</td>
                    <td>#{row.bestFinish}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}