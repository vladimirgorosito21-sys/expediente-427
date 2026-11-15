# Expediente 427 · Wingows

Expansión transmedia interactiva de *The Stanley Parable*. Stanley busca en su computadora de
trabajo por qué la oficina quedó vacía. Quien juega recorre el escritorio de Wingows, encuentra
las pistas en los documentos y abre el Expediente 427.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # genera dist/
npm run preview    # sirve dist/ localmente
```

Para saltar la intro durante las pruebas: `http://localhost:5173/?escritorio`

## Publicar en GitHub Pages

1. Crear el repositorio en GitHub y subir el proyecto a la rama `main`.
2. En el repositorio: **Settings → Pages → Source: GitHub Actions**.
3. Cada push a `main` ejecuta `.github/workflows/deploy.yml` y publica el sitio en
   `https://<usuario>.github.io/<repositorio>/`.

## Dónde está cada cosa

| Qué | Archivo |
|---|---|
| Líneas del narrador (diálogos, pistas, finales) | `src/narrator/lines.js` |
| Contraseña (`ME11`) y lógica del juego | `src/components/Desktop.jsx` |
| Manual del empleado (pista **ME**) | `src/components/windows/ManualWindow.jsx` |
| Informe de personal (pista **11**) | `src/components/windows/InformeWindow.jsx` |
| Texto del Expediente 427 | `src/components/windows/ExpedienteWindow.jsx` |
| Cámaras (para sumar videos propios, ver el comentario en el archivo) | `src/components/windows/CamarasWindow.jsx` |
| Reproductor Wingamp (pista de Spotify) | `src/components/WingampPlayer.jsx` |
| Créditos (completar nombres y roles) | `src/components/CreditsContent.jsx` |
| Pantallas de inicio y finales | `src/components/BootScreen.jsx`, `src/components/EndingScreen.jsx` |

## Licencia

© 2026 Vladimir Gorosito. Todo el proyecto (contenido original y código fuente) se publica bajo
[Creative Commons Atribución-CompartirIgual 4.0 Internacional (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/deed.es).
El texto legal completo está en [`LICENSE`](LICENSE).

Se puede compartir y adaptar libremente, citando la autoría e indicando si se hicieron cambios. Las obras
derivadas tienen que publicarse con la misma licencia.

*The Stanley Parable*, su logotipo y su universo pertenecen a sus autores (Davey Wreden, William Pugh,
Galactic Cafe / Crows Crows Crows) y se usan con fines académicos. Los recursos de terceros (íconos,
tipografías, música) conservan sus licencias; el detalle está en la sección de créditos del sitio.
