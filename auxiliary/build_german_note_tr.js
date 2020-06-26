/**
 * Outputs a JSON-style translation table for musical notes from english notation to
 * german notation (used in Germany, Poland, Czech Republic, Russia, Slovenia, etc.)
 * (source: http://www.sengpielaudio.com/calculator-notenames.htm)
 *
 * Use this as a helper script to create translation files.
 */

const noteNames = {
  "C": "C",
  "C#": "Cis",
  "D": "D",
  "D#": "Dis",
  "E": "E",
  "F": "F",
  "F#": "Fis",
  "G": "G",
  "G#": "Gis",
  "A": "A",
  "A#": "B",
  "B": "H",
};
const minOctave = 0;
const maxOctave = 7;

function translateNoteName(note, octave) {
  switch(octave) {
    case 0: return `,,${noteNames[note]}`;
    case 1: return `,${noteNames[note]}`;
    case 2: return noteNames[note];
    case 3: return `${noteNames[note].toLowerCase()}`;
    case 4: return `${noteNames[note].toLowerCase()}'`;
    case 5: return `${noteNames[note].toLowerCase()}''`;
    case 6: return `${noteNames[note].toLowerCase()}'''`;
    case 7: return `${noteNames[note].toLowerCase()}''''`;
  }
}

for (let octave = minOctave; octave <= maxOctave; octave += 1) {
  Object.keys(noteNames).forEach((note) => {
    console.log(`"${note}${octave}": "${translateNoteName(note, octave)}",`);
  });
}

