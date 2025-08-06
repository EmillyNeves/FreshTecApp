import express from 'express';
import { registerRoutes } from '../../server/routes';
import { serveStatic } from '../../server/vite';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API routes
async function initializeServer() {
  await registerRoutes(app);

  // Serve static files in production
  if (process.env.NODE_ENV === 'production') {
    serveStatic(app);
  }
  
  return app;
}

// Export for Netlify Functions
export const handler = async (event: any, context: any) => {
  const server = await initializeServer();
  
  // Handle the request
  return new Promise((resolve, reject) => {
    const req = {
      method: event.httpMethod,
      path: event.path,
      headers: event.headers,
      body: event.body,
      query: event.queryStringParameters,
    };
    
    const res = {
      statusCode: 200,
      headers: {},
      body: '',
      end: (body: string) => {
        resolve({ statusCode: res.statusCode, headers: res.headers, body });
      },
      json: (data: any) => {
        res.headers['Content-Type'] = 'application/json';
        res.body = JSON.stringify(data);
        resolve({ statusCode: res.statusCode, headers: res.headers, body: res.body });
      }
    };
    
    try {
      server(req as any, res as any);
    } catch (error) {
      reject(error);
    }
  });
};