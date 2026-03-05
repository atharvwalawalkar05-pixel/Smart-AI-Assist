import * as tf from '@tensorflow/tfjs';

let loaded = false;

export async function ensureTFMockReady() {
  if (loaded) return true;
  await tf.ready();
  loaded = true;
  return true;
}
