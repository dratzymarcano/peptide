import{j as e}from"./jsx-runtime.ClP7wGfN.js";import{u as o}from"./index.BYjIhr-9.js";import{c as u,i as d,b as y,r as j,u as c}from"./cartStore.CoRi6UK2.js";import{t as s,g as x}from"./translations.DwwPAycK.js";import{c as w,e as v,f as p}from"./currencyStore.Bt_PHIZe.js";import"./index.DK-fsZOb.js";import"./index.CEvxOxeV.js";import"./index.Bhz7cRIx.js";function D({lang:r="en"}){const h=o(u),m=o(d),b=o(y),n=o(w);o(v);const i=Object.values(h),l=i.length===0;if(!m)return null;const a=()=>{d.set(!1)},f=t=>{t.target===t.currentTarget&&a()};return e.jsxs(e.Fragment,{children:[e.jsx("div",{onClick:f,className:"fixed inset-0 bg-black/50 backdrop-blur-sm z-[10010]","aria-hidden":"true",style:{position:"fixed",inset:0,backgroundColor:"rgba(0,0,0,0.5)",zIndex:10010}}),e.jsxs("div",{className:"fixed z-[10011] bg-white flex flex-col shadow-2xl transition-transform duration-300 md:h-screen md:w-full md:max-w-[420px]",style:{position:"fixed",zIndex:10011,backgroundColor:"white",display:"flex",flexDirection:"column",boxShadow:"-10px 0 40px rgba(0,0,0,0.15)"},children:[e.jsx("style",{children:`
          /* Mobile First - Bottom Sheet on mobile, Side Drawer on desktop */
          .cart-modal-container {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 90vh;
            max-height: 90vh;
            border-radius: 20px 20px 0 0;
            transform: translateY(0);
            animation: slideUp 0.35s cubic-bezier(0.22, 1, 0.36, 1);
            box-shadow: 0 -10px 50px rgba(0,0,0,0.2);
          }
          
          /* Drag handle for mobile bottom sheet */
          .cart-modal-container::before {
            content: '';
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 4px;
            background: #cbd5e1;
            border-radius: 2px;
          }
          
          .cart-header {
            padding: 24px 20px 16px;
          }
          
          .cart-items {
            padding: 12px 20px;
          }
          
          .cart-footer {
            padding: 20px;
            padding-bottom: max(20px, env(safe-area-inset-bottom));
          }
          
          @media (min-width: 768px) {
            .cart-modal-container {
              top: 0;
              right: 0;
              bottom: 0;
              left: auto;
              height: 100vh;
              max-height: 100vh;
              width: 100%;
              max-width: 420px;
              border-radius: 0;
              animation: slideLeft 0.35s cubic-bezier(0.22, 1, 0.36, 1);
              box-shadow: -10px 0 50px rgba(0,0,0,0.15);
            }
            
            .cart-modal-container::before {
              display: none;
            }
            
            .cart-header {
              padding: 20px 24px 16px;
            }
            
            .cart-items {
              padding: 16px 24px;
            }
            
            .cart-footer {
              padding: 24px;
            }
          }
          
          @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          
          @keyframes slideLeft {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          
          /* Touch-friendly quantity controls */
          .qty-btn {
            width: 36px;
            height: 36px;
            min-width: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: 500;
            -webkit-tap-highlight-color: transparent;
          }
          
          .qty-btn:active {
            background: #f1f5f9;
          }
          
          @media (min-width: 768px) {
            .qty-btn {
              width: 32px;
              height: 32px;
              min-width: 32px;
            }
          }
        `}),e.jsxs("div",{className:"cart-modal-container fixed z-[10011] bg-white flex flex-col shadow-2xl overflow-hidden",children:[e.jsxs("div",{className:"flex justify-between items-center p-4 border-b border-gray-100",children:[e.jsx("h2",{className:"text-lg font-bold text-slate-800 m-0",children:s(r,"cart.yourCartCount").replace("{count}",String(i.length))}),e.jsx("button",{onClick:a,className:"p-2 -mr-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-50","aria-label":s(r,"cart.closeCart"),style:{background:"none",border:"none",cursor:"pointer"},children:e.jsxs("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[e.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),e.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})})]}),e.jsx("div",{className:"flex-1 overflow-y-auto p-4",children:l?e.jsxs("div",{className:"text-center py-10 text-slate-500",children:[e.jsxs("svg",{width:"64",height:"64",viewBox:"0 0 24 24",fill:"none",stroke:"#cbd5e1",strokeWidth:"1.5",className:"mx-auto mb-4",style:{display:"block",margin:"0 auto 16px"},children:[e.jsx("circle",{cx:"9",cy:"21",r:"1"}),e.jsx("circle",{cx:"20",cy:"21",r:"1"}),e.jsx("path",{d:"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"})]}),e.jsx("p",{className:"font-medium text-lg mb-2",children:s(r,"cart.empty")}),e.jsx("p",{className:"text-sm mb-6",children:s(r,"cart.addProductsToGetStarted")}),e.jsx("a",{href:x("/peptides/",r),onClick:a,className:"inline-block py-3 px-6 bg-[#0077b6] text-white font-semibold rounded-lg hover:bg-[#023e8a] no-underline",style:{backgroundColor:"#0077b6",color:"white",padding:"12px 24px",borderRadius:"8px",textDecoration:"none"},children:s(r,"cart.browseProducts")})]}):e.jsx("div",{className:"flex flex-col gap-4",style:{display:"flex",flexDirection:"column",gap:"16px"},children:i.map(t=>e.jsxs("div",{className:"flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100",style:{display:"flex",gap:"12px",padding:"12px",background:"#f8fafc",borderRadius:"10px"},children:[e.jsx("img",{src:t.thumb_src,alt:t.title,className:"w-[70px] h-[70px] object-cover rounded-lg bg-white",style:{width:"70px",height:"70px",objectFit:"cover",borderRadius:"8px"},onError:g=>{g.target.src="/images/peptide-default.jpg"}}),e.jsxs("div",{className:"flex-1 min-w-0 flex flex-col justify-between py-1",style:{flex:1},children:[e.jsx("div",{children:e.jsxs("div",{className:"flex justify-between items-start gap-2",children:[e.jsx("h4",{className:"m-0 text-sm font-bold text-slate-800 leading-tight",style:{margin:0,fontSize:"0.9rem",fontWeight:600},children:t.title}),e.jsx("button",{onClick:()=>j(t.id),className:"text-slate-400 hover:text-red-500 p-0",style:{background:"none",border:"none",cursor:"pointer",padding:0},"aria-label":"Remove item",children:e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:e.jsx("path",{d:"M18 6L6 18M6 6l12 12"})})})]})}),e.jsxs("div",{className:"flex justify-between items-end mt-2",style:{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginTop:"8px"},children:[e.jsx("p",{className:"m-0 font-bold text-[#0077b6]",style:{color:"#0077b6",margin:0},children:p(t.price,n)}),e.jsxs("div",{className:"flex items-center bg-white border border-slate-200 rounded-lg h-8",style:{display:"flex",alignItems:"center",border:"1px solid #e2e8f0",borderRadius:"6px"},children:[e.jsx("button",{onClick:()=>c(t.id,Math.max(1,t.quantity-1)),className:"w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-50",style:{width:"32px",height:"32px",background:"none",border:"none",cursor:"pointer"},children:"−"}),e.jsx("span",{className:"w-6 text-center text-sm font-semibold text-slate-800",style:{minWidth:"24px",textAlign:"center",fontWeight:600},children:t.quantity}),e.jsx("button",{onClick:()=>c(t.id,t.quantity+1),className:"w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-50",style:{width:"32px",height:"32px",background:"none",border:"none",cursor:"pointer"},children:"+"})]})]})]})]},t.id))})}),!l&&e.jsxs("div",{className:"p-4 border-t border-gray-100 bg-white pb-[max(1rem,env(safe-area-inset-bottom))]",style:{padding:"16px",borderTop:"1px solid #f1f5f9",paddingBottom:"max(16px, env(safe-area-inset-bottom))"},children:[e.jsxs("div",{className:"flex justify-between items-end mb-1",style:{display:"flex",justifyContent:"space-between",marginBottom:"4px"},children:[e.jsx("span",{className:"text-slate-600 font-medium",children:s(r,"cart.subtotal")}),e.jsx("span",{className:"text-xl font-bold text-slate-900",children:p(b,n)})]}),e.jsx("div",{className:"text-xs text-slate-400 mb-4 text-right",style:{fontSize:"0.75rem",color:"#94a3b8",textAlign:"right",marginBottom:"16px"},children:"Shipping & taxes calculated at checkout"}),e.jsxs("div",{className:"flex flex-col gap-3",style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsx("a",{href:x("/checkout/",r),onClick:a,className:"w-full py-3 bg-[#0077b6] text-white font-bold text-center rounded-xl hover:bg-[#023e8a] transition-all no-underline",style:{display:"block",width:"100%",padding:"14px",backgroundColor:"#0077b6",color:"white",borderRadius:"12px",textAlign:"center",textDecoration:"none",fontWeight:700},children:s(r,"cart.checkout")}),e.jsx("button",{onClick:a,className:"w-full py-2 text-slate-500 font-medium text-sm hover:text-slate-800",style:{width:"100%",background:"none",border:"none",padding:"8px",color:"#64748b",cursor:"pointer"},children:"Continue Shopping"})]})]})]})]})]})}export{D as default};
