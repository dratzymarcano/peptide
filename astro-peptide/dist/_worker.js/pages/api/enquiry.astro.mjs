globalThis.process ??= {}; globalThis.process.env ??= {};
export { r as renderers } from '../../chunks/_@astro-renderers_Co1rHHJa.mjs';

const POST = async ({ request }) => {
  const data = await request.json();
  if (!data.email || !data.items || data.items.length === 0 || !data.researchConfirm) {
    return new Response(JSON.stringify({ error: "Invalid request" }), { status: 400 });
  }
  {
    return new Response(JSON.stringify({ success: true, message: "Enquiry received" }), { status: 200 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
