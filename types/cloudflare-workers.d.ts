/**
 * Minimal local Cloudflare Worker bindings used by this project.
 * The production runtime supplies the concrete implementations.
 */
interface Fetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run<T = unknown>(): Promise<D1Response<T>>;
  all<T = unknown>(): Promise<D1Result<T>>;
  first<T = unknown>(column?: string): Promise<T | null>;
  raw<T = unknown[]>(options?: { columnNames?: boolean }): Promise<T[]>;
}

interface D1Response<T = unknown> {
  success: boolean;
  meta: Record<string, unknown>;
  results?: T[];
}

interface D1Result<T = unknown> extends D1Response<T> {
  results: T[];
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T extends D1PreparedStatement[]>(statements: T): Promise<D1Result[]>;
  exec(query: string): Promise<D1Response>;
}

declare module "cloudflare:workers" {
  export const env: { DB?: D1Database };
}
