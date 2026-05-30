export interface WorkArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IslandSize {
  width: number;
  height: number;
}

export interface IslandBoundsInput {
  workArea: WorkArea;
  size: IslandSize;
  topOffset: number;
}

export interface IslandBounds extends IslandSize {
  x: number;
  y: number;
}

export function getIslandBounds({ workArea, size, topOffset }: IslandBoundsInput): IslandBounds {
  return {
    x: Math.round(workArea.x + (workArea.width - size.width) / 2),
    y: Math.round(workArea.y + topOffset),
    width: size.width,
    height: size.height
  };
}
