export async function sendMessageToBot(query: string) {
  const res = await fetch('https://flask-chatbot-api-qiwt.onrender.com/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // for session cookie support
    body: JSON.stringify({ query })
  });

  if (!res.ok) throw new Error('Failed to fetch bot response');
  return await res.json();
}
