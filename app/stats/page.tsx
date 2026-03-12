"use client";

import { useEffect, useMemo, useState } from "react";

type Driver = { name: string; points: number };

function readDrivers(): Driver[] {
  try {
    const raw = localStorage.getItem("kartz_drivers");
    const parsed = raw ? (JSON.parse(raw) as Driver[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function StatsPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  // ✅ evita hydration mismatch: leemos localStorage solo en cliente
  useEffect(() => {
    setDrivers(readDrivers());
  }, []);

  const sorted = useMemo(() => {
    return [...drivers]
      .filter((d) => d?.name && Number.isFinite(d.points))
      .sort((a, b) => b.points - a.points);
  }, [drivers]);

  const totalPilots = sorted.length;
  const totalPoints = useMemo(
    () => sorted.reduce((acc, d) => acc + (d.points || 0), 0),
    [sorted]
  );

  const leader = sorted[0];
  const podium = sorted.slice(0, 3);

  return (
    <main className="container">
      <h1 className="pageTitle">Torneo</h1>
      <p className="pageSub">Ranking general y puntajes acumulados.</p>

      {/* ===== PODIO ===== */}
      <section className="podiumWrap">
        <h2 className="sectionTitle">Podio</h2>

        {podium.length === 0 ? (
          <div className="emptyState">
            Todavía no hay puntajes. Cargá una carrera en “Cargar carrera”.
          </div>
        ) : (
          <div className="podium">
            {/* 2do */}
            <div className="podiumCol second">
              <div className="podiumCard">
                <div className="podiumPlace">🥈 2</div>
                <div className="podiumName">{podium[1]?.name ?? "—"}</div>
                <div className="podiumPts">{podium[1]?.points ?? 0} pts</div>
              </div>
              <div className="podiumBase h2" />
            </div>

            {/* 1ero */}
            <div className="podiumCol first">
              <div className="podiumCard">
                <div className="podiumPlace">🥇 1</div>
                <div className="podiumName">{podium[0]?.name ?? "—"}</div>
                <div className="podiumPts">{podium[0]?.points ?? 0} pts</div>
              </div>
              <div className="podiumBase h1" />
            </div>

            {/* 3ero */}
            <div className="podiumCol third">
              <div className="podiumCard">
                <div className="podiumPlace">🥉 3</div>
                <div className="podiumName">{podium[2]?.name ?? "—"}</div>
                <div className="podiumPts">{podium[2]?.points ?? 0} pts</div>
              </div>
              <div className="podiumBase h3" />
            </div>
          </div>
        )}
      </section>

      {/* ===== RESUMEN ===== */}
      <section className="card tableCard statsCard">
        <h2 className="sectionTitle">Resumen</h2>

        <div className="statsRows">
          <div className="statsRow">
            <div className="statsLabel">Total pilotos</div>
            <div className="statsValue">{totalPilots}</div>
          </div>
          <div className="statsRow">
            <div className="statsLabel">Total puntos</div>
            <div className="statsValue">{totalPoints}</div>
          </div>
          <div className="statsRow">
            <div className="statsLabel">Líder</div>
            <div className="statsValue">
              {leader?.name ?? "—"}{" "}
              <span className="muted">({leader?.points ?? 0} pts)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TABLA COMPLETA ===== */}
      <section className="table tableCard">
        <div className="row header">
          <div>#</div>
          <div>Piloto</div>
          <div>Puntos</div>
        </div>

        {sorted.length === 0 ? (
          <div className="row empty">
            <div>—</div>
            <div>Todavía no hay carreras cargadas</div>
            <div>—</div>
          </div>
        ) : (
          sorted.map((d, i) => (
            <div key={`${d.name}-${i}`} className="row">
              <div className="pos">
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
              </div>
              <div>{d.name}</div>
              <div>{d.points}</div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}