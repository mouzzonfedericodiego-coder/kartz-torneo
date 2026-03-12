import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "KartZ Torneo",
  description: "Torneo de karting - ranking y carreras",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        {/* Background layers */}
        <div className="bg">
          <div className="bgSmoke" />
          <div className="bgVignette" />
        </div>

        <div className="site">
          <header className="topbar">
            <div className="brand">
              {/* Si querés performance pro: después lo pasamos a next/image */}
              <img className="brandLogo" src="/logo-nuevo.png" alt="KartZ Torneo" />
            </div>

            <nav className="nav">
              <Link href="/">Torneo</Link>
              <Link href="/races">Cargar carrera</Link>
              <Link href="/stats">Stats</Link>
            </nav>
          </header>

          <section className="hero">
            <div className="heroInner">
              <div className="heroTag">COMPETICIÓN · KARTING · RANKING</div>
              <h1 className="heroTitle">KartZ Torneo</h1>
              <p className="heroSub">
                Cargá carreras en segundos y mirá el campeonato general con estilo “pista de noche”.
              </p>

              <div className="heroActions">
                <Link className="btnPrimary" href="/races">Cargar carrera</Link>
                <Link className="btnGhost" href="/stats">Ver stats</Link>
              </div>
            </div>
          </section>

          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}