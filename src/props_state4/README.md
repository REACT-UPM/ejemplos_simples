# props_state4 - props.children básico

Este ejemplo muestra el potencial de `props.children` para reutilizar componentes.

Componentes:
- `Card.jsx`: contenedor reutilizable con `title`, `footer` y `children`.
- `ChildrenDemo.jsx`: muestra tres usos diferentes de `Card`.

Usos demostrados:
1. `Card` con texto simple como `children`.
2. `Card` con contenido mixto (lista + botón) y `footer` opcional.
3. `Card` anidado (composición + `children`).

Cómo probar:
- Importa `ChildrenDemo` en tu `main.jsx` o donde quieras verlo y renderízalo.
