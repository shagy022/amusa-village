# Amusa Dwarf Blacksmith Warrior — Complete Sprite & Pose Pack

All files are transparent-background RGBA PNGs crafted in Amusa's 16-bit pixel-art style.

## Top-Level Sprite Sheets (Ready for Phaser / CSS)
- **dwarf-sheet.png** (1086 × 1448 px, 3 columns × 4 rows):
  - Standard Amusa walking/overworld sprite sheet (matches clara-sheet.png and excalibur-sheet.png dimensions).
  - Row 1: Walk Down (left step, neutral idle, right step)
  - Row 2: Walk Left (left step, neutral idle, right step)
  - Row 3: Walk Right (left step, neutral idle, right step)
  - Row 4: Walk Up / Back view (showing his bald head, leather apron straps, and huge double-bladed battle axe strapped on his back)
- **dwarf-all-combat-and-axe-sheet.png** (1200 × 896 px, 4 columns × 3 rows):
  - All 12 combat, throwing, pickpocketing, charging, and battle-axe cleave poses on one transparent sheet.
- **dwarf-axe-animation-strip.png** (1200 × 300 px, 4 frames of 300 × 300 px):
  - Dedicated 4-frame Huge Battle-Axe Cleave animation: Ready Stance → Overhead Windup → Blazing Heavy Cleave → Ground Slam Impact.
- **dwarf-combat-row-slash.png** (1422 × 158 px, 9 columns of 158 × 158 px):
  - Direct drop-in row for Amusa's combat-atlas.png using the Melee Battle-Axe Slash in Column 4 (melee) and Throwing Hammer in Column 5 (ranged).
- **dwarf-combat-row-cleave.png** (1422 × 158 px, 9 columns of 158 × 158 px):
  - Direct drop-in row for Amusa's combat-atlas.png using the Heavy Overhead Battle-Axe Cleave in Column 4 (melee).
- **combat-atlas-with-elf-and-dwarf.png** (1422 × 1422 px, 9 columns × 9 rows):
  - Amusa's existing combat-atlas.png with the Female Elf Archer as Row 8 (index 7) and the Dwarf Blacksmith Warrior as Row 9 (index 8).

## Individual Pose PNGs (poses/)
- **poses/walking/** — All 12 directional walking and idle frames (362 × 362 px each).
- **poses/combat_and_actions/** — All 12 action frames (300 × 300 px each):
  - dwarf_01_ready_stance.png
  - dwarf_02_punch_attack.png
  - dwarf_03_kick_attack.png
  - dwarf_04_melee_axe_slash.png
  - dwarf_05_throw_hammer.png
  - dwarf_06_hurt_recoil.png
  - dwarf_07_down_defeated.png
  - dwarf_08_pickpocket_sneak.png
  - dwarf_09_run_charge.png
  - dwarf_10_axe_windup_overhead.png
  - dwarf_11_axe_heavy_cleave.png
  - dwarf_12_axe_ground_slam.png
- **poses/axe_cleave_sequence/** — The 3 dedicated overhead windup, heavy cleave, and ground slam impact frames (300 × 300 px each).
