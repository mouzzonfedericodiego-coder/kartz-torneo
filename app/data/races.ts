export type RaceResult = {
  position: number;
  driver: string;
  time: string;
  points: number;
  peso: number;
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
  podiumImage?: string;
  results: RaceResult[];
};

export const races: Race[] = [
  {
    id: "race-1",
    title: "Carrera 1",
    date: "11/03/2026",
    track: "Kartodromo Galvez",
    mode: "GANADOR: PABLO RECKE",
    description: "Primera fecha del torneo, pista seca y ritmo muy parejo.",
    featured: true,
    podiumImage: "/kart-race.png",
    results: [
      { position: 1, driver: "PABLO RECKE", time: "16:29:978", points: 98, peso: 100 ,kart: "23B", bestLap: "48.434" },
      { position: 2, driver: "LUNA", time: "16:11:727", points: 98, peso: 100 ,kart: "25", bestLap: "48.659" },
      { position: 3, driver: "NICO RECKE", time: "16:46:917", points: 64, peso: 100 ,kart: "94", bestLap: "48.528" },
      { position: 4, driver: "NICO MIR", time: "16:54:627", points: 94, peso: 100 ,kart: "K04", bestLap: "48.566" },
      { position: 5, driver: "MAXI", time: "16:41:072", points: 92, peso: 100 ,kart: "K15", bestLap: "51.154" },
      { position: 6, driver: "WALTER", time: "16:51:765", points: 43, peso: 100 ,kart: "16", bestLap: "51.933" },
      { position: 7, driver: "ALE MIR", time: "16:56.799", points: 88, peso: 100 ,kart: "11", bestLap: "52.130" },
      { position: 8, driver: "DIEGO", time: "16:58:564", points: 30, peso: 100 ,kart: "09", bestLap: "50.863" },
      { position: 9, driver: "MAXI", time: "17:05:233", points: 84, peso: 100 ,kart: "47", bestLap: "49.568" },
    ],
  },
  {
    id: "race-2",
    title: "Carrera 2",
    date: "A coordinar fecha",
    track: "Kartodromo Galvez",
    mode: "Clasificación + final",
    description: "Segunda fecha con mejoras de tiempos y pelea fuerte por el podio.",
    featured: true,
    podiumImage: "/kart-race.png",
    results: [
      { position: 1, driver: "PABLO RECKE", time: "16:29:978", points: 98, peso: 100 ,kart: "23B", bestLap: "48.434" },
    ],
  },
  {
    id: "race-3",
    title: "Carrera 3",
    date: "25/03/2026",
    track: "Kartodromo Galvez",
    mode: "Final larga",
    description: "Fecha más exigente, con tandas largas y constancia como clave.",
    featured: true,
    podiumImage: "/kart-race.png",
    results: [
      { position: 1, driver: "PABLO RECKE", time: "16:29:978", points: 98, peso: 100 ,kart: "23B", bestLap: "48.434" },
    ],
  },
];