/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
	interface Locals {
		locale: import('./i18n/config').Locale;
		runtime?: import('@astrojs/cloudflare').Runtime<ImportMetaEnv>['runtime'];
	}
}

interface ImportMetaEnv {
	readonly SITE_URL?: string;
	readonly SUPABASE_URL?: string;
	readonly SUPABASE_SERVICE_ROLE_KEY?: string;
	readonly RESEND_API_KEY?: string;
	readonly RESEND_FROM?: string;
	readonly RESEND_TO?: string;
	readonly CONTACT_TO?: string;
	readonly BANK_IBAN?: string;
	readonly BANK_BIC?: string;
	readonly BANK_BENEFICIARY?: string;
	readonly BTCPAY_SERVER_URL?: string;
	readonly BTCPAY_STORE_ID?: string;
	readonly BTCPAY_API_KEY?: string;
	readonly BTCPAY_WEBHOOK_SECRET?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
