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
            <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                className="brandLogo" 
                src="/logo-nuevo.png" 
                alt="KartZ Torneo" 
              />
            </Link>
            </div>

            <nav className="nav">
              <Link href="/">Inicio</Link>
              <Link href="/races">Carreras</Link>
              <Link href="/stats">Torneo</Link>
              <Link href="/tabla-puntos">Tabla</Link>
            </nav>
          </header>

          <section className="hero">
            <div className="heroInner">
              <div className="heroTag">COMPETICIÓN · KARTING · RANKING</div>
              <h1 className="heroTitle">KartZ Torneo</h1>
              <p className="heroSub">
                Si todo parece bajo control, es que no vas suficientemente rápido.
              </p>

              <div className="heroActions">
                <Link className="btnPrimary" href="/races">Ver Carreras</Link>
                <Link className="btnGhost" href="/stats">Ver Torneo</Link>
              </div>
            </div>
          </section>

          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}