import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:4000",
    headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzI4NGNhMTYyMTk2YTg5NzE1MzI3YyIsInVzZXJuYW1lIjoidXNlcm5hbWUxMCIsImVtYWlsIjoidXNlcm5hbWUxMEB0ZXN0LmNvbSIsInJvbGUiOiJ1c2VyIn0sImlhdCI6MTc2NTE1MzgzNywiZXhwIjoxNzY1MjQwMjM3fQ.1n0iTTkG40hLxjSn2JcLTGgi4KNTNMhMraPpPQdkE7U'
    }
});
