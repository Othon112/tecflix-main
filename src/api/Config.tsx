import axios, { AxiosInstance, AxiosResponse } from "axios";

class NetworkService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "https://api.themoviedb.org", // Cambia la URL base a la de tu API
      timeout: 100000, // Tiempo máximo de espera de 10 segundos
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Interceptor para respuestas
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        if (error.response) {
          console.error("Error en la respuesta:", error.response);
        } else {
          console.error("Error de red o desconocido:", error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  // Ejemplo de una función para obtener token de almacenamiento seguro
  private async getToken(): Promise<string | null> {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MGJkOWZkZTljYjQ5NGI1ZGYyZDE1OWRkNjFhODVmMCIsIm5iZiI6MTcyNTkxMTQ3Ni45Njc3MjMsInN1YiI6IjY2ZGY1MTI3ODI4MmJhYTZkN2Y2MjJmNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FUzdRWUrdTMMXSjntSMKmLqHlR3icQs1YyGmQxXho2w"; // Reemplazar por la lógica real
      return token;
    } catch (error) {
      console.error("Error al obtener el token:", error);
      return null;
    }
  }

  // Método para realizar una solicitud GET
  public async get<T>(
    endpoint: string,
    params: Record<string, unknown> = {}
  ): Promise<T> {
    const token = await this.getToken();
    try {
      const response: AxiosResponse<T> = await this.api.get(endpoint, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Método para realizar una solicitud POST
  public async post<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async put<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async delete<T>(endpoint: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.delete(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async postMultipart<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.post(endpoint, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  // Agrega otros métodos (PUT, DELETE) según sea necesario
}

const networkService = new NetworkService();
export default networkService;
