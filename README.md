# Amusa Village

A browser-based pixel-art village and RPG, featuring exploration, resident friendships, fishing, homes, a mining city, caves and turn-based battles.

**Play:** https://shagy022.github.io/amusa-village/

## Controls

- Desktop: WASD or arrow keys to move; Shift to run; E to interact; F to fish; Escape to back out. Click characters for interactions. Walk into building doors.
- Android: open the link in a current Chrome browser and turn the phone sideways. Use the onscreen direction pad and Interact / Fish / Back buttons. Hold Run with a direction. During fishing, hold the reel button already shown in the fishing panel.
- Story dialogue pauses for Continue. Battle commands and menus are touch buttons.

## Saves and online behavior

Each browser has its own local save. The online game starts fresh, separately from the PC version. Clearing browser storage can erase that browser’s save. This version is single-player; visitors do not share a live village or see one another.

Bob is a regular, scripted NPC in this release. He can chat, follow, join the party and use ordinary resident interactions. AI services, task processing, private conversations and the original owner's saves are not part of this repository. No Ollama installation or API key is required.

Time and weather use the village’s configured Adel, Georgia conditions. Live weather needs an internet connection; the game can continue if a weather request fails.

## Development

This is a static site with no build step. Serve the folder over HTTP (for example `python -m http.server 8080`) and open it in a browser. The Phaser runtime is bundled under `vendor/` with its license. GitHub Pages publishes the `main` branch root; `.nojekyll` preserves the asset layout.

The desktop/local AI edition remains a separate project on the owner's PC. Source and art are published for hosting and backup; no additional reuse license is granted here. The Phaser license remains in `vendor/LICENSE.md`.
