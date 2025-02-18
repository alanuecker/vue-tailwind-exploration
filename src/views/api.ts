const API_KEY = import.meta.env.VITE_API_KEY;

interface SearchResult {
  count: number;
  items: Array<Item>;
}

export interface Item {
  id: string;
  objectNumber: string;
  title: string;
  longTitle: string;
  artist: string;
  image: string;
}

export async function getSearch(term: string): Promise<SearchResult> {
  try {
    const response = await fetch(
      `https://www.rijksmuseum.nl/api/en/collection?key=${API_KEY}&format=json&p=0&ps=20&q=${term}&imgonly=true`,
      { method: 'GET' },
    );

    if (!response.ok) {
      throw new Error(`Response status:, ${response.status}`);
    }

    const data = await response.json();

    return {
      count: data.count,
      items: data.artObjects.map(
        ({ id, objectNumber, title, longTitle, principalOrFirstMaker, webImage }) => {
          const imgProxyURL = generateUrl(
            {
              value: webImage.url,
              type: 'plain',
            },
            {
              width: 512,
              height: 512,
              format: 'webp',
              quality: 80,
            },
          );

          return {
            id,
            objectNumber,
            title,
            longTitle,
            artist: principalOrFirstMaker,
            image: new URL(imgProxyURL, IMGPROXY_URL).toString(),
          };
        },
      ),
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function getItem(objectNumber: string): Promise<Item> {
  try {
    const response = await fetch(
      `https://www.rijksmuseum.nl/api/en/collection/${objectNumber}?key=${API_KEY}&format=json`,
      { method: 'GET' },
    );

    if (!response.ok) {
      throw new Error(`Response status:, ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    const { id, title, longTitle, principalOrFirstMaker, webImage } = data.artObject;

    const imgProxyURL = generateUrl(
      {
        value: webImage.url,
        type: 'plain',
      },
      {
        format: 'webp',
      },
    );

    return {
      id,
      objectNumber,
      title,
      longTitle,
      artist: principalOrFirstMaker,
      image: new URL(imgProxyURL, IMGPROXY_URL).toString(),
    };
  } catch (error) {
    throw new Error(error);
  }
}
