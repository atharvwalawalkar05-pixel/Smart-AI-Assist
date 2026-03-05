import * as tf from '@tensorflow/tfjs';

let modelPromise = null;

export async function loadDetector() {
  if (!modelPromise) {
    modelPromise = (async () => {
      await tf.ready();
      const coco = await import('@tensorflow-models/coco-ssd');
      const model = await coco.load({ base: 'lite_mobilenet_v2' });
      return model;
    })();
  }
  return modelPromise;
}

export async function detectObjectsFromVideo(video) {
  const model = await loadDetector();
  const predictions = await model.detect(video);
  return predictions;
}

export function verbalize(predictions, videoWidth) {
  const MIN_SCORE = 0.5;
  const results = [];
  predictions
    .filter((p) => p.score >= MIN_SCORE)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .forEach((p) => {
      const [x, , w] = p.bbox;
      const center = x + w / 2;
      const side = center < videoWidth * 0.35 ? 'on your left' : center > videoWidth * 0.65 ? 'on your right' : 'ahead';
      const area = (w * p.bbox[3]) / (videoWidth * videoWidth);
      const proximity = area > 0.12 ? 'near' : area > 0.05 ? 'ahead' : 'far';
      results.push(`${capitalize(p.class)} ${side}${proximity === 'near' ? ', close' : ''}`);
    });
  return results.length ? results : ['No confident objects detected'];
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
