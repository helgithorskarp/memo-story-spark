const DEFAULT_RUNWAY_KEY = 'g1cidphAZjPjJCvhPKmb7DZ7SVdCkHRq';

export async function editImage(childPhoto: string, templateImage: string): Promise<string> {
  const apiKey = import.meta.env.VITE_RUNWAY_API_KEY || DEFAULT_RUNWAY_KEY;

  const response = await fetch('https://api.runwayml.com/v1/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      input: {
        source_image: childPhoto,
        target_image: templateImage,
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Runway API error: ${text}`);
  }

  const data = await response.json();
  return data.image_url || data.output?.[0] || '';
}
