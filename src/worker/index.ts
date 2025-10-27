import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";
import { Env } from "./types";

const app = new Hono<{ Bindings: Env }>();

// Servir arquivos estáticos com manifest vazio (será preenchido pelo Wrangler)
app.use("/*", serveStatic({ 
  manifest: {} 
}));

// Fallback para SPA - todas as rotas não encontradas retornam o index.html
app.get("*", serveStatic({ 
  path: "./index.html",
  manifest: {}
}));

export default app;
