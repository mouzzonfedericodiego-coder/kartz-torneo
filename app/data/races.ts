export type RaceResult = {
  position: number;
  driver: string;
  time: string;
  points: number;
  kart?: string;
  bestLap?: string;
  note?: string;
};

export type Race = {
  id: string;
  title: string;
  date: string;
  track: string;
  mode?: string;
  description?: string;
  featured?: boolean;
  results: RaceResult[];
};

export const races: Race[] = [
  {
    id: "race-1",
    title: "Carrera 1",
    date: "11/03/2026",
    track: "KartZ Night Circuit",
    mode: "Sprint nocturno",
    description: "Primera fecha del torneo, pista seca y ritmo muy parejo.",
    featured: true,
    results: [
      { position: 1, driver: "Diego", time: "58.231", points: 25, kart: "K07", bestLap: "57.992" },
      { position: 2, driver: "Mati", time: "58.744", points: 18, kart: "K22", bestLap: "58.401" },
      { position: 3, driver: "Nico", time: "59.102", points: 15, kart: "K10", bestLap: "58.880" },
      { position: 4, driver: "Juan", time: "59.531", points: 12, kart: "K04", bestLap: "59.210" },
      { position: 5, driver: "Lucas", time: "59.940", points: 10, kart: "K15", bestLap: "59.602" },
    ],
  },
  {
    id: "race-2",
    title: "Carrera 2",
    date: "18/03/2026",
    track: "KartZ Night Circuit",
    mode: "Clasificación + final",
    description: "Segunda fecha con mejoras de tiempos y pelea fuerte por el podio.",
    results: [
      { position: 1, driver: "Mati", time: "57.980", points: 25, kart: "K22", bestLap: "57.801" },
      { position: 2, driver: "Diego", time: "58.140", points: 18, kart: "K07", bestLap: "57.920" },
      { position: 3, driver: "Lucas", time: "58.901", points: 15, kart: "K15", bestLap: "58.612" },
      { position: 4, driver: "Nico", time: "59.025", points: 12, kart: "K10", bestLap: "58.774" },
      { position: 5, driver: "Juan", time: "59.442", points: 10, kart: "K04", bestLap: "59.001" },
    ],
  },
  {
    id: "race-3",
    title: "Carrera 3",
    date: "25/03/2026",
    track: "KartZ GP Layout",
    mode: "Final larga",
    description: "Fecha más exigente, con tandas largas y constancia como clave.",
    results: [
      { position: 1, driver: "Nico", time: "1:00.120", points: 25, kart: "K10", bestLap: "59.880" },
      { position: 2, driver: "Diego", time: "1:00.402", points: 18, kart: "K07", bestLap: "1:00.001" },
      { position: 3, driver: "Mati", time: "1:00.688", points: 15, kart: "K22", bestLap: "1:00.210" },
      { position: 4, driver: "Lucas", time: "1:01.014", points: 12, kart: "K15", bestLap: "1:00.640" },
      { position: 5, driver: "Juan", time: "1:01.550", points: 10, kart: "K04", bestLap: "1:01.220" },
    ],
  },
];