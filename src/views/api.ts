interface SearchResult {
  total: number;
  objectIDs: Array<string>;
}

export interface ItemResult {
  objectID: string;
  title: string;
  artistDisplayName: string;
  objectBeginDate: number;
  objectEndDate: number;
  primaryImageSmall: string;
}

export async function getSearch(term: string): Promise<SearchResult> {
  try {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${term}`,
    );

    if (!response.ok) {
      throw new Error(`Response status:, ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getItem(objectID: string): Promise<ItemResult> {
  try {
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
      { method: 'GET' },
    );

    if (!response.ok) {
      throw new Error(`Response status:, ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

    const { title, artistDisplayName, objectBeginDate, objectEndDate, primaryImageSmall } = data;

    return {
      objectID,
      title,
      artistDisplayName,
      objectBeginDate,
      objectEndDate,
      primaryImageSmall,
    };
  } catch (error) {
    throw new Error(error);
  }
}
