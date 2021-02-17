
export default function Tension({ color = "#009845", ...props }) {
  return (
    <svg {...props} width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="26" cy="26" r="25.5" stroke={color} />
      <path d="M34.2249 7.10857L17.9199 32.6641L25.082 32.6641" stroke={color} />
      <path d="M18.4779 44.0536L34.0596 18.0508L26.9003 18.2517" stroke={color} />
    </svg>
  )
}
