export function NumberStepper({ value, onChange, min = 1, max = 20 }) {
  return (
    <div className="num-stepper">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))}>−</button>
      <span className="val">{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))}>+</button>
    </div>
  )
}
