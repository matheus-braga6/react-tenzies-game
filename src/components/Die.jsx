export default function Die ({value, isHeld, hold}) {
  const pipPositions = {
    1: [5],
    2: [1, 9],
    3: [1, 5, 9],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9],
  };

  return (
    <button 
      className={`single-die ${isHeld ? "held" : ""}`} 
      onClick={hold}
      aria-label={`Die with value ${value}, ${isHeld ? "held" : "not held"}`}
    >
      {pipPositions[value].map(pos => (
        <span key={pos} className={`pip pip-${pos}`} />
      ))}
    </button>
  )
}