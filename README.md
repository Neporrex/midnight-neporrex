# midnight-neporrex

> A scroll-driven 3D manifesto. Built loud, on a broken white background, with no apologies.

This is my take on the cinematic scroll-jacking thing SBS did with "The Boat", but stripped down to pure neo-brutalism. Black ink on cream. Hard edges. No gradients. No rounded corners. A camera flies forward through four scenes while you scroll, and chunky HTML cards slide over the top of it.

## what it is

A single-page Next.js site where:

- The 3D canvas is pinned to the viewport (position fixed) while a 500vh virtual scroll container does the work underneath.
- GSAP ScrollTrigger maps scroll progress (0 to 1) to the camera's Z position. The camera flies forward through a long corridor.
- Four scenes are stacked along the Z axis:
  1. **THE TITLE** - extruded 3D text that rotates harshly on Y as you scroll.
  2. **THE GRID** - wireframe floor and ceiling, black cubes and red spheres punching past the lens at different parallax speeds.
  3. **RAW CREATION** - a chunky brutalist panel slides in from the right while monospace letters swirl around in the 3D background.
  4. **THE DROP** - a giant black cube scales up to swallow the screen, then hands off to the contact footer.
- A fixed nav bar, a right-side scroll progress bar, and a bottom-left scene indicator stay glued to the screen the whole time.

## the stack

- **Next.js 16** (App Router, TypeScript)
- **React Three Fiber + @react-three/drei** for the 3D layer
- **GSAP ScrollTrigger** for the scroll-jacking
- **Tailwind CSS 4** for the overlay UI
- **three.js** under the hood

## design system

- Background: broken white `#F2F0E9` everywhere, both HTML and 3D.
- Accent colors: pure red `#FF3131`, electric blue `#0000FF`, pure black `#000000`.
- Every overlay has `2-4px` solid black borders and a solid hard-edged drop shadow (`8px 8px 0px #000`).
- Zero border radius. Anywhere. Ever.
- Typography: **Archivo Black** for display, **Space Grotesk** for sans body, **JetBrains Mono** for raw monospace labels.

## run it locally

```bash
bun install
bun run dev
```

Then open http://localhost:3000 and scroll.

If you want to lint:

```bash
bun run lint
```

## how the scroll works

There's a single ScrollTrigger instance pinned to the tall virtual container. On every update it writes `progress` into a plain mutable object (`scrollState`). The R3F `useFrame` loop reads that same object every frame and lerps the camera's Z position toward the target. No React state, no re-renders, just a number flying between two systems.

Each scene has its own `useFrame` that fades itself in and out based on `smoothstep` windows over `progress`. So the title is visible from 0% to about 25%, the grid from 22% to 52%, the letters from 50% to 77%, and the drop from 72% to 100%. Small overlaps make the cuts feel less robotic.

## file layout

```
src/
  app/
    globals.css         # tailwind + brutalist design tokens
    layout.tsx          # fonts + metadata
    page.tsx            # the whole composition: canvas + scroll container + overlays
  components/
    scene3d/
      Scene3DCanvas.tsx # the pinned R3F Canvas, fog rig, camera rig
      ScrollSetup.tsx   # GSAP ScrollTrigger glue
      TitleScene.tsx    # scene 1: extruded 3D text
      GridScene.tsx     # scene 2: wireframe tunnel + flying objects
      LettersScene.tsx  # scene 3: swirling monospace letters
      DropScene.tsx     # scene 4: the giant scaling cube
    ui-overlay/
      Navbar.tsx
      ScrollProgress.tsx
      SceneIndicator.tsx
      StickyPanel.tsx   # the "RAW CREATION" card that slides in
      ContactFooter.tsx
  lib/
    scroll-state.ts     # the shared mutable scroll object + helpers
public/
  fonts/
    helvetiker_bold.typeface.json   # used by drei's Text3D
```

## stuff i'd change in a v2

- The font loading for `Text3D` is a bit heavy. Troika text would be lighter but it's flat, not extruded.
- The flying objects in scene 2 could use instancing for a denser tunnel feel.
- Mobile scroll-jacking is always a fight. Works, but I'd want to test on more devices.

## credits

Built by me, neporrex_.

- GitHub: https://github.com/Neporrex
- X: https://x.com/neporrex_
- Discord: neporrex_

Inspired by SBS's "The Boat" scroll experience. The 3D scroll-jacking pattern is theirs. The aesthetic is mine.
