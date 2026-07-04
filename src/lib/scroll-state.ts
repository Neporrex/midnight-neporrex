export type ScrollState = {
  progress: number;
  sceneIndex: number;
  setProgress: (p: number) => void;
  setSceneIndex: (i: number) => void;
};

export const scrollState = {
  progress: 0,
  sceneIndex: 0,
};

export const SCENE_COUNT = 4;

export const SCENE_Z_POSITIONS = [0, -40, -80, -120];

export const TOTAL_SCROLL_Z = -160;

export function getSceneFromProgress(progress: number): number {
  if (progress < 0.25) return 0;
  if (progress < 0.5) return 1;
  if (progress < 0.75) return 2;
  return 3;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}
