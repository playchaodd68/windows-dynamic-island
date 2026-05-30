import { describe, expect, it } from 'vitest';
import { getIslandBounds } from '../main/window-position';

describe('getIslandBounds', () => {
  it('centers the compact island near the top of the display work area', () => {
    expect(
      getIslandBounds({
        workArea: { x: 0, y: 0, width: 1920, height: 1080 },
        size: { width: 360, height: 68 },
        topOffset: 14
      })
    ).toEqual({
      x: 780,
      y: 14,
      width: 360,
      height: 68
    });
  });

  it('uses display offsets for secondary displays', () => {
    expect(
      getIslandBounds({
        workArea: { x: 1920, y: 40, width: 1440, height: 900 },
        size: { width: 420, height: 540 },
        topOffset: 20
      })
    ).toMatchObject({
      x: 2430,
      y: 60
    });
  });
});
