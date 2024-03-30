'use client'
import { useState } from 'react';

function CreateApiKey() {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const createApiKey = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/generate-api-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Error al crear la clave API');
      }

      const data = await response.json();
      setApiKey(data.apiKey);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={createApiKey} disabled={loading}>
        {loading ? 'Creando...' : 'Crear Clave API'}
      </button>
      {apiKey && <p>Clave API: {apiKey}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default CreateApiKey;
