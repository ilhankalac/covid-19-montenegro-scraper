/** Pulls the publish date and a city's active cases out of a report page's text. */
function parseReport(text, city) {
  const date = text.split('Objavljeno:')[1]?.substring(0, 13).trim();
  if (!date || !text.includes(city)) return null;

  // The last mention of the city on the page is its table row; its first cells follow within ~31 chars.
  const row = (city + text.split(city).pop().substring(0, 31))
    .split('\n')
    .filter(cell => cell !== '' && cell !== '\t');

  if (row.length < 2) return null;
  return { date, activeCases: row[1] };
}

module.exports = { parseReport };
