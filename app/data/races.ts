export type RaceResult = {
  position: number;
  driver: string;
  time?: string;
  points: number;
  peso: number;
  kart?: string;
  bestLap?: string;
  note?: string;
  clasificacion?: number;
  tiempo_tot?: string;
  dif_primero?: string;
  vueltas?: number;
  puntos_clasif: number;
  puntos_best_lap: number;
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
      { 
        position: 1, driver: "PABLO RECKE", time: "16:29:978",
        points: 98, peso: 102 ,kart: "23B", bestLap: "48.434",
        clasificacion: 0, tiempo_tot: "16:29.378",
        dif_primero: "-", vueltas: 20, puntos_best_lap: 5, puntos_clasif: 0 },
      { 
        position: 2, driver: "LUNA", time: "16:11:727",
        points: 83, peso: 100 ,kart: "25", bestLap: "48.659",
        clasificacion: 0, tiempo_tot: "16:44.727",
        dif_primero: "15.349", vueltas: 20, puntos_best_lap: 0, puntos_clasif: 0 },
      { 
        position: 3, driver: "NICO RECKE", time: "16:46:917",
        points: 64, peso: 87 ,kart: "94", bestLap: "48.528",
        clasificacion: 0, tiempo_tot: "16:46.917",
        dif_primero: "17.539", vueltas: 20, puntos_best_lap: 0, puntos_clasif: 0 },
      { 
        position: 4, driver: "NICO MIR", time: "16:54:627",
        points: 59, peso: 100 ,kart: "24", bestLap: "48.566",
        clasificacion: 1, tiempo_tot: "16:54.627",
        dif_primero: "25.249", vueltas: 20, puntos_best_lap: 0, puntos_clasif: 10},
      { 
        position: 5, driver: "MAXI", time: "16:41:072",
        points: 49, peso: 100 ,kart: "08", bestLap: "51.154",
        clasificacion: 0, tiempo_tot: "-",
        dif_primero: "1 vta", vueltas: 19, puntos_best_lap: 0, puntos_clasif: 0 },
      { 
        position: 6, driver: "WALTER", time: "16:51:765",
        points: 43, peso: 95 ,kart: "16", bestLap: "51.933",
        clasificacion: 0, tiempo_tot: "-",
        dif_primero: "2 vtas", vueltas: 18, puntos_best_lap: 0, puntos_clasif: 0 },
      { 
        position: 7, driver: "ALE MIR", time: "16:56.799",
        points: 39, peso: 100 ,kart: "11", bestLap: "52.130",
        clasificacion: 0, tiempo_tot: "-",
        dif_primero: "3 vtas", vueltas: 18, puntos_best_lap: 0, puntos_clasif: 0 },
      { 
        position: 8, driver: "DIEGO", time: "16:58:564",
        points: 34, peso: 100 ,kart: "09", bestLap: "50.863",
        clasificacion: 0, tiempo_tot: "-",
        dif_primero: "3 vtas", vueltas: 17, puntos_best_lap: 0, puntos_clasif: 0 },
      { 
        position: 9, driver: "MATI", time: "17:05:233",
        points: 29, peso: 100 ,kart: "11", bestLap: "49.568",
        clasificacion: 0, tiempo_tot: "-",
        dif_primero: "12 vtas", vueltas: 11, puntos_best_lap: 0, puntos_clasif: 0 },
    ],
    
  },
{
    id: "race-1",
    title: "Carrera 2",
    date: "08/04/2026",
    track: "Kartodromo Galvez",
    mode: "PROXIMAMENTE",
    description: "Segunda fecha del torneo",
    featured: true,
    podiumImage: "/kart-race.png",
    results: [

    ],
    
  },
];