const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default {
    async request(endpoint, method = 'GET', data = null) {
        const url = `${baseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const config = {
            method,
            headers
        };

        if (data) {
            config.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API request failed for ${url}:`, error);
            throw error;
        }
    },

    get(endpoint) {
        return this.request(endpoint);
    },

    post(endpoint, data) {
        return this.request(endpoint, 'POST', data);
    }
};