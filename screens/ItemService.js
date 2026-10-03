const API_URL = 'http://localhost:8080';

export async function getItems(token) {
  const response = await fetch(`${API_URL}/items`, {
    method: 'GET',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
      data?.error ||
      `Erro ao buscar itens (${response.status})`
    );
  }

  if (!Array.isArray(data)) {
    throw new Error(
      'O servidor não retornou uma lista de itens.'
    );
  }

  return data;
}