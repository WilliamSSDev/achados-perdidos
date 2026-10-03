import { Platform } from 'react-native';

const defaultBaseUrl = Platform.OS === 'android'
  ? 'http://10.0.2.2:8080'
  : 'http://localhost:8080';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || defaultBaseUrl;

const API_URL = 'http://localhost:8080';

export async function registerUser(payload) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Não foi possível conectar ao servidor.');
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Não foi possível criar a conta.');
  }
}

// LOGIN
export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  let data;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
      data?.error ||
      'E-mail ou senha inválidos.'
    );
  }

  return data;
}
