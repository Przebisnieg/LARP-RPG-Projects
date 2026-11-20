# Interactive Technology Tree

An interactive technology research and progression system developed for a science-fiction Live Action Role-Playing (LARP) game.

The application allows users to explore different research categories, examine technology dependencies, unlock new developments, and track technological progress through an interactive interface.

| [Interactive Technology Tree](interactive-technology-tree/) | Interactive research system with technology dependencies, unlockable progression, and locally saved progress. | 2026 | [Live Demo](https://przebisnieg.github.io/LARP-RPG-Projects/interactive-technology-tree/) |

**Created:** 2026  
**Technologies:** HTML5, CSS3, JavaScript  
**Language:** Polish

## Project Background

This project was developed as a digital tool for a science-fiction LARP campaign featuring a fictional civilization called Hegemonia Titanum.

The goal was to present a complex technology system in a more accessible and interactive format, replacing the need to navigate extensive written documentation.

The application organizes technological advancements into separate research categories and represents their progression through interconnected technology levels.

## Features

- **Interactive technology trees** — explore multiple research categories and development paths.
- **Technology progression** — each research branch contains three levels of development.
- **Research categories** — browse Economy, Military, Science, Society, and Exploration technologies.
- **Technology dependencies** — higher levels require previous technologies to be researched.
- **Technology states** — distinguish between researched, available, and undiscovered technologies.
- **Interactive details** — click technologies to view their effects, requirements, and research status.
- **Technology unlocking** — simulate researching and unlocking new developments.
- **Progress persistence** — research progress is saved locally using the browser's `localStorage`.
- **Reset functionality** — restore the technology tree to its initial demonstration state.
- **Interactive navigation** — drag the research area to navigate larger technology trees.
- **Responsive interface** — layout adjustments for different screen sizes.

## Research Categories

| Category | Examples of Research Areas |
|---|---|
| Economy | Planetary farms, mines, energy production, housing, shipyards |
| Military | Fleet weapons, shields, propulsion, infantry equipment, fortifications |
| Science | Artificial intelligence, biotechnology, orbital technology, astronomy |
| Society | Administration, education, Roman law, military service |
| Exploration | Faster exploration, hyperspace gates, terraforming |

Each category contains multiple independent research branches with three levels of progression.

## Technologies

- **HTML5** — application structure and interface elements
- **CSS3** — visual styling, technology states, responsive layout, and animations
- **JavaScript (Vanilla JS)** — dynamic rendering, research logic, event handling, and interactive functionality
- **LocalStorage API** — local persistence of technology progression

No frontend framework or backend is required.

## Running the Project

1. Download or clone the repository.
2. Open `index.html` in a modern web browser.
3. Select a research category.
4. Click individual technologies to inspect their details.
5. Unlock available technologies to simulate research progression.
6. Use the reset button to clear the saved demonstration progress.

## Demo Mode

The application operates in demonstration mode.

Research progress is stored locally in the browser and does not affect any external game system or database.

Some technology effects are intentionally marked as undefined because their final values were not specified in the original game documentation.

## Language

The application interface and in-game content are primarily in **Polish**, as the project was developed for a Polish-speaking LARP community.

## Project Status

Personal, non-commercial frontend project developed for a science-fiction LARP campaign.

The application demonstrates interactive UI development, state management, conditional rendering, and browser-based data persistence.

This project was developed with the assistance of AI tools.
