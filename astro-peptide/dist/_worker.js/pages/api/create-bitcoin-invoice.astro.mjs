globalThis.process ??= {}; globalThis.process.env ??= {};
export { r as renderers } from '../../chunks/_@astro-renderers_Co1rHHJa.mjs';

const BTCPAY_SERVER_URL = "https://btcpay.peptide-shop.net";
const BTCPAY_STORE_ID = "YOUR_STORE_ID";
const BTCPAY_API_KEY = "YOUR_API_KEY";
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { orderId, amount, currency = "GBP", buyerEmail, description } = body;
    if (!orderId || !amount || !buyerEmail) {
      return new Response(JSON.stringify({
        error: "Missing required fields: orderId, amount, buyerEmail"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const invoiceResponse = await fetch(
      `${BTCPAY_SERVER_URL}/api/v1/stores/${BTCPAY_STORE_ID}/invoices`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `token ${BTCPAY_API_KEY}`
        },
        body: JSON.stringify({
          amount: amount.toString(),
          currency,
          metadata: {
            orderId,
            buyerEmail,
            itemDesc: description || `Peptide Shop Order ${orderId}`
          },
          checkout: {
            speedPolicy: "MediumSpeed",
            // 1 confirmation
            expirationMinutes: 15,
            monitoringMinutes: 60,
            paymentTolerance: 0,
            redirectURL: `${undefined                         || "https://peptide-shop.net"}/order-confirmation?orderId=${orderId}`,
            redirectAutomatically: true,
            defaultLanguage: "en-GB"
          },
          receipt: {
            enabled: true,
            showQR: true
          }
        })
      }
    );
    if (!invoiceResponse.ok) {
      const errorText = await invoiceResponse.text();
      console.error("BTCPay Server error:", errorText);
      if (false) ;
      return new Response(JSON.stringify({
        error: "Failed to create Bitcoin invoice"
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
    const invoice = await invoiceResponse.json();
    const btcInfo = invoice.cryptoInfo?.find((c) => c.cryptoCode === "BTC");
    return new Response(JSON.stringify({
      success: true,
      invoice: {
        id: invoice.id,
        checkoutLink: invoice.checkoutLink,
        status: invoice.status,
        amount: invoice.amount,
        currency: invoice.currency,
        btcAddress: btcInfo?.address,
        btcAmount: btcInfo?.due,
        btcRate: btcInfo?.rate,
        paymentUrl: btcInfo?.paymentUrls?.BIP21
      }
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error creating Bitcoin invoice:", error);
    return new Response(JSON.stringify({
      error: "Internal server error"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const PUT = async ({ request }) => {
  try {
    const body = await request.json();
    const { type } = body;
    switch (type) {
      case "InvoiceSettled":
        break;
      case "InvoiceExpired":
        break;
      case "InvoiceInvalid":
        break;
      default:
        break;
    }
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Webhook processing failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
