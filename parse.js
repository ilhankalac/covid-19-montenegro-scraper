const CITY = 'Rožaje';

/** Pulls the publish date and Rožaje's active cases out of a report page's text. */
function parseReport(text) {
  const date = text.split('Objavljeno:')[1]?.substring(0, 13).trim();

  // The last "Rožaje" on the page is the table row; its first cells follow within ~31 chars.
  const row = (CITY + text.split(CITY).pop().substring(0, 31))
    .split('\n')
    .filter(cell => cell !== '' && cell !== '\t');

  if (!date || row.length < 2) return null;
  return { date, activeCases: row[1] };
}

module.exports = { parseReport };
