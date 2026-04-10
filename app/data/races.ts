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
    track: "Kartódromo Gálvez Standard",
    mode: "22:00 hs",
    description: "Primera fecha del torneo, pista seca y ritmo muy parejo.",
    featured: true,
    podiumImage: "/kart-race.png",
    results: [
      { 
        position: 1, driver: "PABLO RECKE",
        points: 98, peso: 102 ,kart: "23B", bestLap: "48.434",
        clasificacion: 0, tiempo_tot: "16:29.378",
        dif_primero: "-", vueltas: 20, puntos_best_lap: 5,
        puntos_clasif: 0 },
      { 
        position: 2, driver: "DAMIAN LUNA",
        points: 83, peso: 100 ,kart: "25", bestLap: "48.659",
        clasificacion: 0, tiempo_tot: "16:44.727",
        dif_primero: "15.349", vueltas: 20, puntos_best_lap: 0,
        puntos_clasif: 0 },
      { 
        position: 3, driver: "NICO RECKE",
        points: 64, peso: 87 ,kart: "94", bestLap: "48.528",
        clasificacion: 0, tiempo_tot: "16:46.917",
        dif_primero: "17.539", vueltas: 20, puntos_best_lap: 0,
        puntos_clasif: 0 },
      { 
        position: 4, driver: "NICO MIR",
        points: 59, peso: 100 ,kart: "24", bestLap: "48.566",
        clasificacion: 1, tiempo_tot: "16:54.627",
        dif_primero: "25.249", vueltas: 20, puntos_best_lap: 0,
        puntos_clasif: 10},
      { 
        position: 5, driver: "MAXI",
        points: 49, peso: 100 ,kart: "08", bestLap: "51.154",
        clasificacion: 0, tiempo_tot: "-",
        dif_primero: "1 vta", vueltas: 19, puntos_best_lap: 0,
        puntos_clasif: 0 },
      { 
        position: 6, driver: "WALTER",
        points: 43, peso: 95 ,kart: "16", bestLap: "51.933",
        clasificacion: 0, tiempo_tot: "-",
        dif_primero: "2 vtas", vueltas: 18, puntos_best_lap: 0,
        puntos_clasif: 0 },
      { 
        position: 7, driver: "ALE MIR",
        points: 39, peso: 100 ,kart: "11", bestLap: "52.130",
        clasificacion: 0, tiempo_tot: "-",
        dif_primero: "3 vtas", vueltas: 18, puntos_best_lap: 0,
        puntos_clasif: 0 },
      { 
        position: 8, driver: "DIEGO",
        points: 34, peso: 100 ,kart: "09", bestLap: "50.863",
        clasificacion: 0, tiempo_tot: "-",
        dif_primero: "3 vtas", vueltas: 17, puntos_best_lap: 0,
        puntos_clasif: 0 },
      { 
        position: 9, driver: "MATI",
        points: 29, peso: 100 ,kart: "11", bestLap: "49.568",
        clasificacion: 0, tiempo_tot: "-",
        dif_primero: "12 vtas", vueltas: 11, puntos_best_lap: 0,
        puntos_clasif: 0 },
    ],
    
  },
  {
    id: "race-2",
    title: "Carrera 2",
    date: "08/04/2026",
    track: "Kartódromo Gálvez Standard (Sentido contrario)",
    mode: "21:30 hs",
    description: "GANADOR: JOAQUÍN (EXTERNO) tiempo: 18:41.468 mejor vta: 48.438",
    featured: true,
    podiumImage: "/kart-race.png",
    results: [
{ 
        position: 1, driver: "DAMIAN LUNA",
        points: 90, peso: 82 ,kart: "01", bestLap: "49.192",
        clasificacion: 0, tiempo_tot: "19:02.376",
        dif_primero: "20.908", vueltas: 20, puntos_best_lap: 5,
        puntos_clasif: 0 },
      { 
        position: 2, driver: "PABLO RECKE",
        points: 83, peso: 103 ,kart: "94", bestLap: "49.894",
        clasificacion: 0, tiempo_tot: "19:13.548",
        dif_primero: "32.080", vueltas: 20, puntos_best_lap: 0,
        puntos_clasif: 0 },
      { 
        position: 3, driver: "NICO MIR",
        points: 66, peso: 91 ,kart: "23B", bestLap: "49.874",
        clasificacion: 0, tiempo_tot: "16:46.917",
        dif_primero: "1 vta", vueltas: 19, puntos_best_lap: 0,
        puntos_clasif: 0 },
      { 
        position: 4, driver: "MAXI",
        points: 54, peso: 82 ,kart: "47", bestLap: "50.883",
        clasificacion: 0, tiempo_tot: "-",
        dif_primero: "2 vtas", vueltas: 18, puntos_best_lap: 0,
        puntos_clasif: 0},
      { 
        position: 5, driver: "NICO RECKE",
        points: 46, peso: 86 ,kart: "21B", bestLap: "50.194",
        clasificacion: 0, tiempo_tot: "-",
        dif_primero: "2 vtas", vueltas: 18, puntos_best_lap: 0,
        puntos_clasif: 0 },
      { 
        position: 6, driver: "MIGUEL",
        points: 39, peso: 71 ,kart: "25", bestLap: "52.181",
        clasificacion: 0, tiempo_tot: "-",
        dif_primero: "2 vtas", vueltas: 18, puntos_best_lap: 0,
        puntos_clasif: 0 },
      { 
        position: 7, driver: "AXEL",
        points: 37, peso: 89 ,kart: "16", bestLap: "51.951",
        clasificacion: 0, tiempo_tot: "-",
        dif_primero: "3 vtas", vueltas: 17, puntos_best_lap: 0,
        puntos_clasif: 0 },
      { 
        position: 8, driver: "FABIO",
        points: 35, peso: 110 ,kart: "10", bestLap: "52.110",
        clasificacion: 0, tiempo_tot: "-",
        dif_primero: "3 vtas", vueltas: 17, puntos_best_lap: 0,
        puntos_clasif: 0 },
      { 
        position: 9, driver: "FABIAN",
        points: 26, peso: 73 ,kart: "03", bestLap: "56.037",
        clasificacion: 0, tiempo_tot: "-",
        dif_primero: "4 vtas", vueltas: 16, puntos_best_lap: 0,
        puntos_clasif: 0 },
      { 
        position: 9, driver: "NAHUEL",
        points: 25, peso: 106 ,kart: "41", bestLap: "55.153",
        clasificacion: 0, tiempo_tot: "-",
        dif_primero: "4 vtas", vueltas: 16, puntos_best_lap: 0,
        puntos_clasif: 0 },
      { 
        position: 9, driver: "WALTER",
        points: 0, peso: 96 ,kart: "11", bestLap: "55.165",
        clasificacion: 0, tiempo_tot: "-",
        dif_primero: "5 vtas", vueltas: 15, puntos_best_lap: 0,
        puntos_clasif: 0 },
    
      ],
    
  },
  {
    id: "race-3",
    title: "Carrera 3",
    date: "ABRIL",
    track: "PRÓXIMAMENTE",
    mode: "hs",
    description: "",
    featured: true,
    podiumImage: "/kart-race.png",
    results: [
      ],
    
  },
];