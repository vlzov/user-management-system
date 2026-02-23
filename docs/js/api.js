const API_BASE = "http://127.0.0.1:5000/users";

async function apiRequest(url, options = {}) {
    const response = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...options
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data.data;
}

export { apiRequest, API_BASE };