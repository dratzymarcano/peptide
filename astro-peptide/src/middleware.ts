import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async ({ url }, next) => {
  if (url.hostname.startsWith('www.')) {
    const target = new URL(url);
    target.hostname = url.hostname.replace(/^www\./, '');
    return Response.redirect(target.toString(), 301);
  }

  return next();
};
