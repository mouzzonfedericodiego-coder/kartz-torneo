import Link from "next/link";

export default function Home() {
  return (
    <main className="homeMenu">


        <div className="racesHeroGlow" />
        <div className="racesHeroContent">

          <h1 className="sectionTitle compactTitle">PRÓXIMA FECHA ABRIL!!!!</h1>
        </div>

      <div></div>
      <div className="menuGrid">

        <Link href="/races" className="menuCard">
          <img src="/kart-race.png" alt="Carreras" />
          <div className="menuOverlay">
            <h2>Carreras</h2>
            <p>Cargar y ver resultados de cada carrera</p>
          </div>
        </Link>

        <Link href="/stats" className="menuCard">
          <img src="/kart-solo.png" alt="Torneo" />
          <div className="menuOverlay">
            <h2>Torneo</h2>
            <p>Ranking general y puntajes</p>
          </div>
        </Link>

      </div>

    </main>
  );
}