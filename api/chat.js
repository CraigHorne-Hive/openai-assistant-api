export default async function handler(req, res) {
  const { messages, threadId } = req.body;

  const response = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
      'OpenAI-Beta': 'assistants=v1'
    },
    body: JSON.stringify({
      role: 'user',
      content: messages[messages.length - 1].content
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}

