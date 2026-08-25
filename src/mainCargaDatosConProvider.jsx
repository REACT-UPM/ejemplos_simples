import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import CargaDatosReactQuery from "./cargaDatos/CargaDatosReactQuery.jsx";

// Punto de entrada alternativo a main.jsx, solo para el ejemplo de
// react-query: useSuspenseQuery necesita que exista un QueryClient (aquí
// vive la caché) y que los componentes que lo usan estén envueltos en un
// <QueryClientProvider> que lo reparta por contexto.
//
// Para probar este ejemplo, cambia en index.html la línea
//   <script type="module" src="/src/main.jsx"></script>
// por
//   <script type="module" src="/src/mainCargaDatosConProvider.jsx"></script>
// (o copia el QueryClientProvider dentro de main.jsx).
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CargaDatosReactQuery />
    </QueryClientProvider>
  </StrictMode>,
);
