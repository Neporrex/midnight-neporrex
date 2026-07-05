export type StormState = {
  flashIntensity: number;
  lastStrikeAt: number;
  strikeCount: number;
};

export const stormState: StormState = {
  flashIntensity: 0,
  lastStrikeAt: 0,
  strikeCount: 0,
};

if (typeof window !== 'undefined') {
  (window as any).__stormState = stormState;
}

export function triggerLightning(intensity = 1) {
  stormState.flashIntensity = intensity;
  stormState.lastStrikeAt = performance.now();
  stormState.strikeCount += 1;
}

export function decayFlash(dt: number) {
  stormState.flashIntensity = Math.max(0, stormState.flashIntensity - dt * 1.5);
}
