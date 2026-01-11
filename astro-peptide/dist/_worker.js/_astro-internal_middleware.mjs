globalThis.process ??= {}; globalThis.process.env ??= {};
import './chunks/astro-designed-error-pages_CxQXqKCU.mjs';
import './chunks/astro/server_DjzMfJVp.mjs';
import { s as sequence } from './chunks/index_D5Nu1iae.mjs';

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	
	
);

export { onRequest };
