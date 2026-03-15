
import { POINTS_TABLE } from "../data/points";

export default function Puntos() {


  return (

<div className="main">
  <div className="racesHeroCard">
    <div className="sectionEyebrow">REGLAMENTO DE COMPETICIÓN</div>
    <h1 className="sectionTitle">Sistema de Puntuación</h1>
    <p className="sectionText">
      Los puntos se asignan según la posición final y la categoría de peso del piloto. 
      A mayor peso, mayor es la base de puntos para compensar el rendimiento del kart.
    </p>
  </div>

  <div className="compactResultsCard" style={{ marginTop: '24px' }}>
    <table className="compactRaceTableDetailed">
      <thead>
        <tr>
          <th>Pos</th>
          <th>% Base</th>
          {POINTS_TABLE.categories.map(cat => <th key={cat}>{cat}</th>)}
        </tr>
      </thead>
      <tbody>
        {POINTS_TABLE.rows.map((row, idx) => (
          <tr key={row.pos}>
            <td className="compactPosCell">{row.pos}º</td>
            <td style={{ opacity: 0.6 }}>{POINTS_TABLE.multipliers[idx]}</td>
            {row.values.map((val, i) => (
              <td key={i}>
                <span>{val}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Nota adicional para claridad */}
  <div className="heroInner" style={{ marginTop: '20px', padding: '15px' }}>
    <p className="compactText" style={{ fontSize: '0.85rem' }}>
      <strong>Nota:</strong> El sistema aplica un factor de corrección basado en el peso del piloto 
      para igualar las posibilidades de victoria en pista.
    </p>
    <p>🕒 Clasificar primero suma un 10% según el peso</p>
    <p style={{color: 'var(--fastest-lap)'}}>La vuelta rápida suma un 5% más de puntaje</p>
  </div>
</div>)}