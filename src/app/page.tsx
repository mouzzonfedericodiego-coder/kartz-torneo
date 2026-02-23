"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type DriverRow = { id: string; name: string; points: number };

function slugId(name: string) {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}

type TournamentData = {
  drivers: DriverRow[];
};

export default function HomePage() {
  // 🔗 ID del torneo: mismo ID = mismos datos en cualquier dispositivo
  const [tournamentId, setTournamentId] = useState("kartz-2026");

  const [drivers, setDrivers] = useState<DriverRow[]>([
    { id: "uxp", name: "uXp", points: 25 },
    { id: "nico", name: "Nico", points: 18 },
    { id: "fede", name: "Fede", points: 15 },
  ]);

  const [newName, setNewName] = useState("");
  const [selectedId, setSelectedId] = useState(drivers[0]?.id ?? "");
  const [setPointsValue, setSetPointsValue] = useState<number>(0);

  const [status, setStatus] = useState<"idle" | "loading" | "saving" | "ok" | "error">("idle");
  const [msg, setMsg] = useState<string>("");

  const sorted = useMemo(() => [...drivers].sort((a, b) => b.points - a.points), [drivers]);

  useEffect(() => {
    if (!drivers.find((d) => d.id === selectedId)) {
      setSelectedId(drivers[0]?.id ?? "");
    }
  }, [drivers, selectedId]);

  function addPoints(id: string, delta: number) {
    setDrivers((prev) =>
      prev.map((d) => (d.id === id ? { ...d, points: Math.max(0, d.points + delta) } : d))
    );
  }

  function addDriver() {
    const name = newName.trim();
    if (!name) return;

    const base = slugId(name) || "piloto";
    let id = base;
    let i = 2;
    while (drivers.some((d) => d.id === id)) id = `${base}-${i++}`;

    setDrivers((prev) => [...prev, { id, name, points: 0 }]);
    setNewName("");
    setSelectedId(id);
    setSetPointsValue(0);
  }

  function setExactPoints() {
    if (!selectedId) return;
    const value = Number.isFinite(setPointsValue) ? setPointsValue : 0;

    setDrivers((prev) =>
      prev.map((d) => (d.id === selectedId ? { ...d, points: Math.max(0, Math.floor(value)) } : d))
    );
  }

  function resetAll() {
    setDrivers((prev) => prev.map((d) => ({ ...d, points: 0 })));
  }

  function removeDriver(id: string) {
    setDrivers((prev) => prev.filter((d) => d.id !== id));
  }

  async function loadTournament() {
    setStatus("loading");
    setMsg("");

    const { data, error } = await supabase
      .from("tournaments")
      .select("id, data")
      .eq("id", tournamentId)
      .maybeSingle();

    if (error) {
      setStatus("error");
      setMsg(error.message);
      return;
    }

    if (!data) {
      // No existe todavía -> lo creamos vacío (con tus drivers actuales)
      const payload: TournamentData = { drivers };
      const { error: insErr } = await supabase
        .from("tournaments")
        .insert({ id: tournamentId, data: payload });

      if (insErr) {
        setStatus("error");
        setMsg(insErr.message);
        return;
      }

      setStatus("ok");
      setMsg("Torneo creado (nuevo).");
      return;
    }

    const payload = (data.data ?? {}) as Partial<TournamentData>;
    if (Array.isArray(payload.drivers)) {
      setDrivers(payload.drivers);
    }

    setStatus("ok");
    setMsg("Datos cargados.");
  }

  async function saveTournament() {
    setStatus("saving");
    setMsg("");

    const payload: TournamentData = { drivers };

    const { error } = await supabase
      .from("tournaments")
      .upsert({ id: tournamentId, data: payload, updated_at: new Date().toISOString() });

    if (error) {
      setStatus("error");
      setMsg(error.message);
      return;
    }

    setStatus("ok");
    setMsg("Guardado en la nube ✅");
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-2">🏁 Torneo de Karting</h1>
        <p className="text-center text-gray-500 mb-6">
          Mismos datos en cualquier celu/navegador usando el ID del torneo
        </p>

        {/* Nube */}
        <div className="mb-6 rounded-lg border border-gray-200 p-4">
          <div className="font-semibold mb-2">🌐 Sincronización (Supabase)</div>

          <div className="grid gap-2 md:grid-cols-[1fr_auto_auto] items-center">
            <input
              value={tournamentId}
              onChange={(e) => setTournamentId(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2"
              placeholder="Ej: kartz-2026"
            />

            <button
              onClick={loadTournament}
              className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50"
            >
              Cargar
            </button>

            <button
              onClick={saveTournament}
              className="rounded-md bg-black text-white px-4 py-2 hover:opacity-90"
            >
              Guardar
            </button>
          </div>

          <div className="mt-2 text-xs text-gray-500">
            Tip: compartí el ID con tus amigos (mismo ID = mismo torneo).
          </div>

          <div className="mt-2 text-sm">
            {status === "loading" && <span className="text-gray-600">Cargando...</span>}
            {status === "saving" && <span className="text-gray-600">Guardando...</span>}
            {status === "ok" && <span className="text-green-600">{msg}</span>}
            {status === "error" && <span className="text-red-600">Error: {msg}</span>}
          </div>
        </div>

        {/* Panel de carga rápida */}
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="font-semibold mb-2">Agregar piloto</div>
            <div className="flex gap-2">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Ej: Juan"
                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-gray-200"
              />
              <button
                onClick={addDriver}
                className="rounded-md bg-black text-white px-4 py-2 hover:opacity-90"
              >
                +
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2">Se agrega con 0 puntos.</div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <div className="font-semibold mb-2">Setear puntos exactos</div>

            <div className="grid gap-2">
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2"
              >
                {drivers.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                value={setPointsValue}
                onChange={(e) => setSetPointsValue(Number(e.target.value))}
                className="rounded-md border border-gray-300 px-3 py-2"
                placeholder="0"
              />

              <button
                onClick={setExactPoints}
                className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50"
              >
                Aplicar
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <div className="font-semibold mb-2">Acciones</div>
            <button
              onClick={resetAll}
              className="w-full rounded-md bg-gray-900 text-white px-4 py-2 hover:opacity-90"
            >
              Resetear todo a 0
            </button>
            <div className="text-xs text-gray-500 mt-2">Arrancar torneo nuevo.</div>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Pos</th>
                <th className="p-3 text-left">Piloto</th>
                <th className="p-3 text-right">Puntos</th>
                <th className="p-3 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {sorted.map((d, idx) => (
                <tr key={d.id} className="border-t">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3 font-medium">{d.name}</td>
                  <td className="p-3 text-right font-bold">{d.points}</td>

                  <td className="p-3">
                    <div className="flex justify-end flex-wrap gap-2">
                      <button
                        onClick={() => addPoints(d.id, -1)}
                        className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50"
                      >
                        -1
                      </button>
                      <button
                        onClick={() => addPoints(d.id, +1)}
                        className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => addPoints(d.id, +5)}
                        className="px-3 py-1 rounded-md bg-black text-white hover:opacity-90"
                      >
                        +5
                      </button>

                      <button
                        onClick={() => removeDriver(d.id)}
                        className="px-3 py-1 rounded-md border border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {sorted.length === 0 && (
                <tr>
                  <td className="p-6 text-center text-gray-500" colSpan={4}>
                    No hay pilotos todavía. Agregá uno arriba 👆
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">Proyecto: kartz-torneo · Next.js</p>
      </div>
    </main>
  );
}