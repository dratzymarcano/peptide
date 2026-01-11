import{j as t}from"./jsx-runtime.ClP7wGfN.js";import{r as E}from"./index.DK-fsZOb.js";import{u as g}from"./index.BYjIhr-9.js";import{g as O,t as i,a as S,b as T}from"./translations.DwwPAycK.js";import{c as W,e as $,f as w}from"./currencyStore.Bt_PHIZe.js";import"./index.CEvxOxeV.js";const k=200,B=s=>s>=1e3?15:s>=500?12:s>=250?10:s>=200?8:5;function U({id:s,title:h,price:n,image:v,slug:j,category:m,rating:f=4.5,reviewCount:y=121,packageSize:p,lang:e="en"}){const[d,z]=E.useState(!1),u=g(W);g($);const l=O(`/peptides/${j.replace(/^\//,"")}`,e),c=n>=k,b=B(n),x=c?1:Math.ceil(k/n),N=n*x,C=(o=!1)=>{if(!p)return o?i(e,"product.packs"):i(e,"product.pack");const a=p.toLowerCase();return a.includes("vial")?o?i(e,"product.packs"):i(e,"product.pack"):a.includes("cap")?o?i(e,"product.bottles"):i(e,"product.bottle"):a.includes("powder")?o?i(e,"product.units"):i(e,"product.unit"):a.includes("month")?o?i(e,"product.units"):i(e,"product.unit"):o?i(e,"product.packs"):i(e,"product.pack")},R=o=>{o.preventDefault(),o.stopPropagation(),z(!d)},L=()=>{const o=[],a=Math.floor(f),D=f%1>=.5;for(let r=0;r<5;r++)r<a?o.push(t.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"#f59e0b",stroke:"#f59e0b",strokeWidth:"1",children:t.jsx("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"})},r)):r===a&&D?o.push(t.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#f59e0b",strokeWidth:"1",children:[t.jsx("defs",{children:t.jsxs("linearGradient",{id:`half-${s}-${r}`,children:[t.jsx("stop",{offset:"50%",stopColor:"#f59e0b"}),t.jsx("stop",{offset:"50%",stopColor:"transparent"})]})}),t.jsx("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",fill:`url(#half-${s}-${r})`})]},r)):o.push(t.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#d1d5db",strokeWidth:"1",children:t.jsx("polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"})},r));return o};return t.jsxs("div",{className:"shopcart-product-card",children:[t.jsx("button",{className:`wishlist-btn ${d?"active":""}`,onClick:R,"aria-label":d?i(e,"product.wishlistRemove"):i(e,"product.wishlistAdd"),children:t.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:d?"#ef4444":"none",stroke:d?"#ef4444":"#6b7280",strokeWidth:"2",children:t.jsx("path",{d:"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"})})}),t.jsx("a",{href:l,className:"product-image-link",children:t.jsx("div",{className:"product-image-wrapper",children:t.jsx("img",{src:v,alt:h,className:"product-image",loading:"lazy",decoding:"async",onError:o=>{o.target.src="/images/peptide-default.jpg"}})})}),t.jsxs("div",{className:"product-info",children:[t.jsx("a",{href:l,className:"product-title-link",children:t.jsx("h3",{className:"product-title",children:h})}),m&&t.jsx("p",{className:"product-category",children:S(m,e)}),t.jsxs("div",{className:"product-price-row",children:[t.jsx("span",{className:"product-price",children:w(n,u)}),c?t.jsxs("span",{className:"discount-badge",children:[b,"% ",i(e,"product.off")]}):t.jsxs("span",{className:"discount-badge",children:[b,"% ",i(e,"product.off")]})]}),!c&&t.jsxs("div",{className:"min-order-info",children:[t.jsxs("span",{className:"min-qty",children:[i(e,"product.minQuantity").replace("{qty}",String(x))," ",C(x>1)]}),t.jsxs("span",{className:"min-total",children:["= ",w(N,u),"+"]})]}),c&&p&&t.jsx("div",{className:"package-info",children:t.jsx("span",{className:"package-size",children:T(p,e)})}),t.jsxs("div",{className:"product-rating",children:[t.jsx("div",{className:"stars-wrapper",children:L()}),t.jsxs("span",{className:"review-count",children:["(",y,")"]})]}),t.jsx("a",{href:l,className:"view-options-btn",children:i(e,"product.viewOptions")})]}),t.jsx("style",{children:`
        /* ===== MOBILE FIRST PRODUCT CARD ===== */
        .shopcart-product-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          overflow: hidden;
          position: relative;
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        /* Touch-friendly - no transform on mobile */
        @media (min-width: 992px) {
          .shopcart-product-card:hover {
            border-color: #0077b6;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
            transform: translateY(-4px);
          }
        }

        .wishlist-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: white;
          border: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.2s ease;
          -webkit-tap-highlight-color: transparent;
        }

        .wishlist-btn:active {
          transform: scale(0.95);
        }

        .wishlist-btn.active {
          border-color: #ef4444;
          background: #fef2f2;
        }

        @media (min-width: 992px) {
          .wishlist-btn {
            top: 12px;
            right: 12px;
          }
          
          .wishlist-btn:hover {
            border-color: #ef4444;
            background: #fef2f2;
          }
        }

        .product-image-link {
          display: block;
          text-decoration: none;
        }

        .product-image-wrapper {
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #f9fafb;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
        }

        @media (min-width: 576px) {
          .product-image-wrapper {
            padding: 16px;
          }
        }

        @media (min-width: 992px) {
          .product-image-wrapper {
            padding: 20px;
          }
        }

        .product-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        @media (min-width: 992px) {
          .shopcart-product-card:hover .product-image {
            transform: scale(1.05);
          }
        }

        .product-info {
          padding: 12px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        @media (min-width: 576px) {
          .product-info {
            padding: 14px;
          }
        }

        @media (min-width: 992px) {
          .product-info {
            padding: 16px;
          }
        }

        .product-title-link {
          text-decoration: none;
        }

        .product-title {
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 4px 0;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @media (min-width: 576px) {
          .product-title {
            font-size: 15px;
          }
        }

        .product-title-link:hover .product-title {
          color: #0077b6;
        }

        .product-category {
          font-size: 11px;
          color: #6b7280;
          text-transform: capitalize;
          margin: 0 0 6px 0;
        }

        @media (min-width: 576px) {
          .product-category {
            font-size: 12px;
            margin: 0 0 8px 0;
          }
        }

        .product-price-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
          flex-wrap: wrap;
        }

        .product-price {
          font-size: 16px;
          font-weight: 700;
          color: #1e293b;
        }

        @media (min-width: 576px) {
          .product-price {
            font-size: 18px;
          }
        }

        .discount-badge {
          font-size: 9px;
          font-weight: 700;
          color: white;
          background: #10b981;
          padding: 2px 5px;
          border-radius: 4px;
        }

        @media (min-width: 576px) {
          .discount-badge {
            font-size: 10px;
            padding: 2px 6px;
          }
        }

        .pack-label {
          font-size: 11px;
          color: #6b7280;
          font-weight: 500;
        }

        @media (min-width: 576px) {
          .pack-label {
            font-size: 12px;
          }
        }

        .package-info {
          margin-bottom: 6px;
        }

        @media (min-width: 576px) {
          .package-info {
            margin-bottom: 8px;
          }
        }

        .package-size {
          font-size: 11px;
          color: #0077b6;
          font-weight: 500;
          background: rgba(0, 119, 182, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          display: inline-block;
        }

        @media (min-width: 576px) {
          .package-size {
            font-size: 12px;
            padding: 3px 8px;
          }
        }

        .min-order-info {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 6px;
          font-size: 11px;
          flex-wrap: wrap;
        }

        @media (min-width: 576px) {
          .min-order-info {
            font-size: 12px;
            gap: 6px;
            margin-bottom: 8px;
          }
        }

        .min-qty {
          color: #0077b6;
          font-weight: 600;
        }

        .min-total {
          color: #6b7280;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 10px;
        }

        @media (min-width: 576px) {
          .product-rating {
            gap: 6px;
            margin-bottom: 12px;
          }
        }

        .stars-wrapper {
          display: flex;
          gap: 1px;
        }

        .stars-wrapper svg {
          width: 12px;
          height: 12px;
        }

        @media (min-width: 576px) {
          .stars-wrapper svg {
            width: 14px;
            height: 14px;
          }
        }

        .review-count {
          font-size: 11px;
          color: #6b7280;
        }

        @media (min-width: 576px) {
          .review-count {
            font-size: 12px;
          }
        }

        .view-options-btn {
          display: block;
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          background: #0077b6;
          color: white;
          font-size: 13px;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          transition: all 0.2s ease;
          margin-top: auto;
          -webkit-tap-highlight-color: transparent;
        }

        .view-options-btn:active {
          background: #023e8a;
        }

        @media (min-width: 576px) {
          .view-options-btn {
            padding: 10px 16px;
            font-size: 14px;
          }
        }

        @media (min-width: 992px) {
          .view-options-btn:hover {
            background: #023e8a;
            color: white;
          }
        }

        .add-to-cart-btn {
          width: 100%;
          padding: 10px 16px;
          border-radius: 8px;
          border: 1px solid #1e293b;
          background: white;
          color: #1e293b;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: auto;
        }

        .add-to-cart-btn:hover {
          background: #0077b6;
          border-color: #0077b6;
          color: white;
        }

        .add-to-cart-btn.added {
          background: #0077b6;
          border-color: #0077b6;
          color: white;
        }
      `})]})}export{U as default};
