// Function to filter fighters by weight division
export function filterByDivision(fighters, division) {
  if (division === '') return fighters;
  return fighters.filter((fighter) => fighter.division.short_name === division);
}

// Function to filter fighters by highest or lowest overall rating
export function filterByRating(fighters, order) {
  if (order === '') return fighters;
  return fighters.slice().sort((a, b) => {
    if (order === 'Highest') {
      return b.stats.overall - a.stats.overall;
    } else if (order === 'Lowest') {
      return a.stats.overall - b.stats.overall;
    }
    return 0;
  });
}