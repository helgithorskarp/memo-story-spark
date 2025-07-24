const DEFAULT_RUNWAY_KEY = 'g1cidphAZjPjJCvhPKmb7DZ7SVdCkHRq';

interface RunwareResponse {
  data?: { imageURL?: string }[];
  image_url?: string;
  output?: string[];
}

export async function editImage(childPhoto: string, templateImage: string): Promise<string> {
  const apiKey = import.meta.env.VITE_RUNWAY_API_KEY || DEFAULT_RUNWAY_KEY;
  const templateUrl = templateImage.startsWith('http')
    ? templateImage
    : new URL(templateImage, window.location.origin).href;

  const body = [
    { taskType: 'authentication', apiKey },
    {
      taskType: 'imageInference',
      taskUUID: crypto.randomUUID(),
      model: 'runware:100@1',
      inputImages: [childPhoto, templateUrl],
      numberResults: 1,
      outputFormat: 'WEBP'
    }
  ];

  const response = await fetch('https://api.runware.ai/v1', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Runware API error: ${text}`);
  }

  const data: RunwareResponse = await response.json();
  return (
    data.data?.[1]?.imageURL ||
    data.data?.[0]?.imageURL ||
    data.image_url ||
    data.output?.[0] ||
    ''
  );
}
