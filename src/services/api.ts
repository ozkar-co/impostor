const API_BASE_URL = 'https://forja-api.onrender.com';

// Types
export interface LoginRequest {
  username: string;
  password: string;
  site: string;
}

export interface LoginResponse {
  token: string;
  username: string;
}

export interface Word {
  _id: string;
  palabra: string;
  slug: string;
  creador: string;
  estado: 'activa' | 'suspendida';
  categoria: string;
  created_at: string;
}

export interface WordProposal {
  palabra: string;
  categoria?: string;
}

export interface OmittedWord {
  palabra: string;
  slug: string;
  razon: string;
}

export interface ProposeWordsResponse {
  palabras_creadas: Word[];
  total_creadas: number;
  palabras_omitidas?: OmittedWord[];
  total_omitidas?: number;
  message: string;
}

export interface CreateGameRequest {
  filtro_palabras: 'sistema' | 'todas';
  numero_impostores: number;
}

export interface GameInfo {
  id_partida: string;
  estado: 'abierta' | 'activa' | 'finalizada';
  fecha_inicio: string;
  creador: string;
  jugadores: string[];
  numero_impostores: number;
  num_jugadores: number;
  es_creador?: boolean;
  es_impostor?: boolean;
  palabra_secreta?: string;
  impostores?: string[];
  mensaje?: string;
}

// Token management
export const getToken = (): string | null => {
  return localStorage.getItem('impostor_token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('impostor_token', token);
};

export const clearToken = (): void => {
  localStorage.removeItem('impostor_token');
};

export const getUsername = (): string | null => {
  return localStorage.getItem('impostor_username');
};

export const setUsername = (username: string): void => {
  localStorage.setItem('impostor_username', username);
};

export const clearUsername = (): void => {
  localStorage.removeItem('impostor_username');
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// API call wrapper
const apiCall = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error de conexión o respuesta inválida' }));
    throw new Error(error.message || `Error: ${response.status}`);
  }

  return response.json();
};

// Authentication
export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const data = await apiCall<LoginResponse>('/login', {
    method: 'POST',
    body: JSON.stringify({ username, password, site: 'impostor' }),
  });
  
  setToken(data.token);
  // Usar el username del parámetro si la respuesta no lo contiene
  setUsername(data.username || username);
  return data;
};

export const logout = (): void => {
  clearToken();
  clearUsername();
};

// Words
export const proposeWords = async (palabras: WordProposal[]): Promise<ProposeWordsResponse> => {
  return apiCall<ProposeWordsResponse>('/impostor/palabras', {
    method: 'POST',
    body: JSON.stringify({ palabras }),
  });
};

export const listWords = async (filtro?: 'sistema' | 'todas', estado?: 'activa' | 'suspendida'): Promise<{ palabras: Word[]; count: number }> => {
  const params = new URLSearchParams();
  if (filtro) params.append('filtro', filtro);
  if (estado) params.append('estado', estado);
  
  const queryString = params.toString();
  return apiCall(`/impostor/palabras${queryString ? '?' + queryString : ''}`);
};

// Games
export const createGame = async (filtro_palabras: 'sistema' | 'todas', numero_impostores: number): Promise<{ message: string; id_partida: string; estado: string }> => {
  return apiCall('/impostor/partidas', {
    method: 'POST',
    body: JSON.stringify({ filtro_palabras, numero_impostores }),
  });
};

export const joinGame = async (gameId: string): Promise<{ message: string; id_partida: string }> => {
  return apiCall(`/impostor/partidas/${gameId}/join`, {
    method: 'POST',
  });
};

export const startGame = async (gameId: string): Promise<{ message: string; id_partida: string; estado: string; num_jugadores: number; num_impostores: number }> => {
  return apiCall(`/impostor/partidas/${gameId}/start`, {
    method: 'POST',
  });
};

export const getGameStatus = async (gameId: string): Promise<GameInfo> => {
  return apiCall(`/impostor/partidas/${gameId}/status`);
};

export const closeGame = async (gameId: string): Promise<{ message: string; id_partida: string; palabra_secreta: string; impostores: string[] }> => {
  return apiCall(`/impostor/partidas/${gameId}/close`, {
    method: 'POST',
  });
};

export const listMyGames = async (tipo?: 'creadas' | 'participadas' | 'todas'): Promise<{ partidas: GameInfo[]; count: number }> => {
  const params = new URLSearchParams();
  if (tipo) params.append('tipo', tipo);
  
  const queryString = params.toString();
  return apiCall(`/impostor/partidas/mis-partidas${queryString ? '?' + queryString : ''}`);
};
