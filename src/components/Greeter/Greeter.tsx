import { createRoot } from "react-dom/client";

function Greeter() {
  return <h1>Hello</h1>;
}

createRoot(document.getElementById("root")!).render(<Greeter></Greeter>);
