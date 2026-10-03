import { Platform } from 'react-native';

const defaultBaseUrl = Platform.OS === 'android'
  ? 'http://10.0.2.2:8080'
  : 'http://localhost:8080';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || defaultBaseUrl;

export async function getItems(token) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}/items`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  } catch {
    throw new Error('Não foi possível conectar ao servidor.');
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Não foi possível carregar os itens.');
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export async function createItem(token, payload) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}/items/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Não foi possível conectar ao servidor.');
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Não foi possível publicar o item.');
  }

  return response.json();
}
