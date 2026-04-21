function levenshteinDistance(a: string, b: string): number {
  const aLen = a.length;
  const bLen = b.length;

  if (aLen === 0) return bLen;
  if (bLen === 0) return aLen;

  const dp: number[][] = Array.from({ length: aLen + 1 }, () => Array(bLen + 1).fill(0));

  for (let i = 0; i <= aLen; i++) dp[i][0] = i;
  for (let j = 0; j <= bLen; j++) dp[0][j] = j;

  for (let i = 1; i <= aLen; i++) {
    for (let j = 1; j <= bLen; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1, // deletion
        dp[i][j - 1] + 1, // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return dp[aLen][bLen];
}

function similarity(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - levenshteinDistance(a, b) / maxLen;
}

function normalizeForBreedImageMatch(value: string): string {
  return value
    .toLowerCase()
    .replace(/dwarf/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "");
}

function getDatasetClassKey(imagePath: string): string | null {
  // Example: ../../cattle breed50.v1i.folder/test/Bargur/abc.jpg
  //          ../../cattle breed50.v1i.folder/train/Bargur/abc.jpg
  const match = imagePath.match(/(test|train)\/([^/]+)\//);
  return match?.[2] ?? null;
}

// Load one representative image per dataset class (from the `test` and `train` split).
// We do fuzzy matching because dataset folder names and app breed names differ slightly
// (underscores, spelling typos, and "dwarf" suffix).
const DATASET_TEST_IMAGE_URLS = import.meta.glob(
  "../../cattle breed50.v1i.folder/test/*/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const DATASET_TRAIN_IMAGE_URLS = import.meta.glob(
  "../../cattle breed50.v1i.folder/train/*/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const BREED_IMAGE_BY_DATASET_CLASS: Record<string, string> = {};
for (const [imagePath, url] of Object.entries(DATASET_TEST_IMAGE_URLS)) {
  const datasetClass = getDatasetClassKey(imagePath);
  if (!datasetClass) continue;
  // Keep the first image we encounter as the "hero" photo.
  if (!BREED_IMAGE_BY_DATASET_CLASS[datasetClass]) {
    BREED_IMAGE_BY_DATASET_CLASS[datasetClass] = url;
  }
}

for (const [imagePath, url] of Object.entries(DATASET_TRAIN_IMAGE_URLS)) {
  const datasetClass = getDatasetClassKey(imagePath);
  if (!datasetClass) continue;
  // Only fill missing classes from `train`.
  if (!BREED_IMAGE_BY_DATASET_CLASS[datasetClass]) {
    BREED_IMAGE_BY_DATASET_CLASS[datasetClass] = url;
  }
}

const DATASET_CLASSES_FOR_MATCH = Object.entries(BREED_IMAGE_BY_DATASET_CLASS).map(([datasetClass, url]) => ({
  datasetClass,
  url,
  normalized: normalizeForBreedImageMatch(datasetClass),
}));

const BREED_IMAGE_BY_NORMALIZED_CLASS: Record<string, string> = {};
for (const item of DATASET_CLASSES_FOR_MATCH) {
  if (!item.normalized) continue;
  if (!BREED_IMAGE_BY_NORMALIZED_CLASS[item.normalized]) {
    BREED_IMAGE_BY_NORMALIZED_CLASS[item.normalized] = item.url;
  }
}

export function getBreedHeroImageUrl(appBreedName: string): string | undefined {
  const target = normalizeForBreedImageMatch(appBreedName);
  if (!target) return undefined;

  const exact = BREED_IMAGE_BY_NORMALIZED_CLASS[target];
  if (exact) return exact;

  let best: { url: string; score: number } | null = null;
  for (const item of DATASET_CLASSES_FOR_MATCH) {
    const score = similarity(target, item.normalized);
    if (!best || score > best.score) best = { url: item.url, score };
  }

  // If the match is too weak, fall back to the alphabet letter.
  if (!best || best.score < 0.7) return undefined;
  return best.url;
}

