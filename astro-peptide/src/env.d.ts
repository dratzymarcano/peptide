/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Env {
  RESEND_API_KEY: string;
  OWNER_EMAIL?: string;
  SENDER_EMAIL?: string;
}

declare namespace App {
  interface Locals {
    runtime: import("@astrojs/cloudflare").Runtime<Env>['runtime'];
  }
}
