# Amusa Female Elf Archer — Complete Sprite & Pose Pack

All files are transparent-background RGBA PNGs crafted in Amusa's 16-bit pixel-art style.

## Top-Level Sprite Sheets (Ready for Phaser / CSS)
- **elf-sheet.png** (1086 × 1448 px, 3 columns × 4 rows):
  - Standard Amusa walking/overworld sprite sheet (matches clara-sheet.png and excalibur-sheet.png dimensions).
  - Row 1: Walk Down (left step, neutral idle, right step)
  - Row 2: Walk Left (left step, neutral idle, right step)
  - Row 3: Walk Right (left step, neutral idle, right step)
  - Row 4: Walk Up / Back view (showing braided blonde hair, curved elven bow strapped on back, and leather quiver with feathered arrows)
- **elf-all-combat-and-bow-sheet.png** (1200 × 896 px, 4 columns × 3 rows):
  - All 12 combat, throwing, pickpocketing, running, and elven bow-pulling poses on one transparent sheet.
- **elf-bow-animation-strip.png** (1200 × 300 px, 4 frames of 300 × 300 px):
  - Dedicated 4-frame Elven Bow firing animation: Ready Stance → Pulling Bowstring (Draw) → Full Aim → Arrow Release.
- **elf-combat-row-bow.png** (1422 × 158 px, 9 columns of 158 × 158 px):
  - Direct drop-in row for Amusa's combat-atlas.png using the Elven Bow aim pose in Column 5 (ranged).
- **elf-combat-row-throw.png** (1422 × 158 px, 9 columns of 158 × 158 px):
  - Direct drop-in row for Amusa's combat-atlas.png using the Throwing / Magic pose in Column 5 (ranged).
- **combat-atlas-with-elf.png** (1422 × 1264 px, 9 columns × 8 rows):
  - Amusa's existing combat-atlas.png with the Female Elf Archer appended as Row 8 (index 7).

## Individual Pose PNGs (poses/)
- **poses/walking/** — All 12 directional walking and idle frames (362 × 362 px each).
- **poses/combat_and_actions/** — All 12 action frames (300 × 300 px each):
  - elf_01_ready_stance.png
  - elf_02_punch_attack.png
  - elf_03_kick_attack.png
  - elf_04_melee_slash.png
  - elf_05_throw_or_magic.png
  - elf_06_hurt_recoil.png
  - elf_07_down_defeated.png
  - elf_08_pickpocket_sneak.png
  - elf_09_run_dash.png
  - elf_10_bow_draw_pull.png
  - elf_11_bow_full_aim.png
  - elf_12_bow_release_shoot.png
- **poses/bow_sequence/** — The 3 dedicated bow-pulling, aiming, and shooting frames (300 × 300 px each).
