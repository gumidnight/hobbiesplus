interface CloudflareEnv {
  DB: D1Database;
  R2: R2Bucket;
  ADMIN_PASSWORD: string;
  JWT_SECRET: string;
}

// Augment @cloudflare/next-on-pages to use our env type
declare module "@cloudflare/next-on-pages" {
  interface RequestContext<
    CfProperties = IncomingRequestCfProperties,
    Env = CloudflareEnv,
  > {
    env: Env;
    cf: CfProperties;
    ctx: ExecutionContext;
  }

  export function getRequestContext<
    CfProperties = IncomingRequestCfProperties,
    Env = CloudflareEnv,
  >(): RequestContext<CfProperties, Env>;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ADMIN_PASSWORD: string;
      JWT_SECRET: string;
    }
  }
}

export {};
