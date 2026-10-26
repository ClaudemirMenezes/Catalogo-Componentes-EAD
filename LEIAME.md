# Catálogo de Componentes EAD

Mesma arquitetura dos cursos PPU (Vue 3 via importmap, sem build).

## Rodar
Abrir a pasta num servidor local (ex.: Live Server do VS Code) e acessar `index.html`.
Fora do AVA, o `src/assets/libs/player-local.js` simula o player SE_UNASUS.

## Novo componente (3 passos)
1. `src/components/meuComp/meuComp.js` + `src/components/meuComp/style.css`
2. `src/global.js` → `import` + `app.component('MeuComp', MeuComp)`
3. `src/components/style.css` → `@import url(./meuComp/style.css);`

## Mostrar no catálogo
1. Copiar `src/pages/componentes/card.js` para `src/pages/componentes/meuComp.js` e adaptar
2. `src/register.js` → `const Comp_meuComp = defineAsyncComponent(...)` e incluir em `Pages`
3. `config.js` → `pages: { meuComp: ['Comp_meuComp'] }`
4. `src/templates/menu/menu.js` → `<Item links="meuComp">Meu Comp</Item>` dentro do grupo "Componentes"

Use `<ExemploComponente titulo="..." :codigo="exemplos.x">` para mostrar a demonstração com o código copiável.
