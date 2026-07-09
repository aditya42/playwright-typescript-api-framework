const http = require('http');

const port = Number(process.env.MOCK_API_PORT || 3000);

const posts = Array.from({ length: 5 }, (_, index) => ({
  userId: 1,
  id: index + 1,
  title: `Sample post ${index + 1}`,
  body: `Sample post body ${index + 1}`,
}));

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(data ? JSON.parse(data) : {});
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  const postIdMatch = url.pathname.match(/^\/posts\/(\d+)$/);

  if (req.method === 'GET' && url.pathname === '/health') {
    return sendJson(res, 200, { status: 'ok' });
  }

  if (req.method === 'GET' && url.pathname === '/posts') {
    return sendJson(res, 200, posts);
  }

  if (req.method === 'GET' && postIdMatch) {
    const post = posts.find((item) => item.id === Number(postIdMatch[1]));
    return post ? sendJson(res, 200, post) : sendJson(res, 404, { message: 'Post not found' });
  }

  if (req.method === 'POST' && url.pathname === '/posts') {
    const payload = await readBody(req);
    return sendJson(res, 201, { id: 101, ...payload });
  }

  if (req.method === 'PUT' && postIdMatch) {
    const payload = await readBody(req);
    return sendJson(res, 200, { id: Number(postIdMatch[1]), ...payload });
  }

  if (req.method === 'PATCH' && postIdMatch) {
    const payload = await readBody(req);
    const existingPost = posts.find((item) => item.id === Number(postIdMatch[1]));
    return existingPost
      ? sendJson(res, 200, { ...existingPost, ...payload })
      : sendJson(res, 404, { message: 'Post not found' });
  }

  if (req.method === 'DELETE' && postIdMatch) {
    return sendJson(res, 200, {});
  }

  return sendJson(res, 404, { message: 'Route not found' });
});

server.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`);
});
