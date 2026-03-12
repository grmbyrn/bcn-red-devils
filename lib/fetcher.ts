export type FetchOptions = {
  retries?: number;
  retryDelayMs?: number;
  timeoutMs?: number;
};

class ApiError extends Error {
  status?: number;
  body?: string;

  constructor(status?: number, message?: string, body?: string) {
    super(message ?? "API Error");
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export async function fetcher(input: RequestInfo, init?: RequestInit, opts: FetchOptions = {}) {
  const retries = opts.retries ?? 2;
  const retryDelayMs = opts.retryDelayMs ?? 500;
  const timeoutMs = opts.timeoutMs ?? 8000;

  let attempt = 0;
  while (true) {
    attempt++;
    const controller = new AbortController();
    const providedSignal = (init && (init).signal) as AbortSignal | undefined;
    const signal = providedSignal ?? controller.signal;
    const mergedInit: RequestInit = { ...(init ?? {}), signal };

    let timeoutId: NodeJS.Timeout | null = null;
    if (!providedSignal) {
      timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    }

    try {
      const res = await fetch(input, mergedInit);
      if (timeoutId) clearTimeout(timeoutId);

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new ApiError(res.status, `API error: ${res.status} ${text}`, text);
      }

      const contentType = res.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        return await res.json();
      }
      return await res.text();
    } catch (e: unknown) {
      if (timeoutId) clearTimeout(timeoutId);
      const isAbort = e instanceof Error && e.name === "AbortError";
      if (attempt > retries || isAbort) throw e;

      const delay = retryDelayMs * Math.pow(2, attempt - 1);
      await new Promise((r) => setTimeout(r, delay));
      continue;
    }
  }
}
