const CACHE_NAME = 'kalax-v4';
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js'
];

// Face model weight files from the working GitHub Raw URL
const faceWeightsBase = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';
const faceFiles = [
  'tiny_face_detector_model-shard1',
  'tiny_face_detector_model-weights_manifest.json',
  'face_landmark_68_model-shard1',
  'face_landmark_68_model-weights_manifest.json',
  'face_recognition_model-shard1',
  'face_recognition_model-shard2',
  'face_recognition_model-weights_manifest.json'
];
faceFiles.forEach(file => urlsToCache.push(`${faceWeightsBase}/${file}`));

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});