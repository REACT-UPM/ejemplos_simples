import React, { useState } from 'react';
import './FetchIA.css';
import ReactMarkdown from 'react-markdown';

//sustituir por tu API de GROG: https://console.groq.com/keys
const GROQ_API_KEY = "YOUR_API_KEY";

export default function FetchIA({ genres: genresProp, endpoint = '/recommend' }) {
  const genres = genresProp && genresProp.length
    ? genresProp
    : [
        'Fantasía',
        'Ciencia ficción',
        'Misterio',
        'Romance',
        'No ficción',
        'Aventura',
        'Histórica',
      ];

  const [form, setForm] = useState({
    genre: '',
    author: '',
    recent_books: '',
    reading_level: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  //llamamos al API de Groq para generar un resumen de los comentarios que tenemos
	/*EXAMPLE: curl https://api.groq.com/openai/v1/chat/completions -s \
	-H "Content-Type: application/json" \
	-H "Authorization: Bearer $GROQ_API_KEY" \
	-d '{
	"model": "llama-3.3-70b-versatile",
	"messages": [{
		"role": "user",
		"content": "Explain the importance of fast language models"
	}]
	}'
	*/
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecommendation('');
    try {
        let prompt = "Recomiéndame un libro basado en las siguientes preferencias:\n";
        prompt += `Género: ${form.genre}\n`;
        prompt += `Autor favorito: ${form.author}\n`;
        prompt += `Libros leídos recientemente: ${form.recent_books}\n`;
        prompt += `Nivel de lectura: ${form.reading_level}\n`;
        prompt += "Proporciona una recomendación breve y concisa.";
    
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{
                role: "user",
                content: prompt
            }]
            })
        });
    
        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            setRecommendation(data.choices[0].message.content);
        } else {
            setError('No se pudo obtener una recomendación. Intenta de nuevo.');
        }
    } catch (err) {
      setError('Ocurrió un error. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fetchia-root">
      <div className="container">
        <h1>Sistema de Recomendación de Libros</h1>
        <form onSubmit={onSubmit} id="recommendationForm">
          <div className="form-group">
            <label htmlFor="genre">Género Literario:</label>
            <select id="genre" name="genre" required value={form.genre} onChange={onChange}>
              <option value="">Selecciona un género</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="author">Autor Favorito:</label>
            <textarea
              id="author"
              name="author"
              placeholder="Ingresa un autor que te guste leer..."
              required
              value={form.author}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="recent_books">Libros Leídos Recientemente:</label>
            <textarea
              id="recent_books"
              name="recent_books"
              placeholder="Ingresa algunos libros que hayas leído recientemente..."
              required
              value={form.recent_books}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="reading_level">Nivel de Lectura:</label>
            <select
              id="reading_level"
              name="reading_level"
              required
              value={form.reading_level}
              onChange={onChange}
            >
              <option value="">Selecciona el nivel de lectura</option>
              <option value="Beginner">Principiante</option>
              <option value="Intermediate">Intermedio</option>
              <option value="Advanced">Avanzado</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Obteniendo recomendación...' : 'Obtener Recomendación'}
          </button>
        </form>

        {loading && <div className="loading">Obteniendo tu recomendación personalizada...</div>}

        <div id="recommendation" className={recommendation || error ? 'visible' : ''}>
          {error && <div className="error">Error: {error}</div>}
          {!error && recommendation && (
            <ReactMarkdown>{recommendation}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
