import axios from "axios";


export const client = axios.create({
    baseURL:  import.meta.env.VITE_BACKEND_URL,
    headers: {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      // 'Content-Type': 'multipart/form-data' 
    },
    withCredentials: true,
    // withXSRFToken: true
  });

client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


// Request users
export const login = (credentials)=> client.post('/api/login', credentials);

export const logout = ()=> client.post("/api/logout");

export const getUser = async ()=> await client.get("/api/users/me");

export const createUser = (user)=> client.post("/api/users", user);

export const updateUser = (user)=> client.post("/api/users/edit", user)

export const deleteUser = ()=> client.delete("/api/users");

// Request Spaces
export const getSpaces = async ()=> await client.get("/api/spaces");

export const createSpace = (space)=> client.post("/api/spaces", space);

export const showSpace = async (slug)=> await client.get(`api/spaces/${slug}`);

export const updateSpace = (space)=> client.put(`/api/spaces/${space.id}`, space);

export const deleteSpace = (id)=> client.delete(`/api/spaces/${id}`);

// Request Links
export const createLink = (link)=> client.post("/api/links", link);

export const showLink = async (short)=> await client.get(`api/links/${short}`);

export const updateLink = (link)=> client.put(`/api/links/${link.id}`, link);

export const deleteLink = (id)=> client.delete(`/api/links/${id}`);

// export const csrf = ()=> axios.get('/sanctum/csrf-cookie');



