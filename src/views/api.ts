import { generateUrl } from '@imgproxy/imgproxy-js-core';

const API_KEY = import.meta.env.VITE_API_KEY;
const IMGPROXY_URL = 'http://localhost:8080';

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

export async function checkProxyHealth() {
  try {
    // todo: the IMGPROXY request does not provide a CORS header for this request
    // couldn't figure out why yet so I set the the mode to no-cors
    // and we just assume the service is working if it doesn't throw an error
    const response = await fetch(`${IMGPROXY_URL}/health`, { mode: 'no-cors' });

    // if (!response.ok) {
    //   return false;
    // }

    return true;
  } catch (error) {
    return false;
  }
}

export async function getSearch(
  term: string,
  proxyAvailable: boolean,
  page: number = 1,
): Promise<SearchResult> {
  try {
    const response = await fetch(
      `https://www.rijksmuseum.nl/api/en/collection?key=${API_KEY}&format=json&p=${page}&ps=20&q=${term}&imgonly=true`,
      { method: 'GET' },
    );

    if (!response.ok) {
      throw new Error(`Response status:, ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

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
            image: proxyAvailable ? new URL(imgProxyURL, IMGPROXY_URL).toString() : webImage.url,
          };
        },
      ),
    };
  } catch (error) {
    throw new Error(error);
  }
}

export async function getItem(objectNumber: string, proxyAvailable: boolean): Promise<Item> {
  try {
    const response = await fetch(
      `https://www.rijksmuseum.nl/api/en/collection/${objectNumber}?key=${API_KEY}&format=json`,
      { method: 'GET' },
    );

    if (!response.ok) {
      throw new Error(`Response status:, ${response.status}`);
    }

    const data = await response.json();

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
      image: proxyAvailable ? new URL(imgProxyURL, IMGPROXY_URL).toString() : webImage.url,
    };
  } catch (error) {
    throw new Error(error);
  }
}
