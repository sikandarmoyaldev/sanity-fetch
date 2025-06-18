/**
 * Configuration options for the Sanity client.
 */
export interface SanityClientOptions {
    projectId: string;
    dataset: string;
    apiVersion: string; // e.g., '2024-06-01'
    token?: string; // Optional: for private datasets
}

/**
 * Public Sanity client returned from createSanityClient().
 */
export interface SanityClient {
    fetch: <T = any>(query: string) => Promise<T>;
}

/**
 * Create a lightweight, fetch-based Sanity client.
 */
export function createClient(options: SanityClientOptions): SanityClient {
    const { projectId, dataset, apiVersion, token } = options;

    const baseUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`;

    /**
     * Perform a GROQ query.
     * @param query GROQ string
     * @returns Parsed result from Sanity
     */
    async function fetchQuery<T = any>(query: string): Promise<T> {
        const url = `${baseUrl}?query=${encodeURIComponent(query)}`;

        const response = await fetch(url, {
            headers: token
                ? {
                      Authorization: `Bearer ${token}`,
                  }
                : {},
        });

        let json;
        try {
            json = await response.json();
        } catch (e) {
            throw new Error(`Invalid JSON response from Sanity: ${e}`);
        }

        if (!response.ok || json.error) {
            const errorMessage =
                json?.error?.description ||
                json?.message ||
                `HTTP ${response.status} - ${response.statusText}`;
            throw new Error(`Sanity query failed: ${errorMessage}`);
        }

        return json.result;
    }

    return {
        fetch: fetchQuery,
    };
}
