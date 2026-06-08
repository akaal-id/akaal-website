/**
 * Computes wide-card flags for the 3-column newsroom editorial grid.
 * Each row holds 2 cards (wide spans 2 cols, normal spans 1).
 * Odd rows:  wide + normal
 * Even rows: normal + wide
 */
export function getNewsroomWideFlags(total: number): boolean[] {
  const flags: boolean[] = [];

  for (let i = 0; i < total; i += 1) {
    const row = Math.floor(i / 2);
    const posInRow = i % 2;
    const isOddRow = row % 2 === 0;

    if (isOddRow) {
      flags.push(posInRow === 0);
    } else {
      flags.push(posInRow === 1);
    }
  }

  return flags;
}
