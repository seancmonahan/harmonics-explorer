/*
 * Helper functions for calculating sine curves and their combinations
 */
import { List, Range } from 'immutable';

// Calculate a number of samples for a sine wave oscillator
export function calculateSineCurve(
  frequency: number,
  amplitude: number,
  sampleCount: number,
  sampleRate: number
) {
  return Range(0, sampleCount)
    .map(sampleNumber => calculateSample(frequency, amplitude, sampleNumber, sampleRate));
}

// Calculate an individual value for a sine curve.
function calculateSample(
  frequency: number,
  amplitude: number,
  sampleNumber: number,
  sampleRate: number
) {
  // How many radians per second does the oscillator go?
  const angularFrequency = frequency * 2 * Math.PI;
  // What's the "time" of this sample in our curves?
  const sampleTime = sampleNumber / sampleRate;
  // What's the angle of the oscillator at this time?
  const sampleAngle = sampleTime * angularFrequency;
  // What's the value of the sinusoid for this angle?
  return amplitude * Math.sin(sampleAngle);
}


// Combine a number of wave partials.
export function combineCurves(partials: List<List<number>>, gain: number) {
  const sampleCount = partials.first().size;
  const combinedSamples = Range(0, sampleCount)
    .map(sampleNumber => calculateCombinedSample(partials, sampleNumber)).toList();
  return normalized(combinedSamples, gain);
}

// Calculate a single sample for the combined curve of a number of partials.
function calculateCombinedSample(partials: List<List<number>>, sampleNumber: number) {
  // Sum up the values of all the sine waves for this particular sample.
  const sum = partials
    .map(p => p.get(sampleNumber))
    .reduce((sum, s) => sum + s, 0);
  return sum;
}

export function normalized(combinedSamples: List<number>, gain: number) {
  const sampleCount = combinedSamples.size;
  const rootMeanSquare = Math.sqrt(
    combinedSamples
      .map(s => s * s)
      .reduce((sum, s) => sum + s, 0) / sampleCount);
  const k = gain / rootMeanSquare;
  return combinedSamples.map(s => s * k);
}
