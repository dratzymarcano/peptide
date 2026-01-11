import { d as createAstro, c as createComponent, a as renderTemplate, r as renderComponent, e as addAttribute, m as maybeRenderHead, b as renderScript, v as renderSlot, w as renderHead, u as unescapeHTML } from './astro/server_DJ8-DhXX.mjs';
import 'piccolore';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useStore } from '@nanostores/react';
import { map, atom, computed } from 'nanostores';
import { useState, useEffect, useRef } from 'react';
/* empty css                              */
import 'clsx';

const cartItems = map({});
const isCartOpen = atom(false);
const cartNotification = atom(null);
function clearNotification() {
  cartNotification.set(null);
}
computed(cartItems, (items) => {
  return Object.values(items).reduce((sum, item) => sum + item.quantity, 0);
});
const cartTotal = computed(cartItems, (items) => {
  return Object.values(items).reduce((sum, item) => sum + item.price * item.quantity, 0);
});
const isBrowser$1 = typeof window !== "undefined";
function saveToLocalStorage() {
  if (isBrowser$1) {
    localStorage.setItem("peptide-cart", JSON.stringify(cartItems.get()));
  }
}
if (isBrowser$1) {
  const saved = localStorage.getItem("peptide-cart");
  if (saved) {
    try {
      cartItems.set(JSON.parse(saved));
    } catch (e) {
      cartItems.set({});
    }
  }
}
function addCartItem(product) {
  const quantityToAdd = product.quantity || 1;
  const existing = cartItems.get()[product.id];
  if (existing) {
    cartItems.setKey(product.id, { ...existing, quantity: existing.quantity + quantityToAdd });
  } else {
    cartItems.setKey(product.id, { ...product, quantity: quantityToAdd });
  }
  saveToLocalStorage();
  cartNotification.set(product);
}
function removeCartItem(id) {
  const newItems = { ...cartItems.get() };
  delete newItems[id];
  cartItems.set(newItems);
  saveToLocalStorage();
}
function updateQuantity(id, quantity) {
  const existing = cartItems.get()[id];
  if (existing) {
    if (quantity <= 0) {
      removeCartItem(id);
    } else {
      cartItems.setKey(id, { ...existing, quantity });
      saveToLocalStorage();
    }
  }
}

const languages = {
  en: "English",
  nl: "Nederlands",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  it: "Italiano"
};
const supportedLanguages = Object.keys(languages);
const defaultLang = "en";
const productSlugTranslations = {
  en: {},
  nl: {
    "buy-bacteriostatic-water": "bacteriostatic-water-kopen",
    "buy-cjc-1295-no-dac": "cjc-1295-no-dac-kopen",
    "buy-epitalon": "epitalon-kopen",
    "buy-cagrilintide": "cagrilintide-kopen",
    "buy-dsip": "dsip-kopen",
    "buy-gh-frag-176-191": "hgh-fragment-176-191-kopen",
    "buy-ghk-cu": "ghk-cu-kopen",
    "buy-ghrp-2": "ghrp-2-kopen",
    "buy-ghrp-6": "ghrp-6-kopen",
    "buy-melanotan-2": "melanotan-2-kopen",
    "buy-ipamorelin": "ipamorelin-kopen",
    "buy-nad-plus": "nad-plus-kopen",
    "buy-o-304": "o-304-kopen",
    "buy-retatrutide": "retatrutide-kopen",
    "buy-selank": "selank-kopen",
    "buy-semaglutide": "semaglutide-kopen",
    "buy-semax": "semax-kopen",
    "buy-tb-500": "tb-500-kopen",
    "buy-tesofensine": "tesofensine-kopen",
    "buy-tirzepatide": "tirzepatide-kopen"
  },
  de: {
    "buy-bacteriostatic-water": "bacteriostatic-water-kaufen",
    "buy-cjc-1295-no-dac": "cjc-1295-no-dac-kaufen",
    "buy-epitalon": "epitalon-kaufen",
    "buy-cagrilintide": "cagrilintide-kaufen",
    "buy-dsip": "dsip-kaufen",
    "buy-gh-frag-176-191": "hgh-fragment-176-191-kaufen",
    "buy-ghk-cu": "ghk-cu-kaufen",
    "buy-ghrp-2": "ghrp-2-kaufen",
    "buy-ghrp-6": "ghrp-6-kaufen",
    "buy-melanotan-2": "melanotan-2-kaufen",
    "buy-ipamorelin": "ipamorelin-kaufen",
    "buy-nad-plus": "nad-plus-kaufen",
    "buy-o-304": "o-304-kaufen",
    "buy-retatrutide": "retatrutide-kaufen",
    "buy-selank": "selank-kaufen",
    "buy-semaglutide": "semaglutide-kaufen",
    "buy-semax": "semax-kaufen",
    "buy-tb-500": "tb-500-kaufen",
    "buy-tesofensine": "tesofensine-kaufen",
    "buy-tirzepatide": "tirzepatide-kaufen"
  },
  fr: {
    "buy-bacteriostatic-water": "acheter-de-l-eau-bacteriostatique",
    "buy-cjc-1295-no-dac": "acheter-cjc-1295-no-dac",
    "buy-epitalon": "acheter-epitalon",
    "buy-cagrilintide": "acheter-cagrilintide",
    "buy-dsip": "acheter-dsip",
    "buy-gh-frag-176-191": "acheter-hgh-fragment-176-191",
    "buy-ghk-cu": "acheter-ghk-cu",
    "buy-ghrp-2": "acheter-ghrp-2",
    "buy-ghrp-6": "acheter-ghrp-6",
    "buy-melanotan-2": "acheter-melanotan-2",
    "buy-ipamorelin": "acheter-ipamorelin",
    "buy-nad-plus": "acheter-nad-plus",
    "buy-o-304": "acheter-o-304",
    "buy-retatrutide": "acheter-retatrutide",
    "buy-selank": "acheter-selank",
    "buy-semaglutide": "acheter-semaglutide",
    "buy-semax": "acheter-semax",
    "buy-tb-500": "acheter-tb-500",
    "buy-tesofensine": "acheter-tesofensine",
    "buy-tirzepatide": "acheter-tirzepatide"
  },
  es: {
    "buy-bacteriostatic-water": "agua-bacteriostatica-comprar",
    "buy-cjc-1295-no-dac": "cjc-1295-no-dac-comprar",
    "buy-epitalon": "epitalon-comprar",
    "buy-cagrilintide": "cagrilintide-comprar",
    "buy-dsip": "dsip-comprar",
    "buy-gh-frag-176-191": "hgh-fragment-176-191-comprar",
    "buy-ghk-cu": "ghk-cu-comprar",
    "buy-ghrp-2": "ghrp-2-comprar",
    "buy-ghrp-6": "ghrp-6-comprar",
    "buy-melanotan-2": "melanotan-2-comprar",
    "buy-ipamorelin": "ipamorelin-comprar",
    "buy-nad-plus": "nad-plus-comprar",
    "buy-o-304": "o-304-comprar",
    "buy-retatrutide": "retatrutide-comprar",
    "buy-selank": "selank-comprar",
    "buy-semaglutide": "semaglutide-comprar",
    "buy-semax": "semax-comprar",
    "buy-tb-500": "tb-500-comprar",
    "buy-tesofensine": "tesofensine-comprar",
    "buy-tirzepatide": "tirzepatide-comprar"
  },
  it: {
    "buy-bacteriostatic-water": "acquisto-acqua-batteriostatica",
    "buy-cjc-1295-no-dac": "acquista-cjc-1295-no-dac",
    "buy-epitalon": "acquista-epitalon",
    "buy-cagrilintide": "acquista-cagrilintide",
    "buy-dsip": "acquista-dsip",
    "buy-gh-frag-176-191": "acquista-hgh-fragment-176-191",
    "buy-ghk-cu": "acquista-ghk-cu",
    "buy-ghrp-2": "acquista-ghrp-2",
    "buy-ghrp-6": "acquista-ghrp-6",
    "buy-melanotan-2": "acquista-melanotan-2",
    "buy-ipamorelin": "acquista-ipamorelin",
    "buy-nad-plus": "acquista-nad-plus",
    "buy-o-304": "acquista-o-304",
    "buy-retatrutide": "acquista-retatrutide",
    "buy-selank": "acquista-selank",
    "buy-semaglutide": "acquista-semaglutide",
    "buy-semax": "acquista-semax",
    "buy-tb-500": "acquista-tb-500",
    "buy-tesofensine": "acquista-tesofensine",
    "buy-tirzepatide": "acquista-tirzepatide"
  }
};
const pageSlugTranslations = {
  en: {},
  nl: {
    "quality": "kwaliteit",
    "shipping": "verzending",
    "terms": "voorwaarden",
    "privacy": "privacy",
    "disclaimer": "disclaimer",
    "coa-policy": "coa-beleid",
    "blog": "blog",
    "learn": "leren",
    "what-are-peptides": "wat-zijn-peptiden",
    "bundles": "bundels",
    "wholesale": "groothandel",
    "about": "over-ons",
    "contact": "contact",
    "faq": "veelgestelde-vragen",
    "shop": "winkel",
    "cart": "winkelwagen",
    "checkout": "afrekenen"
  },
  de: {
    "quality": "qualitaet",
    "shipping": "versand",
    "terms": "agb",
    "privacy": "datenschutz",
    "disclaimer": "haftungsausschluss",
    "coa-policy": "coa-richtlinie",
    "blog": "blog",
    "learn": "lernen",
    "what-are-peptides": "was-sind-peptide",
    "bundles": "bundles",
    "wholesale": "grosshandel",
    "about": "ueber-uns",
    "contact": "kontakt",
    "faq": "haeufige-fragen",
    "shop": "shop",
    "cart": "warenkorb",
    "checkout": "kasse"
  },
  fr: {
    "quality": "qualite",
    "shipping": "livraison",
    "terms": "conditions",
    "privacy": "confidentialite",
    "disclaimer": "avertissement",
    "coa-policy": "politique-coa",
    "blog": "blog",
    "learn": "apprendre",
    "what-are-peptides": "que-sont-les-peptides",
    "bundles": "lots",
    "wholesale": "grossiste",
    "about": "a-propos",
    "contact": "contact",
    "faq": "faq",
    "shop": "boutique",
    "cart": "panier",
    "checkout": "paiement"
  },
  es: {
    "quality": "calidad",
    "shipping": "envio",
    "terms": "terminos",
    "privacy": "privacidad",
    "disclaimer": "descargo",
    "coa-policy": "politica-coa",
    "blog": "blog",
    "learn": "aprender",
    "what-are-peptides": "que-son-los-peptidos",
    "bundles": "paquetes",
    "wholesale": "mayorista",
    "about": "sobre-nosotros",
    "contact": "contacto",
    "faq": "preguntas-frecuentes",
    "shop": "tienda",
    "cart": "carrito",
    "checkout": "pago"
  },
  it: {
    "quality": "qualita",
    "shipping": "spedizione",
    "terms": "termini",
    "privacy": "privacy",
    "disclaimer": "disclaimer",
    "coa-policy": "politica-coa",
    "blog": "blog",
    "learn": "imparare",
    "what-are-peptides": "cosa-sono-i-peptidi",
    "bundles": "pacchetti",
    "wholesale": "ingrosso",
    "about": "chi-siamo",
    "contact": "contatti",
    "faq": "domande-frequenti",
    "shop": "negozio",
    "cart": "carrello",
    "checkout": "cassa"
  }
};
const translations = {
  en: {
    nav: {
      home: "Home",
      peptides: "Peptides",
      categories: "Categories",
      allPeptides: "All Peptides",
      weightLoss: "Weight Loss",
      muscleRecovery: "Muscle & Recovery",
      growthHormone: "Growth Hormone",
      tanning: "Tanning",
      cognitive: "Cognitive",
      supplies: "Supplies",
      blog: "Blog",
      about: "About Us",
      quality: "Quality",
      contact: "Contact",
      cart: "Cart",
      account: "Account",
      search: "Search peptides..."
    },
    aboutPage: {
      title: "About Peptide Shop",
      subtitle: "Leading European supplier of premium research peptides with verified purity and complete transparency.",
      sections: {
        excellence: "Commitment to Scientific Excellence",
        mission: "Our Mission",
        quality: "Quality First"
      },
      content: {
        excellence: "We are a dedicated team of scientists and supply chain experts committed to providing the highest quality peptides for the research community.",
        mission: "Our mission is to accelerate scientific discovery by removing the variables of reagent quality. We believe that reproducible research starts with pure, verified materials. That's why we focus exclusively on supplying research-grade peptides with complete transparency.",
        quality: "In an industry often plagued by opacity, we stand apart by providing comprehensive analytical data for every batch. We don't just claim purity; we prove it."
      },
      features: {
        hplc: "HPLC Analysis",
        hplcSubtitle: "To verify purity ≥99%",
        massSpec: "Mass Spectrometry",
        massSpecSubtitle: "To confirm molecular identity",
        storage: "Strict Storage",
        storageSubtitle: "All inventory at -20°C"
      }
    },
    contactPage: {
      title: "Get In Touch",
      subtitle: "Have questions about our products or need a custom quote? Our expert team is here to help.",
      section: {
        sendMessage: "Send us a Message"
      },
      form: {
        name: "Your Name",
        email: "Email Address",
        subject: "Subject",
        message: "Message",
        submit: "Send Message"
      }
    },
    shopPage: {
      title: "Shop Research Peptides",
      subtitle: "Browse our complete catalog of research-grade peptides with 98%+ purity guaranteed.",
      showing: "Showing {count} products",
      sort: {
        featured: "Featured",
        priceLowHigh: "Price: Low to High",
        priceHighLow: "Price: High to Low",
        nameAZ: "Name: A to Z"
      }
    },
    faqPage: {
      title: "Frequently Asked Questions",
      categories: {
        general: "General Information",
        quality: "Quality & Testing",
        payment: "Ordering & Payment"
      }
    },
    qualityPage: {
      title: "Quality Assurance",
      subtitle: "In scientific research, data integrity depends on reagent integrity. We implement rigorous quality control to ensure every vial meets the highest standards.",
      description: "Our commitment to purity. Learn about our HPLC and Mass Spectrometry testing protocols for research peptides.",
      hplcTitle: "HPLC Analysis",
      hplcDescription: "High-Performance Liquid Chromatography (HPLC) determines peptide purity. We guarantee minimum 99% purity for all catalog items, ensuring impurities like deletion sequences or incomplete synthesis byproducts are minimized.",
      purityStandard: "Purity Standard",
      msTitle: "Mass Spectrometry",
      msDescription: "Mass Spectrometry (MS) verifies molecular weight and peptide identity. This confirms the amino acid sequence is correct and matches the theoretical mass.",
      molecularConfirmation: "Molecular Confirmation",
      verified: "100% Verified",
      coaTitle: "Certificate of Analysis (COA)",
      coaDescription: "Transparency is key. A Certificate of Analysis is available for every batch we produce. Download the COA directly from the product page before purchase.",
      coaItems: {
        batchNumber: "Batch Number",
        dateOfAnalysis: "Date of Analysis",
        molecularWeight: "Molecular Weight",
        hplcChromatogram: "HPLC Chromatogram",
        physicalAppearance: "Physical Appearance",
        solubilityProfile: "Solubility Profile"
      },
      storageTitle: "Storage & Handling",
      storageDescription: "To maintain peptide quality after delivery, we recommend the following:",
      storageItems: {
        lyophilizedTitle: "Lyophilized Storage",
        lyophilizedDescription: "Store at -20°C immediately upon receipt",
        lightProtectionTitle: "Light Protection",
        lightProtectionDescription: "Keep away from direct sunlight at all times",
        freezeThawTitle: "Freeze-Thaw Cycles",
        freezeThawDescription: "Minimize cycles to preserve peptide integrity"
      }
    },
    shippingPage: {
      title: "Shipping Information",
      subtitle: "Fast, secure delivery to your location",
      description: "Learn about our shipping methods, delivery times, and packaging standards."
    },
    termsPage: {
      title: "Terms and Conditions",
      description: "Please read these terms carefully before using our services."
    },
    privacyPage: {
      title: "Privacy Policy",
      description: "How we collect, use, and protect your personal information."
    },
    disclaimerPage: {
      title: "Disclaimer",
      description: "Important legal information about research peptide use."
    },
    coaPolicyPage: {
      title: "COA Policy",
      description: "Our certificate of analysis policy and procedures."
    },
    blogPage: {
      title: "Research Blog",
      description: "Latest peptide research news, guides, and scientific insights.",
      readMore: "Read More",
      publishedOn: "Published on",
      byAuthor: "by",
      categories: "Categories",
      recentPosts: "Recent Posts",
      searchPosts: "Search posts...",
      noPosts: "No posts found."
    },
    learnPage: {
      title: "Learn About Peptides",
      description: "Educational resources about peptides and peptide research.",
      whatArePeptides: "What Are Peptides?"
    },
    bundlesPage: {
      title: "Peptide Bundles",
      description: "Save with our curated research peptide bundles."
    },
    wholesalePage: {
      title: "Wholesale",
      subtitle: "Bulk Research Peptides for Laboratories",
      description: "Wholesale research peptides for laboratories and institutions. Bulk pricing, dedicated support, and flexible payment terms.",
      applyNow: "Apply for Wholesale Account"
    },
    checkout: {
      steps: {
        account: "Account",
        shipping: "Shipping",
        payment: "Payment",
        review: "Review"
      },
      titles: {
        accountDetails: "Account Details",
        shippingAddress: "Shipping Address",
        paymentMethod: "Payment Method",
        billingAddress: "Billing Address"
      },
      fields: {
        email: "Email Address",
        password: "Password",
        firstName: "First Name",
        lastName: "Last Name",
        street: "Street Address",
        city: "City",
        postcode: "Postal Code",
        country: "Country",
        phone: "Phone Number"
      },
      shipping: {
        standard: "Standard Delivery",
        express: "Express Delivery"
      },
      payment: {
        bankTransfer: "Bank Transfer",
        bitcoin: "Bitcoin (BTC)"
      },
      actions: {
        continue: "Continue",
        placeOrder: "Place Order",
        back: "Back",
        login: "Log In",
        guest: "Guest Checkout"
      }
    },
    reviews: {
      title: "Customer Reviews",
      showAll: "Show All {count} Reviews",
      basedOn: "Based on {count} reviews",
      stars: "stars",
      star: "star",
      verified: "Verified Purchase",
      noReviews: "No reviews yet"
    },
    home: {
      heroBadge: "European Research Peptide Supplier",
      heroTitle: "Premium",
      heroTitleHighlight: "Research Peptides",
      heroSubtitle: "High-purity, research-grade peptides with batch-tested COAs and fast dispatch.",
      shopNow: "Shop Now",
      viewLabReports: "View Lab Reports",
      stats: {
        ordersDelivered: "Orders Delivered",
        purityGuarantee: "Purity Guarantee",
        expressShipping: "Express Shipping",
        researchLabs: "Research Labs"
      },
      categories: {
        title: "Peptide Categories",
        subtitle: "Browse peptides by research focus"
      },
      bestSellers: {
        title: "Best Sellers",
        subtitle: "Top research peptides chosen by labs",
        viewAll: "View All",
        viewAllPeptides: "View All Peptides"
      },
      filters: {
        antiAging: "Anti-aging"
      },
      about: {
        title: "About Peptide Shop",
        subtitle: "Your trusted peptide supplier for research.",
        description: "Our state-of-the-art laboratory facilities and rigorous quality control processes ensure that every peptide we supply meets 99%+ purity standards. Whether you need Semaglutide, BPC-157, Tirzepatide, or any other research peptide, we provide HPLC-verified compounds with full COA documentation.",
        learnMore: "Learn More About Us",
        features: {
          isoCertified: "ISO Certified",
          isoCertifiedDesc: "Quality Management",
          fastDispatch: "Fast Dispatch",
          fastDispatchDesc: "24-Hour Processing",
          expertTeam: "Expert Team",
          expertTeamDesc: "PhD Scientists",
          globalReach: "Global Reach",
          globalReachDesc: "Worldwide Shipping"
        }
      },
      blog: {
        title: "Research Blog",
        subtitle: "Latest Insights",
        viewAll: "View All Articles"
      },
      testimonials: {
        title: "Trusted by Scientists",
        subtitle: "Testimonials"
      },
      faq: {
        title: "FAQ",
        subtitle: "Frequently Asked Questions"
      },
      cta: {
        title: "Get 10% Off Your First Order",
        subtitle: "Join thousands of researchers who trust Peptide Shop.",
        placeholder: "Enter your email address",
        button: "Get 10% Off"
      }
    },
    product: {
      addToCart: "Add to Cart",
      addedToCart: "Added to Cart",
      buyNow: "Buy Now",
      inStock: "In Stock",
      outOfStock: "Out of Stock",
      purity: "Purity",
      description: "Description",
      specifications: "Specifications",
      reviews: "Reviews",
      faq: "FAQ",
      relatedProducts: "Related Products",
      viewOptions: "View Options",
      wishlistAdd: "Add to wishlist",
      wishlistRemove: "Remove from wishlist",
      casNo: "CAS No.",
      molecularWeight: "Molecular Weight",
      storage: "Storage",
      availableSizes: "Available Sizes",
      priceRangeLabel: "Price Range",
      downloadCoa: "Download COA",
      researchOnlyTitle: "Research Use Only",
      researchOnlyText: "Not for human consumption",
      minQuantity: "Min {qty}",
      off: "OFF",
      pack: "pack",
      packs: "packs",
      vial: "vial",
      vials: "vials",
      bottle: "bottle",
      bottles: "bottles",
      unit: "unit",
      units: "units",
      pricePer: "Price per",
      perUnit: "per",
      selectQuantity: "Select Quantity",
      belowMin: "Below min",
      minRequired: "Minimum Required",
      addMore: "Add {count} more {unit}(s)",
      discountBanner: "Up to 15% OFF + FREE delivery on orders over £{amount}",
      youSave: "You save",
      trust: {
        purity: "≥99% Purity",
        coa: "COA Included",
        delivery: "Fast UK Delivery"
      }
    },
    cart: {
      title: "Shopping Cart",
      empty: "Your cart is empty",
      heroTitle: "Your Shopping Cart",
      heroSubtitle: "Review your research peptides before checkout. All orders include COA documentation.",
      secureCheckout: "Secure Checkout",
      sslEncrypted: "SSL Encrypted",
      checkoutSubtitle: "Complete your order with confidence. All payments are encrypted and secure.",
      readyToCheckout: "✓ Ready to checkout",
      freeDeliveryIncluded: "FREE delivery included!",
      addMoreForFreeDelivery: "Add £{amount} more for FREE delivery",
      browsePeptides: "Browse Peptides",
      cartItemsLabel: "Cart Items",
      item: "item",
      items: "items",
      inStockFastDelivery: "In Stock • Fast delivery",
      each: "each",
      subtotal: "Subtotal",
      shipping: "Shipping",
      calculatedAtCheckout: "Calculated at checkout",
      total: "Total",
      checkout: "Checkout",
      proceedToCheckout: "Proceed to Checkout",
      secureSslEncryptedCheckout: "Secure SSL encrypted checkout",
      orderSummary: "Order Summary",
      bulkDiscountsApplied: "Bulk Discounts Applied",
      freeDelivery: "FREE Delivery",
      deliveryOptions: "Delivery Options",
      standardDelivery: "Standard Delivery",
      standardDeliveryTime: "3-5 business days",
      expressDelivery: "Express Delivery",
      expressDeliveryTime: "1-2 business days",
      ordersOverThreshold: "Orders over £{amount}",
      secureBadge: "Secure",
      pureBadge: "≥99% Pure",
      fastDeliveryBadge: "Fast Delivery",
      yourCartCount: "Your Cart ({count})",
      closeCart: "Close cart",
      addProductsToGetStarted: "Add some products to get started!",
      browseProducts: "Browse Products",
      viewCart: "View Cart",
      addedToCart: "Added to Cart!",
      continueShopping: "Continue Shopping",
      remove: "Remove",
      quantity: "Quantity"
    },
    footer: {
      newsletter: "Subscribe to our newsletter",
      subscribe: "Subscribe",
      aboutUs: "About Us",
      customerService: "Customer Service",
      legal: "Legal",
      termsAndConditions: "Terms & Conditions",
      privacyPolicy: "Privacy Policy",
      disclaimer: "Disclaimer",
      coaPolicy: "COA Policy",
      emailLabel: "Email",
      hoursLabel: "Hours",
      hoursValue: "Mon - Fri: 9AM - 5PM",
      disclaimerLabel: "Disclaimer",
      copyright: "© {year} Peptide Shop. All rights reserved."
    },
    common: {
      all: "All",
      viewOptions: "View Options",
      learnMore: "Learn More",
      readMore: "Read More",
      loading: "Loading...",
      error: "An error occurred",
      success: "Success!",
      free: "Free",
      searchLabel: "Search",
      searching: "Searching...",
      noResultsFound: 'No results found for "{query}"',
      welcome: "Welcome!",
      signInForBestExperience: "Sign in for the best experience",
      signIn: "Sign In",
      createAccount: "Create Account",
      or: "or",
      dashboard: "Dashboard",
      myOrders: "My Orders",
      settings: "Settings",
      signOut: "Sign Out"
    },
    legalPages: {
      lastUpdated: "Last updated",
      terms: {
        title: "Terms and Conditions",
        subtitle: "Please read these terms carefully before using our website and services.",
        acceptance: { title: "1. Acceptance of Terms", content: "By accessing and using this website, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our site." },
        researchUse: { title: "2. Research Use Only", warning: "ALL PRODUCTS SOLD ON THIS SITE ARE FOR LABORATORY RESEARCH PURPOSES ONLY.", notHumans: "Humans or animals", notFood: "Foods, drugs, or cosmetics", notHousehold: "Household chemicals", acknowledgment: "You acknowledge that the products have not been tested for safety or efficacy in food, drug, medical device, cosmetic, commercial or any other use." },
        purchaser: { title: "3. Purchaser Representations", intro: "By purchasing from Peptide Shop, you represent and warrant that:", age: "You are at least 18 years of age.", institution: "You are affiliated with a research institution, laboratory, or are a qualified researcher.", hazards: "You are aware of the health and safety hazards associated with handling research chemicals.", handling: "You will handle, store, and dispose of these products in accordance with all applicable laws and regulations." },
        liability: { title: "4. Limitation of Liability", content: "Peptide Shop shall not be liable for any special, incidental, or consequential damages that result from the use of, or the inability to use, the materials on this site or the performance of the products." },
        governing: { title: "5. Governing Law", content: "These terms shall be governed by and construed in accordance with the laws of the European Union." }
      },
      privacy: {
        title: "Privacy Policy",
        subtitle: "How we collect, use, and protect your personal information.",
        infoCollect: { title: "1. Information We Collect", content: "We collect information you provide directly to us, such as when you request a quote, create an account, or contact customer support. This may include your name, email address, institution, and shipping details." },
        howUse: { title: "2. How We Use Your Information", intro: "We use the information we collect to:", orders: "Process your enquiries and orders.", coa: "Send you technical information and COAs.", questions: "Respond to your comments and questions.", legal: "Comply with legal obligations regarding the sale of research chemicals." },
        security: { title: "3. Data Security", content: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction." },
        cookies: { title: "4. Cookies", content: "We use cookies to improve your experience on our site. You can control cookies through your browser settings." }
      },
      disclaimer: {
        title: "Research Use Only Disclaimer",
        subtitle: "Important information about the intended use of our products.",
        warning: "WARNING: NOT FOR HUMAN CONSUMPTION",
        warningText: "The products offered by Peptide Shop are intended exclusively for laboratory research and development purposes.",
        lead: "These products are not intended for use as food additives, drugs, cosmetics, household chemicals, or other inappropriate applications.",
        patent: "The listing of a material on this site does not constitute a license to its use in infringement of any patent.",
        qualified: "All products must be handled only by qualified and trained individuals. The customer acknowledges that there are hazards associated with the use of these products.",
        rights: "Peptide Shop reserves the right to limit sales of products or not to sell products to unqualified customers."
      },
      shipping: {
        title: "Shipping Information",
        subtitle: "Information about our shipping policies and procedures.",
        policyTitle: "Shipping Policy",
        processing: "Processing Time: Orders are processed within 1-2 business days.",
        method: "Shipping Method: We use tracked courier services for all orders.",
        temperature: "Temperature Control: Temperature-sensitive items are shipped with appropriate packaging.",
        returnsTitle: "Returns Policy",
        customsTitle: "Customs & Import Duties",
        customsContent: "International customers are responsible for any customs duties or import taxes."
      },
      coaPolicy: {
        title: "Certificate of Analysis Policy",
        subtitle: "Our commitment to quality and transparency.",
        batchTitle: "Batch-Specific Testing",
        batchContent: "Every batch of peptides undergoes comprehensive analytical testing before release.",
        methodsTitle: "Verification Methods",
        hplc: "HPLC Analysis: High-Performance Liquid Chromatography for purity verification.",
        ms: "Mass Spectrometry: Confirmation of molecular identity and weight.",
        availTitle: "Availability",
        availContent: "COAs are available for download on each product page and are included with every order."
      }
    }
  },
  nl: {
    nav: {
      home: "Home",
      peptides: "Peptiden",
      categories: "Categorieën",
      allPeptides: "Alle peptiden",
      weightLoss: "Gewichtsverlies",
      muscleRecovery: "Spier & herstel",
      growthHormone: "Groeihormoon",
      tanning: "Bruining",
      cognitive: "Cognitie",
      supplies: "Benodigdheden",
      blog: "Blog",
      about: "Over ons",
      quality: "Kwaliteit",
      contact: "Contact",
      cart: "Winkelwagen",
      account: "Account",
      search: "Zoek peptiden..."
    },
    aboutPage: {
      title: "Over Peptide Shop",
      subtitle: "Toonaangevende Europese leverancier van premium onderzoekspeptiden met geverifieerde zuiverheid en volledige transparantie.",
      sections: {
        excellence: "Toewijding aan wetenschappelijke excellentie",
        mission: "Onze missie",
        quality: "Kwaliteit eerst"
      },
      content: {
        excellence: "Wij zijn een toegewijd team van wetenschappers en supply chain experts die zich inzetten voor het leveren van de hoogste kwaliteit peptiden voor de onderzoeksgemeenschap.",
        mission: "Onze missie is om wetenschappelijke ontdekkingen te versnellen door de variabelen van reagenskwaliteit te elimineren. Wij geloven dat reproduceerbaar onderzoek begint met zuivere, geverifieerde materialen. Daarom richten wij ons uitsluitend op het leveren van onderzoekspeptiden met volledige transparantie.",
        quality: "In een industrie die vaak wordt geplaagd door ondoorzichtigheid, onderscheiden wij ons door uitgebreide analytische gegevens voor elke batch te leveren. Wij claimen niet alleen zuiverheid; wij bewijzen het."
      },
      features: {
        hplc: "HPLC-analyse",
        hplcSubtitle: "Voor zuiverheid ≥99%",
        massSpec: "Massaspectrometrie",
        massSpecSubtitle: "Bevestiging moleculaire identiteit",
        storage: "Strikte opslag",
        storageSubtitle: "Alle voorraad op -20°C"
      }
    },
    contactPage: {
      title: "Neem contact op",
      subtitle: "Vragen over onze producten of een offerte op maat nodig? Ons team helpt graag.",
      section: {
        sendMessage: "Stuur ons een bericht"
      },
      form: {
        name: "Naam",
        email: "E-mailadres",
        subject: "Onderwerp",
        message: "Bericht",
        submit: "Bericht versturen"
      }
    },
    shopPage: {
      title: "Onderzoekspeptiden kopen",
      subtitle: "Bekijk onze catalogus van onderzoekspeptiden met gegarandeerde zuiverheid.",
      showing: "{count} producten",
      sort: {
        featured: "Uitgelicht",
        priceLowHigh: "Prijs: laag naar hoog",
        priceHighLow: "Prijs: hoog naar laag",
        nameAZ: "Naam: A-Z"
      }
    },
    faqPage: {
      title: "Veelgestelde vragen",
      categories: {
        general: "Algemene informatie",
        quality: "Kwaliteit & testen",
        payment: "Bestellen & betalen"
      }
    },
    qualityPage: {
      title: "Kwaliteitsgarantie",
      subtitle: "In wetenschappelijk onderzoek hangt data-integriteit af van reagensintegriteit. Wij implementeren strenge kwaliteitscontrole om te garanderen dat elk flesje aan de hoogste normen voldoet.",
      description: "Onze toewijding aan zuiverheid. Leer over onze HPLC- en massaspectrometrie-testprotocollen voor onderzoekspeptiden.",
      hplcTitle: "HPLC-analyse",
      hplcDescription: "Hoogwaardige vloeistofchromatografie (HPLC) bepaalt de peptidezuiverheid. Wij garanderen minimaal 99% zuiverheid voor alle catalogusartikelen.",
      purityStandard: "Zuiverheidsstandaard",
      msTitle: "Massaspectrometrie",
      msDescription: "Massaspectrometrie (MS) verifieert molecuulgewicht en peptide-identiteit. Dit bevestigt dat de aminozuursequentie correct is.",
      molecularConfirmation: "Moleculaire bevestiging",
      verified: "100% Geverifieerd",
      coaTitle: "Certificaat van Analyse (COA)",
      coaDescription: "Transparantie is essentieel. Een analysecertificaat is beschikbaar voor elke batch die we produceren.",
      coaItems: {
        batchNumber: "Batchnummer",
        dateOfAnalysis: "Datum van analyse",
        molecularWeight: "Molecuulgewicht",
        hplcChromatogram: "HPLC-chromatogram",
        physicalAppearance: "Fysiek uiterlijk",
        solubilityProfile: "Oplosbaarheidsprofiel"
      },
      storageTitle: "Opslag & behandeling",
      storageDescription: "Om de peptidekwaliteit na levering te behouden, raden wij het volgende aan:",
      storageItems: {
        lyophilizedTitle: "Gelyofiliseerde opslag",
        lyophilizedDescription: "Bewaar bij -20°C onmiddellijk na ontvangst",
        lightProtectionTitle: "Lichtbescherming",
        lightProtectionDescription: "Houd weg van direct zonlicht",
        freezeThawTitle: "Vries-dooi cycli",
        freezeThawDescription: "Minimaliseer cycli om peptide-integriteit te behouden"
      }
    },
    shippingPage: {
      title: "Verzendingsinformatie",
      subtitle: "Snelle, veilige levering naar uw locatie",
      description: "Leer over onze verzendmethodes, levertijden en verpakkingsstandaarden."
    },
    termsPage: {
      title: "Algemene voorwaarden",
      description: "Lees deze voorwaarden zorgvuldig door voordat u onze diensten gebruikt."
    },
    privacyPage: {
      title: "Privacybeleid",
      description: "Hoe wij uw persoonlijke informatie verzamelen, gebruiken en beschermen."
    },
    disclaimerPage: {
      title: "Disclaimer",
      description: "Belangrijke juridische informatie over het gebruik van onderzoekspeptiden."
    },
    coaPolicyPage: {
      title: "COA-beleid",
      description: "Ons analysecertificaatbeleid en procedures."
    },
    blogPage: {
      title: "Onderzoeksblog",
      description: "Laatste nieuws over peptideonderzoek, gidsen en wetenschappelijke inzichten.",
      readMore: "Lees meer",
      publishedOn: "Gepubliceerd op",
      byAuthor: "door",
      categories: "Categorieën",
      recentPosts: "Recente berichten",
      searchPosts: "Zoek berichten...",
      noPosts: "Geen berichten gevonden."
    },
    learnPage: {
      title: "Leer over peptiden",
      description: "Educatieve bronnen over peptiden en peptideonderzoek.",
      whatArePeptides: "Wat zijn peptiden?"
    },
    bundlesPage: {
      title: "Peptidebundels",
      description: "Bespaar met onze samengestelde onderzoekspeptidebundels."
    },
    wholesalePage: {
      title: "Groothandel",
      subtitle: "Bulk onderzoekspeptiden voor laboratoria",
      description: "Groothandel onderzoekspeptiden voor laboratoria en instellingen. Bulkprijzen, toegewijde ondersteuning en flexibele betalingsvoorwaarden.",
      applyNow: "Aanvragen voor groothandelsaccount"
    },
    checkout: {
      steps: {
        account: "Account",
        shipping: "Verzending",
        payment: "Betaling",
        review: "Overzicht"
      },
      titles: {
        accountDetails: "Accountgegevens",
        shippingAddress: "Verzendadres",
        paymentMethod: "Betaalmethode",
        billingAddress: "Factuuradres"
      },
      fields: {
        email: "E-mailadres",
        password: "Wachtwoord",
        firstName: "Voornaam",
        lastName: "Achternaam",
        street: "Straat en huisnummer",
        city: "Stad",
        postcode: "Postcode",
        country: "Land",
        phone: "Telefoonnummer"
      },
      shipping: {
        standard: "Standaard verzending",
        express: "Express verzending"
      },
      payment: {
        bankTransfer: "Bankoverschrijving",
        bitcoin: "Bitcoin (BTC)"
      },
      actions: {
        continue: "Doorgaan",
        placeOrder: "Bestelling plaatsen",
        back: "Terug",
        login: "Inloggen",
        guest: "Als gast afrekenen"
      }
    },
    reviews: {
      title: "Klantbeoordelingen",
      showAll: "Toon alle {count} beoordelingen",
      basedOn: "Gebaseerd op {count} beoordelingen",
      stars: "sterren",
      star: "ster",
      verified: "Geverifieerde aankoop",
      noReviews: "Nog geen beoordelingen"
    },
    home: {
      heroBadge: "Europese leverancier voor onderzoek",
      heroTitle: "Premium",
      heroTitleHighlight: "onderzoekpeptiden",
      heroSubtitle: "Hoogzuivere peptiden met batch-COA’s en snelle verwerking.",
      shopNow: "Shop nu",
      viewLabReports: "Labrapporten bekijken",
      stats: {
        ordersDelivered: "Bestellingen geleverd",
        purityGuarantee: "Zuiverheidsgarantie",
        expressShipping: "Express verzending",
        researchLabs: "Onderzoekslabs"
      },
      categories: {
        title: "Categorieën",
        subtitle: "Zoek op onderzoeksdoel"
      },
      bestSellers: {
        title: "Best verkocht",
        subtitle: "Topkeuzes van labs",
        viewAll: "Alles bekijken",
        viewAllPeptides: "Alle peptiden bekijken"
      },
      filters: {
        antiAging: "Anti-aging"
      },
      about: {
        title: "Over Peptide Shop",
        subtitle: "Uw betrouwbare leverancier voor onderzoek.",
        description: "Onze geavanceerde laboratoria en strenge kwaliteitscontrole zorgen ervoor dat elke peptide die we leveren voldoet aan 99%+ zuiverheidsnormen. Of u nu Semaglutide, BPC-157, Tirzepatide of andere onderzoekspeptiden nodig heeft, wij leveren HPLC-geverifieerde verbindingen met volledige COA-documentatie.",
        learnMore: "Meer over ons",
        features: {
          isoCertified: "ISO Gecertificeerd",
          isoCertifiedDesc: "Kwaliteitsmanagement",
          fastDispatch: "Snelle verzending",
          fastDispatchDesc: "24-uurs verwerking",
          expertTeam: "Expert team",
          expertTeamDesc: "PhD wetenschappers",
          globalReach: "Wereldwijd bereik",
          globalReachDesc: "Wereldwijde verzending"
        }
      },
      blog: {
        title: "Onderzoeksblog",
        subtitle: "Laatste inzichten",
        viewAll: "Alle artikelen bekijken"
      },
      testimonials: {
        title: "Vertrouwd door wetenschappers",
        subtitle: "Getuigenissen"
      },
      faq: {
        title: "FAQ",
        subtitle: "Veelgestelde vragen"
      },
      cta: {
        title: "10% korting op uw eerste bestelling",
        subtitle: "Sluit u aan bij duizenden onderzoekers.",
        placeholder: "Voer uw e-mailadres in",
        button: "Krijg 10% korting"
      }
    },
    product: {
      addToCart: "In winkelwagen",
      addedToCart: "Toegevoegd",
      buyNow: "Nu kopen",
      inStock: "Op voorraad",
      outOfStock: "Niet op voorraad",
      purity: "Zuiverheid",
      description: "Beschrijving",
      specifications: "Specificaties",
      reviews: "Beoordelingen",
      faq: "FAQ",
      relatedProducts: "Gerelateerde producten",
      viewOptions: "Bekijk opties",
      wishlistAdd: "Toevoegen aan verlanglijst",
      wishlistRemove: "Verwijderen uit verlanglijst",
      casNo: "CAS-nr.",
      molecularWeight: "Molecuulgewicht",
      storage: "Bewaring",
      availableSizes: "Beschikbare formaten",
      priceRangeLabel: "Prijsbereik",
      downloadCoa: "COA downloaden",
      researchOnlyTitle: "Alleen voor onderzoek",
      researchOnlyText: "Niet voor menselijke consumptie",
      minQuantity: "Min {qty}",
      off: "KORTING",
      vial: "flacon",
      vials: "flacons",
      pack: "verpakking",
      packs: "verpakkingen",
      bottle: "fles",
      bottles: "flessen",
      unit: "eenheid",
      units: "eenheden",
      pricePer: "Prijs per",
      perUnit: "per",
      selectQuantity: "Aantal kiezen",
      belowMin: "Onder minimum",
      minRequired: "Minimum vereist",
      addMore: "Voeg {count} meer {unit}(s) toe",
      discountBanner: "Tot 15% KORTING + GRATIS verzending boven £{amount}",
      youSave: "Je bespaart",
      trust: {
        purity: "≥99% Zuiverheid",
        coa: "COA Inbegrepen",
        delivery: "Snelle levering NL"
      }
    },
    cart: {
      title: "Winkelwagen",
      empty: "Je winkelwagen is leeg",
      heroTitle: "Je winkelwagen",
      heroSubtitle: "Controleer je onderzoekspeptiden voordat je afrekent. Alle bestellingen bevatten COA-documentatie.",
      secureCheckout: "Veilig afrekenen",
      sslEncrypted: "SSL-versleuteld",
      checkoutSubtitle: "Rond je bestelling met vertrouwen af. Alle betalingen zijn versleuteld en veilig.",
      readyToCheckout: "✓ Klaar om af te rekenen",
      freeDeliveryIncluded: "GRATIS levering inbegrepen!",
      addMoreForFreeDelivery: "Voeg £{amount} toe voor GRATIS levering",
      browsePeptides: "Peptiden bekijken",
      cartItemsLabel: "Winkelwagenitems",
      item: "item",
      items: "items",
      inStockFastDelivery: "Op voorraad • Snelle levering",
      each: "per stuk",
      subtotal: "Subtotaal",
      shipping: "Verzending",
      calculatedAtCheckout: "Berekend bij het afrekenen",
      total: "Totaal",
      checkout: "Afrekenen",
      proceedToCheckout: "Verder naar afrekenen",
      secureSslEncryptedCheckout: "Veilig afrekenen met SSL-versleuteling",
      orderSummary: "Besteloverzicht",
      bulkDiscountsApplied: "Bulk-korting toegepast",
      freeDelivery: "GRATIS levering",
      deliveryOptions: "Bezorgopties",
      standardDelivery: "Standaard bezorging",
      standardDeliveryTime: "3-5 werkdagen",
      expressDelivery: "Express bezorging",
      expressDeliveryTime: "1-2 werkdagen",
      ordersOverThreshold: "Bestellingen boven £{amount}",
      secureBadge: "Veilig",
      pureBadge: "≥99% zuiver",
      fastDeliveryBadge: "Snelle levering",
      yourCartCount: "Je winkelwagen ({count})",
      closeCart: "Winkelwagen sluiten",
      addProductsToGetStarted: "Voeg producten toe om te beginnen!",
      browseProducts: "Producten bekijken",
      viewCart: "Winkelwagen bekijken",
      addedToCart: "Toegevoegd aan winkelwagen!",
      continueShopping: "Verder winkelen",
      remove: "Verwijderen",
      quantity: "Aantal"
    },
    footer: {
      newsletter: "Schrijf u in voor onze nieuwsbrief",
      subscribe: "Inschrijven",
      aboutUs: "Over ons",
      customerService: "Klantenservice",
      legal: "Juridisch",
      termsAndConditions: "Algemene voorwaarden",
      privacyPolicy: "Privacybeleid",
      disclaimer: "Disclaimer",
      coaPolicy: "COA-beleid",
      emailLabel: "E-mail",
      hoursLabel: "Openingstijden",
      hoursValue: "Ma - Vr: 9:00 - 17:00",
      disclaimerLabel: "Disclaimer",
      copyright: "© {year} Peptide Shop. Alle rechten voorbehouden."
    },
    common: {
      all: "Alle",
      viewOptions: "Bekijk opties",
      learnMore: "Meer info",
      readMore: "Lees meer",
      loading: "Laden...",
      error: "Er is een fout opgetreden",
      success: "Gelukt!",
      free: "Gratis",
      searchLabel: "Zoeken",
      searching: "Zoeken...",
      noResultsFound: 'Geen resultaten voor "{query}"',
      welcome: "Welkom!",
      signInForBestExperience: "Log in voor de beste ervaring",
      signIn: "Inloggen",
      createAccount: "Account aanmaken",
      or: "of",
      dashboard: "Dashboard",
      myOrders: "Mijn bestellingen",
      settings: "Instellingen",
      signOut: "Uitloggen"
    },
    legalPages: {
      lastUpdated: "Laatst bijgewerkt",
      terms: {
        title: "Algemene Voorwaarden",
        subtitle: "Lees deze voorwaarden zorgvuldig door voordat u onze website en diensten gebruikt.",
        acceptance: { title: "1. Aanvaarding van Voorwaarden", content: "Door deze website te bezoeken en te gebruiken, gaat u akkoord met deze Algemene Voorwaarden. Als u niet akkoord gaat, gebruik onze site dan niet." },
        researchUse: { title: "2. Uitsluitend voor Onderzoek", warning: "ALLE PRODUCTEN OP DEZE SITE ZIJN UITSLUITEND VOOR LABORATORIUMONDERZOEK BESTEMD.", notHumans: "Mensen of dieren", notFood: "Voedingsmiddelen, medicijnen of cosmetica", notHousehold: "Huishoudchemicaliën", acknowledgment: "U erkent dat de producten niet zijn getest op veiligheid of werkzaamheid voor voedsel, medicijnen, medische hulpmiddelen, cosmetica, commercieel of enig ander gebruik." },
        purchaser: { title: "3. Verklaringen van de Koper", intro: "Door bij Peptide Shop te kopen, verklaart en garandeert u dat:", age: "U bent minimaal 18 jaar oud.", institution: "U bent verbonden aan een onderzoeksinstelling, laboratorium, of bent een gekwalificeerde onderzoeker.", hazards: "U bent op de hoogte van de gezondheids- en veiligheidsrisico's verbonden aan het hanteren van onderzoekschemicaliën.", handling: "U zult deze producten hanteren, opslaan en afvoeren in overeenstemming met alle toepasselijke wet- en regelgeving." },
        liability: { title: "4. Beperking van Aansprakelijkheid", content: "Peptide Shop is niet aansprakelijk voor enige speciale, incidentele of gevolgschade die voortvloeit uit het gebruik van, of het onvermogen om te gebruiken, de materialen op deze site of de prestaties van de producten." },
        governing: { title: "5. Toepasselijk Recht", content: "Deze voorwaarden worden beheerst door en geïnterpreteerd in overeenstemming met het recht van de Europese Unie." }
      },
      privacy: {
        title: "Privacybeleid",
        subtitle: "Hoe wij uw persoonlijke gegevens verzamelen, gebruiken en beschermen.",
        infoCollect: { title: "1. Gegevens die We Verzamelen", content: "Wij verzamelen gegevens die u rechtstreeks aan ons verstrekt, zoals wanneer u een offerte aanvraagt, een account aanmaakt of contact opneemt met onze klantenservice. Dit kan uw naam, e-mailadres, instelling en verzendgegevens omvatten." },
        howUse: { title: "2. Hoe We Uw Gegevens Gebruiken", intro: "Wij gebruiken de verzamelde gegevens om:", orders: "Uw aanvragen en bestellingen te verwerken.", coa: "U technische informatie en COA's te sturen.", questions: "Op uw opmerkingen en vragen te reageren.", legal: "Te voldoen aan wettelijke verplichtingen met betrekking tot de verkoop van onderzoekschemicaliën." },
        security: { title: "3. Gegevensbeveiliging", content: "Wij implementeren passende technische en organisatorische maatregelen om uw persoonlijke gegevens te beschermen tegen ongeautoriseerde toegang, wijziging, openbaarmaking of vernietiging." },
        cookies: { title: "4. Cookies", content: "Wij gebruiken cookies om uw ervaring op onze site te verbeteren. U kunt cookies beheren via uw browserinstellingen." }
      },
      disclaimer: {
        title: "Disclaimer - Uitsluitend voor Onderzoek",
        subtitle: "Belangrijke informatie over het beoogde gebruik van onze producten.",
        warning: "WAARSCHUWING: NIET VOOR MENSELIJKE CONSUMPTIE",
        warningText: "De producten van Peptide Shop zijn uitsluitend bestemd voor laboratoriumonderzoek en -ontwikkeling.",
        lead: "Deze producten zijn niet bedoeld voor gebruik als voedingsadditieven, medicijnen, cosmetica, huishoudchemicaliën of andere ongepaste toepassingen.",
        patent: "De vermelding van een materiaal op deze site vormt geen licentie voor het gebruik ervan in strijd met enig octrooi.",
        qualified: "Alle producten mogen alleen worden gehanteerd door gekwalificeerde en getrainde personen. De klant erkent dat er gevaren verbonden zijn aan het gebruik van deze producten.",
        rights: "Peptide Shop behoudt zich het recht voor om de verkoop van producten te beperken of niet te verkopen aan ongekwalificeerde klanten."
      },
      shipping: {
        title: "Verzendinformatie",
        subtitle: "Informatie over ons verzendbeleid en procedures.",
        policyTitle: "Verzendbeleid",
        processing: "Verwerkingstijd: Bestellingen worden binnen 1-2 werkdagen verwerkt.",
        method: "Verzendmethode: Wij gebruiken getraceerde koeriersdiensten voor alle bestellingen.",
        temperature: "Temperatuurcontrole: Temperatuurgevoelige artikelen worden verzonden met gepaste verpakking.",
        returnsTitle: "Retourbeleid",
        customsTitle: "Douane en Invoerrechten",
        customsContent: "Internationale klanten zijn verantwoordelijk voor eventuele douanerechten of invoerbelastingen."
      },
      coaPolicy: {
        title: "Certificaat van Analyse Beleid",
        subtitle: "Onze toewijding aan kwaliteit en transparantie.",
        batchTitle: "Batchspecifieke Testen",
        batchContent: "Elke batch peptiden ondergaat uitgebreide analytische tests voor vrijgave.",
        methodsTitle: "Verificatiemethoden",
        hplc: "HPLC-analyse: High-Performance Liquid Chromatography voor zuiverheidsverificatie.",
        ms: "Massaspectrometrie: Bevestiging van moleculaire identiteit en gewicht.",
        availTitle: "Beschikbaarheid",
        availContent: "COA's zijn beschikbaar voor download op elke productpagina en worden bij elke bestelling meegeleverd."
      }
    }
  },
  de: {
    nav: {
      home: "Startseite",
      peptides: "Peptide kaufen",
      categories: "Kategorien",
      allPeptides: "Alle Peptide",
      weightLoss: "Peptide zum Abnehmen",
      muscleRecovery: "Peptide Muskelaufbau",
      growthHormone: "Wachstumshormone Peptide",
      tanning: "Bräunungspeptide",
      cognitive: "Kognitive Peptide",
      supplies: "Zubehör",
      blog: "Blog",
      about: "Über uns",
      quality: "Qualität & Reinheit",
      contact: "Kontakt",
      cart: "Warenkorb",
      account: "Konto",
      search: "Peptide suchen…"
    },
    aboutPage: {
      title: "Peptide sicher kaufen – Über Peptide Shop",
      subtitle: "Ihr vertrauenswürdiger Anbieter für Peptide kaufen Deutschland. Forschungspeptide mit verifizierter Reinheit, HPLC-Analyse und vollständiger Transparenz – legal und sicher.",
      sections: {
        excellence: "Wissenschaftliche Exzellenz",
        mission: "Unsere Mission: Peptide sicher kaufen",
        quality: "Reinheit & Qualität zuerst"
      },
      content: {
        excellence: "Wir sind ein engagiertes Team von Wissenschaftlern und Lieferkettenexperten, das sich der Bereitstellung hochwertigster Peptide für die Forschungsgemeinschaft widmet.",
        mission: "Unsere Mission ist es, wissenschaftliche Entdeckungen zu beschleunigen, indem wir die Variablen der Reagenzienqualität eliminieren. Wir glauben, dass reproduzierbare Forschung mit reinen, verifizierten Materialien beginnt. Deshalb konzentrieren wir uns ausschließlich auf die Lieferung von Forschungspeptiden mit vollständiger Transparenz.",
        quality: "In einer Branche, die oft von Intransparenz geplagt wird, heben wir uns ab, indem wir umfassende analytische Daten für jede Charge liefern. Wir behaupten nicht nur Reinheit; wir beweisen sie."
      },
      features: {
        hplc: "HPLC-Analyse (≥98%)",
        hplcSubtitle: "Reinheitsverifizierung ≥99%",
        massSpec: "Massenspektrometrie",
        massSpecSubtitle: "Molekulare Identitätsbestätigung",
        storage: "Kühlketten-Lagerung",
        storageSubtitle: "Alle Bestände bei -20°C"
      }
    },
    contactPage: {
      title: "Kontakt",
      subtitle: "Fragen zu Peptide kaufen oder ein individuelles Angebot? Unser Team hilft gerne.",
      section: {
        sendMessage: "Nachricht senden"
      },
      form: {
        name: "Name",
        email: "E-Mail-Adresse",
        subject: "Betreff",
        message: "Nachricht",
        submit: "Nachricht senden"
      }
    },
    shopPage: {
      title: "Peptide online kaufen – Deutschland",
      subtitle: "Peptide kaufen Deutschland: Forschungspeptide mit ≥98% Reinheit, COA-Zertifikat und schnellem Versand. Peptide sicher kaufen bei Peptide Shop.",
      showing: "{count} Produkte",
      sort: {
        featured: "Empfohlen",
        priceLowHigh: "Preis: aufsteigend",
        priceHighLow: "Preis: absteigend",
        nameAZ: "Name: A-Z"
      }
    },
    faqPage: {
      title: "Häufige Fragen – Peptide kaufen",
      categories: {
        general: "Was sind Peptide?",
        quality: "Peptide Reinheit & Analyse",
        payment: "Bestellung & Zahlung"
      }
    },
    qualityPage: {
      title: "Qualitätssicherung",
      subtitle: "In der wissenschaftlichen Forschung hängt die Datenintegrität von der Reagenzienintegrität ab. Wir implementieren strenge Qualitätskontrollen.",
      description: "Unser Engagement für Reinheit. Erfahren Sie mehr über unsere HPLC- und Massenspektrometrie-Testprotokolle.",
      hplcTitle: "HPLC-Analyse",
      hplcDescription: "Hochleistungsflüssigkeitschromatographie (HPLC) bestimmt die Peptidreinheit. Wir garantieren mindestens 99% Reinheit für alle Katalogprodukte.",
      purityStandard: "Reinheitsstandard",
      msTitle: "Massenspektrometrie",
      msDescription: "Massenspektrometrie (MS) verifiziert Molekulargewicht und Peptididentität. Dies bestätigt die korrekte Aminosäuresequenz.",
      molecularConfirmation: "Molekulare Bestätigung",
      verified: "100% Verifiziert",
      coaTitle: "Analysezertifikat (COA)",
      coaDescription: "Transparenz ist entscheidend. Ein Analysezertifikat ist für jede produzierte Charge verfügbar.",
      coaItems: {
        batchNumber: "Chargennummer",
        dateOfAnalysis: "Analysedatum",
        molecularWeight: "Molekulargewicht",
        hplcChromatogram: "HPLC-Chromatogramm",
        physicalAppearance: "Physisches Erscheinungsbild",
        solubilityProfile: "Löslichkeitsprofil"
      },
      storageTitle: "Lagerung & Handhabung",
      storageDescription: "Um die Peptidqualität nach der Lieferung zu erhalten, empfehlen wir:",
      storageItems: {
        lyophilizedTitle: "Lyophilisierte Lagerung",
        lyophilizedDescription: "Bei -20°C sofort nach Erhalt lagern",
        lightProtectionTitle: "Lichtschutz",
        lightProtectionDescription: "Von direktem Sonnenlicht fernhalten",
        freezeThawTitle: "Gefrier-Auftau-Zyklen",
        freezeThawDescription: "Zyklen minimieren zur Erhaltung der Peptidintegrität"
      }
    },
    shippingPage: {
      title: "Versandinformationen",
      subtitle: "Schnelle, sichere Lieferung an Ihren Standort",
      description: "Erfahren Sie mehr über unsere Versandmethoden, Lieferzeiten und Verpackungsstandards."
    },
    termsPage: {
      title: "Allgemeine Geschäftsbedingungen",
      description: "Bitte lesen Sie diese Bedingungen sorgfältig durch."
    },
    privacyPage: {
      title: "Datenschutzerklärung",
      description: "Wie wir Ihre persönlichen Daten sammeln, nutzen und schützen."
    },
    disclaimerPage: {
      title: "Haftungsausschluss",
      description: "Wichtige rechtliche Informationen zur Verwendung von Forschungspeptiden."
    },
    coaPolicyPage: {
      title: "COA-Richtlinie",
      description: "Unsere Analysezertifikat-Richtlinie und Verfahren."
    },
    blogPage: {
      title: "Forschungsblog",
      description: "Neueste Peptidforschungsnachrichten, Leitfäden und wissenschaftliche Erkenntnisse.",
      readMore: "Weiterlesen",
      publishedOn: "Veröffentlicht am",
      byAuthor: "von",
      categories: "Kategorien",
      recentPosts: "Neueste Beiträge",
      searchPosts: "Beiträge suchen...",
      noPosts: "Keine Beiträge gefunden."
    },
    learnPage: {
      title: "Über Peptide lernen",
      description: "Bildungsressourcen über Peptide und Peptidforschung.",
      whatArePeptides: "Was sind Peptide?"
    },
    bundlesPage: {
      title: "Peptid-Bundles",
      description: "Sparen Sie mit unseren kuratierten Forschungspeptid-Bundles."
    },
    wholesalePage: {
      title: "Großhandel",
      subtitle: "Bulk-Forschungspeptide für Labore",
      description: "Großhandel-Forschungspeptide für Labore und Institutionen. Mengenpreise, dedizierter Support und flexible Zahlungsbedingungen.",
      applyNow: "Großhandelskonto beantragen"
    },
    checkout: {
      steps: {
        account: "Konto",
        shipping: "Versand",
        payment: "Zahlung",
        review: "Prüfen"
      },
      titles: {
        accountDetails: "Kontodetails",
        shippingAddress: "Lieferadresse",
        paymentMethod: "Zahlungsmethode",
        billingAddress: "Rechnungsadresse"
      },
      fields: {
        email: "E-Mail-Adresse",
        password: "Passwort",
        firstName: "Vorname",
        lastName: "Nachname",
        street: "Straße und Hausnummer",
        city: "Stadt",
        postcode: "Postleitzahl",
        country: "Land",
        phone: "Telefonnummer"
      },
      shipping: {
        standard: "Standardversand",
        express: "Expressversand"
      },
      payment: {
        bankTransfer: "Banküberweisung",
        bitcoin: "Bitcoin (BTC)"
      },
      actions: {
        continue: "Weiter",
        placeOrder: "Bestellung aufgeben",
        back: "Zurück",
        login: "Anmelden",
        guest: "Als Gast"
      }
    },
    reviews: {
      title: "Kundenbewertungen",
      showAll: "Alle {count} Bewertungen anzeigen",
      basedOn: "Basierend auf {count} Bewertungen",
      stars: "Sterne",
      star: "Stern",
      verified: "Verifizierter Kauf",
      noReviews: "Noch keine Bewertungen"
    },
    home: {
      heroBadge: "Peptide kaufen Deutschland – Ihr Peptide Shop",
      heroTitle: "Peptide kaufen",
      heroTitleHighlight: "legal & sicher",
      heroSubtitle: "Peptide online kaufen mit ≥98% Reinheit, COA-Zertifikat pro Charge und schnellem Versand nach Deutschland, Österreich und Schweiz.",
      shopNow: "Peptide kaufen",
      viewLabReports: "COA-Zertifikate ansehen",
      stats: {
        ordersDelivered: "Bestellungen geliefert",
        purityGuarantee: "Reinheitsgarantie",
        expressShipping: "Expressversand DE",
        researchLabs: "Forschungslabore"
      },
      categories: {
        title: "Peptide Kategorien",
        subtitle: "Wo kann man Peptide kaufen? Hier nach Forschungsfokus:"
      },
      bestSellers: {
        title: "Meistverkaufte Peptide",
        subtitle: "BPC-157, TB-500, Semaglutide & mehr",
        viewAll: "Alle Peptide",
        viewAllPeptides: "Alle Peptide kaufen"
      },
      filters: {
        antiAging: "Anti-Aging Peptide"
      },
      about: {
        title: "Warum Peptide Shop?",
        subtitle: "Peptide sicher kaufen bei Deutschlands vertrauenswürdigstem Anbieter.",
        description: "Unsere hochmodernen Labore und strenge Qualitätskontrolle stellen sicher, dass jedes Peptid, das wir liefern, 99%+ Reinheitsstandards erfüllt. Ob Sie Semaglutide, BPC-157, Tirzepatide oder andere Forschungspeptide benötigen, wir liefern HPLC-verifizierte Verbindungen mit vollständiger COA-Dokumentation.",
        learnMore: "Mehr erfahren",
        features: {
          isoCertified: "ISO Zertifiziert",
          isoCertifiedDesc: "Qualitätsmanagement",
          fastDispatch: "Schneller Versand",
          fastDispatchDesc: "24-Stunden Bearbeitung",
          expertTeam: "Experten-Team",
          expertTeamDesc: "PhD Wissenschaftler",
          globalReach: "Globale Reichweite",
          globalReachDesc: "Weltweiter Versand"
        }
      },
      blog: {
        title: "Forschungsblog",
        subtitle: "Aktuelle Erkenntnisse",
        viewAll: "Alle Artikel ansehen"
      },
      testimonials: {
        title: "Von Wissenschaftlern vertraut",
        subtitle: "Referenzen"
      },
      faq: {
        title: "Häufige Fragen",
        subtitle: "Häufig gestellte Fragen"
      },
      cta: {
        title: "10% Rabatt auf Ihre erste Bestellung",
        subtitle: "Peptide kaufen Deutschland – Jetzt Newsletter abonnieren.",
        placeholder: "E-Mail-Adresse eingeben",
        button: "10% Rabatt sichern"
      }
    },
    product: {
      addToCart: "In den Warenkorb",
      addedToCart: "Hinzugefügt",
      buyNow: "Jetzt kaufen",
      inStock: "Auf Lager – Sofort lieferbar",
      outOfStock: "Derzeit nicht verfügbar",
      purity: "Reinheit (HPLC)",
      description: "Beschreibung",
      specifications: "Spezifikationen",
      reviews: "Kundenbewertungen",
      faq: "Häufige Fragen",
      relatedProducts: "Weitere Peptide kaufen",
      viewOptions: "Optionen ansehen",
      wishlistAdd: "Zur Wunschliste hinzufügen",
      wishlistRemove: "Von der Wunschliste entfernen",
      casNo: "CAS-Nr.",
      molecularWeight: "Molekulargewicht",
      storage: "Lagerung",
      availableSizes: "Verfügbare Größen",
      priceRangeLabel: "Preisspanne",
      downloadCoa: "COA herunterladen",
      researchOnlyTitle: "Nur für Forschungszwecke",
      researchOnlyText: "Nicht für den menschlichen Verzehr",
      minQuantity: "Min {qty}",
      off: "RABATT",
      vial: "Ampulle",
      vials: "Ampullen",
      pack: "Packung",
      packs: "Packungen",
      bottle: "Flasche",
      bottles: "Flaschen",
      unit: "Einheit",
      units: "Einheiten",
      pricePer: "Preis pro",
      perUnit: "pro",
      selectQuantity: "Menge wählen",
      belowMin: "Unter Mindestbestellwert",
      minRequired: "Mindestbestellwert erforderlich",
      addMore: "Fügen Sie {count} weitere {unit}(en) hinzu",
      discountBanner: "Bis zu 15% RABATT + KOSTENLOSER Versand ab £{amount}",
      youSave: "Sie sparen",
      trust: {
        purity: "≥99% Reinheit",
        coa: "COA-Zertifikat",
        delivery: "Schneller Versand DE"
      }
    },
    cart: {
      title: "Warenkorb",
      empty: "Dein Warenkorb ist leer",
      heroTitle: "Dein Warenkorb",
      heroSubtitle: "Überprüfe deine Forschungspeptide vor dem Checkout. Alle Bestellungen enthalten COA-Dokumentation.",
      secureCheckout: "Sicherer Checkout",
      sslEncrypted: "SSL-verschlüsselt",
      checkoutSubtitle: "Schließe deine Bestellung sicher ab. Alle Zahlungen sind verschlüsselt und sicher.",
      readyToCheckout: "✓ Bereit zum Checkout",
      freeDeliveryIncluded: "KOSTENLOSE Lieferung inklusive!",
      addMoreForFreeDelivery: "Füge £{amount} hinzu für KOSTENLOSE Lieferung",
      browsePeptides: "Peptide entdecken",
      cartItemsLabel: "Warenkorbartikel",
      item: "Artikel",
      items: "Artikel",
      inStockFastDelivery: "Auf Lager • Schnelle Lieferung",
      each: "pro Stück",
      subtotal: "Zwischensumme",
      shipping: "Versand",
      calculatedAtCheckout: "Wird beim Checkout berechnet",
      total: "Gesamt",
      checkout: "Zur Kasse",
      proceedToCheckout: "Weiter zur Kasse",
      secureSslEncryptedCheckout: "Sicherer SSL-verschlüsselter Checkout",
      orderSummary: "Bestellübersicht",
      bulkDiscountsApplied: "Mengenrabatte angewendet",
      freeDelivery: "KOSTENLOSE Lieferung",
      deliveryOptions: "Lieferoptionen",
      standardDelivery: "Standardversand",
      standardDeliveryTime: "3-5 Werktage",
      expressDelivery: "Expressversand",
      expressDeliveryTime: "1-2 Werktage",
      ordersOverThreshold: "Bestellungen über £{amount}",
      secureBadge: "Sicher",
      pureBadge: "≥99% rein",
      fastDeliveryBadge: "Schnelle Lieferung",
      yourCartCount: "Dein Warenkorb ({count})",
      closeCart: "Warenkorb schließen",
      addProductsToGetStarted: "Füge Produkte hinzu, um zu starten!",
      browseProducts: "Produkte ansehen",
      viewCart: "Warenkorb ansehen",
      addedToCart: "In den Warenkorb gelegt!",
      continueShopping: "Weiter einkaufen",
      remove: "Entfernen",
      quantity: "Menge"
    },
    footer: {
      newsletter: "Newsletter – 10% Rabatt sichern",
      subscribe: "Abonnieren",
      aboutUs: "Über Peptide Shop",
      customerService: "Kundenservice",
      legal: "Rechtliches",
      termsAndConditions: "AGB",
      privacyPolicy: "Datenschutz (DSGVO)",
      disclaimer: "Haftungsausschluss",
      coaPolicy: "COA-Zertifikate",
      emailLabel: "E-Mail",
      hoursLabel: "Erreichbarkeit",
      hoursValue: "Mo – Fr: 9:00 – 17:00 Uhr",
      disclaimerLabel: "Hinweis",
      copyright: "© {year} Peptide Shop – Peptide kaufen Deutschland. Alle Rechte vorbehalten."
    },
    common: {
      all: "Alle",
      viewOptions: "Optionen",
      learnMore: "Mehr erfahren",
      readMore: "Weiterlesen",
      loading: "Lädt...",
      error: "Ein Fehler ist aufgetreten",
      success: "Erfolg!",
      free: "Kostenlos",
      searchLabel: "Suche",
      searching: "Suche…",
      noResultsFound: 'Keine Ergebnisse für "{query}"',
      welcome: "Willkommen!",
      signInForBestExperience: "Melde dich an für das beste Erlebnis",
      signIn: "Anmelden",
      createAccount: "Konto erstellen",
      or: "oder",
      dashboard: "Dashboard",
      myOrders: "Meine Bestellungen",
      settings: "Einstellungen",
      signOut: "Abmelden"
    },
    legalPages: {
      lastUpdated: "Zuletzt aktualisiert",
      terms: {
        title: "Allgemeine Geschäftsbedingungen",
        subtitle: "Bitte lesen Sie diese Bedingungen sorgfältig durch, bevor Sie unsere Website und Dienste nutzen.",
        acceptance: { title: "1. Annahme der Bedingungen", content: "Durch den Zugriff auf und die Nutzung dieser Website erklären Sie sich mit diesen Allgemeinen Geschäftsbedingungen einverstanden. Wenn Sie nicht einverstanden sind, nutzen Sie unsere Seite bitte nicht." },
        researchUse: { title: "2. Nur für Forschungszwecke", warning: "ALLE AUF DIESER WEBSITE VERKAUFTEN PRODUKTE SIND AUSSCHLIESSLICH FÜR LABORFORSCHUNGSZWECKE BESTIMMT.", notHumans: "Menschen oder Tiere", notFood: "Lebensmittel, Arzneimittel oder Kosmetika", notHousehold: "Haushaltschemikalien", acknowledgment: "Sie erkennen an, dass die Produkte nicht auf Sicherheit oder Wirksamkeit für Lebensmittel, Arzneimittel, Medizinprodukte, Kosmetika, kommerzielle oder andere Verwendungszwecke getestet wurden." },
        purchaser: { title: "3. Erklärungen des Käufers", intro: "Mit dem Kauf bei Peptide Shop erklären und garantieren Sie, dass:", age: "Sie mindestens 18 Jahre alt sind.", institution: "Sie einer Forschungseinrichtung, einem Labor angehören oder ein qualifizierter Forscher sind.", hazards: "Sie sich der Gesundheits- und Sicherheitsrisiken beim Umgang mit Forschungschemikalien bewusst sind.", handling: "Sie diese Produkte in Übereinstimmung mit allen geltenden Gesetzen und Vorschriften handhaben, lagern und entsorgen werden." },
        liability: { title: "4. Haftungsbeschränkung", content: "Peptide Shop haftet nicht für besondere, zufällige oder Folgeschäden, die aus der Nutzung oder der Unfähigkeit zur Nutzung der Materialien auf dieser Website oder der Leistung der Produkte resultieren." },
        governing: { title: "5. Anwendbares Recht", content: "Diese Bedingungen unterliegen dem Recht der Europäischen Union und werden entsprechend ausgelegt." }
      },
      privacy: {
        title: "Datenschutzerklärung",
        subtitle: "Wie wir Ihre persönlichen Daten erfassen, verwenden und schützen.",
        infoCollect: { title: "1. Daten, die wir erfassen", content: "Wir erfassen Informationen, die Sie uns direkt zur Verfügung stellen, z.B. wenn Sie ein Angebot anfordern, ein Konto erstellen oder den Kundendienst kontaktieren. Dies kann Ihren Namen, Ihre E-Mail-Adresse, Institution und Versanddetails umfassen." },
        howUse: { title: "2. Wie wir Ihre Daten verwenden", intro: "Wir verwenden die erfassten Informationen, um:", orders: "Ihre Anfragen und Bestellungen zu bearbeiten.", coa: "Ihnen technische Informationen und COAs zu senden.", questions: "Auf Ihre Kommentare und Fragen zu antworten.", legal: "Gesetzlichen Verpflichtungen beim Verkauf von Forschungschemikalien nachzukommen." },
        security: { title: "3. Datensicherheit", content: "Wir implementieren angemessene technische und organisatorische Maßnahmen, um Ihre personenbezogenen Daten vor unbefugtem Zugriff, Änderung, Offenlegung oder Zerstörung zu schützen." },
        cookies: { title: "4. Cookies", content: "Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. Sie können Cookies über Ihre Browsereinstellungen steuern." }
      },
      disclaimer: {
        title: "Haftungsausschluss - Nur für Forschungszwecke",
        subtitle: "Wichtige Informationen über den bestimmungsgemäßen Gebrauch unserer Produkte.",
        warning: "WARNUNG: NICHT FÜR DEN MENSCHLICHEN VERZEHR",
        warningText: "Die von Peptide Shop angebotenen Produkte sind ausschließlich für Laborforschung und -entwicklung bestimmt.",
        lead: "Diese Produkte sind nicht für die Verwendung als Lebensmittelzusatzstoffe, Arzneimittel, Kosmetika, Haushaltschemikalien oder andere unangemessene Anwendungen bestimmt.",
        patent: "Die Auflistung eines Materials auf dieser Website stellt keine Lizenz für dessen Verwendung unter Verletzung eines Patents dar.",
        qualified: "Alle Produkte dürfen nur von qualifizierten und geschulten Personen gehandhabt werden. Der Kunde erkennt an, dass mit der Verwendung dieser Produkte Gefahren verbunden sind.",
        rights: "Peptide Shop behält sich das Recht vor, den Verkauf von Produkten einzuschränken oder nicht an unqualifizierte Kunden zu verkaufen."
      },
      shipping: {
        title: "Versandinformationen",
        subtitle: "Informationen zu unseren Versandrichtlinien und -verfahren.",
        policyTitle: "Versandrichtlinie",
        processing: "Bearbeitungszeit: Bestellungen werden innerhalb von 1-2 Werktagen bearbeitet.",
        method: "Versandmethode: Wir verwenden nachverfolgbare Kurierdienste für alle Bestellungen.",
        temperature: "Temperaturkontrolle: Temperaturempfindliche Artikel werden mit geeigneter Verpackung versendet.",
        returnsTitle: "Rückgaberichtlinie",
        customsTitle: "Zoll und Einfuhrabgaben",
        customsContent: "Internationale Kunden sind für eventuelle Zollgebühren oder Einfuhrsteuern verantwortlich."
      },
      coaPolicy: {
        title: "COA-Zertifikat Richtlinie",
        subtitle: "Unser Engagement für Qualität und Transparenz.",
        batchTitle: "Chargenspezifische Prüfung",
        batchContent: "Jede Charge Peptide durchläuft vor der Freigabe umfassende analytische Tests.",
        methodsTitle: "Prüfmethoden",
        hplc: "HPLC-Analyse: Hochleistungsflüssigkeitschromatographie zur Reinheitsprüfung.",
        ms: "Massenspektrometrie: Bestätigung der molekularen Identität und des Gewichts.",
        availTitle: "Verfügbarkeit",
        availContent: "COAs stehen auf jeder Produktseite zum Download bereit und werden jeder Bestellung beigelegt."
      }
    }
  },
  fr: {
    nav: {
      home: "Accueil",
      peptides: "Peptides",
      categories: "Catégories",
      allPeptides: "Tous les peptides",
      weightLoss: "Perte de poids",
      muscleRecovery: "Muscle & récupération",
      growthHormone: "Hormone de croissance",
      tanning: "Bronzage",
      cognitive: "Cognitif",
      supplies: "Fournitures",
      blog: "Blog",
      about: "À propos",
      quality: "Qualité",
      contact: "Contact",
      cart: "Panier",
      account: "Compte",
      search: "Rechercher des peptides…"
    },
    aboutPage: {
      title: "À propos de Peptide Shop",
      subtitle: "Fournisseur européen de peptides de recherche avec pureté vérifiée et transparence totale.",
      sections: {
        excellence: "Engagement scientifique",
        mission: "Notre mission",
        quality: "Qualité avant tout"
      },
      content: {
        excellence: "Nous sommes une équipe dédiée de scientifiques et d'experts en chaîne d'approvisionnement engagés à fournir des peptides de la plus haute qualité pour la communauté de recherche.",
        mission: "Notre mission est d'accélérer la découverte scientifique en éliminant les variables de qualité des réactifs. Nous croyons que la recherche reproductible commence par des matériaux purs et vérifiés. C'est pourquoi nous nous concentrons exclusivement sur la fourniture de peptides de recherche avec une transparence totale.",
        quality: "Dans une industrie souvent marquée par l'opacité, nous nous distinguons en fournissant des données analytiques complètes pour chaque lot. Nous ne prétendons pas seulement à la pureté ; nous la prouvons."
      },
      features: {
        hplc: "Analyse HPLC",
        hplcSubtitle: "Vérification pureté ≥99%",
        massSpec: "Spectrométrie de masse",
        massSpecSubtitle: "Confirmation identité moléculaire",
        storage: "Stockage strict",
        storageSubtitle: "Tout stock à -20°C"
      }
    },
    contactPage: {
      title: "Nous contacter",
      subtitle: "Des questions ou besoin d’un devis ? Notre équipe est là pour aider.",
      section: {
        sendMessage: "Envoyer un message"
      },
      form: {
        name: "Nom",
        email: "Adresse e-mail",
        subject: "Objet",
        message: "Message",
        submit: "Envoyer"
      }
    },
    shopPage: {
      title: "Acheter des peptides de recherche",
      subtitle: "Parcourez notre catalogue de peptides de recherche.",
      showing: "{count} produits",
      sort: {
        featured: "En vedette",
        priceLowHigh: "Prix : croissant",
        priceHighLow: "Prix : décroissant",
        nameAZ: "Nom : A-Z"
      }
    },
    faqPage: {
      title: "Questions fréquentes",
      categories: {
        general: "Informations générales",
        quality: "Qualité & tests",
        payment: "Commande & paiement"
      }
    },
    qualityPage: {
      title: "Assurance qualité",
      subtitle: "Dans la recherche scientifique, l'intégrité des données dépend de l'intégrité des réactifs. Nous mettons en œuvre des contrôles de qualité rigoureux.",
      description: "Notre engagement envers la pureté. Découvrez nos protocoles de test HPLC et spectrométrie de masse.",
      hplcTitle: "Analyse HPLC",
      hplcDescription: "La chromatographie liquide haute performance (HPLC) détermine la pureté des peptides. Nous garantissons une pureté minimale de 99%.",
      purityStandard: "Norme de pureté",
      msTitle: "Spectrométrie de masse",
      msDescription: "La spectrométrie de masse (MS) vérifie le poids moléculaire et l'identité du peptide.",
      molecularConfirmation: "Confirmation moléculaire",
      verified: "100% Vérifié",
      coaTitle: "Certificat d'analyse (COA)",
      coaDescription: "La transparence est essentielle. Un certificat d'analyse est disponible pour chaque lot produit.",
      coaItems: {
        batchNumber: "Numéro de lot",
        dateOfAnalysis: "Date d'analyse",
        molecularWeight: "Poids moléculaire",
        hplcChromatogram: "Chromatogramme HPLC",
        physicalAppearance: "Aspect physique",
        solubilityProfile: "Profil de solubilité"
      },
      storageTitle: "Stockage & manipulation",
      storageDescription: "Pour maintenir la qualité des peptides après livraison, nous recommandons :",
      storageItems: {
        lyophilizedTitle: "Stockage lyophilisé",
        lyophilizedDescription: "Conserver à -20°C dès réception",
        lightProtectionTitle: "Protection contre la lumière",
        lightProtectionDescription: "Tenir à l'abri de la lumière directe",
        freezeThawTitle: "Cycles gel-dégel",
        freezeThawDescription: "Minimiser les cycles pour préserver l'intégrité"
      }
    },
    shippingPage: {
      title: "Informations de livraison",
      subtitle: "Livraison rapide et sécurisée",
      description: "Découvrez nos méthodes d'expédition, délais de livraison et normes d'emballage."
    },
    termsPage: {
      title: "Conditions générales",
      description: "Veuillez lire attentivement ces conditions avant d'utiliser nos services."
    },
    privacyPage: {
      title: "Politique de confidentialité",
      description: "Comment nous collectons, utilisons et protégeons vos informations personnelles."
    },
    disclaimerPage: {
      title: "Avertissement",
      description: "Informations juridiques importantes sur l'utilisation des peptides de recherche."
    },
    coaPolicyPage: {
      title: "Politique COA",
      description: "Notre politique et procédures de certificat d'analyse."
    },
    blogPage: {
      title: "Blog de recherche",
      description: "Actualités, guides et perspectives scientifiques sur les peptides.",
      readMore: "Lire la suite",
      publishedOn: "Publié le",
      byAuthor: "par",
      categories: "Catégories",
      recentPosts: "Articles récents",
      searchPosts: "Rechercher...",
      noPosts: "Aucun article trouvé."
    },
    learnPage: {
      title: "Apprendre sur les peptides",
      description: "Ressources éducatives sur les peptides et la recherche peptidique.",
      whatArePeptides: "Que sont les peptides ?"
    },
    bundlesPage: {
      title: "Lots de peptides",
      description: "Économisez avec nos lots de peptides de recherche."
    },
    wholesalePage: {
      title: "Grossiste",
      subtitle: "Peptides de recherche en gros pour laboratoires",
      description: "Peptides de recherche en gros pour laboratoires et institutions. Prix de gros, support dédié et conditions de paiement flexibles.",
      applyNow: "Demander un compte grossiste"
    },
    checkout: {
      steps: {
        account: "Compte",
        shipping: "Livraison",
        payment: "Paiement",
        review: "Vérification"
      },
      titles: {
        accountDetails: "Détails du compte",
        shippingAddress: "Adresse de livraison",
        paymentMethod: "Mode de paiement",
        billingAddress: "Adresse de facturation"
      },
      fields: {
        email: "Adresse e-mail",
        password: "Mot de passe",
        firstName: "Prénom",
        lastName: "Nom",
        street: "Adresse",
        city: "Ville",
        postcode: "Code postal",
        country: "Pays",
        phone: "Téléphone"
      },
      shipping: {
        standard: "Livraison standard",
        express: "Livraison express"
      },
      payment: {
        bankTransfer: "Virement bancaire",
        bitcoin: "Bitcoin (BTC)"
      },
      actions: {
        continue: "Continuer",
        placeOrder: "Passer la commande",
        back: "Retour",
        login: "Connexion",
        guest: "Commander en tant qu'invité"
      }
    },
    reviews: {
      title: "Avis clients",
      showAll: "Voir les {count} avis",
      basedOn: "Basé sur {count} avis",
      stars: "étoiles",
      star: "étoile",
      verified: "Achat vérifié",
      noReviews: "Aucun avis"
    },
    home: {
      heroBadge: "Fournisseur européen",
      heroTitle: "Peptides",
      heroTitleHighlight: "de recherche",
      heroSubtitle: "Peptides de haute pureté avec COA par lot et traitement rapide.",
      shopNow: "Acheter",
      viewLabReports: "Voir les rapports",
      stats: {
        ordersDelivered: "Commandes livrées",
        purityGuarantee: "Garantie de pureté",
        expressShipping: "Livraison express",
        researchLabs: "Laboratoires"
      },
      categories: {
        title: "Catégories",
        subtitle: "Par focus de recherche"
      },
      bestSellers: {
        title: "Meilleures ventes",
        subtitle: "Sélection des laboratoires",
        viewAll: "Tout voir",
        viewAllPeptides: "Voir tous les peptides"
      },
      filters: {
        antiAging: "Anti-âge"
      },
      about: {
        title: "À propos",
        subtitle: "Votre partenaire fiable pour la recherche.",
        description: "Nos laboratoires de pointe et nos processus rigoureux de contrôle qualité garantissent que chaque peptide fourni répond aux normes de pureté de 99%+. Que vous ayez besoin de Semaglutide, BPC-157, Tirzepatide ou d'autres peptides de recherche, nous fournissons des composés vérifiés par HPLC avec documentation COA complète.",
        learnMore: "En savoir plus",
        features: {
          isoCertified: "Certifié ISO",
          isoCertifiedDesc: "Gestion de la qualité",
          fastDispatch: "Expédition rapide",
          fastDispatchDesc: "Traitement 24h",
          expertTeam: "Équipe d'experts",
          expertTeamDesc: "Scientifiques PhD",
          globalReach: "Portée mondiale",
          globalReachDesc: "Expédition mondiale"
        }
      },
      blog: {
        title: "Blog de recherche",
        subtitle: "Dernières découvertes",
        viewAll: "Voir tous les articles"
      },
      testimonials: {
        title: "Approuvé par les scientifiques",
        subtitle: "Témoignages"
      },
      faq: {
        title: "FAQ",
        subtitle: "Questions fréquentes"
      },
      cta: {
        title: "10% de réduction sur votre première commande",
        subtitle: "Rejoignez des milliers de chercheurs.",
        placeholder: "Saisissez votre e-mail",
        button: "Obtenir -10%"
      }
    },
    product: {
      addToCart: "Ajouter au panier",
      addedToCart: "Ajouté",
      buyNow: "Acheter",
      inStock: "En stock",
      outOfStock: "Rupture",
      purity: "Pureté",
      description: "Description",
      specifications: "Spécifications",
      reviews: "Avis",
      faq: "FAQ",
      relatedProducts: "Produits associés",
      viewOptions: "Voir les options",
      wishlistAdd: "Ajouter à la liste de souhaits",
      wishlistRemove: "Retirer de la liste de souhaits",
      casNo: "N° CAS",
      molecularWeight: "Poids moléculaire",
      storage: "Stockage",
      availableSizes: "Formats disponibles",
      priceRangeLabel: "Fourchette de prix",
      downloadCoa: "Télécharger le COA",
      researchOnlyTitle: "Usage de recherche uniquement",
      researchOnlyText: "Non destiné à la consommation humaine",
      minQuantity: "Min {qty}",
      off: "RÉDUCTION",
      pack: "paquet",
      packs: "paquets",
      vial: "flacon",
      vials: "flacons",
      bottle: "flacon",
      bottles: "flacons",
      unit: "unité",
      units: "unités",
      pricePer: "Prix par",
      perUnit: "par",
      selectQuantity: "Choisir la quantité",
      belowMin: "Sous le minimum",
      minRequired: "Minimum requis",
      addMore: "Ajoutez {count} de plus {unit}(s)",
      discountBanner: "Jusqu'à 15% de RÉDUCTION + Livraison GRATUITE dès £{amount}",
      youSave: "Vous économisez",
      trust: {
        purity: "Pureté ≥99%",
        coa: "COA Inclus",
        delivery: "Livraison Rapide FR"
      }
    },
    cart: {
      title: "Panier",
      empty: "Votre panier est vide",
      heroTitle: "Votre panier",
      heroSubtitle: "Vérifiez vos peptides de recherche avant le paiement. Toutes les commandes incluent une documentation COA.",
      secureCheckout: "Paiement sécurisé",
      sslEncrypted: "SSL chiffré",
      checkoutSubtitle: "Finalisez votre commande en toute confiance. Tous les paiements sont chiffrés et sécurisés.",
      readyToCheckout: "✓ Prêt à payer",
      freeDeliveryIncluded: "Livraison GRATUITE incluse !",
      addMoreForFreeDelivery: "Ajoutez £{amount} pour la livraison GRATUITE",
      browsePeptides: "Voir les peptides",
      cartItemsLabel: "Articles du panier",
      item: "article",
      items: "articles",
      inStockFastDelivery: "En stock • Livraison rapide",
      each: "chacun",
      subtotal: "Sous-total",
      shipping: "Livraison",
      calculatedAtCheckout: "Calculé au paiement",
      total: "Total",
      checkout: "Paiement",
      proceedToCheckout: "Passer au paiement",
      secureSslEncryptedCheckout: "Paiement sécurisé chiffré SSL",
      orderSummary: "Récapitulatif de commande",
      bulkDiscountsApplied: "Remises de volume appliquées",
      freeDelivery: "Livraison GRATUITE",
      deliveryOptions: "Options de livraison",
      standardDelivery: "Livraison standard",
      standardDeliveryTime: "3-5 jours ouvrés",
      expressDelivery: "Livraison express",
      expressDeliveryTime: "1-2 jours ouvrés",
      ordersOverThreshold: "Commandes au-dessus de £{amount}",
      secureBadge: "Sécurisé",
      pureBadge: "≥99% pur",
      fastDeliveryBadge: "Livraison rapide",
      yourCartCount: "Votre panier ({count})",
      closeCart: "Fermer le panier",
      addProductsToGetStarted: "Ajoutez des produits pour commencer !",
      browseProducts: "Voir les produits",
      viewCart: "Voir le panier",
      addedToCart: "Ajouté au panier !",
      continueShopping: "Continuer vos achats",
      remove: "Supprimer",
      quantity: "Quantité"
    },
    footer: {
      newsletter: "S’abonner à la newsletter",
      subscribe: "S’abonner",
      aboutUs: "À propos",
      customerService: "Service client",
      legal: "Mentions légales",
      termsAndConditions: "Conditions",
      privacyPolicy: "Confidentialité",
      disclaimer: "Avertissement",
      coaPolicy: "Politique COA",
      emailLabel: "E-mail",
      hoursLabel: "Horaires",
      hoursValue: "Lun - Ven : 9:00 - 17:00",
      disclaimerLabel: "Avertissement",
      copyright: "© {year} Peptide Shop. Tous droits réservés."
    },
    common: {
      all: "Tous",
      viewOptions: "Voir les options",
      learnMore: "En savoir plus",
      readMore: "Lire la suite",
      loading: "Chargement...",
      error: "Une erreur est survenue",
      success: "Succès !",
      free: "Gratuit",
      searchLabel: "Recherche",
      searching: "Recherche…",
      noResultsFound: 'Aucun résultat pour "{query}"',
      welcome: "Bienvenue !",
      signInForBestExperience: "Connectez-vous pour une meilleure expérience",
      signIn: "Se connecter",
      createAccount: "Créer un compte",
      or: "ou",
      dashboard: "Tableau de bord",
      myOrders: "Mes commandes",
      settings: "Paramètres",
      signOut: "Se déconnecter"
    },
    legalPages: {
      lastUpdated: "Dernière mise à jour",
      terms: {
        title: "Conditions Générales",
        subtitle: "Veuillez lire attentivement ces conditions avant d'utiliser notre site web et nos services.",
        acceptance: { title: "1. Acceptation des Conditions", content: "En accédant et en utilisant ce site web, vous acceptez d'être lié par ces Conditions Générales. Si vous n'êtes pas d'accord, veuillez ne pas utiliser notre site." },
        researchUse: { title: "2. Usage de Recherche Uniquement", warning: "TOUS LES PRODUITS VENDUS SUR CE SITE SONT DESTINÉS EXCLUSIVEMENT À LA RECHERCHE EN LABORATOIRE.", notHumans: "Humains ou animaux", notFood: "Aliments, médicaments ou cosmétiques", notHousehold: "Produits chimiques ménagers", acknowledgment: "Vous reconnaissez que les produits n'ont pas été testés pour leur sécurité ou leur efficacité dans l'alimentation, les médicaments, les dispositifs médicaux, les cosmétiques, à des fins commerciales ou tout autre usage." },
        purchaser: { title: "3. Déclarations de l'Acheteur", intro: "En achetant chez Peptide Shop, vous déclarez et garantissez que :", age: "Vous avez au moins 18 ans.", institution: "Vous êtes affilié à un institut de recherche, un laboratoire, ou vous êtes un chercheur qualifié.", hazards: "Vous êtes conscient des risques pour la santé et la sécurité liés à la manipulation de produits chimiques de recherche.", handling: "Vous manipulerez, stockerez et éliminerez ces produits conformément à toutes les lois et réglementations applicables." },
        liability: { title: "4. Limitation de Responsabilité", content: "Peptide Shop ne sera pas responsable des dommages spéciaux, accessoires ou consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser les matériaux sur ce site ou les performances des produits." },
        governing: { title: "5. Loi Applicable", content: "Ces conditions sont régies et interprétées conformément aux lois de l'Union Européenne." }
      },
      privacy: {
        title: "Politique de Confidentialité",
        subtitle: "Comment nous collectons, utilisons et protégeons vos informations personnelles.",
        infoCollect: { title: "1. Informations que Nous Collectons", content: "Nous collectons les informations que vous nous fournissez directement, par exemple lorsque vous demandez un devis, créez un compte ou contactez le service client. Cela peut inclure votre nom, adresse e-mail, institution et détails de livraison." },
        howUse: { title: "2. Comment Nous Utilisons Vos Informations", intro: "Nous utilisons les informations collectées pour :", orders: "Traiter vos demandes et commandes.", coa: "Vous envoyer des informations techniques et des COA.", questions: "Répondre à vos commentaires et questions.", legal: "Respecter les obligations légales concernant la vente de produits chimiques de recherche." },
        security: { title: "3. Sécurité des Données", content: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisés." },
        cookies: { title: "4. Cookies", content: "Nous utilisons des cookies pour améliorer votre expérience sur notre site. Vous pouvez contrôler les cookies via les paramètres de votre navigateur." }
      },
      disclaimer: {
        title: "Avertissement - Usage de Recherche Uniquement",
        subtitle: "Informations importantes sur l'utilisation prévue de nos produits.",
        warning: "AVERTISSEMENT : NON DESTINÉ À LA CONSOMMATION HUMAINE",
        warningText: "Les produits proposés par Peptide Shop sont destinés exclusivement à la recherche et au développement en laboratoire.",
        lead: "Ces produits ne sont pas destinés à être utilisés comme additifs alimentaires, médicaments, cosmétiques, produits chimiques ménagers ou autres applications inappropriées.",
        patent: "L'inscription d'un matériau sur ce site ne constitue pas une licence pour son utilisation en violation d'un brevet.",
        qualified: "Tous les produits doivent être manipulés uniquement par des personnes qualifiées et formées. Le client reconnaît qu'il existe des dangers associés à l'utilisation de ces produits.",
        rights: "Peptide Shop se réserve le droit de limiter les ventes de produits ou de ne pas vendre aux clients non qualifiés."
      },
      shipping: {
        title: "Informations de Livraison",
        subtitle: "Informations sur nos politiques et procédures d'expédition.",
        policyTitle: "Politique d'Expédition",
        processing: "Délai de traitement : Les commandes sont traitées sous 1-2 jours ouvrés.",
        method: "Méthode d'expédition : Nous utilisons des services de messagerie suivis pour toutes les commandes.",
        temperature: "Contrôle de température : Les articles sensibles à la température sont expédiés avec un emballage approprié.",
        returnsTitle: "Politique de Retour",
        customsTitle: "Douanes et Droits d'Importation",
        customsContent: "Les clients internationaux sont responsables des droits de douane ou taxes d'importation éventuels."
      },
      coaPolicy: {
        title: "Politique du Certificat d'Analyse",
        subtitle: "Notre engagement envers la qualité et la transparence.",
        batchTitle: "Tests par Lot",
        batchContent: "Chaque lot de peptides subit des tests analytiques complets avant sa libération.",
        methodsTitle: "Méthodes de Vérification",
        hplc: "Analyse HPLC : Chromatographie liquide haute performance pour la vérification de la pureté.",
        ms: "Spectrométrie de masse : Confirmation de l'identité moléculaire et du poids.",
        availTitle: "Disponibilité",
        availContent: "Les COA sont disponibles au téléchargement sur chaque page produit et sont inclus dans chaque commande."
      }
    }
  },
  es: {
    nav: {
      home: "Inicio",
      peptides: "Péptidos",
      categories: "Categorías",
      allPeptides: "Todos los péptidos",
      weightLoss: "Pérdida de peso",
      muscleRecovery: "Músculo y recuperación",
      growthHormone: "Hormona del crecimiento",
      tanning: "Bronceado",
      cognitive: "Cognitivo",
      supplies: "Suministros",
      blog: "Blog",
      about: "Sobre nosotros",
      quality: "Calidad",
      contact: "Contacto",
      cart: "Carrito",
      account: "Cuenta",
      search: "Buscar péptidos…"
    },
    aboutPage: {
      title: "Sobre Peptide Shop",
      subtitle: "Proveedor europeo de péptidos de investigación con pureza verificada y transparencia.",
      sections: {
        excellence: "Excelencia científica",
        mission: "Nuestra misión",
        quality: "Calidad primero"
      },
      features: {
        hplc: "Análisis HPLC",
        hplcSubtitle: "Pureza ≥98% verificada",
        massSpec: "Espectrometría de masas",
        massSpecSubtitle: "Peso molecular confirmado",
        storage: "Almacenamiento estricto",
        storageSubtitle: "Cadena de frío mantenida"
      },
      content: {
        excellence: "En Peptide Shop, estamos comprometidos a ofrecer a los investigadores péptidos de la más alta calidad con pureza verificada y documentación científica completa.",
        mission: "Nuestra misión es empoderar la investigación científica proporcionando péptidos de grado de investigación premium, acompañados de un servicio y apoyo excepcional.",
        quality: "Cada producto es sometido a rigurosas pruebas de control de calidad con Certificados de Análisis completos proporcionados para garantizar la consistencia lote a lote."
      }
    },
    contactPage: {
      title: "Contacto",
      subtitle: "¿Preguntas o necesitas un presupuesto? Nuestro equipo puede ayudarte.",
      section: {
        sendMessage: "Envíanos un mensaje"
      },
      form: {
        name: "Nombre",
        email: "Correo electrónico",
        subject: "Asunto",
        message: "Mensaje",
        submit: "Enviar"
      }
    },
    shopPage: {
      title: "Comprar péptidos de investigación",
      subtitle: "Explora nuestro catálogo de péptidos de investigación.",
      showing: "{count} productos",
      sort: {
        featured: "Destacados",
        priceLowHigh: "Precio: menor a mayor",
        priceHighLow: "Precio: mayor a menor",
        nameAZ: "Nombre: A-Z"
      }
    },
    faqPage: {
      title: "Preguntas frecuentes",
      categories: {
        general: "Información general",
        quality: "Calidad y pruebas",
        payment: "Pedido y pago"
      }
    },
    qualityPage: {
      title: "Garantía de calidad",
      subtitle: "En la investigación científica, la integridad de los datos depende de la integridad de los reactivos. Implementamos controles de calidad rigurosos.",
      description: "Nuestro compromiso con la pureza. Conozca nuestros protocolos de prueba HPLC y espectrometría de masas.",
      hplcTitle: "Análisis HPLC",
      hplcDescription: "La cromatografía líquida de alta resolución (HPLC) determina la pureza del péptido. Garantizamos un mínimo del 99% de pureza.",
      purityStandard: "Estándar de pureza",
      msTitle: "Espectrometría de masas",
      msDescription: "La espectrometría de masas (MS) verifica el peso molecular y la identidad del péptido.",
      molecularConfirmation: "Confirmación molecular",
      verified: "100% Verificado",
      coaTitle: "Certificado de análisis (COA)",
      coaDescription: "La transparencia es clave. Un certificado de análisis está disponible para cada lote producido.",
      coaItems: {
        batchNumber: "Número de lote",
        dateOfAnalysis: "Fecha de análisis",
        molecularWeight: "Peso molecular",
        hplcChromatogram: "Cromatograma HPLC",
        physicalAppearance: "Apariencia física",
        solubilityProfile: "Perfil de solubilidad"
      },
      storageTitle: "Almacenamiento y manejo",
      storageDescription: "Para mantener la calidad del péptido después de la entrega, recomendamos:",
      storageItems: {
        lyophilizedTitle: "Almacenamiento liofilizado",
        lyophilizedDescription: "Almacenar a -20°C inmediatamente al recibir",
        lightProtectionTitle: "Protección contra la luz",
        lightProtectionDescription: "Mantener alejado de la luz solar directa",
        freezeThawTitle: "Ciclos de congelación-descongelación",
        freezeThawDescription: "Minimizar los ciclos para preservar la integridad"
      }
    },
    shippingPage: {
      title: "Información de envío",
      subtitle: "Entrega rápida y segura",
      description: "Conozca nuestros métodos de envío, tiempos de entrega y estándares de embalaje."
    },
    termsPage: {
      title: "Términos y condiciones",
      description: "Por favor lea estos términos cuidadosamente antes de usar nuestros servicios."
    },
    privacyPage: {
      title: "Política de privacidad",
      description: "Cómo recopilamos, usamos y protegemos su información personal."
    },
    disclaimerPage: {
      title: "Descargo de responsabilidad",
      description: "Información legal importante sobre el uso de péptidos de investigación."
    },
    coaPolicyPage: {
      title: "Política de COA",
      description: "Nuestra política y procedimientos de certificado de análisis."
    },
    blogPage: {
      title: "Blog de investigación",
      description: "Últimas noticias, guías e información científica sobre péptidos.",
      readMore: "Leer más",
      publishedOn: "Publicado el",
      byAuthor: "por",
      categories: "Categorías",
      recentPosts: "Publicaciones recientes",
      searchPosts: "Buscar...",
      noPosts: "No se encontraron publicaciones."
    },
    learnPage: {
      title: "Aprende sobre péptidos",
      description: "Recursos educativos sobre péptidos e investigación peptídica.",
      whatArePeptides: "¿Qué son los péptidos?"
    },
    bundlesPage: {
      title: "Paquetes de péptidos",
      description: "Ahorra con nuestros paquetes de péptidos de investigación."
    },
    wholesalePage: {
      title: "Mayorista",
      subtitle: "Péptidos de investigación al por mayor para laboratorios",
      description: "Péptidos de investigación al por mayor para laboratorios e instituciones. Precios de volumen, soporte dedicado y condiciones de pago flexibles.",
      applyNow: "Solicitar cuenta mayorista"
    },
    checkout: {
      steps: {
        account: "Cuenta",
        shipping: "Envío",
        payment: "Pago",
        review: "Revisión"
      },
      titles: {
        accountDetails: "Datos de la cuenta",
        shippingAddress: "Dirección de envío",
        paymentMethod: "Método de pago",
        billingAddress: "Dirección de facturación"
      },
      fields: {
        email: "Correo electrónico",
        password: "Contraseña",
        firstName: "Nombre",
        lastName: "Apellido",
        street: "Dirección",
        city: "Ciudad",
        postcode: "Código postal",
        country: "País",
        phone: "Teléfono"
      },
      shipping: {
        standard: "Envío estándar",
        express: "Envío exprés"
      },
      payment: {
        bankTransfer: "Transferencia bancaria",
        bitcoin: "Bitcoin (BTC)"
      },
      actions: {
        continue: "Continuar",
        placeOrder: "Realizar pedido",
        back: "Volver",
        login: "Iniciar sesión",
        guest: "Comprar como invitado"
      }
    },
    reviews: {
      title: "Opiniones de clientes",
      showAll: "Ver las {count} opiniones",
      basedOn: "Basado en {count} opiniones",
      stars: "estrellas",
      star: "estrella",
      verified: "Compra verificada",
      noReviews: "No hay opiniones"
    },
    home: {
      heroBadge: "Proveedor europeo",
      heroTitle: "Péptidos",
      heroTitleHighlight: "de investigación",
      heroSubtitle: "Péptidos de alta pureza con COA por lote y envío rápido.",
      shopNow: "Comprar",
      viewLabReports: "Ver informes",
      stats: {
        ordersDelivered: "Pedidos entregados",
        purityGuarantee: "Garantía de pureza",
        expressShipping: "Envío exprés",
        researchLabs: "Laboratorios"
      },
      categories: {
        title: "Categorías",
        subtitle: "Por enfoque de investigación"
      },
      bestSellers: {
        title: "Más vendidos",
        subtitle: "Selección de laboratorios",
        viewAll: "Ver todo",
        viewAllPeptides: "Ver todos los péptidos"
      },
      filters: {
        antiAging: "Anti-edad"
      },
      about: {
        title: "Sobre nosotros",
        subtitle: "Tu proveedor fiable para investigación.",
        description: "Nuestras instalaciones de laboratorio de última generación y rigurosos procesos de control de calidad aseguran que cada péptido que suministramos cumple con los estándares de pureza del 99%+. Ya sea que necesite Semaglutide, BPC-157, Tirzepatide u otros péptidos de investigación, proporcionamos compuestos verificados por HPLC con documentación COA completa.",
        learnMore: "Más información",
        features: {
          isoCertified: "Certificado ISO",
          isoCertifiedDesc: "Gestión de calidad",
          fastDispatch: "Envío rápido",
          fastDispatchDesc: "Procesamiento 24h",
          expertTeam: "Equipo experto",
          expertTeamDesc: "Científicos PhD",
          globalReach: "Alcance global",
          globalReachDesc: "Envío mundial"
        }
      },
      blog: {
        title: "Blog de investigación",
        subtitle: "Últimas novedades",
        viewAll: "Ver todos los artículos"
      },
      testimonials: {
        title: "Confiado por científicos",
        subtitle: "Testimonios"
      },
      faq: {
        title: "FAQ",
        subtitle: "Preguntas frecuentes"
      },
      cta: {
        title: "10% de descuento en tu primer pedido",
        subtitle: "Únete a miles de investigadores.",
        placeholder: "Introduce tu correo",
        button: "Obtener -10%"
      }
    },
    product: {
      addToCart: "Añadir al carrito",
      addedToCart: "Añadido",
      buyNow: "Comprar ahora",
      inStock: "En stock",
      outOfStock: "Agotado",
      purity: "Pureza",
      description: "Descripción",
      pricePer: "Precio por",
      perUnit: "por",
      selectQuantity: "Seleccionar cantidad",
      belowMin: "Debajo del mínimo",
      minRequired: "Mínimo requerido",
      addMore: "Añadir {count} más {unit}(s)",
      discountBanner: "Hasta 15% DCTO + Envío GRATIS en pedidos de más de £{amount}",
      youSave: "Ahorras",
      trust: {
        purity: "Pureza ≥99%",
        coa: "COA Incluido",
        delivery: "Envío Rápido ES"
      },
      specifications: "Especificaciones",
      reviews: "Reseñas",
      faq: "FAQ",
      relatedProducts: "Productos relacionados",
      viewOptions: "Ver opciones",
      wishlistAdd: "Añadir a la lista de deseos",
      wishlistRemove: "Quitar de la lista de deseos",
      casNo: "N.º CAS",
      molecularWeight: "Peso molecular",
      storage: "Almacenamiento",
      availableSizes: "Tamaños disponibles",
      priceRangeLabel: "Rango de precios",
      downloadCoa: "Descargar COA",
      researchOnlyTitle: "Solo para investigación",
      researchOnlyText: "No apto para consumo humano",
      minQuantity: "Mín {qty}",
      off: "DTO",
      pack: "paquete",
      packs: "paquetes",
      vial: "vial",
      vials: "viales",
      bottle: "frasco",
      bottles: "frascos",
      unit: "unidad",
      units: "unidades"
    },
    cart: {
      title: "Carrito",
      empty: "Tu carrito está vacío",
      heroTitle: "Tu carrito",
      heroSubtitle: "Revisa tus péptidos de investigación antes de pagar. Todos los pedidos incluyen documentación COA.",
      secureCheckout: "Pago seguro",
      sslEncrypted: "Cifrado SSL",
      checkoutSubtitle: "Completa tu pedido con confianza. Todos los pagos están cifrados y son seguros.",
      readyToCheckout: "✓ Listo para pagar",
      freeDeliveryIncluded: "¡Envío GRATIS incluido!",
      addMoreForFreeDelivery: "Añade £{amount} más para envío GRATIS",
      browsePeptides: "Ver péptidos",
      cartItemsLabel: "Artículos del carrito",
      item: "artículo",
      items: "artículos",
      inStockFastDelivery: "En stock • Envío rápido",
      each: "cada uno",
      subtotal: "Subtotal",
      shipping: "Envío",
      calculatedAtCheckout: "Calculado al pagar",
      total: "Total",
      checkout: "Pagar",
      proceedToCheckout: "Ir al pago",
      secureSslEncryptedCheckout: "Pago seguro con cifrado SSL",
      orderSummary: "Resumen del pedido",
      bulkDiscountsApplied: "Descuentos por volumen aplicados",
      freeDelivery: "Envío GRATIS",
      deliveryOptions: "Opciones de envío",
      standardDelivery: "Envío estándar",
      standardDeliveryTime: "3-5 días laborables",
      expressDelivery: "Envío exprés",
      expressDeliveryTime: "1-2 días laborables",
      ordersOverThreshold: "Pedidos superiores a £{amount}",
      secureBadge: "Seguro",
      pureBadge: "≥99% puro",
      fastDeliveryBadge: "Envío rápido",
      yourCartCount: "Tu carrito ({count})",
      closeCart: "Cerrar carrito",
      addProductsToGetStarted: "¡Añade productos para empezar!",
      browseProducts: "Ver productos",
      viewCart: "Ver carrito",
      addedToCart: "¡Añadido al carrito!",
      continueShopping: "Seguir comprando",
      remove: "Eliminar",
      quantity: "Cantidad"
    },
    footer: {
      newsletter: "Suscríbete al boletín",
      subscribe: "Suscribirse",
      aboutUs: "Sobre nosotros",
      customerService: "Atención al cliente",
      legal: "Legal",
      termsAndConditions: "Términos y condiciones",
      privacyPolicy: "Política de privacidad",
      disclaimer: "Aviso legal",
      coaPolicy: "Política COA",
      emailLabel: "Correo",
      hoursLabel: "Horario",
      hoursValue: "Lun - Vie: 9:00 - 17:00",
      disclaimerLabel: "Aviso",
      copyright: "© {year} Peptide Shop. Todos los derechos reservados."
    },
    common: {
      all: "Todos",
      viewOptions: "Ver opciones",
      learnMore: "Saber más",
      readMore: "Leer más",
      loading: "Cargando...",
      error: "Ocurrió un error",
      success: "¡Éxito!",
      free: "Gratis",
      searchLabel: "Buscar",
      searching: "Buscando…",
      noResultsFound: 'No se encontraron resultados para "{query}"',
      welcome: "¡Bienvenido!",
      signInForBestExperience: "Inicia sesión para una mejor experiencia",
      signIn: "Iniciar sesión",
      createAccount: "Crear cuenta",
      or: "o",
      dashboard: "Panel",
      myOrders: "Mis pedidos",
      settings: "Ajustes",
      signOut: "Cerrar sesión"
    },
    legalPages: {
      lastUpdated: "Última actualización",
      terms: {
        title: "Términos y Condiciones",
        subtitle: "Por favor lea estos términos cuidadosamente antes de usar nuestro sitio web y servicios.",
        acceptance: { title: "1. Aceptación de Términos", content: "Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo, por favor no utilice nuestro sitio." },
        researchUse: { title: "2. Solo para Uso de Investigación", warning: "TODOS LOS PRODUCTOS VENDIDOS EN ESTE SITIO SON EXCLUSIVAMENTE PARA FINES DE INVESTIGACIÓN DE LABORATORIO.", notHumans: "Humanos o animales", notFood: "Alimentos, medicamentos o cosméticos", notHousehold: "Productos químicos domésticos", acknowledgment: "Usted reconoce que los productos no han sido probados para seguridad o eficacia en alimentos, medicamentos, dispositivos médicos, cosméticos, uso comercial o cualquier otro uso." },
        purchaser: { title: "3. Declaraciones del Comprador", intro: "Al comprar en Peptide Shop, usted declara y garantiza que:", age: "Tiene al menos 18 años de edad.", institution: "Está afiliado a una institución de investigación, laboratorio, o es un investigador calificado.", hazards: "Es consciente de los riesgos de salud y seguridad asociados con el manejo de productos químicos de investigación.", handling: "Manipulará, almacenará y eliminará estos productos de acuerdo con todas las leyes y regulaciones aplicables." },
        liability: { title: "4. Limitación de Responsabilidad", content: "Peptide Shop no será responsable de ningún daño especial, incidental o consecuente que resulte del uso o la imposibilidad de uso de los materiales en este sitio o del rendimiento de los productos." },
        governing: { title: "5. Ley Aplicable", content: "Estos términos se regirán e interpretarán de acuerdo con las leyes de la Unión Europea." }
      },
      privacy: {
        title: "Política de Privacidad",
        subtitle: "Cómo recopilamos, usamos y protegemos su información personal.",
        infoCollect: { title: "1. Información que Recopilamos", content: "Recopilamos la información que nos proporciona directamente, como cuando solicita un presupuesto, crea una cuenta o contacta con el servicio de atención al cliente. Esto puede incluir su nombre, dirección de correo electrónico, institución y detalles de envío." },
        howUse: { title: "2. Cómo Usamos Su Información", intro: "Utilizamos la información recopilada para:", orders: "Procesar sus consultas y pedidos.", coa: "Enviarle información técnica y COAs.", questions: "Responder a sus comentarios y preguntas.", legal: "Cumplir con las obligaciones legales relacionadas con la venta de productos químicos de investigación." },
        security: { title: "3. Seguridad de Datos", content: "Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos personales contra el acceso no autorizado, alteración, divulgación o destrucción." },
        cookies: { title: "4. Cookies", content: "Utilizamos cookies para mejorar su experiencia en nuestro sitio. Puede controlar las cookies a través de la configuración de su navegador." }
      },
      disclaimer: {
        title: "Aviso Legal - Solo para Investigación",
        subtitle: "Información importante sobre el uso previsto de nuestros productos.",
        warning: "ADVERTENCIA: NO PARA CONSUMO HUMANO",
        warningText: "Los productos ofrecidos por Peptide Shop están destinados exclusivamente para investigación y desarrollo de laboratorio.",
        lead: "Estos productos no están destinados para su uso como aditivos alimentarios, medicamentos, cosméticos, productos químicos domésticos u otras aplicaciones inapropiadas.",
        patent: "La inclusión de un material en este sitio no constituye una licencia para su uso en infracción de ninguna patente.",
        qualified: "Todos los productos deben ser manipulados únicamente por personas cualificadas y capacitadas. El cliente reconoce que existen peligros asociados con el uso de estos productos.",
        rights: "Peptide Shop se reserva el derecho de limitar las ventas de productos o no vender a clientes no cualificados."
      },
      shipping: {
        title: "Información de Envío",
        subtitle: "Información sobre nuestras políticas y procedimientos de envío.",
        policyTitle: "Política de Envío",
        processing: "Tiempo de procesamiento: Los pedidos se procesan en 1-2 días hábiles.",
        method: "Método de envío: Utilizamos servicios de mensajería con seguimiento para todos los pedidos.",
        temperature: "Control de temperatura: Los artículos sensibles a la temperatura se envían con embalaje apropiado.",
        returnsTitle: "Política de Devoluciones",
        customsTitle: "Aduanas y Derechos de Importación",
        customsContent: "Los clientes internacionales son responsables de cualquier arancel aduanero o impuesto de importación."
      },
      coaPolicy: {
        title: "Política del Certificado de Análisis",
        subtitle: "Nuestro compromiso con la calidad y la transparencia.",
        batchTitle: "Pruebas por Lote",
        batchContent: "Cada lote de péptidos se somete a pruebas analíticas exhaustivas antes de su liberación.",
        methodsTitle: "Métodos de Verificación",
        hplc: "Análisis HPLC: Cromatografía líquida de alta resolución para verificación de pureza.",
        ms: "Espectrometría de masas: Confirmación de identidad molecular y peso.",
        availTitle: "Disponibilidad",
        availContent: "Los COAs están disponibles para descargar en cada página de producto y se incluyen con cada pedido."
      }
    }
  },
  it: {
    nav: {
      home: "Home",
      peptides: "Peptidi",
      categories: "Categorie",
      allPeptides: "Tutti i peptidi",
      weightLoss: "Perdita di peso",
      muscleRecovery: "Muscolo e recupero",
      growthHormone: "Ormone della crescita",
      tanning: "Abbronzatura",
      cognitive: "Cognitivo",
      supplies: "Forniture",
      blog: "Blog",
      about: "Chi siamo",
      quality: "Qualità",
      contact: "Contatto",
      cart: "Carrello",
      account: "Account",
      search: "Cerca peptidi…"
    },
    aboutPage: {
      title: "Chi è Peptide Shop",
      subtitle: "Fornitore europeo di peptidi da ricerca con purezza verificata e trasparenza.",
      sections: {
        excellence: "Eccellenza scientifica",
        mission: "La nostra missione",
        quality: "Qualità prima di tutto"
      },
      features: {
        hplc: "Analisi HPLC",
        hplcSubtitle: "Purezza ≥98% verificata",
        massSpec: "Spettrometria di massa",
        massSpecSubtitle: "Peso molecolare confermato",
        storage: "Stoccaggio rigoroso",
        storageSubtitle: "Catena del freddo mantenuta"
      },
      content: {
        excellence: "In Peptide Shop, ci impegniamo a fornire ai ricercatori peptidi della massima qualità con purezza verificata e documentazione scientifica completa.",
        mission: "La nostra missione è potenziare la ricerca scientifica fornendo peptidi di grado ricerca premium, accompagnati da servizio e supporto eccezionale.",
        quality: "Ogni prodotto viene sottoposto a rigorosi test di controllo qualità con Certificati di Analisi completi forniti per garantire la coerenza tra i lotti."
      }
    },
    contactPage: {
      title: "Contattaci",
      subtitle: "Domande o preventivo? Il nostro team è qui per aiutare.",
      section: {
        sendMessage: "Invia un messaggio"
      },
      form: {
        name: "Nome",
        email: "Email",
        subject: "Oggetto",
        message: "Messaggio",
        submit: "Invia"
      }
    },
    shopPage: {
      title: "Acquista peptidi da ricerca",
      subtitle: "Sfoglia il nostro catalogo di peptidi da ricerca.",
      showing: "{count} prodotti",
      sort: {
        featured: "In evidenza",
        priceLowHigh: "Prezzo: crescente",
        priceHighLow: "Prezzo: decrescente",
        nameAZ: "Nome: A-Z"
      }
    },
    faqPage: {
      title: "Domande frequenti",
      categories: {
        general: "Informazioni generali",
        quality: "Qualità e test",
        payment: "Ordine e pagamento"
      }
    },
    qualityPage: {
      title: "Garanzia di qualità",
      subtitle: "Nella ricerca scientifica, l'integrità dei dati dipende dall'integrità dei reagenti. Implementiamo rigorosi controlli di qualità.",
      description: "Il nostro impegno per la purezza. Scopri i nostri protocolli di test HPLC e spettrometria di massa.",
      hplcTitle: "Analisi HPLC",
      hplcDescription: "La cromatografia liquida ad alte prestazioni (HPLC) determina la purezza del peptide. Garantiamo un minimo del 99% di purezza.",
      purityStandard: "Standard di purezza",
      msTitle: "Spettrometria di massa",
      msDescription: "La spettrometria di massa (MS) verifica il peso molecolare e l'identità del peptide.",
      molecularConfirmation: "Conferma molecolare",
      verified: "100% Verificato",
      coaTitle: "Certificato di analisi (COA)",
      coaDescription: "La trasparenza è fondamentale. Un certificato di analisi è disponibile per ogni lotto prodotto.",
      coaItems: {
        batchNumber: "Numero di lotto",
        dateOfAnalysis: "Data di analisi",
        molecularWeight: "Peso molecolare",
        hplcChromatogram: "Cromatogramma HPLC",
        physicalAppearance: "Aspetto fisico",
        solubilityProfile: "Profilo di solubilità"
      },
      storageTitle: "Conservazione e manipolazione",
      storageDescription: "Per mantenere la qualità del peptide dopo la consegna, raccomandiamo:",
      storageItems: {
        lyophilizedTitle: "Conservazione liofilizzata",
        lyophilizedDescription: "Conservare a -20°C immediatamente al ricevimento",
        lightProtectionTitle: "Protezione dalla luce",
        lightProtectionDescription: "Tenere lontano dalla luce solare diretta",
        freezeThawTitle: "Cicli di congelamento-scongelamento",
        freezeThawDescription: "Minimizzare i cicli per preservare l'integrità"
      }
    },
    shippingPage: {
      title: "Informazioni sulla spedizione",
      subtitle: "Consegna rapida e sicura",
      description: "Scopri i nostri metodi di spedizione, tempi di consegna e standard di imballaggio."
    },
    termsPage: {
      title: "Termini e condizioni",
      description: "Si prega di leggere attentamente questi termini prima di utilizzare i nostri servizi."
    },
    privacyPage: {
      title: "Informativa sulla privacy",
      description: "Come raccogliamo, utilizziamo e proteggiamo le tue informazioni personali."
    },
    disclaimerPage: {
      title: "Disclaimer",
      description: "Informazioni legali importanti sull'uso dei peptidi da ricerca."
    },
    coaPolicyPage: {
      title: "Politica COA",
      description: "La nostra politica e le procedure del certificato di analisi."
    },
    blogPage: {
      title: "Blog di ricerca",
      description: "Ultime notizie, guide e approfondimenti scientifici sui peptidi.",
      readMore: "Leggi di più",
      publishedOn: "Pubblicato il",
      byAuthor: "di",
      categories: "Categorie",
      recentPosts: "Post recenti",
      searchPosts: "Cerca...",
      noPosts: "Nessun post trovato."
    },
    learnPage: {
      title: "Impara sui peptidi",
      description: "Risorse educative sui peptidi e la ricerca peptidica.",
      whatArePeptides: "Cosa sono i peptidi?"
    },
    bundlesPage: {
      title: "Pacchetti di peptidi",
      description: "Risparmia con i nostri pacchetti di peptidi da ricerca."
    },
    wholesalePage: {
      title: "Ingrosso",
      subtitle: "Peptidi da ricerca all'ingrosso per laboratori",
      description: "Peptidi da ricerca all'ingrosso per laboratori e istituzioni. Prezzi all'ingrosso, supporto dedicato e condizioni di pagamento flessibili.",
      applyNow: "Richiedi account ingrosso"
    },
    checkout: {
      steps: {
        account: "Account",
        shipping: "Spedizione",
        payment: "Pagamento",
        review: "Riepilogo"
      },
      titles: {
        accountDetails: "Dettagli account",
        shippingAddress: "Indirizzo di spedizione",
        paymentMethod: "Metodo di pagamento",
        billingAddress: "Indirizzo di fatturazione"
      },
      fields: {
        email: "Indirizzo email",
        password: "Password",
        firstName: "Nome",
        lastName: "Cognome",
        street: "Indirizzo",
        city: "Città",
        postcode: "CAP",
        country: "Paese",
        phone: "Telefono"
      },
      shipping: {
        standard: "Spedizione standard",
        express: "Spedizione express"
      },
      payment: {
        bankTransfer: "Bonifico bancario",
        bitcoin: "Bitcoin (BTC)"
      },
      actions: {
        continue: "Continua",
        placeOrder: "Effettua ordine",
        back: "Indietro",
        login: "Accedi",
        guest: "Acquista come ospite"
      }
    },
    reviews: {
      title: "Recensioni Clienti",
      showAll: "Mostra tutte le {count} recensioni",
      basedOn: "Basato su {count} recensioni",
      stars: "stelle",
      star: "stella",
      verified: "Acquisto verificato",
      noReviews: "Nessuna recensione"
    },
    home: {
      heroBadge: "Fornitore europeo",
      heroTitle: "Peptidi",
      heroTitleHighlight: "da ricerca",
      heroSubtitle: "Peptidi ad alta purezza con COA per lotto e spedizione rapida.",
      shopNow: "Acquista",
      viewLabReports: "Vedi report",
      stats: {
        ordersDelivered: "Ordini consegnati",
        purityGuarantee: "Garanzia di purezza",
        expressShipping: "Spedizione express",
        researchLabs: "Laboratori"
      },
      categories: {
        title: "Categorie",
        subtitle: "Per focus di ricerca"
      },
      bestSellers: {
        title: "Più venduti",
        subtitle: "Scelti dai laboratori",
        viewAll: "Vedi tutto",
        viewAllPeptides: "Vedi tutti i peptidi"
      },
      filters: {
        antiAging: "Anti-età"
      },
      about: {
        title: "Chi siamo",
        subtitle: "Il tuo partner affidabile per la ricerca.",
        description: "Le nostre strutture di laboratorio all'avanguardia e i rigorosi processi di controllo qualità assicurano che ogni peptide che forniamo soddisfi gli standard di purezza del 99%+. Che tu abbia bisogno di Semaglutide, BPC-157, Tirzepatide o altri peptidi da ricerca, forniamo composti verificati HPLC con documentazione COA completa.",
        learnMore: "Scopri di più",
        features: {
          isoCertified: "Certificato ISO",
          isoCertifiedDesc: "Gestione qualità",
          fastDispatch: "Spedizione veloce",
          fastDispatchDesc: "Elaborazione 24h",
          expertTeam: "Team di esperti",
          expertTeamDesc: "Scienziati PhD",
          globalReach: "Portata globale",
          globalReachDesc: "Spedizione mondiale"
        }
      },
      blog: {
        title: "Blog di ricerca",
        subtitle: "Ultime scoperte",
        viewAll: "Vedi tutti gli articoli"
      },
      testimonials: {
        title: "Approvato dagli scienziati",
        subtitle: "Testimonianze"
      },
      faq: {
        title: "FAQ",
        subtitle: "Domande frequenti"
      },
      cta: {
        title: "10% di sconto sul primo ordine",
        subtitle: "Unisciti a migliaia di ricercatori.",
        placeholder: "Inserisci la tua email",
        button: "Ottieni -10%"
      }
    },
    product: {
      addToCart: "Aggiungi al carrello",
      addedToCart: "Aggiunto",
      buyNow: "Acquista ora",
      inStock: "Disponibile",
      outOfStock: "Esaurito",
      purity: "Purezza",
      description: "Descrizione",
      specifications: "Specifiche",
      pricePer: "Prezzo per",
      perUnit: "per",
      selectQuantity: "Seleziona quantità",
      belowMin: "Sotto il minimo",
      minRequired: "Minimo richiesto",
      addMore: "Aggiungi {count} altri {unit}(s)",
      discountBanner: "Fino al 15% di SCONTO + Spedizione GRATUITA sopra £{amount}",
      youSave: "Risparmi",
      trust: {
        purity: "Purezza ≥99%",
        coa: "COA Incluso",
        delivery: "Spedizione Rapida IT"
      },
      reviews: "Recensioni",
      faq: "FAQ",
      relatedProducts: "Prodotti correlati",
      viewOptions: "Vedi opzioni",
      wishlistAdd: "Aggiungi alla lista desideri",
      wishlistRemove: "Rimuovi dalla lista desideri",
      casNo: "N. CAS",
      molecularWeight: "Peso molecolare",
      storage: "Conservazione",
      availableSizes: "Formati disponibili",
      priceRangeLabel: "Fascia di prezzo",
      downloadCoa: "Scarica COA",
      researchOnlyTitle: "Solo per uso di ricerca",
      researchOnlyText: "Non destinato al consumo umano",
      minQuantity: "Min {qty}",
      off: "SCONTO",
      pack: "confezione",
      packs: "confezioni",
      vial: "fiala",
      vials: "fiale",
      bottle: "flacone",
      bottles: "flaconi",
      unit: "unità",
      units: "unità"
    },
    cart: {
      title: "Carrello",
      empty: "Il tuo carrello è vuoto",
      heroTitle: "Il tuo carrello",
      heroSubtitle: "Controlla i tuoi peptidi da ricerca prima del checkout. Tutti gli ordini includono documentazione COA.",
      secureCheckout: "Checkout sicuro",
      sslEncrypted: "Crittografato SSL",
      checkoutSubtitle: "Completa il tuo ordine con sicurezza. Tutti i pagamenti sono crittografati e sicuri.",
      readyToCheckout: "✓ Pronto per il checkout",
      freeDeliveryIncluded: "Consegna GRATUITA inclusa!",
      addMoreForFreeDelivery: "Aggiungi £{amount} per la consegna GRATUITA",
      browsePeptides: "Sfoglia i peptidi",
      cartItemsLabel: "Articoli nel carrello",
      item: "articolo",
      items: "articoli",
      inStockFastDelivery: "Disponibile • Consegna rapida",
      each: "caduno",
      subtotal: "Subtotale",
      shipping: "Spedizione",
      calculatedAtCheckout: "Calcolato al checkout",
      total: "Totale",
      checkout: "Checkout",
      proceedToCheckout: "Procedi al checkout",
      secureSslEncryptedCheckout: "Checkout sicuro con crittografia SSL",
      orderSummary: "Riepilogo ordine",
      bulkDiscountsApplied: "Sconti quantità applicati",
      freeDelivery: "Consegna GRATUITA",
      deliveryOptions: "Opzioni di consegna",
      standardDelivery: "Consegna standard",
      standardDeliveryTime: "3-5 giorni lavorativi",
      expressDelivery: "Consegna express",
      expressDeliveryTime: "1-2 giorni lavorativi",
      ordersOverThreshold: "Ordini oltre £{amount}",
      secureBadge: "Sicuro",
      pureBadge: "≥99% puro",
      fastDeliveryBadge: "Consegna rapida",
      yourCartCount: "Il tuo carrello ({count})",
      closeCart: "Chiudi carrello",
      addProductsToGetStarted: "Aggiungi prodotti per iniziare!",
      browseProducts: "Sfoglia i prodotti",
      viewCart: "Vedi carrello",
      addedToCart: "Aggiunto al carrello!",
      continueShopping: "Continua lo shopping",
      remove: "Rimuovi",
      quantity: "Quantità"
    },
    footer: {
      newsletter: "Iscriviti alla newsletter",
      subscribe: "Iscriviti",
      aboutUs: "Chi siamo",
      customerService: "Servizio clienti",
      legal: "Legale",
      termsAndConditions: "Termini e condizioni",
      privacyPolicy: "Privacy",
      disclaimer: "Disclaimer",
      coaPolicy: "Politica COA",
      emailLabel: "Email",
      hoursLabel: "Orari",
      hoursValue: "Lun - Ven: 9:00 - 17:00",
      disclaimerLabel: "Disclaimer",
      copyright: "© {year} Peptide Shop. Tutti i diritti riservati."
    },
    common: {
      all: "Tutti",
      viewOptions: "Vedi opzioni",
      learnMore: "Scopri di più",
      readMore: "Leggi di più",
      loading: "Caricamento...",
      error: "Si è verificato un errore",
      success: "Successo!",
      free: "Gratis",
      searchLabel: "Cerca",
      searching: "Ricerca…",
      noResultsFound: 'Nessun risultato per "{query}"',
      welcome: "Benvenuto!",
      signInForBestExperience: "Accedi per la migliore esperienza",
      signIn: "Accedi",
      createAccount: "Crea account",
      or: "o",
      dashboard: "Dashboard",
      myOrders: "I miei ordini",
      settings: "Impostazioni",
      signOut: "Esci"
    },
    legalPages: {
      lastUpdated: "Ultimo aggiornamento",
      terms: {
        title: "Termini e Condizioni",
        subtitle: "Si prega di leggere attentamente questi termini prima di utilizzare il nostro sito web e i nostri servizi.",
        acceptance: { title: "1. Accettazione dei Termini", content: "Accedendo e utilizzando questo sito web, accetti di essere vincolato da questi Termini e Condizioni. Se non sei d'accordo, ti preghiamo di non utilizzare il nostro sito." },
        researchUse: { title: "2. Solo per Uso di Ricerca", warning: "TUTTI I PRODOTTI VENDUTI SU QUESTO SITO SONO DESTINATI ESCLUSIVAMENTE ALLA RICERCA DI LABORATORIO.", notHumans: "Umani o animali", notFood: "Alimenti, farmaci o cosmetici", notHousehold: "Prodotti chimici domestici", acknowledgment: "Riconosci che i prodotti non sono stati testati per sicurezza o efficacia in alimenti, farmaci, dispositivi medici, cosmetici, uso commerciale o qualsiasi altro uso." },
        purchaser: { title: "3. Dichiarazioni dell'Acquirente", intro: "Acquistando da Peptide Shop, dichiari e garantisci che:", age: "Hai almeno 18 anni.", institution: "Sei affiliato a un istituto di ricerca, laboratorio, o sei un ricercatore qualificato.", hazards: "Sei consapevole dei rischi per la salute e la sicurezza associati alla manipolazione di prodotti chimici di ricerca.", handling: "Gestirai, conserverai e smaltirai questi prodotti in conformità con tutte le leggi e i regolamenti applicabili." },
        liability: { title: "4. Limitazione di Responsabilità", content: "Peptide Shop non sarà responsabile per eventuali danni speciali, incidentali o consequenziali derivanti dall'uso o dall'impossibilità di utilizzare i materiali su questo sito o le prestazioni dei prodotti." },
        governing: { title: "5. Legge Applicabile", content: "Questi termini saranno regolati e interpretati in conformità con le leggi dell'Unione Europea." }
      },
      privacy: {
        title: "Informativa sulla Privacy",
        subtitle: "Come raccogliamo, utilizziamo e proteggiamo le tue informazioni personali.",
        infoCollect: { title: "1. Informazioni che Raccogliamo", content: "Raccogliamo le informazioni che ci fornisci direttamente, ad esempio quando richiedi un preventivo, crei un account o contatti l'assistenza clienti. Queste possono includere nome, indirizzo email, istituzione e dettagli di spedizione." },
        howUse: { title: "2. Come Utilizziamo le Tue Informazioni", intro: "Utilizziamo le informazioni raccolte per:", orders: "Elaborare le tue richieste e ordini.", coa: "Inviarti informazioni tecniche e COA.", questions: "Rispondere ai tuoi commenti e domande.", legal: "Rispettare gli obblighi legali relativi alla vendita di prodotti chimici di ricerca." },
        security: { title: "3. Sicurezza dei Dati", content: "Implementiamo misure tecniche e organizzative appropriate per proteggere i tuoi dati personali da accessi non autorizzati, alterazioni, divulgazione o distruzione." },
        cookies: { title: "4. Cookie", content: "Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. Puoi controllare i cookie attraverso le impostazioni del tuo browser." }
      },
      disclaimer: {
        title: "Disclaimer - Solo per Uso di Ricerca",
        subtitle: "Informazioni importanti sull'uso previsto dei nostri prodotti.",
        warning: "AVVERTENZA: NON PER CONSUMO UMANO",
        warningText: "I prodotti offerti da Peptide Shop sono destinati esclusivamente alla ricerca e allo sviluppo di laboratorio.",
        lead: "Questi prodotti non sono destinati all'uso come additivi alimentari, farmaci, cosmetici, prodotti chimici domestici o altre applicazioni inappropriate.",
        patent: "L'inserimento di un materiale su questo sito non costituisce una licenza per il suo utilizzo in violazione di alcun brevetto.",
        qualified: "Tutti i prodotti devono essere gestiti solo da personale qualificato e addestrato. Il cliente riconosce che esistono pericoli associati all'uso di questi prodotti.",
        rights: "Peptide Shop si riserva il diritto di limitare le vendite di prodotti o di non vendere a clienti non qualificati."
      },
      shipping: {
        title: "Informazioni sulla Spedizione",
        subtitle: "Informazioni sulle nostre politiche e procedure di spedizione.",
        policyTitle: "Politica di Spedizione",
        processing: "Tempo di elaborazione: Gli ordini vengono elaborati entro 1-2 giorni lavorativi.",
        method: "Metodo di spedizione: Utilizziamo servizi di corriere tracciabili per tutti gli ordini.",
        temperature: "Controllo temperatura: Gli articoli sensibili alla temperatura vengono spediti con imballaggio appropriato.",
        returnsTitle: "Politica di Reso",
        customsTitle: "Dogane e Dazi di Importazione",
        customsContent: "I clienti internazionali sono responsabili di eventuali dazi doganali o tasse di importazione."
      },
      coaPolicy: {
        title: "Politica del Certificato di Analisi",
        subtitle: "Il nostro impegno per la qualità e la trasparenza.",
        batchTitle: "Test per Lotto",
        batchContent: "Ogni lotto di peptidi viene sottoposto a test analitici completi prima del rilascio.",
        methodsTitle: "Metodi di Verifica",
        hplc: "Analisi HPLC: Cromatografia liquida ad alte prestazioni per la verifica della purezza.",
        ms: "Spettrometria di massa: Conferma dell'identità molecolare e del peso.",
        availTitle: "Disponibilità",
        availContent: "I COA sono disponibili per il download su ogni pagina prodotto e sono inclusi in ogni ordine."
      }
    }
  }
};
function t(lang, key) {
  const keys = key.split(".");
  let value = translations[lang];
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      value = translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === "object" && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return key;
        }
      }
      break;
    }
  }
  return typeof value === "string" ? value : key;
}
function getLangFromUrl(url) {
  const [, lang] = url.pathname.split("/");
  if (lang && supportedLanguages.includes(lang)) {
    return lang;
  }
  return defaultLang;
}
function getLocalizedPath(path, lang) {
  const withoutLocale = path.replace(/^\/(en|nl|de|fr|es|it)(\/|$)/, "/");
  const match = withoutLocale.match(/^([^?#]*)(.*)$/);
  const pathname = (match?.[1] ?? withoutLocale) || "/";
  const suffix = match?.[2] ?? "";
  const getCanonicalProductSlug = (slug) => {
    const clean = slug.replace(/^\/peptides\//, "").replace(/^\//, "").replace(/\/$/, "");
    for (const l of supportedLanguages) {
      const table = productSlugTranslations[l];
      if (table && Object.prototype.hasOwnProperty.call(table, clean)) {
        return clean;
      }
    }
    for (const l of supportedLanguages) {
      const table = productSlugTranslations[l];
      if (!table) continue;
      for (const [englishSlug, localizedSlug] of Object.entries(table)) {
        if (localizedSlug === clean) return englishSlug;
      }
    }
    return clean;
  };
  const getCanonicalPageSlug = (slug) => {
    const clean = slug.replace(/^\//, "").replace(/\/$/, "");
    if (pageSlugTranslations.en && Object.prototype.hasOwnProperty.call(pageSlugTranslations.en, clean)) {
      return clean;
    }
    for (const l of supportedLanguages) {
      const table = pageSlugTranslations[l];
      if (table && Object.prototype.hasOwnProperty.call(table, clean)) {
        return clean;
      }
    }
    for (const l of supportedLanguages) {
      const table = pageSlugTranslations[l];
      if (!table) continue;
      for (const [englishSlug, localizedSlug] of Object.entries(table)) {
        if (localizedSlug === clean) return englishSlug;
      }
    }
    return clean;
  };
  const getLocalizedPageSlug = (slug, targetLang) => {
    const canonical = getCanonicalPageSlug(slug);
    if (targetLang !== "en" && pageSlugTranslations[targetLang] && pageSlugTranslations[targetLang][canonical]) {
      return pageSlugTranslations[targetLang][canonical];
    }
    return canonical;
  };
  let resolvedPathname = pathname;
  if (pathname.startsWith("/peptides/")) {
    const rawSlug = pathname.replace("/peptides/", "").replace(/\/$/, "");
    const canonicalSlug = getCanonicalProductSlug(rawSlug);
    if (lang !== "en" && productSlugTranslations[lang] && productSlugTranslations[lang][canonicalSlug]) {
      resolvedPathname = `/peptides/${productSlugTranslations[lang][canonicalSlug]}`;
    } else {
      resolvedPathname = `/peptides/${canonicalSlug}`;
    }
  } else {
    const pathParts = pathname.replace(/^\//, "").replace(/\/$/, "").split("/");
    if (pathParts.length > 0 && pathParts[0]) {
      const firstPart = pathParts[0];
      const canonicalFirstPart = getCanonicalPageSlug(firstPart);
      if (pageSlugTranslations.nl && pageSlugTranslations.nl[canonicalFirstPart]) {
        const localizedFirstPart = getLocalizedPageSlug(canonicalFirstPart, lang);
        if (pathParts.length > 1) {
          const secondPart = pathParts[1];
          const canonicalSecondPart = getCanonicalPageSlug(secondPart);
          const localizedSecondPart = getLocalizedPageSlug(canonicalSecondPart, lang);
          resolvedPathname = `/${localizedFirstPart}/${localizedSecondPart}`;
        } else {
          resolvedPathname = `/${localizedFirstPart}`;
        }
      }
    }
  }
  if (lang === defaultLang) {
    return `${resolvedPathname || "/"}${suffix}`;
  }
  const localizedRoots = [
    "/",
    // Pages with translated slugs - English and all translations
    "/about",
    "/over-ons",
    "/ueber-uns",
    "/a-propos",
    "/sobre-nosotros",
    "/chi-siamo",
    "/contact",
    "/kontakt",
    "/contatti",
    "/contacto",
    "/faq",
    "/veelgestelde-vragen",
    "/haeufige-fragen",
    "/preguntas-frecuentes",
    "/domande-frequenti",
    "/shop",
    "/winkel",
    "/boutique",
    "/tienda",
    "/negozio",
    "/cart",
    "/winkelwagen",
    "/warenkorb",
    "/panier",
    "/carrito",
    "/carrello",
    "/checkout",
    "/afrekenen",
    "/kasse",
    "/paiement",
    "/pago",
    "/cassa",
    "/peptides",
    "/quality",
    "/kwaliteit",
    "/qualitaet",
    "/qualite",
    "/calidad",
    "/qualita",
    "/shipping",
    "/verzending",
    "/versand",
    "/livraison",
    "/envio",
    "/spedizione",
    "/terms",
    "/voorwaarden",
    "/agb",
    "/conditions",
    "/terminos",
    "/termini",
    "/privacy",
    "/datenschutz",
    "/confidentialite",
    "/privacidad",
    "/disclaimer",
    "/haftungsausschluss",
    "/avertissement",
    "/descargo",
    "/coa-policy",
    "/coa-beleid",
    "/coa-richtlinie",
    "/politique-coa",
    "/politica-coa",
    "/blog",
    "/learn",
    "/leren",
    "/lernen",
    "/apprendre",
    "/aprender",
    "/imparare",
    "/bundles",
    "/bundels",
    "/lots",
    "/paquetes",
    "/pacchetti",
    "/wholesale",
    "/groothandel",
    "/grosshandel",
    "/grossiste",
    "/mayorista",
    "/ingrosso"
  ];
  const isLocalizedRoute = resolvedPathname === "/" || localizedRoots.some(
    (root) => root === "/" ? false : resolvedPathname === root || resolvedPathname.startsWith(`${root}/`)
  );
  if (!isLocalizedRoute) {
    return `${resolvedPathname || "/"}${suffix}`;
  }
  const normalizedPath = resolvedPathname.startsWith("/") ? resolvedPathname : `/${resolvedPathname}`;
  return `/${lang}${normalizedPath === "/" ? "" : normalizedPath}${suffix}`;
}
function getLocalizedProductSlug(slug, lang) {
  const clean = slug.replace(/^\/peptides\//, "").replace(/^\//, "");
  if (lang !== "en" && productSlugTranslations[lang] && productSlugTranslations[lang][clean]) {
    return productSlugTranslations[lang][clean];
  }
  return clean;
}
function cleanProductTitle(title, lang) {
  if (lang === "en") {
    return title;
  }
  let cleaned = title.replace(/\s+UK\s*\|/gi, " |").replace(/\s+UK\s*$/gi, "").replace(/\s+UK\s+/gi, " ");
  cleaned = cleaned.replace(/\s{2,}/g, " ").trim();
  if (/\bAOD[-\s]?9604\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "AOD-9604 Kopen";
      case "de":
        return "AOD-9604 kaufen";
      case "fr":
        return "Acheter AOD-9604";
      case "it":
        return "Acquista AOD-9604";
      case "es":
        return "aod 9604 comprar";
      default:
        return cleaned;
    }
  }
  if (/\bBPC[-\s]?157\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "BPC-157 Kopen";
      case "de":
        return "BPC-157 Kaufen";
      case "fr":
        return "Acheter BPC-157";
      case "it":
        return "Acquista BPC-157";
      case "es":
        return "BPC 157 Comprar España";
      default:
        return cleaned;
    }
  }
  if (/\b5\s*-?\s*Amino\s*-?\s*1\s*MQ\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "5-amino-1mq kopen";
      case "de":
        return "5-Amino-1MQ kaufen";
      case "fr":
        return "Acheter 5-Amino-1MQ";
      case "it":
        return "Acquista 5-Amino-1MQ";
      case "es":
        return "5-Amino-1MQ Comprar";
      default:
        return cleaned;
    }
  }
  if (/\bCJC\s*-?\s*1295\b/i.test(cleaned) && /\bNo\s*DAC\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "CJC-1295 No DAC Kopen";
      case "de":
        return "CJC-1295 No DAC kaufen";
      case "fr":
        return "Acheter CJC-1295 No DAC";
      case "it":
        return "Acquista CJC-1295 No DAC";
      case "es":
        return "CJC-1295 No DAC Comprar";
      default:
        return cleaned;
    }
  }
  if (/\bEpitalon\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "Epitalon Kopen";
      case "de":
        return "Epitalon kaufen";
      case "fr":
        return "Acheter Epitalon";
      case "it":
        return "Acquista Epitalon";
      case "es":
        return "Epitalon Comprar";
      default:
        return cleaned;
    }
  }
  if (/\bCagrilintide\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "Cagrilintide Kopen";
      case "de":
        return "Cagrilintide kaufen";
      case "fr":
        return "Acheter Cagrilintide";
      case "it":
        return "Acquista Cagrilintide";
      case "es":
        return "Cagrilintide Comprar";
      default:
        return cleaned;
    }
  }
  if (/\bDSIP\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "DSIP Kopen";
      case "de":
        return "DSIP kaufen";
      case "fr":
        return "Acheter DSIP";
      case "it":
        return "Acquista DSIP";
      case "es":
        return "DSIP Comprar";
      default:
        return cleaned;
    }
  }
  if (/(\bHGH\b|\bGH\b)\s*Fragment\s*176\s*-\s*191\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "HGH Fragment 176-191 Kopen";
      case "de":
        return "HGH Fragment 176-191 kaufen";
      case "fr":
        return "Acheter HGH Fragment 176-191";
      case "it":
        return "Acquista HGH Fragment 176-191";
      case "es":
        return "HGH Fragment 176-191 Comprar";
      default:
        return cleaned;
    }
  }
  if (/\bGHK\s*-?\s*Cu\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "GHK-Cu Kopen";
      case "de":
        return "GHK-Cu kaufen";
      case "fr":
        return "Acheter GHK-Cu";
      case "it":
        return "Acquista GHK-Cu";
      case "es":
        return "GHK-Cu Comprar";
      default:
        return cleaned;
    }
  }
  if (/\bGHRP\s*-?\s*2\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "GHRP-2 Kopen";
      case "de":
        return "GHRP-2 Kaufen";
      case "fr":
        return "Acheter GHRP-2";
      case "it":
        return "Acquista GHRP-2";
      case "es":
        return "GHRP-2 Comprar";
      default:
        return cleaned;
    }
  }
  if (/\bGHRP\s*-?\s*6\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "GHRP-6 Kopen";
      case "de":
        return "GHRP-6 Kaufen";
      case "fr":
        return "Acheter GHRP-6";
      case "it":
        return "Acquista GHRP-6";
      case "es":
        return "GHRP-6 Comprar";
      default:
        return cleaned;
    }
  }
  if (/\bMelanotan\s*2\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "Melanotan 2 kopen";
      case "de":
        return "Melanotan 2 kaufen";
      case "fr":
        return "Acheter Melanotan 2";
      case "it":
        return "Acquista Melanotan 2";
      case "es":
        return "Melanotan 2 comprar";
      default:
        return cleaned;
    }
  }
  if (/\bIpamorelin\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "Ipamorelin kopen";
      case "de":
        return "Ipamorelin kaufen";
      case "fr":
        return "Acheter Ipamorelin";
      case "it":
        return "Acquista Ipamorelin";
      case "es":
        return "Ipamorelin comprar";
      default:
        return cleaned;
    }
  }
  if (/\bNAD\+\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "NAD+ kopen";
      case "de":
        return "NAD+ kaufen";
      case "fr":
        return "Acheter NAD+";
      case "it":
        return "Acquista NAD+";
      case "es":
        return "NAD+ comprar";
      default:
        return cleaned;
    }
  }
  if (/\bO\s*-\s*304\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "O-304 kopen";
      case "de":
        return "O-304 kaufen";
      case "fr":
        return "Acheter O-304";
      case "it":
        return "Acquista O-304";
      case "es":
        return "O-304 comprar";
      default:
        return cleaned;
    }
  }
  if (/\bRetatrutide\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "Retatrutide kopen";
      case "de":
        return "Retatrutide kaufen";
      case "fr":
        return "Acheter Retatrutide";
      case "it":
        return "Acquista Retatrutide";
      case "es":
        return "Retatrutide comprar";
      default:
        return cleaned;
    }
  }
  if (/\bSelank\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "Selank kopen";
      case "de":
        return "Selank kaufen";
      case "fr":
        return "Acheter Selank";
      case "it":
        return "Acquista Selank";
      case "es":
        return "Selank comprar";
      default:
        return cleaned;
    }
  }
  if (/\bSemaglutide\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "Semaglutide kopen";
      case "de":
        return "Semaglutide kaufen";
      case "fr":
        return "Acheter Semaglutide";
      case "it":
        return "Acquista Semaglutide";
      case "es":
        return "Semaglutide comprar";
      default:
        return cleaned;
    }
  }
  if (/\bSemax\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "Semax Kopen";
      case "de":
        return "Semax kaufen";
      case "fr":
        return "Acheter Semax";
      case "it":
        return "Acquista Semax";
      case "es":
        return "Semax Comprar";
      default:
        return cleaned;
    }
  }
  if (/\bTB\s*-?\s*500\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "TB-500 Kopen";
      case "de":
        return "TB-500 kaufen";
      case "fr":
        return "Acheter TB-500";
      case "it":
        return "Acquista TB-500";
      case "es":
        return "TB-500 Comprar";
      default:
        return cleaned;
    }
  }
  if (/\bTesofensine\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "Tesofensine Kopen";
      case "de":
        return "Tesofensine kaufen";
      case "fr":
        return "Acheter Tesofensine";
      case "it":
        return "Acquista Tesofensine";
      case "es":
        return "Tesofensine Comprar";
      default:
        return cleaned;
    }
  }
  if (/\bTirzepatide\b/i.test(cleaned)) {
    switch (lang) {
      case "nl":
        return "Tirzepatide Kopen";
      case "de":
        return "Tirzepatide kaufen";
      case "fr":
        return "Acheter Tirzepatide";
      case "it":
        return "Acquista Tirzepatide";
      case "es":
        return "Tirzepatide Comprar";
      default:
        return cleaned;
    }
  }
  if (cleaned.includes("Bacteriostatic Water")) {
    const hasPipe = cleaned.indexOf("|") !== -1;
    const rest = hasPipe ? cleaned.substring(cleaned.indexOf("|")) : "";
    switch (lang) {
      case "nl":
        return `Bacteriostatic water Kopen${rest ? " " + rest : ""}`;
      case "de":
        return `Bacteriostatic water Kaufen${rest ? " " + rest : ""}`;
      case "fr":
        return `Acheter de l'eau bactériostatique${rest ? " " + rest : ""}`;
      case "it":
        return `acquisto acqua batteriostatica${rest ? " " + rest : ""}`;
      case "es":
        return `agua bacteriostatica comprar${rest ? " " + rest : ""}`;
      default:
        return cleaned;
    }
  }
  const buyTranslations = {
    en: "Buy",
    nl: "Kopen",
    de: "Kaufen",
    fr: "Acheter",
    es: "Comprar",
    it: "Acquista"
  };
  if (cleaned.startsWith("Buy ")) {
    if (lang === "nl") {
      const pipeIndex = cleaned.indexOf("|");
      if (pipeIndex !== -1) {
        const productPart = cleaned.substring(0, pipeIndex).trim();
        const rest = cleaned.substring(pipeIndex);
        const newProductPart = productPart.replace(/^Buy\s+/, "") + " Kopen";
        cleaned = newProductPart + " " + rest.trim();
      } else {
        cleaned = cleaned.replace(/^Buy\s+/, "") + " Kopen";
      }
    } else {
      cleaned = cleaned.replace(/^Buy\s+/, `${buyTranslations[lang]} `);
    }
  }
  const titleTranslations = {
    en: {},
    nl: {
      "Bacteriostatic Water": "Bacteriostatisch Water",
      "Vial": "Flacon",
      "Peptide Reconstitution": "Peptide Reconstitutie",
      "Research Grade": "Onderzoekskwaliteit",
      "Fat Loss Peptide": "Peptide voor Vetverlies",
      "Body Protection Compound": "Lichaamsbeschermingsverbinding",
      "for Research": "voor Onderzoek",
      "Weight Loss": "Gewichtsverlies",
      "Muscle Recovery": "Spierherstel",
      "Growth Hormone": "Groeihormoon",
      "Sleep Peptide": "Slaappeptide",
      "Anti-Aging": "Anti-veroudering",
      "Copper Peptide": "Koperpeptide",
      "NNMT Inhibitor": "NNMT-remmer",
      "Nootropic": "Noötropisch",
      "Cognitive": "Cognitief",
      "Tanning": "Bruining",
      "Premium": "Premium",
      "High Purity": "Hoge Zuiverheid",
      "GLP-1 Agonist": "GLP-1 Agonist",
      "Dual Agonist": "Dubbele Agonist",
      "Triple Agonist": "Drievoudige Agonist",
      "Metabolic": "Metabolisch",
      "Fragment": "Fragment",
      "Secretagogue": "Secretagoog",
      "Releasing Peptide": "Afgevend Peptide",
      "Cell Regeneration": "Celregeneratie",
      "Longevity": "Levensduur"
    },
    de: {
      "Bacteriostatic Water": "Bakteriostatisches Wasser",
      "Vial": "Ampulle",
      "Peptide Reconstitution": "Peptid-Rekonstitution",
      "Research Grade": "Forschungsqualität",
      "Fat Loss Peptide": "Peptid zur Fettverbrennung",
      "Body Protection Compound": "Körperschutzverbindung",
      "for Research": "für Forschung",
      "Weight Loss": "Gewichtsverlust",
      "Muscle Recovery": "Muskelregeneration",
      "Growth Hormone": "Wachstumshormon",
      "Sleep Peptide": "Schlafpeptid",
      "Anti-Aging": "Anti-Aging",
      "Copper Peptide": "Kupferpeptid",
      "NNMT Inhibitor": "NNMT-Inhibitor",
      "Nootropic": "Nootropikum",
      "Cognitive": "Kognitiv",
      "Tanning": "Bräunung",
      "Premium": "Premium",
      "High Purity": "Hohe Reinheit",
      "GLP-1 Agonist": "GLP-1-Agonist",
      "Dual Agonist": "Dual-Agonist",
      "Triple Agonist": "Dreifach-Agonist",
      "Metabolic": "Metabolisch",
      "Fragment": "Fragment",
      "Secretagogue": "Sekretagog",
      "Releasing Peptide": "Freisetzungspeptid",
      "Cell Regeneration": "Zellregeneration",
      "Longevity": "Langlebigkeit"
    },
    fr: {
      "Bacteriostatic Water": "Eau Bactériostatique",
      "Vial": "Flacon",
      "Peptide Reconstitution": "Reconstitution de Peptide",
      "Research Grade": "Qualité Recherche",
      "Fat Loss Peptide": "Peptide Perte de Graisse",
      "Body Protection Compound": "Composé de Protection Corporelle",
      "for Research": "pour la Recherche",
      "Weight Loss": "Perte de Poids",
      "Muscle Recovery": "Récupération Musculaire",
      "Growth Hormone": "Hormone de Croissance",
      "Sleep Peptide": "Peptide du Sommeil",
      "Anti-Aging": "Anti-Âge",
      "Copper Peptide": "Peptide de Cuivre",
      "NNMT Inhibitor": "Inhibiteur NNMT",
      "Nootropic": "Nootropique",
      "Cognitive": "Cognitif",
      "Tanning": "Bronzage",
      "Premium": "Premium",
      "High Purity": "Haute Pureté",
      "GLP-1 Agonist": "Agoniste GLP-1",
      "Dual Agonist": "Double Agoniste",
      "Triple Agonist": "Triple Agoniste",
      "Metabolic": "Métabolique",
      "Fragment": "Fragment",
      "Secretagogue": "Sécrétagogue",
      "Releasing Peptide": "Peptide de Libération",
      "Cell Regeneration": "Régénération Cellulaire",
      "Longevity": "Longévité"
    },
    es: {
      "Bacteriostatic Water": "Agua Bacteriostática",
      "Vial": "Vial",
      "Peptide Reconstitution": "Reconstitución de Péptidos",
      "Research Grade": "Calidad de Investigación",
      "Fat Loss Peptide": "Péptido para Pérdida de Grasa",
      "Body Protection Compound": "Compuesto de Protección Corporal",
      "for Research": "para Investigación",
      "Weight Loss": "Pérdida de Peso",
      "Muscle Recovery": "Recuperación Muscular",
      "Growth Hormone": "Hormona del Crecimiento",
      "Sleep Peptide": "Péptido del Sueño",
      "Anti-Aging": "Anti-Envejecimiento",
      "Copper Peptide": "Péptido de Cobre",
      "NNMT Inhibitor": "Inhibidor NNMT",
      "Nootropic": "Nootrópico",
      "Cognitive": "Cognitivo",
      "Tanning": "Bronceado",
      "Premium": "Premium",
      "High Purity": "Alta Pureza",
      "GLP-1 Agonist": "Agonista GLP-1",
      "Dual Agonist": "Agonista Dual",
      "Triple Agonist": "Agonista Triple",
      "Metabolic": "Metabólico",
      "Fragment": "Fragmento",
      "Secretagogue": "Secretagogo",
      "Releasing Peptide": "Péptido Liberador",
      "Cell Regeneration": "Regeneración Celular",
      "Longevity": "Longevidad"
    },
    it: {
      "Bacteriostatic Water": "Acqua Batteriostatica",
      "Vial": "Fiala",
      "Peptide Reconstitution": "Ricostituzione Peptidica",
      "Research Grade": "Qualità Ricerca",
      "Fat Loss Peptide": "Peptide per Perdita di Grasso",
      "Body Protection Compound": "Composto di Protezione Corporea",
      "for Research": "per la Ricerca",
      "Weight Loss": "Perdita di Peso",
      "Muscle Recovery": "Recupero Muscolare",
      "Growth Hormone": "Ormone della Crescita",
      "Sleep Peptide": "Peptide del Sonno",
      "Anti-Aging": "Anti-Invecchiamento",
      "Copper Peptide": "Peptide di Rame",
      "NNMT Inhibitor": "Inibitore NNMT",
      "Nootropic": "Nootropo",
      "Cognitive": "Cognitivo",
      "Tanning": "Abbronzatura",
      "Premium": "Premium",
      "High Purity": "Alta Purezza",
      "GLP-1 Agonist": "Agonista GLP-1",
      "Dual Agonist": "Agonista Duale",
      "Triple Agonist": "Triplo Agonista",
      "Metabolic": "Metabolico",
      "Fragment": "Frammento",
      "Secretagogue": "Secretagogo",
      "Releasing Peptide": "Peptide di Rilascio",
      "Cell Regeneration": "Rigenerazione Cellulare",
      "Longevity": "Longevità"
    }
  };
  const langTrans = titleTranslations[lang];
  if (langTrans) {
    const sortedKeys = Object.keys(langTrans).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      const regex = new RegExp(key, "gi");
      cleaned = cleaned.replace(regex, langTrans[key]);
    }
  }
  return cleaned;
}
function translateProductContent(content, lang) {
  if (lang === "en" || !content) return content;
  const countryByLang = {
    en: "UK",
    nl: "Nederland",
    de: "Deutschland",
    fr: "France",
    es: "España",
    it: "Italia"
  };
  const protectedUrls = [];
  const nextToken = () => `§§URL_${protectedUrls.length}§§`;
  const protectMarkdownLinks = (input) => input.replace(/(!?\[[^\]]*\]\()([^\)]+)(\))/g, (_m, prefix, url, suffix) => {
    const token = nextToken();
    protectedUrls.push(url);
    return `${prefix}${token}${suffix}`;
  });
  const protectHtmlAttrs = (input) => input.replace(/\b(href|src)=(['"])([^'\"]+)(\2)/gi, (_m, attr, quote, url) => {
    const token = nextToken();
    protectedUrls.push(url);
    return `${attr}=${quote}${token}${quote}`;
  });
  let working = content;
  working = protectMarkdownLinks(working);
  working = protectHtmlAttrs(working);
  if (/\bBuy\s+AOD[-\s]?9604\s+(?:U\.K\.?|UK)\b/i.test(working)) {
    const aodIntroByLang = {
      nl: "AOD-9604 Kopen Nederland",
      de: "AOD-9604 kaufen Deutschland",
      fr: "Acheter AOD-9604 France",
      es: "aod 9604 comprar España",
      it: "Acquista AOD-9604 Italia"
    };
    working = working.replace(/\bBuy\s+AOD[-\s]?9604\s+(?:U\.K\.?|UK)\b/gi, aodIntroByLang[lang]);
  }
  if (/\bBuy\s+BPC[-\s]?157\s+(?:U\.K\.?|UK)\b/i.test(working)) {
    const bpcIntroByLang = {
      nl: "BPC-157 Kopen Nederland",
      de: "BPC-157 Kaufen Deutschland",
      fr: "Acheter BPC-157 France",
      es: "BPC 157 Comprar España",
      it: "Acquista BPC-157 Italia"
    };
    working = working.replace(/\bBuy\s+BPC[-\s]?157\s+(?:U\.K\.?|UK)\b/gi, bpcIntroByLang[lang]);
  }
  if (/\bBuy\s+5\s*-?\s*Amino\s*-?\s*1\s*MQ\b(?:\s+(?:U\.K\.?|UK))?/i.test(working)) {
    const oneMqIntroByLang = {
      nl: "5-amino-1mq kopen Nederland",
      de: "5-Amino-1MQ kaufen Deutschland",
      fr: "Acheter 5-Amino-1MQ France",
      es: "5-Amino-1MQ Comprar España",
      it: "Acquista 5-Amino-1MQ Italia"
    };
    working = working.replace(
      /\bBuy\s+5\s*-?\s*Amino\s*-?\s*1\s*MQ\b(?:\s+(?:U\.K\.?|UK))?/gi,
      oneMqIntroByLang[lang]
    );
  }
  const extraIntroReplacements = [
    {
      pattern: /\bBuy\s+GHK\s*-?\s*Cu\b\s+(?:U\.K\.?|UK)\b/gi,
      byLang: {
        nl: "GHK-Cu Kopen Nederland",
        de: "GHK-Cu kaufen Deutschland",
        fr: "Acheter GHK-Cu France",
        es: "GHK-Cu Comprar España",
        it: "Acquista GHK-Cu Italia"
      }
    },
    {
      pattern: /\bBuy\s+GHRP\s*-?\s*2\b\s+(?:U\.K\.?|UK)\b/gi,
      byLang: {
        nl: "GHRP-2 Kopen Nederland",
        de: "GHRP-2 Kaufen Deutschland",
        fr: "Acheter GHRP-2 France",
        es: "GHRP-2 Comprar España",
        it: "Acquista GHRP-2 Italia"
      }
    },
    {
      pattern: /\bBuy\s+GHRP\s*-?\s*6\b(?:\s+(?:U\.K\.?|UK))?/gi,
      byLang: {
        nl: "GHRP-6 Kopen Nederland",
        de: "GHRP-6 Kaufen Deutschland",
        fr: "Acheter GHRP-6 France",
        es: "GHRP-6 Comprar España",
        it: "Acquista GHRP-6 Italia"
      }
    },
    {
      pattern: /\bBuy\s+Melanotan\s*2\b\s+(?:U\.K\.?|UK)\b/gi,
      byLang: {
        nl: "Melanotan 2 kopen Nederland",
        de: "Melanotan 2 kaufen Deutschland",
        fr: "Acheter Melanotan 2 France",
        es: "Melanotan 2 comprar España",
        it: "Acquista Melanotan 2 Italia"
      }
    },
    {
      pattern: /\bBuy\s+Ipamorelin\b\s+(?:U\.K\.?|UK)\b/gi,
      byLang: {
        nl: "Ipamorelin kopen Nederland",
        de: "Ipamorelin kaufen Deutschland",
        fr: "Acheter Ipamorelin France",
        es: "Ipamorelin comprar España",
        it: "Acquista Ipamorelin Italia"
      }
    },
    {
      pattern: /\bBuy\s+NAD\+\b(?:\s+(?:U\.K\.?|UK))?/gi,
      byLang: {
        nl: "NAD+ kopen Nederland",
        de: "NAD+ kaufen Deutschland",
        fr: "Acheter NAD+ France",
        es: "NAD+ comprar España",
        it: "Acquista NAD+ Italia"
      }
    },
    {
      pattern: /\bBuy\s+O\s*-\s*304\b(?:\s+(?:U\.K\.?|UK))?/gi,
      byLang: {
        nl: "O-304 kopen Nederland",
        de: "O-304 kaufen Deutschland",
        fr: "Acheter O-304 France",
        es: "O-304 comprar España",
        it: "Acquista O-304 Italia"
      }
    },
    {
      pattern: /\bBuy\s+Retatrutide\b\s+(?:U\.K\.?|UK)\b/gi,
      byLang: {
        nl: "Retatrutide kopen Nederland",
        de: "Retatrutide kaufen Deutschland",
        fr: "Acheter Retatrutide France",
        es: "Retatrutide comprar España",
        it: "Acquista Retatrutide Italia"
      }
    },
    {
      pattern: /\bBuy\s+Selank\b\s+(?:U\.K\.?|UK)\b/gi,
      byLang: {
        nl: "Selank kopen Nederland",
        de: "Selank kaufen Deutschland",
        fr: "Acheter Selank France",
        es: "Selank comprar España",
        it: "Acquista Selank Italia"
      }
    },
    {
      pattern: /\bBuy\s+Semaglutide\b\s+(?:U\.K\.?|UK)\b/gi,
      byLang: {
        nl: "Semaglutide kopen Nederland",
        de: "Semaglutide kaufen Deutschland",
        fr: "Acheter Semaglutide France",
        es: "Semaglutide comprar España",
        it: "Acquista Semaglutide Italia"
      }
    },
    {
      pattern: /\bBuy\s+Semax\b\s+(?:U\.K\.?|UK)\b/gi,
      byLang: {
        nl: "Semax Kopen",
        de: "Semax kaufen",
        fr: "Acheter Semax",
        es: "Semax Comprar",
        it: "Acquista Semax"
      }
    },
    {
      pattern: /\bBuy\s+TB\s*-?\s*500\b\s+(?:U\.K\.?|UK)\b/gi,
      byLang: {
        nl: "TB-500 Kopen",
        de: "TB-500 kaufen",
        fr: "Acheter TB-500",
        es: "TB-500 Comprar",
        it: "Acquista TB-500"
      }
    },
    {
      pattern: /\bBuy\s+Tesofensine\b\s+(?:U\.K\.?|UK)\b/gi,
      byLang: {
        nl: "Tesofensine Kopen",
        de: "Tesofensine kaufen",
        fr: "Acheter Tesofensine",
        es: "Tesofensine Comprar",
        it: "Acquista Tesofensine"
      }
    },
    {
      pattern: /\bBuy\s+Tirzepatide\b\s+(?:U\.K\.?|UK)\b/gi,
      byLang: {
        nl: "Tirzepatide Kopen",
        de: "Tirzepatide kaufen",
        fr: "Acheter Tirzepatide",
        es: "Tirzepatide Comprar",
        it: "Acquista Tirzepatide"
      }
    }
  ];
  for (const r of extraIntroReplacements) {
    working = working.replace(r.pattern, r.byLang[lang]);
  }
  if (!working.includes("<") && working.length < 320 && /\bAOD[-\s]?9604\b/i.test(working) && /(GH\s*fragment|fat\s+metabolism|UK\s+delivery|Fast\s+UK)/i.test(working)) {
    const aodShortByLang = {
      nl: "AOD-9604 Kopen Nederland. Premium GH-fragment peptide voor onderzoek naar vetmetabolisme. ≥99% zuiverheid, COA inbegrepen. Snelle levering in Nederland.",
      de: "AOD-9604 kaufen Deutschland. Premium GH-Fragment-Peptid für die Forschung zum Fettstoffwechsel. ≥99% Reinheit, COA inklusive. Schnelle Lieferung nach Deutschland.",
      fr: "Acheter AOD-9604 France. Peptide fragment GH premium pour la recherche sur le métabolisme des graisses. Pureté ≥99%, COA inclus. Livraison rapide en France.",
      es: "aod 9604 comprar España. Péptido fragmento de GH premium para investigación del metabolismo de las grasas. Pureza ≥99%, COA incluido. Envío rápido a España.",
      it: "Acquista AOD-9604 Italia. Peptide frammento GH premium per la ricerca sul metabolismo dei grassi. Purezza ≥99%, COA incluso. Spedizione veloce in Italia."
    };
    working = aodShortByLang[lang];
  }
  if (!working.includes("<") && working.length < 360 && /\bBPC[-\s]?157\b/i.test(working) && /(UK\s+delivery|Fast\s+UK|research\s+peptide|Buy\s+BPC)/i.test(working)) {
    const bpcShortByLang = {
      nl: "BPC-157 Kopen. Premium onderzoekspeptide voor studies naar weefselherstel en darmbarrière. ≥99% zuiverheid, COA inbegrepen. Snelle levering in Nederland.",
      de: "BPC-157 Kaufen. Premium Forschungspeptid für Studien zu Gewebereparatur und Darmbarriere. ≥99% Reinheit, COA inklusive. Schnelle Lieferung nach Deutschland.",
      fr: "Acheter BPC-157. Peptide de recherche premium pour des études sur la réparation tissulaire et la barrière intestinale. Pureté ≥99%, COA inclus. Livraison rapide en France.",
      es: "BPC 157 Comprar España. Péptido de investigación premium para estudios sobre reparación tisular y barrera intestinal. Pureza ≥99%, COA incluido. Envío rápido a España.",
      it: "Acquista BPC-157. Peptide di ricerca premium per studi su riparazione tissutale e barriera intestinale. Purezza ≥99%, COA incluso. Spedizione veloce in Italia."
    };
    working = bpcShortByLang[lang];
  }
  if (!working.includes("<") && working.length < 360 && /\b5\s*-?\s*Amino\s*-?\s*1\s*MQ\b/i.test(working) && /(UK\s+delivery|Fast\s+UK|research\s+peptide|Buy\s+5)/i.test(working)) {
    const oneMqShortByLang = {
      nl: "5-amino-1mq kopen. Premium onderzoekscompound (NNMT-remmer) voor metabolisme- en energiebalansonderzoek. ≥99% zuiverheid, COA inbegrepen. Snelle levering in Nederland.",
      de: "5-Amino-1MQ kaufen. Premium Forschungscompound (NNMT-Inhibitor) für Stoffwechsel- und Energiehaushalt-Studien. ≥99% Reinheit, COA inklusive. Schnelle Lieferung nach Deutschland.",
      fr: "Acheter 5-Amino-1MQ. Composé de recherche premium (inhibiteur NNMT) pour les études du métabolisme et de l'équilibre énergétique. Pureté ≥99%, COA inclus. Livraison rapide en France.",
      es: "5-Amino-1MQ Comprar. Compuesto de investigación premium (inhibidor de NNMT) para estudios de metabolismo y balance energético. Pureza ≥99%, COA incluido. Envío rápido a España.",
      it: "Acquista 5-Amino-1MQ. Composto di ricerca premium (inibitore NNMT) per studi su metabolismo ed equilibrio energetico. Purezza ≥99%, COA incluso. Spedizione veloce in Italia."
    };
    working = oneMqShortByLang[lang];
  }
  if (!working.includes("<") && working.length < 420) {
    if (/\bCJC\s*-?\s*1295\b/i.test(working) && /\bNo\s*DAC\b/i.test(working) && /(Buy\s+CJC|No\s+DAC|UK\b|Fast\s+UK|delivery|research)/i.test(working)) {
      const shortByLang = {
        nl: "CJC-1295 No DAC Kopen. Research-grade GHRH-analoog (Mod GRF 1-29) voor studies naar pulsatile GH-afgifte. ≥99% zuiverheid, COA inbegrepen. Snelle levering in Nederland & EU.",
        de: "CJC-1295 No DAC kaufen. Forschungsqualität GHRH-Analog (Mod GRF 1-29) für Studien zur pulsierenden GH-Freisetzung. ≥99% Reinheit, COA inklusive. Schnelle Lieferung nach Deutschland & EU.",
        fr: "Acheter CJC-1295 No DAC. Analogue GHRH (Mod GRF 1-29) de qualité recherche pour l'étude de la libération pulsatile de GH. Pureté ≥99%, COA inclus. Livraison rapide en France & UE.",
        es: "CJC-1295 No DAC Comprar. Análogo de GHRH (Mod GRF 1-29) de calidad investigación para estudios de liberación pulsátil de GH. Pureza ≥99%, COA incluido. Envío rápido a España & UE.",
        it: "Acquista CJC-1295 No DAC. Analogo GHRH (Mod GRF 1-29) di qualità ricerca per studi sul rilascio pulsatile di GH. Purezza ≥99%, COA incluso. Spedizione veloce in Italia & UE."
      };
      working = shortByLang[lang];
    }
    if (/\bEpitalon\b/i.test(working) && /(Buy\s+Epitalon|UK\b|Fast\s+UK|delivery|telomerase|longevity|research)/i.test(working)) {
      const shortByLang = {
        nl: "Epitalon Kopen. Research-grade peptide voor studies naar telomerase, cellulaire veroudering en circadiane regulatie. ≥99% zuiverheid, COA inbegrepen. Snelle levering in Nederland & EU.",
        de: "Epitalon kaufen. Forschungspeptid für Studien zu Telomerase, zellulärer Alterung und zirkadianer Regulation. ≥99% Reinheit, COA inklusive. Schnelle Lieferung nach Deutschland & EU.",
        fr: "Acheter Epitalon. Peptide de recherche pour l'étude de la télomérase, du vieillissement cellulaire et des rythmes circadiens. Pureté ≥99%, COA inclus. Livraison rapide en France & UE.",
        es: "Epitalon Comprar. Péptido de investigación para estudios de telomerasa, envejecimiento celular y regulación circadiana. Pureza ≥99%, COA incluido. Envío rápido a España & UE.",
        it: "Acquista Epitalon. Peptide di ricerca per studi su telomerasi, invecchiamento cellulare e regolazione circadiana. Purezza ≥99%, COA incluso. Spedizione veloce in Italia & UE."
      };
      working = shortByLang[lang];
    }
    if (/\bCagrilintide\b/i.test(working) && /(Buy\s+Cagrilintide|UK\b|Fast\s+UK|delivery|amylin|satiety|metabolic|research)/i.test(working)) {
      const shortByLang = {
        nl: "Cagrilintide Kopen. Langwerkende amylin-analoog voor onderzoek naar verzadiging, maaglediging en metabolische regulatie. ≥99% zuiverheid, COA inbegrepen. Snelle levering in Nederland & EU.",
        de: "Cagrilintide kaufen. Langwirksames Amylin-Analog für Studien zu Sättigung, Magenentleerung und metabolischer Regulation. ≥99% Reinheit, COA inklusive. Schnelle Lieferung nach Deutschland & EU.",
        fr: "Acheter Cagrilintide. Analogue de l'amyline à action prolongée pour l'étude de la satiété, de la vidange gastrique et de la régulation métabolique. Pureté ≥99%, COA inclus. Livraison rapide en France & UE.",
        es: "Cagrilintide Comprar. Análogo de amilina de acción prolongada para estudios de saciedad, vaciado gástrico y regulación metabólica. Pureza ≥99%, COA incluido. Envío rápido a España & UE.",
        it: "Acquista Cagrilintide. Analogo dell'amilina a lunga durata per studi su sazietà, svuotamento gastrico e regolazione metabolica. Purezza ≥99%, COA incluso. Spedizione veloce in Italia & UE."
      };
      working = shortByLang[lang];
    }
    if (/\bDSIP\b/i.test(working) && /(Buy\s+DSIP|UK\b|Fast\s+UK|delivery|sleep|circadian|neuroendocrine|research)/i.test(working)) {
      const shortByLang = {
        nl: "DSIP Kopen. Research-grade peptide (Delta Sleep-Inducing Peptide) voor slaap-, stress- en neuro-endocrien onderzoek. ≥99% zuiverheid, COA inbegrepen. Snelle levering in Nederland & EU.",
        de: "DSIP kaufen. Forschungspeptid (Delta Sleep-Inducing Peptide) für Studien zu Schlaf, Stress und neuroendokriner Funktion. ≥99% Reinheit, COA inklusive. Schnelle Lieferung nach Deutschland & EU.",
        fr: "Acheter DSIP. Peptide de recherche (Delta Sleep-Inducing Peptide) pour l'étude du sommeil, du stress et des fonctions neuroendocrines. Pureté ≥99%, COA inclus. Livraison rapide en France & UE.",
        es: "DSIP Comprar. Péptido de investigación (Delta Sleep-Inducing Peptide) para estudios de sueño, estrés y función neuroendocrina. Pureza ≥99%, COA incluido. Envío rápido a España & UE.",
        it: "Acquista DSIP. Peptide di ricerca (Delta Sleep-Inducing Peptide) per studi su sonno, stress e funzione neuroendocrina. Purezza ≥99%, COA incluso. Spedizione veloce in Italia & UE."
      };
      working = shortByLang[lang];
    }
    if (/(\bHGH\b|\bGH\b)\s*Fragment\s*176\s*-\s*191\b/i.test(working) && /(Buy\s+HGH\s+Fragment|UK\b|Fast\s+UK|delivery|fat\s+metabolism|lipolytic|research)/i.test(working)) {
      const shortByLang = {
        nl: "HGH Fragment 176-191 Kopen. GH-fragment peptide voor onderzoek naar vetmetabolisme en adipocytenfunctie. ≥99% zuiverheid, COA inbegrepen. Snelle levering in Nederland & EU.",
        de: "HGH Fragment 176-191 kaufen. GH-Fragment-Peptid für Studien zu Fettstoffwechsel und Adipozytenfunktion. ≥99% Reinheit, COA inklusive. Schnelle Lieferung nach Deutschland & EU.",
        fr: "Acheter HGH Fragment 176-191. Peptide fragment GH pour l'étude du métabolisme des graisses et de la fonction adipocytaire. Pureté ≥99%, COA inclus. Livraison rapide en France & UE.",
        es: "HGH Fragment 176-191 Comprar. Péptido fragmento de GH para estudios de metabolismo de grasas y función adipocitaria. Pureza ≥99%, COA incluido. Envío rápido a España & UE.",
        it: "Acquista HGH Fragment 176-191. Peptide frammento GH per studi su metabolismo dei grassi e funzione adipocitaria. Purezza ≥99%, COA incluso. Spedizione veloce in Italia & UE."
      };
      working = shortByLang[lang];
    }
    if (/\bGHK\s*-?\s*Cu\b/i.test(working) && /(Buy\s+GHK|Copper|copper|UK\b|Fast\s+UK|delivery|research)/i.test(working)) {
      const shortByLang = {
        nl: "GHK-Cu Kopen. Premium koperpeptide (Copper Tripeptide-1) voor onderzoek naar weefselherstel en regeneratie. ≥99% zuiverheid, COA inbegrepen. Snelle levering in NL & EU.",
        de: "GHK-Cu kaufen. Premium Kupferpeptid (Copper Tripeptide-1) für Forschung zu Gewebereparatur und Regeneration. ≥99% Reinheit, COA inklusive. Schnelle Lieferung in DE & EU.",
        fr: "Acheter GHK-Cu. Peptide de cuivre premium (Copper Tripeptide-1) pour la recherche sur la réparation et la régénération tissulaires. Pureté ≥99%, COA inclus. Livraison rapide FR & UE.",
        es: "GHK-Cu Comprar. Péptido de cobre premium (Copper Tripeptide-1) para investigación de reparación y regeneración tisular. Pureza ≥99%, COA incluido. Envío rápido ES & UE.",
        it: "Acquista GHK-Cu. Peptide di rame premium (Copper Tripeptide-1) per ricerca su riparazione e rigenerazione tissutale. Purezza ≥99%, COA incluso. Spedizione veloce IT & UE."
      };
      working = shortByLang[lang];
    }
    if (/\bGHRP\s*-?\s*2\b/i.test(working) && /(Buy\s+GHRP|UK\b|Fast\s+UK|delivery|ghrelin|secretagogue|research)/i.test(working)) {
      const shortByLang = {
        nl: "GHRP-2 Kopen. Premium onderzoekspeptide (GH secretagoog) voor studies naar GH-afgifte en ghrelin-receptoractivatie. ≥99% zuiverheid, COA inbegrepen. Snelle levering in NL & EU.",
        de: "GHRP-2 Kaufen. Premium Forschungspeptid (GH-Sekretagog) für Studien zur GH-Freisetzung und Ghrelin-Rezeptor-Aktivierung. ≥99% Reinheit, COA inklusive. Schnelle Lieferung in DE & EU.",
        fr: "Acheter GHRP-2. Peptide de recherche premium (sécrétagogue GH) pour l'étude de la libération de GH et de l'activation du récepteur de la ghréline. Pureté ≥99%, COA inclus. Livraison rapide FR & UE.",
        es: "GHRP-2 Comprar. Péptido de investigación premium (secretagogo de GH) para estudios de liberación de GH y activación del receptor de grelina. Pureza ≥99%, COA incluido. Envío rápido ES & UE.",
        it: "Acquista GHRP-2. Peptide di ricerca premium (secretagogo GH) per studi su rilascio di GH e attivazione del recettore della grelina. Purezza ≥99%, COA incluso. Spedizione veloce IT & UE."
      };
      working = shortByLang[lang];
    }
    if (/\bGHRP\s*-?\s*6\b/i.test(working) && /(Buy\s+GHRP|UK\b|Fast\s+UK|delivery|ghrelin|secretagogue|appetite|research)/i.test(working)) {
      const shortByLang = {
        nl: "GHRP-6 Kopen. Premium onderzoekspeptide (GH secretagoog) voor studies naar GH-afgifte, ghrelin-receptoractivatie en eetlustmechanismen. ≥99% zuiverheid, COA inbegrepen. Snelle levering in NL & EU.",
        de: "GHRP-6 Kaufen. Premium Forschungspeptid (GH-Sekretagog) für Studien zu GH-Freisetzung, Ghrelin-Rezeptor-Aktivierung und Appetitmechanismen. ≥99% Reinheit, COA inklusive. Schnelle Lieferung in DE & EU.",
        fr: "Acheter GHRP-6. Peptide de recherche premium (sécrétagogue GH) pour l'étude de la libération de GH, de l'activation du récepteur de la ghréline et des mécanismes de l'appétit. Pureté ≥99%, COA inclus. Livraison rapide FR & UE.",
        es: "GHRP-6 Comprar. Péptido de investigación premium (secretagogo de GH) para estudios de liberación de GH, activación del receptor de grelina y mecanismos del apetito. Pureza ≥99%, COA incluido. Envío rápido ES & UE.",
        it: "Acquista GHRP-6. Peptide di ricerca premium (secretagogo GH) per studi su rilascio di GH, attivazione del recettore della grelina e meccanismi dell'appetito. Purezza ≥99%, COA incluso. Spedizione veloce IT & UE."
      };
      working = shortByLang[lang];
    }
    if (/\bMelanotan\s*2\b/i.test(working) && /(Buy\s+Melanotan|UK\b|Fast\s+UK|delivery|tanning|melanocortin|pigment|research)/i.test(working)) {
      const shortByLang = {
        nl: "Melanotan 2 kopen. Premium onderzoekspeptide (MT-2) voor studies naar melanocortine-receptor-signaling en pigmentatie. ≥99% zuiverheid, COA inbegrepen. Snelle levering in NL & EU.",
        de: "Melanotan 2 kaufen. Premium Forschungspeptid (MT-2) für Studien zur Melanocortin-Rezeptor-Signalgebung und Pigmentierung. ≥99% Reinheit, COA inklusive. Schnelle Lieferung in DE & EU.",
        fr: "Acheter Melanotan 2. Peptide de recherche premium (MT-2) pour l'étude de la signalisation des récepteurs mélanocortines et de la pigmentation. Pureté ≥99%, COA inclus. Livraison rapide FR & UE.",
        es: "Melanotan 2 comprar. Péptido de investigación premium (MT-2) para estudios de señalización del receptor de melanocortina y pigmentación. Pureza ≥99%, COA incluido. Envío rápido ES & UE.",
        it: "Acquista Melanotan 2. Peptide di ricerca premium (MT-2) per studi su segnalazione dei recettori melanocortinici e pigmentazione. Purezza ≥99%, COA incluso. Spedizione veloce IT & UE."
      };
      working = shortByLang[lang];
    }
    if (/\bIpamorelin\b/i.test(working) && /(Buy\s+Ipamorelin|UK\b|Fast\s+UK|delivery|secretagogue|research)/i.test(working)) {
      const shortByLang = {
        nl: "Ipamorelin kopen. Selectieve GH secretagoog voor onderzoek naar GH-asfysiologie met minimale effecten op cortisol en prolactine. ≥99% zuiverheid, COA inbegrepen. Snelle levering in NL & EU.",
        de: "Ipamorelin kaufen. Selektives GH-Sekretagog für Forschung zur GH-Achsenphysiologie mit minimalen Effekten auf Cortisol und Prolaktin. ≥99% Reinheit, COA inklusive. Schnelle Lieferung in DE & EU.",
        fr: "Acheter Ipamorelin. Sécrétagogue GH sélectif pour la recherche sur l'axe GH avec des effets minimes sur le cortisol et la prolactine. Pureté ≥99%, COA inclus. Livraison rapide FR & UE.",
        es: "Ipamorelin comprar. Secretagogo de GH selectivo para investigación del eje de GH con efectos mínimos sobre cortisol y prolactina. Pureza ≥99%, COA incluido. Envío rápido ES & UE.",
        it: "Acquista Ipamorelin. Secretagogo GH selettivo per ricerca sull'asse GH con effetti minimi su cortisolo e prolattina. Purezza ≥99%, COA incluso. Spedizione veloce IT & UE."
      };
      working = shortByLang[lang];
    }
    if (/\bNAD\+\b/i.test(working) && /(Buy\s+NAD|UK\b|Fast\s+UK|delivery|cellular|energy|research)/i.test(working)) {
      const shortByLang = {
        nl: "NAD+ kopen. Premium co-enzym voor onderzoek naar energiemetabolisme, DNA-reparatie en cellulaire signalisatie. ≥99% zuiverheid, COA inbegrepen. Snelle levering in NL & EU.",
        de: "NAD+ kaufen. Premium Coenzym für Forschung zu Energiestoffwechsel, DNA-Reparatur und zellulärer Signalgebung. ≥99% Reinheit, COA inklusive. Schnelle Lieferung in DE & EU.",
        fr: "Acheter NAD+. Coenzyme premium pour la recherche sur le métabolisme énergétique, la réparation de l'ADN et la signalisation cellulaire. Pureté ≥99%, COA inclus. Livraison rapide FR & UE.",
        es: "NAD+ comprar. Coenzima premium para investigación de metabolismo energético, reparación del ADN y señalización celular. Pureza ≥99%, COA incluido. Envío rápido ES & UE.",
        it: "Acquista NAD+. Coenzima premium per ricerca su metabolismo energetico, riparazione del DNA e segnalazione cellulare. Purezza ≥99%, COA incluso. Spedizione veloce IT & UE."
      };
      working = shortByLang[lang];
    }
    if (/\bO\s*-\s*304\b/i.test(working) && /(Buy\s+O|UK\b|Fast\s+UK|delivery|AMPK|metabolic|research)/i.test(working)) {
      const shortByLang = {
        nl: "O-304 kopen. Directe AMPK-activator voor onderzoek naar energiehomeostase en metabolische regulatie. ≥99% zuiverheid, COA inbegrepen. Snelle levering in NL & EU.",
        de: "O-304 kaufen. Direkter AMPK-Aktivator für Forschung zu Energiehomöostase und metabolischer Regulation. ≥99% Reinheit, COA inklusive. Schnelle Lieferung in DE & EU.",
        fr: "Acheter O-304. Activateur direct de l'AMPK pour la recherche sur l'homéostasie énergétique et la régulation métabolique. Pureté ≥99%, COA inclus. Livraison rapide FR & UE.",
        es: "O-304 comprar. Activador directo de AMPK para investigación de homeostasis energética y regulación metabólica. Pureza ≥99%, COA incluido. Envío rápido ES & UE.",
        it: "Acquista O-304. Attivatore diretto di AMPK per ricerca su omeostasi energetica e regolazione metabolica. Purezza ≥99%, COA incluso. Spedizione veloce IT & UE."
      };
      working = shortByLang[lang];
    }
    if (/\bRetatrutide\b/i.test(working) && /(Buy\s+Retatrutide|UK\b|Fast\s+UK|delivery|triple|agonist|GLP-1|GIP|research)/i.test(working)) {
      const shortByLang = {
        nl: "Retatrutide kopen. Premium onderzoekspeptide (triple agonist: GLP-1/GIP/glucagon) voor metabolisch onderzoek. ≥99% zuiverheid, COA inbegrepen. Snelle levering in NL & EU.",
        de: "Retatrutide kaufen. Premium Forschungspeptid (Triple-Agonist: GLP-1/GIP/Glukagon) für metabolische Forschung. ≥99% Reinheit, COA inklusive. Schnelle Lieferung in DE & EU.",
        fr: "Acheter Retatrutide. Peptide de recherche premium (triple agoniste : GLP-1/GIP/glucagon) pour la recherche métabolique. Pureté ≥99%, COA inclus. Livraison rapide FR & UE.",
        es: "Retatrutide comprar. Péptido de investigación premium (triple agonista: GLP-1/GIP/glucagón) para investigación metabólica. Pureza ≥99%, COA incluido. Envío rápido ES & UE.",
        it: "Acquista Retatrutide. Peptide di ricerca premium (triplo agonista: GLP-1/GIP/glucagone) per ricerca metabolica. Purezza ≥99%, COA incluso. Spedizione veloce IT & UE."
      };
      working = shortByLang[lang];
    }
    if (/\bSelank\b/i.test(working) && /(Buy\s+Selank|UK\b|Fast\s+UK|delivery|nootropic|anxiolytic|research)/i.test(working)) {
      const shortByLang = {
        nl: "Selank kopen. Premium onderzoekspeptide (TP-7) voor studies naar nootropische, anxiolytische en immunomodulerende mechanismen. ≥99% zuiverheid, COA inbegrepen. Snelle levering in NL & EU.",
        de: "Selank kaufen. Premium Forschungspeptid (TP-7) für Studien zu nootropischen, anxiolytischen und immunmodulatorischen Mechanismen. ≥99% Reinheit, COA inklusive. Schnelle Lieferung in DE & EU.",
        fr: "Acheter Selank. Peptide de recherche premium (TP-7) pour l'étude des mécanismes nootropiques, anxiolytiques et immunomodulateurs. Pureté ≥99%, COA inclus. Livraison rapide FR & UE.",
        es: "Selank comprar. Péptido de investigación premium (TP-7) para estudios de mecanismos nootrópicos, ansiolíticos e inmunomoduladores. Pureza ≥99%, COA incluido. Envío rápido ES & UE.",
        it: "Acquista Selank. Peptide di ricerca premium (TP-7) per studi su meccanismi nootropici, ansiolitici e immunomodulatori. Purezza ≥99%, COA incluso. Spedizione veloce IT & UE."
      };
      working = shortByLang[lang];
    }
    if (/\bSemaglutide\b/i.test(working) && /(Buy\s+Semaglutide|UK\b|Fast\s+UK|delivery|GLP-1|metabolic|research)/i.test(working)) {
      const shortByLang = {
        nl: "Semaglutide kopen. Premium onderzoekspeptide (GLP-1-analoog) voor studies naar glucosemetabolisme en darm-hersen-as signalisatie. ≥99% zuiverheid, COA inbegrepen. Snelle levering in NL & EU.",
        de: "Semaglutide kaufen. Premium Forschungspeptid (GLP-1-Analog) für Studien zu Glukosestoffwechsel und Darm-Hirn-Achse. ≥99% Reinheit, COA inklusive. Schnelle Lieferung in DE & EU.",
        fr: "Acheter Semaglutide. Peptide de recherche premium (analogue GLP-1) pour l'étude du métabolisme du glucose et de l'axe intestin-cerveau. Pureté ≥99%, COA inclus. Livraison rapide FR & UE.",
        es: "Semaglutide comprar. Péptido de investigación premium (análogo de GLP-1) para estudios de metabolismo de glucosa y eje intestino-cerebro. Pureza ≥99%, COA incluido. Envío rápido ES & UE.",
        it: "Acquista Semaglutide. Peptide di ricerca premium (analogo GLP-1) per studi su metabolismo del glucosio e asse intestino-cervello. Purezza ≥99%, COA incluso. Spedizione veloce IT & UE."
      };
      working = shortByLang[lang];
    }
    if (/\bSemax\b/i.test(working) && /(Buy\s+Semax|UK\b|Fast\s+UK|delivery|nootropic|cognitive|neuro|research)/i.test(working)) {
      const shortByLang = {
        nl: "Semax Kopen. Nootropisch peptide voor onderzoek naar cognitieve functie, BDNF en neuroprotectieve mechanismen. ≥99% zuiverheid, COA inbegrepen. Snelle levering in NL & EU.",
        de: "Semax kaufen. Nootropisches Peptid für Forschung zu kognitiver Funktion, BDNF und neuroprotektiven Mechanismen. ≥99% Reinheit, COA inklusive. Schnelle Lieferung in DE & EU.",
        fr: "Acheter Semax. Peptide nootropique pour la recherche sur la cognition, le BDNF et les mécanismes neuroprotecteurs. Pureté ≥99%, COA inclus. Livraison rapide FR & UE.",
        es: "Semax Comprar. Péptido nootrópico para investigación de función cognitiva, BDNF y mecanismos neuroprotectores. Pureza ≥99%, COA incluido. Envío rápido ES & UE.",
        it: "Acquista Semax. Peptide nootropo per ricerca su funzione cognitiva, BDNF e meccanismi neuroprotettivi. Purezza ≥99%, COA incluso. Spedizione veloce IT & UE."
      };
      working = shortByLang[lang];
    }
    if (/\bTB\s*-?\s*500\b/i.test(working) && /(Buy\s+TB|UK\b|Fast\s+UK|delivery|Thymosin|T\s*β\s*4|repair|recovery|research)/i.test(working)) {
      const shortByLang = {
        nl: "TB-500 Kopen. Thymosin Beta-4 (Tβ4) fragment voor onderzoek naar celmigratie, angiogenese en weefselherstel. ≥99% zuiverheid, COA inbegrepen. Snelle levering in NL & EU.",
        de: "TB-500 kaufen. Thymosin Beta-4 (Tβ4)-Fragment für Forschung zu Zellmigration, Angiogenese und Gewebereparatur. ≥99% Reinheit, COA inklusive. Schnelle Lieferung in DE & EU.",
        fr: "Acheter TB-500. Fragment de Thymosin Beta-4 (Tβ4) pour la recherche sur la migration cellulaire, l'angiogenèse et la réparation tissulaire. Pureté ≥99%, COA inclus. Livraison rapide FR & UE.",
        es: "TB-500 Comprar. Fragmento de Thymosin Beta-4 (Tβ4) para investigación de migración celular, angiogénesis y reparación tisular. Pureza ≥99%, COA incluido. Envío rápido ES & UE.",
        it: "Acquista TB-500. Frammento di Thymosin Beta-4 (Tβ4) per ricerca su migrazione cellulare, angiogenesi e riparazione tissutale. Purezza ≥99%, COA incluso. Spedizione veloce IT & UE."
      };
      working = shortByLang[lang];
    }
    if (/\bTesofensine\b/i.test(working) && /(Buy\s+Tesofensine|UK\b|Fast\s+UK|delivery|NS2330|monoamine|dopamine|serotonin|norepinephrine|research)/i.test(working)) {
      const shortByLang = {
        nl: "Tesofensine Kopen. Onderzoekscompound (NS2330) voor studies naar monoamine-heropname (dopamine, serotonine, norepinefrine) en eetlustregulatie. ≥99% zuiverheid, COA inbegrepen. Snelle levering in NL & EU.",
        de: "Tesofensine kaufen. Forschungscompound (NS2330) für Studien zur Monoamin-Wiederaufnahme (Dopamin, Serotonin, Noradrenalin) und Appetitregulation. ≥99% Reinheit, COA inklusive. Schnelle Lieferung in DE & EU.",
        fr: "Acheter Tesofensine. Composé de recherche (NS2330) pour l'étude de la recapture des monoamines (dopamine, sérotonine, noradrénaline) et de la régulation de l'appétit. Pureté ≥99%, COA inclus. Livraison rapide FR & UE.",
        es: "Tesofensine Comprar. Compuesto de investigación (NS2330) para estudios de recaptación de monoaminas (dopamina, serotonina, noradrenalina) y regulación del apetito. Pureza ≥99%, COA incluido. Envío rápido ES & UE.",
        it: "Acquista Tesofensine. Composto di ricerca (NS2330) per studi su ricaptazione delle monoamine (dopamina, serotonina, noradrenalina) e regolazione dell'appetito. Purezza ≥99%, COA incluso. Spedizione veloce IT & UE."
      };
      working = shortByLang[lang];
    }
    if (/\bTirzepatide\b/i.test(working) && /(Buy\s+Tirzepatide|UK\b|Fast\s+UK|delivery|GIP|GLP-1|dual\s+agonist|metabolic|research)/i.test(working)) {
      const shortByLang = {
        nl: "Tirzepatide Kopen. Duale GIP/GLP-1 agonist voor onderzoek naar incretine-signaling, glucosehomeostase en energiehuishouding. ≥99% zuiverheid, COA inbegrepen. Snelle levering in NL & EU.",
        de: "Tirzepatide kaufen. Dualer GIP/GLP-1-Agonist für Forschung zu Incretin-Signalwegen, Glukosehomöostase und Energiehaushalt. ≥99% Reinheit, COA inklusive. Schnelle Lieferung in DE & EU.",
        fr: "Acheter Tirzepatide. Double agoniste GIP/GLP-1 pour la recherche sur la signalisation des incrétines, l'homéostasie du glucose et le métabolisme énergétique. Pureté ≥99%, COA inclus. Livraison rapide FR & UE.",
        es: "Tirzepatide Comprar. Agonista dual GIP/GLP-1 para investigación de señalización de incretinas, homeostasis de glucosa y metabolismo energético. Pureza ≥99%, COA incluido. Envío rápido ES & UE.",
        it: "Acquista Tirzepatide. Doppio agonista GIP/GLP-1 per ricerca su segnalazione delle incretine, omeostasi del glucosio e metabolismo energetico. Purezza ≥99%, COA incluso. Spedizione veloce IT & UE."
      };
      working = shortByLang[lang];
    }
  }
  const contentTranslations = {
    nl: {
      // Common phrases
      "What is": "Wat is",
      "How does": "Hoe werkt",
      "Benefits of": "Voordelen van",
      "Research Applications": "Onderzoekstoepassingen",
      "Storage Instructions": "Bewaarinstructies",
      "Reconstitution Guide": "Reconstitutiehandleiding",
      "Dosage Information": "Doseringsinformatie",
      "Key Benefits": "Belangrijkste Voordelen",
      "Why Choose": "Waarom Kiezen voor",
      "Product Overview": "Productoverzicht",
      "Scientific Background": "Wetenschappelijke Achtergrond",
      "Quality Assurance": "Kwaliteitsborging",
      "Shipping Information": "Verzendinformatie",
      "Related Products": "Gerelateerde Producten",
      // SEO keywords for Netherlands
      "Buy": "Kopen",
      "purchase": "kopen",
      "order": "bestellen",
      "online": "online",
      "high quality": "hoge kwaliteit",
      "research grade": "onderzoekskwaliteit",
      "laboratory": "laboratorium",
      "peptide": "peptide",
      "peptides": "peptiden",
      "purity": "zuiverheid",
      "verified": "geverifieerd",
      "certified": "gecertificeerd",
      "fast delivery": "snelle levering",
      "fast shipping": "snelle verzending",
      "Fast": "Snelle",
      "UK delivery": "Levering in Nederland",
      "UK": "Nederland",
      "Europe": "Europa",
      "European": "Europees",
      // Research terms
      "research purposes": "onderzoeksdoeleinden",
      "scientific research": "wetenschappelijk onderzoek",
      "in vitro": "in vitro",
      "clinical studies": "klinische studies",
      "laboratory use": "laboratoriumgebruik",
      // Product attributes
      "lyophilized powder": "gelyofiliseerd poeder",
      "sterile": "steriel",
      "injectable": "injecteerbaar",
      "subcutaneous": "subcutaan",
      "intramuscular": "intramusculair",
      "10ml Vial": "10ml Flacon",
      "Vial": "Flacon",
      "for peptide Reconstitution": "voor Peptidereconstitutie",
      "Reconstitution": "Reconstitutie",
      // Actions
      "Store": "Bewaar",
      "Keep": "Houd",
      "Reconstitute": "Reconstitueer",
      "Mix": "Meng",
      "Inject": "Injecteer",
      "refrigerated": "gekoeld",
      "frozen": "bevroren",
      "room temperature": "kamertemperatuur",
      // Product page section headings
      "Specification": "Specificatie",
      "Detail": "Detail",
      "Reconstitution and Handling": "Reconstitutie en Behandeling",
      "Reconstitution Protocol": "Reconstitutieprotocol",
      "Storage Recommendations": "Bewaarbepalingen",
      "For laboratory research only": "Alleen voor laboratoriumonderzoek",
      "Not intended for human or veterinary use": "Niet bedoeld voor menselijk of veterinair gebruik",
      "Researchers should follow all applicable regulations": "Onderzoekers moeten alle toepasselijke regelgeving volgen",
      // Scientific terms
      "Molecular Formula": "Molecuulformule",
      "Molecular Weight": "Molecuulgewicht",
      "CAS Number": "CAS-nummer",
      "Sequence": "Sequentie",
      "Appearance": "Uiterlijk",
      "White lyophilised powder": "Wit gelyofiliseerd poeder",
      "HPLC": "HPLC",
      // Research mechanisms
      "Growth Factor Modulation": "Groeifactor Modulatie",
      "VEGF upregulation": "VEGF-opregulatie",
      "Enhanced angiogenesis": "Verbeterde angiogenese",
      "GH receptor effects": "GH-receptor effecten",
      "Growth hormone pathway": "Groeihormoonroute",
      "EGF modulation": "EGF-modulatie",
      "Epithelial growth support": "Epitheliale groeiondersteuning",
      "NGF interaction": "NGF-interactie",
      "Nerve growth effects": "Zenuwgroei-effecten",
      "Nitric Oxide System": "Stikstofmonoxide Systeem",
      "NO pathway activation": "NO-route activatie",
      "Vasodilation effects": "Vasodilatatie-effecten",
      "Endothelial function": "Endotheelfunctie",
      "Vascular health": "Vasculaire gezondheid",
      "Blood flow enhancement": "Bloedstroomverbetering",
      "Tissue perfusion": "Weefselperfusie",
      "Cytoprotective Actions": "Cytoprotectieve Acties",
      "Gastric protection": "Maagbescherming",
      "Original discovery context": "Oorspronkelijke ontdekkingscontext",
      "Mucosal healing": "Slijmvliesherstel",
      "GI epithelium repair": "GI-epitheelreparatie",
      "Anti-inflammatory": "Ontstekingsremmend",
      "Reduced damage markers": "Verminderde schademarkers",
      // Research Applications specific
      "Musculoskeletal Healing": "Musculoskeletale Genezing",
      "Tendon repair": "Peesherstel",
      "Achilles": "Achilles",
      "rotator cuff models": "rotator cuff modellen",
      "Ligament healing": "Bandenherstel",
      "MCL": "MCL",
      "ACL research": "ACL-onderzoek",
      "Muscle regeneration": "Spierregeneratie",
      "Injury recovery": "Blessure herstel",
      "Gastrointestinal Research": "Gastro-intestinaal Onderzoek",
      "Ulcer healing": "Maaggenezing",
      "Gastric cytoprotection": "Maag cytoprotectie",
      "IBD models": "IBD-modellen",
      "Inflammatory bowel research": "Inflammatoire darmonderzoek",
      "Mucosal barrier": "Slijmvliesbarrière",
      "Gut integrity": "Darmintegriteit",
      "Wound Healing": "Wondgenezing",
      "Skin repair": "Huidherstel",
      "Dermal regeneration": "Dermale regeneratie",
      "Angiogenesis": "Angiogenese",
      "Blood vessel formation": "Bloedvatvorming",
      "Fibroblast activity": "Fibroblastactiviteit",
      "Collagen production": "Collageenproductie",
      // Table/spec terms
      "Condition": "Conditie",
      "Temperature": "Temperatuur",
      "Duration": "Duur",
      "Lyophilised": "Gelyofiliseerd",
      "Reconstituted": "Gereconstitueerd",
      "up to": "tot",
      "months": "maanden",
      "weeks": "weken",
      "Size": "Formaat",
      "Price": "Prijs",
      "From": "Vanaf",
      "Minimum order": "Minimale bestelling",
      "discount on orders over": "korting op bestellingen boven",
      // Features/Benefits
      "Guaranteed": "Gegarandeerd",
      "Full documentation": "Volledige documentatie",
      "COA with every order": "COA bij elke bestelling",
      "UK laboratory tested": "Laboratorium getest",
      "Quality assured": "Kwaliteit verzekerd",
      "Express shipping available": "Expresverzending beschikbaar",
      "Research support": "Onderzoeksondersteuning",
      "Technical assistance": "Technische ondersteuning",
      "Why Choose Peptide Shop": "Waarom Kiezen voor Peptide Shop",
      "Peptide Shop supplies": "Peptide Shop levert",
      // Bacteriostatic Water & Supplies - Dutch
      "Bacteriostatic Water": "Bacteriostatic water",
      "bacteriostatic water": "bacteriostatic water",
      "BAC water": "BAC-water",
      "Sterile Water": "Steriel Water",
      "sterile water": "steriel water",
      "Peptide Reconstitution": "Peptide Reconstitutie",
      "peptide reconstitution": "peptide reconstitutie",
      "for Peptide Research": "voor Peptide Onderzoek",
      "What is Bacteriostatic Water": "Wat is Bacteriostatic water",
      "benzyl alcohol": "benzylalcohol",
      "bacteriostatic preservative": "bacteriostatisch conserveermiddel",
      "inhibits the growth of bacteria": "remt de groei van bacteriën",
      "inhibits bacterial growth": "remt bacteriegroei",
      "reconstituting lyophilized": "reconstitutie van gelyofiliseerde",
      "freeze-dried": "gevriesdroogde",
      "lyophilized": "gelyofiliseerde",
      "for research applications": "voor onderzoekstoepassingen",
      "multiple withdrawals": "meerdere onttrekkingen",
      "from the same vial": "uit dezelfde flacon",
      "are needed": "nodig zijn",
      "Key Features": "Belangrijkste Kenmerken",
      "USP Grade Quality": "USP-kwaliteit",
      "USP Grade": "USP-kwaliteit",
      "USP grade": "USP-kwaliteit",
      "Our bacteriostatic water meets": "Ons bacteriostatisch water voldoet aan",
      "United States Pharmacopeia": "United States Pharmacopeia",
      "USP standards": "USP-normen",
      "standards for": "normen voor",
      "Sterility": "Steriliteit",
      "Purity": "Zuiverheid",
      "concentration": "concentratie",
      "Endotoxin levels": "Endotoxineniveaus",
      "endotoxin levels": "endotoxineniveaus",
      "Multi-Use Design": "Meervoudig Gebruik Ontwerp",
      "Unlike single-use": "In tegenstelling tot eenmalig gebruik",
      "single-use sterile water": "eenmalig steriel water",
      "single-use": "eenmalig gebruik",
      "allows multiple withdrawals": "maakt meerdere onttrekkingen mogelijk",
      "over several weeks": "gedurende meerdere weken",
      "several weeks": "meerdere weken",
      "without contamination risk": "zonder besmettingsrisico",
      "contamination risk": "besmettingsrisico",
      "cost-effective": "kosteneffectief",
      "for research laboratories": "voor onderzoekslaboratoria",
      "research laboratories": "onderzoekslaboratoria",
      "Convenient": "Handig",
      "convenient": "handig",
      "Each": "Elke",
      "each": "elke",
      "vial can": "flacon kan",
      "can reconstitute": "kan reconstitueren",
      "peptide vials": "peptide flacons",
      "depending on concentration requirements": "afhankelijk van concentratievereisten",
      "How to Use": "Hoe te Gebruiken",
      "How to use": "Hoe te gebruiken",
      "Reconstitution Steps": "Reconstitutie Stappen",
      "Allow the peptide vial": "Laat de peptide flacon",
      "to reach room temperature": "kamertemperatuur bereiken",
      "Clean both vial tops": "Reinig beide flacontoppen",
      "with an alcohol swab": "met een alcoholdoekje",
      "alcohol swab": "alcoholdoekje",
      "Using a sterile syringe": "Met een steriele spuit",
      "sterile syringe": "steriele spuit",
      "withdraw the desired amount": "de gewenste hoeveelheid onttrekken",
      "desired amount": "gewenste hoeveelheid",
      "Insert the needle": "Steek de naald",
      "into the peptide vial": "in de peptide flacon",
      "aiming at the glass wall": "richtend op de glaswand",
      "glass wall": "glaswand",
      "Slowly inject": "Langzaam injecteren",
      "allowing it to run down": "laat het naar beneden lopen",
      "run down the vial wall": "langs de flaconwand lopen",
      "vial wall": "flaconwand",
      "until fully dissolved": "tot volledig opgelost",
      "fully dissolved": "volledig opgelost",
      "Store reconstituted peptide": "Bewaar gereconstitueerd peptide",
      "reconstituted peptide": "gereconstitueerd peptide",
      "Recommended Volumes": "Aanbevolen Volumes",
      "Peptide Amount": "Peptide Hoeveelheid",
      "Suggested": "Aanbevolen",
      "suggested": "aanbevolen",
      "Concentration": "Concentratie",
      "Storage": "Opslag",
      "Unopened": "Ongeopend",
      "unopened": "ongeopend",
      "away from direct light": "uit direct licht",
      "direct light": "direct licht",
      "Opened": "Geopend",
      "opened": "geopend",
      "Use within": "Gebruik binnen",
      "use within": "gebruik binnen",
      "days": "dagen",
      "Do not freeze": "Niet invriezen",
      "do not freeze": "niet invriezen",
      "Freezing may compromise sterility": "Invriezen kan de steriliteit aantasten",
      "may compromise sterility": "kan de steriliteit aantasten",
      "Shelf life": "Houdbaarheid",
      "shelf life": "houdbaarheid",
      "years from manufacture date": "jaar vanaf productiedatum",
      "manufacture date": "productiedatum",
      "Applications in Research": "Toepassingen in Onderzoek",
      "is essential for": "is essentieel voor",
      "essential for": "essentieel voor",
      "for in vitro studies": "voor in-vitro-studies",
      "in vitro studies": "in-vitro-studies",
      "Preparation of stock solutions": "Voorbereiding van stamoplossingen",
      "stock solutions": "stamoplossingen",
      "Multi-day research protocols": "Meerdaagse onderzoeksprotocollen",
      "research protocols": "onderzoeksprotocollen",
      "requiring repeat sampling": "die herhaalde bemonstering vereisen",
      "repeat sampling": "herhaalde bemonstering",
      "sterility must be maintained": "steriliteit moet worden gehandhaafd",
      "maintained over time": "in de tijd behouden",
      "over time": "in de tijd",
      "Comparison": "Vergelijking",
      "comparison": "vergelijking",
      "Feature": "Kenmerk",
      "feature": "kenmerk",
      "Preservative": "Conserveermiddel",
      "preservative": "conserveermiddel",
      "Multiple Uses": "Meervoudig Gebruik",
      "multiple uses": "meervoudig gebruik",
      "Single use only": "Alleen eenmalig gebruik",
      "single use only": "alleen eenmalig gebruik",
      "Bacterial Growth": "Bacteriegroei",
      "bacterial growth": "bacteriegroei",
      "Inhibited": "Geremd",
      "inhibited": "geremd",
      "Possible after opening": "Mogelijk na openen",
      "after opening": "na openen",
      "Best For": "Het Beste Voor",
      "best for": "het beste voor",
      "Multi-dose peptides": "Meerdosis peptiden",
      "multi-dose": "meerdosis",
      "Single-dose applications": "Enkeldosis toepassingen",
      "single-dose": "enkeldosis",
      "Every batch": "Elke batch",
      "every batch": "elke batch",
      "undergoes testing": "ondergaat testen",
      "testing for": "testen op",
      "Tested per": "Getest volgens",
      "tested per": "getest volgens",
      "Particulate Matter": "Deeltjesmateriaal",
      "particulate matter": "deeltjesmateriaal",
      "Content": "Inhoud",
      "content": "inhoud",
      "Verified at": "Geverifieerd bij",
      "verified at": "geverifieerd bij",
      "Popular": "Populair",
      "popular": "populair",
      "healing peptide": "genezend peptide",
      "Recovery peptide": "Herstel peptide",
      "recovery peptide": "herstel peptide",
      "GLP-1 agonist": "GLP-1-agonist",
      "This makes it ideal": "Dit maakt het ideaal",
      "makes it ideal": "maakt het ideaal",
      "ideal for": "ideaal voor",
      "making it": "waardoor het",
      // Product-specific headings and terms - Dutch
      "Research Use Statement": "Onderzoeksgebruiksverklaring",
      "Ordering Information": "Bestelinformatie",
      "Important Research Use Notice": "Belangrijke Onderzoeksgebruiksmelding",
      "Order Today": "Bestel Vandaag",
      "Order": "Bestel",
      "Today": "Vandaag",
      "How Does": "Hoe Werkt",
      "Work": "Werken",
      "Specifications": "Specificaties",
      "Peptide Specifications": "Peptide Specificaties",
      // Research categories
      "Obesity Research": "Obesitas Onderzoek",
      "Metabolic Research": "Metabool Onderzoek",
      "Gene Expression": "Genexpressie",
      "GH Axis Studies": "GH-as Studies",
      "Delivery Options": "Bezorgopties",
      "Available Package Sizes": "Beschikbare Verpakkingsformaten",
      "Guaranteed Purity": "Gegarandeerde Zuiverheid",
      "UK-Based Delivery": "Levering in Nederland",
      "Weight Management Studies": "Gewichtsbeheersing Studies",
      "Tissue Repair": "Weefselreparatie",
      "Selectivity Profile": "Selectiviteitsprofiel",
      "Selective Action": "Selectieve Werking",
      "Research Support": "Onderzoeksondersteuning",
      "Neuroprotection": "Neuroprotectie",
      "Lipolytic Activity": "Lipolytische Activiteit",
      "GHS-R Activation": "GHS-R Activatie",
      "Diabetes Research": "Diabetes Onderzoek",
      "Comparative Incretin Research": "Vergelijkend Incretine Onderzoek",
      "Combination Research": "Combinatie Onderzoek",
      "Cognitive Research": "Cognitief Onderzoek",
      "Central Nervous System Actions": "Centrale Zenuwstelsel Acties",
      "Key Differences": "Belangrijkste Verschillen",
      // Additional Research Headers - Dutch
      "Actin Regulation": "Actineregulatie",
      "Adipose Tissue": "Vetweefsel",
      "Adipose Tissue Effects": "Effecten op Vetweefsel",
      "Ageing Research": "Verouderingsonderzoek",
      "Anti-Inflammatory Research": "Ontstekingsremmend Onderzoek",
      "Anti-Lipogenic Effects": "Anti-Lipogene Effecten",
      "Anxiety Research": "Angstonderzoek",
      "Appetite Research": "Eetlustonderzoek",
      "Appetite and Obesity Research": "Eetlust- en Obesitasonderzoek",
      "Cardiovascular Research": "Cardiovasculair Onderzoek",
      "Cell Biology": "Celbiologie",
      "Central Nervous System Effects": "Effecten op Centraal Zenuwstelsel",
      "Circadian Research": "Circadiaan Onderzoek",
      "Collagen & ECM": "Collageen & ECM",
      "Competitive Pricing": "Concurrerende Prijzen",
      "Comprehensive Documentation": "Uitgebreide Documentatie",
      "Convenient 10ml Size": "Handig Formaat van 10ml",
      "Copper Delivery": "Koperlevering",
      "DNA Repair": "DNA-herstel",
      "Dedicated Support": "Toegewijde Ondersteuning",
      "Direct AMPK Activation": "Directe AMPK-activatie",
      "Dopamine Effects": "Dopamine-effecten",
      "Downstream Pathways": "Downstream Routes",
      "Dual Incretin Receptor Activation": "Dubbele Incretinereceptoractivatie",
      "Energy Expenditure Studies": "Energieverbruikstudies",
      "Energy Metabolism": "Energiemetabolisme",
      "Exercise Mimetics": "Oefening Mimetica",
      "Fat Metabolism": "Vetmetabolisme",
      "Fat Metabolism Studies": "Vetmetabolisme Studies",
      "GABA System": "GABA-systeem",
      "GH Axis Research": "GH-as Onderzoek",
      "GHRH Receptor Activation": "GHRH-receptoractivatie",
      "GIP Receptor Activation": "GIP-receptoractivatie",
      "GLP-1 Receptor Activation": "GLP-1-receptoractivatie",
      "Gastric Effects": "Maageffecten",
      "Gastrointestinal Effects": "Gastro-intestinale Effecten",
      "Glucagon Receptor Activation": "Glucagonreceptoractivatie",
      "Hepatic Metabolism Research": "Levermetabolisme Onderzoek",
      "Immunology": "Immunologie",
      "Inflammation Modulation": "Ontstekingsmodulatie",
      "Inflammatory Disease Models": "Ontstekingsziektemodellen",
      "Longevity Research": "Levensduuronderzoek",
      "Melanocortin Receptor Family": "Melanocortine Receptor Familie",
      "Melanogenesis Pathway": "Melanogenese Route",
      "Metabolic Effects": "Metabole Effecten",
      "Metabolic Studies": "Metabole Studies",
      "Metabolic Syndrome Studies": "Metabool Syndroom Studies",
      "Metabolism": "Metabolisme",
      "Methylation Balance": "Methylatiebalans",
      "Modified Stability": "Gewijzigde Stabiliteit",
      "Monoamine Regulation": "Monoamineregulatie",
      "NAD+ Metabolism": "NAD+ Metabolisme",
      "Neuroendocrine": "Neuro-endocrien",
      "Neuroplasticity": "Neuroplasticiteit",
      "Neuroscience": "Neurowetenschap",
      "Neuroscience Applications": "Neurowetenschappelijke Toepassingen",
      "Neurotransmitter Effects": "Neurotransmittereffecten",
      "Neurotrophin Modulation": "Neurotrofine Modulatie",
      "Norepinephrine Effects": "Norepinefrine-effecten",
      "Obesity Studies": "Obesitas Studies",
      "Other Effects": "Andere Effecten",
      "Pancreatic Beta-Cell Effects": "Pancreatische Bètaceleffecten",
      "Pancreatic Effects": "Pancreatische Effecten",
      "Pigmentation Research": "Pigmentatie Onderzoek",
      "Pineal Function": "Pijnappelklierfunctie",
      "Pituitary Function": "Hypofysefunctie",
      "Pulsatile vs Sustained Release": "Pulsatiele vs. Duurzame Afgifte",
      "Receptor Activation": "Receptoractivatie",
      "Satiety Signalling": "Verzadigingssignalering",
      "Secondary Effects": "Secundaire Effecten",
      "Serotonin Effects": "Serotonine-effecten",
      "Sexual Function Studies": "Seksuele Functie Studies",
      "Sirtuin Activation": "Sirtuïne-activatie",
      "Skin Disorder Research": "Huidaandoening Onderzoek",
      "Skin Research": "Huidonderzoek",
      "Sleep Regulation": "Slaapregulatie",
      "Sleep Research": "Slaaponderzoek",
      "Stress Research": "Stressonderzoek",
      "Synergistic Metabolic Effects": "Synergetische Metabole Effecten",
      "Synergy with GHRH": "Synergie met GHRH",
      "Telomerase Activation": "Telomerase-activatie",
      "UK-Based Supplier": "Nederlandse Leverancier",
      "UK-Based Supply": "Nederlandse Voorraad",
      "Verified Purity": "Geverifieerde Zuiverheid",
      "Weight Management Research": "Gewichtsbeheersing Onderzoek",
      // Scientific terms
      "synthetic analogue": "synthetische analoog",
      "synthetic": "synthetisch",
      "analogue": "analoog",
      "analog": "analoog",
      "hormone": "hormoon",
      "receptor": "receptor",
      "receptor agonist": "receptoragonist",
      "agonist": "agonist",
      "antagonist": "antagonist",
      "binding": "binding",
      "affinity": "affiniteit",
      "selectivity": "selectiviteit",
      "mechanism": "mechanisme",
      "pathway": "signaalweg",
      "signalling": "signalering",
      "activation": "activatie",
      "inhibition": "inhibitie",
      "modulation": "modulatie",
      "expression": "expressie",
      "regulation": "regulatie",
      "metabolism": "metabolisme",
      "metabolic": "metabool",
      "glucose": "glucose",
      "insulin": "insuline",
      "insulin secretion": "insulinesecretie",
      "appetite regulation": "eetlustregulatie",
      "appetite": "eetlust",
      "weight management": "gewichtsbeheer",
      "weight loss": "gewichtsverlies",
      "obesity": "obesitas",
      "diabetes": "diabetes",
      "type 2 diabetes": "type 2 diabetes",
      "blood sugar": "bloedsuiker",
      "half-life": "halfwaardetijd",
      "bioavailability": "biologische beschikbaarheid",
      "pharmacokinetics": "farmacokinetiek",
      "pharmacodynamics": "farmacodynamica",
      // Product descriptions
      "research peptide": "onderzoekspeptide",
      "research-grade": "onderzoekskwaliteit",
      "pharmaceutical grade": "farmaceutische kwaliteit",
      "raw peptide": "ruw peptide",
      "active pharmaceutical ingredient": "actief farmaceutisch ingrediënt",
      "brand-name": "merknaam",
      "prescription medications": "receptmedicijnen",
      "laboratory research purposes": "laboratoriumonderzoeksdoeleinden",
      "human consumption": "menselijke consumptie",
      "medical treatment": "medische behandeling",
      "not for human use": "niet voor menselijk gebruik",
      "for research only": "alleen voor onderzoek",
      "research only": "alleen onderzoek",
      // Quality and purity
      "HPLC analysis": "HPLC-analyse",
      "mass spectrometry": "massaspectrometrie",
      "Certificate of Analysis": "Analysecertificaat",
      "COA": "COA",
      "batch": "batch",
      "lot": "lot",
      "identity": "identiteit",
      "peptide content": "peptide-inhoud",
      "quality control": "kwaliteitscontrole",
      "strict quality control": "strikte kwaliteitscontrole",
      "manufacturing": "productie",
      "shipping": "verzending",
      // Storage terms
      "long-term stability": "langdurige stabiliteit",
      "refrigerator": "koelkast",
      "freeze-thaw cycles": "vries-dooicycli",
      "protect from light": "beschermen tegen licht",
      "airtight containers": "luchtdichte containers",
      "moisture absorption": "vochtopname",
      "properly stored": "correct bewaard",
      // Reconstitution
      "sterile bacteriostatic water": "steriel bacteriostatisch water",
      "alkaline buffer": "alkalische buffer",
      "isoelectric point": "isoëlektrisch punt",
      "peptide degradation": "peptideafbraak",
      "dissolution": "oplossing",
      "dissolve": "oplossen",
      // Delivery
      "next day delivery": "bezorging de volgende dag",
      "standard shipping": "standaardverzending",
      "express delivery": "expreslevering",
      "international shipping": "internationale verzending",
      "customs delays": "douanevertragingen",
      "overseas orders": "buitenlandse bestellingen",
      "tracked delivery": "gevolgde bezorging",
      "discrete packaging": "discrete verpakking",
      "cold packs": "koelelementen",
      "dry ice": "droog ijs",
      // Ordering
      "minimum order": "minimale bestelling",
      "bulk pricing": "groothandelsprijzen",
      "custom orders": "aangepaste bestellingen",
      "institutional research": "institutioneel onderzoek",
      "larger quantities": "grotere hoeveelheden",
      "package sizes": "verpakkingsformaten",
      "vial": "flacon",
      "vials": "flacons",
      // Scientific activities
      "binding assays": "bindingsassays",
      "receptor binding": "receptorbinding",
      "in vivo": "in vivo",
      "disease models": "ziektemodellen",
      "research models": "onderzoeksmodellen",
      "pilot studies": "pilotstudies",
      "published literature": "gepubliceerde literatuur",
      "published data": "gepubliceerde gegevens",
      "reference standards": "referentiestandaarden",
      "reproducible results": "reproduceerbare resultaten",
      "consistent quality": "consistente kwaliteit",
      "batch-to-batch": "batch-tot-batch",
      // Body/biological terms
      "intestines": "darmen",
      "gastric": "maag",
      "beta-cell": "bètacel",
      "beta-cell function": "bètacelfunctie",
      "gastric emptying": "maagontlediging",
      "neuroprotective": "neuroprotectief",
      "serum albumin": "serumalbumine",
      "albumin binding": "albumine-binding",
      "biological half-life": "biologische halfwaardetijd",
      "prolonged activity": "verlengde activiteit",
      "sustained activation": "aanhoudende activatie",
      "**5-Amino-1MQ** (5-Amino-1-Methylquinolinium) is a selective inhibitor of nicotinamide N-methyltransferase (NNMT), an enzyme increasingly recognised as a key regulator of cellular metabolism, NAD+ homeostasis, and adipose tissue function. This research compound has emerged as an important tool for studying the intersection of epigenetics, energy metabolism, and ageing.": "**5-Amino-1MQ** (5-Amino-1-Methylquinolinium) is een selectieve remmer van nicotinamide N-methyltransferase (NNMT), een enzym dat in toenemende mate wordt erkend als een belangrijke regulator van het celmetabolisme, NAD+ homeostase en de functie van vetweefsel. Deze onderzoeksverbinding is naar voren gekomen als een belangrijk hulpmiddel voor het bestuderen van het snijvlak van epigenetica, energiemetabolisme en veroudering.",
      "**AOD-9604** (Anti-Obesity Drug 9604) is a modified fragment of human growth hormone comprising amino acids 177-191 of the C-terminal region, with an additional tyrosine residue at the N-terminus. This synthetic peptide was specifically designed to isolate the fat-metabolising properties of growth hormone without its growth-promoting or diabetogenic effects.": "**AOD-9604** (Anti-Obesity Drug 9604) is een gemodificeerd fragment van menselijk groeihormoon dat de aminozuren 177-191 van het C-terminale gebied omvat, met een extra tyrosineresidu aan de N-terminus. Dit synthetische peptide is specifiek ontworpen om de vetmetaboliserende eigenschappen van groeihormoon te isoleren zonder de groeibevorderende of diabetogene effecten.",
      '**BPC-157** (Body Protection Compound-157) is a synthetic pentadecapeptide (15 amino acids) derived from a protein found in human gastric juice. Since its discovery, BPC-157 has become one of the most extensively studied peptides in tissue healing and regeneration research. For published research, see [PubMed studies on BPC-157](https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157){:target="_blank" rel="noopener"}.': '**BPC-157** (Body Protection Compound-157) is een synthetisch pentadecapeptide (15 aminozuren) afgeleid van een eiwit dat voorkomt in menselijk maagsap. Sinds de ontdekking is BPC-157 een van de meest uitgebreid bestudeerde peptiden geworden in onderzoek naar weefselgenezing en regeneratie. Voor gepubliceerd onderzoek, zie [PubMed studies over BPC-157](https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157){:target="_blank" rel="noopener"}.',
      "**CJC-1295 No DAC** (also known as Modified GRF 1-29 or Mod GRF) is a synthetic analog of growth hormone-releasing hormone (GHRH) with specific amino acid modifications that enhance its stability and half-life. Unlike CJC-1295 with DAC, this version lacks the Drug Affinity Complex, producing pulsatile rather than sustained GH release patterns.": "**CJC-1295 No DAC** (ook bekend als Modified GRF 1-29 of Mod GRF) is een synthetisch analoog van groeihormoon-releasing hormoon (GHRH) met specifieke aminozuurmodificaties die de stabiliteit en halfwaardetijd verbeteren. In tegenstelling tot CJC-1295 met DAC, mist deze versie het Drug Affinity Complex, wat resulteert in pulserende in plaats van langdurige GH-afgiftepatronen.",
      "**Cagrilintide** (AM833, NN9838) is a long-acting acylated analog of human amylin, a peptide hormone co-secreted with insulin from pancreatic beta cells. Through fatty acid acylation, cagrilintide achieves an extended half-life enabling once-weekly research dosing, making it an invaluable tool for studying amylin's role in satiety and metabolic regulation.": "**Cagrilintide** (AM833, NN9838) is een langwerkend geacyleerd analoog van menselijk amyline, een peptidehormoon dat samen met insuline wordt uitgescheiden door bètacellen in de pancreas. Door vetzuuracylering bereikt cagrilintide een verlengde halfwaardetijd die wekelijkse onderzoeksdosering mogelijk maakt, waardoor het een onschatbaar hulpmiddel is voor het bestuderen van de rol van amyline bij verzadiging en metabole regulatie.",
      "**DSIP** (Delta Sleep-Inducing Peptide) is a nonapeptide first isolated from rabbit brain in 1977 during research into sleep physiology. The peptide was named for its ability to promote delta wave sleep patterns in research models.": "**DSIP** (Delta Sleep-Inducing Peptide) is een nonapeptide dat voor het eerst werd geïsoleerd uit konijnenhersenen in 1977 tijdens onderzoek naar slaapfysiologie. Het peptide werd vernoemd naar zijn vermogen om delta-golfslaappatronen te bevorderen in onderzoeksmodellen.",
      "**Epitalon** (Epithalon, AEDG peptide) is a synthetic tetrapeptide based on epithalamin, a pineal gland extract extensively studied for its effects on telomerase activation and cellular ageing. Developed from decades of Russian research, Epitalon has become a key tool in longevity and anti-ageing research.": "**Epitalon** (Epithalon, AEDG-peptide) is een synthetisch tetrapeptide gebaseerd op epithalamine, een pijnappelklierextract dat uitgebreid is bestudeerd vanwege zijn effecten op telomerase-activatie en cellulaire veroudering. Ontwikkeld uit tientallen jaren Russisch onderzoek, is Epitalon een belangrijk hulpmiddel geworden in onderzoek naar levensduur en veroudering.",
      "**GHK-Cu** (Copper Tripeptide-1) is a naturally occurring copper-peptide complex consisting of three amino acids (glycine-histidine-lysine) bound to a copper ion. Found in human plasma, saliva, and urine, GHK-Cu concentrations naturally decline with age.": "**GHK-Cu** (Koper Tripeptide-1) is een natuurlijk voorkomend koper-peptidecomplex bestaande uit drie aminozuren (glycine-histidine-lysine) gebonden aan een koperion. GHK-Cu-concentraties, die worden aangetroffen in menselijk plasma, speeksel en urine, nemen van nature af met de leeftijd.",
      "**GHRP-2** (Growth Hormone Releasing Peptide-2, Pralmorelin) is a synthetic hexapeptide that stimulates growth hormone release through activation of the ghrelin receptor (GHS-R1a). GHRP-2 is considered more selective than GHRP-6, producing robust GH release with less pronounced effects on appetite, cortisol, and prolactin.": "**GHRP-2** (Growth Hormone Releasing Peptide-2, Pralmorelin) is een synthetisch hexapeptide dat de afgifte van groeihormoon stimuleert door activering van de ghreline-receptor (GHS-R1a). GHRP-2 wordt als selectiever beschouwd dan GHRP-6 en produceert een robuuste GH-afgifte met minder uitgesproken effecten op eetlust, cortisol en prolactine.",
      "**GHRP-6** (Growth Hormone Releasing Peptide-6) is a synthetic hexapeptide that stimulates growth hormone release through activation of the ghrelin receptor (GHS-R1a). As one of the first synthetic GH secretagogues developed, GHRP-6 has extensive research documentation and remains a valuable tool for studying growth hormone physiology.": "**GHRP-6** (Growth Hormone Releasing Peptide-6) is een synthetisch hexapeptide dat de afgifte van groeihormoon stimuleert door activering van de ghreline-receptor (GHS-R1a). Als een van de eerste ontwikkelde synthetische GH-secretagogen heeft GHRP-6 uitgebreide onderzoeksdocumentatie en blijft het een waardevol hulpmiddel voor het bestuderen van de fysiologie van groeihormoon.",
      "**HGH Fragment 176-191** is a synthetic peptide comprising the C-terminal portion of human growth hormone (amino acids 176-191). This specific region has been identified as responsible for GH's lipolytic (fat-burning) activity without the hormone's growth-promoting effects.": "**HGH Fragment 176-191** is een synthetisch peptide dat het C-terminale deel van menselijk groeihormoon (aminozuren 176-191) omvat. Deze specifieke regio is geïdentificeerd als verantwoordelijk voor de lipolytische (vetverbrandende) activiteit van GH zonder de groeibevorderende effecten van het hormoon.",
      "**Ipamorelin** is a synthetic pentapeptide growth hormone secretagogue that selectively stimulates growth hormone (GH) release from pituitary somatotrope cells. Distinguished by its high selectivity, ipamorelin causes minimal effects on cortisol and prolactin levels, making it an invaluable research tool for studying isolated GH secretion mechanisms.": "**Ipamorelin** is een synthetische pentapeptide groeihormoonsecretagoog die selectief de afgifte van groeihormoon (GH) uit hypofyse-somatrope cellen stimuleert. Ipamorelin onderscheidt zich door zijn hoge selectiviteit en veroorzaakt minimale effecten op cortisol- en prolactinespiegels, waardoor het een onschatbaar onderzoekshulpmiddel is voor het bestuderen van geïsoleerde GH-secretiemechanismen.",
      "**Melanotan 2** (MT-2, MT-II) is a synthetic cyclic heptapeptide analogue of alpha-melanocyte stimulating hormone (α-MSH). Originally developed at the University of Arizona in the 1980s, this research peptide has become an essential tool for studying melanocortin receptor signalling and the regulation of skin pigmentation.": "**Melanotan 2** (MT-2, MT-II) is een synthetisch cyclisch heptapeptide-analoog van alfa-melanocyt-stimulerend hormoon (α-MSH). Oorspronkelijk ontwikkeld aan de Universiteit van Arizona in de jaren 1980, is dit onderzoekspeptide een essentieel hulpmiddel geworden voor het bestuderen van melanocortine-receptor-signalerin en de regulatie van huidpigmentatie.",
      "**NAD+** (Nicotinamide Adenine Dinucleotide) is a coenzyme found in all living cells that plays fundamental roles in energy metabolism, DNA repair, and cellular signalling. NAD+ is essential for hundreds of enzymatic reactions and is a key regulator of cellular health.": "**NAD+** (Nicotinamide Adenine Dinucleotide) is een co-enzym dat in alle levende cellen wordt aangetroffen en een fundamentele rol speelt in energiemetabolisme, DNA-reparatie en cellulaire signalering. NAD+ is essentieel voor honderden enzymatische reacties en is een belangrijke regulator van de cellulaire gezondheid.",
      "**O-304** is a novel small molecule that directly activates AMPK (AMP-activated protein kinase), the master regulator of cellular energy homeostasis. Unlike indirect activators like metformin, O-304 binds directly to AMPK's β1 subunit.": "**O-304** is een nieuw klein molecuul dat direct AMPK (AMP-geactiveerde proteïnekinase) activeert, de hoofdregulator van cellulaire energiehomeostase. In tegenstelling tot indirecte activatoren zoals metformine, bindt O-304 direct aan de β1-subeenheid van AMPK.",
      "**Retatrutide** (LY3437943) is a novel synthetic peptide that functions as a triple agonist of three key metabolic receptors: glucagon-like peptide-1 (GLP-1), glucose-dependent insulinotropic polypeptide (GIP), and glucagon receptors. This unprecedented triple mechanism of action makes Retatrutide the most comprehensive incretin-based research tool currently available.": "**Retatrutide** (LY3437943) is een nieuw synthetisch peptide dat functioneert als een drievoudige agonist van drie belangrijke metabole receptoren: glucagon-like peptide-1 (GLP-1), glucose-dependent insulinotropic polypeptide (GIP) en glucagonreceptoren. Dit ongekende drievoudige werkingsmechanisme maakt Retatrutide het meest uitgebreide op incretine gebaseerde onderzoeksinstrument dat momenteel beschikbaar is.",
      "**Selank** (TP-7) is a synthetic heptapeptide developed in Russia as a modified analogue of tuftsin, a naturally occurring immunomodulatory peptide. Selank has been extensively studied for its anxiolytic, nootropic, and immunomodulatory properties.": "**Selank** (TP-7) is een synthetisch heptapeptide ontwikkeld in Rusland als een gemodificeerd analoog van tuftsine, een van nature voorkomend immunomodulerend peptide. Selank is uitgebreid bestudeerd om zijn anxiolytische, nootropische en immunomodulerende eigenschappen.",
      '**Semaglutide** is a synthetic analogue of human Glucagon-Like Peptide-1 (GLP-1), a hormone naturally produced in the intestines that plays a crucial role in glucose metabolism and appetite regulation. This research peptide has gained significant attention in scientific communities worldwide for its applications in metabolic research, particularly in studies related to type 2 diabetes and obesity. For comprehensive background information, see the [PubChem compound entry for Semaglutide](https://pubchem.ncbi.nlm.nih.gov/compound/Semaglutide){:target="_blank" rel="noopener"}.': '**Semaglutide** is een synthetisch analoog van menselijk Glucagon-Like Peptide-1 (GLP-1), een hormoon dat van nature in de darmen wordt aangemaakt en een cruciale rol speelt in het glucosemetabolisme en de regulering van de eetlust. Dit onderzoekspeptide heeft wereldwijd veel aandacht gekregen in wetenschappelijke gemeenschappen vanwege zijn toepassingen in metabool onderzoek, met name in studies met betrekking tot diabetes type 2 en obesitas. Voor uitgebreide achtergrondinformatie, zie de [PubChem-verbinding vermelding voor Semaglutide](https://pubchem.ncbi.nlm.nih.gov/compound/Semaglutide){:target="_blank" rel="noopener"}.',
      "**Semax** is a synthetic heptapeptide developed in Russia, based on the ACTH(4-10) fragment of adrenocorticotropic hormone. Unlike full ACTH, Semax lacks hormonal activity but retains potent nootropic and neuroprotective properties.": "**Semax** is een synthetisch heptapeptide ontwikkeld in Rusland, gebaseerd op het ACTH(4-10)-fragment van adrenocorticotroop hormoon. In tegenstelling tot volledig ACTH, mist Semax hormonale activiteit, maar behoudt het krachtige nootropische en neuroprotectieve eigenschappen.",
      "**TB-500** is a synthetic peptide representing the active region of Thymosin Beta-4 (Tβ4), a naturally occurring protein found in virtually all human and animal cells. Thymosin Beta-4 is a 43-amino acid protein that plays critical roles in cell migration, angiogenesis, and tissue repair.": "**TB-500** is een synthetisch peptide dat de actieve regio van Thymosin Beta-4 (Tβ4) vertegenwoordigt, een van nature voorkomend eiwit dat in vrijwel alle menselijke en dierlijke cellen wordt aangetroffen. Thymosin Beta-4 is een eiwit van 43 aminozuren dat een kritieke rol speelt bij celmigratie, angiogenese en weefselherstel.",
      "**Tesofensine** (NS2330) is a triple monoamine reuptake inhibitor that blocks the presynaptic reuptake of norepinephrine, dopamine, and serotonin. Originally developed for neurodegenerative disease research, tesofensine has become an important tool for studying the neurological basis of appetite regulation and energy homeostasis.": "**Tesofensine** (NS2330) is een drievoudige monoamineheropnameremmer die de presynaptische heropname van norepinefrine, dopamine en serotonine blokkeert. Oorspronkelijk ontwikkeld voor onderzoek naar neurodegeneratieve ziekten, is tesofensine een belangrijk hulpmiddel geworden voor het bestuderen van de neurologische basis van eetlustregulatie en energiehomeostase.",
      "**Tirzepatide** is a novel synthetic peptide that functions as a dual agonist of two key incretin hormone receptors: glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1). This unique dual mechanism of action distinguishes Tirzepatide from single-target GLP-1 receptor agonists like semaglutide, making it an invaluable tool for metabolic research.": "**Tirzepatide** is een nieuw synthetisch peptide dat functioneert als een dubbele agonist van twee belangrijke incretinehormoonreceptoren: glucose-dependent insulinotropic polypeptide (GIP) en glucagon-like peptide-1 (GLP-1). Dit unieke dubbele werkingsmechanisme onderscheidt Tirzepatide van GLP-1-receptoragonisten met één doelwit, zoals semaglutide, waardoor het een onschatbaar hulpmiddel is voor metabool onderzoek.",
      "1. Allow the peptide vial to reach room temperature": "1. Laat de peptideflacon op kamertemperatuur komen",
      "2. Clean both vial tops with an alcohol swab": "2. Reinig beide flacondoppen met een alcoholdoekje",
      "3. Using a sterile syringe, withdraw the desired amount of bacteriostatic water": "3. Trek met een steriele spuit de gewenste hoeveelheid bacteriostatisch water op",
      "4. Insert the needle into the peptide vial, aiming at the glass wall": "4. Steek de naald in de peptideflacon en richt op de glazen wand",
      "5-Amino-1MQ inhibits NNMT, affecting multiple metabolic pathways:": "5-Amino-1MQ remt NNMT, wat invloed heeft op meerdere metabole paden:",
      "5. Slowly inject the water, allowing it to run down the vial wall": "5. Injecteer het water langzaam, zodat het langs de wand van de flacon naar beneden loopt",
      "6. Gently swirl (do not shake) until fully dissolved": "6. Zwenk voorzichtig (niet schudden) totdat het volledig is opgelost",
      "7. Store reconstituted peptide at 2-8°C": "7. Bewaar het gereconstitueerde peptide bij 2-8°C",
      "A key research advantage is its selectivity:": "Een belangrijk onderzoeksvoordeel is de selectiviteit:",
      "AOD-9604 also inhibits fat accumulation:": "AOD-9604 remt ook vetophoping:",
      "AOD-9604's mechanism of action centres on its ability to stimulate lipolysis and inhibit lipogenesis in adipose tissue, mimicking a specific subset of growth hormone's metabolic effects.": "Het werkingsmechanisme van AOD-9604 richt zich op het vermogen om lipolyse te stimuleren en lipogenese te remmen in vetweefsel, waarbij een specifieke subset van de metabole effecten van groeihormoon wordt nagebootst.",
      "Amylin complements insulin's glucose-lowering effects through distinct mechanisms including gastric emptying delay, glucagon suppression, and central satiety signalling. Cagrilintide provides researchers with a stable, long-acting tool to investigate these pathways in extended experimental paradigms.": "Amylin vult de glucoseverlagende effecten van insuline aan via verschillende mechanismen, waaronder vertraging van de maaglediging, onderdrukking van glucagon en centrale verzadigingssignalen. Cagrilintide biedt onderzoekers een stabiel, langwerkend instrument om deze paden in uitgebreide experimentele paradigma's te onderzoeken.",
      "Anti-inflammatory properties are actively investigated:": "Ontstekingsremmende eigenschappen worden actief onderzocht:",
      "Bacteriostatic water (BAC water) is sterile water containing 0.9% benzyl alcohol, a bacteriostatic preservative that inhibits the growth of bacteria. This makes it ideal for reconstituting lyophilized (freeze-dried) peptides for research applications where multiple withdrawals from the same vial are needed.": "Bacteriostatisch water (BAC-water) is steriel water met 0,9% benzylalcohol, een bacteriostatisch conserveermiddel dat de groei van bacteriën remt. Dit maakt het ideaal voor het reconstitueren van gevriesdroogde (lyophilized) peptiden voor onderzoekstoepassingen waarbij meerdere extracties uit dezelfde flacon nodig zijn.",
      "Beyond sleep regulation, DSIP has demonstrated effects on stress response, pain perception, and neuroendocrine function, making it a versatile tool for neuroscience research.": "Naast slaapregulatie heeft DSIP effecten aangetoond op stressrespons, pijnperceptie en neuro-endocriene functie, waardoor het een veelzijdig instrument is voor neurowetenschappelijk onderzoek.",
      "Broader metabolic applications:": "Bredere metabole toepassingen:",
      "By isolating this fragment, researchers can study GH's fat metabolism effects independently of IGF-1 elevation, glucose effects, and tissue growth, providing a cleaner tool for adipose biology research.": "Door dit fragment te isoleren, kunnen onderzoekers de vetmetabolisme-effecten van GH bestuderen onafhankelijk van IGF-1-verhoging, glucose-effecten en weefselgroei, wat een schoner hulpmiddel biedt voor onderzoek naar de biologie van vetweefsel.",
      "Cagrilintide activates amylin receptors (AMY1, AMY2, AMY3), which are complexes of the calcitonin receptor with receptor activity-modifying proteins (RAMPs).": "Cagrilintide activeert amylinereceptoren (AMY1, AMY2, AMY3), wat complexen zijn van de calcitonine-receptor met receptoractiviteit-modificerende eiwitten (RAMP's).",
      "Cagrilintide is often studied with GLP-1 agonists:": "Cagrilintide wordt vaak bestudeerd met GLP-1-agonisten:",
      "Central effects include:": "Centrale effecten zijn onder meer:",
      "Core applications in diabetes studies include:": "Kerntoepassingen in diabetesstudies zijn onder meer:",
      "Dermatological applications extend beyond pigmentation:": "Dermatologische toepassingen reiken verder dan pigmentatie:",
      "Developed as a ghrelin receptor (GHS-R) agonist, ipamorelin represents one of the most selective GH releasing peptides (GHRPs) available for research. Its clean pharmacological profile enables researchers to study GH axis physiology without the confounding effects seen with less selective compounds.": "Ontwikkeld als een ghreline-receptor (GHS-R) agonist, vertegenwoordigt ipamoreline een van de meest selectieve GH-afgevende peptiden (GHRP's) die beschikbaar zijn voor onderzoek. Het schone farmacologische profiel stelt onderzoekers in staat om de fysiologie van de GH-as te bestuderen zonder de verstorende effecten die worden gezien bij minder selectieve verbindingen.",
      "Each 10ml vial can reconstitute 5-10 peptide vials depending on concentration requirements.": "Elke flacon van 10 ml kan 5-10 peptideflacons reconstitueren, afhankelijk van de concentratievereisten.",
      "Emerging areas of investigation include:": "Opkomende onderzoeksgebieden zijn onder meer:",
      "Emerging evidence suggests GLP-1 receptor agonists may have cardiovascular effects beyond glucose control, leading to research investigating:": "Opkomend bewijs suggereert dat GLP-1-receptoragonisten cardiovasculaire effecten kunnen hebben die verder gaan dan glucosecontrole, wat leidt tot onderzoek naar:",
      "Emerging research also explores Semaglutide's potential neuroprotective properties, with studies investigating its effects in models of Alzheimer's disease, Parkinson's disease, and stroke.": "Opkomend onderzoek verkent ook de mogelijke neuroprotectieve eigenschappen van semaglutide, met studies die de effecten ervan onderzoeken in modellen van de ziekte van Alzheimer, de ziekte van Parkinson en beroertes.",
      "Emerging research explores melanocortin anti-inflammatory properties:": "Opkomend onderzoek verkent de ontstekingsremmende eigenschappen van melanocortine:",
      "Extensive research has demonstrated Semax's effects on cognitive function, BDNF expression, and neuroprotection, making it a valuable tool for neuroscience research.": "Uitgebreid onderzoek heeft de effecten van Semax op cognitieve functie, BDNF-expressie en neuroprotectie aangetoond, waardoor het een waardevol hulpmiddel is voor neurowetenschappelijk onderzoek.",
      "GIP receptor engagement adds complementary effects:": "Betrokkenheid van de GIP-receptor voegt aanvullende effecten toe:",
      "GLP-1 receptor activation slows gastric emptying, which may contribute to prolonged satiety and reduced postprandial glucose excursions. Researchers studying gut-brain axis signalling find Semaglutide particularly useful for investigating these gastrointestinal regulatory mechanisms.": "Activering van de GLP-1-receptor vertraagt de maaglediging, wat kan bijdragen aan langdurige verzadiging en verminderde postprandiale glucose-excursies. Onderzoekers die de signaalroutes van de darm-hersen-as bestuderen, vinden Semaglutide bijzonder nuttig voor het onderzoeken van deze gastro-intestinale regulatiemechanismen.",
      "Glucagon's hepatic effects enable liver-focused studies:": "De hepatische effecten van glucagon maken levergericht onderzoek mogelijk:",
      "In pancreatic beta cells, GLP-1 receptor activation by Semaglutide triggers glucose-dependent insulin secretion through the cAMP-PKA signalling pathway. This glucose-dependent mechanism is particularly noteworthy in research, as it suggests reduced risk of hypoglycaemia compared to insulin secretagogues that work independently of glucose levels.": "In pancreatische bèta-cellen activeert GLP-1-receptoractivatie door Semaglutide glucoseafhankelijke insulinesecretie via de cAMP-PKA-signaleringsroute. Dit glucoseafhankelijke mechanisme is bijzonder opmerkelijk in onderzoek, omdat het een verminderd risico op hypoglykemie suggereert in vergelijking met insulinesecretagogen die onafhankelijk van glucoseniveaus werken.",
      "In pancreatic beta cells, Tirzepatide activates both GIP and GLP-1 receptors, leading to:": "In pancreatische bèta-cellen activeert Tirzepatide zowel GIP- als GLP-1-receptoren, wat leidt tot:",
      "Interest in NAD+ has surged due to its central role in ageing research, particularly its relationship with sirtuins and cellular repair mechanisms. NAD+ levels naturally decline with age, driving research into maintaining cellular NAD+ pools.": "De belangstelling voor NAD+ is toegenomen vanwege zijn centrale rol in verouderingsonderzoek, met name de relatie met sirtuïnes en cellulaire reparatiemechanismen. NAD+-niveaus nemen van nature af met de leeftijd, wat onderzoek stimuleert naar het behoud van cellulaire NAD+-pools.",
      "Ipamorelin activates growth hormone secretagogue receptors (GHS-R) in the anterior pituitary, triggering GH release through multiple mechanisms.": "Ipamoreline activeert groeihormoon secretagogue-receptoren (GHS-R) in de hypofysevoorkwab, wat GH-afgifte via meerdere mechanismen triggert.",
      "Ipamorelin's research value lies in its selectivity:": "De onderzoekswaarde van Ipamoreline ligt in zijn selectiviteit:",
      "Key substitutions provide enhanced stability:": "Belangrijke substituties zorgen voor verbeterde stabiliteit:",
      "Like GLP-1 agonists, Tirzepatide affects appetite regulation through central mechanisms. Research indicates effects on:": "Net als GLP-1-agonisten beïnvloedt Tirzepatide de eetlustregulatie via centrale mechanismen. Onderzoek wijst op effecten op:",
      "MC4R activation makes MT-2 valuable for metabolic studies:": "MC4R-activering maakt MT-2 waardevol voor metabole studies:",
      "MT-2 activates multiple melanocortin receptor subtypes:": "MT-2 activeert meerdere melanocortine-receptorsubtypes:",
      "MT-2's non-selective receptor profile enables diverse CNS research:": "Het niet-selectieve receptorprofiel van MT-2 maakt divers centraal zenuwstelselonderzoek mogelijk:",
      "Melanotan 2 exerts its biological effects through activation of melanocortin receptors, a family of G protein-coupled receptors that regulate diverse physiological processes. Understanding these mechanisms is central to ongoing research in dermatology, endocrinology, and neuroscience.": "Melanotan 2 oefent zijn biologische effecten uit door activering van melanocortinereceptoren, een familie van G-proteïnegekoppelde receptoren die diverse fysiologische processen reguleren. Het begrijpen van deze mechanismen staat centraal in lopend onderzoek in de dermatologie, endocrinologie en neurowetenschappen.",
      "Melanotan 2 is extensively used in dermatological research:": "Melanotan 2 wordt uitgebreid gebruikt in dermatologisch onderzoek:",
      "NNMT catalyses the N-methylation of nicotinamide (a NAD+ precursor) using SAM (S-adenosylmethionine) as a methyl donor. By inhibiting this enzyme, 5-Amino-1MQ enables researchers to investigate how NNMT modulation affects cellular metabolism, NAD+ availability, and metabolic health.": "NNMT katalyseert de N-methylatie van nicotinamide (een NAD+-voorloper) met behulp van SAM (S-adenosylmethionine) als methyldonor. Door dit enzym te remmen, stelt 5-Amino-1MQ onderzoekers in staat te onderzoeken hoe NNMT-modulatie cellulair metabolisme, NAD+-beschikbaarheid en metabole gezondheid beïnvloedt.",
      "Originally developed by Metabolic Pharmaceuticals in Australia, AOD-9604 represents one of the most targeted approaches to studying growth hormone's lipolytic activity. By using only the fat-reducing portion of the full hormone, researchers can investigate adipose tissue metabolism without confounding effects on IGF-1 or glucose homeostasis.": "Oorspronkelijk ontwikkeld door Metabolic Pharmaceuticals in Australië, vertegenwoordigt AOD-9604 een van de meest gerichte benaderingen voor het bestuderen van de lipolytische activiteit van groeihormoon. Door alleen het vetreducerende deel van het volledige hormoon te gebruiken, kunnen onderzoekers het metabolisme van vetweefsel onderzoeken zonder verstorende effecten op IGF-1 of glucosehomeostase.",
      "Our bacteriostatic water meets United States Pharmacopeia (USP) standards for:": "Ons bacteriostatisch water voldoet aan de normen van de United States Pharmacopeia (USP) voor:",
      "Our research-grade Semaglutide meets the highest quality standards required for reproducible scientific research:": "Onze Semaglutide van onderzoekskwaliteit voldoet aan de hoogste kwaliteitsnormen die vereist zijn voor reproduceerbaar wetenschappelijk onderzoek:",
      "Peptide Shop supplies **research-grade 5-Amino-1MQ** with guaranteed ≥99% purity, verified through comprehensive HPLC analysis.": "Peptide Shop levert **5-Amino-1MQ van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid, geverifieerd door uitgebreide HPLC-analyse.",
      "Peptide Shop supplies **research-grade AOD-9604** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis, ensuring researchers receive properly characterised material for their studies.": "Peptide Shop levert **AOD-9604 van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid, geverifieerd door uitgebreide HPLC- en massaspectrometrie-analyse. Elke bestelling bevat een gedetailleerd analysecertificaat, zodat onderzoekers goed gekarakteriseerd materiaal ontvangen voor hun studies.",
      "Peptide Shop supplies **research-grade BPC-157** with guaranteed ≥99% purity and full analytical documentation.": "Peptide Shop levert **BPC-157 van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid en volledige analytische documentatie.",
      "Peptide Shop supplies **research-grade CJC-1295 No DAC** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis.": "Peptide Shop levert **CJC-1295 No DAC van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid, geverifieerd door uitgebreide HPLC- en massaspectrometrie-analyse.",
      "Peptide Shop supplies **research-grade Cagrilintide** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis.": "Peptide Shop levert **Cagrilintide van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid, geverifieerd door uitgebreide HPLC- en massaspectrometrie-analyse.",
      "Peptide Shop supplies **research-grade DSIP** with guaranteed ≥99% purity.": "Peptide Shop levert **DSIP van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid.",
      "Peptide Shop supplies **research-grade Epitalon** with guaranteed ≥99% purity.": "Peptide Shop levert **Epitalon van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid.",
      "Peptide Shop supplies **research-grade GHK-Cu** with guaranteed ≥99% purity.": "Peptide Shop levert **GHK-Cu van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid.",
      "Peptide Shop supplies **research-grade GHRP-2** with guaranteed ≥99% purity.": "Peptide Shop levert **GHRP-2 van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid.",
      "Peptide Shop supplies **research-grade GHRP-6** with guaranteed ≥99% purity.": "Peptide Shop levert **GHRP-6 van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid.",
      "Peptide Shop supplies **research-grade HGH Fragment 176-191** with guaranteed ≥99% purity.": "Peptide Shop levert **HGH Fragment 176-191 van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid.",
      "Peptide Shop supplies **research-grade Ipamorelin** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis.": "Peptide Shop levert **Ipamoreline van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid, geverifieerd door uitgebreide HPLC- en massaspectrometrie-analyse.",
      "Peptide Shop supplies **research-grade Melanotan 2** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis, ensuring researchers receive properly characterised material for their studies.": "Peptide Shop levert **Melanotan 2 van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid, geverifieerd door uitgebreide HPLC- en massaspectrometrie-analyse. Elke bestelling bevat een gedetailleerd analysecertificaat, zodat onderzoekers goed gekarakteriseerd materiaal ontvangen voor hun studies.",
      "Peptide Shop supplies **research-grade NAD+** with guaranteed ≥99% purity.": "Peptide Shop levert **NAD+ van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid.",
      "Peptide Shop supplies **research-grade O-304** with guaranteed ≥99% purity.": "Peptide Shop levert **O-304 van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid.",
      "Peptide Shop supplies **research-grade Retatrutide** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis, ensuring researchers receive properly characterised material for their studies.": "Peptide Shop levert **Retatrutide van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid, geverifieerd door uitgebreide HPLC- en massaspectrometrie-analyse. Elke bestelling bevat een gedetailleerd analysecertificaat, zodat onderzoekers goed gekarakteriseerd materiaal ontvangen voor hun studies.",
      "Peptide Shop supplies **research-grade Selank** with guaranteed ≥99% purity.": "Peptide Shop levert **Selank van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid.",
      "Peptide Shop supplies **research-grade Semaglutide** with guaranteed ≥99% purity, verified by HPLC analysis and mass spectrometry. Every order includes a comprehensive Certificate of Analysis (COA), ensuring researchers receive properly characterised material for their studies.": "Peptide Shop levert **Semaglutide van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid, geverifieerd door HPLC-analyse en massaspectrometrie. Elke bestelling bevat een uitgebreid analysecertificaat (COA), zodat onderzoekers goed gekarakteriseerd materiaal ontvangen voor hun studies.",
      "Peptide Shop supplies **research-grade Semax** with guaranteed ≥99% purity.": "Peptide Shop levert **Semax van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid.",
      "Peptide Shop supplies **research-grade TB-500** with guaranteed ≥99% purity.": "Peptide Shop levert **TB-500 van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid.",
      "Peptide Shop supplies **research-grade Tesofensine** with guaranteed ≥99% purity, verified through comprehensive HPLC analysis.": "Peptide Shop levert **Tesofensine van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid, geverifieerd door uitgebreide HPLC-analyse.",
      "Peptide Shop supplies **research-grade Tirzepatide** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis to ensure researchers receive properly characterised material for their studies.": "Peptide Shop levert **Tirzepatide van onderzoekskwaliteit** met gegarandeerde ≥99% zuiverheid, geverifieerd door uitgebreide HPLC- en massaspectrometrie-analyse. Elke bestelling bevat een gedetailleerd analysecertificaat om ervoor te zorgen dat onderzoekers goed gekarakteriseerd materiaal ontvangen voor hun studies.",
      "Peripheral actions include:": "Perifere acties omvatten:",
      "Primary research applications include:": "Primaire onderzoekstoepassingen zijn onder andere:",
      "Research has demonstrated that Semaglutide may also promote beta-cell proliferation and reduce apoptosis in preclinical models, suggesting potential applications in studying beta-cell preservation strategies.": "Onderzoek heeft aangetoond dat Semaglutide ook bèta-celproliferatie kan bevorderen en apoptose kan verminderen in preklinische modellen, wat mogelijke toepassingen suggereert voor het bestuderen van bèta-celbehoudstrategieën.",
      "Research interest in GHK-Cu stems from its remarkable effects on tissue regeneration, wound healing, and gene expression modulation. Studies suggest it influences over 4,000 genes related to tissue repair and regeneration.": "Onderzoeksinteresse in GHK-Cu komt voort uit de opmerkelijke effecten op weefselregeneratie, wondgenezing en modulatie van genexpressie. Studies suggereren dat het meer dan 4.000 genen beïnvloedt die verband houden met weefselherstel en regeneratie.",
      "Research interest in O-304 stems from its potential applications in metabolic disease, diabetes, and obesity research, where AMPK activation can improve glucose uptake and lipid oxidation.": "Onderzoeksinteresse in O-304 komt voort uit de mogelijke toepassingen in onderzoek naar metabole ziekten, diabetes en obesitas, waar AMPK-activering de opname van glucose en vetoxidatie kan verbeteren.",
      "Research into melanocortin effects on sexual behaviour:": "Onderzoek naar melanocortine-effecten op seksueel gedrag:",
      "Research often combines ipamorelin with GHRH analogs:": "Onderzoek combineert Ipamoreline vaak met GHRH-analogen:",
      "Researchers often compare these related peptides:": "Onderzoekers vergelijken deze verwante peptiden vaak:",
      "Retatrutide enables essential comparative studies:": "Retatrutide maakt essentiële vergelijkende studies mogelijk:",
      "Retatrutide's triple agonism creates a unique pharmacological profile by simultaneously engaging three complementary receptor systems, each contributing distinct metabolic effects.": "Het drievoudige agonisme van Retatrutide creëert een uniek farmacologisch profiel door gelijktijdig drie complementaire receptorsystemen te activeren, die elk bijdragen aan verschillende metabole effecten.",
      "Semaglutide crosses the blood-brain barrier and activates GLP-1 receptors in key hypothalamic regions involved in appetite regulation, including the arcuate nucleus and paraventricular nucleus. Research indicates that this central action contributes to reduced food intake and altered food preferences in animal models.": "Semaglutide passeert de bloed-hersenbarrière en activeert GLP-1-receptoren in belangrijke hypothalame regio's die betrokken zijn bij eetlustregulatie, waaronder de nucleus arcuatus en de nucleus paraventricularis. Onderzoek wijst uit dat deze centrale werking bijdraagt aan verminderde voedselinname en veranderde voedselvoorkeuren in diermodellen.",
      "Semaglutide exerts its biological effects through high-affinity binding to the GLP-1 receptor (GLP-1R), a G protein-coupled receptor expressed in various tissues including pancreatic beta cells, the central nervous system, heart, and gastrointestinal tract. Upon receptor binding, Semaglutide initiates several downstream signalling cascades that researchers continue to investigate.": "Semaglutide oefent zijn biologische effecten uit door binding met hoge affiniteit aan de GLP-1-receptor (GLP-1R), een G-proteïnegekoppelde receptor die tot expressie komt in verschillende weefsels, waaronder pancreatische bèta-cellen, het centrale zenuwstelsel, het hart en het maag-darmkanaal. Na receptorbinding initieert Semaglutide verschillende downstream signaalcascades die onderzoekers blijven onderzoeken.",
      "Semaglutide is extensively used in metabolic research laboratories studying:": "Semaglutide wordt veelvuldig gebruikt in laboratoria voor metabolisch onderzoek die het volgende bestuderen:",
      "TB-500 contains the key sequence responsible for Tβ4's biological activity, particularly the actin-binding domain that promotes cell motility and tissue regeneration. This makes it invaluable for research into wound healing, muscle repair, and inflammatory conditions.": "TB-500 bevat de sleutelsequentie die verantwoordelijk is voor de biologische activiteit van Tβ4, met name het actine-bindende domein dat celmotiliteit en weefselregeneratie bevordert. Dit maakt het van onschatbare waarde voor onderzoek naar wondgenezing, spierherstel en inflammatoire aandoeningen.",
      "Tesofensine increases synaptic concentrations of three key neurotransmitters:": "Tesofensine verhoogt de synaptische concentraties van drie belangrijke neurotransmitters:",
      "The GIP receptor component may provide unique effects on adipose tissue:": "De GIP-receptorcomponent kan unieke effecten hebben op vetweefsel:",
      "The GIP receptor is predominantly expressed in pancreatic beta cells and adipose tissue, while GLP-1 receptors are found in pancreatic islets, brain, heart, and gastrointestinal tract. By activating both receptor systems simultaneously, Tirzepatide provides researchers with a unique tool for studying:": "De GIP-receptor komt voornamelijk tot expressie in pancreatische bèta-cellen en vetweefsel, terwijl GLP-1-receptoren worden aangetroffen in pancreaseilandjes, hersenen, hart en maag-darmkanaal. Door beide receptorsystemen gelijktijdig te activeren, biedt Tirzepatide onderzoekers een uniek hulpmiddel voor het bestuderen van:",
      "The GLP-1 component provides established incretin effects:": "De GLP-1-component biedt gevestigde incretine-effecten:",
      "The dual agonist is valuable for investigating:": "De dubbele agonist is waardevol voor het onderzoeken van:",
      "The molecular structure of Semaglutide features a unique C-18 fatty diacid chain attached to the lysine residue at position 26. This structural modification enables the peptide to bind to serum albumin, dramatically extending its biological half-life to approximately seven days. This prolonged activity profile makes Semaglutide an invaluable tool for researchers studying sustained GLP-1 receptor activation mechanisms.": "De moleculaire structuur van Semaglutide bevat een unieke C-18 vetzuurdiacide keten die vastzit aan het lysineresidu op positie 26. Deze structurele modificatie stelt het peptide in staat om aan serumalbumine te binden, waardoor de biologische halfwaardetijd drastisch wordt verlengd tot ongeveer zeven dagen. Dit langdurige activiteitsprofiel maakt Semaglutide een onschatbaar hulpmiddel voor onderzoekers die mechanismen van langdurige GLP-1-receptoractivatie bestuderen.",
      "The peptide binds to GHRH receptors on pituitary somatotropes:": "Het peptide bindt aan GHRH-receptoren op hypofysaire somatotropen:",
      "The peptide enables focused weight studies:": "Het peptide maakt gerichte gewichtsstudies mogelijk:",
      "The peptide promotes fat breakdown through:": "Het peptide bevordert vetafbraak door:",
      "The peptide represents the first 29 amino acids of GHRH with modifications at positions 2, 8, 15, and 27 to improve resistance to enzymatic degradation. These modifications make it a more practical research tool while maintaining GHRH receptor binding activity.": "Het peptide vertegenwoordigt de eerste 29 aminozuren van GHRH met modificaties op posities 2, 8, 15 en 27 om de weerstand tegen enzymatische afbraak te verbeteren. Deze modificaties maken het een praktischer onderzoeksinstrument, terwijl de GHRH-receptorbindingsactiviteit behouden blijft.",
      "The peptide represents the next evolution beyond dual agonists like tirzepatide, adding glucagon receptor activation to the established GLP-1/GIP dual agonism. This triple receptor engagement enables researchers to study the complex interplay between these metabolic signalling systems and their combined effects on glucose homeostasis, energy expenditure, and body weight regulation.": "Het peptide vertegenwoordigt de volgende evolutie na dubbele agonisten zoals tirzepatide en voegt glucagonreceptoractivatie toe aan het gevestigde GLP-1/GIP dubbele agonisme. Deze drievoudige receptorbetrokkenheid stelt onderzoekers in staat om de complexe wisselwerking tussen deze metabole signaleringssystemen en hun gecombineerde effecten op glucosehomeostase, energieverbruik en lichaamsgewichtregulatie te bestuderen.",
      "The peptide's cyclic lactam structure provides enhanced stability and receptor binding affinity compared to linear α-MSH analogues. Melanotan 2 acts as a non-selective agonist at melanocortin receptors MC1, MC3, MC4, and MC5, enabling researchers to study diverse physiological processes beyond pigmentation.": "De cyclische lactamstructuur van het peptide zorgt voor verbeterde stabiliteit en receptorbindingsaffiniteit in vergelijking met lineaire α-MSH-analogen. Melanotan 2 werkt als een niet-selectieve agonist op melanocortinereceptoren MC1, MC3, MC4 en MC5, waardoor onderzoekers diverse fysiologische processen buiten pigmentatie kunnen bestuderen.",
      "The peptide's effects on body weight have made it crucial for obesity research, including studies on:": "De effecten van het peptide op lichaamsgewicht hebben het cruciaal gemaakt voor obesitasonderzoek, inclusief studies naar:",
      "The peptide's improved selectivity profile makes it valuable for studying GH secretion mechanisms without confounding orexigenic effects.": "Het verbeterde selectiviteitsprofiel van het peptide maakt het waardevol voor het bestuderen van GH-secretiemechanismen zonder verstorende orexigene effecten.",
      "The peptide's name reflects its origin—a body protection compound identified for its remarkable cytoprotective and regenerative properties across multiple tissue types including tendons, ligaments, muscles, and gastrointestinal epithelium.": "De naam van het peptide weerspiegelt zijn oorsprong—een lichaamsbeschermende verbinding die is geïdentificeerd vanwege zijn opmerkelijke cytoprotectieve en regeneratieve eigenschappen in meerdere weefseltypen, waaronder pezen, ligamenten, spieren en gastro-intestinaal epitheel.",
      "The peptide's primary interest lies in its reported ability to activate telomerase, potentially influencing cellular lifespan and age-related changes.": "De primaire interesse van het peptide ligt in zijn vermogen om telomerase te activeren, wat mogelijk de cellulaire levensduur en leeftijdsgerelateerde veranderingen beïnvloedt.",
      "The peptide's structure incorporates a modified GIP sequence with carefully engineered amino acid substitutions and a C20 fatty diacid side chain attached to lysine. This modification enables binding to serum albumin, extending the biological half-life to approximately five days and allowing researchers to study sustained dual receptor activation.": "De structuur van het peptide bevat een gemodificeerde GIP-sequentie met zorgvuldig ontworpen aminozuursubstituties en een C20-vetzuurdiacide zijketen die aan lysine is bevestigd. Deze modificatie maakt binding aan serumalbumine mogelijk, waardoor de biologische halfwaardetijd wordt verlengd tot ongeveer vijf dagen en onderzoekers in staat worden gesteld om langdurige dubbele receptoractivatie te bestuderen.",
      "The presence of GLP-1 receptors in the brain has sparked significant neuroscience research using Semaglutide:": "De aanwezigheid van GLP-1-receptoren in de hersenen heeft geleid tot aanzienlijk neurowetenschappelijk onderzoek met Semaglutide:",
      "The primary research application involves studying skin pigmentation:": "De primaire onderzoekstoepassing betreft het bestuderen van huidpigmentatie:",
      "The thermogenic component opens unique research directions:": "De thermogene component opent unieke onderzoeksrichtingen:",
      "The triple agonist provides comprehensive weight research tools:": "De drievoudige agonist biedt uitgebreide tools voor gewichtsonderzoek:",
      "The triple combination creates unique research opportunities:": "De drievoudige combinatie creëert unieke onderzoeksmogelijkheden:",
      "The unique glucagon component provides:": "De unieke glucagoncomponent biedt:",
      "Tirzepatide enables crucial comparative studies between:": "Tirzepatide maakt cruciale vergelijkende studies mogelijk tussen:",
      "Tirzepatide exerts its biological effects through simultaneous activation of GIP and GLP-1 receptors, both of which are G protein-coupled receptors expressed in various metabolically active tissues. This dual agonism creates synergistic signalling effects that researchers continue to characterise.": "Tirzepatide oefent zijn biologische effecten uit door gelijktijdige activering van GIP- en GLP-1-receptoren, die beide G-proteïnegekoppelde receptoren zijn die in verschillende metabolisch actieve weefsels tot expressie komen. Dit dubbele agonisme creëert synergetische signaleringseffecten die onderzoekers blijven karakteriseren.",
      "Tirzepatide's superior weight outcomes in preclinical models make it essential for:": "De superieure gewichtsresultaten van Tirzepatide in preklinische modellen maken het essentieel voor:",
      "Unlike benzodiazepines, Selank does not produce sedation or dependence, making it a valuable tool for researching anxiety mechanisms and novel therapeutic approaches.": "In tegenstelling tot benzodiazepinen veroorzaakt Selank geen sedatie of afhankelijkheid, waardoor het een waardevol hulpmiddel is voor het onderzoeken van angstmechanismen en nieuwe therapeutische benaderingen.",
      "Unlike more selective peptides such as ipamorelin, GHRP-6 also stimulates appetite and affects cortisol and prolactin levels, making it useful for studying the full spectrum of ghrelin receptor effects.": "In tegenstelling tot meer selectieve peptiden zoals ipamoreline, stimuleert GHRP-6 ook de eetlust en beïnvloedt het cortisol- en prolactinespiegels, waardoor het nuttig is voor het bestuderen van het volledige spectrum van ghrelinereceptoreffecten.",
      "Unlike single-target compounds, tesofensine's triple mechanism enables researchers to investigate the complex interplay between monoaminergic systems in controlling food intake and metabolic rate. This makes it valuable for understanding the neuropharmacology of obesity and appetite disorders.": "In tegenstelling tot verbindingen met één doelwit, stelt het drievoudige mechanisme van tesofensine onderzoekers in staat om de complexe wisselwerking tussen monoaminerge systemen bij de controle van voedselinname en metabolische snelheid te onderzoeken. Dit maakt het waardevol voor het begrijpen van de neurofarmacologie van obesitas en eetluststoornissen.",
      "Unlike single-use sterile water, bacteriostatic water allows multiple withdrawals over several weeks without contamination risk, making it cost-effective for research laboratories.": "In tegenstelling tot steriel water voor eenmalig gebruik, maakt bacteriostatisch water meerdere afnames gedurende meerdere weken mogelijk zonder besmettingsrisico, waardoor het kosteneffectief is voor onderzoekslaboratoria.",
      "Without DAC, the peptide produces:": "Zonder DAC produceert het peptide:"
    },
    de: {
      // Common phrases - German SEO optimized
      "What is": "Was ist",
      "How does": "Wie funktioniert",
      "Benefits of": "Vorteile von",
      "Research Applications": "Forschungsanwendungen",
      "Storage Instructions": "Lagerungshinweise",
      "Reconstitution Guide": "Rekonstitutionsanleitung",
      "Dosage Information": "Dosierungsinformation",
      "Key Benefits": "Wichtigste Vorteile",
      "Why Choose": "Warum Wählen",
      "Product Overview": "Produktübersicht",
      "Scientific Background": "Wissenschaftlicher Hintergrund",
      "Quality Assurance": "Qualitätssicherung",
      "Shipping Information": "Versandinformationen",
      "Related Products": "Verwandte Produkte",
      // German SEO keywords
      "Buy": "Kaufen",
      "purchase": "kaufen",
      "order": "bestellen",
      "online": "online",
      "high quality": "hohe Qualität",
      "research grade": "Forschungsqualität",
      "laboratory": "Labor",
      "peptide": "Peptid",
      "peptides": "Peptide",
      "purity": "Reinheit",
      "verified": "verifiziert",
      "certified": "zertifiziert",
      "fast delivery": "schnelle Lieferung",
      "fast shipping": "schneller Versand",
      "UK delivery": "Lieferung nach Deutschland",
      "Europe": "Europa",
      "European": "Europäisch",
      // Research terms
      "research purposes": "Forschungszwecke",
      "scientific research": "wissenschaftliche Forschung",
      "in vitro": "in vitro",
      "clinical studies": "klinische Studien",
      "laboratory use": "Laborverwendung",
      // Product attributes
      "lyophilized powder": "lyophilisiertes Pulver",
      "sterile": "steril",
      "injectable": "injizierbar",
      "subcutaneous": "subkutan",
      "intramuscular": "intramuskulär",
      // Actions
      "Store": "Lagern",
      "Keep": "Aufbewahren",
      "Reconstitute": "Rekonstituieren",
      "Mix": "Mischen",
      "Inject": "Injizieren",
      "refrigerated": "gekühlt",
      "frozen": "gefroren",
      "room temperature": "Raumtemperatur",
      // Technical/Scientific terms - German
      "synthetic": "synthetisch",
      "amino acids": "Aminosäuren",
      "amino acid": "Aminosäure",
      "derived from": "abgeleitet von",
      "protein": "Protein",
      "gastric juice": "Magensaft",
      "discovery": "Entdeckung",
      "extensively studied": "umfangreich erforscht",
      "tissue healing": "Gewebeheilung",
      "tissue repair": "Gewebereparatur",
      "regeneration": "Regeneration",
      "cytoprotective": "zytoprotektiv",
      "regenerative properties": "regenerative Eigenschaften",
      "multiple tissue types": "mehrere Gewebetypen",
      "including": "einschließlich",
      "tendons": "Sehnen",
      "ligaments": "Bänder",
      "muscles": "Muskeln",
      "gastrointestinal epithelium": "Magen-Darm-Epithel",
      // How it works - German
      "How Does": "Wie Wirkt",
      "Growth Factor Modulation": "Wachstumsfaktor-Modulation",
      "VEGF upregulation": "VEGF-Hochregulierung",
      "Enhanced angiogenesis": "Verbesserte Angiogenese",
      "GH receptor effects": "GH-Rezeptor-Effekte",
      "Growth hormone pathway": "Wachstumshormon-Signalweg",
      "EGF modulation": "EGF-Modulation",
      "Epithelial growth support": "Epitheliale Wachstumsunterstützung",
      "NGF interaction": "NGF-Interaktion",
      "Nerve growth effects": "Nervenwachstumseffekte",
      "Nitric Oxide System": "Stickstoffmonoxid-System",
      "NO pathway activation": "NO-Signalweg-Aktivierung",
      "Vasodilation effects": "Vasodilatationseffekte",
      "Endothelial function": "Endothelfunktion",
      "Vascular health": "Gefäßgesundheit",
      "Blood flow enhancement": "Blutflussverbesserung",
      "Tissue perfusion": "Gewebeperfusion",
      "Cytoprotective Actions": "Zytoprotektive Wirkungen",
      "Gastric protection": "Magenschutz",
      "Original discovery context": "Ursprünglicher Entdeckungskontext",
      "Mucosal healing": "Schleimhautheilung",
      "GI epithelium repair": "GI-Epithel-Reparatur",
      "Anti-inflammatory": "Entzündungshemmend",
      "Reduced damage markers": "Reduzierte Schadensmarker",
      // Research Applications - German
      "Musculoskeletal Healing": "Muskuloskelettale Heilung",
      "Tendon repair": "Sehnenreparatur",
      "rotator cuff models": "Rotatorenmanschetten-Modelle",
      "Ligament healing": "Bänderheilung",
      "ACL research": "VKB-Forschung",
      "Muscle regeneration": "Muskelregeneration",
      "Injury recovery": "Verletzungserholung",
      "Gastrointestinal Research": "Gastrointestinale Forschung",
      "Ulcer healing": "Geschwürheilung",
      "Gastric cytoprotection": "Magenzytoprotection",
      "IBD models": "CED-Modelle",
      "Inflammatory bowel research": "Entzündliche Darmforschung",
      "Mucosal barrier": "Schleimhautbarriere",
      "Gut integrity": "Darmintegrität",
      "Wound Healing": "Wundheilung",
      "Skin repair": "Hautreparatur",
      "Dermal regeneration": "Dermale Regeneration",
      "Angiogenesis": "Angiogenese",
      "Blood vessel formation": "Blutgefäßbildung",
      "Fibroblast activity": "Fibroblastenaktivität",
      "Collagen production": "Kollagenproduktion",
      // Table/spec terms - German
      "Condition": "Zustand",
      "Temperature": "Temperatur",
      "Duration": "Dauer",
      "Lyophilised": "Lyophilisiert",
      "Reconstituted": "Rekonstituiert",
      "up to": "bis zu",
      "months": "Monate",
      "weeks": "Wochen",
      "Size": "Größe",
      "Price": "Preis",
      "From": "Ab",
      "Minimum order": "Mindestbestellung",
      "discount on orders over": "Rabatt auf Bestellungen über",
      // Features/Benefits - German
      "Guaranteed": "Garantiert",
      "Full documentation": "Vollständige Dokumentation",
      "COA with every order": "COA bei jeder Bestellung",
      "UK laboratory tested": "Im Labor getestet",
      "Quality assured": "Qualität gesichert",
      "Express shipping available": "Expressversand verfügbar",
      "Research support": "Forschungsunterstützung",
      "Technical assistance": "Technische Unterstützung",
      "Why Choose Peptide Shop": "Warum Peptide Shop Wählen",
      "Peptide Shop supplies": "Peptide Shop liefert",
      // Product page section headings
      "Specification": "Spezifikation",
      "Detail": "Detail",
      "Reconstitution and Handling": "Rekonstitution und Handhabung",
      "Reconstitution Protocol": "Rekonstitutionsprotokoll",
      "Storage Recommendations": "Lagerungsempfehlungen",
      "For laboratory research only": "Nur für Laborforschung",
      "Not intended for human or veterinary use": "Nicht für den menschlichen oder tierärztlichen Gebrauch bestimmt",
      "Researchers should follow all applicable regulations": "Forscher sollten alle geltenden Vorschriften befolgen",
      "Research Use Statement": "Forschungsverwendungshinweis",
      "Ordering Information": "Bestellinformationen",
      "Allow vial to reach room temperature": "Ampulle auf Raumtemperatur bringen",
      "Add bacteriostatic water slowly": "Bakteriostatisches Wasser langsam hinzufügen",
      "Gently swirl": "Sanft schwenken",
      "do not shake": "nicht schütteln",
      "Solution should be clear": "Lösung sollte klar sein",
      "Specifications": "Spezifikationen",
      "CAS Number": "CAS-Nummer",
      "Molecular Formula": "Molekülformel",
      "Molecular Weight": "Molekulargewicht",
      "Sequence": "Sequenz",
      "Appearance": "Erscheinung",
      "White lyophilised powder": "Weißes lyophilisiertes Pulver",
      "HPLC verified": "HPLC-verifiziert",
      // Bacteriostatic Water & Supplies - German
      "Bacteriostatic Water": "Bacteriostatic water",
      "bacteriostatic water": "Bacteriostatic water",
      "BAC water": "BAC-Wasser",
      "Sterile Water": "Steriles Wasser",
      "sterile water": "steriles Wasser",
      "Peptide Reconstitution": "Peptid-Rekonstitution",
      "peptide reconstitution": "Peptid-Rekonstitution",
      "for Peptide Research": "für Peptidforschung",
      "What is Bacteriostatic Water": "Was ist Bacteriostatic water",
      "benzyl alcohol": "Benzylalkohol",
      "bacteriostatic preservative": "bakteriostatisches Konservierungsmittel",
      "inhibits the growth of bacteria": "hemmt das Wachstum von Bakterien",
      "inhibits bacterial growth": "hemmt das Bakterienwachstum",
      "reconstituting lyophilized": "Rekonstituierung von lyophilisierten",
      "freeze-dried": "gefriergetrockneten",
      "lyophilized": "lyophilisierten",
      "for research applications": "für Forschungsanwendungen",
      "multiple withdrawals": "mehrfache Entnahmen",
      "from the same vial": "aus derselben Ampulle",
      "are needed": "benötigt werden",
      "Key Features": "Hauptmerkmale",
      "USP Grade Quality": "USP-Qualität",
      "USP Grade": "USP-Qualität",
      "USP grade": "USP-Qualität",
      "Our bacteriostatic water meets": "Unser bakteriostatisches Wasser erfüllt",
      "United States Pharmacopeia": "United States Pharmacopeia",
      "USP standards": "USP-Standards",
      "standards for": "Standards für",
      "Sterility": "Sterilität",
      "Purity": "Reinheit",
      "concentration": "Konzentration",
      "Endotoxin levels": "Endotoxinwerte",
      "endotoxin levels": "Endotoxinwerte",
      "Multi-Use Design": "Mehrfachverwendungs-Design",
      "Unlike single-use": "Im Gegensatz zu Einweg",
      "single-use sterile water": "Einweg-sterilem Wasser",
      "single-use": "Einweg",
      "allows multiple withdrawals": "ermöglicht mehrfache Entnahmen",
      "over several weeks": "über mehrere Wochen",
      "several weeks": "mehrere Wochen",
      "without contamination risk": "ohne Kontaminationsrisiko",
      "contamination risk": "Kontaminationsrisiko",
      "cost-effective": "kosteneffektiv",
      "for research laboratories": "für Forschungslaboratorien",
      "research laboratories": "Forschungslaboratorien",
      "Convenient": "Praktische",
      "convenient": "praktische",
      "Each": "Jede",
      "each": "jede",
      "vial can": "Ampulle kann",
      "can reconstitute": "kann rekonstituieren",
      "peptide vials": "Peptid-Ampullen",
      "depending on concentration requirements": "abhängig von Konzentrationsanforderungen",
      "How to Use": "Wie man verwendet",
      "How to use": "Wie man verwendet",
      "Reconstitution Steps": "Rekonstitutionsschritte",
      "Allow the peptide vial": "Lassen Sie die Peptid-Ampulle",
      "to reach room temperature": "Raumtemperatur erreichen",
      "Clean both vial tops": "Reinigen Sie beide Ampullendeckel",
      "with an alcohol swab": "mit einem Alkoholtupfer",
      "alcohol swab": "Alkoholtupfer",
      "Using a sterile syringe": "Mit einer sterilen Spritze",
      "sterile syringe": "sterile Spritze",
      "withdraw the desired amount": "die gewünschte Menge entnehmen",
      "desired amount": "gewünschte Menge",
      "Insert the needle": "Führen Sie die Nadel ein",
      "into the peptide vial": "in die Peptid-Ampulle",
      "aiming at the glass wall": "auf die Glaswand zielend",
      "glass wall": "Glaswand",
      "Slowly inject": "Langsam injizieren",
      "allowing it to run down": "lassen Sie es herunterlaufen",
      "run down the vial wall": "an der Ampullenwand herunterlaufen",
      "vial wall": "Ampullenwand",
      "until fully dissolved": "bis vollständig aufgelöst",
      "fully dissolved": "vollständig aufgelöst",
      "Store reconstituted peptide": "Rekonstituiertes Peptid lagern",
      "reconstituted peptide": "rekonstituiertes Peptid",
      "Recommended Volumes": "Empfohlene Volumina",
      "Peptide Amount": "Peptidmenge",
      "Suggested": "Empfohlen",
      "suggested": "empfohlen",
      "Concentration": "Konzentration",
      "Storage": "Lagerung",
      "Unopened": "Ungeöffnet",
      "unopened": "ungeöffnet",
      "away from direct light": "vor direktem Licht geschützt",
      "direct light": "direktes Licht",
      "Opened": "Geöffnet",
      "opened": "geöffnet",
      "Use within": "Innerhalb von verwenden",
      "use within": "innerhalb von verwenden",
      "days": "Tagen",
      "Do not freeze": "Nicht einfrieren",
      "do not freeze": "nicht einfrieren",
      "Freezing may compromise sterility": "Einfrieren kann die Sterilität beeinträchtigen",
      "may compromise sterility": "kann die Sterilität beeinträchtigen",
      "Shelf life": "Haltbarkeit",
      "shelf life": "Haltbarkeit",
      "years from manufacture date": "Jahre ab Herstellungsdatum",
      "manufacture date": "Herstellungsdatum",
      "Applications in Research": "Anwendungen in der Forschung",
      "is essential for": "ist unerlässlich für",
      "essential for": "unerlässlich für",
      "for in vitro studies": "für In-vitro-Studien",
      "in vitro studies": "In-vitro-Studien",
      "Preparation of stock solutions": "Vorbereitung von Stammlösungen",
      "stock solutions": "Stammlösungen",
      "Multi-day research protocols": "Mehrtägige Forschungsprotokolle",
      "research protocols": "Forschungsprotokolle",
      "requiring repeat sampling": "die wiederholte Probenahme erfordern",
      "repeat sampling": "wiederholte Probenahme",
      "sterility must be maintained": "Sterilität muss aufrechterhalten werden",
      "maintained over time": "über die Zeit aufrechterhalten",
      "over time": "über die Zeit",
      "Comparison": "Vergleich",
      "comparison": "Vergleich",
      "Feature": "Merkmal",
      "feature": "Merkmal",
      "Preservative": "Konservierungsmittel",
      "preservative": "Konservierungsmittel",
      "Multiple Uses": "Mehrfache Verwendung",
      "multiple uses": "mehrfache Verwendung",
      "Single use only": "Nur Einmalverwendung",
      "single use only": "nur Einmalverwendung",
      "Bacterial Growth": "Bakterienwachstum",
      "bacterial growth": "Bakterienwachstum",
      "Inhibited": "Gehemmt",
      "inhibited": "gehemmt",
      "Possible after opening": "Nach dem Öffnen möglich",
      "after opening": "nach dem Öffnen",
      "Best For": "Am besten für",
      "best for": "am besten für",
      "Multi-dose peptides": "Mehrfachdosis-Peptide",
      "multi-dose": "Mehrfachdosis",
      "Single-dose applications": "Einmaldosis-Anwendungen",
      "single-dose": "Einmaldosis",
      "Every batch": "Jede Charge",
      "every batch": "jede Charge",
      "undergoes testing": "wird getestet",
      "testing for": "Prüfung auf",
      "Tested per": "Getestet gemäß",
      "tested per": "getestet gemäß",
      "Particulate Matter": "Partikelgehalt",
      "particulate matter": "Partikelgehalt",
      "Content": "Gehalt",
      "content": "Gehalt",
      "Verified at": "Verifiziert bei",
      "verified at": "verifiziert bei",
      "Popular": "Beliebt",
      "popular": "beliebt",
      "healing peptide": "Heilungspeptid",
      "Recovery peptide": "Erholungspeptid",
      "recovery peptide": "Erholungspeptid",
      "GLP-1 agonist": "GLP-1-Agonist",
      // Common content terms - German
      "This makes it ideal": "Das macht es ideal",
      "makes it ideal": "macht es ideal",
      "ideal for": "ideal für",
      "making it": "was es macht",
      "This is": "Das ist",
      "It is": "Es ist",
      "This": "Dies",
      "These": "Diese",
      "where": "wo",
      "which": "welches",
      "that": "das",
      "with": "mit",
      "and": "und",
      "or": "oder",
      "the": "der",
      "a": "ein",
      "an": "ein",
      "is": "ist",
      "are": "sind",
      "has": "hat",
      "have": "haben",
      "can": "kann",
      "will": "wird",
      "would": "würde",
      "should": "sollte",
      "must": "muss",
      "may": "kann",
      "also": "auch",
      "only": "nur",
      "just": "nur",
      "very": "sehr",
      "most": "meiste",
      "more": "mehr",
      "less": "weniger",
      "than": "als",
      "before": "vor",
      "after": "nach",
      "during": "während",
      "between": "zwischen",
      "through": "durch",
      "under": "unter",
      "over": "über",
      "into": "in",
      "from": "von",
      "about": "über",
      "against": "gegen",
      "within": "innerhalb",
      "without": "ohne",
      "along": "entlang",
      "following": "folgend",
      "across": "über",
      "behind": "hinter",
      "beyond": "jenseits",
      "plus": "plus",
      "except": "außer",
      "but": "aber",
      "by": "von",
      "up": "auf",
      "down": "runter",
      "in": "in",
      "out": "aus",
      "on": "auf",
      "off": "aus",
      "again": "wieder",
      "further": "weiter",
      "then": "dann",
      "once": "einmal",
      "here": "hier",
      "there": "dort",
      "when": "wann",
      "why": "warum",
      "how": "wie",
      "all": "alle",
      "any": "jede",
      "both": "beide",
      "few": "wenige",
      "other": "andere",
      "some": "einige",
      "such": "solche",
      "no": "nein",
      "nor": "noch",
      "not": "nicht",
      "own": "eigen",
      "same": "gleich",
      "so": "so",
      "too": "zu",
      // Product-specific headings and terms - German
      "Important Research Use Notice": "Wichtiger Hinweis zur Forschungsverwendung",
      "Order Today": "Jetzt Bestellen",
      "Order": "Bestellen",
      "Today": "Heute",
      "Work": "Arbeiten",
      "Peptide Specifications": "Peptid-Spezifikationen",
      // Research categories
      "Obesity Research": "Adipositas-Forschung",
      "Metabolic Research": "Stoffwechselforschung",
      "Gene Expression": "Genexpression",
      "GH Axis Studies": "GH-Achsen-Studien",
      "Delivery Options": "Lieferoptionen",
      "Available Package Sizes": "Verfügbare Verpackungsgrößen",
      "Guaranteed Purity": "Garantierte Reinheit",
      "UK-Based Delivery": "Lieferung aus Deutschland",
      "Weight Management Studies": "Gewichtsmanagement-Studien",
      "Tissue Repair": "Gewebereparatur",
      "Selectivity Profile": "Selektivitätsprofil",
      "Selective Action": "Selektive Wirkung",
      "Research Support": "Forschungsunterstützung",
      "Neuroprotection": "Neuroprotektion",
      "Lipolytic Activity": "Lipolytische Aktivität",
      "GHS-R Activation": "GHS-R-Aktivierung",
      "Diabetes Research": "Diabetes-Forschung",
      "Comparative Incretin Research": "Vergleichende Inkretin-Forschung",
      "Combination Research": "Kombinationsforschung",
      "Cognitive Research": "Kognitive Forschung",
      "Central Nervous System Actions": "Zentralnervensystem-Aktionen",
      "Key Differences": "Wesentliche Unterschiede",
      // Additional Research Headers - German
      "Actin Regulation": "Aktin-Regulation",
      "Adipose Tissue": "Fettgewebe",
      "Adipose Tissue Effects": "Fettgewebe-Effekte",
      "Ageing Research": "Alternsforschung",
      "Anti-Inflammatory Research": "Entzündungshemmende Forschung",
      "Anti-Lipogenic Effects": "Anti-lipogene Effekte",
      "Anxiety Research": "Angstforschung",
      "Appetite Research": "Appetitforschung",
      "Appetite and Obesity Research": "Appetit- und Adipositasforschung",
      "Cardiovascular Research": "Herz-Kreislauf-Forschung",
      "Cell Biology": "Zellbiologie",
      "Central Nervous System Effects": "ZNS-Effekte",
      "Circadian Research": "Zirkadiane Forschung",
      "Collagen & ECM": "Kollagen & ECM",
      "Competitive Pricing": "Wettbewerbsfähige Preise",
      "Comprehensive Documentation": "Umfassende Dokumentation",
      "Convenient 10ml Size": "Praktische 10ml Größe",
      "Copper Delivery": "Kupferabgabe",
      "DNA Repair": "DNA-Reparatur",
      "Dedicated Support": "Engagierter Support",
      "Direct AMPK Activation": "Direkte AMPK-Aktivierung",
      "Dopamine Effects": "Dopamin-Effekte",
      "Downstream Pathways": "Nachgeschaltete Pfade",
      "Dual Incretin Receptor Activation": "Duale Inkretin-Rezeptor-Aktivierung",
      "Energy Expenditure Studies": "Energieverbrauch-Studien",
      "Energy Metabolism": "Energiestoffwechsel",
      "Exercise Mimetics": "Trainingsmimetika",
      "Fat Metabolism": "Fettstoffwechsel",
      "Fat Metabolism Studies": "Fettstoffwechsel-Studien",
      "GABA System": "GABA-System",
      "GH Axis Research": "GH-Achsen-Forschung",
      "GHRH Receptor Activation": "GHRH-Rezeptor-Aktivierung",
      "GIP Receptor Activation": "GIP-Rezeptor-Aktivierung",
      "GLP-1 Receptor Activation": "GLP-1-Rezeptor-Aktivierung",
      "Gastric Effects": "Mageneffekte",
      "Gastrointestinal Effects": "Magen-Darm-Effekte",
      "Glucagon Receptor Activation": "Glukagon-Rezeptor-Aktivierung",
      "Hepatic Metabolism Research": "Leberstoffwechsel-Forschung",
      "Immunology": "Immunologie",
      "Inflammation Modulation": "Entzündungsmodulation",
      "Inflammatory Disease Models": "Entzündungskrankheitsmodelle",
      "Longevity Research": "Langlebigkeitsforschung",
      "Melanocortin Receptor Family": "Melanocortin-Rezeptorfamilie",
      "Melanogenesis Pathway": "Melanogenese-Weg",
      "Metabolic Effects": "Metabolische Effekte",
      "Metabolic Studies": "Stoffwechselstudien",
      "Metabolic Syndrome Studies": "Metabolisches Syndrom Studien",
      "Metabolism": "Stoffwechsel",
      "Methylation Balance": "Methylierungsgleichgewicht",
      "Modified Stability": "Modifizierte Stabilität",
      "Monoamine Regulation": "Monoamin-Regulation",
      "NAD+ Metabolism": "NAD+ Stoffwechsel",
      "Neuroendocrine": "Neuroendokrin",
      "Neuroplasticity": "Neuroplastizität",
      "Neuroscience": "Neurowissenschaften",
      "Neuroscience Applications": "Neurowissenschaftliche Anwendungen",
      "Neurotransmitter Effects": "Neurotransmitter-Effekte",
      "Neurotrophin Modulation": "Neurotrophin-Modulation",
      "Norepinephrine Effects": "Noradrenalin-Effekte",
      "Obesity Studies": "Adipositas-Studien",
      "Other Effects": "Andere Effekte",
      "Pancreatic Beta-Cell Effects": "Pankreas-Betazell-Effekte",
      "Pancreatic Effects": "Pankreas-Effekte",
      "Pigmentation Research": "Pigmentierungsforschung",
      "Pineal Function": "Zirbeldrüsenfunktion",
      "Pituitary Function": "Hypophysenfunktion",
      "Pulsatile vs Sustained Release": "Pulsatile vs. anhaltende Freisetzung",
      "Receptor Activation": "Rezeptoraktivierung",
      "Satiety Signalling": "Sättigungssignalisierung",
      "Secondary Effects": "Sekundäreffekte",
      "Serotonin Effects": "Serotonin-Effekte",
      "Sexual Function Studies": "Studien zur sexuellen Funktion",
      "Sirtuin Activation": "Sirtuin-Aktivierung",
      "Skin Disorder Research": "Hautkrankheiten-Forschung",
      "Skin Research": "Hautforschung",
      "Sleep Regulation": "Schlafregulation",
      "Sleep Research": "Schlafforschung",
      "Stress Research": "Stressforschung",
      "Synergistic Metabolic Effects": "Synergistische Stoffwechseleffekte",
      "Synergy with GHRH": "Synergie mit GHRH",
      "Telomerase Activation": "Telomerase-Aktivierung",
      "UK-Based Supplier": "Lieferant aus Deutschland",
      "UK-Based Supply": "Versorgung aus Deutschland",
      "Verified Purity": "Verifizierte Reinheit",
      "Weight Management Research": "Gewichtsmanagement-Forschung",
      // Scientific terms
      "synthetic analogue": "synthetisches Analogon",
      "analogue": "Analogon",
      "analog": "Analogon",
      "hormone": "Hormon",
      "receptor": "Rezeptor",
      "receptor agonist": "Rezeptoragonist",
      "agonist": "Agonist",
      "antagonist": "Antagonist",
      "binding": "Bindung",
      "affinity": "Affinität",
      "selectivity": "Selektivität",
      "mechanism": "Mechanismus",
      "pathway": "Signalweg",
      "signalling": "Signalisierung",
      "activation": "Aktivierung",
      "inhibition": "Hemmung",
      "modulation": "Modulation",
      "expression": "Expression",
      "regulation": "Regulation",
      "metabolism": "Stoffwechsel",
      "metabolic": "metabolisch",
      "glucose": "Glukose",
      "insulin": "Insulin",
      "insulin secretion": "Insulinsekretion",
      "appetite regulation": "Appetitregulation",
      "appetite": "Appetit",
      "weight management": "Gewichtsmanagement",
      "weight loss": "Gewichtsverlust",
      "obesity": "Adipositas",
      "diabetes": "Diabetes",
      "type 2 diabetes": "Typ-2-Diabetes",
      "blood sugar": "Blutzucker",
      "half-life": "Halbwertszeit",
      "bioavailability": "Bioverfügbarkeit",
      "pharmacokinetics": "Pharmakokinetik",
      "pharmacodynamics": "Pharmakodynamik",
      // Product descriptions
      "research peptide": "Forschungspeptid",
      "research-grade": "Forschungsqualität",
      "pharmaceutical grade": "pharmazeutische Qualität",
      "raw peptide": "rohes Peptid",
      "active pharmaceutical ingredient": "aktiver pharmazeutischer Wirkstoff",
      "brand-name": "Markenname",
      "prescription medications": "verschreibungspflichtige Medikamente",
      "laboratory research purposes": "Laborforschungszwecke",
      "human consumption": "menschlichen Verzehr",
      "medical treatment": "medizinische Behandlung",
      "not for human use": "nicht für den menschlichen Gebrauch",
      "for research only": "nur für Forschung",
      "research only": "nur Forschung",
      // Quality and purity
      "HPLC analysis": "HPLC-Analyse",
      "mass spectrometry": "Massenspektrometrie",
      "Certificate of Analysis": "Analysezertifikat",
      "COA": "COA",
      "batch": "Charge",
      "lot": "Los",
      "identity": "Identität",
      "peptide content": "Peptidgehalt",
      "quality control": "Qualitätskontrolle",
      "strict quality control": "strenge Qualitätskontrolle",
      "manufacturing": "Herstellung",
      "shipping": "Versand",
      // Storage terms
      "long-term stability": "Langzeitstabilität",
      "refrigerator": "Kühlschrank",
      "freeze-thaw cycles": "Gefrier-Tau-Zyklen",
      "protect from light": "vor Licht schützen",
      "airtight containers": "luftdichte Behälter",
      "moisture absorption": "Feuchtigkeitsaufnahme",
      "properly stored": "ordnungsgemäß gelagert",
      // Reconstitution
      "sterile bacteriostatic water": "steriles bakteriostatisches Wasser",
      "alkaline buffer": "alkalischer Puffer",
      "isoelectric point": "isoelektrischer Punkt",
      "peptide degradation": "Peptidabbau",
      "dissolution": "Auflösung",
      "dissolve": "auflösen",
      // Delivery
      "next day delivery": "Lieferung am nächsten Tag",
      "standard shipping": "Standardversand",
      "express delivery": "Expresslieferung",
      "international shipping": "internationaler Versand",
      "customs delays": "Zollverzögerungen",
      "overseas orders": "Auslandsbestellungen",
      "tracked delivery": "verfolgte Lieferung",
      "discrete packaging": "diskrete Verpackung",
      "cold packs": "Kühlakkus",
      "dry ice": "Trockeneis",
      // Ordering
      "minimum order": "Mindestbestellung",
      "bulk pricing": "Großhandelspreise",
      "custom orders": "Sonderbestellungen",
      "institutional research": "institutionelle Forschung",
      "larger quantities": "größere Mengen",
      "package sizes": "Verpackungsgrößen",
      "vial": "Ampulle",
      "vials": "Ampullen",
      // Scientific activities
      "binding assays": "Bindungsassays",
      "receptor binding": "Rezeptorbindung",
      "in vivo": "in vivo",
      "disease models": "Krankheitsmodelle",
      "research models": "Forschungsmodelle",
      "pilot studies": "Pilotstudien",
      "published literature": "veröffentlichte Literatur",
      "published data": "veröffentlichte Daten",
      "reference standards": "Referenzstandards",
      "reproducible results": "reproduzierbare Ergebnisse",
      "consistent quality": "gleichbleibende Qualität",
      "batch-to-batch": "Charge-zu-Charge",
      // Body/biological terms
      "intestines": "Darm",
      "gastric": "Magen",
      "beta-cell": "Betazelle",
      "beta-cell function": "Betazellfunktion",
      "gastric emptying": "Magenentleerung",
      "neuroprotective": "neuroprotektiv",
      "serum albumin": "Serumalbumin",
      "albumin binding": "Albuminbindung",
      "biological half-life": "biologische Halbwertszeit",
      "prolonged activity": "verlängerte Aktivität",
      "sustained activation": "anhaltende Aktivierung",
      "**5-Amino-1MQ** (5-Amino-1-Methylquinolinium) is a selective inhibitor of nicotinamide N-methyltransferase (NNMT), an enzyme increasingly recognised as a key regulator of cellular metabolism, NAD+ homeostasis, and adipose tissue function. This research compound has emerged as an important tool for studying the intersection of epigenetics, energy metabolism, and ageing.": "**5-Amino-1MQ** (5-Amino-1-Methylquinolinium) ist ein selektiver Inhibitor der Nicotinamid-N-Methyltransferase (NNMT), ein Enzym, das zunehmend als Schlüsselregulator des Zellstoffwechsels, der NAD+-Homöostase und der Fettgewebefunktion anerkannt wird. Diese Forschungsverbindung hat sich als wichtiges Werkzeug zur Untersuchung der Schnittstelle von Epigenetik, Energiestoffwechsel und Alterung erwiesen.",
      "**AOD-9604** (Anti-Obesity Drug 9604) is a modified fragment of human growth hormone comprising amino acids 177-191 of the C-terminal region, with an additional tyrosine residue at the N-terminus. This synthetic peptide was specifically designed to isolate the fat-metabolising properties of growth hormone without its growth-promoting or diabetogenic effects.": "**AOD-9604** (Anti-Obesity Drug 9604) ist ein modifiziertes Fragment des menschlichen Wachstumshormons, das die Aminosäuren 177-191 der C-terminalen Region umfasst, mit einem zusätzlichen Tyrosinrest am N-Terminus. Dieses synthetische Peptid wurde speziell entwickelt, um die fettstoffwechselnden Eigenschaften des Wachstumshormons zu isolieren, ohne dessen wachstumsfördernde oder diabetogene Wirkungen.",
      '**BPC-157** (Body Protection Compound-157) is a synthetic pentadecapeptide (15 amino acids) derived from a protein found in human gastric juice. Since its discovery, BPC-157 has become one of the most extensively studied peptides in tissue healing and regeneration research. For published research, see [PubMed studies on BPC-157](https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157){:target="_blank" rel="noopener"}.': '**BPC-157** (Body Protection Compound-157) ist ein synthetisches Pentadecapeptid (15 Aminosäuren), das von einem im menschlichen Magensaft vorkommenden Protein abgeleitet ist. Seit seiner Entdeckung hat sich BPC-157 zu einem der am intensivsten untersuchten Peptide in der Gewebeheilungs- und Regenerationsforschung entwickelt. Für veröffentlichte Forschung siehe [PubMed-Studien zu BPC-157](https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157){:target="_blank" rel="noopener"}.',
      "**CJC-1295 No DAC** (also known as Modified GRF 1-29 or Mod GRF) is a synthetic analog of growth hormone-releasing hormone (GHRH) with specific amino acid modifications that enhance its stability and half-life. Unlike CJC-1295 with DAC, this version lacks the Drug Affinity Complex, producing pulsatile rather than sustained GH release patterns.": "**CJC-1295 No DAC** (auch bekannt als Modified GRF 1-29 oder Mod GRF) ist ein synthetisches Analogon des Wachstumshormon-Releasing-Hormons (GHRH) mit spezifischen Aminosäuremodifikationen, die seine Stabilität und Halbwertszeit verbessern. Im Gegensatz zu CJC-1295 mit DAC fehlt dieser Version der Drug Affinity Complex, was zu pulsatilen anstatt anhaltenden GH-Freisetzungsmustern führt.",
      "**Cagrilintide** (AM833, NN9838) is a long-acting acylated analog of human amylin, a peptide hormone co-secreted with insulin from pancreatic beta cells. Through fatty acid acylation, cagrilintide achieves an extended half-life enabling once-weekly research dosing, making it an invaluable tool for studying amylin's role in satiety and metabolic regulation.": "**Cagrilintide** (AM833, NN9838) ist ein langwirksames acyliertes Analogon des menschlichen Amylins, einem Peptidhormon, das zusammen mit Insulin von den Betazellen der Bauchspeicheldrüse ausgeschüttet wird. Durch Fettsäureacylierung erreicht Cagrilintide eine verlängerte Halbwertszeit, die eine einmal wöchentliche Forschungsdosierung ermöglicht, was es zu einem unschätzbaren Werkzeug zur Untersuchung der Rolle von Amylin bei der Sättigung und der Stoffwechselregulation macht.",
      "**DSIP** (Delta Sleep-Inducing Peptide) is a nonapeptide first isolated from rabbit brain in 1977 during research into sleep physiology. The peptide was named for its ability to promote delta wave sleep patterns in research models.": "**DSIP** (Delta Sleep-Inducing Peptide) ist ein Nonapeptid, das erstmals 1977 während der Forschung zur Schlafphysiologie aus Kaninchenhirn isoliert wurde. Das Peptid wurde nach seiner Fähigkeit benannt, Delta-Wellen-Schlafmuster in Forschungsmodellen zu fördern.",
      "**Epitalon** (Epithalon, AEDG peptide) is a synthetic tetrapeptide based on epithalamin, a pineal gland extract extensively studied for its effects on telomerase activation and cellular ageing. Developed from decades of Russian research, Epitalon has become a key tool in longevity and anti-ageing research.": "**Epitalon** (Epithalon, AEDG-Peptid) ist ein synthetisches Tetrapeptid auf Basis von Epithalamin, einem Zirbeldrüsenextrakt, der umfassend auf seine Auswirkungen auf die Telomerase-Aktivierung und die zelluläre Alterung untersucht wurde. Entwickelt aus jahrzehntelanger russischer Forschung, ist Epitalon zu einem Schlüsselinstrument in der Langlebigkeits- und Anti-Aging-Forschung geworden.",
      "**GHK-Cu** (Copper Tripeptide-1) is a naturally occurring copper-peptide complex consisting of three amino acids (glycine-histidine-lysine) bound to a copper ion. Found in human plasma, saliva, and urine, GHK-Cu concentrations naturally decline with age.": "**GHK-Cu** (Kupfer-Tripeptid-1) ist ein natürlich vorkommender Kupfer-Peptid-Komplex, der aus drei Aminosäuren (Glycin-Histidin-Lysin) besteht, die an ein Kupferion gebunden sind. GHK-Cu-Konzentrationen, die in menschlichem Plasma, Speichel und Urin vorkommen, nehmen mit dem Alter natürlich ab.",
      "**GHRP-2** (Growth Hormone Releasing Peptide-2, Pralmorelin) is a synthetic hexapeptide that stimulates growth hormone release through activation of the ghrelin receptor (GHS-R1a). GHRP-2 is considered more selective than GHRP-6, producing robust GH release with less pronounced effects on appetite, cortisol, and prolactin.": "**GHRP-2** (Growth Hormone Releasing Peptide-2, Pralmorelin) ist ein synthetisches Hexapeptid, das die Freisetzung von Wachstumshormonen durch Aktivierung des Ghrelin-Rezeptors (GHS-R1a) stimuliert. GHRP-2 gilt als selektiver als GHRP-6 und bewirkt eine robuste GH-Freisetzung mit weniger ausgeprägten Auswirkungen auf Appetit, Cortisol und Prolaktin.",
      "**GHRP-6** (Growth Hormone Releasing Peptide-6) is a synthetic hexapeptide that stimulates growth hormone release through activation of the ghrelin receptor (GHS-R1a). As one of the first synthetic GH secretagogues developed, GHRP-6 has extensive research documentation and remains a valuable tool for studying growth hormone physiology.": "**GHRP-6** (Growth Hormone Releasing Peptide-6) ist ein synthetisches Hexapeptid, das die Freisetzung von Wachstumshormonen durch Aktivierung des Ghrelin-Rezeptors (GHS-R1a) stimuliert. Als eines der ersten entwickelten synthetischen GH-Sekretagoga verfügt GHRP-6 über eine umfangreiche Forschungsdokumentation und bleibt ein wertvolles Werkzeug zur Untersuchung der Wachstumshormonphysiologie.",
      "**HGH Fragment 176-191** is a synthetic peptide comprising the C-terminal portion of human growth hormone (amino acids 176-191). This specific region has been identified as responsible for GH's lipolytic (fat-burning) activity without the hormone's growth-promoting effects.": "**HGH Fragment 176-191** ist ein synthetisches Peptid, das den C-terminalen Teil des menschlichen Wachstumshormons (Aminosäuren 176-191) umfasst. Diese spezifische Region wurde als verantwortlich für die lipolytische (fettverbrennende) Aktivität von GH identifiziert, ohne die wachstumsfördernden Wirkungen des Hormons.",
      "**Ipamorelin** is a synthetic pentapeptide growth hormone secretagogue that selectively stimulates growth hormone (GH) release from pituitary somatotrope cells. Distinguished by its high selectivity, ipamorelin causes minimal effects on cortisol and prolactin levels, making it an invaluable research tool for studying isolated GH secretion mechanisms.": "**Ipamorelin** ist ein synthetisches Pentapeptid-Wachstumshormon-Sekretagogum, das selektiv die Freisetzung von Wachstumshormon (GH) aus den somatotropen Zellen der Hypophyse stimuliert. Ipamorelin zeichnet sich durch seine hohe Selektivität aus und verursacht minimale Auswirkungen auf den Cortisol- und Prolaktinspiegel, was es zu einem unschätzbaren Forschungswerkzeug zur Untersuchung isolierter GH-Sekretionsmechanismen macht.",
      "**Melanotan 2** (MT-2, MT-II) is a synthetic cyclic heptapeptide analogue of alpha-melanocyte stimulating hormone (α-MSH). Originally developed at the University of Arizona in the 1980s, this research peptide has become an essential tool for studying melanocortin receptor signalling and the regulation of skin pigmentation.": "**Melanotan 2** (MT-2, MT-II) ist ein synthetisches cyclisches Heptapeptid-Analogon des Alpha-Melanozyten-stimulierenden Hormons (α-MSH). Ursprünglich in den 1980er Jahren an der Universität von Arizona entwickelt, ist dieses Forschungspeptid zu einem wesentlichen Werkzeug für die Untersuchung der Melanocortin-Rezeptor-Signalübertragung und der Regulation der Hautpigmentierung geworden.",
      "**NAD+** (Nicotinamide Adenine Dinucleotide) is a coenzyme found in all living cells that plays fundamental roles in energy metabolism, DNA repair, and cellular signalling. NAD+ is essential for hundreds of enzymatic reactions and is a key regulator of cellular health.": "**NAD+** (Nicotinamid-Adenin-Dinukleotid) ist ein Coenzym, das in allen lebenden Zellen vorkommt und eine fundamentale Rolle im Energiestoffwechsel, bei der DNA-Reparatur und bei der zellulären Signalübertragung spielt. NAD+ ist essentiell für Hunderte von enzymatischen Reaktionen und ist ein Schlüsselregulator der zellulären Gesundheit.",
      "**O-304** is a novel small molecule that directly activates AMPK (AMP-activated protein kinase), the master regulator of cellular energy homeostasis. Unlike indirect activators like metformin, O-304 binds directly to AMPK's β1 subunit.": "**O-304** ist ein neuartiges kleines Molekül, das AMPK (AMP-aktivierte Proteinkinase), den Hauptregulator der zellulären Energiehomöostase, direkt aktiviert. Im Gegensatz zu indirekten Aktivatoren wie Metformin bindet O-304 direkt an die β1-Untereinheit von AMPK.",
      "**Retatrutide** (LY3437943) is a novel synthetic peptide that functions as a triple agonist of three key metabolic receptors: glucagon-like peptide-1 (GLP-1), glucose-dependent insulinotropic polypeptide (GIP), and glucagon receptors. This unprecedented triple mechanism of action makes Retatrutide the most comprehensive incretin-based research tool currently available.": "**Retatrutide** (LY3437943) ist ein neuartiges synthetisches Peptid, das als dreifacher Agonist an drei wichtigen Stoffwechselrezeptoren fungiert: Glucagon-like Peptide-1 (GLP-1), Glucose-dependent Insulinotropic Polypeptide (GIP) und Glucagon-Rezeptoren. Dieser beispiellose dreifache Wirkmechanismus macht Retatrutide zum umfassendsten derzeit verfügbaren inkretinbasierten Forschungswerkzeug.",
      "**Selank** (TP-7) is a synthetic heptapeptide developed in Russia as a modified analogue of tuftsin, a naturally occurring immunomodulatory peptide. Selank has been extensively studied for its anxiolytic, nootropic, and immunomodulatory properties.": "**Selank** (TP-7) ist ein synthetisches Heptapeptid, das in Russland als modifiziertes Analogon von Tuftsin, einem natürlich vorkommenden immunmodulatorischen Peptid, entwickelt wurde. Selank wurde umfassend auf seine anxiolytischen, nootropischen und immunmodulatorischen Eigenschaften untersucht.",
      '**Semaglutide** is a synthetic analogue of human Glucagon-Like Peptide-1 (GLP-1), a hormone naturally produced in the intestines that plays a crucial role in glucose metabolism and appetite regulation. This research peptide has gained significant attention in scientific communities worldwide for its applications in metabolic research, particularly in studies related to type 2 diabetes and obesity. For comprehensive background information, see the [PubChem compound entry for Semaglutide](https://pubchem.ncbi.nlm.nih.gov/compound/Semaglutide){:target="_blank" rel="noopener"}.': '**Semaglutid** ist ein synthetisches Analogon des menschlichen Glucagon-like Peptide-1 (GLP-1), einem Hormon, das natürlich im Darm produziert wird und eine entscheidende Rolle im Glucosestoffwechsel und der Appetitregulation spielt. Dieses Forschungspeptid hat in wissenschaftlichen Gemeinschaften weltweit erhebliche Aufmerksamkeit für seine Anwendungen in der Stoffwechselforschung erlangt, insbesondere in Studien zu Typ-2-Diabetes und Fettleibigkeit. Für umfassende Hintergrundinformationen siehe den [PubChem-Verbindungseintrag für Semaglutid](https://pubchem.ncbi.nlm.nih.gov/compound/Semaglutide){:target="_blank" rel="noopener"}.',
      "**Semax** is a synthetic heptapeptide developed in Russia, based on the ACTH(4-10) fragment of adrenocorticotropic hormone. Unlike full ACTH, Semax lacks hormonal activity but retains potent nootropic and neuroprotective properties.": "**Semax** ist ein in Russland entwickeltes synthetisches Heptapeptid, das auf dem ACTH(4-10)-Fragment des adrenocorticotropen Hormons basiert. Im Gegensatz zu vollständigem ACTH fehlt Semax die hormonelle Aktivität, behält jedoch starke nootropische und neuroprotektive Eigenschaften bei.",
      "**TB-500** is a synthetic peptide representing the active region of Thymosin Beta-4 (Tβ4), a naturally occurring protein found in virtually all human and animal cells. Thymosin Beta-4 is a 43-amino acid protein that plays critical roles in cell migration, angiogenesis, and tissue repair.": "**TB-500** ist ein synthetisches Peptid, das die aktive Region von Thymosin Beta-4 (Tβ4) darstellt, einem natürlich vorkommenden Protein, das in praktisch allen menschlichen und tierischen Zellen vorkommt. Thymosin Beta-4 ist ein 43-Aminosäuren-Protein, das eine entscheidende Rolle bei der Zellmigration, Angiogenese und Gewebereparatur spielt.",
      "**Tesofensine** (NS2330) is a triple monoamine reuptake inhibitor that blocks the presynaptic reuptake of norepinephrine, dopamine, and serotonin. Originally developed for neurodegenerative disease research, tesofensine has become an important tool for studying the neurological basis of appetite regulation and energy homeostasis.": "**Tesofensin** (NS2330) ist ein dreifacher Monoamin-Wiederaufnahmehemmer, der die präsynaptische Wiederaufnahme von Noradrenalin, Dopamin und Serotonin blockiert. Ursprünglich für die Forschung an neurodegenerativen Erkrankungen entwickelt, ist Tesofensin zu einem wichtigen Werkzeug für die Untersuchung der neurologischen Grundlagen der Appetitregulation und Energiehomöostase geworden.",
      "**Tirzepatide** is a novel synthetic peptide that functions as a dual agonist of two key incretin hormone receptors: glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1). This unique dual mechanism of action distinguishes Tirzepatide from single-target GLP-1 receptor agonists like semaglutide, making it an invaluable tool for metabolic research.": "**Tirzepatid** ist ein neuartiges synthetisches Peptid, das als dualer Agonist zweier wichtiger Inkretinhormonrezeptoren fungiert: Glucose-dependent Insulinotropic Polypeptide (GIP) und Glucagon-like Peptide-1 (GLP-1). Dieser einzigartige duale Wirkmechanismus unterscheidet Tirzepatid von GLP-1-Rezeptoragonisten mit nur einem Ziel wie Semaglutid, was es zu einem unschätzbaren Werkzeug für die Stoffwechselforschung macht.",
      "1. Allow the peptide vial to reach room temperature": "1. Lassen Sie die Peptid-Durchstechflasche Raumtemperatur erreichen",
      "2. Clean both vial tops with an alcohol swab": "2. Reinigen Sie beide Flaschenverschlüsse mit einem Alkoholtupfer",
      "3. Using a sterile syringe, withdraw the desired amount of bacteriostatic water": "3. Ziehen Sie mit einer sterilen Spritze die gewünschte Menge bakteriostatisches Wasser auf",
      "4. Insert the needle into the peptide vial, aiming at the glass wall": "4. Führen Sie die Nadel in die Peptid-Durchstechflasche ein und zielen Sie dabei auf die Glaswand",
      "5-Amino-1MQ inhibits NNMT, affecting multiple metabolic pathways:": "5-Amino-1MQ hemmt NNMT und beeinflusst mehrere Stoffwechselwege:",
      "5. Slowly inject the water, allowing it to run down the vial wall": "5. Injizieren Sie das Wasser langsam, sodass es an der Flaschenwand herunterläuft",
      "6. Gently swirl (do not shake) until fully dissolved": "6. Vorsichtig schwenken (nicht schütteln), bis es vollständig aufgelöst ist",
      "7. Store reconstituted peptide at 2-8°C": "7. Lagern Sie das rekonstituierte Peptid bei 2-8°C",
      "A key research advantage is its selectivity:": "Ein entscheidender Forschungsvorteil ist seine Selektivität:",
      "AOD-9604 also inhibits fat accumulation:": "AOD-9604 hemmt auch die Fettansammlung:",
      "AOD-9604's mechanism of action centres on its ability to stimulate lipolysis and inhibit lipogenesis in adipose tissue, mimicking a specific subset of growth hormone's metabolic effects.": "Der Wirkmechanismus von AOD-9604 konzentriert sich auf seine Fähigkeit, die Lipolyse zu stimulieren und die Lipogenese im Fettgewebe zu hemmen, wobei eine spezifische Untergruppe der metabolischen Effekte des Wachstumshormons nachgeahmt wird.",
      "Amylin complements insulin's glucose-lowering effects through distinct mechanisms including gastric emptying delay, glucagon suppression, and central satiety signalling. Cagrilintide provides researchers with a stable, long-acting tool to investigate these pathways in extended experimental paradigms.": "Amylin ergänzt die glukosesenkenden Wirkungen von Insulin durch verschiedene Mechanismen, darunter Verzögerung der Magenentleerung, Glukagonunterdrückung und zentrale Sättigungssignalisierung. Cagrilintid bietet Forschern ein stabiles, lang wirkendes Werkzeug, um diese Wege in erweiterten experimentellen Paradigmen zu untersuchen.",
      "Anti-inflammatory properties are actively investigated:": "Entzündungshemmende Eigenschaften werden aktiv untersucht:",
      "Bacteriostatic water (BAC water) is sterile water containing 0.9% benzyl alcohol, a bacteriostatic preservative that inhibits the growth of bacteria. This makes it ideal for reconstituting lyophilized (freeze-dried) peptides for research applications where multiple withdrawals from the same vial are needed.": "Bakteriostatisches Wasser (BAC-Wasser) ist steriles Wasser, das 0,9 % Benzylalkohol enthält, ein bakteriostatisches Konservierungsmittel, das das Bakterienwachstum hemmt. Dies macht es ideal für die Rekonstitution von lyophilisierten (gefriergetrockneten) Peptiden für Forschungsanwendungen, bei denen mehrere Entnahmen aus derselben Durchstechflasche erforderlich sind.",
      "Beyond sleep regulation, DSIP has demonstrated effects on stress response, pain perception, and neuroendocrine function, making it a versatile tool for neuroscience research.": "Über die Schlafregulation hinaus hat DSIP Wirkungen auf die Stressreaktion, Schmerzwahrnehmung und neuroendokrine Funktion gezeigt, was es zu einem vielseitigen Werkzeug für die neurowissenschaftliche Forschung macht.",
      "Broader metabolic applications:": "Breitere metabolische Anwendungen:",
      "By isolating this fragment, researchers can study GH's fat metabolism effects independently of IGF-1 elevation, glucose effects, and tissue growth, providing a cleaner tool for adipose biology research.": "Durch die Isolierung dieses Fragments können Forscher die Fettstoffwechseleffekte von GH unabhängig von IGF-1-Erhöhung, Glukoseeffekten und Gewebewachstum untersuchen, was ein saubereres Werkzeug für die Fettgewebebiologieforschung darstellt.",
      "Cagrilintide activates amylin receptors (AMY1, AMY2, AMY3), which are complexes of the calcitonin receptor with receptor activity-modifying proteins (RAMPs).": "Cagrilintid aktiviert Amylin-Rezeptoren (AMY1, AMY2, AMY3), bei denen es sich um Komplexe des Calcitonin-Rezeptors mit Rezeptoraktivität-modifizierenden Proteinen (RAMPs) handelt.",
      "Cagrilintide is often studied with GLP-1 agonists:": "Cagrilintid wird oft zusammen mit GLP-1-Agonisten untersucht:",
      "Central effects include:": "Zentrale Effekte sind unter anderem:",
      "Core applications in diabetes studies include:": "Kernanwendungen in Diabetesstudien umfassen:",
      "Dermatological applications extend beyond pigmentation:": "Dermatologische Anwendungen gehen über die Pigmentierung hinaus:",
      "Developed as a ghrelin receptor (GHS-R) agonist, ipamorelin represents one of the most selective GH releasing peptides (GHRPs) available for research. Its clean pharmacological profile enables researchers to study GH axis physiology without the confounding effects seen with less selective compounds.": "Entwickelt als Agonist des Ghrelin-Rezeptors (GHS-R), stellt Ipamorelin eines der selektivsten wachstumshormonfreisetzenden Peptide (GHRPs) dar, die für die Forschung verfügbar sind. Sein sauberes pharmakologisches Profil ermöglicht es Forschern, die Physiologie der GH-Achse ohne die Störfaktoren zu untersuchen, die bei weniger selektiven Verbindungen auftreten.",
      "Each 10ml vial can reconstitute 5-10 peptide vials depending on concentration requirements.": "Jede 10-ml-Durchstechflasche kann je nach Konzentrationsanforderungen 5-10 Peptid-Durchstechflaschen rekonstituieren.",
      "Emerging areas of investigation include:": "Aufstrebende Forschungsbereiche umfassen:",
      "Emerging evidence suggests GLP-1 receptor agonists may have cardiovascular effects beyond glucose control, leading to research investigating:": "Neuere Erkenntnisse deuten darauf hin, dass GLP-1-Rezeptoragonisten kardiovaskuläre Wirkungen haben könnten, die über die Glukosekontrolle hinausgehen, was zu Forschungen führt, die Folgendes untersuchen:",
      "Emerging research also explores Semaglutide's potential neuroprotective properties, with studies investigating its effects in models of Alzheimer's disease, Parkinson's disease, and stroke.": "Neuere Forschungen untersuchen auch die potenziellen neuroprotektiven Eigenschaften von Semaglutid, wobei Studien seine Auswirkungen in Modellen von Alzheimer, Parkinson und Schlaganfall untersuchen.",
      "Emerging research explores melanocortin anti-inflammatory properties:": "Neuere Forschungen untersuchen die entzündungshemmenden Eigenschaften von Melanocortin:",
      "Extensive research has demonstrated Semax's effects on cognitive function, BDNF expression, and neuroprotection, making it a valuable tool for neuroscience research.": "Umfangreiche Forschungen haben die Wirkung von Semax auf kognitive Funktionen, BDNF-Expression und Neuroprotektion gezeigt, was es zu einem wertvollen Werkzeug für die neurowissenschaftliche Forschung macht.",
      "GIP receptor engagement adds complementary effects:": "Die Einbindung des GIP-Rezeptors fügt ergänzende Effekte hinzu:",
      "GLP-1 receptor activation slows gastric emptying, which may contribute to prolonged satiety and reduced postprandial glucose excursions. Researchers studying gut-brain axis signalling find Semaglutide particularly useful for investigating these gastrointestinal regulatory mechanisms.": "Die Aktivierung des GLP-1-Rezeptors verlangsamt die Magenentleerung, was zu einer verlängerten Sättigung und reduzierten postprandialen Glukoseexkursionen beitragen kann. Forscher, die die Signalübertragung der Darm-Hirn-Achse untersuchen, finden Semaglutid besonders nützlich für die Untersuchung dieser gastrointestinalen Regulationsmechanismen.",
      "Glucagon's hepatic effects enable liver-focused studies:": "Die hepatischen Effekte von Glucagon ermöglichen leberfokussierte Studien:",
      "In pancreatic beta cells, GLP-1 receptor activation by Semaglutide triggers glucose-dependent insulin secretion through the cAMP-PKA signalling pathway. This glucose-dependent mechanism is particularly noteworthy in research, as it suggests reduced risk of hypoglycaemia compared to insulin secretagogues that work independently of glucose levels.": "In pankreatischen Beta-Zellen löst die Aktivierung des GLP-1-Rezeptors durch Semaglutid eine glukoseabhängige Insulinsekretion über den cAMP-PKA-Signalweg aus. Dieser glukoseabhängige Mechanismus ist in der Forschung besonders bemerkenswert, da er ein reduziertes Hypoglykämierisiko im Vergleich zu Insulinsekretagoga nahelegt, die unabhängig vom Glukosespiegel wirken.",
      "In pancreatic beta cells, Tirzepatide activates both GIP and GLP-1 receptors, leading to:": "In pankreatischen Beta-Zellen aktiviert Tirzepatid sowohl GIP- als auch GLP-1-Rezeptoren, was führt zu:",
      "Interest in NAD+ has surged due to its central role in ageing research, particularly its relationship with sirtuins and cellular repair mechanisms. NAD+ levels naturally decline with age, driving research into maintaining cellular NAD+ pools.": "Das Interesse an NAD+ ist aufgrund seiner zentralen Rolle in der Alternsforschung gestiegen, insbesondere im Zusammenhang mit Sirtuinen und zellulären Reparaturmechanismen. NAD+-Spiegel sinken natürlich mit dem Alter, was die Forschung zur Aufrechterhaltung zellulärer NAD+-Pools vorantreibt.",
      "Ipamorelin activates growth hormone secretagogue receptors (GHS-R) in the anterior pituitary, triggering GH release through multiple mechanisms.": "Ipamorelin aktiviert Wachstumshormon-Sekretagoga-Rezeptoren (GHS-R) im Hypophysenvorderlappen und löst durch mehrere Mechanismen die GH-Freisetzung aus.",
      "Ipamorelin's research value lies in its selectivity:": "Der Forschungswert von Ipamorelin liegt in seiner Selektivität:",
      "Key substitutions provide enhanced stability:": "Wichtige Substitutionen sorgen für erhöhte Stabilität:",
      "Like GLP-1 agonists, Tirzepatide affects appetite regulation through central mechanisms. Research indicates effects on:": "Wie GLP-1-Agonisten beeinflusst Tirzepatid die Appetitregulation durch zentrale Mechanismen. Forschungen deuten auf Effekte hin auf:",
      "MC4R activation makes MT-2 valuable for metabolic studies:": "MC4R-Aktivierung macht MT-2 wertvoll für Stoffwechselstudien:",
      "MT-2 activates multiple melanocortin receptor subtypes:": "MT-2 aktiviert mehrere Melanocortin-Rezeptor-Subtypen:",
      "MT-2's non-selective receptor profile enables diverse CNS research:": "Das nicht-selektive Rezeptorprofil von MT-2 ermöglicht vielfältige ZNS-Forschung:",
      "Melanotan 2 exerts its biological effects through activation of melanocortin receptors, a family of G protein-coupled receptors that regulate diverse physiological processes. Understanding these mechanisms is central to ongoing research in dermatology, endocrinology, and neuroscience.": "Melanotan 2 entfaltet seine biologischen Wirkungen durch die Aktivierung von Melanocortin-Rezeptoren, einer Familie von G-Protein-gekoppelten Rezeptoren, die diverse physiologische Prozesse regulieren. Das Verständnis dieser Mechanismen ist zentral für die laufende Forschung in Dermatologie, Endokrinologie und Neurowissenschaften.",
      "Melanotan 2 is extensively used in dermatological research:": "Melanotan 2 wird umfassend in der dermatologischen Forschung eingesetzt:",
      "NNMT catalyses the N-methylation of nicotinamide (a NAD+ precursor) using SAM (S-adenosylmethionine) as a methyl donor. By inhibiting this enzyme, 5-Amino-1MQ enables researchers to investigate how NNMT modulation affects cellular metabolism, NAD+ availability, and metabolic health.": "NNMT katalysiert die N-Methylierung von Nicotinamid (einem NAD+-Vorläufer) unter Verwendung von SAM (S-Adenosylmethionin) als Methylspender. Durch die Hemmung dieses Enzyms ermöglicht 5-Amino-1MQ Forschern zu untersuchen, wie die NNMT-Modulation den zellulären Stoffwechsel, die NAD+-Verfügbarkeit und die metabolische Gesundheit beeinflusst.",
      "Originally developed by Metabolic Pharmaceuticals in Australia, AOD-9604 represents one of the most targeted approaches to studying growth hormone's lipolytic activity. By using only the fat-reducing portion of the full hormone, researchers can investigate adipose tissue metabolism without confounding effects on IGF-1 or glucose homeostasis.": "Ursprünglich von Metabolic Pharmaceuticals in Australien entwickelt, stellt AOD-9604 einen der zielgerichtetsten Ansätze zur Untersuchung der lipolytischen Aktivität von Wachstumshormonen dar. Durch die Verwendung nur des fettreduzierenden Teils des vollständigen Hormons können Forscher den Fettgewebestoffwechsel untersuchen, ohne störende Effekte auf IGF-1 oder die Glukosehomöostase.",
      "Our bacteriostatic water meets United States Pharmacopeia (USP) standards for:": "Unser bakteriostatisches Wasser erfüllt die Standards der United States Pharmacopeia (USP) für:",
      "Our research-grade Semaglutide meets the highest quality standards required for reproducible scientific research:": "Unser Semaglutid in Forschungsqualität entspricht den höchsten Qualitätsstandards, die für reproduzierbare wissenschaftliche Forschung erforderlich sind:",
      "Peptide Shop supplies **research-grade 5-Amino-1MQ** with guaranteed ≥99% purity, verified through comprehensive HPLC analysis.": "Peptide Shop liefert **5-Amino-1MQ in Forschungsqualität** mit einer garantierten Reinheit von ≥99%, verifiziert durch umfassende HPLC-Analyse.",
      "Peptide Shop supplies **research-grade AOD-9604** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis, ensuring researchers receive properly characterised material for their studies.": "Peptide Shop liefert **AOD-9604 in Forschungsqualität** mit einer garantierten Reinheit von ≥99%, verifiziert durch umfassende HPLC- und Massenspektrometrie-Analyse. Jede Bestellung enthält ein detailliertes Analysezertifikat, das sicherstellt, dass Forscher ordnungsgemäß charakterisiertes Material für ihre Studien erhalten.",
      "Peptide Shop supplies **research-grade BPC-157** with guaranteed ≥99% purity and full analytical documentation.": "Peptide Shop liefert **BPC-157 in Forschungsqualität** mit einer garantierten Reinheit von ≥99% und vollständiger analytischer Dokumentation.",
      "Peptide Shop supplies **research-grade CJC-1295 No DAC** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis.": "Peptide Shop liefert **CJC-1295 No DAC in Forschungsqualität** mit einer garantierten Reinheit von ≥99%, verifiziert durch umfassende HPLC- und Massenspektrometrie-Analyse.",
      "Peptide Shop supplies **research-grade Cagrilintide** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis.": "Peptide Shop liefert **Cagrilintid in Forschungsqualität** mit einer garantierten Reinheit von ≥99%, verifiziert durch umfassende HPLC- und Massenspektrometrie-Analyse.",
      "Peptide Shop supplies **research-grade DSIP** with guaranteed ≥99% purity.": "Peptide Shop liefert **DSIP in Forschungsqualität** mit einer garantierten Reinheit von ≥99%.",
      "Peptide Shop supplies **research-grade Epitalon** with guaranteed ≥99% purity.": "Peptide Shop liefert **Epitalon in Forschungsqualität** mit einer garantierten Reinheit von ≥99%.",
      "Peptide Shop supplies **research-grade GHK-Cu** with guaranteed ≥99% purity.": "Peptide Shop liefert **GHK-Cu in Forschungsqualität** mit einer garantierten Reinheit von ≥99%.",
      "Peptide Shop supplies **research-grade GHRP-2** with guaranteed ≥99% purity.": "Peptide Shop liefert **GHRP-2 in Forschungsqualität** mit einer garantierten Reinheit von ≥99%.",
      "Peptide Shop supplies **research-grade GHRP-6** with guaranteed ≥99% purity.": "Peptide Shop liefert **GHRP-6 in Forschungsqualität** mit einer garantierten Reinheit von ≥99%.",
      "Peptide Shop supplies **research-grade HGH Fragment 176-191** with guaranteed ≥99% purity.": "Peptide Shop liefert **HGH Fragment 176-191 in Forschungsqualität** mit einer garantierten Reinheit von ≥99%.",
      "Peptide Shop supplies **research-grade Ipamorelin** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis.": "Peptide Shop liefert **Ipamorelin in Forschungsqualität** mit einer garantierten Reinheit von ≥99%, verifiziert durch umfassende HPLC- und Massenspektrometrie-Analyse.",
      "Peptide Shop supplies **research-grade Melanotan 2** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis, ensuring researchers receive properly characterised material for their studies.": "Peptide Shop liefert **Melanotan 2 in Forschungsqualität** mit einer garantierten Reinheit von ≥99%, verifiziert durch umfassende HPLC- und Massenspektrometrie-Analyse. Jede Bestellung enthält ein detailliertes Analysezertifikat, das sicherstellt, dass Forscher ordnungsgemäß charakterisiertes Material für ihre Studien erhalten.",
      "Peptide Shop supplies **research-grade NAD+** with guaranteed ≥99% purity.": "Peptide Shop liefert **NAD+ in Forschungsqualität** mit einer garantierten Reinheit von ≥99%.",
      "Peptide Shop supplies **research-grade O-304** with guaranteed ≥99% purity.": "Peptide Shop liefert **O-304 in Forschungsqualität** mit einer garantierten Reinheit von ≥99%.",
      "Peptide Shop supplies **research-grade Retatrutide** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis, ensuring researchers receive properly characterised material for their studies.": "Peptide Shop liefert **Retatrutid in Forschungsqualität** mit einer garantierten Reinheit von ≥99%, verifiziert durch umfassende HPLC- und Massenspektrometrie-Analyse. Jede Bestellung enthält ein detailliertes Analysezertifikat, das sicherstellt, dass Forscher ordnungsgemäß charakterisiertes Material für ihre Studien erhalten.",
      "Peptide Shop supplies **research-grade Selank** with guaranteed ≥99% purity.": "Peptide Shop liefert **Selank in Forschungsqualität** mit einer garantierten Reinheit von ≥99%.",
      "Peptide Shop supplies **research-grade Semaglutide** with guaranteed ≥99% purity, verified by HPLC analysis and mass spectrometry. Every order includes a comprehensive Certificate of Analysis (COA), ensuring researchers receive properly characterised material for their studies.": "Peptide Shop liefert **Semaglutid in Forschungsqualität** mit einer garantierten Reinheit von ≥99%, verifiziert durch HPLC-Analyse und Massenspektrometrie. Jede Bestellung enthält ein umfassendes Analysezertifikat (COA), das sicherstellt, dass Forscher ordnungsgemäß charakterisiertes Material für ihre Studien erhalten.",
      "Peptide Shop supplies **research-grade Semax** with guaranteed ≥99% purity.": "Peptide Shop liefert **Semax in Forschungsqualität** mit einer garantierten Reinheit von ≥99%.",
      "Peptide Shop supplies **research-grade TB-500** with guaranteed ≥99% purity.": "Peptide Shop liefert **TB-500 in Forschungsqualität** mit einer garantierten Reinheit von ≥99%.",
      "Peptide Shop supplies **research-grade Tesofensine** with guaranteed ≥99% purity, verified through comprehensive HPLC analysis.": "Peptide Shop liefert **Tesofensin in Forschungsqualität** mit einer garantierten Reinheit von ≥99%, verifiziert durch umfassende HPLC-Analyse.",
      "Peptide Shop supplies **research-grade Tirzepatide** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis to ensure researchers receive properly characterised material for their studies.": "Peptide Shop liefert **Tirzepatid in Forschungsqualität** mit einer garantierten Reinheit von ≥99%, verifiziert durch umfassende HPLC- und Massenspektrometrie-Analyse. Jede Bestellung enthält ein detailliertes Analysezertifikat, um sicherzustellen, dass Forscher ordnungsgemäß charakterisiertes Material für ihre Studien erhalten.",
      "Peripheral actions include:": "Periphere Wirkungen umfassen:",
      "Primary research applications include:": "Primäre Forschungsanwendungen umfassen:",
      "Research has demonstrated that Semaglutide may also promote beta-cell proliferation and reduce apoptosis in preclinical models, suggesting potential applications in studying beta-cell preservation strategies.": "Forschungen haben gezeigt, dass Semaglutid auch die Beta-Zell-Proliferation fördern und die Apoptose in präklinischen Modellen reduzieren kann, was auf mögliche Anwendungen bei der Untersuchung von Strategien zur Erhaltung von Beta-Zellen hindeutet.",
      "Research interest in GHK-Cu stems from its remarkable effects on tissue regeneration, wound healing, and gene expression modulation. Studies suggest it influences over 4,000 genes related to tissue repair and regeneration.": "Das Forschungsinteresse an GHK-Cu rührt von seinen bemerkenswerten Wirkungen auf Geweberegeneration, Wundheilung und Genexpressionsmodulation her. Studien deuten darauf hin, dass es über 4.000 Gene beeinflusst, die mit Gewebereparatur und Regeneration zusammenhängen.",
      "Research interest in O-304 stems from its potential applications in metabolic disease, diabetes, and obesity research, where AMPK activation can improve glucose uptake and lipid oxidation.": "Das Forschungsinteresse an O-304 rührt von seinen potenziellen Anwendungen in der Stoffwechsel-, Diabetes- und Adipositasforschung her, wo die AMPK-Aktivierung die Glukoseaufnahme und Lipidoxidation verbessern kann.",
      "Research into melanocortin effects on sexual behaviour:": "Forschung zu Melanocortin-Effekten auf das Sexualverhalten:",
      "Research often combines ipamorelin with GHRH analogs:": "Forschung kombiniert Ipamorelin oft mit GHRH-Analoga:",
      "Researchers often compare these related peptides:": "Forscher vergleichen diese verwandten Peptide oft:",
      "Retatrutide enables essential comparative studies:": "Retatrutid ermöglicht wesentliche Vergleichsstudien:",
      "Retatrutide's triple agonism creates a unique pharmacological profile by simultaneously engaging three complementary receptor systems, each contributing distinct metabolic effects.": "Der dreifache Agonismus von Retatrutid schafft ein einzigartiges pharmakologisches Profil, indem er gleichzeitig drei komplementäre Rezeptorsysteme einbindet, die jeweils zu unterschiedlichen metabolischen Effekten beitragen.",
      "Semaglutide crosses the blood-brain barrier and activates GLP-1 receptors in key hypothalamic regions involved in appetite regulation, including the arcuate nucleus and paraventricular nucleus. Research indicates that this central action contributes to reduced food intake and altered food preferences in animal models.": "Semaglutid überwindet die Blut-Hirn-Schranke und aktiviert GLP-1-Rezeptoren in wichtigen hypothalamischen Regionen, die an der Appetitregulation beteiligt sind, einschließlich des Nucleus arcuatus und des Nucleus paraventricularis. Forschungen zeigen, dass diese zentrale Wirkung zu einer reduzierten Nahrungsaufnahme und veränderten Nahrungspräferenzen in Tiermodellen beiträgt.",
      "Semaglutide exerts its biological effects through high-affinity binding to the GLP-1 receptor (GLP-1R), a G protein-coupled receptor expressed in various tissues including pancreatic beta cells, the central nervous system, heart, and gastrointestinal tract. Upon receptor binding, Semaglutide initiates several downstream signalling cascades that researchers continue to investigate.": "Semaglutid entfaltet seine biologischen Wirkungen durch hochaffine Bindung an den GLP-1-Rezeptor (GLP-1R), einen G-Protein-gekoppelten Rezeptor, der in verschiedenen Geweben exprimiert wird, einschließlich pankreatischer Beta-Zellen, des Zentralnervensystems, des Herzens und des Magen-Darm-Trakts. Nach der Rezeptorbindung initiiert Semaglutid mehrere nachgeschaltete Signalkaskaden, die Forscher weiterhin untersuchen.",
      "Semaglutide is extensively used in metabolic research laboratories studying:": "Semaglutid wird umfassend in Stoffwechselforschungslabors eingesetzt, die untersuchen:",
      "TB-500 contains the key sequence responsible for Tβ4's biological activity, particularly the actin-binding domain that promotes cell motility and tissue regeneration. This makes it invaluable for research into wound healing, muscle repair, and inflammatory conditions.": "TB-500 enthält die Schlüsselsequenz, die für die biologische Aktivität von Tβ4 verantwortlich ist, insbesondere die Aktin-bindende Domäne, die die Zellmotilität und Geweberegeneration fördert. Dies macht es von unschätzbarem Wert für die Forschung zu Wundheilung, Muskelreparatur und entzündlichen Erkrankungen.",
      "Tesofensine increases synaptic concentrations of three key neurotransmitters:": "Tesofensin erhöht die synaptischen Konzentrationen von drei wichtigen Neurotransmittern:",
      "The GIP receptor component may provide unique effects on adipose tissue:": "Die GIP-Rezeptorkomponente kann einzigartige Wirkungen auf das Fettgewebe haben:",
      "The GIP receptor is predominantly expressed in pancreatic beta cells and adipose tissue, while GLP-1 receptors are found in pancreatic islets, brain, heart, and gastrointestinal tract. By activating both receptor systems simultaneously, Tirzepatide provides researchers with a unique tool for studying:": "Der GIP-Rezeptor wird überwiegend in pankreatischen Beta-Zellen und Fettgewebe exprimiert, während GLP-1-Rezeptoren in Pankreasinseln, Gehirn, Herz und Magen-Darm-Trakt zu finden sind. Durch die gleichzeitige Aktivierung beider Rezeptorsysteme bietet Tirzepatid Forschern ein einzigartiges Werkzeug zur Untersuchung von:",
      "The GLP-1 component provides established incretin effects:": "Die GLP-1-Komponente bietet etablierte Inkretin-Effekte:",
      "The dual agonist is valuable for investigating:": "Der duale Agonist ist wertvoll für die Untersuchung von:",
      "The molecular structure of Semaglutide features a unique C-18 fatty diacid chain attached to the lysine residue at position 26. This structural modification enables the peptide to bind to serum albumin, dramatically extending its biological half-life to approximately seven days. This prolonged activity profile makes Semaglutide an invaluable tool for researchers studying sustained GLP-1 receptor activation mechanisms.": "Die molekulare Struktur von Semaglutid weist eine einzigartige C-18-Fettsäurediacid-Kette auf, die an den Lysinrest an Position 26 gebunden ist. Diese strukturelle Modifikation ermöglicht es dem Peptid, an Serumalbumin zu binden, wodurch seine biologische Halbwertszeit drastisch auf etwa sieben Tage verlängert wird. Dieses verlängerte Aktivitätsprofil macht Semaglutid zu einem unschätzbaren Werkzeug für Forscher, die Mechanismen der anhaltenden GLP-1-Rezeptoraktivierung untersuchen.",
      "The peptide binds to GHRH receptors on pituitary somatotropes:": "Das Peptid bindet an GHRH-Rezeptoren auf hypophysären Somatotropen:",
      "The peptide enables focused weight studies:": "Das Peptid ermöglicht fokussierte Gewichtsstudien:",
      "The peptide promotes fat breakdown through:": "Das Peptid fördert den Fettabbau durch:",
      "The peptide represents the first 29 amino acids of GHRH with modifications at positions 2, 8, 15, and 27 to improve resistance to enzymatic degradation. These modifications make it a more practical research tool while maintaining GHRH receptor binding activity.": "Das Peptid repräsentiert die ersten 29 Aminosäuren von GHRH mit Modifikationen an den Positionen 2, 8, 15 und 27 zur Verbesserung der Resistenz gegen enzymatischen Abbau. Diese Modifikationen machen es zu einem praktischeren Forschungswerkzeug, während die GHRH-Rezeptorbindungsaktivität erhalten bleibt.",
      "The peptide represents the next evolution beyond dual agonists like tirzepatide, adding glucagon receptor activation to the established GLP-1/GIP dual agonism. This triple receptor engagement enables researchers to study the complex interplay between these metabolic signalling systems and their combined effects on glucose homeostasis, energy expenditure, and body weight regulation.": "Das Peptid stellt die nächste Evolution jenseits dualer Agonisten wie Tirzepatid dar und fügt dem etablierten GLP-1/GIP-Dualagonismus die Glucagon-Rezeptor-Aktivierung hinzu. Diese dreifache Rezeptoreinbindung ermöglicht es Forschern, das komplexe Zusammenspiel zwischen diesen metabolischen Signalsystemen und ihren kombinierten Auswirkungen auf die Glukosehomöostase, den Energieverbrauch und die Regulierung des Körpergewichts zu untersuchen.",
      "The peptide's cyclic lactam structure provides enhanced stability and receptor binding affinity compared to linear α-MSH analogues. Melanotan 2 acts as a non-selective agonist at melanocortin receptors MC1, MC3, MC4, and MC5, enabling researchers to study diverse physiological processes beyond pigmentation.": "Die zyklische Lactamstruktur des Peptids bietet im Vergleich zu linearen α-MSH-Analoga eine erhöhte Stabilität und Rezeptorbindungsaffinität. Melanotan 2 wirkt als nicht-selektiver Agonist an den Melanocortin-Rezeptoren MC1, MC3, MC4 und MC5 und ermöglicht es Forschern, vielfältige physiologische Prozesse jenseits der Pigmentierung zu untersuchen.",
      "The peptide's effects on body weight have made it crucial for obesity research, including studies on:": "Die Auswirkungen des Peptids auf das Körpergewicht haben es entscheidend für die Adipositasforschung gemacht, einschließlich Studien zu:",
      "The peptide's improved selectivity profile makes it valuable for studying GH secretion mechanisms without confounding orexigenic effects.": "Das verbesserte Selektivitätsprofil des Peptids macht es wertvoll für die Untersuchung von GH-Sekretionsmechanismen ohne störende orexigene Effekte.",
      "The peptide's name reflects its origin—a body protection compound identified for its remarkable cytoprotective and regenerative properties across multiple tissue types including tendons, ligaments, muscles, and gastrointestinal epithelium.": "Der Name des Peptids spiegelt seinen Ursprung wider – eine Körperschutzverbindung, die für ihre bemerkenswerten zytoprotektiven und regenerativen Eigenschaften in mehreren Gewebetypen, darunter Sehnen, Bänder, Muskeln und Magen-Darm-Epithel, identifiziert wurde.",
      "The peptide's primary interest lies in its reported ability to activate telomerase, potentially influencing cellular lifespan and age-related changes.": "Das primäre Interesse an dem Peptid liegt in der berichteten Fähigkeit, Telomerase zu aktivieren, was potenziell die zelluläre Lebensdauer und altersbedingte Veränderungen beeinflusst.",
      "The peptide's structure incorporates a modified GIP sequence with carefully engineered amino acid substitutions and a C20 fatty diacid side chain attached to lysine. This modification enables binding to serum albumin, extending the biological half-life to approximately five days and allowing researchers to study sustained dual receptor activation.": "Die Struktur des Peptids enthält eine modifizierte GIP-Sequenz mit sorgfältig entwickelten Aminosäuresubstitutionen und einer an Lysin gebundenen C20-Fettsäurediacid-Seitenkette. Diese Modifikation ermöglicht die Bindung an Serumalbumin, verlängert die biologische Halbwertszeit auf etwa fünf Tage und ermöglicht es Forschern, eine anhaltende duale Rezeptoraktivierung zu untersuchen.",
      "The presence of GLP-1 receptors in the brain has sparked significant neuroscience research using Semaglutide:": "Das Vorhandensein von GLP-1-Rezeptoren im Gehirn hat umfangreiche neurowissenschaftliche Forschung mit Semaglutid ausgelöst:",
      "The primary research application involves studying skin pigmentation:": "Die primäre Forschungsanwendung umfasst die Untersuchung der Hautpigmentierung:",
      "The thermogenic component opens unique research directions:": "Die thermogene Komponente eröffnet einzigartige Forschungsrichtungen:",
      "The triple agonist provides comprehensive weight research tools:": "Der dreifache Agonist bietet umfassende Werkzeuge zur Gewichtsforschung:",
      "The triple combination creates unique research opportunities:": "Die Dreierkombination schafft einzigartige Forschungsmöglichkeiten:",
      "The unique glucagon component provides:": "Die einzigartige Glucagon-Komponente bietet:",
      "Tirzepatide enables crucial comparative studies between:": "Tirzepatid ermöglicht entscheidende Vergleichsstudien zwischen:",
      "Tirzepatide exerts its biological effects through simultaneous activation of GIP and GLP-1 receptors, both of which are G protein-coupled receptors expressed in various metabolically active tissues. This dual agonism creates synergistic signalling effects that researchers continue to characterise.": "Tirzepatid entfaltet seine biologischen Wirkungen durch gleichzeitige Aktivierung von GIP- und GLP-1-Rezeptoren, beides G-Protein-gekoppelte Rezeptoren, die in verschiedenen metabolisch aktiven Geweben exprimiert werden. Dieser duale Agonismus erzeugt synergistische Signaleffekte, die Forscher weiterhin charakterisieren.",
      "Tirzepatide's superior weight outcomes in preclinical models make it essential for:": "Die überlegenen Gewichtsergebnisse von Tirzepatid in präklinischen Modellen machen es unverzichtbar für:",
      "Unlike benzodiazepines, Selank does not produce sedation or dependence, making it a valuable tool for researching anxiety mechanisms and novel therapeutic approaches.": "Im Gegensatz zu Benzodiazepinen erzeugt Selank keine Sedierung oder Abhängigkeit, was es zu einem wertvollen Werkzeug für die Erforschung von Angstmechanismen und neuartigen therapeutischen Ansätzen macht.",
      "Unlike more selective peptides such as ipamorelin, GHRP-6 also stimulates appetite and affects cortisol and prolactin levels, making it useful for studying the full spectrum of ghrelin receptor effects.": "Im Gegensatz zu selektiveren Peptiden wie Ipamorelin stimuliert GHRP-6 auch den Appetit und beeinflusst den Cortisol- und Prolaktinspiegel, was es nützlich für die Untersuchung des gesamten Spektrums der Ghrelin-Rezeptor-Effekte macht.",
      "Unlike single-target compounds, tesofensine's triple mechanism enables researchers to investigate the complex interplay between monoaminergic systems in controlling food intake and metabolic rate. This makes it valuable for understanding the neuropharmacology of obesity and appetite disorders.": "Im Gegensatz zu Verbindungen mit einem einzigen Ziel ermöglicht der dreifache Mechanismus von Tesofensin Forschern, das komplexe Zusammenspiel zwischen monoaminergen Systemen bei der Steuerung der Nahrungsaufnahme und der Stoffwechselrate zu untersuchen. Dies macht es wertvoll für das Verständnis der Neuropharmakologie von Adipositas und Appetitstörungen.",
      "Unlike single-use sterile water, bacteriostatic water allows multiple withdrawals over several weeks without contamination risk, making it cost-effective for research laboratories.": "Im Gegensatz zu sterilem Einwegwasser ermöglicht bakteriostatisches Wasser mehrere Entnahmen über mehrere Wochen ohne Kontaminationsrisiko, was es für Forschungslabore kostengünstig macht.",
      "Without DAC, the peptide produces:": "Ohne DAC erzeugt das Peptid:"
    },
    fr: {
      // French SEO optimized phrases
      "What is": "Qu'est-ce que",
      "How does": "Comment fonctionne",
      "Benefits of": "Avantages de",
      "Research Applications": "Applications de Recherche",
      "Storage Instructions": "Instructions de Conservation",
      "Reconstitution Guide": "Guide de Reconstitution",
      "Dosage Information": "Informations de Dosage",
      "Key Benefits": "Principaux Avantages",
      "Why Choose": "Pourquoi Choisir",
      "Product Overview": "Aperçu du Produit",
      "Scientific Background": "Contexte Scientifique",
      "Quality Assurance": "Assurance Qualité",
      "Shipping Information": "Informations de Livraison",
      "Related Products": "Produits Connexes",
      // French SEO keywords
      "Buy": "Acheter",
      "purchase": "acheter",
      "order": "commander",
      "online": "en ligne",
      "high quality": "haute qualité",
      "research grade": "qualité recherche",
      "laboratory": "laboratoire",
      "peptide": "peptide",
      "peptides": "peptides",
      "purity": "pureté",
      "verified": "vérifié",
      "certified": "certifié",
      "fast delivery": "livraison rapide",
      "fast shipping": "expédition rapide",
      "UK delivery": "livraison en France",
      "Europe": "Europe",
      "European": "Européen",
      // Research terms
      "research purposes": "fins de recherche",
      "scientific research": "recherche scientifique",
      "in vitro": "in vitro",
      "clinical studies": "études cliniques",
      "laboratory use": "usage en laboratoire",
      // Product attributes
      "lyophilized powder": "poudre lyophilisée",
      "sterile": "stérile",
      "injectable": "injectable",
      "subcutaneous": "sous-cutané",
      "intramuscular": "intramusculaire",
      // Actions
      "Store": "Conserver",
      "Keep": "Garder",
      "Reconstitute": "Reconstituer",
      "Mix": "Mélanger",
      "Inject": "Injecter",
      "refrigerated": "réfrigéré",
      "frozen": "congelé",
      "room temperature": "température ambiante",
      // Technical/Scientific terms - French
      "synthetic": "synthétique",
      "amino acids": "acides aminés",
      "amino acid": "acide aminé",
      "derived from": "dérivé de",
      "protein": "protéine",
      "gastric juice": "suc gastrique",
      "discovery": "découverte",
      "extensively studied": "largement étudié",
      "tissue healing": "guérison des tissus",
      "tissue repair": "réparation des tissus",
      "regeneration": "régénération",
      "cytoprotective": "cytoprotecteur",
      "regenerative properties": "propriétés régénératives",
      "multiple tissue types": "plusieurs types de tissus",
      "including": "y compris",
      "tendons": "tendons",
      "ligaments": "ligaments",
      "muscles": "muscles",
      "gastrointestinal epithelium": "épithélium gastro-intestinal",
      // How it works - French
      "How Does": "Comment Fonctionne",
      "Growth Factor Modulation": "Modulation des Facteurs de Croissance",
      "VEGF upregulation": "Régulation positive du VEGF",
      "Enhanced angiogenesis": "Angiogenèse améliorée",
      "GH receptor effects": "Effets sur les récepteurs GH",
      "Growth hormone pathway": "Voie de l'hormone de croissance",
      "EGF modulation": "Modulation de l'EGF",
      "Epithelial growth support": "Support de croissance épithéliale",
      "NGF interaction": "Interaction NGF",
      "Nerve growth effects": "Effets sur la croissance nerveuse",
      "Nitric Oxide System": "Système d'Oxyde Nitrique",
      "NO pathway activation": "Activation de la voie NO",
      "Vasodilation effects": "Effets vasodilatateurs",
      "Endothelial function": "Fonction endothéliale",
      "Vascular health": "Santé vasculaire",
      "Blood flow enhancement": "Amélioration du flux sanguin",
      "Tissue perfusion": "Perfusion tissulaire",
      "Cytoprotective Actions": "Actions Cytoprotectrices",
      "Gastric protection": "Protection gastrique",
      "Original discovery context": "Contexte de découverte original",
      "Mucosal healing": "Guérison des muqueuses",
      "GI epithelium repair": "Réparation de l'épithélium GI",
      "Anti-inflammatory": "Anti-inflammatoire",
      "Reduced damage markers": "Marqueurs de dommages réduits",
      // Research Applications - French
      "Musculoskeletal Healing": "Guérison Musculo-squelettique",
      "Tendon repair": "Réparation des tendons",
      "rotator cuff models": "modèles de coiffe des rotateurs",
      "Ligament healing": "Guérison des ligaments",
      "ACL research": "Recherche sur le LCA",
      "Muscle regeneration": "Régénération musculaire",
      "Injury recovery": "Récupération après blessure",
      "Gastrointestinal Research": "Recherche Gastro-intestinale",
      "Ulcer healing": "Guérison des ulcères",
      "Gastric cytoprotection": "Cytoprotection gastrique",
      "IBD models": "Modèles de MICI",
      "Inflammatory bowel research": "Recherche sur les maladies inflammatoires de l'intestin",
      "Mucosal barrier": "Barrière muqueuse",
      "Gut integrity": "Intégrité intestinale",
      "Wound Healing": "Cicatrisation",
      "Skin repair": "Réparation cutanée",
      "Dermal regeneration": "Régénération dermique",
      "Angiogenesis": "Angiogenèse",
      "Blood vessel formation": "Formation des vaisseaux sanguins",
      "Fibroblast activity": "Activité des fibroblastes",
      "Collagen production": "Production de collagène",
      // Table/spec terms - French
      "Condition": "Condition",
      "Temperature": "Température",
      "Duration": "Durée",
      "Lyophilised": "Lyophilisé",
      "Reconstituted": "Reconstitué",
      "up to": "jusqu'à",
      "months": "mois",
      "weeks": "semaines",
      "Size": "Taille",
      "Price": "Prix",
      "From": "À partir de",
      "Minimum order": "Commande minimale",
      "discount on orders over": "réduction sur les commandes de plus de",
      // Features/Benefits - French
      "Guaranteed": "Garanti",
      "Full documentation": "Documentation complète",
      "COA with every order": "COA avec chaque commande",
      "UK laboratory tested": "Testé en laboratoire",
      "Quality assured": "Qualité assurée",
      "Express shipping available": "Expédition express disponible",
      "Research support": "Support de recherche",
      "Technical assistance": "Assistance technique",
      "Why Choose Peptide Shop": "Pourquoi Choisir Peptide Shop",
      "Peptide Shop supplies": "Peptide Shop fournit",
      // Product page section headings
      "Specification": "Spécification",
      "Detail": "Détail",
      "Reconstitution and Handling": "Reconstitution et Manipulation",
      "Reconstitution Protocol": "Protocole de Reconstitution",
      "Storage Recommendations": "Recommandations de Stockage",
      "For laboratory research only": "Pour la recherche en laboratoire uniquement",
      "Not intended for human or veterinary use": "Non destiné à un usage humain ou vétérinaire",
      "Researchers should follow all applicable regulations": "Les chercheurs doivent suivre toutes les réglementations applicables",
      "Allow vial to reach room temperature": "Laisser le flacon atteindre la température ambiante",
      "Add bacteriostatic water slowly": "Ajouter l'eau bactériostatique lentement",
      "Gently swirl": "Agiter doucement",
      "do not shake": "ne pas secouer",
      "Solution should be clear": "La solution doit être claire",
      "Specifications": "Spécifications",
      "CAS Number": "Numéro CAS",
      "Molecular Formula": "Formule Moléculaire",
      "Molecular Weight": "Poids Moléculaire",
      "Sequence": "Séquence",
      "Appearance": "Apparence",
      "White lyophilised powder": "Poudre lyophilisée blanche",
      "HPLC verified": "Vérifié par HPLC",
      // Bacteriostatic Water & Supplies - French
      "Bacteriostatic Water": "Eau bactériostatique",
      "bacteriostatic water": "eau bactériostatique",
      "BAC water": "Eau BAC",
      "Sterile Water": "Eau Stérile",
      "sterile water": "eau stérile",
      "Peptide Reconstitution": "Reconstitution de Peptides",
      "peptide reconstitution": "reconstitution de peptides",
      "for Peptide Research": "pour la Recherche sur les Peptides",
      "What is Bacteriostatic Water": "Qu'est-ce que l'Eau bactériostatique",
      "benzyl alcohol": "alcool benzylique",
      "bacteriostatic preservative": "conservateur bactériostatique",
      "inhibits the growth of bacteria": "inhibe la croissance des bactéries",
      "inhibits bacterial growth": "inhibe la croissance bactérienne",
      "reconstituting lyophilized": "reconstitution de peptides lyophilisés",
      "freeze-dried": "lyophilisés",
      "lyophilized": "lyophilisés",
      "for research applications": "pour applications de recherche",
      "multiple withdrawals": "prélèvements multiples",
      "from the same vial": "du même flacon",
      "are needed": "sont nécessaires",
      "Key Features": "Caractéristiques Clés",
      "USP Grade Quality": "Qualité USP",
      "USP Grade": "Qualité USP",
      "USP grade": "qualité USP",
      "Our bacteriostatic water meets": "Notre eau bactériostatique répond aux",
      "United States Pharmacopeia": "Pharmacopée des États-Unis",
      "USP standards": "normes USP",
      "standards for": "normes pour",
      "Sterility": "Stérilité",
      "Purity": "Pureté",
      "concentration": "concentration",
      "Endotoxin levels": "Niveaux d'endotoxines",
      "endotoxin levels": "niveaux d'endotoxines",
      "Multi-Use Design": "Conception Multi-Usage",
      "Unlike single-use": "Contrairement à l'usage unique",
      "single-use sterile water": "eau stérile à usage unique",
      "single-use": "usage unique",
      "allows multiple withdrawals": "permet des prélèvements multiples",
      "over several weeks": "pendant plusieurs semaines",
      "several weeks": "plusieurs semaines",
      "without contamination risk": "sans risque de contamination",
      "contamination risk": "risque de contamination",
      "cost-effective": "rentable",
      "for research laboratories": "pour les laboratoires de recherche",
      "research laboratories": "laboratoires de recherche",
      "Convenient": "Pratique",
      "convenient": "pratique",
      "Each": "Chaque",
      "each": "chaque",
      "vial can": "flacon peut",
      "can reconstitute": "peut reconstituer",
      "peptide vials": "flacons de peptides",
      "depending on concentration requirements": "selon les exigences de concentration",
      "How to Use": "Comment Utiliser",
      "How to use": "Comment utiliser",
      "Reconstitution Steps": "Étapes de Reconstitution",
      "Allow the peptide vial": "Laisser le flacon de peptide",
      "to reach room temperature": "atteindre la température ambiante",
      "Clean both vial tops": "Nettoyer les deux bouchons",
      "with an alcohol swab": "avec un tampon d'alcool",
      "alcohol swab": "tampon d'alcool",
      "Using a sterile syringe": "À l'aide d'une seringue stérile",
      "sterile syringe": "seringue stérile",
      "withdraw the desired amount": "prélever la quantité désirée",
      "desired amount": "quantité désirée",
      "Insert the needle": "Insérer l'aiguille",
      "into the peptide vial": "dans le flacon de peptide",
      "aiming at the glass wall": "en visant la paroi de verre",
      "glass wall": "paroi de verre",
      "Slowly inject": "Injecter lentement",
      "allowing it to run down": "en le laissant couler",
      "run down the vial wall": "couler le long de la paroi",
      "vial wall": "paroi du flacon",
      "until fully dissolved": "jusqu'à dissolution complète",
      "fully dissolved": "complètement dissous",
      "Store reconstituted peptide": "Conserver le peptide reconstitué",
      "reconstituted peptide": "peptide reconstitué",
      "Recommended Volumes": "Volumes Recommandés",
      "Peptide Amount": "Quantité de Peptide",
      "Suggested": "Suggéré",
      "suggested": "suggéré",
      "Concentration": "Concentration",
      "Storage": "Conservation",
      "Unopened": "Non ouvert",
      "unopened": "non ouvert",
      "away from direct light": "à l'abri de la lumière directe",
      "direct light": "lumière directe",
      "Opened": "Ouvert",
      "opened": "ouvert",
      "Use within": "Utiliser dans",
      "use within": "utiliser dans",
      "days": "jours",
      "Do not freeze": "Ne pas congeler",
      "do not freeze": "ne pas congeler",
      "Freezing may compromise sterility": "La congélation peut compromettre la stérilité",
      "may compromise sterility": "peut compromettre la stérilité",
      "Shelf life": "Durée de conservation",
      "shelf life": "durée de conservation",
      "years from manufacture date": "ans à partir de la date de fabrication",
      "manufacture date": "date de fabrication",
      "Applications in Research": "Applications en Recherche",
      "is essential for": "est essentiel pour",
      "essential for": "essentiel pour",
      "for in vitro studies": "pour les études in vitro",
      "in vitro studies": "études in vitro",
      "Preparation of stock solutions": "Préparation de solutions mères",
      "stock solutions": "solutions mères",
      "Multi-day research protocols": "Protocoles de recherche sur plusieurs jours",
      "research protocols": "protocoles de recherche",
      "requiring repeat sampling": "nécessitant des prélèvements répétés",
      "repeat sampling": "prélèvements répétés",
      "sterility must be maintained": "la stérilité doit être maintenue",
      "maintained over time": "maintenue dans le temps",
      "over time": "dans le temps",
      "Comparison": "Comparaison",
      "comparison": "comparaison",
      "Feature": "Caractéristique",
      "feature": "caractéristique",
      "Preservative": "Conservateur",
      "preservative": "conservateur",
      "Multiple Uses": "Utilisations Multiples",
      "multiple uses": "utilisations multiples",
      "Single use only": "Usage unique seulement",
      "single use only": "usage unique seulement",
      "Bacterial Growth": "Croissance Bactérienne",
      "bacterial growth": "croissance bactérienne",
      "Inhibited": "Inhibée",
      "inhibited": "inhibée",
      "Possible after opening": "Possible après ouverture",
      "after opening": "après ouverture",
      "Best For": "Idéal Pour",
      "best for": "idéal pour",
      "Multi-dose peptides": "Peptides multi-doses",
      "multi-dose": "multi-doses",
      "Single-dose applications": "Applications mono-dose",
      "single-dose": "mono-dose",
      "Every batch": "Chaque lot",
      "every batch": "chaque lot",
      "undergoes testing": "subit des tests",
      "testing for": "tests pour",
      "Tested per": "Testé selon",
      "tested per": "testé selon",
      "Particulate Matter": "Particules",
      "particulate matter": "particules",
      "Content": "Contenu",
      "content": "contenu",
      "Verified at": "Vérifié à",
      "verified at": "vérifié à",
      "Popular": "Populaire",
      "popular": "populaire",
      "healing peptide": "peptide cicatrisant",
      "Recovery peptide": "Peptide de récupération",
      "recovery peptide": "peptide de récupération",
      "GLP-1 agonist": "agoniste GLP-1",
      // Product-specific headings and terms - French
      "Important Research Use Notice": "Avis Important d'Utilisation pour la Recherche",
      "Order Today": "Commander Aujourd'hui",
      "Order": "Commander",
      "Today": "Aujourd'hui",
      "Work": "Fonctionner",
      "Peptide Specifications": "Spécifications du Peptide",
      // Research categories
      "Obesity Research": "Recherche sur l'Obésité",
      "Metabolic Research": "Recherche Métabolique",
      "Gene Expression": "Expression Génique",
      "GH Axis Studies": "Études de l'Axe GH",
      "Delivery Options": "Options de Livraison",
      "Available Package Sizes": "Tailles de Conditionnement Disponibles",
      "Guaranteed Purity": "Pureté Garantie",
      "UK-Based Delivery": "Livraison depuis la France",
      "Weight Management Studies": "Études de Gestion du Poids",
      "Tissue Repair": "Réparation Tissulaire",
      "Selectivity Profile": "Profil de Sélectivité",
      "Selective Action": "Action Sélective",
      "Research Support": "Support de Recherche",
      "Neuroprotection": "Neuroprotection",
      "Lipolytic Activity": "Activité Lipolytique",
      "GHS-R Activation": "Activation GHS-R",
      "Diabetes Research": "Recherche sur le Diabète",
      "Comparative Incretin Research": "Recherche Comparative sur les Incrétines",
      "Combination Research": "Recherche Combinée",
      "Cognitive Research": "Recherche Cognitive",
      "Central Nervous System Actions": "Actions sur le Système Nerveux Central",
      "Key Differences": "Différences Clés",
      // Additional Research Headers - French
      "Actin Regulation": "Régulation de l'actine",
      "Adipose Tissue": "Tissu adipeux",
      "Adipose Tissue Effects": "Effets sur le tissu adipeux",
      "Ageing Research": "Recherche sur le vieillissement",
      "Anti-Inflammatory Research": "Recherche anti-inflammatoire",
      "Anti-Lipogenic Effects": "Effets anti-lipogéniques",
      "Anxiety Research": "Recherche sur l'anxiété",
      "Appetite Research": "Recherche sur l'appétit",
      "Appetite and Obesity Research": "Recherche sur l'appétit et l'obésité",
      "Cardiovascular Research": "Recherche cardiovasculaire",
      "Cell Biology": "Biologie cellulaire",
      "Central Nervous System Effects": "Effets sur le système nerveux central",
      "Circadian Research": "Recherche circadienne",
      "Collagen & ECM": "Collagène et MEC",
      "Competitive Pricing": "Prix compétitifs",
      "Comprehensive Documentation": "Documentation complète",
      "Convenient 10ml Size": "Format pratique de 10ml",
      "Copper Delivery": "Apport de cuivre",
      "DNA Repair": "Réparation de l'ADN",
      "Dedicated Support": "Support dédié",
      "Direct AMPK Activation": "Activation directe de l'AMPK",
      "Dopamine Effects": "Effets sur la dopamine",
      "Downstream Pathways": "Voies en aval",
      "Dual Incretin Receptor Activation": "Activation double des récepteurs incrétines",
      "Energy Expenditure Studies": "Études sur la dépense énergétique",
      "Energy Metabolism": "Métabolisme énergétique",
      "Exercise Mimetics": "Mimétiques de l'exercice",
      "Fat Metabolism": "Métabolisme des graisses",
      "Fat Metabolism Studies": "Études sur le métabolisme des graisses",
      "GABA System": "Système GABA",
      "GH Axis Research": "Recherche sur l'axe GH",
      "GHRH Receptor Activation": "Activation du récepteur GHRH",
      "GIP Receptor Activation": "Activation du récepteur GIP",
      "GLP-1 Receptor Activation": "Activation du récepteur GLP-1",
      "Gastric Effects": "Effets gastriques",
      "Gastrointestinal Effects": "Effets gastro-intestinaux",
      "Glucagon Receptor Activation": "Activation du récepteur du glucagon",
      "Hepatic Metabolism Research": "Recherche sur le métabolisme hépatique",
      "Immunology": "Immunologie",
      "Inflammation Modulation": "Modulation de l'inflammation",
      "Inflammatory Disease Models": "Modèles de maladies inflammatoires",
      "Longevity Research": "Recherche sur la longévité",
      "Melanocortin Receptor Family": "Famille des récepteurs de la mélanocortine",
      "Melanogenesis Pathway": "Voie de la mélanogenèse",
      "Metabolic Effects": "Effets métaboliques",
      "Metabolic Studies": "Études métaboliques",
      "Metabolic Syndrome Studies": "Études sur le syndrome métabolique",
      "Metabolism": "Métabolisme",
      "Methylation Balance": "Équilibre de méthylation",
      "Modified Stability": "Stabilité modifiée",
      "Monoamine Regulation": "Régulation des monoamines",
      "NAD+ Metabolism": "Métabolisme du NAD+",
      "Neuroendocrine": "Neuroendocrinien",
      "Neuroplasticity": "Neuroplasticité",
      "Neuroscience": "Neuroscience",
      "Neuroscience Applications": "Applications en neurosciences",
      "Neurotransmitter Effects": "Effets sur les neurotransmetteurs",
      "Neurotrophin Modulation": "Modulation des neurotrophines",
      "Norepinephrine Effects": "Effets sur la noradrénaline",
      "Obesity Studies": "Études sur l'obésité",
      "Other Effects": "Autres effets",
      "Pancreatic Beta-Cell Effects": "Effets sur les cellules bêta pancréatiques",
      "Pancreatic Effects": "Effets pancréatiques",
      "Pigmentation Research": "Recherche sur la pigmentation",
      "Pineal Function": "Fonction pinéale",
      "Pituitary Function": "Fonction pituitaire",
      "Pulsatile vs Sustained Release": "Libération pulsatile vs soutenue",
      "Receptor Activation": "Activation des récepteurs",
      "Satiety Signalling": "Signalisation de la satiété",
      "Secondary Effects": "Effets secondaires",
      "Serotonin Effects": "Effets sur la sérotonine",
      "Sexual Function Studies": "Études sur la fonction sexuelle",
      "Sirtuin Activation": "Activation des sirtuines",
      "Skin Disorder Research": "Recherche sur les troubles cutanés",
      "Skin Research": "Recherche sur la peau",
      "Sleep Regulation": "Régulation du sommeil",
      "Sleep Research": "Recherche sur le sommeil",
      "Stress Research": "Recherche sur le stress",
      "Synergistic Metabolic Effects": "Effets métaboliques synergiques",
      "Synergy with GHRH": "Synergie avec GHRH",
      "Telomerase Activation": "Activation de la télomérase",
      "UK-Based Supplier": "Fournisseur basé en France",
      "UK-Based Supply": "Approvisionnement basé en France",
      "Verified Purity": "Pureté vérifiée",
      "Weight Management Research": "Recherche sur la gestion du poids",
      // Scientific terms
      "synthetic analogue": "analogue synthétique",
      "analogue": "analogue",
      "analog": "analogue",
      "hormone": "hormone",
      "receptor": "récepteur",
      "receptor agonist": "agoniste du récepteur",
      "agonist": "agoniste",
      "antagonist": "antagoniste",
      "binding": "liaison",
      "affinity": "affinité",
      "selectivity": "sélectivité",
      "mechanism": "mécanisme",
      "pathway": "voie de signalisation",
      "signalling": "signalisation",
      "activation": "activation",
      "inhibition": "inhibition",
      "modulation": "modulation",
      "expression": "expression",
      "regulation": "régulation",
      "metabolism": "métabolisme",
      "metabolic": "métabolique",
      "glucose": "glucose",
      "insulin": "insuline",
      "insulin secretion": "sécrétion d'insuline",
      "appetite regulation": "régulation de l'appétit",
      "appetite": "appétit",
      "weight management": "gestion du poids",
      "weight loss": "perte de poids",
      "obesity": "obésité",
      "diabetes": "diabète",
      "type 2 diabetes": "diabète de type 2",
      "blood sugar": "glycémie",
      "half-life": "demi-vie",
      "bioavailability": "biodisponibilité",
      "pharmacokinetics": "pharmacocinétique",
      "pharmacodynamics": "pharmacodynamique",
      // Product descriptions
      "research peptide": "peptide de recherche",
      "research-grade": "qualité recherche",
      "pharmaceutical grade": "qualité pharmaceutique",
      "raw peptide": "peptide brut",
      "active pharmaceutical ingredient": "principe actif pharmaceutique",
      "brand-name": "marque",
      "prescription medications": "médicaments sur ordonnance",
      "laboratory research purposes": "fins de recherche en laboratoire",
      "human consumption": "consommation humaine",
      "medical treatment": "traitement médical",
      "not for human use": "pas pour usage humain",
      "for research only": "pour la recherche uniquement",
      "research only": "recherche uniquement",
      // Quality and purity
      "HPLC analysis": "analyse HPLC",
      "mass spectrometry": "spectrométrie de masse",
      "Certificate of Analysis": "Certificat d'Analyse",
      "COA": "COA",
      "batch": "lot",
      "lot": "lot",
      "identity": "identité",
      "peptide content": "teneur en peptide",
      "quality control": "contrôle qualité",
      "strict quality control": "contrôle qualité strict",
      "manufacturing": "fabrication",
      "shipping": "expédition",
      // Storage terms
      "long-term stability": "stabilité à long terme",
      "refrigerator": "réfrigérateur",
      "freeze-thaw cycles": "cycles de congélation-décongélation",
      "protect from light": "protéger de la lumière",
      "airtight containers": "conteneurs hermétiques",
      "moisture absorption": "absorption d'humidité",
      "properly stored": "correctement stocké",
      // Reconstitution
      "sterile bacteriostatic water": "eau bactériostatique stérile",
      "alkaline buffer": "tampon alcalin",
      "isoelectric point": "point isoélectrique",
      "peptide degradation": "dégradation du peptide",
      "dissolution": "dissolution",
      "dissolve": "dissoudre",
      // Delivery
      "next day delivery": "livraison le lendemain",
      "standard shipping": "expédition standard",
      "express delivery": "livraison express",
      "international shipping": "expédition internationale",
      "customs delays": "retards douaniers",
      "overseas orders": "commandes internationales",
      "tracked delivery": "livraison suivie",
      "discrete packaging": "emballage discret",
      "cold packs": "packs réfrigérants",
      "dry ice": "glace sèche",
      // Ordering
      "minimum order": "commande minimale",
      "bulk pricing": "prix de gros",
      "custom orders": "commandes personnalisées",
      "institutional research": "recherche institutionnelle",
      "larger quantities": "quantités plus importantes",
      "package sizes": "tailles de conditionnement",
      "vial": "flacon",
      "vials": "flacons",
      // Scientific activities
      "binding assays": "essais de liaison",
      "receptor binding": "liaison au récepteur",
      "in vivo": "in vivo",
      "disease models": "modèles de maladie",
      "research models": "modèles de recherche",
      "pilot studies": "études pilotes",
      "published literature": "littérature publiée",
      "published data": "données publiées",
      "reference standards": "standards de référence",
      "reproducible results": "résultats reproductibles",
      "consistent quality": "qualité constante",
      "batch-to-batch": "lot à lot",
      // Body/biological terms
      "intestines": "intestins",
      "gastric": "gastrique",
      "beta-cell": "cellule bêta",
      "beta-cell function": "fonction des cellules bêta",
      "gastric emptying": "vidange gastrique",
      "neuroprotective": "neuroprotecteur",
      "serum albumin": "albumine sérique",
      "albumin binding": "liaison à l'albumine",
      "biological half-life": "demi-vie biologique",
      "prolonged activity": "activité prolongée",
      "sustained activation": "activation soutenue",
      "**5-Amino-1MQ** (5-Amino-1-Methylquinolinium) is a selective inhibitor of nicotinamide N-methyltransferase (NNMT), an enzyme increasingly recognised as a key regulator of cellular metabolism, NAD+ homeostasis, and adipose tissue function. This research compound has emerged as an important tool for studying the intersection of epigenetics, energy metabolism, and ageing.": "**5-Amino-1MQ** (5-Amino-1-Méthylquinolinium) est un inhibiteur sélectif de la nicotinamide N-méthyltransférase (NNMT), une enzyme de plus en plus reconnue comme un régulateur clé du métabolisme cellulaire, de l'homéostasie du NAD+ et de la fonction du tissu adipeux. Ce composé de recherche est devenu un outil important pour étudier l'intersection de l'épigénétique, du métabolisme énergétique et du vieillissement.",
      "**AOD-9604** (Anti-Obesity Drug 9604) is a modified fragment of human growth hormone comprising amino acids 177-191 of the C-terminal region, with an additional tyrosine residue at the N-terminus. This synthetic peptide was specifically designed to isolate the fat-metabolising properties of growth hormone without its growth-promoting or diabetogenic effects.": "**AOD-9604** (Anti-Obesity Drug 9604) est un fragment modifié de l'hormone de croissance humaine comprenant les acides aminés 177-191 de la région C-terminale, avec un résidu de tyrosine supplémentaire à l'extrémité N-terminale. Ce peptide synthétique a été spécifiquement conçu pour isoler les propriétés de métabolisation des graisses de l'hormone de croissance sans ses effets favorisant la croissance ou diabétogènes.",
      '**BPC-157** (Body Protection Compound-157) is a synthetic pentadecapeptide (15 amino acids) derived from a protein found in human gastric juice. Since its discovery, BPC-157 has become one of the most extensively studied peptides in tissue healing and regeneration research. For published research, see [PubMed studies on BPC-157](https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157){:target="_blank" rel="noopener"}.': `**BPC-157** (Body Protection Compound-157) est un pentadécapeptide synthétique (15 acides aminés) dérivé d'une protéine présente dans le suc gastrique humain. Depuis sa découverte, le BPC-157 est devenu un des peptides les plus étudiés dans la recherche sur la cicatrisation et la régénération des tissus. Pour les recherches publiées, voir [Études PubMed sur le BPC-157](https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157){:target="_blank" rel="noopener"}.`,
      "**CJC-1295 No DAC** (also known as Modified GRF 1-29 or Mod GRF) is a synthetic analog of growth hormone-releasing hormone (GHRH) with specific amino acid modifications that enhance its stability and half-life. Unlike CJC-1295 with DAC, this version lacks the Drug Affinity Complex, producing pulsatile rather than sustained GH release patterns.": "**CJC-1295 No DAC** (également connu sous le nom de Modified GRF 1-29 ou Mod GRF) est un analogue synthétique de l'hormone de libération de l'hormone de croissance (GHRH) avec des modifications spécifiques d'acides aminés qui améliorent sa stabilité et sa demi-vie. Contrairement au CJC-1295 avec DAC, cette version est dépourvue du complexe d'affinité médicamenteuse (Drug Affinity Complex), produisant des modèles de libération de GH pulsatiles plutôt que soutenus.",
      "**Cagrilintide** (AM833, NN9838) is a long-acting acylated analog of human amylin, a peptide hormone co-secreted with insulin from pancreatic beta cells. Through fatty acid acylation, cagrilintide achieves an extended half-life enabling once-weekly research dosing, making it an invaluable tool for studying amylin's role in satiety and metabolic regulation.": "**Cagrilintide** (AM833, NN9838) est un analogue acylé à longue action de l'amyline humaine, une hormone peptidique co-sécrétée avec l'insuline par les cellules bêta pancréatiques. Grâce à l'acylation des acides gras, le cagrilintide atteint une demi-vie prolongée permettant un dosage de recherche une fois par semaine, ce qui en fait un outil inestimable pour étudier le rôle de l'amyline dans la satiété et la régulation métabolique.",
      "**DSIP** (Delta Sleep-Inducing Peptide) is a nonapeptide first isolated from rabbit brain in 1977 during research into sleep physiology. The peptide was named for its ability to promote delta wave sleep patterns in research models.": "**DSIP** (Delta Sleep-Inducing Peptide) est un nonapeptide isolé pour la première fois du cerveau de lapin en 1977 lors de recherches sur la physiologie du sommeil. Le peptide a été nommé pour sa capacité à favoriser les modèles de sommeil à ondes delta dans les modèles de recherche.",
      "**Epitalon** (Epithalon, AEDG peptide) is a synthetic tetrapeptide based on epithalamin, a pineal gland extract extensively studied for its effects on telomerase activation and cellular ageing. Developed from decades of Russian research, Epitalon has become a key tool in longevity and anti-ageing research.": "**Epitalon** (Epithalon, peptide AEDG) est un tétrapeptide synthétique basé sur l'épithalamine, un extrait de la glande pinéale largement étudié pour ses effets sur l'activation de la télomérase et le vieillissement cellulaire. Développé à partir de décennies de recherches russes, l'Epitalon est devenu un outil clé dans la recherche sur la longévité et l'anti-âge.",
      "**GHK-Cu** (Copper Tripeptide-1) is a naturally occurring copper-peptide complex consisting of three amino acids (glycine-histidine-lysine) bound to a copper ion. Found in human plasma, saliva, and urine, GHK-Cu concentrations naturally decline with age.": "**GHK-Cu** (Cuivre Tripeptide-1) est un complexe cuivre-peptide naturel composé de trois acides aminés (glycine-histidine-lysine) liés à un ion cuivre. Présent dans le plasma humain, la salive et l'urine, les concentrations de GHK-Cu diminuent naturellement avec l'âge.",
      "**GHRP-2** (Growth Hormone Releasing Peptide-2, Pralmorelin) is a synthetic hexapeptide that stimulates growth hormone release through activation of the ghrelin receptor (GHS-R1a). GHRP-2 is considered more selective than GHRP-6, producing robust GH release with less pronounced effects on appetite, cortisol, and prolactin.": "**GHRP-2** (Growth Hormone Releasing Peptide-2, Pralmoreline) est un hexapeptide synthétique qui stimule la libération de l'hormone de croissance par l'activation du récepteur de la ghréline (GHS-R1a). Le GHRP-2 est considéré comme plus sélectif que le GHRP-6, produisant une forte libération de GH avec des effets moins prononcés sur l'appétit, le cortisol et la prolactine.",
      "**GHRP-6** (Growth Hormone Releasing Peptide-6) is a synthetic hexapeptide that stimulates growth hormone release through activation of the ghrelin receptor (GHS-R1a). As one of the first synthetic GH secretagogues developed, GHRP-6 has extensive research documentation and remains a valuable tool for studying growth hormone physiology.": "**GHRP-6** (Growth Hormone Releasing Peptide-6) est un hexapeptide synthétique qui stimule la libération de l'hormone de croissance par l'activation du récepteur de la ghréline (GHS-R1a). En tant que l'un des premiers sécrétagogues de GH synthétiques développés, le GHRP-6 dispose d'une documentation de recherche approfondie et reste un outil précieux pour étudier la physiologie de l'hormone de croissance.",
      "**HGH Fragment 176-191** is a synthetic peptide comprising the C-terminal portion of human growth hormone (amino acids 176-191). This specific region has been identified as responsible for GH's lipolytic (fat-burning) activity without the hormone's growth-promoting effects.": "**HGH Fragment 176-191** est un peptide synthétique comprenant la partie C-terminale de l'hormone de croissance humaine (acides aminés 176-191). Cette région spécifique a été identifiée comme responsable de l'activité lipolytique (brûle-graisse) de la GH sans les effets favorisant la croissance de l'hormone.",
      "**Ipamorelin** is a synthetic pentapeptide growth hormone secretagogue that selectively stimulates growth hormone (GH) release from pituitary somatotrope cells. Distinguished by its high selectivity, ipamorelin causes minimal effects on cortisol and prolactin levels, making it an invaluable research tool for studying isolated GH secretion mechanisms.": "**Ipamorelin** est un sécrétagogue d'hormone de croissance pentapeptidique synthétique qui stimule sélectivement la libération de l'hormone de croissance (GH) à partir des cellules somatotropes hypophysaires. Distingué par sa haute sélectivité, l'ipamoréline provoque des effets minimes sur les niveaux de cortisol et de prolactine, ce qui en fait un outil de recherche inestimable pour étudier les mécanismes isolés de sécrétion de GH.",
      "**Melanotan 2** (MT-2, MT-II) is a synthetic cyclic heptapeptide analogue of alpha-melanocyte stimulating hormone (α-MSH). Originally developed at the University of Arizona in the 1980s, this research peptide has become an essential tool for studying melanocortin receptor signalling and the regulation of skin pigmentation.": "**Melanotan 2** (MT-2, MT-II) est un analogue heptapeptidique cyclique synthétique de l'hormone alpha-mélanostimulante (α-MSH). Développé à l'origine à l'Université de l'Arizona dans les années 1980, ce peptide de recherche est devenu un outil essentiel pour étudier la signalisation des récepteurs de la mélanocortine et la régulation de la pigmentation de la peau.",
      "**NAD+** (Nicotinamide Adenine Dinucleotide) is a coenzyme found in all living cells that plays fundamental roles in energy metabolism, DNA repair, and cellular signalling. NAD+ is essential for hundreds of enzymatic reactions and is a key regulator of cellular health.": "**NAD+** (Nicotinamide Adénine Dinucléotide) est une coenzyme présente dans toutes les cellules vivantes qui joue un rôle fondamental dans le métabolisme énergétique, la réparation de l'ADN et la signalisation cellulaire. Le NAD+ est essentiel à des centaines de réactions enzymatiques et est un régulateur clé de la santé cellulaire.",
      "**O-304** is a novel small molecule that directly activates AMPK (AMP-activated protein kinase), the master regulator of cellular energy homeostasis. Unlike indirect activators like metformin, O-304 binds directly to AMPK's β1 subunit.": "**O-304** est une nouvelle petite molécule qui active directement l'AMPK (protéine kinase activée par l'AMP), le régulateur principal de l'homéostasie énergétique cellulaire. Contrairement aux activateurs indirects comme la metformine, l'O-304 se lie directement à la sous-unité β1 de l'AMPK.",
      "**Retatrutide** (LY3437943) is a novel synthetic peptide that functions as a triple agonist of three key metabolic receptors: glucagon-like peptide-1 (GLP-1), glucose-dependent insulinotropic polypeptide (GIP), and glucagon receptors. This unprecedented triple mechanism of action makes Retatrutide the most comprehensive incretin-based research tool currently available.": "**Retatrutide** (LY3437943) est un nouveau peptide synthétique qui fonctionne comme un triple agoniste de trois récepteurs métaboliques clés : le peptide-1 de type glucagon (GLP-1), le polypeptide insulinotrope dépendant du glucose (GIP) et les récepteurs du glucagon. Ce triple mécanisme d'action sans précédent fait du Rétatrutide l'outil de recherche à base d'incrétine le plus complet actuellement disponible.",
      "**Selank** (TP-7) is a synthetic heptapeptide developed in Russia as a modified analogue of tuftsin, a naturally occurring immunomodulatory peptide. Selank has been extensively studied for its anxiolytic, nootropic, and immunomodulatory properties.": "**Selank** (TP-7) est un heptapeptide synthétique développé en Russie en tant qu'analogue modifié de la tuftsine, un peptide immunomodulateur naturel. Le Selank a été largement étudié pour ses propriétés anxiolytiques, nootropiques et immunomodulatrices.",
      '**Semaglutide** is a synthetic analogue of human Glucagon-Like Peptide-1 (GLP-1), a hormone naturally produced in the intestines that plays a crucial role in glucose metabolism and appetite regulation. This research peptide has gained significant attention in scientific communities worldwide for its applications in metabolic research, particularly in studies related to type 2 diabetes and obesity. For comprehensive background information, see the [PubChem compound entry for Semaglutide](https://pubchem.ncbi.nlm.nih.gov/compound/Semaglutide){:target="_blank" rel="noopener"}.': `**Sémaglutide** est un analogue synthétique du peptide-1 de type glucagon humain (GLP-1), une hormone naturellement produite dans les intestins qui joue un rôle crucial dans le métabolisme du glucose et la régulation de l'appétit. Ce peptide de recherche a attiré une attention considérable dans les communautés scientifiques du monde entier pour ses applications dans la recherche métabolique, en particulier dans les études liées au diabète de type 2 et à l'obésité. Pour des informations générales complètes, voir l'[entrée du composé PubChem pour le Sémaglutide](https://pubchem.ncbi.nlm.nih.gov/compound/Semaglutide){:target="_blank" rel="noopener"}.`,
      "**Semax** is a synthetic heptapeptide developed in Russia, based on the ACTH(4-10) fragment of adrenocorticotropic hormone. Unlike full ACTH, Semax lacks hormonal activity but retains potent nootropic and neuroprotective properties.": "**Semax** est un heptapeptide synthétique développé en Russie, basé sur le fragment ACTH(4-10) de l'hormone adrénocorticotrope. Contrairement à l'ACTH complète, le Semax est dépourvu d'activité hormonale mais conserve de puissantes propriétés nootropiques et neuroprotectrices.",
      "**TB-500** is a synthetic peptide representing the active region of Thymosin Beta-4 (Tβ4), a naturally occurring protein found in virtually all human and animal cells. Thymosin Beta-4 is a 43-amino acid protein that plays critical roles in cell migration, angiogenesis, and tissue repair.": "**TB-500** est un peptide synthétique représentant la région active de la Thymosine Bêta-4 (Tβ4), une protéine naturelle présente dans pratiquement toutes les cellules humaines et animales. La Thymosine Bêta-4 est une protéine de 43 acides aminés qui joue un rôle essentiel dans la migration cellulaire, l'angiogenèse et la réparation tissulaire.",
      "**Tesofensine** (NS2330) is a triple monoamine reuptake inhibitor that blocks the presynaptic reuptake of norepinephrine, dopamine, and serotonin. Originally developed for neurodegenerative disease research, tesofensine has become an important tool for studying the neurological basis of appetite regulation and energy homeostasis.": "**Tesofensine** (NS2330) est un triple inhibiteur de la recapture des monoamines qui bloque la recapture présynaptique de la noradrénaline, de la dopamine et de la sérotonine. Développé à l'origine pour la recherche sur les maladies neurodégénératives, la tésofensine est devenue un outil important pour étudier les bases neurologiques de la régulation de l'appétit et de l'homéostasie énergétique.",
      "**Tirzepatide** is a novel synthetic peptide that functions as a dual agonist of two key incretin hormone receptors: glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1). This unique dual mechanism of action distinguishes Tirzepatide from single-target GLP-1 receptor agonists like semaglutide, making it an invaluable tool for metabolic research.": "**Tirzépatide** est un nouveau peptide synthétique qui fonctionne comme un double agoniste de deux récepteurs clés de l'hormone incrétine : le polypeptide insulinotrope dépendant du glucose (GIP) et le peptide-1 de type glucagon (GLP-1). Ce double mécanisme d'action unique distingue le tirzépatide des agonistes des récepteurs du GLP-1 à cible unique comme le sémaglutide, ce qui en fait un outil inestimable pour la recherche métabolique.",
      "1. Allow the peptide vial to reach room temperature": "1. Laissez le flacon de peptide atteindre la température ambiante",
      "2. Clean both vial tops with an alcohol swab": "2. Nettoyez les deux bouchons des flacons avec un tampon d'alcool",
      "3. Using a sterile syringe, withdraw the desired amount of bacteriostatic water": "3. À l'aide d'une seringue stérile, prélevez la quantité souhaitée d'eau bactériostatique",
      "4. Insert the needle into the peptide vial, aiming at the glass wall": "4. Insérez l'aiguille dans le flacon de peptide, en visant la paroi en verre",
      "5-Amino-1MQ inhibits NNMT, affecting multiple metabolic pathways:": "Le 5-Amino-1MQ inhibe la NNMT, affectant de multiples voies métaboliques :",
      "5. Slowly inject the water, allowing it to run down the vial wall": "5. Injectez lentement l'eau, en la laissant couler le long de la paroi du flacon",
      "6. Gently swirl (do not shake) until fully dissolved": "6. Faites tourner doucement (ne pas secouer) jusqu'à dissolution complète",
      "7. Store reconstituted peptide at 2-8°C": "7. Conservez le peptide reconstitué à 2-8°C",
      "A key research advantage is its selectivity:": "Un avantage clé pour la recherche est sa sélectivité :",
      "AOD-9604 also inhibits fat accumulation:": "L'AOD-9604 inhibe également l'accumulation de graisse :",
      "AOD-9604's mechanism of action centres on its ability to stimulate lipolysis and inhibit lipogenesis in adipose tissue, mimicking a specific subset of growth hormone's metabolic effects.": "Le mécanisme d'action de l'AOD-9604 se concentre sur sa capacité à stimuler la lipolyse et à inhiber la lipogenèse dans le tissu adipeux, imitant un sous-ensemble spécifique des effets métaboliques de l'hormone de croissance.",
      "Amylin complements insulin's glucose-lowering effects through distinct mechanisms including gastric emptying delay, glucagon suppression, and central satiety signalling. Cagrilintide provides researchers with a stable, long-acting tool to investigate these pathways in extended experimental paradigms.": "L'amyline complète les effets hypoglycémiants de l'insuline par des mécanismes distincts, notamment le retard de la vidange gastrique, la suppression du glucagon et la signalisation centrale de la satiété. Le cagrilintide fournit aux chercheurs un outil stable et à longue durée d'action pour étudier ces voies dans des paradigmes expérimentaux étendus.",
      "Anti-inflammatory properties are actively investigated:": "Les propriétés anti-inflammatoires sont activement étudiées :",
      "Bacteriostatic water (BAC water) is sterile water containing 0.9% benzyl alcohol, a bacteriostatic preservative that inhibits the growth of bacteria. This makes it ideal for reconstituting lyophilized (freeze-dried) peptides for research applications where multiple withdrawals from the same vial are needed.": "L'eau bactériostatique (eau BAC) est de l'eau stérile contenant 0,9 % d'alcool benzylique, un conservateur bactériostatique qui inhibe la croissance des bactéries. Cela la rend idéale pour reconstituer les peptides lyophilisés pour des applications de recherche où de multiples prélèvements dans le même flacon sont nécessaires.",
      "Beyond sleep regulation, DSIP has demonstrated effects on stress response, pain perception, and neuroendocrine function, making it a versatile tool for neuroscience research.": "Au-delà de la régulation du sommeil, le DSIP a démontré des effets sur la réponse au stress, la perception de la douleur et la fonction neuroendocrinienne, ce qui en fait un outil polyvalent pour la recherche en neurosciences.",
      "Broader metabolic applications:": "Applications métaboliques plus larges :",
      "By isolating this fragment, researchers can study GH's fat metabolism effects independently of IGF-1 elevation, glucose effects, and tissue growth, providing a cleaner tool for adipose biology research.": "En isolant ce fragment, les chercheurs peuvent étudier les effets du métabolisme des graisses de la GH indépendamment de l'élévation de l'IGF-1, des effets du glucose et de la croissance tissulaire, fournissant un outil plus propre pour la recherche sur la biologie adipeuse.",
      "Cagrilintide activates amylin receptors (AMY1, AMY2, AMY3), which are complexes of the calcitonin receptor with receptor activity-modifying proteins (RAMPs).": "Le cagrilintide active les récepteurs de l'amyline (AMY1, AMY2, AMY3), qui sont des complexes du récepteur de la calcitonine avec des protéines modificatrices de l'activité des récepteurs (RAMP).",
      "Cagrilintide is often studied with GLP-1 agonists:": "Le cagrilintide est souvent étudié avec des agonistes du GLP-1 :",
      "Central effects include:": "Les effets centraux incluent :",
      "Core applications in diabetes studies include:": "Les applications principales dans les études sur le diabète incluent :",
      "Dermatological applications extend beyond pigmentation:": "Les applications dermatologiques s'étendent au-delà de la pigmentation :",
      "Developed as a ghrelin receptor (GHS-R) agonist, ipamorelin represents one of the most selective GH releasing peptides (GHRPs) available for research. Its clean pharmacological profile enables researchers to study GH axis physiology without the confounding effects seen with less selective compounds.": "Développé comme un agoniste du récepteur de la ghréline (GHS-R), l'ipamoréline représente l'un des peptides libérateurs de GH (GHRP) les plus sélectifs disponibles pour la recherche. Son profil pharmacologique propre permet aux chercheurs d'étudier la physiologie de l'axe GH sans les effets confondants observés avec des composés moins sélectifs.",
      "Each 10ml vial can reconstitute 5-10 peptide vials depending on concentration requirements.": "Chaque flacon de 10 ml peut reconstituer 5 à 10 flacons de peptides selon les exigences de concentration.",
      "Emerging areas of investigation include:": "Les domaines d'investigation émergents incluent :",
      "Emerging evidence suggests GLP-1 receptor agonists may have cardiovascular effects beyond glucose control, leading to research investigating:": "Des preuves émergentes suggèrent que les agonistes des récepteurs GLP-1 peuvent avoir des effets cardiovasculaires au-delà du contrôle de la glycémie, conduisant à des recherches sur :",
      "Emerging research also explores Semaglutide's potential neuroprotective properties, with studies investigating its effects in models of Alzheimer's disease, Parkinson's disease, and stroke.": "La recherche émergente explore également les propriétés neuroprotectrices potentielles du sémaglutide, avec des études examinant ses effets dans des modèles de la maladie d'Alzheimer, de la maladie de Parkinson et des accidents vasculaires cérébraux.",
      "Emerging research explores melanocortin anti-inflammatory properties:": "La recherche émergente explore les propriétés anti-inflammatoires de la mélanocortine :",
      "Extensive research has demonstrated Semax's effects on cognitive function, BDNF expression, and neuroprotection, making it a valuable tool for neuroscience research.": "Des recherches approfondies ont démontré les effets du Semax sur la fonction cognitive, l'expression du BDNF et la neuroprotection, ce qui en fait un outil précieux pour la recherche en neurosciences.",
      "GIP receptor engagement adds complementary effects:": "L'engagement du récepteur GIP ajoute des effets complémentaires :",
      "GLP-1 receptor activation slows gastric emptying, which may contribute to prolonged satiety and reduced postprandial glucose excursions. Researchers studying gut-brain axis signalling find Semaglutide particularly useful for investigating these gastrointestinal regulatory mechanisms.": "L'activation du récepteur GLP-1 ralentit la vidange gastrique, ce qui peut contribuer à une satiété prolongée et à une réduction des excursions glycémiques postprandiales. Les chercheurs étudiant la signalisation de l'axe intestin-cerveau trouvent le sémaglutide particulièrement utile pour étudier ces mécanismes de régulation gastro-intestinale.",
      "Glucagon's hepatic effects enable liver-focused studies:": "Les effets hépatiques du glucagon permettent des études centrées sur le foie :",
      "In pancreatic beta cells, GLP-1 receptor activation by Semaglutide triggers glucose-dependent insulin secretion through the cAMP-PKA signalling pathway. This glucose-dependent mechanism is particularly noteworthy in research, as it suggests reduced risk of hypoglycaemia compared to insulin secretagogues that work independently of glucose levels.": "Dans les cellules bêta pancréatiques, l'activation du récepteur GLP-1 par le sémaglutide déclenche la sécrétion d'insuline dépendante du glucose via la voie de signalisation AMPc-PKA. Ce mécanisme dépendant du glucose est particulièrement remarquable dans la recherche, car il suggère un risque réduit d'hypoglycémie par rapport aux sécrétagogues de l'insuline qui agissent indépendamment des niveaux de glucose.",
      "In pancreatic beta cells, Tirzepatide activates both GIP and GLP-1 receptors, leading to:": "Dans les cellules bêta pancréatiques, le tirzépatide active à la fois les récepteurs GIP et GLP-1, entraînant :",
      "Interest in NAD+ has surged due to its central role in ageing research, particularly its relationship with sirtuins and cellular repair mechanisms. NAD+ levels naturally decline with age, driving research into maintaining cellular NAD+ pools.": "L'intérêt pour le NAD+ a augmenté en raison de son rôle central dans la recherche sur le vieillissement, en particulier sa relation avec les sirtuines et les mécanismes de réparation cellulaire. Les niveaux de NAD+ diminuent naturellement avec l'âge, ce qui stimule la recherche sur le maintien des pools cellulaires de NAD+.",
      "Ipamorelin activates growth hormone secretagogue receptors (GHS-R) in the anterior pituitary, triggering GH release through multiple mechanisms.": "L'ipamoréline active les récepteurs des sécrétagogues de l'hormone de croissance (GHS-R) dans l'hypophyse antérieure, déclenchant la libération de GH par de multiples mécanismes.",
      "Ipamorelin's research value lies in its selectivity:": "La valeur de recherche de l'ipamoréline réside dans sa sélectivité :",
      "Key substitutions provide enhanced stability:": "Des substitutions clés offrent une stabilité améliorée :",
      "Like GLP-1 agonists, Tirzepatide affects appetite regulation through central mechanisms. Research indicates effects on:": "Tout comme les agonistes du GLP-1, le tirzépatide affecte la régulation de l'appétit par des mécanismes centraux. La recherche indique des effets sur :",
      "MC4R activation makes MT-2 valuable for metabolic studies:": "L'activation du MC4R rend le MT-2 précieux pour les études métaboliques :",
      "MT-2 activates multiple melanocortin receptor subtypes:": "Le MT-2 active plusieurs sous-types de récepteurs de la mélanocortine :",
      "MT-2's non-selective receptor profile enables diverse CNS research:": "Le profil de récepteur non sélectif du MT-2 permet diverses recherches sur le SNC :",
      "Melanotan 2 exerts its biological effects through activation of melanocortin receptors, a family of G protein-coupled receptors that regulate diverse physiological processes. Understanding these mechanisms is central to ongoing research in dermatology, endocrinology, and neuroscience.": "Le Melanotan 2 exerce ses effets biologiques par l'activation des récepteurs de la mélanocortine, une famille de récepteurs couplés aux protéines G qui régulent divers processus physiologiques. La compréhension de ces mécanismes est centrale pour la recherche en cours en dermatologie, endocrinologie et neurosciences.",
      "Melanotan 2 is extensively used in dermatological research:": "Le Melanotan 2 est largement utilisé dans la recherche dermatologique :",
      "NNMT catalyses the N-methylation of nicotinamide (a NAD+ precursor) using SAM (S-adenosylmethionine) as a methyl donor. By inhibiting this enzyme, 5-Amino-1MQ enables researchers to investigate how NNMT modulation affects cellular metabolism, NAD+ availability, and metabolic health.": "La NNMT catalyse la N-méthylation du nicotinamide (un précurseur du NAD+) en utilisant le SAM (S-adénosylméthionine) comme donneur de méthyle. En inhibant cette enzyme, le 5-Amino-1MQ permet aux chercheurs d'étudier comment la modulation de la NNMT affecte le métabolisme cellulaire, la disponibilité du NAD+ et la santé métabolique.",
      "Originally developed by Metabolic Pharmaceuticals in Australia, AOD-9604 represents one of the most targeted approaches to studying growth hormone's lipolytic activity. By using only the fat-reducing portion of the full hormone, researchers can investigate adipose tissue metabolism without confounding effects on IGF-1 or glucose homeostasis.": "Développé à l'origine par Metabolic Pharmaceuticals en Australie, l'AOD-9604 représente l'une des approches les plus ciblées pour étudier l'activité lipolytique de l'hormone de croissance. En n'utilisant que la partie réductrice de graisse de l'hormone complète, les chercheurs peuvent étudier le métabolisme du tissu adipeux sans effets confondants sur l'IGF-1 ou l'homéostasie du glucose.",
      "Our bacteriostatic water meets United States Pharmacopeia (USP) standards for:": "Notre eau bactériostatique répond aux normes de la pharmacopée américaine (USP) pour :",
      "Our research-grade Semaglutide meets the highest quality standards required for reproducible scientific research:": "Notre sémaglutide de qualité recherche répond aux normes de qualité les plus élevées requises pour une recherche scientifique reproductible :",
      "Peptide Shop supplies **research-grade 5-Amino-1MQ** with guaranteed ≥99% purity, verified through comprehensive HPLC analysis.": "Peptide Shop fournit du **5-Amino-1MQ de qualité recherche** avec une pureté garantie ≥99%, vérifiée par une analyse HPLC complète.",
      "Peptide Shop supplies **research-grade AOD-9604** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis, ensuring researchers receive properly characterised material for their studies.": "Peptide Shop fournit de l'**AOD-9604 de qualité recherche** avec une pureté garantie ≥99%, vérifiée par une analyse HPLC complète et par spectrométrie de masse. Chaque commande comprend un certificat d'analyse détaillé, garantissant que les chercheurs reçoivent du matériel correctement caractérisé pour leurs études.",
      "Peptide Shop supplies **research-grade BPC-157** with guaranteed ≥99% purity and full analytical documentation.": "Peptide Shop fournit du **BPC-157 de qualité recherche** avec une pureté garantie ≥99% et une documentation analytique complète.",
      "Peptide Shop supplies **research-grade CJC-1295 No DAC** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis.": "Peptide Shop fournit du **CJC-1295 No DAC de qualité recherche** avec une pureté garantie ≥99%, vérifiée par une analyse HPLC complète et par spectrométrie de masse.",
      "Peptide Shop supplies **research-grade Cagrilintide** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis.": "Peptide Shop fournit du **Cagrilintide de qualité recherche** avec une pureté garantie ≥99%, vérifiée par une analyse HPLC complète et par spectrométrie de masse.",
      "Peptide Shop supplies **research-grade DSIP** with guaranteed ≥99% purity.": "Peptide Shop fournit du **DSIP de qualité recherche** avec une pureté garantie ≥99%.",
      "Peptide Shop supplies **research-grade Epitalon** with guaranteed ≥99% purity.": "Peptide Shop fournit de l'**Epitalon de qualité recherche** avec une pureté garantie ≥99%.",
      "Peptide Shop supplies **research-grade GHK-Cu** with guaranteed ≥99% purity.": "Peptide Shop fournit du **GHK-Cu de qualité recherche** avec une pureté garantie ≥99%.",
      "Peptide Shop supplies **research-grade GHRP-2** with guaranteed ≥99% purity.": "Peptide Shop fournit du **GHRP-2 de qualité recherche** avec une pureté garantie ≥99%.",
      "Peptide Shop supplies **research-grade GHRP-6** with guaranteed ≥99% purity.": "Peptide Shop fournit du **GHRP-6 de qualité recherche** avec une pureté garantie ≥99%.",
      "Peptide Shop supplies **research-grade HGH Fragment 176-191** with guaranteed ≥99% purity.": "Peptide Shop fournit du **HGH Fragment 176-191 de qualité recherche** avec une pureté garantie ≥99%.",
      "Peptide Shop supplies **research-grade Ipamorelin** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis.": "Peptide Shop fournit de l'**Ipamoréline de qualité recherche** avec une pureté garantie ≥99%, vérifiée par une analyse HPLC complète et par spectrométrie de masse.",
      "Peptide Shop supplies **research-grade Melanotan 2** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis, ensuring researchers receive properly characterised material for their studies.": "Peptide Shop fournit du **Melanotan 2 de qualité recherche** avec une pureté garantie ≥99%, vérifiée par une analyse HPLC complète et par spectrométrie de masse. Chaque commande comprend un certificat d'analyse détaillé, garantissant que les chercheurs reçoivent du matériel correctement caractérisé pour leurs études.",
      "Peptide Shop supplies **research-grade NAD+** with guaranteed ≥99% purity.": "Peptide Shop fournit du **NAD+ de qualité recherche** avec une pureté garantie ≥99%.",
      "Peptide Shop supplies **research-grade O-304** with guaranteed ≥99% purity.": "Peptide Shop fournit de l'**O-304 de qualité recherche** avec une pureté garantie ≥99%.",
      "Peptide Shop supplies **research-grade Retatrutide** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis, ensuring researchers receive properly characterised material for their studies.": "Peptide Shop fournit du **Rétatrutide de qualité recherche** avec une pureté garantie ≥99%, vérifiée par une analyse HPLC complète et par spectrométrie de masse. Chaque commande comprend un certificat d'analyse détaillé, garantissant que les chercheurs reçoivent du matériel correctement caractérisé pour leurs études.",
      "Peptide Shop supplies **research-grade Selank** with guaranteed ≥99% purity.": "Peptide Shop fournit du **Selank de qualité recherche** avec une pureté garantie ≥99%.",
      "Peptide Shop supplies **research-grade Semaglutide** with guaranteed ≥99% purity, verified by HPLC analysis and mass spectrometry. Every order includes a comprehensive Certificate of Analysis (COA), ensuring researchers receive properly characterised material for their studies.": "Peptide Shop fournit du **Sémaglutide de qualité recherche** avec une pureté garantie ≥99%, vérifiée par analyse HPLC et spectrométrie de masse. Chaque commande comprend un certificat d'analyse (COA) complet, garantissant que les chercheurs reçoivent du matériel correctement caractérisé pour leurs études.",
      "Peptide Shop supplies **research-grade Semax** with guaranteed ≥99% purity.": "Peptide Shop fournit du **Semax de qualité recherche** avec une pureté garantie ≥99%.",
      "Peptide Shop supplies **research-grade TB-500** with guaranteed ≥99% purity.": "Peptide Shop fournit du **TB-500 de qualité recherche** avec une pureté garantie ≥99%.",
      "Peptide Shop supplies **research-grade Tesofensine** with guaranteed ≥99% purity, verified through comprehensive HPLC analysis.": "Peptide Shop fournit de la **Tésofensine de qualité recherche** avec une pureté garantie ≥99%, vérifiée par une analyse HPLC complète.",
      "Peptide Shop supplies **research-grade Tirzepatide** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis to ensure researchers receive properly characterised material for their studies.": "Peptide Shop fournit du **Tirzépatide de qualité recherche** avec une pureté garantie ≥99%, vérifiée par une analyse HPLC complète et par spectrométrie de masse. Chaque commande comprend un certificat d'analyse détaillé pour garantir que les chercheurs reçoivent du matériel correctement caractérisé pour leurs études.",
      "Peripheral actions include:": "Les actions périphériques comprennent :",
      "Primary research applications include:": "Les principales applications de recherche comprennent :",
      "Research has demonstrated that Semaglutide may also promote beta-cell proliferation and reduce apoptosis in preclinical models, suggesting potential applications in studying beta-cell preservation strategies.": "La recherche a démontré que le sémaglutide peut également favoriser la prolifération des cellules bêta et réduire l'apoptose dans des modèles précliniques, suggérant des applications potentielles dans l'étude des stratégies de préservation des cellules bêta.",
      "Research interest in GHK-Cu stems from its remarkable effects on tissue regeneration, wound healing, and gene expression modulation. Studies suggest it influences over 4,000 genes related to tissue repair and regeneration.": "L'intérêt de la recherche pour le GHK-Cu découle de ses effets remarquables sur la régénération tissulaire, la cicatrisation des plaies et la modulation de l'expression génique. Des études suggèrent qu'il influence plus de 4 000 gènes liés à la réparation et à la régénération tissulaires.",
      "Research interest in O-304 stems from its potential applications in metabolic disease, diabetes, and obesity research, where AMPK activation can improve glucose uptake and lipid oxidation.": "L'intérêt de la recherche pour l'O-304 découle de ses applications potentielles dans la recherche sur les maladies métaboliques, le diabète et l'obésité, où l'activation de l'AMPK peut améliorer l'absorption du glucose et l'oxydation des lipides.",
      "Research into melanocortin effects on sexual behaviour:": "Recherche sur les effets de la mélanocortine sur le comportement sexuel :",
      "Research often combines ipamorelin with GHRH analogs:": "La recherche combine souvent l'ipamoréline avec des analogues de la GHRH :",
      "Researchers often compare these related peptides:": "Les chercheurs comparent souvent ces peptides apparentés :",
      "Retatrutide enables essential comparative studies:": "Le Rétatrutide permet des études comparatives essentielles :",
      "Retatrutide's triple agonism creates a unique pharmacological profile by simultaneously engaging three complementary receptor systems, each contributing distinct metabolic effects.": "Le triple agonisme du rétatrutide crée un profil pharmacologique unique en engageant simultanément trois systèmes de récepteurs complémentaires, chacun contribuant à des effets métaboliques distincts.",
      "Semaglutide crosses the blood-brain barrier and activates GLP-1 receptors in key hypothalamic regions involved in appetite regulation, including the arcuate nucleus and paraventricular nucleus. Research indicates that this central action contributes to reduced food intake and altered food preferences in animal models.": "Le sémaglutide traverse la barrière hémato-encéphalique et active les récepteurs GLP-1 dans des régions hypothalamiques clés impliquées dans la régulation de l'appétit, notamment le noyau arqué et le noyau paraventriculaire. La recherche indique que cette action centrale contribue à une réduction de la prise alimentaire et à une modification des préférences alimentaires dans les modèles animaux.",
      "Semaglutide exerts its biological effects through high-affinity binding to the GLP-1 receptor (GLP-1R), a G protein-coupled receptor expressed in various tissues including pancreatic beta cells, the central nervous system, heart, and gastrointestinal tract. Upon receptor binding, Semaglutide initiates several downstream signalling cascades that researchers continue to investigate.": "Le sémaglutide exerce ses effets biologiques par une liaison de haute affinité au récepteur GLP-1 (GLP-1R), un récepteur couplé aux protéines G exprimé dans divers tissus, notamment les cellules bêta pancréatiques, le système nerveux central, le cœur et le tractus gastro-intestinal. Lors de la liaison au récepteur, le sémaglutide initie plusieurs cascades de signalisation en aval que les chercheurs continuent d'étudier.",
      "Semaglutide is extensively used in metabolic research laboratories studying:": "Le sémaglutide est largement utilisé dans les laboratoires de recherche métabolique étudiant :",
      "TB-500 contains the key sequence responsible for Tβ4's biological activity, particularly the actin-binding domain that promotes cell motility and tissue regeneration. This makes it invaluable for research into wound healing, muscle repair, and inflammatory conditions.": "Le TB-500 contient la séquence clé responsable de l'activité biologique de Tβ4, en particulier le domaine de liaison à l'actine qui favorise la motilité cellulaire et la régénération tissulaire. Cela le rend inestimable pour la recherche sur la cicatrisation des plaies, la réparation musculaire et les conditions inflammatoires.",
      "Tesofensine increases synaptic concentrations of three key neurotransmitters:": "La tésofensine augmente les concentrations synaptiques de trois neurotransmetteurs clés :",
      "The GIP receptor component may provide unique effects on adipose tissue:": "Le composant récepteur GIP peut fournir des effets uniques sur le tissu adipeux :",
      "The GIP receptor is predominantly expressed in pancreatic beta cells and adipose tissue, while GLP-1 receptors are found in pancreatic islets, brain, heart, and gastrointestinal tract. By activating both receptor systems simultaneously, Tirzepatide provides researchers with a unique tool for studying:": "Le récepteur GIP est principalement exprimé dans les cellules bêta pancréatiques et le tissu adipeux, tandis que les récepteurs GLP-1 se trouvent dans les îlots pancréatiques, le cerveau, le cœur et le tractus gastro-intestinal. En activant simultanément les deux systèmes de récepteurs, le tirzépatide fournit aux chercheurs un outil unique pour étudier :",
      "The GLP-1 component provides established incretin effects:": "Le composant GLP-1 fournit des effets incrétine établis :",
      "The dual agonist is valuable for investigating:": "Le double agoniste est précieux pour étudier :",
      "The molecular structure of Semaglutide features a unique C-18 fatty diacid chain attached to the lysine residue at position 26. This structural modification enables the peptide to bind to serum albumin, dramatically extending its biological half-life to approximately seven days. This prolonged activity profile makes Semaglutide an invaluable tool for researchers studying sustained GLP-1 receptor activation mechanisms.": "La structure moléculaire du sémaglutide présente une chaîne unique de diacide gras C-18 attachée au résidu de lysine en position 26. Cette modification structurelle permet au peptide de se lier à l'albumine sérique, prolongeant considérablement sa demi-vie biologique à environ sept jours. Ce profil d'activité prolongé fait du sémaglutide un outil inestimable pour les chercheurs étudiant les mécanismes d'activation soutenue du récepteur GLP-1.",
      "The peptide binds to GHRH receptors on pituitary somatotropes:": "Le peptide se lie aux récepteurs de la GHRH sur les somatotropes hypophysaires :",
      "The peptide enables focused weight studies:": "Le peptide permet des études ciblées sur le poids :",
      "The peptide promotes fat breakdown through:": "Le peptide favorise la dégradation des graisses par :",
      "The peptide represents the first 29 amino acids of GHRH with modifications at positions 2, 8, 15, and 27 to improve resistance to enzymatic degradation. These modifications make it a more practical research tool while maintaining GHRH receptor binding activity.": "Le peptide représente les 29 premiers acides aminés de la GHRH avec des modifications aux positions 2, 8, 15 et 27 pour améliorer la résistance à la dégradation enzymatique. Ces modifications en font un outil de recherche plus pratique tout en maintenant l'activité de liaison aux récepteurs de la GHRH.",
      "The peptide represents the next evolution beyond dual agonists like tirzepatide, adding glucagon receptor activation to the established GLP-1/GIP dual agonism. This triple receptor engagement enables researchers to study the complex interplay between these metabolic signalling systems and their combined effects on glucose homeostasis, energy expenditure, and body weight regulation.": "Le peptide représente la prochaine évolution au-delà des doubles agonistes comme le tirzépatide, ajoutant l'activation du récepteur du glucagon au double agonisme GLP-1/GIP établi. Cet engagement triple récepteur permet aux chercheurs d'étudier l'interaction complexe entre ces systèmes de signalisation métabolique et leurs effets combinés sur l'homéostasie du glucose, la dépense énergétique et la régulation du poids corporel.",
      "The peptide's cyclic lactam structure provides enhanced stability and receptor binding affinity compared to linear α-MSH analogues. Melanotan 2 acts as a non-selective agonist at melanocortin receptors MC1, MC3, MC4, and MC5, enabling researchers to study diverse physiological processes beyond pigmentation.": "La structure lactame cyclique du peptide offre une stabilité et une affinité de liaison au récepteur améliorées par rapport aux analogues linéaires de l'α-MSH. Le Melanotan 2 agit comme un agoniste non sélectif sur les récepteurs de la mélanocortine MC1, MC3, MC4 et MC5, permettant aux chercheurs d'étudier divers processus physiologiques au-delà de la pigmentation.",
      "The peptide's effects on body weight have made it crucial for obesity research, including studies on:": "Les effets du peptide sur le poids corporel l'ont rendu crucial pour la recherche sur l'obésité, y compris les études sur :",
      "The peptide's improved selectivity profile makes it valuable for studying GH secretion mechanisms without confounding orexigenic effects.": "Le profil de sélectivité amélioré du peptide le rend précieux pour l'étude des mécanismes de sécrétion de GH sans effets orexigènes confondants.",
      "The peptide's name reflects its origin—a body protection compound identified for its remarkable cytoprotective and regenerative properties across multiple tissue types including tendons, ligaments, muscles, and gastrointestinal epithelium.": "Le nom du peptide reflète son origine — un composé de protection corporelle identifié pour ses remarquables propriétés cytoprotectrices et régénératrices dans de multiples types de tissus, y compris les tendons, les ligaments, les muscles et l'épithélium gastro-intestinal.",
      "The peptide's primary interest lies in its reported ability to activate telomerase, potentially influencing cellular lifespan and age-related changes.": "L'intérêt principal du peptide réside dans sa capacité rapportée à activer la télomérase, influençant potentiellement la durée de vie cellulaire et les changements liés à l'âge.",
      "The peptide's structure incorporates a modified GIP sequence with carefully engineered amino acid substitutions and a C20 fatty diacid side chain attached to lysine. This modification enables binding to serum albumin, extending the biological half-life to approximately five days and allowing researchers to study sustained dual receptor activation.": "La structure du peptide incorpore une séquence GIP modifiée avec des substitutions d'acides aminés soigneusement conçues et une chaîne latérale diacide gras C20 attachée à la lysine. Cette modification permet la liaison à l'albumine sérique, prolongeant la demi-vie biologique à environ cinq jours et permettant aux chercheurs d'étudier l'activation soutenue du double récepteur.",
      "The presence of GLP-1 receptors in the brain has sparked significant neuroscience research using Semaglutide:": "La présence de récepteurs GLP-1 dans le cerveau a suscité d'importantes recherches en neurosciences utilisant le sémaglutide :",
      "The primary research application involves studying skin pigmentation:": "La principale application de recherche consiste à étudier la pigmentation de la peau :",
      "The thermogenic component opens unique research directions:": "Le composant thermogénique ouvre des directions de recherche uniques :",
      "The triple agonist provides comprehensive weight research tools:": "Le triple agoniste fournit des outils complets de recherche sur le poids :",
      "The triple combination creates unique research opportunities:": "La triple combinaison crée des opportunités de recherche uniques :",
      "The unique glucagon component provides:": "Le composant glucagon unique fournit :",
      "Tirzepatide enables crucial comparative studies between:": "Le tirzépatide permet des études comparatives cruciales entre :",
      "Tirzepatide exerts its biological effects through simultaneous activation of GIP and GLP-1 receptors, both of which are G protein-coupled receptors expressed in various metabolically active tissues. This dual agonism creates synergistic signalling effects that researchers continue to characterise.": "Le tirzépatide exerce ses effets biologiques par l'activation simultanée des récepteurs GIP et GLP-1, tous deux des récepteurs couplés aux protéines G exprimés dans divers tissus métaboliquement actifs. Ce double agonisme crée des effets de signalisation synergiques que les chercheurs continuent de caractériser.",
      "Tirzepatide's superior weight outcomes in preclinical models make it essential for:": "Les résultats supérieurs du tirzépatide sur le poids dans les modèles précliniques le rendent essentiel pour :",
      "Unlike benzodiazepines, Selank does not produce sedation or dependence, making it a valuable tool for researching anxiety mechanisms and novel therapeutic approaches.": "Contrairement aux benzodiazépines, le Selank ne produit ni sédation ni dépendance, ce qui en fait un outil précieux pour la recherche sur les mécanismes de l'anxiété et les nouvelles approches thérapeutiques.",
      "Unlike more selective peptides such as ipamorelin, GHRP-6 also stimulates appetite and affects cortisol and prolactin levels, making it useful for studying the full spectrum of ghrelin receptor effects.": "Contrairement aux peptides plus sélectifs tels que l'ipamoréline, le GHRP-6 stimule également l'appétit et affecte les niveaux de cortisol et de prolactine, ce qui le rend utile pour étudier le spectre complet des effets des récepteurs de la ghréline.",
      "Unlike single-target compounds, tesofensine's triple mechanism enables researchers to investigate the complex interplay between monoaminergic systems in controlling food intake and metabolic rate. This makes it valuable for understanding the neuropharmacology of obesity and appetite disorders.": "Contrairement aux composés à cible unique, le triple mécanisme de la tésofensine permet aux chercheurs d'étudier l'interaction complexe entre les systèmes monoaminergiques dans le contrôle de la prise alimentaire et du taux métabolique. Cela le rend précieux pour comprendre la neuropharmacologie de l'obésité et des troubles de l'appétit.",
      "Unlike single-use sterile water, bacteriostatic water allows multiple withdrawals over several weeks without contamination risk, making it cost-effective for research laboratories.": "Contrairement à l'eau stérile à usage unique, l'eau bactériostatique permet de multiples prélèvements sur plusieurs semaines sans risque de contamination, ce qui la rend rentable pour les laboratoires de recherche.",
      "Without DAC, the peptide produces:": "Sans DAC, le peptide produit :"
    },
    es: {
      // Spanish SEO optimized phrases
      "What is": "Qué es",
      "How does": "Cómo funciona",
      "Benefits of": "Beneficios de",
      "Research Applications": "Aplicaciones de Investigación",
      "Storage Instructions": "Instrucciones de Almacenamiento",
      "Reconstitution Guide": "Guía de Reconstitución",
      "Dosage Information": "Información de Dosificación",
      "Key Benefits": "Beneficios Clave",
      "Why Choose": "Por Qué Elegir",
      "Product Overview": "Descripción del Producto",
      "Scientific Background": "Contexto Científico",
      "Quality Assurance": "Garantía de Calidad",
      "Shipping Information": "Información de Envío",
      "Related Products": "Productos Relacionados",
      // Spanish SEO keywords
      "Buy": "Comprar",
      "purchase": "comprar",
      "order": "pedir",
      "online": "en línea",
      "high quality": "alta calidad",
      "research grade": "calidad de investigación",
      "laboratory": "laboratorio",
      "peptide": "péptido",
      "peptides": "péptidos",
      "purity": "pureza",
      "verified": "verificado",
      "certified": "certificado",
      "fast delivery": "entrega rápida",
      "fast shipping": "envío rápido",
      "UK delivery": "entrega a España",
      "Europe": "Europa",
      "European": "Europeo",
      // Research terms
      "research purposes": "fines de investigación",
      "scientific research": "investigación científica",
      "in vitro": "in vitro",
      "clinical studies": "estudios clínicos",
      "laboratory use": "uso de laboratorio",
      // Product attributes
      "lyophilized powder": "polvo liofilizado",
      "sterile": "estéril",
      "injectable": "inyectable",
      "subcutaneous": "subcutáneo",
      "intramuscular": "intramuscular",
      // Actions
      "Store": "Almacenar",
      "Keep": "Mantener",
      "Reconstitute": "Reconstituir",
      "Mix": "Mezclar",
      "Inject": "Inyectar",
      "refrigerated": "refrigerado",
      "frozen": "congelado",
      "room temperature": "temperatura ambiente",
      // Technical/Scientific terms - Spanish
      "synthetic": "sintético",
      "amino acids": "aminoácidos",
      "amino acid": "aminoácido",
      "derived from": "derivado de",
      "protein": "proteína",
      "gastric juice": "jugo gástrico",
      "discovery": "descubrimiento",
      "extensively studied": "ampliamente estudiado",
      "tissue healing": "curación de tejidos",
      "tissue repair": "reparación de tejidos",
      "regeneration": "regeneración",
      "cytoprotective": "citoprotector",
      "regenerative properties": "propiedades regenerativas",
      "multiple tissue types": "múltiples tipos de tejidos",
      "including": "incluyendo",
      "tendons": "tendones",
      "ligaments": "ligamentos",
      "muscles": "músculos",
      "gastrointestinal epithelium": "epitelio gastrointestinal",
      // How it works - Spanish
      "How Does": "Cómo Funciona",
      "Growth Factor Modulation": "Modulación de Factores de Crecimiento",
      "VEGF upregulation": "Regulación positiva de VEGF",
      "Enhanced angiogenesis": "Angiogénesis mejorada",
      "GH receptor effects": "Efectos en receptores de GH",
      "Growth hormone pathway": "Vía de la hormona de crecimiento",
      "EGF modulation": "Modulación de EGF",
      "Epithelial growth support": "Soporte de crecimiento epitelial",
      "NGF interaction": "Interacción con NGF",
      "Nerve growth effects": "Efectos de crecimiento nervioso",
      "Nitric Oxide System": "Sistema de Óxido Nítrico",
      "NO pathway activation": "Activación de la vía de NO",
      "Vasodilation effects": "Efectos vasodilatadores",
      "Endothelial function": "Función endotelial",
      "Vascular health": "Salud vascular",
      "Blood flow enhancement": "Mejora del flujo sanguíneo",
      "Tissue perfusion": "Perfusión tisular",
      "Cytoprotective Actions": "Acciones Citoprotectoras",
      "Gastric protection": "Protección gástrica",
      "Original discovery context": "Contexto de descubrimiento original",
      "Mucosal healing": "Curación de mucosas",
      "GI epithelium repair": "Reparación del epitelio GI",
      "Anti-inflammatory": "Antiinflamatorio",
      "Reduced damage markers": "Marcadores de daño reducidos",
      // Research Applications - Spanish
      "Musculoskeletal Healing": "Curación Musculoesquelética",
      "Tendon repair": "Reparación de tendones",
      "rotator cuff models": "modelos de manguito rotador",
      "Ligament healing": "Curación de ligamentos",
      "ACL research": "Investigación del LCA",
      "Muscle regeneration": "Regeneración muscular",
      "Injury recovery": "Recuperación de lesiones",
      "Gastrointestinal Research": "Investigación Gastrointestinal",
      "Ulcer healing": "Curación de úlceras",
      "Gastric cytoprotection": "Citoprotección gástrica",
      "IBD models": "Modelos de EII",
      "Inflammatory bowel research": "Investigación de enfermedades inflamatorias intestinales",
      "Mucosal barrier": "Barrera mucosa",
      "Gut integrity": "Integridad intestinal",
      "Wound Healing": "Cicatrización de Heridas",
      "Skin repair": "Reparación de la piel",
      "Dermal regeneration": "Regeneración dérmica",
      "Angiogenesis": "Angiogénesis",
      "Blood vessel formation": "Formación de vasos sanguíneos",
      "Fibroblast activity": "Actividad de fibroblastos",
      "Collagen production": "Producción de colágeno",
      // Table/spec terms - Spanish
      "Condition": "Condición",
      "Temperature": "Temperatura",
      "Duration": "Duración",
      "Lyophilised": "Liofilizado",
      "Reconstituted": "Reconstituido",
      "up to": "hasta",
      "months": "meses",
      "weeks": "semanas",
      "Size": "Tamaño",
      "Price": "Precio",
      "From": "Desde",
      "Minimum order": "Pedido mínimo",
      "discount on orders over": "descuento en pedidos superiores a",
      // Features/Benefits - Spanish
      "Guaranteed": "Garantizado",
      "Full documentation": "Documentación completa",
      "COA with every order": "COA con cada pedido",
      "UK laboratory tested": "Probado en laboratorio",
      "Quality assured": "Calidad asegurada",
      "Express shipping available": "Envío exprés disponible",
      "Research support": "Soporte de investigación",
      "Technical assistance": "Asistencia técnica",
      "Why Choose Peptide Shop": "Por Qué Elegir Peptide Shop",
      "Peptide Shop supplies": "Peptide Shop suministra",
      // Product page section headings
      "Specification": "Especificación",
      "Detail": "Detalle",
      "Reconstitution and Handling": "Reconstitución y Manejo",
      "Reconstitution Protocol": "Protocolo de Reconstitución",
      "Storage Recommendations": "Recomendaciones de Almacenamiento",
      "For laboratory research only": "Solo para investigación de laboratorio",
      "Not intended for human or veterinary use": "No destinado para uso humano o veterinario",
      "Researchers should follow all applicable regulations": "Los investigadores deben seguir todas las regulaciones aplicables",
      "Allow vial to reach room temperature": "Permitir que el vial alcance la temperatura ambiente",
      "Add bacteriostatic water slowly": "Añadir agua bacteriostática lentamente",
      "Gently swirl": "Agitar suavemente",
      "do not shake": "no agitar",
      "Solution should be clear": "La solución debe ser clara",
      "Specifications": "Especificaciones",
      "CAS Number": "Número CAS",
      "Molecular Formula": "Fórmula Molecular",
      "Molecular Weight": "Peso Molecular",
      "Sequence": "Secuencia",
      "Appearance": "Apariencia",
      "White lyophilised powder": "Polvo liofilizado blanco",
      "HPLC verified": "Verificado por HPLC",
      // Bacteriostatic Water & Supplies - Spanish
      "Bacteriostatic Water": "Agua bacteriostática",
      "bacteriostatic water": "agua bacteriostática",
      "BAC water": "Agua BAC",
      "Sterile Water": "Agua Estéril",
      "sterile water": "agua estéril",
      "Peptide Reconstitution": "Reconstitución de Péptidos",
      "peptide reconstitution": "reconstitución de péptidos",
      "for Peptide Research": "para Investigación de Péptidos",
      "What is Bacteriostatic Water": "Qué es el Agua bacteriostática",
      "benzyl alcohol": "alcohol bencílico",
      "bacteriostatic preservative": "conservante bacteriostático",
      "inhibits the growth of bacteria": "inhibe el crecimiento de bacterias",
      "inhibits bacterial growth": "inhibe el crecimiento bacteriano",
      "reconstituting lyophilized": "reconstitución de péptidos liofilizados",
      "freeze-dried": "liofilizados",
      "lyophilized": "liofilizados",
      "for research applications": "para aplicaciones de investigación",
      "multiple withdrawals": "múltiples extracciones",
      "from the same vial": "del mismo vial",
      "are needed": "son necesarias",
      "Key Features": "Características Clave",
      "USP Grade Quality": "Calidad USP",
      "USP Grade": "Calidad USP",
      "USP grade": "calidad USP",
      "Our bacteriostatic water meets": "Nuestra agua bacteriostática cumple con los",
      "United States Pharmacopeia": "Farmacopea de Estados Unidos",
      "USP standards": "estándares USP",
      "standards for": "estándares para",
      "Sterility": "Esterilidad",
      "Purity": "Pureza",
      "concentration": "concentración",
      "Endotoxin levels": "Niveles de endotoxinas",
      "endotoxin levels": "niveles de endotoxinas",
      "Multi-Use Design": "Diseño de Uso Múltiple",
      "Unlike single-use": "A diferencia del uso único",
      "single-use sterile water": "agua estéril de un solo uso",
      "single-use": "un solo uso",
      "allows multiple withdrawals": "permite múltiples extracciones",
      "over several weeks": "durante varias semanas",
      "several weeks": "varias semanas",
      "without contamination risk": "sin riesgo de contaminación",
      "contamination risk": "riesgo de contaminación",
      "cost-effective": "rentable",
      "for research laboratories": "para laboratorios de investigación",
      "research laboratories": "laboratorios de investigación",
      "Convenient": "Conveniente",
      "convenient": "conveniente",
      "Each": "Cada",
      "each": "cada",
      "vial can": "vial puede",
      "can reconstitute": "puede reconstituir",
      "peptide vials": "viales de péptidos",
      "depending on concentration requirements": "dependiendo de los requisitos de concentración",
      "How to Use": "Cómo Usar",
      "How to use": "Cómo usar",
      "Reconstitution Steps": "Pasos de Reconstitución",
      "Allow the peptide vial": "Permitir que el vial de péptido",
      "to reach room temperature": "alcance la temperatura ambiente",
      "Clean both vial tops": "Limpiar ambos tapones del vial",
      "with an alcohol swab": "con un hisopo de alcohol",
      "alcohol swab": "hisopo de alcohol",
      "Using a sterile syringe": "Usando una jeringa estéril",
      "sterile syringe": "jeringa estéril",
      "withdraw the desired amount": "extraer la cantidad deseada",
      "desired amount": "cantidad deseada",
      "Insert the needle": "Insertar la aguja",
      "into the peptide vial": "en el vial de péptido",
      "aiming at the glass wall": "apuntando a la pared de vidrio",
      "glass wall": "pared de vidrio",
      "Slowly inject": "Inyectar lentamente",
      "allowing it to run down": "permitiendo que baje",
      "run down the vial wall": "bajar por la pared del vial",
      "vial wall": "pared del vial",
      "until fully dissolved": "hasta que se disuelva completamente",
      "fully dissolved": "completamente disuelto",
      "Store reconstituted peptide": "Almacenar el péptido reconstituido",
      "reconstituted peptide": "péptido reconstituido",
      "Recommended Volumes": "Volúmenes Recomendados",
      "Peptide Amount": "Cantidad de Péptido",
      "Suggested": "Sugerido",
      "suggested": "sugerido",
      "Concentration": "Concentración",
      "Storage": "Almacenamiento",
      "Unopened": "Sin abrir",
      "unopened": "sin abrir",
      "away from direct light": "alejado de la luz directa",
      "direct light": "luz directa",
      "Opened": "Abierto",
      "opened": "abierto",
      "Use within": "Usar dentro de",
      "use within": "usar dentro de",
      "days": "días",
      "Do not freeze": "No congelar",
      "do not freeze": "no congelar",
      "Freezing may compromise sterility": "La congelación puede comprometer la esterilidad",
      "may compromise sterility": "puede comprometer la esterilidad",
      "Shelf life": "Vida útil",
      "shelf life": "vida útil",
      "years from manufacture date": "años desde la fecha de fabricación",
      "manufacture date": "fecha de fabricación",
      "Applications in Research": "Aplicaciones en Investigación",
      "is essential for": "es esencial para",
      "essential for": "esencial para",
      "for in vitro studies": "para estudios in vitro",
      "in vitro studies": "estudios in vitro",
      "Preparation of stock solutions": "Preparación de soluciones madre",
      "stock solutions": "soluciones madre",
      "Multi-day research protocols": "Protocolos de investigación de varios días",
      "research protocols": "protocolos de investigación",
      "requiring repeat sampling": "que requieren muestreo repetido",
      "repeat sampling": "muestreo repetido",
      "sterility must be maintained": "la esterilidad debe mantenerse",
      "maintained over time": "mantenida con el tiempo",
      "over time": "con el tiempo",
      "Comparison": "Comparación",
      "comparison": "comparación",
      "Feature": "Característica",
      "feature": "característica",
      "Preservative": "Conservante",
      "preservative": "conservante",
      "Multiple Uses": "Usos Múltiples",
      "multiple uses": "usos múltiples",
      "Single use only": "Solo uso único",
      "single use only": "solo uso único",
      "Bacterial Growth": "Crecimiento Bacteriano",
      "bacterial growth": "crecimiento bacteriano",
      "Inhibited": "Inhibido",
      "inhibited": "inhibido",
      "Possible after opening": "Posible después de abrir",
      "after opening": "después de abrir",
      "Best For": "Mejor Para",
      "best for": "mejor para",
      "Multi-dose peptides": "Péptidos de dosis múltiples",
      "multi-dose": "dosis múltiples",
      "Single-dose applications": "Aplicaciones de dosis única",
      "single-dose": "dosis única",
      "Every batch": "Cada lote",
      "every batch": "cada lote",
      "undergoes testing": "se somete a pruebas",
      "testing for": "pruebas de",
      "Tested per": "Probado según",
      "tested per": "probado según",
      "Particulate Matter": "Materia Particulada",
      "particulate matter": "materia particulada",
      "Content": "Contenido",
      "content": "contenido",
      "Verified at": "Verificado a",
      "verified at": "verificado a",
      "Popular": "Popular",
      "popular": "popular",
      "healing peptide": "péptido curativo",
      "Recovery peptide": "Péptido de recuperación",
      "recovery peptide": "péptido de recuperación",
      "GLP-1 agonist": "agonista GLP-1",
      // Product-specific headings and terms - Spanish
      "Research Use Statement": "Declaración de Uso para Investigación",
      "Ordering Information": "Información de Pedido",
      "Important Research Use Notice": "Aviso Importante de Uso para Investigación",
      "Order Today": "Pedir Hoy",
      "Order": "Pedir",
      "Today": "Hoy",
      "Work": "Funcionar",
      "Peptide Specifications": "Especificaciones del Péptido",
      // Research categories
      "Obesity Research": "Investigación sobre Obesidad",
      "Metabolic Research": "Investigación Metabólica",
      "Gene Expression": "Expresión Génica",
      "GH Axis Studies": "Estudios del Eje GH",
      "Delivery Options": "Opciones de Entrega",
      "Available Package Sizes": "Tamaños de Paquete Disponibles",
      "Guaranteed Purity": "Pureza Garantizada",
      "UK-Based Delivery": "Entrega desde España",
      "Weight Management Studies": "Estudios de Control de Peso",
      "Tissue Repair": "Reparación de Tejidos",
      "Selectivity Profile": "Perfil de Selectividad",
      "Selective Action": "Acción Selectiva",
      "Research Support": "Soporte de Investigación",
      "Neuroprotection": "Neuroprotección",
      "Lipolytic Activity": "Actividad Lipolítica",
      "GHS-R Activation": "Activación GHS-R",
      "Diabetes Research": "Investigación sobre Diabetes",
      "Comparative Incretin Research": "Investigación Comparativa de Incretinas",
      "Combination Research": "Investigación Combinada",
      "Cognitive Research": "Investigación Cognitiva",
      "Central Nervous System Actions": "Acciones del Sistema Nervioso Central",
      "Key Differences": "Diferencias Clave",
      // Additional Research Headers - Spanish
      "Actin Regulation": "Regulación de la actina",
      "Adipose Tissue": "Tejido adiposo",
      "Adipose Tissue Effects": "Efectos en el tejido adiposo",
      "Ageing Research": "Investigación sobre el envejecimiento",
      "Anti-Inflammatory Research": "Investigación antiinflamatoria",
      "Anti-Lipogenic Effects": "Efectos antilipogénicos",
      "Anxiety Research": "Investigación sobre la ansiedad",
      "Appetite Research": "Investigación sobre el apetito",
      "Appetite and Obesity Research": "Investigación sobre apetito y obesidad",
      "Cardiovascular Research": "Investigación cardiovascular",
      "Cell Biology": "Biología celular",
      "Central Nervous System Effects": "Efectos en el sistema nervioso central",
      "Circadian Research": "Investigación circadiana",
      "Collagen & ECM": "Colágeno y MEC",
      "Competitive Pricing": "Precios competitivos",
      "Comprehensive Documentation": "Documentación completa",
      "Convenient 10ml Size": "Tamaño conveniente de 10ml",
      "Copper Delivery": "Entrega de cobre",
      "DNA Repair": "Reparación de ADN",
      "Dedicated Support": "Soporte dedicado",
      "Direct AMPK Activation": "Activación directa de AMPK",
      "Dopamine Effects": "Efectos de dopamina",
      "Downstream Pathways": "Vías descendentes",
      "Dual Incretin Receptor Activation": "Activación doble de receptores de incretina",
      "Energy Expenditure Studies": "Estudios de gasto energético",
      "Energy Metabolism": "Metabolismo energético",
      "Exercise Mimetics": "Miméticos del ejercicio",
      "Fat Metabolism": "Metabolismo de grasas",
      "Fat Metabolism Studies": "Estudios de metabolismo de grasas",
      "GABA System": "Sistema GABA",
      "GH Axis Research": "Investigación del eje GH",
      "GHRH Receptor Activation": "Activación del receptor GHRH",
      "GIP Receptor Activation": "Activación del receptor GIP",
      "GLP-1 Receptor Activation": "Activación del receptor GLP-1",
      "Gastric Effects": "Efectos gástricos",
      "Gastrointestinal Effects": "Efectos gastrointestinales",
      "Glucagon Receptor Activation": "Activación del receptor de glucagón",
      "Hepatic Metabolism Research": "Investigación del metabolismo hepático",
      "Immunology": "Inmunología",
      "Inflammation Modulation": "Modulación de la inflamación",
      "Inflammatory Disease Models": "Modelos de enfermedades inflamatorias",
      "Longevity Research": "Investigación sobre longevidad",
      "Melanocortin Receptor Family": "Familia de receptores de melanocortina",
      "Melanogenesis Pathway": "Vía de la melanogénesis",
      "Metabolic Effects": "Efectos metabólicos",
      "Metabolic Studies": "Estudios metabólicos",
      "Metabolic Syndrome Studies": "Estudios del síndrome metabólico",
      "Metabolism": "Metabolismo",
      "Methylation Balance": "Equilibrio de metilación",
      "Modified Stability": "Estabilidad modificada",
      "Monoamine Regulation": "Regulación de monoaminas",
      "NAD+ Metabolism": "Metabolismo de NAD+",
      "Neuroendocrine": "Neuroendocrino",
      "Neuroplasticity": "Neuroplasticidad",
      "Neuroscience": "Neurociencia",
      "Neuroscience Applications": "Aplicaciones de neurociencia",
      "Neurotransmitter Effects": "Efectos de neurotransmisores",
      "Neurotrophin Modulation": "Modulación de neurotrofinas",
      "Norepinephrine Effects": "Efectos de norepinefrina",
      "Obesity Studies": "Estudios de obesidad",
      "Other Effects": "Otros efectos",
      "Pancreatic Beta-Cell Effects": "Efectos en células beta pancreáticas",
      "Pancreatic Effects": "Efectos pancreáticos",
      "Pigmentation Research": "Investigación sobre pigmentación",
      "Pineal Function": "Función pineal",
      "Pituitary Function": "Función pituitaria",
      "Pulsatile vs Sustained Release": "Liberación pulsátil vs sostenida",
      "Receptor Activation": "Activación de receptores",
      "Satiety Signalling": "Señalización de saciedad",
      "Secondary Effects": "Efectos secundarios",
      "Serotonin Effects": "Efectos de serotonina",
      "Sexual Function Studies": "Estudios de función sexual",
      "Sirtuin Activation": "Activación de sirtuinas",
      "Skin Disorder Research": "Investigación de trastornos de la piel",
      "Skin Research": "Investigación de la piel",
      "Sleep Regulation": "Regulación del sueño",
      "Sleep Research": "Investigación del sueño",
      "Stress Research": "Investigación del estrés",
      "Synergistic Metabolic Effects": "Efectos metabólicos sinérgicos",
      "Synergy with GHRH": "Sinergia con GHRH",
      "Telomerase Activation": "Activación de la telomerasa",
      "UK-Based Supplier": "Proveedor con sede en España",
      "UK-Based Supply": "Suministro desde España",
      "Verified Purity": "Pureza verificada",
      "Weight Management Research": "Investigación sobre control de peso",
      // Scientific terms
      "synthetic analogue": "análogo sintético",
      "analogue": "análogo",
      "analog": "análogo",
      "hormone": "hormona",
      "receptor": "receptor",
      "receptor agonist": "agonista del receptor",
      "agonist": "agonista",
      "antagonist": "antagonista",
      "binding": "enlace",
      "affinity": "afinidad",
      "selectivity": "selectividad",
      "mechanism": "mecanismo",
      "pathway": "vía de señalización",
      "signalling": "señalización",
      "activation": "activación",
      "inhibition": "inhibición",
      "modulation": "modulación",
      "expression": "expresión",
      "regulation": "regulación",
      "metabolism": "metabolismo",
      "metabolic": "metabólico",
      "glucose": "glucosa",
      "insulin": "insulina",
      "insulin secretion": "secreción de insulina",
      "appetite regulation": "regulación del apetito",
      "appetite": "apetito",
      "weight management": "control de peso",
      "weight loss": "pérdida de peso",
      "obesity": "obesidad",
      "diabetes": "diabetes",
      "type 2 diabetes": "diabetes tipo 2",
      "blood sugar": "azúcar en sangre",
      "half-life": "vida media",
      "bioavailability": "biodisponibilidad",
      "pharmacokinetics": "farmacocinética",
      "pharmacodynamics": "farmacodinámica",
      // Product descriptions
      "research peptide": "péptido de investigación",
      "research-grade": "calidad de investigación",
      "pharmaceutical grade": "calidad farmacéutica",
      "raw peptide": "péptido crudo",
      "active pharmaceutical ingredient": "ingrediente farmacéutico activo",
      "brand-name": "marca",
      "prescription medications": "medicamentos con receta",
      "laboratory research purposes": "fines de investigación de laboratorio",
      "human consumption": "consumo humano",
      "medical treatment": "tratamiento médico",
      "not for human use": "no para uso humano",
      "for research only": "solo para investigación",
      "research only": "solo investigación",
      // Quality and purity
      "HPLC analysis": "análisis HPLC",
      "mass spectrometry": "espectrometría de masas",
      "Certificate of Analysis": "Certificado de Análisis",
      "COA": "COA",
      "batch": "lote",
      "lot": "lote",
      "identity": "identidad",
      "peptide content": "contenido de péptido",
      "quality control": "control de calidad",
      "strict quality control": "control de calidad estricto",
      "manufacturing": "fabricación",
      "shipping": "envío",
      // Storage terms
      "long-term stability": "estabilidad a largo plazo",
      "refrigerator": "refrigerador",
      "freeze-thaw cycles": "ciclos de congelación-descongelación",
      "protect from light": "proteger de la luz",
      "airtight containers": "contenedores herméticos",
      "moisture absorption": "absorción de humedad",
      "properly stored": "almacenado correctamente",
      // Reconstitution
      "sterile bacteriostatic water": "agua bacteriostática estéril",
      "alkaline buffer": "tampón alcalino",
      "isoelectric point": "punto isoeléctrico",
      "peptide degradation": "degradación del péptido",
      "dissolution": "disolución",
      "dissolve": "disolver",
      // Delivery
      "next day delivery": "entrega al día siguiente",
      "standard shipping": "envío estándar",
      "express delivery": "entrega exprés",
      "international shipping": "envío internacional",
      "customs delays": "retrasos aduaneros",
      "overseas orders": "pedidos internacionales",
      "tracked delivery": "entrega con seguimiento",
      "discrete packaging": "embalaje discreto",
      "cold packs": "paquetes fríos",
      "dry ice": "hielo seco",
      // Ordering
      "minimum order": "pedido mínimo",
      "bulk pricing": "precios al por mayor",
      "custom orders": "pedidos personalizados",
      "institutional research": "investigación institucional",
      "larger quantities": "cantidades mayores",
      "package sizes": "tamaños de paquete",
      "vial": "vial",
      "vials": "viales",
      // Scientific activities
      "binding assays": "ensayos de enlace",
      "receptor binding": "enlace al receptor",
      "in vivo": "in vivo",
      "disease models": "modelos de enfermedad",
      "research models": "modelos de investigación",
      "pilot studies": "estudios piloto",
      "published literature": "literatura publicada",
      "published data": "datos publicados",
      "reference standards": "estándares de referencia",
      "reproducible results": "resultados reproducibles",
      "consistent quality": "calidad constante",
      "batch-to-batch": "lote a lote",
      // Body/biological terms
      "intestines": "intestinos",
      "gastric": "gástrico",
      "beta-cell": "célula beta",
      "beta-cell function": "función de células beta",
      "gastric emptying": "vaciamiento gástrico",
      "neuroprotective": "neuroprotector",
      "serum albumin": "albúmina sérica",
      "albumin binding": "enlace a albúmina",
      "biological half-life": "vida media biológica",
      "prolonged activity": "actividad prolongada",
      "sustained activation": "activación sostenida",
      "**5-Amino-1MQ** (5-Amino-1-Methylquinolinium) is a selective inhibitor of nicotinamide N-methyltransferase (NNMT), an enzyme increasingly recognised as a key regulator of cellular metabolism, NAD+ homeostasis, and adipose tissue function. This research compound has emerged as an important tool for studying the intersection of epigenetics, energy metabolism, and ageing.": "**5-Amino-1MQ** (5-Amino-1-Metilquinolinio) es un inhibidor selectivo de la nicotinamida N-metiltransferasa (NNMT), una enzima cada vez más reconocida como un regulador clave del metabolismo celular, la homeostasis de NAD+ y la función del tejido adiposo. Este compuesto de investigación ha surgido como una herramienta importante para estudiar la intersección de la epigenética, el metabolismo energético y el envejecimiento.",
      "**AOD-9604** (Anti-Obesity Drug 9604) is a modified fragment of human growth hormone comprising amino acids 177-191 of the C-terminal region, with an additional tyrosine residue at the N-terminus. This synthetic peptide was specifically designed to isolate the fat-metabolising properties of growth hormone without its growth-promoting or diabetogenic effects.": "**AOD-9604** (Anti-Obesity Drug 9604) es un fragmento modificado de la hormona del crecimiento humana que comprende los aminoácidos 177-191 de la región C-terminal, con un residuo de tirosina adicional en el extremo N-terminal. Este péptido sintético fue diseñado específicamente para aislar las propiedades metabolizadoras de grasa de la hormona del crecimiento sin sus efectos promotores del crecimiento o diabetógenos.",
      '**BPC-157** (Body Protection Compound-157) is a synthetic pentadecapeptide (15 amino acids) derived from a protein found in human gastric juice. Since its discovery, BPC-157 has become one of the most extensively studied peptides in tissue healing and regeneration research. For published research, see [PubMed studies on BPC-157](https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157){:target="_blank" rel="noopener"}.': '**BPC-157** (Body Protection Compound-157) es un pentadecapéptido sintético (15 aminoácidos) derivado de una proteína que se encuentra en el jugo gástrico humano. Desde su descubrimiento, el BPC-157 se ha convertido en uno de los péptidos más estudiados en la investigación de la curación y regeneración de tejidos. Para investigaciones publicadas, consulte [Estudios de PubMed sobre BPC-157](https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157){:target="_blank" rel="noopener"}.',
      "**CJC-1295 No DAC** (also known as Modified GRF 1-29 or Mod GRF) is a synthetic analog of growth hormone-releasing hormone (GHRH) with specific amino acid modifications that enhance its stability and half-life. Unlike CJC-1295 with DAC, this version lacks the Drug Affinity Complex, producing pulsatile rather than sustained GH release patterns.": "**CJC-1295 No DAC** (también conocido como Modified GRF 1-29 o Mod GRF) es un análogo sintético de la hormona liberadora de hormona del crecimiento (GHRH) con modificaciones específicas de aminoácidos que mejoran su estabilidad y vida media. A diferencia del CJC-1295 con DAC, esta versión carece del Complejo de Afinidad a Fármacos (Drug Affinity Complex), produciendo patrones de liberación de GH pulsátiles en lugar de sostenidos.",
      "**Cagrilintide** (AM833, NN9838) is a long-acting acylated analog of human amylin, a peptide hormone co-secreted with insulin from pancreatic beta cells. Through fatty acid acylation, cagrilintide achieves an extended half-life enabling once-weekly research dosing, making it an invaluable tool for studying amylin's role in satiety and metabolic regulation.": "**Cagrilintide** (AM833, NN9838) es un análogo acilado de acción prolongada de la amilina humana, una hormona peptídica co-segregada con la insulina por las células beta pancreáticas. A través de la acilación de ácidos grasos, el cagrilintide logra una vida media extendida que permite una dosificación de investigación semanal, convirtiéndolo en una herramienta invaluable para estudiar el papel de la amilina en la saciedad y la regulación metabólica.",
      "**DSIP** (Delta Sleep-Inducing Peptide) is a nonapeptide first isolated from rabbit brain in 1977 during research into sleep physiology. The peptide was named for its ability to promote delta wave sleep patterns in research models.": "**DSIP** (Delta Sleep-Inducing Peptide) es un nonapéptido aislado por primera vez del cerebro de conejo en 1977 durante la investigación sobre la fisiología del sueño. El péptido recibió su nombre por su capacidad para promover patrones de sueño de ondas delta en modelos de investigación.",
      "**Epitalon** (Epithalon, AEDG peptide) is a synthetic tetrapeptide based on epithalamin, a pineal gland extract extensively studied for its effects on telomerase activation and cellular ageing. Developed from decades of Russian research, Epitalon has become a key tool in longevity and anti-ageing research.": "**Epitalon** (Epithalon, péptido AEDG) es un tetrapéptido sintético basado en la epitalamina, un extracto de la glándula pineal ampliamente estudiado por sus efectos sobre la activación de la telomerasa y el envejecimiento celular. Desarrollado a partir de décadas de investigación rusa, Epitalon se ha convertido en una herramienta clave en la investigación de la longevidad y el antienvejecimiento.",
      "**GHK-Cu** (Copper Tripeptide-1) is a naturally occurring copper-peptide complex consisting of three amino acids (glycine-histidine-lysine) bound to a copper ion. Found in human plasma, saliva, and urine, GHK-Cu concentrations naturally decline with age.": "**GHK-Cu** (Tripéptido de Cobre-1) es un complejo de cobre-péptido que ocurre naturalmente y consiste en tres aminoácidos (glicina-histidina-lisina) unidos a un ion de cobre. Encontrado en el plasma humano, la saliva y la orina, las concentraciones de GHK-Cu disminuyen naturalmente con la edad.",
      "**GHRP-2** (Growth Hormone Releasing Peptide-2, Pralmorelin) is a synthetic hexapeptide that stimulates growth hormone release through activation of the ghrelin receptor (GHS-R1a). GHRP-2 is considered more selective than GHRP-6, producing robust GH release with less pronounced effects on appetite, cortisol, and prolactin.": "**GHRP-2** (Péptido Liberador de Hormona del Crecimiento-2, Pralmorelina) es un hexapéptido sintético que estimula la liberación de la hormona del crecimiento a través de la activación del receptor de grelina (GHS-R1a). GHRP-2 se considera más selectivo que GHRP-6, produciendo una liberación robusta de GH con efectos menos pronunciados sobre el apetito, el cortisol y la prolactina.",
      "**GHRP-6** (Growth Hormone Releasing Peptide-6) is a synthetic hexapeptide that stimulates growth hormone release through activation of the ghrelin receptor (GHS-R1a). As one of the first synthetic GH secretagogues developed, GHRP-6 has extensive research documentation and remains a valuable tool for studying growth hormone physiology.": "**GHRP-6** (Péptido Liberador de Hormona del Crecimiento-6) es un hexapéptido sintético que estimula la liberación de la hormona del crecimiento a través de la activación del receptor de grelina (GHS-R1a). Como uno de los primeros secretagogos sintéticos de GH desarrollados, GHRP-6 tiene una extensa documentación de investigación y sigue siendo una herramienta valiosa para estudiar la fisiología de la hormona del crecimiento.",
      "**HGH Fragment 176-191** is a synthetic peptide comprising the C-terminal portion of human growth hormone (amino acids 176-191). This specific region has been identified as responsible for GH's lipolytic (fat-burning) activity without the hormone's growth-promoting effects.": "**HGH Fragment 176-191** es un péptido sintético que comprende la porción C-terminal de la hormona del crecimiento humana (aminoácidos 176-191). Esta región específica ha sido identificada como responsable de la actividad lipolítica (quema de grasa) de la GH sin los efectos promotores del crecimiento de la hormona.",
      "**Ipamorelin** is a synthetic pentapeptide growth hormone secretagogue that selectively stimulates growth hormone (GH) release from pituitary somatotrope cells. Distinguished by its high selectivity, ipamorelin causes minimal effects on cortisol and prolactin levels, making it an invaluable research tool for studying isolated GH secretion mechanisms.": "**Ipamorelin** es un secretagogo de la hormona del crecimiento pentapeptídico sintético que estimula selectivamente la liberación de la hormona del crecimiento (GH) de las células somatotropas pituitarias. Distinguido por su alta selectividad, ipamorelin causa efectos mínimos sobre los niveles de cortisol y prolactina, convirtiéndolo en una herramienta de investigación invaluable para estudiar los mecanismos aislados de secreción de GH.",
      "**Melanotan 2** (MT-2, MT-II) is a synthetic cyclic heptapeptide analogue of alpha-melanocyte stimulating hormone (α-MSH). Originally developed at the University of Arizona in the 1980s, this research peptide has become an essential tool for studying melanocortin receptor signalling and the regulation of skin pigmentation.": "**Melanotan 2** (MT-2, MT-II) es un análogo heptapeptídico cíclico sintético de la hormona estimulante de melanocitos alfa (α-MSH). Desarrollado originalmente en la Universidad de Arizona en la década de 1980, este péptido de investigación se ha convertido en una herramienta esencial para estudiar la señalización del receptor de melanocortina y la regulación de la pigmentación de la piel.",
      "**NAD+** (Nicotinamide Adenine Dinucleotide) is a coenzyme found in all living cells that plays fundamental roles in energy metabolism, DNA repair, and cellular signalling. NAD+ is essential for hundreds of enzymatic reactions and is a key regulator of cellular health.": "**NAD+** (Nicotinamida Adenina Dinucleótido) es una coenzima que se encuentra en todas las células vivas y desempeña un papel fundamental en el metabolismo energético, la reparación del ADN y la señalización celular. NAD+ es esencial para cientos de reacciones enzimáticas y es un regulador clave de la salud celular.",
      "**O-304** is a novel small molecule that directly activates AMPK (AMP-activated protein kinase), the master regulator of cellular energy homeostasis. Unlike indirect activators like metformin, O-304 binds directly to AMPK's β1 subunit.": "**O-304** es una pequeña molécula novedosa que activa directamente la AMPK (proteína quinasa activada por AMP), el regulador maestro de la homeostasis energética celular. A diferencia de los activadores indirectos como la metformina, O-304 se une directamente a la subunidad β1 de la AMPK.",
      "**Retatrutide** (LY3437943) is a novel synthetic peptide that functions as a triple agonist of three key metabolic receptors: glucagon-like peptide-1 (GLP-1), glucose-dependent insulinotropic polypeptide (GIP), and glucagon receptors. This unprecedented triple mechanism of action makes Retatrutide the most comprehensive incretin-based research tool currently available.": "**Retatrutide** (LY3437943) es un péptido sintético novedoso que funciona como un agonista triple de tres receptores metabólicos clave: péptido similar al glucagón-1 (GLP-1), polipéptido insulinotrópico dependiente de glucosa (GIP) y receptores de glucagón. Este triple mecanismo de acción sin precedentes hace que Retatrutide sea la herramienta de investigación basada en incretinas más completa disponible actualmente.",
      "**Selank** (TP-7) is a synthetic heptapeptide developed in Russia as a modified analogue of tuftsin, a naturally occurring immunomodulatory peptide. Selank has been extensively studied for its anxiolytic, nootropic, and immunomodulatory properties.": "**Selank** (TP-7) es un heptapéptido sintético desarrollado en Rusia como un análogo modificado de la tuftsina, un péptido inmunomodulador que se produce naturalmente. Selank ha sido ampliamente estudiado por sus propiedades ansiolíticas, nootrópicas e inmunomoduladoras.",
      '**Semaglutide** is a synthetic analogue of human Glucagon-Like Peptide-1 (GLP-1), a hormone naturally produced in the intestines that plays a crucial role in glucose metabolism and appetite regulation. This research peptide has gained significant attention in scientific communities worldwide for its applications in metabolic research, particularly in studies related to type 2 diabetes and obesity. For comprehensive background information, see the [PubChem compound entry for Semaglutide](https://pubchem.ncbi.nlm.nih.gov/compound/Semaglutide){:target="_blank" rel="noopener"}.': '**Semaglutida** es un análogo sintético del péptido similar al glucagón-1 humano (GLP-1), una hormona producida naturalmente en los intestinos que desempeña un papel crucial en el metabolismo de la glucosa y la regulación del apetito. Este péptido de investigación ha ganado una atención significativa en las comunidades científicas de todo el mundo por sus aplicaciones en la investigación metabólica, particularmente en estudios relacionados con la diabetes tipo 2 y la obesidad. Para obtener información general completa, consulte la [entrada del compuesto PubChem para Semaglutida](https://pubchem.ncbi.nlm.nih.gov/compound/Semaglutide){:target="_blank" rel="noopener"}.',
      "**Semax** is a synthetic heptapeptide developed in Russia, based on the ACTH(4-10) fragment of adrenocorticotropic hormone. Unlike full ACTH, Semax lacks hormonal activity but retains potent nootropic and neuroprotective properties.": "**Semax** es un heptapéptido sintético desarrollado en Rusia, basado en el fragmento ACTH(4-10) de la hormona adrenocorticotropa. A diferencia de la ACTH completa, Semax carece de actividad hormonal pero conserva potentes propiedades nootrópicas y neuroprotectoras.",
      "**TB-500** is a synthetic peptide representing the active region of Thymosin Beta-4 (Tβ4), a naturally occurring protein found in virtually all human and animal cells. Thymosin Beta-4 is a 43-amino acid protein that plays critical roles in cell migration, angiogenesis, and tissue repair.": "**TB-500** es un péptido sintético que representa la región activa de la Timosina Beta-4 (Tβ4), una proteína natural que se encuentra en prácticamente todas las células humanas y animales. La Timosina Beta-4 es una proteína de 43 aminoácidos que desempeña un papel fundamental en la migración celular, la angiogénesis y la reparación de tejidos.",
      "**Tesofensine** (NS2330) is a triple monoamine reuptake inhibitor that blocks the presynaptic reuptake of norepinephrine, dopamine, and serotonin. Originally developed for neurodegenerative disease research, tesofensine has become an important tool for studying the neurological basis of appetite regulation and energy homeostasis.": "**Tesofensina** (NS2330) es un inhibidor triple de la recaptación de monoaminas que bloquea la recaptación presináptica de norepinefrina, dopamina y serotonina. Desarrollado originalmente para la investigación de enfermedades neurodegenerativas, la tesofensina se ha convertido en una herramienta importante para estudiar la base neurológica de la regulación del apetito y la homeostasis energética.",
      "**Tirzepatide** is a novel synthetic peptide that functions as a dual agonist of two key incretin hormone receptors: glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1). This unique dual mechanism of action distinguishes Tirzepatide from single-target GLP-1 receptor agonists like semaglutide, making it an invaluable tool for metabolic research.": "**Tirzepatida** es un péptido sintético novedoso que funciona como un agonista dual de dos receptores de hormonas incretinas clave: polipéptido insulinotrópico dependiente de glucosa (GIP) y péptido similar al glucagón-1 (GLP-1). Este mecanismo de acción dual único distingue a la tirzepatida de los agonistas del receptor de GLP-1 de un solo objetivo como la semaglutida, convirtiéndola en una herramienta invaluable para la investigación metabólica.",
      "1. Allow the peptide vial to reach room temperature": "1. Deje que el vial de péptido alcance la temperatura ambiente",
      "2. Clean both vial tops with an alcohol swab": "2. Limpie ambas tapas de los viales con una toallita con alcohol",
      "3. Using a sterile syringe, withdraw the desired amount of bacteriostatic water": "3. Usando una jeringa estéril, extraiga la cantidad deseada de agua bacteriostática",
      "4. Insert the needle into the peptide vial, aiming at the glass wall": "4. Inserte la aguja en el vial de péptido, apuntando a la pared de vidrio",
      "5-Amino-1MQ inhibits NNMT, affecting multiple metabolic pathways:": "5-Amino-1MQ inhibe la NNMT, afectando múltiples vías metabólicas:",
      "5. Slowly inject the water, allowing it to run down the vial wall": "5. Inyecte lentamente el agua, permitiendo que corra por la pared del vial",
      "6. Gently swirl (do not shake) until fully dissolved": "6. Gire suavemente (no agite) hasta que se disuelva por completo",
      "7. Store reconstituted peptide at 2-8°C": "7. Almacene el péptido reconstituido a 2-8°C",
      "A key research advantage is its selectivity:": "Una ventaja clave de investigación es su selectividad:",
      "AOD-9604 also inhibits fat accumulation:": "AOD-9604 también inhibe la acumulación de grasa:",
      "AOD-9604's mechanism of action centres on its ability to stimulate lipolysis and inhibit lipogenesis in adipose tissue, mimicking a specific subset of growth hormone's metabolic effects.": "El mecanismo de acción de AOD-9604 se centra en su capacidad para estimular la lipólisis e inhibir la lipogénesis en el tejido adiposo, imitando un subconjunto específico de los efectos metabólicos de la hormona del crecimiento.",
      "Amylin complements insulin's glucose-lowering effects through distinct mechanisms including gastric emptying delay, glucagon suppression, and central satiety signalling. Cagrilintide provides researchers with a stable, long-acting tool to investigate these pathways in extended experimental paradigms.": "La amilina complementa los efectos hipoglucemiantes de la insulina a través de mecanismos distintos que incluyen el retraso del vaciado gástrico, la supresión de glucagón y la señalización central de saciedad. Cagrilintide proporciona a los investigadores una herramienta estable y de acción prolongada para investigar estas vías en paradigmas experimentales extendidos.",
      "Anti-inflammatory properties are actively investigated:": "Las propiedades antiinflamatorias se investigan activamente:",
      "Bacteriostatic water (BAC water) is sterile water containing 0.9% benzyl alcohol, a bacteriostatic preservative that inhibits the growth of bacteria. This makes it ideal for reconstituting lyophilized (freeze-dried) peptides for research applications where multiple withdrawals from the same vial are needed.": "El agua bacteriostática (agua BAC) es agua estéril que contiene 0,9% de alcohol bencílico, un conservante bacteriostático que inhibe el crecimiento de bacterias. Esto la hace ideal para reconstituir péptidos liofilizados para aplicaciones de investigación donde se necesitan múltiples extracciones del mismo vial.",
      "Beyond sleep regulation, DSIP has demonstrated effects on stress response, pain perception, and neuroendocrine function, making it a versatile tool for neuroscience research.": "Más allá de la regulación del sueño, DSIP ha demostrado efectos sobre la respuesta al estrés, la percepción del dolor y la función neuroendocrina, convirtiéndolo en una herramienta versátil para la investigación en neurociencia.",
      "Broader metabolic applications:": "Aplicaciones metabólicas más amplias:",
      "By isolating this fragment, researchers can study GH's fat metabolism effects independently of IGF-1 elevation, glucose effects, and tissue growth, providing a cleaner tool for adipose biology research.": "Al aislar este fragmento, los investigadores pueden estudiar los efectos del metabolismo de las grasas de la GH independientemente de la elevación de IGF-1, los efectos de la glucosa y el crecimiento tisular, proporcionando una herramienta más limpia para la investigación de la biología adiposa.",
      "Cagrilintide activates amylin receptors (AMY1, AMY2, AMY3), which are complexes of the calcitonin receptor with receptor activity-modifying proteins (RAMPs).": "Cagrilintide activa los receptores de amilina (AMY1, AMY2, AMY3), que son complejos del receptor de calcitonina con proteínas modificadoras de la actividad del receptor (RAMP).",
      "Cagrilintide is often studied with GLP-1 agonists:": "Cagrilintide a menudo se estudia con agonistas de GLP-1:",
      "Central effects include:": "Los efectos centrales incluyen:",
      "Core applications in diabetes studies include:": "Las aplicaciones principales en estudios de diabetes incluyen:",
      "Dermatological applications extend beyond pigmentation:": "Las aplicaciones dermatológicas se extienden más allá de la pigmentación:",
      "Developed as a ghrelin receptor (GHS-R) agonist, ipamorelin represents one of the most selective GH releasing peptides (GHRPs) available for research. Its clean pharmacological profile enables researchers to study GH axis physiology without the confounding effects seen with less selective compounds.": "Desarrollado como un agonista del receptor de grelina (GHS-R), la ipamorelina representa uno de los péptidos liberadores de GH (GHRP) más selectivos disponibles para la investigación. Su perfil farmacológico limpio permite a los investigadores estudiar la fisiología del eje GH sin los efectos de confusión observados con compuestos menos selectivos.",
      "Each 10ml vial can reconstitute 5-10 peptide vials depending on concentration requirements.": "Cada vial de 10 ml puede reconstituir 5-10 viales de péptidos dependiendo de los requisitos de concentración.",
      "Emerging areas of investigation include:": "Las áreas emergentes de investigación incluyen:",
      "Emerging evidence suggests GLP-1 receptor agonists may have cardiovascular effects beyond glucose control, leading to research investigating:": "La evidencia emergente sugiere que los agonistas del receptor GLP-1 pueden tener efectos cardiovasculares más allá del control de la glucosa, lo que lleva a investigaciones que estudian:",
      "Emerging research also explores Semaglutide's potential neuroprotective properties, with studies investigating its effects in models of Alzheimer's disease, Parkinson's disease, and stroke.": "La investigación emergente también explora las posibles propiedades neuroprotectoras de Semaglutida, con estudios que investigan sus efectos en modelos de enfermedad de Alzheimer, enfermedad de Parkinson y accidentes cerebrovasculares.",
      "Emerging research explores melanocortin anti-inflammatory properties:": "La investigación emergente explora las propiedades antiinflamatorias de la melanocortina:",
      "Extensive research has demonstrated Semax's effects on cognitive function, BDNF expression, and neuroprotection, making it a valuable tool for neuroscience research.": "Una extensa investigación ha demostrado los efectos de Semax en la función cognitiva, la expresión de BDNF y la neuroprotección, lo que lo convierte en una herramienta valiosa para la investigación en neurociencia.",
      "GIP receptor engagement adds complementary effects:": "La participación del receptor GIP añade efectos complementarios:",
      "GLP-1 receptor activation slows gastric emptying, which may contribute to prolonged satiety and reduced postprandial glucose excursions. Researchers studying gut-brain axis signalling find Semaglutide particularly useful for investigating these gastrointestinal regulatory mechanisms.": "La activación del receptor GLP-1 ralentiza el vaciado gástrico, lo que puede contribuir a una saciedad prolongada y a reducir las excursiones de glucosa posprandiales. Los investigadores que estudian la señalización del eje intestino-cerebro encuentran que la semaglutida es particularmente útil para investigar estos mecanismos reguladores gastrointestinales.",
      "Glucagon's hepatic effects enable liver-focused studies:": "Los efectos hepáticos del glucagón permiten estudios centrados en el hígado:",
      "In pancreatic beta cells, GLP-1 receptor activation by Semaglutide triggers glucose-dependent insulin secretion through the cAMP-PKA signalling pathway. This glucose-dependent mechanism is particularly noteworthy in research, as it suggests reduced risk of hypoglycaemia compared to insulin secretagogues that work independently of glucose levels.": "En las células beta pancreáticas, la activación del receptor GLP-1 por la semaglutida desencadena la secreción de insulina dependiente de glucosa a través de la vía de señalización AMPc-PKA. Este mecanismo dependiente de glucosa es particularmente notable en la investigación, ya que sugiere un riesgo reducido de hipoglucemia en comparación con los secretagogos de insulina que funcionan independientemente de los niveles de glucosa.",
      "In pancreatic beta cells, Tirzepatide activates both GIP and GLP-1 receptors, leading to:": "En las células beta pancreáticas, la tirzepatida activa tanto los receptores GIP como GLP-1, lo que conduce a:",
      "Interest in NAD+ has surged due to its central role in ageing research, particularly its relationship with sirtuins and cellular repair mechanisms. NAD+ levels naturally decline with age, driving research into maintaining cellular NAD+ pools.": "El interés en NAD+ ha aumentado debido a su papel central en la investigación del envejecimiento, particularmente su relación con las sirtuinas y los mecanismos de reparación celular. Los niveles de NAD+ disminuyen naturalmente con la edad, impulsando la investigación sobre el mantenimiento de las reservas celulares de NAD+.",
      "Ipamorelin activates growth hormone secretagogue receptors (GHS-R) in the anterior pituitary, triggering GH release through multiple mechanisms.": "La ipamorelina activa los receptores secretagogos de la hormona del crecimiento (GHS-R) en la hipófisis anterior, desencadenando la liberación de GH a través de múltiples mecanismos.",
      "Ipamorelin's research value lies in its selectivity:": "El valor de investigación de la ipamorelina radica en su selectividad:",
      "Key substitutions provide enhanced stability:": "Las sustituciones clave proporcionan una estabilidad mejorada:",
      "Like GLP-1 agonists, Tirzepatide affects appetite regulation through central mechanisms. Research indicates effects on:": "Al igual que los agonistas de GLP-1, la tirzepatida afecta la regulación del apetito a través de mecanismos centrales. La investigación indica efectos sobre:",
      "MC4R activation makes MT-2 valuable for metabolic studies:": "La activación de MC4R hace que MT-2 sea valioso para estudios metabólicos:",
      "MT-2 activates multiple melanocortin receptor subtypes:": "MT-2 activa múltiples subtipos de receptores de melanocortina:",
      "MT-2's non-selective receptor profile enables diverse CNS research:": "El perfil de receptor no selectivo de MT-2 permite diversas investigaciones del SNC:",
      "Melanotan 2 exerts its biological effects through activation of melanocortin receptors, a family of G protein-coupled receptors that regulate diverse physiological processes. Understanding these mechanisms is central to ongoing research in dermatology, endocrinology, and neuroscience.": "Melanotan 2 ejerce sus efectos biológicos a través de la activación de los receptores de melanocortina, una familia de receptores acoplados a proteínas G que regulan diversos procesos fisiológicos. Comprender estos mecanismos es fundamental para la investigación en curso en dermatología, endocrinología y neurociencia.",
      "Melanotan 2 is extensively used in dermatological research:": "Melanotan 2 se utiliza ampliamente en la investigación dermatológica:",
      "NNMT catalyses the N-methylation of nicotinamide (a NAD+ precursor) using SAM (S-adenosylmethionine) as a methyl donor. By inhibiting this enzyme, 5-Amino-1MQ enables researchers to investigate how NNMT modulation affects cellular metabolism, NAD+ availability, and metabolic health.": "La NNMT cataliza la N-metilación de la nicotinamida (un precursor de NAD+) utilizando SAM (S-adenosilmetionina) como donante de metilo. Al inhibir esta enzima, el 5-Amino-1MQ permite a los investigadores investigar cómo la modulación de NNMT afecta el metabolismo celular, la disponibilidad de NAD+ y la salud metabólica.",
      "Originally developed by Metabolic Pharmaceuticals in Australia, AOD-9604 represents one of the most targeted approaches to studying growth hormone's lipolytic activity. By using only the fat-reducing portion of the full hormone, researchers can investigate adipose tissue metabolism without confounding effects on IGF-1 or glucose homeostasis.": "Originalmente desarrollado por Metabolic Pharmaceuticals en Australia, AOD-9604 representa uno de los enfoques más específicos para estudiar la actividad lipolítica de la hormona del crecimiento. Al utilizar solo la porción reductora de grasa de la hormona completa, los investigadores pueden investigar el metabolismo del tejido adiposo sin efectos de confusión sobre el IGF-1 o la homeostasis de la glucosa.",
      "Our bacteriostatic water meets United States Pharmacopeia (USP) standards for:": "Nuestra agua bacteriostática cumple con los estándares de la Farmacopea de los Estados Unidos (USP) para:",
      "Our research-grade Semaglutide meets the highest quality standards required for reproducible scientific research:": "Nuestra semaglutida de grado de investigación cumple con los más altos estándares de calidad requeridos para una investigación científica reproducible:",
      "Peptide Shop supplies **research-grade 5-Amino-1MQ** with guaranteed ≥99% purity, verified through comprehensive HPLC analysis.": "Peptide Shop suministra **5-Amino-1MQ de grado de investigación** con una pureza garantizada de ≥99%, verificada mediante un análisis completo de HPLC.",
      "Peptide Shop supplies **research-grade AOD-9604** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis, ensuring researchers receive properly characterised material for their studies.": "Peptide Shop suministra **AOD-9604 de grado de investigación** con una pureza garantizada de ≥99%, verificada mediante un análisis completo de HPLC y espectrometría de masas. Cada pedido incluye un Certificado de Análisis detallado, lo que garantiza que los investigadores reciban material debidamente caracterizado para sus estudios.",
      "Peptide Shop supplies **research-grade BPC-157** with guaranteed ≥99% purity and full analytical documentation.": "Peptide Shop suministra **BPC-157 de grado de investigación** con una pureza garantizada de ≥99% y documentación analítica completa.",
      "Peptide Shop supplies **research-grade CJC-1295 No DAC** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis.": "Peptide Shop suministra **CJC-1295 No DAC de grado de investigación** con una pureza garantizada de ≥99%, verificada mediante un análisis completo de HPLC y espectrometría de masas.",
      "Peptide Shop supplies **research-grade Cagrilintide** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis.": "Peptide Shop suministra **Cagrilintida de grado de investigación** con una pureza garantizada de ≥99%, verificada mediante un análisis completo de HPLC y espectrometría de masas.",
      "Peptide Shop supplies **research-grade DSIP** with guaranteed ≥99% purity.": "Peptide Shop suministra **DSIP de grado de investigación** con una pureza garantizada de ≥99%.",
      "Peptide Shop supplies **research-grade Epitalon** with guaranteed ≥99% purity.": "Peptide Shop suministra **Epitalon de grado de investigación** con una pureza garantizada de ≥99%.",
      "Peptide Shop supplies **research-grade GHK-Cu** with guaranteed ≥99% purity.": "Peptide Shop suministra **GHK-Cu de grado de investigación** con una pureza garantizada de ≥99%.",
      "Peptide Shop supplies **research-grade GHRP-2** with guaranteed ≥99% purity.": "Peptide Shop suministra **GHRP-2 de grado de investigación** con una pureza garantizada de ≥99%.",
      "Peptide Shop supplies **research-grade GHRP-6** with guaranteed ≥99% purity.": "Peptide Shop suministra **GHRP-6 de grado de investigación** con una pureza garantizada de ≥99%.",
      "Peptide Shop supplies **research-grade HGH Fragment 176-191** with guaranteed ≥99% purity.": "Peptide Shop suministra **HGH Fragment 176-191 de grado de investigación** con una pureza garantizada de ≥99%.",
      "Peptide Shop supplies **research-grade Ipamorelin** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis.": "Peptide Shop suministra **Ipamorelina de grado de investigación** con una pureza garantizada de ≥99%, verificada mediante un análisis completo de HPLC y espectrometría de masas.",
      "Peptide Shop supplies **research-grade Melanotan 2** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis, ensuring researchers receive properly characterised material for their studies.": "Peptide Shop suministra **Melanotan 2 de grado de investigación** con una pureza garantizada de ≥99%, verificada mediante un análisis completo de HPLC y espectrometría de masas. Cada pedido incluye un Certificado de Análisis detallado, lo que garantiza que los investigadores reciban material debidamente caracterizado para sus estudios.",
      "Peptide Shop supplies **research-grade NAD+** with guaranteed ≥99% purity.": "Peptide Shop suministra **NAD+ de grado de investigación** con una pureza garantizada de ≥99%.",
      "Peptide Shop supplies **research-grade O-304** with guaranteed ≥99% purity.": "Peptide Shop suministra **O-304 de grado de investigación** con una pureza garantizada de ≥99%.",
      "Peptide Shop supplies **research-grade Retatrutide** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis, ensuring researchers receive properly characterised material for their studies.": "Peptide Shop suministra **Retatrutida de grado de investigación** con una pureza garantizada de ≥99%, verificada mediante un análisis completo de HPLC y espectrometría de masas. Cada pedido incluye un Certificado de Análisis detallado, lo que garantiza que los investigadores reciban material debidamente caracterizado para sus estudios.",
      "Peptide Shop supplies **research-grade Selank** with guaranteed ≥99% purity.": "Peptide Shop suministra **Selank de grado de investigación** con una pureza garantizada de ≥99%.",
      "Peptide Shop supplies **research-grade Semaglutide** with guaranteed ≥99% purity, verified by HPLC analysis and mass spectrometry. Every order includes a comprehensive Certificate of Analysis (COA), ensuring researchers receive properly characterised material for their studies.": "Peptide Shop suministra **Semaglutida de grado de investigación** con una pureza garantizada de ≥99%, verificada mediante análisis HPLC y espectrometría de masas. Cada pedido incluye un Certificado de Análisis (COA) completo, lo que garantiza que los investigadores reciban material debidamente caracterizado para sus estudios.",
      "Peptide Shop supplies **research-grade Semax** with guaranteed ≥99% purity.": "Peptide Shop suministra **Semax de grado de investigación** con una pureza garantizada de ≥99%.",
      "Peptide Shop supplies **research-grade TB-500** with guaranteed ≥99% purity.": "Peptide Shop suministra **TB-500 de grado de investigación** con una pureza garantizada de ≥99%.",
      "Peptide Shop supplies **research-grade Tesofensine** with guaranteed ≥99% purity, verified through comprehensive HPLC analysis.": "Peptide Shop suministra **Tesofensina de grado de investigación** con una pureza garantizada de ≥99%, verificada mediante un análisis completo de HPLC.",
      "Peptide Shop supplies **research-grade Tirzepatide** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis to ensure researchers receive properly characterised material for their studies.": "Peptide Shop suministra **Tirzepatida de grado de investigación** con una pureza garantizada de ≥99%, verificada mediante un análisis completo de HPLC y espectrometría de masas. Cada pedido incluye un Certificado de Análisis detallado para garantizar que los investigadores reciban material debidamente caracterizado para sus estudios.",
      "Peripheral actions include:": "Las acciones periféricas incluyen:",
      "Primary research applications include:": "Las principales aplicaciones de investigación incluyen:",
      "Research has demonstrated that Semaglutide may also promote beta-cell proliferation and reduce apoptosis in preclinical models, suggesting potential applications in studying beta-cell preservation strategies.": "La investigación ha demostrado que la semaglutida también puede promover la proliferación de células beta y reducir la apoptosis en modelos preclínicos, lo que sugiere posibles aplicaciones en el estudio de estrategias de preservación de células beta.",
      "Research interest in GHK-Cu stems from its remarkable effects on tissue regeneration, wound healing, and gene expression modulation. Studies suggest it influences over 4,000 genes related to tissue repair and regeneration.": "El interés de investigación en GHK-Cu proviene de sus notables efectos en la regeneración de tejidos, la cicatrización de heridas y la modulación de la expresión génica. Los estudios sugieren que influye en más de 4,000 genes relacionados con la reparación y regeneración de tejidos.",
      "Research interest in O-304 stems from its potential applications in metabolic disease, diabetes, and obesity research, where AMPK activation can improve glucose uptake and lipid oxidation.": "El interés de investigación en O-304 proviene de sus aplicaciones potenciales en la investigación de enfermedades metabólicas, diabetes y obesidad, donde la activación de AMPK puede mejorar la captación de glucosa y la oxidación de lípidos.",
      "Research into melanocortin effects on sexual behaviour:": "Investigación sobre los efectos de la melanocortina en el comportamiento sexual:",
      "Research often combines ipamorelin with GHRH analogs:": "La investigación a menudo combina ipamorelina con análogos de GHRH:",
      "Researchers often compare these related peptides:": "Los investigadores a menudo comparan estos péptidos relacionados:",
      "Retatrutide enables essential comparative studies:": "La Retatrutida permite estudios comparativos esenciales:",
      "Retatrutide's triple agonism creates a unique pharmacological profile by simultaneously engaging three complementary receptor systems, each contributing distinct metabolic effects.": "El triple agonismo de la retatrutida crea un perfil farmacológico único al involucrar simultáneamente tres sistemas de receptores complementarios, cada uno contribuyendo con efectos metabólicos distintos.",
      "Semaglutide crosses the blood-brain barrier and activates GLP-1 receptors in key hypothalamic regions involved in appetite regulation, including the arcuate nucleus and paraventricular nucleus. Research indicates that this central action contributes to reduced food intake and altered food preferences in animal models.": "La semaglutida atraviesa la barrera hematoencefálica y activa los receptores GLP-1 en regiones hipotalámicas clave involucradas en la regulación del apetito, incluidos el núcleo arqueado y el núcleo paraventricular. La investigación indica que esta acción central contribuye a la reducción de la ingesta de alimentos y a la alteración de las preferencias alimentarias en modelos animales.",
      "Semaglutide exerts its biological effects through high-affinity binding to the GLP-1 receptor (GLP-1R), a G protein-coupled receptor expressed in various tissues including pancreatic beta cells, the central nervous system, heart, and gastrointestinal tract. Upon receptor binding, Semaglutide initiates several downstream signalling cascades that researchers continue to investigate.": "La semaglutida ejerce sus efectos biológicos a través de la unión de alta afinidad al receptor GLP-1 (GLP-1R), un receptor acoplado a proteínas G expresado en varios tejidos, incluidas las células beta pancreáticas, el sistema nervioso central, el corazón y el tracto gastrointestinal. Tras la unión al receptor, la semaglutida inicia varias cascadas de señalización aguas abajo que los investigadores continúan investigando.",
      "Semaglutide is extensively used in metabolic research laboratories studying:": "La semaglutida se utiliza ampliamente en laboratorios de investigación metabólica que estudian:",
      "TB-500 contains the key sequence responsible for Tβ4's biological activity, particularly the actin-binding domain that promotes cell motility and tissue regeneration. This makes it invaluable for research into wound healing, muscle repair, and inflammatory conditions.": "TB-500 contiene la secuencia clave responsable de la actividad biológica de Tβ4, particularmente el dominio de unión a actina que promueve la motilidad celular y la regeneración de tejidos. Esto lo hace invaluable para la investigación sobre la cicatrisation de heridas, la reparación muscular y las condiciones inflamatorias.",
      "Tesofensine increases synaptic concentrations of three key neurotransmitters:": "La tesofensina aumenta las concentraciones sinápticas de tres neurotransmisores clave:",
      "The GIP receptor component may provide unique effects on adipose tissue:": "El componente del receptor GIP puede proporcionar efectos únicos sobre el tejido adiposo:",
      "The GIP receptor is predominantly expressed in pancreatic beta cells and adipose tissue, while GLP-1 receptors are found in pancreatic islets, brain, heart, and gastrointestinal tract. By activating both receptor systems simultaneously, Tirzepatide provides researchers with a unique tool for studying:": "El receptor GIP se expresa predominantemente en las células beta pancreáticas y el tejido adiposo, mientras que los receptores GLP-1 se encuentran en los islotes pancreáticos, el cerebro, el corazón y el tracto gastrointestinal. Al activar ambos sistemas de receptores simultáneamente, la tirzepatida proporciona a los investigadores una herramienta única para estudiar:",
      "The GLP-1 component provides established incretin effects:": "El componente GLP-1 proporciona efectos de incretina establecidos:",
      "The dual agonist is valuable for investigating:": "El agonista dual es valioso para investigar:",
      "The molecular structure of Semaglutide features a unique C-18 fatty diacid chain attached to the lysine residue at position 26. This structural modification enables the peptide to bind to serum albumin, dramatically extending its biological half-life to approximately seven days. This prolonged activity profile makes Semaglutide an invaluable tool for researchers studying sustained GLP-1 receptor activation mechanisms.": "La estructura molecular de la semaglutida presenta una cadena única de diácido graso C-18 unida al residuo de lisina en la posición 26. Esta modificación estructural permite que el péptido se una a la albúmina sérica, extendiendo dramáticamente su vida media biológica a aproximadamente siete días. Este perfil de actividad prolongado hace que la semaglutida sea una herramienta invaluable para los investigadores que estudian los mecanismos de activación sostenida del receptor GLP-1.",
      "The peptide binds to GHRH receptors on pituitary somatotropes:": "El péptido se une a los receptores GHRH en los somatotropos pituitarios:",
      "The peptide enables focused weight studies:": "El péptido permite estudios de peso enfocados:",
      "The peptide promotes fat breakdown through:": "El péptido promueve la degradación de grasas a través de:",
      "The peptide represents the first 29 amino acids of GHRH with modifications at positions 2, 8, 15, and 27 to improve resistance to enzymatic degradation. These modifications make it a more practical research tool while maintaining GHRH receptor binding activity.": "El péptido representa los primeros 29 aminoácidos de GHRH con modificaciones en las posiciones 2, 8, 15 y 27 para mejorar la resistencia a la degradación enzimática. Estas modificaciones lo convierten en una herramienta de investigación más práctica al tiempo que mantiene la actividad de unión al receptor GHRH.",
      "The peptide represents the next evolution beyond dual agonists like tirzepatide, adding glucagon receptor activation to the established GLP-1/GIP dual agonism. This triple receptor engagement enables researchers to study the complex interplay between these metabolic signalling systems and their combined effects on glucose homeostasis, energy expenditure, and body weight regulation.": "El péptido representa la siguiente evolución más allá de los agonistas duales como la tirzepatida, añadiendo la activación del receptor de glucagón al agonismo dual GLP-1/GIP establecido. Esta participación de triple receptor permite a los investigadores estudiar la compleja interacción entre estos sistemas de señalización metabólica y sus efectos combinados sobre la homeostasis de la glucosa, el gasto energético y la regulación del peso corporal.",
      "The peptide's cyclic lactam structure provides enhanced stability and receptor binding affinity compared to linear α-MSH analogues. Melanotan 2 acts as a non-selective agonist at melanocortin receptors MC1, MC3, MC4, and MC5, enabling researchers to study diverse physiological processes beyond pigmentation.": "La estructura de lactama cíclica del péptido proporciona una estabilidad y afinidad de unión al receptor mejoradas en comparación con los análogos lineales de α-MSH. Melanotan 2 actúa como un agonista no selectivo en los receptores de melanocortina MC1, MC3, MC4 y MC5, lo que permite a los investigadores estudiar diversos procesos fisiológicos más allá de la pigmentación.",
      "The peptide's effects on body weight have made it crucial for obesity research, including studies on:": "Los efectos del péptido en el peso corporal lo han hecho crucial para la investigación de la obesidad, incluidos los estudios sobre:",
      "The peptide's improved selectivity profile makes it valuable for studying GH secretion mechanisms without confounding orexigenic effects.": "El perfil de selectividad mejorado del péptido lo hace valioso para estudiar los mecanismos de secreción de GH sin efectos orexigénicos de confusión.",
      "The peptide's name reflects its origin—a body protection compound identified for its remarkable cytoprotective and regenerative properties across multiple tissue types including tendons, ligaments, muscles, and gastrointestinal epithelium.": "El nombre del péptido refleja su origen: un compuesto de protección corporal identificado por sus notables propiedades citoprotectoras y regenerativas en múltiples tipos de tejidos, incluidos tendones, ligamentos, músculos y epitelio gastrointestinal.",
      "The peptide's primary interest lies in its reported ability to activate telomerase, potentially influencing cellular lifespan and age-related changes.": "El interés principal del péptido radica en su capacidad reportada para activar la telomerasa, influyendo potencialmente en la vida útil celular y los cambios relacionados con la edad.",
      "The peptide's structure incorporates a modified GIP sequence with carefully engineered amino acid substitutions and a C20 fatty diacid side chain attached to lysine. This modification enables binding to serum albumin, extending the biological half-life to approximately five days and allowing researchers to study sustained dual receptor activation.": "La estructura del péptido incorpora una secuencia GIP modificada con sustituciones de aminoácidos cuidadosamente diseñadas y una cadena lateral de diácido graso C20 unida a la lisina. Esta modificación permite la unión a la albúmina sérica, extendiendo la vida media biológica a aproximadamente cinco días y permitiendo a los investigadores estudiar la activación sostenida del receptor dual.",
      "The presence of GLP-1 receptors in the brain has sparked significant neuroscience research using Semaglutide:": "La presencia de receptores GLP-1 en el cerebro ha provocado una importante investigación en neurociencia utilizando semaglutida:",
      "The primary research application involves studying skin pigmentation:": "La principal aplicación de investigación implica estudiar la pigmentación de la piel:",
      "The thermogenic component opens unique research directions:": "El componente termogénico abre direcciones de investigación únicas:",
      "The triple agonist provides comprehensive weight research tools:": "El triple agonista proporciona herramientas integrales de investigación de peso:",
      "The triple combination creates unique research opportunities:": "La triple combinación crea oportunidades de investigación únicas:",
      "The unique glucagon component provides:": "El componente de glucagón único proporciona:",
      "Tirzepatide enables crucial comparative studies between:": "La tirzepatida permite estudios comparativos cruciales entre:",
      "Tirzepatide exerts its biological effects through simultaneous activation of GIP and GLP-1 receptors, both of which are G protein-coupled receptors expressed in various metabolically active tissues. This dual agonism creates synergistic signalling effects that researchers continue to characterise.": "La tirzepatida ejerce sus efectos biológicos a través de la activación simultánea de los receptores GIP y GLP-1, ambos receptores acoplados a proteínas G expresados en diversos tejidos metabólicamente activos. Este agonismo dual crea efectos de señalización sinérgicos que los investigadores continúan caracterizando.",
      "Tirzepatide's superior weight outcomes in preclinical models make it essential for:": "Los resultados superiores de peso de la tirzepatida en modelos preclínicos la hacen esencial para:",
      "Unlike benzodiazepines, Selank does not produce sedation or dependence, making it a valuable tool for researching anxiety mechanisms and novel therapeutic approaches.": "A diferencia de las benzodiazepinas, Selank no produce sedación ni dependencia, lo que lo convierte en una herramienta valiosa para investigar los mecanismos de ansiedad y nuevos enfoques terapéuticos.",
      "Unlike more selective peptides such as ipamorelin, GHRP-6 also stimulates appetite and affects cortisol and prolactin levels, making it useful for studying the full spectrum of ghrelin receptor effects.": "A diferencia de los péptidos más selectivos como la ipamorelina, GHRP-6 también estimula el apetito y afecta los niveles de cortisol y prolactina, lo que lo hace útil para estudiar el espectro completo de efectos del receptor de grelina.",
      "Unlike single-target compounds, tesofensine's triple mechanism enables researchers to investigate the complex interplay between monoaminergic systems in controlling food intake and metabolic rate. This makes it valuable for understanding the neuropharmacology of obesity and appetite disorders.": "A diferencia de los compuestos de un solo objetivo, el mecanismo triple de la tesofensina permite a los investigadores investigar la compleja interacción entre los sistemas monoaminérgicos en el control de la ingesta de alimentos y la tasa metabólica. Esto lo hace valioso para comprender la neurofarmacología de la obesidad y los trastornos del apetito.",
      "Unlike single-use sterile water, bacteriostatic water allows multiple withdrawals over several weeks without contamination risk, making it cost-effective for research laboratories.": "A diferencia del agua estéril de un solo uso, el agua bacteriostática permite extracciones múltiples durante varias semanas sin riesgo de contaminación, lo que la hace rentable para los laboratorios de investigación.",
      "Without DAC, the peptide produces:": "Sin DAC, el péptido produce:"
    },
    it: {
      // Italian SEO optimized phrases
      "What is": "Cos'è",
      "How does": "Come funziona",
      "Benefits of": "Benefici di",
      "Research Applications": "Applicazioni di Ricerca",
      "Storage Instructions": "Istruzioni di Conservazione",
      "Reconstitution Guide": "Guida alla Ricostituzione",
      "Dosage Information": "Informazioni sul Dosaggio",
      "Key Benefits": "Benefici Principali",
      "Why Choose": "Perché Scegliere",
      "Product Overview": "Panoramica del Prodotto",
      "Scientific Background": "Contesto Scientifico",
      "Quality Assurance": "Garanzia di Qualità",
      "Shipping Information": "Informazioni sulla Spedizione",
      "Related Products": "Prodotti Correlati",
      // Italian SEO keywords
      "Buy": "Acquista",
      "purchase": "acquistare",
      "order": "ordinare",
      "online": "online",
      "high quality": "alta qualità",
      "research grade": "qualità di ricerca",
      "laboratory": "laboratorio",
      "peptide": "peptide",
      "peptides": "peptidi",
      "purity": "purezza",
      "verified": "verificato",
      "certified": "certificato",
      "fast delivery": "consegna rapida",
      "fast shipping": "spedizione veloce",
      "UK delivery": "consegna in Italia",
      "Europe": "Europa",
      "European": "Europeo",
      // Research terms
      "research purposes": "scopi di ricerca",
      "scientific research": "ricerca scientifica",
      "in vitro": "in vitro",
      "clinical studies": "studi clinici",
      "laboratory use": "uso in laboratorio",
      // Product attributes
      "lyophilized powder": "polvere liofilizzata",
      "sterile": "sterile",
      "injectable": "iniettabile",
      "subcutaneous": "sottocutaneo",
      "intramuscular": "intramuscolare",
      // Actions
      "Store": "Conservare",
      "Keep": "Mantenere",
      "Reconstitute": "Ricostituire",
      "Mix": "Mescolare",
      "Inject": "Iniettare",
      "refrigerated": "refrigerato",
      "frozen": "congelato",
      "room temperature": "temperatura ambiente",
      // Technical/Scientific terms - Italian
      "synthetic": "sintetico",
      "amino acids": "amminoacidi",
      "amino acid": "amminoacido",
      "derived from": "derivato da",
      "protein": "proteina",
      "gastric juice": "succo gastrico",
      "discovery": "scoperta",
      "extensively studied": "ampiamente studiato",
      "tissue healing": "guarigione dei tessuti",
      "tissue repair": "riparazione dei tessuti",
      "regeneration": "rigenerazione",
      "cytoprotective": "citoprotettivo",
      "regenerative properties": "proprietà rigenerative",
      "multiple tissue types": "molteplici tipi di tessuti",
      "including": "inclusi",
      "tendons": "tendini",
      "ligaments": "legamenti",
      "muscles": "muscoli",
      "gastrointestinal epithelium": "epitelio gastrointestinale",
      // How it works - Italian
      "How Does": "Come Funziona",
      "Growth Factor Modulation": "Modulazione dei Fattori di Crescita",
      "VEGF upregulation": "Regolazione positiva del VEGF",
      "Enhanced angiogenesis": "Angiogenesi migliorata",
      "GH receptor effects": "Effetti sui recettori GH",
      "Growth hormone pathway": "Via dell'ormone della crescita",
      "EGF modulation": "Modulazione dell'EGF",
      "Epithelial growth support": "Supporto alla crescita epiteliale",
      "NGF interaction": "Interazione con NGF",
      "Nerve growth effects": "Effetti sulla crescita nervosa",
      "Nitric Oxide System": "Sistema dell'Ossido Nitrico",
      "NO pathway activation": "Attivazione della via NO",
      "Vasodilation effects": "Effetti vasodilatatori",
      "Endothelial function": "Funzione endoteliale",
      "Vascular health": "Salute vascolare",
      "Blood flow enhancement": "Miglioramento del flusso sanguigno",
      "Tissue perfusion": "Perfusione tissutale",
      "Cytoprotective Actions": "Azioni Citoprotettive",
      "Gastric protection": "Protezione gastrica",
      "Original discovery context": "Contesto di scoperta originale",
      "Mucosal healing": "Guarigione delle mucose",
      "GI epithelium repair": "Riparazione dell'epitelio GI",
      "Anti-inflammatory": "Antinfiammatorio",
      "Reduced damage markers": "Marcatori di danno ridotti",
      // Research Applications - Italian
      "Musculoskeletal Healing": "Guarigione Muscoloscheletrica",
      "Tendon repair": "Riparazione dei tendini",
      "rotator cuff models": "modelli di cuffia dei rotatori",
      "Ligament healing": "Guarigione dei legamenti",
      "ACL research": "Ricerca sul LCA",
      "Muscle regeneration": "Rigenerazione muscolare",
      "Injury recovery": "Recupero da infortuni",
      "Gastrointestinal Research": "Ricerca Gastrointestinale",
      "Ulcer healing": "Guarigione delle ulcere",
      "Gastric cytoprotection": "Citoprotezione gastrica",
      "IBD models": "Modelli di MICI",
      "Inflammatory bowel research": "Ricerca sulle malattie infiammatorie intestinali",
      "Mucosal barrier": "Barriera mucosa",
      "Gut integrity": "Integrità intestinale",
      "Wound Healing": "Guarigione delle Ferite",
      "Skin repair": "Riparazione della pelle",
      "Dermal regeneration": "Rigenerazione dermica",
      "Angiogenesis": "Angiogenesi",
      "Blood vessel formation": "Formazione dei vasi sanguigni",
      "Fibroblast activity": "Attività dei fibroblasti",
      "Collagen production": "Produzione di collagene",
      // Table/spec terms - Italian
      "Condition": "Condizione",
      "Temperature": "Temperatura",
      "Duration": "Durata",
      "Lyophilised": "Liofilizzato",
      "Reconstituted": "Ricostituito",
      "up to": "fino a",
      "months": "mesi",
      "weeks": "settimane",
      "Size": "Dimensione",
      "Price": "Prezzo",
      "From": "Da",
      "Minimum order": "Ordine minimo",
      "discount on orders over": "sconto su ordini superiori a",
      // Features/Benefits - Italian
      "Guaranteed": "Garantito",
      "Full documentation": "Documentazione completa",
      "COA with every order": "COA con ogni ordine",
      "UK laboratory tested": "Testato in laboratorio",
      "Quality assured": "Qualità assicurata",
      "Express shipping available": "Spedizione espressa disponibile",
      "Research support": "Supporto alla ricerca",
      "Technical assistance": "Assistenza tecnica",
      "Why Choose Peptide Shop": "Perché Scegliere Peptide Shop",
      "Peptide Shop supplies": "Peptide Shop fornisce",
      // Product page section headings
      "Specification": "Specifica",
      "Detail": "Dettaglio",
      "Reconstitution and Handling": "Ricostituzione e Manipolazione",
      "Reconstitution Protocol": "Protocollo di Ricostituzione",
      "Storage Recommendations": "Raccomandazioni di Conservazione",
      "For laboratory research only": "Solo per ricerca di laboratorio",
      "Not intended for human or veterinary use": "Non destinato all'uso umano o veterinario",
      "Researchers should follow all applicable regulations": "I ricercatori devono seguire tutte le normative applicabili",
      "Allow vial to reach room temperature": "Permettere alla fiala di raggiungere la temperatura ambiente",
      "Add bacteriostatic water slowly": "Aggiungere acqua batteriostatica lentamente",
      "Gently swirl": "Agitare delicatamente",
      "do not shake": "non agitare",
      "Solution should be clear": "La soluzione deve essere limpida",
      "Specifications": "Specifiche",
      "CAS Number": "Numero CAS",
      "Molecular Formula": "Formula Molecolare",
      "Molecular Weight": "Peso Molecolare",
      "Sequence": "Sequenza",
      "Appearance": "Aspetto",
      "White lyophilised powder": "Polvere liofilizzata bianca",
      "HPLC verified": "Verificato tramite HPLC",
      // Bacteriostatic Water & Supplies - Italian
      "Bacteriostatic Water": "Acqua batteriostatica",
      "bacteriostatic water": "acqua batteriostatica",
      "BAC water": "Acqua BAC",
      "Sterile Water": "Acqua Sterile",
      "sterile water": "acqua sterile",
      "Peptide Reconstitution": "Ricostituzione di Peptidi",
      "peptide reconstitution": "ricostituzione di peptidi",
      "for Peptide Research": "per la Ricerca sui Peptidi",
      "What is Bacteriostatic Water": "Cos'è l'Acqua batteriostatica",
      "benzyl alcohol": "alcool benzilico",
      "bacteriostatic preservative": "conservante batteriostatico",
      "inhibits the growth of bacteria": "inibisce la crescita dei batteri",
      "inhibits bacterial growth": "inibisce la crescita batterica",
      "reconstituting lyophilized": "ricostituzione di peptidi liofilizzati",
      "freeze-dried": "liofilizzati",
      "lyophilized": "liofilizzati",
      "for research applications": "per applicazioni di ricerca",
      "multiple withdrawals": "prelievi multipli",
      "from the same vial": "dalla stessa fiala",
      "are needed": "sono necessari",
      "Key Features": "Caratteristiche Principali",
      "USP Grade Quality": "Qualità USP",
      "USP Grade": "Qualità USP",
      "USP grade": "qualità USP",
      "Our bacteriostatic water meets": "La nostra acqua batteriostatica soddisfa gli",
      "United States Pharmacopeia": "Farmacopea degli Stati Uniti",
      "USP standards": "standard USP",
      "standards for": "standard per",
      "Sterility": "Sterilità",
      "Purity": "Purezza",
      "concentration": "concentrazione",
      "Endotoxin levels": "Livelli di endotossine",
      "endotoxin levels": "livelli di endotossine",
      "Multi-Use Design": "Design Multi-Uso",
      "Unlike single-use": "A differenza dell'uso singolo",
      "single-use sterile water": "acqua sterile monouso",
      "single-use": "monouso",
      "allows multiple withdrawals": "consente prelievi multipli",
      "over several weeks": "per diverse settimane",
      "several weeks": "diverse settimane",
      "without contamination risk": "senza rischio di contaminazione",
      "contamination risk": "rischio di contaminazione",
      "cost-effective": "conveniente",
      "for research laboratories": "per laboratori di ricerca",
      "research laboratories": "laboratori di ricerca",
      "Convenient": "Comodo",
      "convenient": "comodo",
      "Each": "Ogni",
      "each": "ogni",
      "vial can": "fiala può",
      "can reconstitute": "può ricostituire",
      "peptide vials": "fiale di peptidi",
      "depending on concentration requirements": "a seconda dei requisiti di concentrazione",
      "How to Use": "Come Usare",
      "How to use": "Come usare",
      "Reconstitution Steps": "Passaggi di Ricostituzione",
      "Allow the peptide vial": "Lasciare che la fiala di peptide",
      "to reach room temperature": "raggiunga la temperatura ambiente",
      "Clean both vial tops": "Pulire entrambi i tappi delle fiale",
      "with an alcohol swab": "con un tampone alcolico",
      "alcohol swab": "tampone alcolico",
      "Using a sterile syringe": "Usando una siringa sterile",
      "sterile syringe": "siringa sterile",
      "withdraw the desired amount": "prelevare la quantità desiderata",
      "desired amount": "quantità desiderata",
      "Insert the needle": "Inserire l'ago",
      "into the peptide vial": "nella fiala di peptide",
      "aiming at the glass wall": "mirando alla parete di vetro",
      "glass wall": "parete di vetro",
      "Slowly inject": "Iniettare lentamente",
      "allowing it to run down": "lasciandolo scorrere",
      "run down the vial wall": "scorrere lungo la parete della fiala",
      "vial wall": "parete della fiala",
      "until fully dissolved": "fino a completo scioglimento",
      "fully dissolved": "completamente sciolto",
      "Store reconstituted peptide": "Conservare il peptide ricostituito",
      "reconstituted peptide": "peptide ricostituito",
      "Recommended Volumes": "Volumi Consigliati",
      "Peptide Amount": "Quantità di Peptide",
      "Suggested": "Suggerito",
      "suggested": "suggerito",
      "Concentration": "Concentrazione",
      "Storage": "Conservazione",
      "Unopened": "Non aperto",
      "unopened": "non aperto",
      "away from direct light": "lontano dalla luce diretta",
      "direct light": "luce diretta",
      "Opened": "Aperto",
      "opened": "aperto",
      "Use within": "Usare entro",
      "use within": "usare entro",
      "days": "giorni",
      "Do not freeze": "Non congelare",
      "do not freeze": "non congelare",
      "Freezing may compromise sterility": "Il congelamento può compromettere la sterilità",
      "may compromise sterility": "può compromettere la sterilità",
      "Shelf life": "Durata di conservazione",
      "shelf life": "durata di conservazione",
      "years from manufacture date": "anni dalla data di produzione",
      "manufacture date": "data di produzione",
      "Applications in Research": "Applicazioni nella Ricerca",
      "is essential for": "è essenziale per",
      "essential for": "essenziale per",
      "for in vitro studies": "per studi in vitro",
      "in vitro studies": "studi in vitro",
      "Preparation of stock solutions": "Preparazione di soluzioni madre",
      "stock solutions": "soluzioni madre",
      "Multi-day research protocols": "Protocolli di ricerca multi-giorno",
      "research protocols": "protocolli di ricerca",
      "requiring repeat sampling": "che richiedono campionamenti ripetuti",
      "repeat sampling": "campionamenti ripetuti",
      "sterility must be maintained": "la sterilità deve essere mantenuta",
      "maintained over time": "mantenuta nel tempo",
      "over time": "nel tempo",
      "Comparison": "Confronto",
      "comparison": "confronto",
      "Feature": "Caratteristica",
      "feature": "caratteristica",
      "Preservative": "Conservante",
      "preservative": "conservante",
      "Multiple Uses": "Usi Multipli",
      "multiple uses": "usi multipli",
      "Single use only": "Solo uso singolo",
      "single use only": "solo uso singolo",
      "Bacterial Growth": "Crescita Batterica",
      "bacterial growth": "crescita batterica",
      "Inhibited": "Inibita",
      "inhibited": "inibita",
      "Possible after opening": "Possibile dopo l'apertura",
      "after opening": "dopo l'apertura",
      "Best For": "Ideale Per",
      "best for": "ideale per",
      "Multi-dose peptides": "Peptidi multi-dose",
      "multi-dose": "multi-dose",
      "Single-dose applications": "Applicazioni mono-dose",
      "single-dose": "mono-dose",
      "Every batch": "Ogni lotto",
      "every batch": "ogni lotto",
      "undergoes testing": "viene sottoposto a test",
      "testing for": "test per",
      "Tested per": "Testato secondo",
      "tested per": "testato secondo",
      "Particulate Matter": "Materiale Particolato",
      "particulate matter": "materiale particolato",
      "Content": "Contenuto",
      "content": "contenuto",
      "Verified at": "Verificato a",
      "verified at": "verificato a",
      "Popular": "Popolare",
      "popular": "popolare",
      "healing peptide": "peptide curativo",
      "Recovery peptide": "Peptide di recupero",
      "recovery peptide": "peptide di recupero",
      "GLP-1 agonist": "agonista GLP-1",
      // Product-specific headings and terms - Italian
      "Research Use Statement": "Dichiarazione sull'Uso per la Ricerca",
      "Ordering Information": "Informazioni sull'Ordine",
      "Important Research Use Notice": "Avviso Importante sull'Uso per la Ricerca",
      "Order Today": "Ordina Oggi",
      "Order": "Ordina",
      "Today": "Oggi",
      "Work": "Funzionare",
      "Peptide Specifications": "Specifiche del Peptide",
      // Research categories
      "Obesity Research": "Ricerca sull'Obesità",
      "Metabolic Research": "Ricerca Metabolica",
      "Gene Expression": "Espressione Genica",
      "GH Axis Studies": "Studi sull'Asse GH",
      "Delivery Options": "Opzioni di Consegna",
      "Available Package Sizes": "Dimensioni del Pacchetto Disponibili",
      "Guaranteed Purity": "Purezza Garantita",
      "UK-Based Delivery": "Consegna dall'Italia",
      "Weight Management Studies": "Studi sulla Gestione del Peso",
      "Tissue Repair": "Riparazione dei Tessuti",
      "Selectivity Profile": "Profilo di Selettività",
      "Selective Action": "Azione Selettiva",
      "Research Support": "Supporto alla Ricerca",
      "Neuroprotection": "Neuroprotezione",
      "Lipolytic Activity": "Attività Lipolitica",
      "GHS-R Activation": "Attivazione GHS-R",
      "Diabetes Research": "Ricerca sul Diabete",
      "Comparative Incretin Research": "Ricerca Comparativa sulle Incretine",
      "Combination Research": "Ricerca Combinata",
      "Cognitive Research": "Ricerca Cognitiva",
      "Central Nervous System Actions": "Azioni sul Sistema Nervoso Centrale",
      "Key Differences": "Differenze Chiave",
      // Additional Research Headers - Italian
      "Actin Regulation": "Regolazione dell'actina",
      "Adipose Tissue": "Tessuto adiposo",
      "Adipose Tissue Effects": "Effetti sul tessuto adiposo",
      "Ageing Research": "Ricerca sull'invecchiamento",
      "Anti-Inflammatory Research": "Ricerca antinfiammatoria",
      "Anti-Lipogenic Effects": "Effetti anti-lipogenici",
      "Anxiety Research": "Ricerca sull'ansia",
      "Appetite Research": "Ricerca sull'appetito",
      "Appetite and Obesity Research": "Ricerca sull'appetito e l'obesità",
      "Cardiovascular Research": "Ricerca cardiovascolare",
      "Cell Biology": "Biologia cellulare",
      "Central Nervous System Effects": "Effetti sul sistema nervoso centrale",
      "Circadian Research": "Ricerca circadiana",
      "Collagen & ECM": "Collagene e ECM",
      "Competitive Pricing": "Prezzi competitivi",
      "Comprehensive Documentation": "Documentazione completa",
      "Convenient 10ml Size": "Comodo formato da 10 ml",
      "Copper Delivery": "Fornitura di rame",
      "DNA Repair": "Riparazione del DNA",
      "Dedicated Support": "Supporto dedicato",
      "Direct AMPK Activation": "Attivazione diretta dell'AMPK",
      "Dopamine Effects": "Effetti della dopamina",
      "Downstream Pathways": "Vie a valle",
      "Dual Incretin Receptor Activation": "Doppia attivazione del recettore dell'incretina",
      "Energy Expenditure Studies": "Studi sulla spesa energetica",
      "Energy Metabolism": "Metabolismo energetico",
      "Exercise Mimetics": "Mimetici dell'esercizio",
      "Fat Metabolism": "Metabolismo dei grassi",
      "Fat Metabolism Studies": "Studi sul metabolismo dei grassi",
      "GABA System": "Sistema GABA",
      "GH Axis Research": "Ricerca sull'asse GH",
      "GHRH Receptor Activation": "Attivazione del recettore GHRH",
      "GIP Receptor Activation": "Attivazione del recettore GIP",
      "GLP-1 Receptor Activation": "Attivazione del recettore GLP-1",
      "Gastric Effects": "Effetti gastrici",
      "Gastrointestinal Effects": "Effetti gastrointestinali",
      "Glucagon Receptor Activation": "Attivazione del recettore del glucagone",
      "Hepatic Metabolism Research": "Ricerca sul metabolismo epatico",
      "Immunology": "Immunologia",
      "Inflammation Modulation": "Modulazione dell'infiammazione",
      "Inflammatory Disease Models": "Modelli di malattie infiammatorie",
      "Longevity Research": "Ricerca sulla longevità",
      "Melanocortin Receptor Family": "Famiglia dei recettori della melanocortina",
      "Melanogenesis Pathway": "Via della melanogenesi",
      "Metabolic Effects": "Effetti metabolici",
      "Metabolic Studies": "Studi metabolici",
      "Metabolic Syndrome Studies": "Studi sulla sindrome metabolica",
      "Metabolism": "Metabolismo",
      "Methylation Balance": "Equilibrio di metilazione",
      "Modified Stability": "Stabilità modificata",
      "Monoamine Regulation": "Regolazione delle monoamine",
      "NAD+ Metabolism": "Metabolismo del NAD+",
      "Neuroendocrine": "Neuroendocrino",
      "Neuroplasticity": "Neuroplasticità",
      "Neuroscience": "Neuroscienze",
      "Neuroscience Applications": "Applicazioni neuroscientifiche",
      "Neurotransmitter Effects": "Effetti dei neurotrasmettitori",
      "Neurotrophin Modulation": "Modulazione delle neurotrofine",
      "Norepinephrine Effects": "Effetti della noradrenalina",
      "Obesity Studies": "Studi sull'obesità",
      "Other Effects": "Altri effetti",
      "Pancreatic Beta-Cell Effects": "Effetti sulle cellule beta pancreatiche",
      "Pancreatic Effects": "Effetti pancreatici",
      "Pigmentation Research": "Ricerca sulla pigmentazione",
      "Pineal Function": "Funzione pineale",
      "Pituitary Function": "Funzione ipofisaria",
      "Pulsatile vs Sustained Release": "Rilascio pulsatile vs sostenuto",
      "Receptor Activation": "Attivazione dei recettori",
      "Satiety Signalling": "Segnalazione di sazietà",
      "Secondary Effects": "Effetti secondari",
      "Serotonin Effects": "Effetti della serotonina",
      "Sexual Function Studies": "Studi sulla funzione sessuale",
      "Sirtuin Activation": "Attivazione della sirtuina",
      "Skin Disorder Research": "Ricerca sui disturbi della pelle",
      "Skin Research": "Ricerca sulla pelle",
      "Sleep Regulation": "Regolazione del sonno",
      "Sleep Research": "Ricerca sul sonno",
      "Stress Research": "Ricerca sullo stress",
      "Synergistic Metabolic Effects": "Effetti metabolici sinergici",
      "Synergy with GHRH": "Sinergia con GHRH",
      "Telomerase Activation": "Attivazione della telomerasi",
      "UK-Based Supplier": "Fornitore con sede in Italia",
      "UK-Based Supply": "Fornitura dall'Italia",
      "Verified Purity": "Purezza verificata",
      "Weight Management Research": "Ricerca sulla gestione del peso",
      // Scientific terms
      "synthetic analogue": "analogo sintetico",
      "analogue": "analogo",
      "analog": "analogo",
      "hormone": "ormone",
      "receptor": "recettore",
      "receptor agonist": "agonista del recettore",
      "agonist": "agonista",
      "antagonist": "antagonista",
      "binding": "legame",
      "affinity": "affinità",
      "selectivity": "selettività",
      "mechanism": "meccanismo",
      "pathway": "via di segnalazione",
      "signalling": "segnalazione",
      "activation": "attivazione",
      "inhibition": "inibizione",
      "modulation": "modulazione",
      "expression": "espressione",
      "regulation": "regolazione",
      "metabolism": "metabolismo",
      "metabolic": "metabolico",
      "glucose": "glucosio",
      "insulin": "insulina",
      "insulin secretion": "secrezione di insulina",
      "appetite regulation": "regolazione dell'appetito",
      "appetite": "appetito",
      "weight management": "gestione del peso",
      "weight loss": "perdita di peso",
      "obesity": "obesità",
      "diabetes": "diabete",
      "type 2 diabetes": "diabete di tipo 2",
      "blood sugar": "glicemia",
      "half-life": "emivita",
      "bioavailability": "biodisponibilità",
      "pharmacokinetics": "farmacocinetica",
      "pharmacodynamics": "farmacodinamica",
      // Product descriptions
      "research peptide": "peptide di ricerca",
      "research-grade": "qualità di ricerca",
      "pharmaceutical grade": "qualità farmaceutica",
      "raw peptide": "peptide grezzo",
      "active pharmaceutical ingredient": "principio attivo farmaceutico",
      "brand-name": "marchio",
      "prescription medications": "farmaci con prescrizione",
      "laboratory research purposes": "scopi di ricerca di laboratorio",
      "human consumption": "consumo umano",
      "medical treatment": "trattamento medico",
      "not for human use": "non per uso umano",
      "for research only": "solo per ricerca",
      "research only": "solo ricerca",
      // Quality and purity
      "HPLC analysis": "analisi HPLC",
      "mass spectrometry": "spettrometria di massa",
      "Certificate of Analysis": "Certificato di Analisi",
      "COA": "COA",
      "batch": "lotto",
      "lot": "lotto",
      "identity": "identità",
      "peptide content": "contenuto di peptide",
      "quality control": "controllo qualità",
      "strict quality control": "controllo qualità rigoroso",
      "manufacturing": "produzione",
      "shipping": "spedizione",
      // Storage terms
      "long-term stability": "stabilità a lungo termine",
      "refrigerator": "frigorifero",
      "freeze-thaw cycles": "cicli di congelamento-scongelamento",
      "protect from light": "proteggere dalla luce",
      "airtight containers": "contenitori ermetici",
      "moisture absorption": "assorbimento dell'umidità",
      "properly stored": "conservato correttamente",
      // Reconstitution
      "sterile bacteriostatic water": "acqua battariostatica sterile",
      "alkaline buffer": "tampone alcalino",
      "isoelectric point": "punto isoelettrico",
      "peptide degradation": "degradazione del peptide",
      "dissolution": "dissoluzione",
      "dissolve": "sciogliere",
      // Delivery
      "next day delivery": "consegna il giorno successivo",
      "standard shipping": "spedizione standard",
      "express delivery": "consegna espressa",
      "international shipping": "spedizione internazionale",
      "customs delays": "ritardi doganali",
      "overseas orders": "ordini internazionali",
      "tracked delivery": "consegna tracciata",
      "discrete packaging": "imballaggio discreto",
      "cold packs": "pacchetti freddi",
      "dry ice": "ghiaccio secco",
      // Ordering
      "minimum order": "ordine minimo",
      "bulk pricing": "prezzi all'ingrosso",
      "custom orders": "ordini personalizzati",
      "institutional research": "ricerca istituzionale",
      "larger quantities": "quantità maggiori",
      "package sizes": "dimensioni del pacchetto",
      "vial": "fiala",
      "vials": "fiale",
      // Scientific activities
      "binding assays": "saggi di legame",
      "receptor binding": "legame al recettore",
      "in vivo": "in vivo",
      "disease models": "modelli di malattia",
      "research models": "modelli di ricerca",
      "pilot studies": "studi pilota",
      "published literature": "letteratura pubblicata",
      "published data": "dati pubblicati",
      "reference standards": "standard di riferimento",
      "reproducible results": "risultati riproducibili",
      "consistent quality": "qualità costante",
      "batch-to-batch": "lotto per lotto",
      // Body/biological terms
      "intestines": "intestini",
      "gastric": "gastrico",
      "beta-cell": "cellula beta",
      "beta-cell function": "funzione delle cellule beta",
      "gastric emptying": "svuotamento gastrico",
      "neuroprotective": "neuroprotettivo",
      "serum albumin": "albumina sierica",
      "albumin binding": "legame all'albumina",
      "biological half-life": "emivita biologica",
      "prolonged activity": "attività prolungata",
      "sustained activation": "attivazione sostenuta",
      "**5-Amino-1MQ** (5-Amino-1-Methylquinolinium) is a selective inhibitor of nicotinamide N-methyltransferase (NNMT), an enzyme increasingly recognised as a key regulator of cellular metabolism, NAD+ homeostasis, and adipose tissue function. This research compound has emerged as an important tool for studying the intersection of epigenetics, energy metabolism, and ageing.": "**5-Amino-1MQ** (5-Amino-1-Metilchinolinio) è un inibitore selettivo della nicotinammide N-metiltransferasi (NNMT), un enzima sempre più riconosciuto come regolatore chiave del metabolismo cellulare, dell'omeostasi del NAD+ e della funzione del tessuto adiposo. Questo composto di ricerca è emerso come uno strumento importante per studiare l'intersezione tra epigenetica, metabolismo energetico e invecchiamento.",
      "**AOD-9604** (Anti-Obesity Drug 9604) is a modified fragment of human growth hormone comprising amino acids 177-191 of the C-terminal region, with an additional tyrosine residue at the N-terminus. This synthetic peptide was specifically designed to isolate the fat-metabolising properties of growth hormone without its growth-promoting or diabetogenic effects.": "**AOD-9604** (Anti-Obesity Drug 9604) è un frammento modificato dell'ormone della crescita umano che comprende gli aminoacidi 177-191 della regione C-terminale, con un residuo di tirosina aggiuntivo all'N-terminale. Questo peptide sintetico è stato specificamente progettato per isolare le proprietà di metabolizzazione dei grassi dell'ormone della crescita senza i suoi effetti di promozione della crescita o diabetogeni.",
      '**BPC-157** (Body Protection Compound-157) is a synthetic pentadecapeptide (15 amino acids) derived from a protein found in human gastric juice. Since its discovery, BPC-157 has become one of the most extensively studied peptides in tissue healing and regeneration research. For published research, see [PubMed studies on BPC-157](https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157){:target="_blank" rel="noopener"}.': '**BPC-157** (Body Protection Compound-157) è un pentadecapeptide sintetico (15 aminoacidi) derivato da una proteina presente nel succo gastrico umano. Dalla sua scoperta, il BPC-157 è diventato uno dei peptidi più studiati nella ricerca sulla guarigione e rigenerazione dei tessuti. Per le ricerche pubblicate, vedere [Studi PubMed su BPC-157](https://pubmed.ncbi.nlm.nih.gov/?term=BPC-157){:target="_blank" rel="noopener"}.',
      "**CJC-1295 No DAC** (also known as Modified GRF 1-29 or Mod GRF) is a synthetic analog of growth hormone-releasing hormone (GHRH) with specific amino acid modifications that enhance its stability and half-life. Unlike CJC-1295 with DAC, this version lacks the Drug Affinity Complex, producing pulsatile rather than sustained GH release patterns.": "**CJC-1295 No DAC** (conosciuto anche come Modified GRF 1-29 o Mod GRF) è un analogo sintetico dell'ormone di rilascio dell'ormone della crescita (GHRH) con specifiche modifiche agli aminoacidi che ne migliorano la stabilità e l'emivita. A differenza del CJC-1295 con DAC, questa versione è priva del Drug Affinity Complex, producendo modelli di rilascio di GH pulsatili piuttosto che sostenuti.",
      "**Cagrilintide** (AM833, NN9838) is a long-acting acylated analog of human amylin, a peptide hormone co-secreted with insulin from pancreatic beta cells. Through fatty acid acylation, cagrilintide achieves an extended half-life enabling once-weekly research dosing, making it an invaluable tool for studying amylin's role in satiety and metabolic regulation.": "**Cagrilintide** (AM833, NN9838) è un analogo acilato a lunga durata d'azione dell'amilina umana, un ormone peptidico co-secreto con l'insulina dalle cellule beta pancreatiche. Attraverso l'acilazione degli acidi grassi, il cagrilintide ottiene un'emivita estesa che consente un dosaggio di ricerca settimanale, rendendolo uno strumento inestimabile per studiare il ruolo dell'amilina nella sazietà e nella regolazione metabolica.",
      "**DSIP** (Delta Sleep-Inducing Peptide) is a nonapeptide first isolated from rabbit brain in 1977 during research into sleep physiology. The peptide was named for its ability to promote delta wave sleep patterns in research models.": "**DSIP** (Delta Sleep-Inducing Peptide) è un nonapeptide isolato per la prima volta dal cervello di coniglio nel 1977 durante le ricerche sulla fisiologia del sonno. Il peptide è stato chiamato così per la sua capacità di promuovere modelli di sonno a onde delta nei modelli di ricerca.",
      "**Epitalon** (Epithalon, AEDG peptide) is a synthetic tetrapeptide based on epithalamin, a pineal gland extract extensively studied for its effects on telomerase activation and cellular ageing. Developed from decades of Russian research, Epitalon has become a key tool in longevity and anti-ageing research.": "**Epitalon** (Epithalon, peptide AEDG) è un tetrapeptide sintetico basato sull'epitalamina, un estratto della ghiandola pineale ampiamente studiato per i suoi effetti sull'attivazione della telomerasi e sull'invecchiamento cellulare. Sviluppato da decenni di ricerca russa, Epitalon è diventato uno strumento chiave nella ricerca sulla longevità e anti-invecchiamento.",
      "**GHK-Cu** (Copper Tripeptide-1) is a naturally occurring copper-peptide complex consisting of three amino acids (glycine-histidine-lysine) bound to a copper ion. Found in human plasma, saliva, and urine, GHK-Cu concentrations naturally decline with age.": "**GHK-Cu** (Rame Tripeptide-1) è un complesso rame-peptide presente in natura costituito da tre aminoacidi (glicina-istidina-lisina) legati a uno ione rame. Trovato nel plasma umano, nella saliva e nelle urine, le concentrazioni di GHK-Cu diminuiscono naturalmente con l'età.",
      "**GHRP-2** (Growth Hormone Releasing Peptide-2, Pralmorelin) is a synthetic hexapeptide that stimulates growth hormone release through activation of the ghrelin receptor (GHS-R1a). GHRP-2 is considered more selective than GHRP-6, producing robust GH release with less pronounced effects on appetite, cortisol, and prolactin.": "**GHRP-2** (Peptide di Rilascio dell'Ormone della Crescita-2, Pralmorelina) è un esapeptide sintetico che stimola il rilascio dell'ormone della crescita attraverso l'attivazione del recettore della grelina (GHS-R1a). GHRP-2 è considerato più selettivo di GHRP-6, producendo un robusto rilascio di GH con effetti meno pronunciati su appetito, cortisolo e prolattina.",
      "**GHRP-6** (Growth Hormone Releasing Peptide-6) is a synthetic hexapeptide that stimulates growth hormone release through activation of the ghrelin receptor (GHS-R1a). As one of the first synthetic GH secretagogues developed, GHRP-6 has extensive research documentation and remains a valuable tool for studying growth hormone physiology.": "**GHRP-6** (Peptide di Rilascio dell'Ormone della Crescita-6) è un esapeptide sintetico che stimola il rilascio dell'ormone della crescita attraverso l'attivazione del recettore della grelina (GHS-R1a). Essendo uno dei primi secretagoghi sintetici del GH sviluppati, GHRP-6 ha un'ampia documentazione di ricerca e rimane uno strumento prezioso per studiare la fisiologia dell'ormone della crescita.",
      "**HGH Fragment 176-191** is a synthetic peptide comprising the C-terminal portion of human growth hormone (amino acids 176-191). This specific region has been identified as responsible for GH's lipolytic (fat-burning) activity without the hormone's growth-promoting effects.": "**HGH Fragment 176-191** è un peptide sintetico comprendente la porzione C-terminale dell'ormone della crescita umano (aminoacidi 176-191). Questa regione specifica è stata identificata come responsabile dell'attività lipolitica (brucia-grassi) del GH senza gli effetti di promozione della crescita dell'ormone.",
      "**Ipamorelin** is a synthetic pentapeptide growth hormone secretagogue that selectively stimulates growth hormone (GH) release from pituitary somatotrope cells. Distinguished by its high selectivity, ipamorelin causes minimal effects on cortisol and prolactin levels, making it an invaluable research tool for studying isolated GH secretion mechanisms.": "**Ipamorelin** è un secretagogo dell'ormone della crescita pentapeptidico sintetico che stimola selettivamente il rilascio dell'ormone della crescita (GH) dalle cellule somatotrope ipofisarie. Distinto dalla sua alta selettività, ipamorelin provoca effetti minimi sui livelli di cortisolo e prolattina, rendendolo uno strumento di ricerca inestimabile per studiare i meccanismi isolati di secrezione del GH.",
      "**Melanotan 2** (MT-2, MT-II) is a synthetic cyclic heptapeptide analogue of alpha-melanocyte stimulating hormone (α-MSH). Originally developed at the University of Arizona in the 1980s, this research peptide has become an essential tool for studying melanocortin receptor signalling and the regulation of skin pigmentation.": "**Melanotan 2** (MT-2, MT-II) è un analogo eptapeptidico ciclico sintetico dell'ormone stimolante i melanociti alfa (α-MSH). Originariamente sviluppato presso l'Università dell'Arizona negli anni '80, questo peptide di ricerca è diventato uno strumento essenziale per studiare la segnalazione del recettore della melanocortina e la regolazione della pigmentazione della pelle.",
      "**NAD+** (Nicotinamide Adenine Dinucleotide) is a coenzyme found in all living cells that plays fundamental roles in energy metabolism, DNA repair, and cellular signalling. NAD+ is essential for hundreds of enzymatic reactions and is a key regulator of cellular health.": "**NAD+** (Nicotinammide Adenina Dinucleotide) è un coenzima presente in tutte le cellule viventi che svolge ruoli fondamentali nel metabolismo energetico, nella riparazione del DNA e nella segnalazione cellulare. Il NAD+ è essenziale per centinaia di reazioni enzimatiche ed è un regolatore chiave della salute cellulare.",
      "**O-304** is a novel small molecule that directly activates AMPK (AMP-activated protein kinase), the master regulator of cellular energy homeostasis. Unlike indirect activators like metformin, O-304 binds directly to AMPK's β1 subunit.": "**O-304** è una nuova piccola molecola che attiva direttamente l'AMPK (proteina chinasi attivata dall'AMP), il regolatore principale dell'omeostasi energetica cellulare. A differenza degli attivatori indiretti come la metformina, O-304 si lega direttamente alla subunità β1 dell'AMPK.",
      "**Retatrutide** (LY3437943) is a novel synthetic peptide that functions as a triple agonist of three key metabolic receptors: glucagon-like peptide-1 (GLP-1), glucose-dependent insulinotropic polypeptide (GIP), and glucagon receptors. This unprecedented triple mechanism of action makes Retatrutide the most comprehensive incretin-based research tool currently available.": "**Retatrutide** (LY3437943) è un nuovo peptide sintetico che funziona come un triplo agonista di tre recettori metabolici chiave: peptide simile al glucagone-1 (GLP-1), polipeptide insulinotropico glucosio-dipendente (GIP) e recettori del glucagone. Questo triplo meccanismo d'azione senza precedenti rende Retatrutide lo strumento di ricerca basato sulle incretine più completo attualmente disponibile.",
      "**Selank** (TP-7) is a synthetic heptapeptide developed in Russia as a modified analogue of tuftsin, a naturally occurring immunomodulatory peptide. Selank has been extensively studied for its anxiolytic, nootropic, and immunomodulatory properties.": "**Selank** (TP-7) è un eptapeptide sintetico sviluppato in Russia come analogo modificato della tuftsina, un peptide immunomodulatore presente in natura. Selank è stato ampiamente studiato per le sue proprietà ansiolitiche, nootropiche e immunomodulatorie.",
      '**Semaglutide** is a synthetic analogue of human Glucagon-Like Peptide-1 (GLP-1), a hormone naturally produced in the intestines that plays a crucial role in glucose metabolism and appetite regulation. This research peptide has gained significant attention in scientific communities worldwide for its applications in metabolic research, particularly in studies related to type 2 diabetes and obesity. For comprehensive background information, see the [PubChem compound entry for Semaglutide](https://pubchem.ncbi.nlm.nih.gov/compound/Semaglutide){:target="_blank" rel="noopener"}.': `**Semaglutide** è un analogo sintetico del peptide-1 simile al glucagone (GLP-1) umano, un ormone prodotto naturalmente nell'intestino che svolge un ruolo cruciale nel metabolismo del glucosio e nella regolazione dell'appetito. Questo peptide di ricerca ha guadagnato un'attenzione significativa nelle comunità scientifiche di tutto il mondo per le sue applicazioni nella ricerca metabolica, in particolare negli studi relativi al diabete di tipo 2 e all'obesità. Per informazioni di base complete, consultare la [voce del composto PubChem per Semaglutide](https://pubchem.ncbi.nlm.nih.gov/compound/Semaglutide){:target="_blank" rel="noopener"}.`,
      "**Semax** is a synthetic heptapeptide developed in Russia, based on the ACTH(4-10) fragment of adrenocorticotropic hormone. Unlike full ACTH, Semax lacks hormonal activity but retains potent nootropic and neuroprotective properties.": "**Semax** è un eptapeptide sintetico sviluppato in Russia, basato sul frammento ACTH(4-10) dell'ormone adrenocorticotropo. A differenza dell'ACTH completo, Semax manca di attività ormonale ma conserva potenti proprietà nootropiche e neuroprotettive.",
      "**TB-500** is a synthetic peptide representing the active region of Thymosin Beta-4 (Tβ4), a naturally occurring protein found in virtually all human and animal cells. Thymosin Beta-4 is a 43-amino acid protein that plays critical roles in cell migration, angiogenesis, and tissue repair.": "**TB-500** è un peptide sintetico che rappresenta la regione attiva della Timosina Beta-4 (Tβ4), una proteina presente in natura che si trova praticamente in tutte le cellule umane e animali. La Timosina Beta-4 è una proteina di 43 aminoacidi che svolge ruoli critici nella migrazione cellulare, nell'angiogenesi e nella riparazione dei tessuti.",
      "**Tesofensine** (NS2330) is a triple monoamine reuptake inhibitor that blocks the presynaptic reuptake of norepinephrine, dopamine, and serotonin. Originally developed for neurodegenerative disease research, tesofensine has become an important tool for studying the neurological basis of appetite regulation and energy homeostasis.": "**Tesofensina** (NS2330) è un triplo inibitore della ricaptazione delle monoamine che blocca la ricaptazione presinaptica di norepinefrina, dopamina e serotonina. Originariamente sviluppata per la ricerca sulle malattie neurodegenerative, la tesofensina è diventata uno strumento importante per studiare le basi neurologiche della regolazione dell'appetito e dell'omeostasi energetica.",
      "**Tirzepatide** is a novel synthetic peptide that functions as a dual agonist of two key incretin hormone receptors: glucose-dependent insulinotropic polypeptide (GIP) and glucagon-like peptide-1 (GLP-1). This unique dual mechanism of action distinguishes Tirzepatide from single-target GLP-1 receptor agonists like semaglutide, making it an invaluable tool for metabolic research.": "**Tirzepatide** è un nuovo peptide sintetico che funziona come un doppio agonista di due recettori chiave dell'ormone incretina: polipeptide insulinotropico glucosio-dipendente (GIP) e peptide simile al glucagone-1 (GLP-1). Questo esclusivo doppio meccanismo d'azione distingue Tirzepatide dagli agonisti del recettore GLP-1 a bersaglio singolo come semaglutide, rendendolo uno strumento inestimabile per la ricerca metabolica.",
      "1. Allow the peptide vial to reach room temperature": "1. Lasciare che il flaconcino di peptide raggiunga la temperatura ambiente",
      "2. Clean both vial tops with an alcohol swab": "2. Pulire entrambe le parti superiori del flaconcino con un tampone imbevuto di alcol",
      "3. Using a sterile syringe, withdraw the desired amount of bacteriostatic water": "3. Utilizzando una siringa sterile, prelevare la quantità desiderata di acqua batteriostatica",
      "4. Insert the needle into the peptide vial, aiming at the glass wall": "4. Inserire l'ago nel flaconcino di peptide, mirando alla parete di vetro",
      "5-Amino-1MQ inhibits NNMT, affecting multiple metabolic pathways:": "5-Amino-1MQ inibisce la NNMT, influenzando molteplici vie metaboliche:",
      "5. Slowly inject the water, allowing it to run down the vial wall": "5. Iniettare lentamente l'acqua, lasciandola scorrere lungo la parete del flaconcino",
      "6. Gently swirl (do not shake) until fully dissolved": "6. Agitare delicatamente (non scuotere) fino a completa dissoluzione",
      "7. Store reconstituted peptide at 2-8°C": "7. Conservare il peptide ricostituito a 2-8°C",
      "A key research advantage is its selectivity:": "Un vantaggio chiave per la ricerca è la sua selettività:",
      "AOD-9604 also inhibits fat accumulation:": "AOD-9604 inibisce anche l'accumulo di grasso:",
      "AOD-9604's mechanism of action centres on its ability to stimulate lipolysis and inhibit lipogenesis in adipose tissue, mimicking a specific subset of growth hormone's metabolic effects.": "Il meccanismo d'azione di AOD-9604 si concentra sulla sua capacità di stimolare la lipolisi e inibire la lipogenesi nel tessuto adiposo, imitando un sottoinsieme specifico degli effetti metabolici dell'ormone della crescita.",
      "Amylin complements insulin's glucose-lowering effects through distinct mechanisms including gastric emptying delay, glucagon suppression, and central satiety signalling. Cagrilintide provides researchers with a stable, long-acting tool to investigate these pathways in extended experimental paradigms.": "L'amilina completa gli effetti ipoglicemizzanti dell'insulina attraverso meccanismi distinti tra cui il ritardo dello svuotamento gastrico, la soppressione del glucagone e la segnalazione centrale di sazietà. Cagrilintide fornisce ai ricercatori uno strumento stabile e a lunga durata d'azione per studiare queste vie in paradigmi sperimentali estesi.",
      "Anti-inflammatory properties are actively investigated:": "Le proprietà antinfiammatorie sono attivamente studiate:",
      "Bacteriostatic water (BAC water) is sterile water containing 0.9% benzyl alcohol, a bacteriostatic preservative that inhibits the growth of bacteria. This makes it ideal for reconstituting lyophilized (freeze-dried) peptides for research applications where multiple withdrawals from the same vial are needed.": "L'acqua batteriostatica (acqua BAC) è acqua sterile contenente 0,9% di alcol benzilico, un conservante batteriostatico che inibisce la crescita dei batteri. Questo la rende ideale per ricostituire peptidi liofilizzati per applicazioni di ricerca in cui sono necessari prelievi multipli dallo stesso flaconcino.",
      "Beyond sleep regulation, DSIP has demonstrated effects on stress response, pain perception, and neuroendocrine function, making it a versatile tool for neuroscience research.": "Oltre alla regolazione del sonno, DSIP ha dimostrato effetti sulla risposta allo stress, sulla percezione del dolore e sulla funzione neuroendocrina, rendendolo uno strumento versatile per la ricerca nelle neuroscienze.",
      "Broader metabolic applications:": "Applicazioni metaboliche più ampie:",
      "By isolating this fragment, researchers can study GH's fat metabolism effects independently of IGF-1 elevation, glucose effects, and tissue growth, providing a cleaner tool for adipose biology research.": "Isolando questo frammento, i ricercatori possono studiare gli effetti del metabolismo dei grassi dell'ormone della crescita (GH) indipendentemente dall'aumento dell'IGF-1, dagli effetti sul glucosio e dalla crescita dei tessuti, fornendo uno strumento più pulito per la ricerca sulla biologia adiposa.",
      "Cagrilintide activates amylin receptors (AMY1, AMY2, AMY3), which are complexes of the calcitonin receptor with receptor activity-modifying proteins (RAMPs).": "Cagrilintide attiva i recettori dell'amilina (AMY1, AMY2, AMY3), che sono complessi del recettore della calcitonina con proteine che modificano l'attività del recettore (RAMP).",
      "Cagrilintide is often studied with GLP-1 agonists:": "Cagrilintide è spesso studiato con agonisti GLP-1:",
      "Central effects include:": "Gli effetti centrali includono:",
      "Core applications in diabetes studies include:": "Le applicazioni principali negli studi sul diabete includono:",
      "Dermatological applications extend beyond pigmentation:": "Le applicazioni dermatologiche si estendono oltre la pigmentazione:",
      "Developed as a ghrelin receptor (GHS-R) agonist, ipamorelin represents one of the most selective GH releasing peptides (GHRPs) available for research. Its clean pharmacological profile enables researchers to study GH axis physiology without the confounding effects seen with less selective compounds.": "Sviluppato come agonista del recettore della grelina (GHS-R), l'ipamorelin rappresenta uno dei peptidi di rilascio del GH (GHRP) più selettivi disponibili per la ricerca. Il suo profilo farmacologico pulito consente ai ricercatori di studiare la fisiologia dell'asse GH senza gli effetti confondenti osservati con composti meno selettivi.",
      "Each 10ml vial can reconstitute 5-10 peptide vials depending on concentration requirements.": "Ogni flaconcino da 10 ml può ricostituire 5-10 flaconcini di peptide a seconda dei requisiti di concentrazione.",
      "Emerging areas of investigation include:": "Le aree emergenti di indagine includono:",
      "Emerging evidence suggests GLP-1 receptor agonists may have cardiovascular effects beyond glucose control, leading to research investigating:": "Prove emergenti suggeriscono che gli agonisti del recettore GLP-1 possono avere effetti cardiovascolari oltre il controllo del glucosio, portando a ricerche che indagano:",
      "Emerging research also explores Semaglutide's potential neuroprotective properties, with studies investigating its effects in models of Alzheimer's disease, Parkinson's disease, and stroke.": "La ricerca emergente esplora anche le potenziali proprietà neuroprotettive di Semaglutide, con studi che ne indagano gli effetti in modelli di malattia di Alzheimer, morbo di Parkinson e ictus.",
      "Emerging research explores melanocortin anti-inflammatory properties:": "La ricerca emergente esplora le proprietà antinfiammatorie della melanocortina:",
      "Extensive research has demonstrated Semax's effects on cognitive function, BDNF expression, and neuroprotection, making it a valuable tool for neuroscience research.": "Ricerche approfondite hanno dimostrato gli effetti di Semax sulla funzione cognitiva, l'espressione di BDNF e la neuroprotezione, rendendolo uno strumento prezioso per la ricerca neuroscientifica.",
      "GIP receptor engagement adds complementary effects:": "L'impegno del recettore GIP aggiunge effetti complementari:",
      "GLP-1 receptor activation slows gastric emptying, which may contribute to prolonged satiety and reduced postprandial glucose excursions. Researchers studying gut-brain axis signalling find Semaglutide particularly useful for investigating these gastrointestinal regulatory mechanisms.": "L'attivazione del recettore GLP-1 rallenta lo svuotamento gastrico, il che può contribuire a una sazietà prolungata e a ridurre le escursioni glicemiche post-prandiali. I ricercatori che studiano la segnalazione dell'asse intestino-cervello trovano la semaglutide particolarmente utile per indagare questi meccanismi regolatori gastrointestinali.",
      "Glucagon's hepatic effects enable liver-focused studies:": "Gli effetti epatici del glucagone consentono studi incentrati sul fegato:",
      "In pancreatic beta cells, GLP-1 receptor activation by Semaglutide triggers glucose-dependent insulin secretion through the cAMP-PKA signalling pathway. This glucose-dependent mechanism is particularly noteworthy in research, as it suggests reduced risk of hypoglycaemia compared to insulin secretagogues that work independently of glucose levels.": "Nelle cellule beta pancreatiche, l'attivazione del recettore GLP-1 da parte della semaglutide innesca la secrezione di insulina dipendente dal glucosio attraverso la via di segnalazione cAMP-PKA. Questo meccanismo dipendente dal glucosio è particolarmente degno di nota nella ricerca, in quanto suggerisce un ridotto rischio di ipoglicemia rispetto ai secretagoghi dell'insulina che agiscono indipendentemente dai livelli di glucosio.",
      "In pancreatic beta cells, Tirzepatide activates both GIP and GLP-1 receptors, leading to:": "Nelle cellule beta pancreatiche, la tirzepatide attiva entrambi i recettori GIP e GLP-1, portando a:",
      "Interest in NAD+ has surged due to its central role in ageing research, particularly its relationship with sirtuins and cellular repair mechanisms. NAD+ levels naturally decline with age, driving research into maintaining cellular NAD+ pools.": "L'interesse per NAD+ è aumentato a causa del suo ruolo centrale nella ricerca sull'invecchiamento, in particolare la sua relazione con le sirtuine e i meccanismi di riparazione cellulare. I livelli di NAD+ diminuiscono naturalmente con l'età, guidando la ricerca sul mantenimento dei pool cellulari di NAD+.",
      "Ipamorelin activates growth hormone secretagogue receptors (GHS-R) in the anterior pituitary, triggering GH release through multiple mechanisms.": "L'ipamorelin attiva i recettori dei secretagoghi dell'ormone della crescita (GHS-R) nell'ipofisi anteriore, innescando il rilascio di GH attraverso molteplici meccanismi.",
      "Ipamorelin's research value lies in its selectivity:": "Il valore di ricerca dell'ipamorelin risiede nella sua selettività:",
      "Key substitutions provide enhanced stability:": "Sostituzioni chiave forniscono una stabilità migliorata:",
      "Like GLP-1 agonists, Tirzepatide affects appetite regulation through central mechanisms. Research indicates effects on:": "Come gli agonisti del GLP-1, la tirzepatide influenza la regolazione dell'appetito attraverso meccanismi centrali. La ricerca indica effetti su:",
      "MC4R activation makes MT-2 valuable for metabolic studies:": "L'attivazione di MC4R rende MT-2 prezioso per studi metabolici:",
      "MT-2 activates multiple melanocortin receptor subtypes:": "MT-2 attiva molteplici sottotipi di recettori della melanocortina:",
      "MT-2's non-selective receptor profile enables diverse CNS research:": "Il profilo recettoriale non selettivo di MT-2 consente diverse ricerche sul SNC:",
      "Melanotan 2 exerts its biological effects through activation of melanocortin receptors, a family of G protein-coupled receptors that regulate diverse physiological processes. Understanding these mechanisms is central to ongoing research in dermatology, endocrinology, and neuroscience.": "Melanotan 2 esercita i suoi effetti biologici attraverso l'attivazione dei recettori della melanocortina, una famiglia di recettori accoppiati a proteine G che regolano diversi processi fisiologici. Comprendere questi meccanismi è fondamentale per la ricerca in corso in dermatologia, endocrinologia e neuroscienze.",
      "Melanotan 2 is extensively used in dermatological research:": "Melanotan 2 è ampiamente utilizzato nella ricerca dermatologica:",
      "NNMT catalyses the N-methylation of nicotinamide (a NAD+ precursor) using SAM (S-adenosylmethionine) as a methyl donor. By inhibiting this enzyme, 5-Amino-1MQ enables researchers to investigate how NNMT modulation affects cellular metabolism, NAD+ availability, and metabolic health.": "NNMT catalizza la N-metilazione della nicotinammide (un precursore NAD+) utilizzando SAM (S-adenosilmetionina) come donatore di metile. Inibendo questo enzima, 5-Amino-1MQ consente ai ricercatori di indagare come la modulazione di NNMT influenza il metabolismo cellulare, la disponibilità di NAD+ e la salute metabolica.",
      "Originally developed by Metabolic Pharmaceuticals in Australia, AOD-9604 represents one of the most targeted approaches to studying growth hormone's lipolytic activity. By using only the fat-reducing portion of the full hormone, researchers can investigate adipose tissue metabolism without confounding effects on IGF-1 or glucose homeostasis.": "Originariamente sviluppato da Metabolic Pharmaceuticals in Australia, AOD-9604 rappresenta uno degli approcci più mirati allo studio dell'attività lipolitica dell'ormone della crescita. Utilizzando solo la porzione che riduce il grasso dell'ormone completo, i ricercatori possono indagare il metabolismo del tessuto adiposo senza effetti confondenti su IGF-1 o omeostasi del glucosio.",
      "Our bacteriostatic water meets United States Pharmacopeia (USP) standards for:": "La nostra acqua batteriostatica soddisfa gli standard della Farmacopea degli Stati Uniti (USP) per:",
      "Our research-grade Semaglutide meets the highest quality standards required for reproducible scientific research:": "La nostra semaglutide di grado ricerca soddisfa i più elevati standard di qualità richiesti per una ricerca scientifica riproducibile:",
      "Peptide Shop supplies **research-grade 5-Amino-1MQ** with guaranteed ≥99% purity, verified through comprehensive HPLC analysis.": "Peptide Shop fornisce **5-Amino-1MQ di grado ricerca** con purezza garantita ≥99%, verificata tramite analisi HPLC completa.",
      "Peptide Shop supplies **research-grade AOD-9604** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis, ensuring researchers receive properly characterised material for their studies.": "Peptide Shop fornisce **AOD-9604 di grado ricerca** con purezza garantita ≥99%, verificata tramite analisi HPLC completa e spettrometria di massa. Ogni ordine include un certificato di analisi dettagliato, garantendo che i ricercatori ricevano materiale adeguatamente caratterizzato per i loro studi.",
      "Peptide Shop supplies **research-grade BPC-157** with guaranteed ≥99% purity and full analytical documentation.": "Peptide Shop fornisce **BPC-157 di grado ricerca** con purezza garantita ≥99% e documentazione analitica completa.",
      "Peptide Shop supplies **research-grade CJC-1295 No DAC** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis.": "Peptide Shop fornisce **CJC-1295 No DAC di grado ricerca** con purezza garantita ≥99%, verificata tramite analisi HPLC completa e spettrometria di massa.",
      "Peptide Shop supplies **research-grade Cagrilintide** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis.": "Peptide Shop fornisce **Cagrilintide di grado ricerca** con purezza garantita ≥99%, verificata tramite analisi HPLC completa e spettrometria di massa.",
      "Peptide Shop supplies **research-grade DSIP** with guaranteed ≥99% purity.": "Peptide Shop fornisce **DSIP di grado ricerca** con purezza garantita ≥99%.",
      "Peptide Shop supplies **research-grade Epitalon** with guaranteed ≥99% purity.": "Peptide Shop fornisce **Epitalon di grado ricerca** con purezza garantita ≥99%.",
      "Peptide Shop supplies **research-grade GHK-Cu** with guaranteed ≥99% purity.": "Peptide Shop fornisce **GHK-Cu di grado ricerca** con purezza garantita ≥99%.",
      "Peptide Shop supplies **research-grade GHRP-2** with guaranteed ≥99% purity.": "Peptide Shop fornisce **GHRP-2 di grado ricerca** con purezza garantita ≥99%.",
      "Peptide Shop supplies **research-grade GHRP-6** with guaranteed ≥99% purity.": "Peptide Shop fornisce **GHRP-6 di grado ricerca** con purezza garantita ≥99%.",
      "Peptide Shop supplies **research-grade HGH Fragment 176-191** with guaranteed ≥99% purity.": "Peptide Shop fornisce **HGH Fragment 176-191 di grado ricerca** con purezza garantita ≥99%.",
      "Peptide Shop supplies **research-grade Ipamorelin** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis.": "Peptide Shop fornisce **Ipamorelin di grado ricerca** con purezza garantita ≥99%, verificata tramite analisi HPLC completa e spettrometria di massa.",
      "Peptide Shop supplies **research-grade Melanotan 2** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis, ensuring researchers receive properly characterised material for their studies.": "Peptide Shop fornisce **Melanotan 2 di grado ricerca** con purezza garantita ≥99%, verificata tramite analisi HPLC completa e spettrometria di massa. Ogni ordine include un certificato di analisi dettagliato, garantendo che i ricercatori ricevano materiale adeguatamente caratterizzato per i loro studi.",
      "Peptide Shop supplies **research-grade NAD+** with guaranteed ≥99% purity.": "Peptide Shop fornisce **NAD+ di grado ricerca** con purezza garantita ≥99%.",
      "Peptide Shop supplies **research-grade O-304** with guaranteed ≥99% purity.": "Peptide Shop fornisce **O-304 di grado ricerca** con purezza garantita ≥99%.",
      "Peptide Shop supplies **research-grade Retatrutide** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis, ensuring researchers receive properly characterised material for their studies.": "Peptide Shop fornisce **Retatrutide di grado ricerca** con purezza garantita ≥99%, verificata tramite analisi HPLC completa e spettrometria di massa. Ogni ordine include un certificato di analisi dettagliato, garantendo che i ricercatori ricevano materiale adeguatamente caratterizzato per i loro studi.",
      "Peptide Shop supplies **research-grade Selank** with guaranteed ≥99% purity.": "Peptide Shop fornisce **Selank di grado ricerca** con purezza garantita ≥99%.",
      "Peptide Shop supplies **research-grade Semaglutide** with guaranteed ≥99% purity, verified by HPLC analysis and mass spectrometry. Every order includes a comprehensive Certificate of Analysis (COA), ensuring researchers receive properly characterised material for their studies.": "Peptide Shop fornisce **Semaglutide di grado ricerca** con purezza garantita ≥99%, verificata mediante analisi HPLC e spettrometria di massa. Ogni ordine include un certificato di analisi completo (COA), garantendo che i ricercatori ricevano materiale adeguatamente caratterizzato per i loro studi.",
      "Peptide Shop supplies **research-grade Semax** with guaranteed ≥99% purity.": "Peptide Shop fornisce **Semax di grado ricerca** con purezza garantita ≥99%.",
      "Peptide Shop supplies **research-grade TB-500** with guaranteed ≥99% purity.": "Peptide Shop fornisce **TB-500 di grado ricerca** con purezza garantita ≥99%.",
      "Peptide Shop supplies **research-grade Tesofensine** with guaranteed ≥99% purity, verified through comprehensive HPLC analysis.": "Peptide Shop fornisce **Tesofensina di grado ricerca** con purezza garantita ≥99%, verificata tramite analisi HPLC completa.",
      "Peptide Shop supplies **research-grade Tirzepatide** with guaranteed ≥99% purity, verified through comprehensive HPLC and mass spectrometry analysis. Each order includes a detailed Certificate of Analysis to ensure researchers receive properly characterised material for their studies.": "Peptide Shop fornisce **Tirzepatide di grado ricerca** con purezza garantita ≥99%, verificata tramite analisi HPLC completa e spettrometria di massa. Ogni ordine include un certificato di analisi dettagliato per garantire che i ricercatori ricevano materiale adeguatamente caratterizzato per i loro studi.",
      "Peripheral actions include:": "Le azioni periferiche includono:",
      "Primary research applications include:": "Le principali applicazioni di ricerca includono:",
      "Research has demonstrated that Semaglutide may also promote beta-cell proliferation and reduce apoptosis in preclinical models, suggesting potential applications in studying beta-cell preservation strategies.": "La ricerca ha dimostrato che la semaglutide può anche promuovere la proliferazione delle cellule beta e ridurre l'apoptosi in modelli preclinici, suggerendo potenziali applicazioni nello studio delle strategie di conservazione delle cellule beta.",
      "Research interest in GHK-Cu stems from its remarkable effects on tissue regeneration, wound healing, and gene expression modulation. Studies suggest it influences over 4,000 genes related to tissue repair and regeneration.": "L'interesse della ricerca per GHK-Cu deriva dai suoi notevoli effetti sulla rigenerazione dei tessuti, la guarigione delle ferite e la modulazione dell'espressione genica. Gli studi suggeriscono che influenza oltre 4.000 geni correlati alla riparazione e rigenerazione dei tessuti.",
      "Research interest in O-304 stems from its potential applications in metabolic disease, diabetes, and obesity research, where AMPK activation can improve glucose uptake and lipid oxidation.": "L'interesse della ricerca per O-304 deriva dalle sue potenziali applicazioni nella ricerca su malattie metaboliche, diabete e obesità, dove l'attivazione dell'AMPK può migliorare l'assorbimento del glucosio e l'ossidazione dei lipidi.",
      "Research into melanocortin effects on sexual behaviour:": "Ricerca sugli effetti della melanocortina sul comportamento sessuale:",
      "Research often combines ipamorelin with GHRH analogs:": "La ricerca spesso combina ipamorelin con analoghi del GHRH:",
      "Researchers often compare these related peptides:": "I ricercatori confrontano spesso questi peptidi correlati:",
      "Retatrutide enables essential comparative studies:": "Retatrutide consente studi comparativi essenziali:",
      "Retatrutide's triple agonism creates a unique pharmacological profile by simultaneously engaging three complementary receptor systems, each contributing distinct metabolic effects.": "Il triplo agonismo di Retatrutide crea un profilo farmacologico unico impegnando simultaneamente tre sistemi recettoriali complementari, ciascuno dei quali contribuisce a distinti effetti metabolici.",
      "Semaglutide crosses the blood-brain barrier and activates GLP-1 receptors in key hypothalamic regions involved in appetite regulation, including the arcuate nucleus and paraventricular nucleus. Research indicates that this central action contributes to reduced food intake and altered food preferences in animal models.": "La semaglutide attraversa la barriera emato-encefalica e attiva i recettori GLP-1 in regioni ipotalamiche chiave coinvolte nella regolazione dell'appetito, tra cui il nucleo arcuato e il nucleo paraventricolare. La ricerca indica che questa azione centrale contribuisce a ridurre l'assunzione di cibo e ad alterare le preferenze alimentari nei modelli animali.",
      "Semaglutide exerts its biological effects through high-affinity binding to the GLP-1 receptor (GLP-1R), a G protein-coupled receptor expressed in various tissues including pancreatic beta cells, the central nervous system, heart, and gastrointestinal tract. Upon receptor binding, Semaglutide initiates several downstream signalling cascades that researchers continue to investigate.": "La semaglutide esercita i suoi effetti biologici attraverso il legame ad alta affinità con il recettore GLP-1 (GLP-1R), un recettore accoppiato a proteine G espresso in vari tessuti tra cui le cellule beta pancreatiche, il sistema nervoso centrale, il cuore e il tratto gastrointestinale. Dopo il legame con il recettore, la semaglutide avvia diverse cascate di segnalazione a valle che i ricercatori continuano a studiare.",
      "Semaglutide is extensively used in metabolic research laboratories studying:": "La semaglutide è ampiamente utilizzata nei laboratori di ricerca metabolica che studiano:",
      "TB-500 contains the key sequence responsible for Tβ4's biological activity, particularly the actin-binding domain that promotes cell motility and tissue regeneration. This makes it invaluable for research into wound healing, muscle repair, and inflammatory conditions.": "TB-500 contiene la sequenza chiave responsabile dell'attività biologica di Tβ4, in particolare il dominio legante l'actina che promuove la motilità cellulare e la rigenerazione tissutale. Ciò lo rende inestimabile per la ricerca sulla guarigione delle ferite, la riparazione muscolare e le condizioni infiammatorie.",
      "Tesofensine increases synaptic concentrations of three key neurotransmitters:": "La tesofensina aumenta le concentrazioni sinaptiche di tre neurotrasmettitori chiave:",
      "The GIP receptor component may provide unique effects on adipose tissue:": "Il componente del recettore GIP può fornire effetti unici sul tessuto adiposo:",
      "The GIP receptor is predominantly expressed in pancreatic beta cells and adipose tissue, while GLP-1 receptors are found in pancreatic islets, brain, heart, and gastrointestinal tract. By activating both receptor systems simultaneously, Tirzepatide provides researchers with a unique tool for studying:": "Il recettore GIP è espresso prevalentemente nelle cellule beta pancreatiche e nel tessuto adiposo, mentre i recettori GLP-1 si trovano nelle isole pancreatiche, nel cervello, nel cuore e nel tratto gastrointestinale. Attivando entrambi i sistemi recettoriali simultaneamente, Tirzepatide fornisce ai ricercatori uno strumento unico per studiare:",
      "The GLP-1 component provides established incretin effects:": "Il componente GLP-1 fornisce effetti incretinici stabiliti:",
      "The dual agonist is valuable for investigating:": "Il doppio agonista è prezioso per indagare:",
      "The molecular structure of Semaglutide features a unique C-18 fatty diacid chain attached to the lysine residue at position 26. This structural modification enables the peptide to bind to serum albumin, dramatically extending its biological half-life to approximately seven days. This prolonged activity profile makes Semaglutide an invaluable tool for researchers studying sustained GLP-1 receptor activation mechanisms.": "La struttura molecolare della semaglutide presenta un'unica catena di acido diacido grasso C-18 attaccata al residuo di lisina in posizione 26. Questa modifica strutturale consente al peptide di legarsi all'albumina sierica, estendendo drasticamente la sua emivita biologica a circa sette giorni. Questo profilo di attività prolungato rende la semaglutide uno strumento inestimabile per i ricercatori che studiano i meccanismi di attivazione sostenuta del recettore GLP-1.",
      "The peptide binds to GHRH receptors on pituitary somatotropes:": "Il peptide si lega ai recettori GHRH sui somatotropi pituitari:",
      "The peptide enables focused weight studies:": "Il peptide consente studi focalizzati sul peso:",
      "The peptide promotes fat breakdown through:": "Il peptide promuove la scomposizione dei grassi attraverso:",
      "The peptide represents the first 29 amino acids of GHRH with modifications at positions 2, 8, 15, and 27 to improve resistance to enzymatic degradation. These modifications make it a more practical research tool while maintaining GHRH receptor binding activity.": "Il peptide rappresenta i primi 29 aminoacidi di GHRH con modifiche nelle posizioni 2, 8, 15 e 27 per migliorare la resistenza alla degradazione enzimatica. Queste modifiche lo rendono uno strumento di ricerca più pratico pur mantenendo l'attività di legame al recettore GHRH.",
      "The peptide represents the next evolution beyond dual agonists like tirzepatide, adding glucagon receptor activation to the established GLP-1/GIP dual agonism. This triple receptor engagement enables researchers to study the complex interplay between these metabolic signalling systems and their combined effects on glucose homeostasis, energy expenditure, and body weight regulation.": "Il peptide rappresenta la prossima evoluzione oltre i doppi agonisti come la tirzepatide, aggiungendo l'attivazione del recettore del glucagone al consolidato doppio agonismo GLP-1/GIP. Questo triplo impegno recettoriale consente ai ricercatori di studiare la complessa interazione tra questi sistemi di segnalazione metabolica e i loro effetti combinati sull'omeostasi del glucosio, il dispendio energetico e la regolazione del peso corporeo.",
      "The peptide's cyclic lactam structure provides enhanced stability and receptor binding affinity compared to linear α-MSH analogues. Melanotan 2 acts as a non-selective agonist at melanocortin receptors MC1, MC3, MC4, and MC5, enabling researchers to study diverse physiological processes beyond pigmentation.": "La struttura ciclica lattamica del peptide fornisce una stabilità e un'affinità di legame recettoriale migliorate rispetto agli analoghi lineari di α-MSH. Melanotan 2 agisce come agonista non selettivo sui recettori della melanocortina MC1, MC3, MC4 e MC5, consentendo ai ricercatori di studiare diversi processi fisiologici oltre alla pigmentazione.",
      "The peptide's effects on body weight have made it crucial for obesity research, including studies on:": "Gli effetti del peptide sul peso corporeo lo hanno reso cruciale per la ricerca sull'obesità, compresi studi su:",
      "The peptide's improved selectivity profile makes it valuable for studying GH secretion mechanisms without confounding orexigenic effects.": "Il profilo di selettività migliorato del peptide lo rende prezioso per studiare i meccanismi di secrezione del GH senza effetti orexigenici confondenti.",
      "The peptide's name reflects its origin—a body protection compound identified for its remarkable cytoprotective and regenerative properties across multiple tissue types including tendons, ligaments, muscles, and gastrointestinal epithelium.": "Il nome del peptide riflette la sua origine: un composto di protezione corporea identificato per le sue notevoli proprietà citoprotettive e rigenerative attraverso molteplici tipi di tessuto tra cui tendini, legamenti, muscoli ed epitelio gastrointestinale.",
      "The peptide's primary interest lies in its reported ability to activate telomerase, potentially influencing cellular lifespan and age-related changes.": "L'interesse primario del peptide risiede nella sua segnalata capacità di attivare la telomerasi, influenzando potenzialmente la durata della vita cellulare e i cambiamenti legati all'età.",
      "The peptide's structure incorporates a modified GIP sequence with carefully engineered amino acid substitutions and a C20 fatty diacid side chain attached to lysine. This modification enables binding to serum albumin, extending the biological half-life to approximately five days and allowing researchers to study sustained dual receptor activation.": "La struttura del peptide incorpora una sequenza GIP modificata con sostituzioni di amminoacidi attentamente progettate e una catena laterale di acido diacido grasso C20 attaccata alla lisina. Questa modifica consente il legame all'albumina sierica, estendendo l'emivita biologica a circa cinque giorni e consentendo ai ricercatori di studiare l'attivazione sostenuta del doppio recettore.",
      "The presence of GLP-1 receptors in the brain has sparked significant neuroscience research using Semaglutide:": "La presenza di recettori GLP-1 nel cervello ha scatenato una significativa ricerca neuroscientifica utilizzando la semaglutide:",
      "The primary research application involves studying skin pigmentation:": "La principale applicazione di ricerca riguarda lo studio della pigmentazione della pelle:",
      "The thermogenic component opens unique research directions:": "Il componente termogenico apre direzioni di ricerca uniche:",
      "The triple agonist provides comprehensive weight research tools:": "Il triplo agonista fornisce strumenti completi per la ricerca sul peso:",
      "The triple combination creates unique research opportunities:": "La tripla combinazione crea opportunità di ricerca uniche:",
      "The unique glucagon component provides:": "Il componente unico del glucagone fornisce:",
      "Tirzepatide enables crucial comparative studies between:": "Tirzepatide consente studi comparativi cruciali tra:",
      "Tirzepatide exerts its biological effects through simultaneous activation of GIP and GLP-1 receptors, both of which are G protein-coupled receptors expressed in various metabolically active tissues. This dual agonism creates synergistic signalling effects that researchers continue to characterise.": "Tirzepatide esercita i suoi effetti biologici attraverso l'attivazione simultanea dei recettori GIP e GLP-1, entrambi recettori accoppiati a proteine G espressi in vari tessuti metabolicamente attivi. Questo doppio agonismo crea effetti di segnalazione sinergici che i ricercatori continuano a caratterizzare.",
      "Tirzepatide's superior weight outcomes in preclinical models make it essential for:": "I risultati superiori in termini di peso di Tirzepatide nei modelli preclinici lo rendono essenziale per:",
      "Unlike benzodiazepines, Selank does not produce sedation or dependence, making it a valuable tool for researching anxiety mechanisms and novel therapeutic approaches.": "A differenza delle benzodiazepine, Selank non produce sedazione o dipendenza, rendendolo uno strumento prezioso per la ricerca sui meccanismi dell'ansia e sui nuovi approcci terapeutici.",
      "Unlike more selective peptides such as ipamorelin, GHRP-6 also stimulates appetite and affects cortisol and prolactin levels, making it useful for studying the full spectrum of ghrelin receptor effects.": "A differenza dei peptidi più selettivi come ipamorelin, GHRP-6 stimola anche l'appetito e influenza i livelli di cortisolo e prolattina, rendendolo utile per studiare l'intero spettro degli effetti del recettore della grelina.",
      "Unlike single-target compounds, tesofensine's triple mechanism enables researchers to investigate the complex interplay between monoaminergic systems in controlling food intake and metabolic rate. This makes it valuable for understanding the neuropharmacology of obesity and appetite disorders.": "A differenza dei composti a bersaglio singolo, il triplo meccanismo della tesofensina consente ai ricercatori di indagare la complessa interazione tra i sistemi monoaminergici nel controllo dell'assunzione di cibo e del tasso metabolico. Ciò lo rende prezioso per comprendere la neurofarmacologia dell'obesità e dei disturbi dell'appetito.",
      "Unlike single-use sterile water, bacteriostatic water allows multiple withdrawals over several weeks without contamination risk, making it cost-effective for research laboratories.": "A differenza dell'acqua sterile monouso, l'acqua batteriostatica consente prelievi multipli per diverse settimane senza rischio di contaminazione, rendendola economica per i laboratori di ricerca.",
      "Without DAC, the peptide produces:": "Senza DAC, il peptide produce:"
    }
  };
  let translated = working;
  const langTrans = contentTranslations[lang];
  if (langTrans) {
    const sortedKeys = Object.keys(langTrans).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      let pattern = escapedKey;
      if (/^\w/.test(key)) pattern = `\\b${pattern}`;
      if (/\w$/.test(key)) pattern = `${pattern}\\b`;
      const regex = new RegExp(pattern, "gi");
      translated = translated.replace(regex, langTrans[key]);
    }
  }
  translated = translated.replace(/\bU\.K\.?\b/gi, countryByLang[lang]).replace(/\bUK\b/gi, countryByLang[lang]);
  for (let i = 0; i < protectedUrls.length; i++) {
    const token = `§§URL_${i}§§`;
    translated = translated.split(token).join(protectedUrls[i]);
  }
  return translated;
}
function getLocalizedMetaDescription(productName, category, lang) {
  if (productName.includes("Bacteriostatic Water")) {
    const metas = {
      en: `Buy Bacteriostatic water UK. Premium sterile water for injection with benzyl alcohol. High purity & USP grade. Fast delivery in the UK & Worldwide.`,
      nl: `Bacteriostatic water Kopen in Nederland. Premium steriel water voor injectie met benzylalcohol. Hoogste zuiverheid & USP-kwaliteit. Snelle levering in NL.`,
      de: `Bacteriostatic water Kaufen Deutschland. Steriles Wasser für Injektionszwecke mit Benzylalkohol. Höchste Reinheit & USP-Standard. Schneller Versand in DE.`,
      fr: `Acheter de l'eau bactériostatique en France. Eau stérile de qualité supérieure pour injection avec alcool benzylique. Haute pureté. Livraison rapide FR.`,
      es: `Agua bacteriostatica comprar en España. Agua estéril premium para inyección con alcohol bencílico. Alta pureza y grado USP. Envío rápido en ES.`,
      it: `Acquisto acqua batteriostatica Italia. Acqua sterile premium per iniezione con alcool benzilico. Alta purezza e grado USP. Spedizione veloce in IT.`
    };
    return metas[lang];
  }
  if (/\bAOD[-\s]?9604\b/i.test(productName)) {
    const metas = {
      en: `Buy AOD-9604 UK. Premium research peptide with ≥99% purity. COA included. Fast UK & EU delivery from a trusted supplier.`,
      nl: `AOD-9604 Kopen Nederland. Premium onderzoekspeptide met ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `AOD-9604 kaufen Deutschland. Premium Forschungspeptid mit ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter AOD-9604 France. Peptide de recherche premium avec ≥99% pureté. COA inclus. Livraison rapide FR & UE.`,
      es: `aod 9604 comprar España. Péptido de investigación premium con ≥99% pureza. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista AOD-9604 Italia. Peptide di ricerca premium con ≥99% purezza. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\bBPC[-\s]?157\b/i.test(productName)) {
    const metas = {
      en: `Buy BPC-157 UK. Premium research peptide with ≥99% purity. COA included. Fast UK & EU delivery from a trusted supplier.`,
      nl: `BPC-157 Kopen Nederland. Premium onderzoekspeptide met ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `BPC-157 Kaufen Deutschland. Premium Forschungspeptid mit ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter BPC-157 France. Peptide de recherche premium avec ≥99% pureté. COA inclus. Livraison rapide FR & UE.`,
      es: `BPC 157 Comprar España. Péptido de investigación premium con ≥99% pureza. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista BPC-157 Italia. Peptide di ricerca premium con ≥99% purezza. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\b5\s*-?\s*Amino\s*-?\s*1\s*MQ\b/i.test(productName)) {
    const metas = {
      en: `Buy 5-Amino-1MQ. Premium research compound with ≥99% purity. COA included. Fast UK & EU delivery from a trusted supplier.`,
      nl: `5-amino-1mq kopen Nederland. Premium onderzoekscompound met ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `5-Amino-1MQ kaufen Deutschland. Premium Forschungscompound mit ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter 5-Amino-1MQ France. Composé de recherche premium avec ≥99% pureté. COA inclus. Livraison rapide FR & UE.`,
      es: `5-Amino-1MQ Comprar España. Compuesto de investigación premium con ≥99% pureza. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista 5-Amino-1MQ Italia. Composto di ricerca premium con ≥99% purezza. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\bCJC\s*-?\s*1295\b/i.test(productName) && /\bNo\s*DAC\b/i.test(productName)) {
    const metas = {
      en: `Buy CJC-1295 No DAC. Premium research peptide (Mod GRF 1-29) with ≥99% purity. COA included. Fast UK & EU delivery.`,
      nl: `CJC-1295 No DAC Kopen. Premium onderzoekspeptide (Mod GRF 1-29) met ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `CJC-1295 No DAC kaufen. Premium Forschungspeptid (Mod GRF 1-29) mit ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter CJC-1295 No DAC. Peptide de recherche premium (Mod GRF 1-29) avec ≥99% pureté. COA inclus. Livraison rapide FR & UE.`,
      es: `CJC-1295 No DAC Comprar. Péptido de investigación premium (Mod GRF 1-29) con ≥99% pureza. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista CJC-1295 No DAC. Peptide di ricerca premium (Mod GRF 1-29) con ≥99% purezza. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\bEpitalon\b/i.test(productName)) {
    const metas = {
      en: `Buy Epitalon. Premium research peptide with ≥99% purity. COA included. Fast UK & EU delivery from a trusted supplier.`,
      nl: `Epitalon Kopen. Premium onderzoekspeptide met ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `Epitalon kaufen. Premium Forschungspeptid mit ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter Epitalon. Peptide de recherche premium avec ≥99% pureté. COA inclus. Livraison rapide FR & UE.`,
      es: `Epitalon Comprar. Péptido de investigación premium con ≥99% pureza. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista Epitalon. Peptide di ricerca premium con ≥99% purezza. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\bCagrilintide\b/i.test(productName)) {
    const metas = {
      en: `Buy Cagrilintide. Premium research-grade amylin analog with ≥99% purity. COA included. Fast UK & EU delivery.`,
      nl: `Cagrilintide Kopen. Premium onderzoekspeptide (amylin-analoog) met ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `Cagrilintide kaufen. Premium Forschungspeptid (Amylin-Analog) mit ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter Cagrilintide. Peptide de recherche premium (analogue de l’amyline) avec ≥99% pureté. COA inclus. Livraison rapide FR & UE.`,
      es: `Cagrilintide Comprar. Péptido de investigación premium (análogo de amilina) con ≥99% pureza. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista Cagrilintide. Peptide di ricerca premium (analogo dell’amilina) con ≥99% purezza. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\bDSIP\b/i.test(productName)) {
    const metas = {
      en: `Buy DSIP. Premium research-grade delta sleep-inducing peptide with ≥99% purity. COA included. Fast UK & EU delivery.`,
      nl: `DSIP Kopen. Premium onderzoekspeptide (Delta Sleep-Inducing Peptide) met ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `DSIP kaufen. Premium Forschungspeptid (Delta Sleep-Inducing Peptide) mit ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter DSIP. Peptide de recherche premium (Delta Sleep-Inducing Peptide) avec ≥99% pureté. COA inclus. Livraison rapide FR & UE.`,
      es: `DSIP Comprar. Péptido de investigación premium (Delta Sleep-Inducing Peptide) con ≥99% pureza. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista DSIP. Peptide di ricerca premium (Delta Sleep-Inducing Peptide) con ≥99% purezza. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/(\bHGH\b|\bGH\b)\s*Fragment\s*176\s*-\s*191\b/i.test(productName)) {
    const metas = {
      en: `Buy HGH Fragment 176-191. Premium research-grade GH fragment with ≥99% purity. COA included. Fast UK & EU delivery.`,
      nl: `HGH Fragment 176-191 Kopen. Premium GH-fragment peptide met ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `HGH Fragment 176-191 kaufen. Premium GH-Fragment-Peptid mit ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter HGH Fragment 176-191. Peptide fragment GH premium avec ≥99% pureté. COA inclus. Livraison rapide FR & UE.`,
      es: `HGH Fragment 176-191 Comprar. Péptido fragmento de GH premium con ≥99% pureza. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista HGH Fragment 176-191. Peptide frammento GH premium con ≥99% purezza. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\bGHK\s*-?\s*Cu\b/i.test(productName)) {
    const metas = {
      en: `Buy GHK-Cu UK. Premium research-grade copper peptide (Copper Tripeptide-1) with ≥99% purity. COA included. Fast UK & EU delivery.`,
      nl: `GHK-Cu Kopen. Premium koperpeptide (Copper Tripeptide-1) voor onderzoek naar weefselherstel en genexpressie. ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `GHK-Cu kaufen. Premium Kupferpeptid (Copper Tripeptide-1) für Forschung zu Gewebereparatur und Genexpression. ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter GHK-Cu. Peptide de cuivre (Copper Tripeptide-1) premium pour la recherche sur la réparation tissulaire et l'expression génique. Pureté ≥99%. COA inclus. Livraison rapide FR & UE.`,
      es: `GHK-Cu Comprar. Péptido de cobre (Copper Tripeptide-1) premium para investigación de reparación tisular y expresión génica. Pureza ≥99%. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista GHK-Cu. Peptide di rame (Copper Tripeptide-1) premium per ricerca su riparazione tissutale ed espressione genica. Purezza ≥99%. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\bGHRP\s*-?\s*2\b/i.test(productName)) {
    const metas = {
      en: `Buy GHRP-2 UK. Premium research-grade growth hormone releasing peptide with ≥99% purity. COA included. Fast UK & EU delivery.`,
      nl: `GHRP-2 Kopen. Premium onderzoekspeptide (GH secretagoog) voor studies naar GH-afgifte en ghrelin-receptoractivatie. ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `GHRP-2 Kaufen. Premium Forschungspeptid (GH-Sekretagog) für Studien zur GH-Freisetzung und Ghrelin-Rezeptor-Aktivierung. ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter GHRP-2. Peptide de recherche premium (sécrétagogue GH) pour l'étude de la libération de GH et de l'activation du récepteur de la ghréline. Pureté ≥99%. COA inclus. Livraison rapide FR & UE.`,
      es: `GHRP-2 Comprar. Péptido de investigación premium (secretagogo de GH) para estudios de liberación de GH y activación del receptor de grelina. Pureza ≥99%. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista GHRP-2. Peptide di ricerca premium (secretagogo GH) per studi su rilascio di GH e attivazione del recettore della grelina. Purezza ≥99%. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\bGHRP\s*-?\s*6\b/i.test(productName)) {
    const metas = {
      en: `Buy GHRP-6. Premium research-grade growth hormone releasing peptide with ≥99% purity. COA included. Fast UK & EU delivery.`,
      nl: `GHRP-6 Kopen. Premium onderzoekspeptide (GH secretagoog) voor studies naar GH-afgifte, ghrelin-receptoractivatie en eetlustmechanismen. ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `GHRP-6 Kaufen. Premium Forschungspeptid (GH-Sekretagog) für Studien zu GH-Freisetzung, Ghrelin-Rezeptor-Aktivierung und Appetitmechanismen. ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter GHRP-6. Peptide de recherche premium (sécrétagogue GH) pour l'étude de la libération de GH, de l'activation du récepteur de la ghréline et des mécanismes de l'appétit. Pureté ≥99%. COA inclus. Livraison rapide FR & UE.`,
      es: `GHRP-6 Comprar. Péptido de investigación premium (secretagogo de GH) para estudios de liberación de GH, activación del receptor de grelina y mecanismos del apetito. Pureza ≥99%. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista GHRP-6. Peptide di ricerca premium (secretagogo GH) per studi su rilascio di GH, attivazione del recettore della grelina e meccanismi dell'appetito. Purezza ≥99%. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\bMelanotan\s*2\b/i.test(productName)) {
    const metas = {
      en: `Buy Melanotan 2 UK. Premium research peptide (MT-2) with ≥99% purity. COA included. Fast UK & EU delivery.`,
      nl: `Melanotan 2 kopen. Premium onderzoekspeptide (MT-2) voor studies naar melanocortine-receptor-signaling en pigmentatie. ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `Melanotan 2 kaufen. Premium Forschungspeptid (MT-2) für Studien zur Melanocortin-Rezeptor-Signalgebung und Pigmentierung. ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter Melanotan 2. Peptide de recherche premium (MT-2) pour l'étude de la signalisation des récepteurs mélanocortines et de la pigmentation. Pureté ≥99%. COA inclus. Livraison rapide FR & UE.`,
      es: `Melanotan 2 comprar. Péptido de investigación premium (MT-2) para estudios de señalización del receptor de melanocortina y pigmentación. Pureza ≥99%. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista Melanotan 2. Peptide di ricerca premium (MT-2) per studi su segnalazione dei recettori melanocortinici e pigmentazione. Purezza ≥99%. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\bIpamorelin\b/i.test(productName)) {
    const metas = {
      en: `Buy Ipamorelin UK. Premium research-grade growth hormone secretagogue with ≥99% purity. COA included. Fast UK & EU delivery.`,
      nl: `Ipamorelin kopen. Selectieve GH secretagoog voor onderzoek naar GH-asfysiologie met minimale effecten op cortisol en prolactine. ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `Ipamorelin kaufen. Selektives GH-Sekretagog für Forschung zur GH-Achsenphysiologie mit minimalen Effekten auf Cortisol und Prolaktin. ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter Ipamorelin. Sécrétagogue GH sélectif pour la recherche sur l'axe GH avec des effets minimes sur le cortisol et la prolactine. Pureté ≥99%. COA inclus. Livraison rapide FR & UE.`,
      es: `Ipamorelin comprar. Secretagogo de GH selectivo para investigación del eje de GH con efectos mínimos sobre cortisol y prolactina. Pureza ≥99%. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista Ipamorelin. Secretagogo GH selettivo per ricerca sull'asse GH con effetti minimi su cortisolo e prolattina. Purezza ≥99%. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\bNAD\+\b/i.test(productName)) {
    const metas = {
      en: `Buy NAD+. Premium NAD+ for cellular energy and longevity research with ≥99% purity. COA included. Fast UK & EU delivery.`,
      nl: `NAD+ kopen. Premium co-enzym voor onderzoek naar energiemetabolisme, DNA-reparatie en cellulaire signalisatie. ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `NAD+ kaufen. Premium Coenzym für Forschung zu Energiestoffwechsel, DNA-Reparatur und zellulärer Signalgebung. ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter NAD+. Coenzyme premium pour la recherche sur le métabolisme énergétique, la réparation de l'ADN et la signalisation cellulaire. Pureté ≥99%. COA inclus. Livraison rapide FR & UE.`,
      es: `NAD+ comprar. Coenzima premium para investigación de metabolismo energético, reparación del ADN y señalización celular. Pureza ≥99%. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista NAD+. Coenzima premium per ricerca su metabolismo energetico, riparazione del DNA e segnalazione cellulare. Purezza ≥99%. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\bO\s*-\s*304\b/i.test(productName)) {
    const metas = {
      en: `Buy O-304. Premium research compound (direct AMPK activator) with ≥99% purity. COA included. Fast UK & EU delivery.`,
      nl: `O-304 kopen. Directe AMPK-activator voor onderzoek naar energiehomeostase, glucosemetabolisme en lipidenoxidatie. ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `O-304 kaufen. Direkter AMPK-Aktivator für Forschung zu Energiehomöostase, Glukosestoffwechsel und Lipidoxidation. ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter O-304. Activateur direct de l'AMPK pour la recherche sur l'homéostasie énergétique, le métabolisme du glucose et l'oxydation lipidique. Pureté ≥99%. COA inclus. Livraison rapide FR & UE.`,
      es: `O-304 comprar. Activador directo de AMPK para investigación de homeostasis energética, metabolismo de glucosa y oxidación de lípidos. Pureza ≥99%. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista O-304. Attivatore diretto di AMPK per ricerca su omeostasi energetica, metabolismo del glucosio e ossidazione lipidica. Purezza ≥99%. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\bRetatrutide\b/i.test(productName)) {
    const metas = {
      en: `Buy Retatrutide UK. Premium research peptide (triple agonist) with ≥99% purity. COA included. Fast UK & EU delivery.`,
      nl: `Retatrutide kopen. Premium onderzoekspeptide (triple agonist: GLP-1/GIP/glucagon) voor metabolisch onderzoek. ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `Retatrutide kaufen. Premium Forschungspeptid (Triple-Agonist: GLP-1/GIP/Glukagon) für metabolische Forschung. ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter Retatrutide. Peptide de recherche premium (triple agoniste : GLP-1/GIP/glucagon) pour la recherche métabolique. Pureté ≥99%. COA inclus. Livraison rapide FR & UE.`,
      es: `Retatrutide comprar. Péptido de investigación premium (triple agonista: GLP-1/GIP/glucagón) para investigación metabólica. Pureza ≥99%. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista Retatrutide. Peptide di ricerca premium (triplo agonista: GLP-1/GIP/glucagone) per ricerca metabolica. Purezza ≥99%. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\bSelank\b/i.test(productName)) {
    const metas = {
      en: `Buy Selank UK. Premium research peptide (TP-7) with ≥99% purity. COA included. Fast UK & EU delivery.`,
      nl: `Selank kopen. Premium onderzoekspeptide (TP-7) voor studies naar anxiolytische, nootropische en immunomodulerende mechanismen. ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `Selank kaufen. Premium Forschungspeptid (TP-7) für Studien zu anxiolytischen, nootropischen und immunmodulatorischen Mechanismen. ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter Selank. Peptide de recherche premium (TP-7) pour l'étude des mécanismes anxiolytiques, nootropiques et immunomodulateurs. Pureté ≥99%. COA inclus. Livraison rapide FR & UE.`,
      es: `Selank comprar. Péptido de investigación premium (TP-7) para estudios de mecanismos ansiolíticos, nootrópicos e inmunomoduladores. Pureza ≥99%. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista Selank. Peptide di ricerca premium (TP-7) per studi su meccanismi ansiolitici, nootropici e immunomodulatori. Purezza ≥99%. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\bSemaglutide\b/i.test(productName)) {
    const metas = {
      en: `Buy Semaglutide UK. Premium research peptide (GLP-1 analogue) with ≥99% purity. COA included. Fast UK & EU delivery.`,
      nl: `Semaglutide kopen. Premium onderzoekspeptide (GLP-1-analoog) voor onderzoek naar glucosemetabolisme, eetlustregulatie en darm-hersen-as signalisatie. ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `Semaglutide kaufen. Premium Forschungspeptid (GLP-1-Analog) für Forschung zu Glukosestoffwechsel, Appetitregulation und Darm-Hirn-Achse. ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter Semaglutide. Peptide de recherche premium (analogue GLP-1) pour la recherche sur le métabolisme du glucose, la régulation de l'appétit et l'axe intestin-cerveau. Pureté ≥99%. COA inclus. Livraison rapide FR & UE.`,
      es: `Semaglutide comprar. Péptido de investigación premium (análogo de GLP-1) para investigación de metabolismo de glucosa, regulación del apetito y eje intestino-cerebro. Pureza ≥99%. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista Semaglutide. Peptide di ricerca premium (analogo GLP-1) per ricerca su metabolismo del glucosio, regolazione dell'appetito e asse intestino-cervello. Purezza ≥99%. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\bSemax\b/i.test(productName)) {
    const metas = {
      en: `Buy Semax UK. Premium research-grade nootropic peptide with ≥99% purity. COA included. Fast UK & EU delivery.`,
      nl: `Semax Kopen. Premium nootropisch peptide voor onderzoek met ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `Semax kaufen. Premium nootropisches Peptid für Forschung mit ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter Semax. Peptide nootropique premium pour la recherche avec ≥99% pureté. COA inclus. Livraison rapide FR & UE.`,
      es: `Semax Comprar. Péptido nootrópico premium para investigación con ≥99% pureza. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista Semax. Peptide nootropo premium per la ricerca con ≥99% purezza. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\bTB\s*-?\s*500\b/i.test(productName)) {
    const metas = {
      en: `Buy TB-500 UK. Premium research-grade Thymosin Beta-4 (Tβ4) fragment with ≥99% purity. COA included. Fast UK & EU delivery.`,
      nl: `TB-500 Kopen. Premium Thymosin Beta-4 (Tβ4) fragment voor onderzoek met ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `TB-500 kaufen. Premium Thymosin Beta-4 (Tβ4)-Fragment für Forschung mit ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter TB-500. Fragment de Thymosin Beta-4 (Tβ4) premium pour la recherche avec ≥99% pureté. COA inclus. Livraison rapide FR & UE.`,
      es: `TB-500 Comprar. Fragmento de Thymosin Beta-4 (Tβ4) premium para investigación con ≥99% pureza. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista TB-500. Frammento di Thymosin Beta-4 (Tβ4) premium per la ricerca con ≥99% purezza. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\bTesofensine\b/i.test(productName)) {
    const metas = {
      en: `Buy Tesofensine UK. Premium research-grade compound (NS2330) with ≥99% purity. COA included. Fast UK & EU delivery.`,
      nl: `Tesofensine Kopen. Premium onderzoekscompound (NS2330) met ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `Tesofensine kaufen. Premium Forschungscompound (NS2330) mit ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter Tesofensine. Composé de recherche premium (NS2330) avec ≥99% pureté. COA inclus. Livraison rapide FR & UE.`,
      es: `Tesofensine Comprar. Compuesto de investigación premium (NS2330) con ≥99% pureza. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista Tesofensine. Composto di ricerca premium (NS2330) con ≥99% purezza. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  if (/\bTirzepatide\b/i.test(productName)) {
    const metas = {
      en: `Buy Tirzepatide UK. Premium research-grade dual GIP/GLP-1 agonist peptide with ≥99% purity. COA included. Fast UK & EU delivery.`,
      nl: `Tirzepatide Kopen. Premium onderzoekspeptide (duale GIP/GLP-1 agonist) met ≥99% zuiverheid. COA inbegrepen. Snelle levering in NL & EU.`,
      de: `Tirzepatide kaufen. Premium Forschungspeptid (dualer GIP/GLP-1-Agonist) mit ≥99% Reinheit. COA inklusive. Schnelle Lieferung in DE & EU.`,
      fr: `Acheter Tirzepatide. Peptide de recherche premium (double agoniste GIP/GLP-1) avec ≥99% pureté. COA inclus. Livraison rapide FR & UE.`,
      es: `Tirzepatide Comprar. Péptido de investigación premium (agonista dual GIP/GLP-1) con ≥99% pureza. COA incluido. Envío rápido ES & UE.`,
      it: `Acquista Tirzepatide. Peptide di ricerca premium (doppio agonista GIP/GLP-1) con ≥99% purezza. COA incluso. Spedizione veloce IT & UE.`
    };
    return metas[lang];
  }
  const templates = {
    en: `Buy ${productName} UK. Premium research grade peptide with ≥99% purity. Fast UK & EU delivery. COA included. Trusted supplier.`,
    nl: `${productName} Kopen Nederland. Premium onderzoekspeptide met ≥99% zuiverheid. Snelle levering in NL & EU. COA inbegrepen.`,
    de: `${productName} kaufen Deutschland. Premium Forschungspeptid mit ≥99% Reinheit. Schnelle DE & EU Lieferung. COA inklusive.`,
    fr: `Acheter ${productName} France. Peptide de recherche premium avec ≥99% pureté. Livraison rapide FR & UE. COA inclus.`,
    es: `Comprar ${productName} España. Péptido de investigación premium con ≥99% pureza. Envío rápido ES & UE. COA incluido.`,
    it: `Acquista ${productName} Italia. Peptide di ricerca premium con ≥99% purezza. Spedizione veloce IT & UE. COA incluso.`
  };
  return templates[lang];
}
function getLocalizedPageTitle(productName, lang) {
  if (productName.includes("Bacteriostatic Water")) {
    const titles = {
      en: `Buy Bacteriostatic water UK | USP Grade | Peptide Shop`,
      nl: `Bacteriostatic water Kopen Nederland | Steriel Water | Peptide Shop NL`,
      de: `Bacteriostatic water Kaufen Deutschland | Steriles Wasser | Peptide Shop DE`,
      fr: `Acheter de l'eau bactériostatique France | Eau Stérile | Peptide Shop FR`,
      es: `Agua bacteriostatica comprar España | Calidad USP | Peptide Shop ES`,
      it: `Acquisto acqua batteriostatica Italia | Acqua Sterile | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bAOD[-\s]?9604\b/i.test(productName)) {
    const titles = {
      en: `Buy AOD-9604 UK | ≥99% Purity | Peptide Shop`,
      nl: `AOD-9604 Kopen Nederland | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `AOD-9604 kaufen Deutschland | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter AOD-9604 France | ≥99% Pureté | Peptide Shop FR`,
      es: `aod 9604 comprar España | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista AOD-9604 Italia | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bBPC[-\s]?157\b/i.test(productName)) {
    const titles = {
      en: `Buy BPC-157 UK | ≥99% Purity | Peptide Shop`,
      nl: `BPC-157 Kopen Nederland | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `BPC-157 Kaufen Deutschland | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter BPC-157 France | ≥99% Pureté | Peptide Shop FR`,
      es: `BPC 157 Comprar España | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista BPC-157 Italia | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\b5\s*-?\s*Amino\s*-?\s*1\s*MQ\b/i.test(productName)) {
    const titles = {
      en: `Buy 5-Amino-1MQ | ≥99% Purity | Peptide Shop`,
      nl: `5-amino-1mq kopen Nederland | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `5-Amino-1MQ kaufen Deutschland | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter 5-Amino-1MQ France | ≥99% Pureté | Peptide Shop FR`,
      es: `5-Amino-1MQ Comprar España | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista 5-Amino-1MQ Italia | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bCJC\s*-?\s*1295\b/i.test(productName) && /\bNo\s*DAC\b/i.test(productName)) {
    const titles = {
      en: `Buy CJC-1295 No DAC | ≥99% Purity | Peptide Shop`,
      nl: `CJC-1295 No DAC Kopen | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `CJC-1295 No DAC kaufen | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter CJC-1295 No DAC | ≥99% Pureté | Peptide Shop FR`,
      es: `CJC-1295 No DAC Comprar | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista CJC-1295 No DAC | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bEpitalon\b/i.test(productName)) {
    const titles = {
      en: `Buy Epitalon | ≥99% Purity | Peptide Shop`,
      nl: `Epitalon Kopen | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `Epitalon kaufen | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter Epitalon | ≥99% Pureté | Peptide Shop FR`,
      es: `Epitalon Comprar | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista Epitalon | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bCagrilintide\b/i.test(productName)) {
    const titles = {
      en: `Buy Cagrilintide | ≥99% Purity | Peptide Shop`,
      nl: `Cagrilintide Kopen | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `Cagrilintide kaufen | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter Cagrilintide | ≥99% Pureté | Peptide Shop FR`,
      es: `Cagrilintide Comprar | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista Cagrilintide | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bDSIP\b/i.test(productName)) {
    const titles = {
      en: `Buy DSIP | ≥99% Purity | Peptide Shop`,
      nl: `DSIP Kopen | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `DSIP kaufen | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter DSIP | ≥99% Pureté | Peptide Shop FR`,
      es: `DSIP Comprar | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista DSIP | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/(\bHGH\b|\bGH\b)\s*Fragment\s*176\s*-\s*191\b/i.test(productName)) {
    const titles = {
      en: `Buy HGH Fragment 176-191 | ≥99% Purity | Peptide Shop`,
      nl: `HGH Fragment 176-191 Kopen | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `HGH Fragment 176-191 kaufen | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter HGH Fragment 176-191 | ≥99% Pureté | Peptide Shop FR`,
      es: `HGH Fragment 176-191 Comprar | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista HGH Fragment 176-191 | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bGHK\s*-?\s*Cu\b/i.test(productName)) {
    const titles = {
      en: `Buy GHK-Cu UK | ≥99% Purity | Peptide Shop`,
      nl: `GHK-Cu Kopen | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `GHK-Cu kaufen | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter GHK-Cu | ≥99% Pureté | Peptide Shop FR`,
      es: `GHK-Cu Comprar | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista GHK-Cu | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bGHRP\s*-?\s*2\b/i.test(productName)) {
    const titles = {
      en: `Buy GHRP-2 UK | ≥99% Purity | Peptide Shop`,
      nl: `GHRP-2 Kopen | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `GHRP-2 Kaufen | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter GHRP-2 | ≥99% Pureté | Peptide Shop FR`,
      es: `GHRP-2 Comprar | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista GHRP-2 | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bGHRP\s*-?\s*6\b/i.test(productName)) {
    const titles = {
      en: `Buy GHRP-6 | ≥99% Purity | Peptide Shop`,
      nl: `GHRP-6 Kopen | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `GHRP-6 Kaufen | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter GHRP-6 | ≥99% Pureté | Peptide Shop FR`,
      es: `GHRP-6 Comprar | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista GHRP-6 | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bMelanotan\s*2\b/i.test(productName)) {
    const titles = {
      en: `Buy Melanotan 2 UK | ≥99% Purity | Peptide Shop`,
      nl: `Melanotan 2 kopen | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `Melanotan 2 kaufen | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter Melanotan 2 | ≥99% Pureté | Peptide Shop FR`,
      es: `Melanotan 2 comprar | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista Melanotan 2 | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bIpamorelin\b/i.test(productName)) {
    const titles = {
      en: `Buy Ipamorelin UK | ≥99% Purity | Peptide Shop`,
      nl: `Ipamorelin kopen | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `Ipamorelin kaufen | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter Ipamorelin | ≥99% Pureté | Peptide Shop FR`,
      es: `Ipamorelin comprar | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista Ipamorelin | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bNAD\+\b/i.test(productName)) {
    const titles = {
      en: `Buy NAD+ | ≥99% Purity | Peptide Shop`,
      nl: `NAD+ kopen | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `NAD+ kaufen | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter NAD+ | ≥99% Pureté | Peptide Shop FR`,
      es: `NAD+ comprar | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista NAD+ | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bO\s*-\s*304\b/i.test(productName)) {
    const titles = {
      en: `Buy O-304 | ≥99% Purity | Peptide Shop`,
      nl: `O-304 kopen | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `O-304 kaufen | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter O-304 | ≥99% Pureté | Peptide Shop FR`,
      es: `O-304 comprar | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista O-304 | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bRetatrutide\b/i.test(productName)) {
    const titles = {
      en: `Buy Retatrutide UK | ≥99% Purity | Peptide Shop`,
      nl: `Retatrutide kopen | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `Retatrutide kaufen | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter Retatrutide | ≥99% Pureté | Peptide Shop FR`,
      es: `Retatrutide comprar | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista Retatrutide | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bSelank\b/i.test(productName)) {
    const titles = {
      en: `Buy Selank UK | ≥99% Purity | Peptide Shop`,
      nl: `Selank kopen | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `Selank kaufen | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter Selank | ≥99% Pureté | Peptide Shop FR`,
      es: `Selank comprar | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista Selank | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bSemaglutide\b/i.test(productName)) {
    const titles = {
      en: `Buy Semaglutide UK | ≥99% Purity | Peptide Shop`,
      nl: `Semaglutide kopen | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `Semaglutide kaufen | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter Semaglutide | ≥99% Pureté | Peptide Shop FR`,
      es: `Semaglutide comprar | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista Semaglutide | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bSemax\b/i.test(productName)) {
    const titles = {
      en: `Buy Semax UK | ≥99% Purity | Peptide Shop`,
      nl: `Semax Kopen | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `Semax kaufen | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter Semax | ≥99% Pureté | Peptide Shop FR`,
      es: `Semax Comprar | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista Semax | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bTB\s*-?\s*500\b/i.test(productName)) {
    const titles = {
      en: `Buy TB-500 UK | ≥99% Purity | Peptide Shop`,
      nl: `TB-500 Kopen | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `TB-500 kaufen | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter TB-500 | ≥99% Pureté | Peptide Shop FR`,
      es: `TB-500 Comprar | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista TB-500 | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bTesofensine\b/i.test(productName)) {
    const titles = {
      en: `Buy Tesofensine UK | ≥99% Purity | Peptide Shop`,
      nl: `Tesofensine Kopen | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `Tesofensine kaufen | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter Tesofensine | ≥99% Pureté | Peptide Shop FR`,
      es: `Tesofensine Comprar | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista Tesofensine | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  if (/\bTirzepatide\b/i.test(productName)) {
    const titles = {
      en: `Buy Tirzepatide UK | ≥99% Purity | Peptide Shop`,
      nl: `Tirzepatide Kopen | ≥99% Zuiverheid | Peptide Shop NL`,
      de: `Tirzepatide kaufen | ≥99% Reinheit | Peptide Shop DE`,
      fr: `Acheter Tirzepatide | ≥99% Pureté | Peptide Shop FR`,
      es: `Tirzepatide Comprar | ≥99% Pureza | Peptide Shop ES`,
      it: `Acquista Tirzepatide | ≥99% Purezza | Peptide Shop IT`
    };
    return titles[lang];
  }
  const templates = {
    en: `Buy ${productName} UK | ≥99% Purity | Peptide Shop`,
    nl: `${productName} Kopen Nederland | ≥99% Zuiverheid | Peptide Shop NL`,
    de: `${productName} Kaufen Deutschland | ≥99% Reinheit | Peptide Shop DE`,
    fr: `Acheter ${productName} France | ≥99% Pureté | Peptide Shop FR`,
    es: `Comprar ${productName} España | ≥99% Pureza | Peptide Shop ES`,
    it: `Acquista ${productName} Italia | ≥99% Purezza | Peptide Shop IT`
  };
  return templates[lang];
}
function translatePackageSize(packageSize, lang) {
  if (lang === "en" || !packageSize) {
    return packageSize;
  }
  const translations2 = {
    en: {},
    nl: {
      "vial": "flacon",
      "vials": "flacons",
      "bottle": "fles",
      "bottles": "flessen",
      "capsule": "capsule",
      "capsules": "capsules",
      "pack": "verpakking",
      "packs": "verpakkingen",
      "unit": "eenheid",
      "units": "eenheden",
      "powder": "poeder",
      "tablet": "tablet",
      "tablets": "tabletten",
      "syringe": "spuit",
      "syringes": "spuiten",
      "month": "maand",
      "months": "maanden",
      "supply": "voorraad"
    },
    de: {
      "vial": "Ampulle",
      "vials": "Ampullen",
      "bottle": "Flasche",
      "bottles": "Flaschen",
      "capsule": "Kapsel",
      "capsules": "Kapseln",
      "pack": "Packung",
      "packs": "Packungen",
      "unit": "Einheit",
      "units": "Einheiten",
      "powder": "Pulver",
      "tablet": "Tablette",
      "tablets": "Tabletten",
      "syringe": "Spritze",
      "syringes": "Spritzen",
      "month": "Monat",
      "months": "Monate",
      "supply": "Vorrat"
    },
    fr: {
      "vial": "flacon",
      "vials": "flacons",
      "bottle": "bouteille",
      "bottles": "bouteilles",
      "capsule": "gélule",
      "capsules": "gélules",
      "pack": "paquet",
      "packs": "paquets",
      "unit": "unité",
      "units": "unités",
      "powder": "poudre",
      "tablet": "comprimé",
      "tablets": "comprimés",
      "syringe": "seringue",
      "syringes": "seringues",
      "month": "mois",
      "months": "mois",
      "supply": "approvisionnement"
    },
    es: {
      "vial": "vial",
      "vials": "viales",
      "bottle": "frasco",
      "bottles": "frascos",
      "capsule": "cápsula",
      "capsules": "cápsulas",
      "pack": "paquete",
      "packs": "paquetes",
      "unit": "unidad",
      "units": "unidades",
      "powder": "polvo",
      "tablet": "tableta",
      "tablets": "tabletas",
      "syringe": "jeringa",
      "syringes": "jeringas",
      "month": "mes",
      "months": "meses",
      "supply": "suministro"
    },
    it: {
      "vial": "fiala",
      "vials": "fiale",
      "bottle": "flacone",
      "bottles": "flaconi",
      "capsule": "capsula",
      "capsules": "capsule",
      "pack": "confezione",
      "packs": "confezioni",
      "unit": "unità",
      "units": "unità",
      "powder": "polvere",
      "tablet": "compressa",
      "tablets": "compresse",
      "syringe": "siringa",
      "syringes": "siringhe",
      "month": "mese",
      "months": "mesi",
      "supply": "fornitura"
    }
  };
  let translated = packageSize;
  const langTranslations = translations2[lang];
  for (const [en, localized] of Object.entries(langTranslations)) {
    const regex = new RegExp(`\\b${en}\\b`, "gi");
    translated = translated.replace(regex, localized);
  }
  return translated;
}
function translateCategory(category, lang) {
  const categoryKeyMap = {
    "weight-loss": "nav.weightLoss",
    "muscle-recovery": "nav.muscleRecovery",
    "growth-hormone": "nav.growthHormone",
    "tanning": "nav.tanning",
    "cognitive": "nav.cognitive",
    "supplies": "nav.supplies"
  };
  const translationKey = categoryKeyMap[category.toLowerCase()];
  if (translationKey) {
    return t(lang, translationKey);
  }
  return category.split("-").map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  ).join(" ");
}
function translateFAQs(faqs, lang) {
  if (lang === "en" || !faqs || faqs.length === 0) {
    return faqs;
  }
  const faqTranslations = {
    en: {},
    nl: {
      // Questions
      "What is": "Wat is",
      "What are": "Wat zijn",
      "How does": "Hoe werkt",
      "How do I": "Hoe kan ik",
      "How should": "Hoe moet",
      "How can": "Hoe kan",
      "Where does": "Waar komt",
      "used for in research": "gebruikt voor in onderzoek",
      "work": "werkt",
      "work?": "werken?",
      "stored": "bewaard worden",
      "be stored": "bewaard worden",
      "purity is": "zuiverheid heeft",
      "What purity": "Welke zuiverheid",
      "Can": "Kan",
      "be combined with": "gecombineerd worden met",
      "reconstitute": "reconstitueren",
      "What sizes are available": "Welke formaten zijn beschikbaar",
      "sizes are available": "formaten zijn beschikbaar",
      "What is the origin": "Wat is de oorsprong",
      "origin of": "oorsprong van",
      // Answers
      "is studied for": "wordt bestudeerd voor",
      "is used in": "wordt gebruikt in",
      "is a": "is een",
      "appears to": "lijkt te",
      "Store": "Bewaar",
      "store": "bewaar",
      "Once reconstituted": "Eenmaal gereconstitueerd",
      "Keep at": "Bewaar bij",
      "keep at": "bewaar bij",
      "Our": "Onze",
      "is ≥99% pure": "is ≥99% zuiver",
      "as verified by": "zoals geverifieerd door",
      "HPLC": "HPLC",
      "Each batch includes": "Elke batch bevat",
      "Certificate of Analysis": "Analysecertificaat",
      "Yes": "Ja",
      "No": "Nee",
      "Reconstitute in": "Reconstitueer in",
      "sterile": "steriel",
      "bacteriostatic water": "bacteriostatisch water",
      "Add solvent slowly": "Voeg oplosmiddel langzaam toe",
      "gently swirl": "voorzichtig zwenken",
      "dissolve": "oplossen",
      "available in": "beschikbaar in",
      "vials": "flacons",
      "and": "en",
      "tissue healing": "weefselherstel",
      "tissue repair": "weefselreparatie",
      "research": "onderzoek",
      "weight loss": "gewichtsverlies",
      "growth hormone": "groeihormoon",
      "muscle recovery": "spierherstel",
      "peptide": "peptide",
      "peptides": "peptiden",
      "weeks": "weken",
      "months": "maanden",
      "recommended": "aanbevolen",
      "purity": "zuiverheid",
      "high-quality": "hoogwaardige",
      "premium": "premium",
      "fast delivery": "snelle levering"
    },
    de: {
      // Questions
      "What is": "Was ist",
      "What are": "Was sind",
      "How does": "Wie wirkt",
      "How do I": "Wie kann ich",
      "How should": "Wie sollte",
      "How can": "Wie kann",
      "Where does": "Woher kommt",
      "used for in research": "in der Forschung verwendet",
      "work": "funktionieren",
      "work?": "funktionieren?",
      "stored": "gelagert werden",
      "be stored": "gelagert werden",
      "purity is": "Reinheit hat",
      "What purity": "Welche Reinheit",
      "Can": "Kann",
      "be combined with": "kombiniert werden mit",
      "reconstitute": "rekonstituieren",
      "What sizes are available": "Welche Größen sind verfügbar",
      "sizes are available": "Größen sind verfügbar",
      "What is the origin": "Was ist der Ursprung",
      "origin of": "Ursprung von",
      // Answers
      "is studied for": "wird untersucht für",
      "is used in": "wird verwendet in",
      "is a": "ist ein",
      "appears to": "scheint zu",
      "Store": "Lagern",
      "store": "lagern",
      "Once reconstituted": "Nach Rekonstitution",
      "Keep at": "Aufbewahren bei",
      "keep at": "aufbewahren bei",
      "Our": "Unser",
      "is ≥99% pure": "ist ≥99% rein",
      "as verified by": "wie durch verifiziert",
      "HPLC": "HPLC",
      "Each batch includes": "Jede Charge enthält",
      "Certificate of Analysis": "Analysezertifikat",
      "Yes": "Ja",
      "No": "Nein",
      "Reconstitute in": "Rekonstituieren in",
      "sterile": "steril",
      "bacteriostatic water": "bakteriostatisches Wasser",
      "Add solvent slowly": "Lösungsmittel langsam hinzufügen",
      "gently swirl": "sanft schwenken",
      "dissolve": "auflösen",
      "available in": "verfügbar in",
      "vials": "Ampullen",
      "and": "und",
      "tissue healing": "Gewebeheilung",
      "tissue repair": "Gewebereparatur",
      "research": "Forschung",
      "weight loss": "Gewichtsverlust",
      "growth hormone": "Wachstumshormon",
      "muscle recovery": "Muskelerholung",
      "peptide": "Peptid",
      "peptides": "Peptide",
      "weeks": "Wochen",
      "months": "Monate",
      "recommended": "empfohlen",
      "purity": "Reinheit",
      "high-quality": "hochwertig",
      "premium": "Premium",
      "fast delivery": "schnelle Lieferung"
    },
    fr: {
      // Questions
      "What is": "Qu'est-ce que",
      "What are": "Quels sont",
      "How does": "Comment fonctionne",
      "How do I": "Comment puis-je",
      "How should": "Comment doit",
      "How can": "Comment peut",
      "Where does": "D'où vient",
      "used for in research": "utilisé dans la recherche",
      "work": "fonctionner",
      "work?": "fonctionner?",
      "stored": "être stocké",
      "be stored": "être stocké",
      "purity is": "pureté a",
      "What purity": "Quelle pureté",
      "Can": "Peut",
      "be combined with": "être combiné avec",
      "reconstitute": "reconstituer",
      "What sizes are available": "Quelles tailles sont disponibles",
      "sizes are available": "tailles sont disponibles",
      "What is the origin": "Quelle est l'origine",
      "origin of": "origine de",
      // Answers
      "is studied for": "est étudié pour",
      "is used in": "est utilisé dans",
      "is a": "est un",
      "appears to": "semble",
      "Store": "Stocker",
      "store": "stocker",
      "Once reconstituted": "Une fois reconstitué",
      "Keep at": "Conserver à",
      "keep at": "conserver à",
      "Our": "Notre",
      "is ≥99% pure": "est ≥99% pur",
      "as verified by": "comme vérifié par",
      "HPLC": "HPLC",
      "Each batch includes": "Chaque lot comprend",
      "Certificate of Analysis": "Certificat d'Analyse",
      "Yes": "Oui",
      "No": "Non",
      "Reconstitute in": "Reconstituer dans",
      "sterile": "stérile",
      "bacteriostatic water": "eau bactériostatique",
      "Add solvent slowly": "Ajouter le solvant lentement",
      "gently swirl": "agiter doucement",
      "dissolve": "dissoudre",
      "available in": "disponible en",
      "vials": "flacons",
      "and": "et",
      "tissue healing": "guérison des tissus",
      "tissue repair": "réparation des tissus",
      "research": "recherche",
      "weight loss": "perte de poids",
      "growth hormone": "hormone de croissance",
      "muscle recovery": "récupération musculaire",
      "peptide": "peptide",
      "peptides": "peptides",
      "weeks": "semaines",
      "months": "mois",
      "recommended": "recommandé",
      "purity": "pureté",
      "high-quality": "haute qualité",
      "premium": "premium",
      "fast delivery": "livraison rapide"
    },
    es: {
      // Questions
      "What is": "¿Qué es",
      "What are": "¿Cuáles son",
      "How does": "¿Cómo funciona",
      "How do I": "¿Cómo puedo",
      "How should": "¿Cómo debe",
      "How can": "¿Cómo puede",
      "Where does": "¿De dónde viene",
      "used for in research": "utilizado en la investigación",
      "work": "funcionar",
      "work?": "funcionar?",
      "stored": "almacenarse",
      "be stored": "almacenarse",
      "purity is": "pureza tiene",
      "What purity": "Qué pureza",
      "Can": "Puede",
      "be combined with": "combinarse con",
      "reconstitute": "reconstituir",
      "What sizes are available": "Qué tamaños están disponibles",
      "sizes are available": "tamaños están disponibles",
      "What is the origin": "Cuál es el origen",
      "origin of": "origen de",
      // Answers
      "is studied for": "se estudia para",
      "is used in": "se utiliza en",
      "is a": "es un",
      "appears to": "parece",
      "Store": "Almacenar",
      "store": "almacenar",
      "Once reconstituted": "Una vez reconstituido",
      "Keep at": "Mantener a",
      "keep at": "mantener a",
      "Our": "Nuestro",
      "is ≥99% pure": "es ≥99% puro",
      "as verified by": "como verificado por",
      "HPLC": "HPLC",
      "Each batch includes": "Cada lote incluye",
      "Certificate of Analysis": "Certificado de Análisis",
      "Yes": "Sí",
      "No": "No",
      "Reconstitute in": "Reconstituir en",
      "sterile": "estéril",
      "bacteriostatic water": "agua bacteriostática",
      "Add solvent slowly": "Añadir solvente lentamente",
      "gently swirl": "agitar suavemente",
      "dissolve": "disolver",
      "available in": "disponible en",
      "vials": "viales",
      "and": "y",
      "tissue healing": "curación de tejidos",
      "tissue repair": "reparación de tejidos",
      "research": "investigación",
      "weight loss": "pérdida de peso",
      "growth hormone": "hormona de crecimiento",
      "muscle recovery": "recuperación muscular",
      "peptide": "péptido",
      "peptides": "péptidos",
      "weeks": "semanas",
      "months": "meses",
      "recommended": "recomendado",
      "purity": "pureza",
      "high-quality": "alta calidad",
      "premium": "premium",
      "fast delivery": "entrega rápida"
    },
    it: {
      // Questions
      "What is": "Cos'è",
      "What are": "Quali sono",
      "How does": "Come funziona",
      "How do I": "Come posso",
      "How should": "Come deve",
      "How can": "Come può",
      "Where does": "Da dove viene",
      "used for in research": "utilizzato nella ricerca",
      "work": "funzionare",
      "work?": "funzionare?",
      "stored": "essere conservato",
      "be stored": "essere conservato",
      "purity is": "purezza ha",
      "What purity": "Quale purezza",
      "Can": "Può",
      "be combined with": "essere combinato con",
      "reconstitute": "ricostituire",
      "What sizes are available": "Quali formati sono disponibili",
      "sizes are available": "formati sono disponibili",
      "What is the origin": "Qual è l'origine",
      "origin of": "origine di",
      // Answers
      "is studied for": "è studiato per",
      "is used in": "è utilizzato in",
      "is a": "è un",
      "appears to": "sembra",
      "Store": "Conservare",
      "store": "conservare",
      "Once reconstituted": "Una volta ricostituito",
      "Keep at": "Conservare a",
      "keep at": "conservare a",
      "Our": "Il nostro",
      "is ≥99% pure": "è ≥99% puro",
      "as verified by": "come verificato da",
      "HPLC": "HPLC",
      "Each batch includes": "Ogni lotto include",
      "Certificate of Analysis": "Certificato di Analisi",
      "Yes": "Sì",
      "No": "No",
      "Reconstitute in": "Ricostituire in",
      "sterile": "sterile",
      "bacteriostatic water": "acqua batteriostatica",
      "Add solvent slowly": "Aggiungere il solvente lentamente",
      "gently swirl": "agitare delicatamente",
      "dissolve": "sciogliere",
      "available in": "disponibile in",
      "vials": "fiale",
      "and": "e",
      "tissue healing": "guarigione dei tessuti",
      "tissue repair": "riparazione dei tessuti",
      "research": "ricerca",
      "weight loss": "perdita di peso",
      "growth hormone": "ormone della crescita",
      "muscle recovery": "recupero muscolare",
      "peptide": "peptide",
      "peptides": "peptidi",
      "weeks": "settimane",
      "months": "mesi",
      "recommended": "raccomandato",
      "purity": "purezza",
      "high-quality": "alta qualità",
      "premium": "premium",
      "fast delivery": "consegna veloce"
    }
  };
  const langTrans = faqTranslations[lang];
  return faqs.map((faq) => ({
    question: translateText(faq.question, langTrans),
    answer: translateText(faq.answer, langTrans)
  }));
}
function translateReviews(reviews, lang) {
  if (lang === "en" || !reviews || reviews.length === 0) {
    return reviews;
  }
  const reviewTranslations = {
    en: {},
    nl: {
      // Review titles
      "Outstanding": "Uitstekend",
      "Excellent": "Uitstekend",
      "Great": "Geweldig",
      "Good": "Goed",
      "Premium": "Premium",
      "Reliable": "Betrouwbaar",
      "Fast": "Snel",
      "Perfect": "Perfect",
      "healing peptide": "genezend peptide",
      "research grade": "onderzoekskwaliteit",
      "quality": "kwaliteit",
      "product": "product",
      "service": "service",
      "supplier": "leverancier",
      "delivery": "levering",
      "purity": "zuiverheid",
      // Review content
      "Our": "Onze",
      "studies": "studies",
      "research": "onderzoek",
      "depends on": "hangt af van",
      "delivers": "levert",
      "consistent": "consistent",
      "excellence": "uitmuntendheid",
      "quality is exceptional": "kwaliteit is uitzonderlijk",
      "will continue ordering": "zal blijven bestellen",
      "Fast delivery": "Snelle levering",
      "fast delivery": "snelle levering",
      "excellent quality": "uitstekende kwaliteit",
      "Excellent quality": "Uitstekende kwaliteit",
      "high-quality": "hoogwaardige",
      "Consistent quality": "Consistente kwaliteit",
      "consistent quality": "consistente kwaliteit",
      "gives excellent results": "geeft uitstekende resultaten",
      "Verified purity": "Geverifieerde zuiverheid",
      "exceeds claims": "overtreft claims",
      "Essential for our": "Essentieel voor onze",
      "great quality": "geweldige kwaliteit",
      "fair price": "eerlijke prijs",
      "going well": "gaat goed",
      "progressing well": "vordert goed",
      "with this batch": "met deze batch",
      "remarkable activity": "opmerkelijke activiteit",
      "particularly compelling": "bijzonder overtuigend",
      "tissue repair": "weefselreparatie",
      "tissue healing": "weefselherstel",
      "muscle recovery": "spierherstel",
      "weight loss": "gewichtsverlies"
    },
    de: {
      // Review titles
      "Outstanding": "Hervorragend",
      "Excellent": "Ausgezeichnet",
      "Great": "Großartig",
      "Good": "Gut",
      "Premium": "Premium",
      "Reliable": "Zuverlässig",
      "Fast": "Schnell",
      "Perfect": "Perfekt",
      "healing peptide": "heilendes Peptid",
      "research grade": "Forschungsqualität",
      "quality": "Qualität",
      "product": "Produkt",
      "service": "Service",
      "supplier": "Lieferant",
      "delivery": "Lieferung",
      "purity": "Reinheit",
      // Review content
      "Our": "Unsere",
      "studies": "Studien",
      "research": "Forschung",
      "depends on": "hängt ab von",
      "delivers": "liefert",
      "consistent": "konsistent",
      "excellence": "Exzellenz",
      "quality is exceptional": "Qualität ist außergewöhnlich",
      "will continue ordering": "werden weiter bestellen",
      "Fast delivery": "Schnelle Lieferung",
      "fast delivery": "schnelle Lieferung",
      "excellent quality": "ausgezeichnete Qualität",
      "Excellent quality": "Ausgezeichnete Qualität",
      "high-quality": "hochwertig",
      "Consistent quality": "Konsistente Qualität",
      "consistent quality": "konsistente Qualität",
      "gives excellent results": "gibt ausgezeichnete Ergebnisse",
      "Verified purity": "Verifizierte Reinheit",
      "exceeds claims": "übertrifft Angaben",
      "Essential for our": "Wesentlich für unsere",
      "great quality": "großartige Qualität",
      "fair price": "fairer Preis",
      "going well": "läuft gut",
      "progressing well": "macht gute Fortschritte",
      "with this batch": "mit dieser Charge",
      "remarkable activity": "bemerkenswerte Aktivität",
      "particularly compelling": "besonders überzeugend",
      "tissue repair": "Gewebereparatur",
      "tissue healing": "Gewebeheilung",
      "muscle recovery": "Muskelerholung",
      "weight loss": "Gewichtsverlust"
    },
    fr: {
      // Review titles
      "Outstanding": "Exceptionnel",
      "Excellent": "Excellent",
      "Great": "Génial",
      "Good": "Bon",
      "Premium": "Premium",
      "Reliable": "Fiable",
      "Fast": "Rapide",
      "Perfect": "Parfait",
      "healing peptide": "peptide cicatrisant",
      "research grade": "qualité recherche",
      "quality": "qualité",
      "product": "produit",
      "service": "service",
      "supplier": "fournisseur",
      "delivery": "livraison",
      "purity": "pureté",
      // Review content
      "Our": "Notre",
      "studies": "études",
      "research": "recherche",
      "depends on": "dépend de",
      "delivers": "livre",
      "consistent": "constant",
      "excellence": "excellence",
      "quality is exceptional": "qualité est exceptionnelle",
      "will continue ordering": "continuerons à commander",
      "Fast delivery": "Livraison rapide",
      "fast delivery": "livraison rapide",
      "excellent quality": "excellente qualité",
      "Excellent quality": "Excellente qualité",
      "high-quality": "haute qualité",
      "Consistent quality": "Qualité constante",
      "consistent quality": "qualité constante",
      "gives excellent results": "donne d'excellents résultats",
      "Verified purity": "Pureté vérifiée",
      "exceeds claims": "dépasse les attentes",
      "Essential for our": "Essentiel pour notre",
      "great quality": "grande qualité",
      "fair price": "prix équitable",
      "going well": "se passe bien",
      "progressing well": "progresse bien",
      "with this batch": "avec ce lot",
      "remarkable activity": "activité remarquable",
      "particularly compelling": "particulièrement convaincant",
      "tissue repair": "réparation tissulaire",
      "tissue healing": "guérison tissulaire",
      "muscle recovery": "récupération musculaire",
      "weight loss": "perte de poids"
    },
    es: {
      // Review titles
      "Outstanding": "Excepcional",
      "Excellent": "Excelente",
      "Great": "Genial",
      "Good": "Bueno",
      "Premium": "Premium",
      "Reliable": "Confiable",
      "Fast": "Rápido",
      "Perfect": "Perfecto",
      "healing peptide": "péptido curativo",
      "research grade": "calidad de investigación",
      "quality": "calidad",
      "product": "producto",
      "service": "servicio",
      "supplier": "proveedor",
      "delivery": "entrega",
      "purity": "pureza",
      // Review content
      "Our": "Nuestra",
      "studies": "estudios",
      "research": "investigación",
      "depends on": "depende de",
      "delivers": "entrega",
      "consistent": "consistente",
      "excellence": "excelencia",
      "quality is exceptional": "calidad es excepcional",
      "will continue ordering": "seguiremos pidiendo",
      "Fast delivery": "Entrega rápida",
      "fast delivery": "entrega rápida",
      "excellent quality": "excelente calidad",
      "Excellent quality": "Excelente calidad",
      "high-quality": "alta calidad",
      "Consistent quality": "Calidad consistente",
      "consistent quality": "calidad consistente",
      "gives excellent results": "da excelentes resultados",
      "Verified purity": "Pureza verificada",
      "exceeds claims": "supera las expectativas",
      "Essential for our": "Esencial para nuestra",
      "great quality": "gran calidad",
      "fair price": "precio justo",
      "going well": "va bien",
      "progressing well": "progresa bien",
      "with this batch": "con este lote",
      "remarkable activity": "actividad notable",
      "particularly compelling": "particularmente convincente",
      "tissue repair": "reparación de tejidos",
      "tissue healing": "curación de tejidos",
      "muscle recovery": "recuperación muscular",
      "weight loss": "pérdida de peso"
    },
    it: {
      // Review titles
      "Outstanding": "Eccezionale",
      "Excellent": "Eccellente",
      "Great": "Ottimo",
      "Good": "Buono",
      "Premium": "Premium",
      "Reliable": "Affidabile",
      "Fast": "Veloce",
      "Perfect": "Perfetto",
      "healing peptide": "peptide curativo",
      "research grade": "qualità di ricerca",
      "quality": "qualità",
      "product": "prodotto",
      "service": "servizio",
      "supplier": "fornitore",
      "delivery": "consegna",
      "purity": "purezza",
      // Review content
      "Our": "La nostra",
      "studies": "studi",
      "research": "ricerca",
      "depends on": "dipende da",
      "delivers": "consegna",
      "consistent": "costante",
      "excellence": "eccellenza",
      "quality is exceptional": "qualità è eccezionale",
      "will continue ordering": "continueremo a ordinare",
      "Fast delivery": "Consegna veloce",
      "fast delivery": "consegna veloce",
      "excellent quality": "qualità eccellente",
      "Excellent quality": "Qualità eccellente",
      "high-quality": "alta qualità",
      "Consistent quality": "Qualità costante",
      "consistent quality": "qualità costante",
      "gives excellent results": "dà risultati eccellenti",
      "Verified purity": "Purezza verificata",
      "exceeds claims": "supera le aspettative",
      "Essential for our": "Essenziale per la nostra",
      "great quality": "ottima qualità",
      "fair price": "prezzo equo",
      "going well": "va bene",
      "progressing well": "procede bene",
      "with this batch": "con questo lotto",
      "remarkable activity": "attività notevole",
      "particularly compelling": "particolarmente convincente",
      "tissue repair": "riparazione dei tessuti",
      "tissue healing": "guarigione dei tessuti",
      "muscle recovery": "recupero muscolare",
      "weight loss": "perdita di peso"
    }
  };
  const langTrans = reviewTranslations[lang];
  return reviews.map((review) => ({
    ...review,
    title: translateText(review.title, langTrans),
    content: translateText(review.content, langTrans)
  }));
}
function translateText(text, translations2) {
  let translated = text;
  const sortedKeys = Object.keys(translations2).sort((a, b) => b.length - a.length);
  for (const key of sortedKeys) {
    const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    translated = translated.replace(regex, (match) => {
      const replacement = translations2[key];
      if (match[0] === match[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    });
  }
  return translated;
}

function CartIcon({ lang = "en" }) {
  const $cartItems = useStore(cartItems);
  const totalItems = Object.values($cartItems).reduce((acc, item) => acc + item.quantity, 0);
  const handleClick = (e) => {
    e.preventDefault();
    isCartOpen.set(true);
  };
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: handleClick,
      className: "cart-icon-btn",
      "aria-label": t(lang, "nav.cart"),
      style: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "10px 12px",
        color: "#1e293b",
        background: "none",
        border: "none",
        borderRadius: "8px",
        position: "relative",
        cursor: "pointer",
        transition: "all 0.2s"
      },
      children: [
        /* @__PURE__ */ jsxs("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("circle", { cx: "9", cy: "21", r: "1" }),
          /* @__PURE__ */ jsx("circle", { cx: "20", cy: "21", r: "1" }),
          /* @__PURE__ */ jsx("path", { d: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" })
        ] }),
        /* @__PURE__ */ jsx(
          "span",
          {
            style: {
              position: "absolute",
              top: "2px",
              right: "2px",
              background: "#0077b6",
              color: "white",
              fontSize: "10px",
              fontWeight: 700,
              minWidth: "18px",
              height: "18px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px"
            },
            children: totalItems
          }
        )
      ]
    }
  );
}

const currentCurrency = atom("GBP");
const exchangeRate = atom(1.2);
const formatPrice = (priceInGBP, currency) => {
  if (currency === "GBP") {
    return `£${priceInGBP.toFixed(2)}`;
  }
  const rate = exchangeRate.get();
  return `€${(priceInGBP * rate).toFixed(2)}`;
};

function CartModal({ lang = "en" }) {
  const $cartItems = useStore(cartItems);
  const $isCartOpen = useStore(isCartOpen);
  const $cartTotal = useStore(cartTotal);
  const currency = useStore(currentCurrency);
  useStore(exchangeRate);
  const items = Object.values($cartItems);
  const isEmpty = items.length === 0;
  if (!$isCartOpen) return null;
  const handleClose = () => {
    isCartOpen.set(false);
  };
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        onClick: handleBackdropClick,
        className: "fixed inset-0 bg-black/50 backdrop-blur-sm z-[10010]",
        "aria-hidden": "true",
        style: { position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 10010 }
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed z-[10011] bg-white flex flex-col shadow-2xl transition-transform duration-300 md:h-screen md:w-full md:max-w-[420px]",
        style: {
          /* Inline fallback if Tailwind fails */
          position: "fixed",
          zIndex: 10011,
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-10px 0 40px rgba(0,0,0,0.15)"
        },
        children: [
          /* @__PURE__ */ jsx("style", { children: `
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
        ` }),
          /* @__PURE__ */ jsxs("div", { className: "cart-modal-container fixed z-[10011] bg-white flex flex-col shadow-2xl overflow-hidden", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-4 border-b border-gray-100", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-slate-800 m-0", children: t(lang, "cart.yourCartCount").replace("{count}", String(items.length)) }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleClose,
                  className: "p-2 -mr-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-50",
                  "aria-label": t(lang, "cart.closeCart"),
                  style: { background: "none", border: "none", cursor: "pointer" },
                  children: /* @__PURE__ */ jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
                    /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                    /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                  ] })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-4", children: isEmpty ? /* @__PURE__ */ jsxs("div", { className: "text-center py-10 text-slate-500", children: [
              /* @__PURE__ */ jsxs("svg", { width: "64", height: "64", viewBox: "0 0 24 24", fill: "none", stroke: "#cbd5e1", strokeWidth: "1.5", className: "mx-auto mb-4", style: { display: "block", margin: "0 auto 16px" }, children: [
                /* @__PURE__ */ jsx("circle", { cx: "9", cy: "21", r: "1" }),
                /* @__PURE__ */ jsx("circle", { cx: "20", cy: "21", r: "1" }),
                /* @__PURE__ */ jsx("path", { d: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "font-medium text-lg mb-2", children: t(lang, "cart.empty") }),
              /* @__PURE__ */ jsx("p", { className: "text-sm mb-6", children: t(lang, "cart.addProductsToGetStarted") }),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: getLocalizedPath("/peptides/", lang),
                  onClick: handleClose,
                  className: "inline-block py-3 px-6 bg-[#0077b6] text-white font-semibold rounded-lg hover:bg-[#023e8a] no-underline",
                  style: { backgroundColor: "#0077b6", color: "white", padding: "12px 24px", borderRadius: "8px", textDecoration: "none" },
                  children: t(lang, "cart.browseProducts")
                }
              )
            ] }) : /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", style: { display: "flex", flexDirection: "column", gap: "16px" }, children: items.map((item) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100",
                style: { display: "flex", gap: "12px", padding: "12px", background: "#f8fafc", borderRadius: "10px" },
                children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: item.thumb_src,
                      alt: item.title,
                      className: "w-[70px] h-[70px] object-cover rounded-lg bg-white",
                      style: { width: "70px", height: "70px", objectFit: "cover", borderRadius: "8px" },
                      onError: (e) => {
                        e.target.src = "/images/peptide-default.jpg";
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 flex flex-col justify-between py-1", style: { flex: 1 }, children: [
                    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start gap-2", children: [
                      /* @__PURE__ */ jsx("h4", { className: "m-0 text-sm font-bold text-slate-800 leading-tight", style: { margin: 0, fontSize: "0.9rem", fontWeight: 600 }, children: item.title }),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => removeCartItem(item.id),
                          className: "text-slate-400 hover:text-red-500 p-0",
                          style: { background: "none", border: "none", cursor: "pointer", padding: 0 },
                          "aria-label": "Remove item",
                          children: /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("path", { d: "M18 6L6 18M6 6l12 12" }) })
                        }
                      )
                    ] }) }),
                    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end mt-2", style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: "8px" }, children: [
                      /* @__PURE__ */ jsx("p", { className: "m-0 font-bold text-[#0077b6]", style: { color: "#0077b6", margin: 0 }, children: formatPrice(item.price, currency) }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center bg-white border border-slate-200 rounded-lg h-8", style: { display: "flex", alignItems: "center", border: "1px solid #e2e8f0", borderRadius: "6px" }, children: [
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            onClick: () => updateQuantity(item.id, Math.max(1, item.quantity - 1)),
                            className: "w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-50",
                            style: { width: "32px", height: "32px", background: "none", border: "none", cursor: "pointer" },
                            children: "−"
                          }
                        ),
                        /* @__PURE__ */ jsx("span", { className: "w-6 text-center text-sm font-semibold text-slate-800", style: { minWidth: "24px", textAlign: "center", fontWeight: 600 }, children: item.quantity }),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            onClick: () => updateQuantity(item.id, item.quantity + 1),
                            className: "w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-50",
                            style: { width: "32px", height: "32px", background: "none", border: "none", cursor: "pointer" },
                            children: "+"
                          }
                        )
                      ] })
                    ] })
                  ] })
                ]
              },
              item.id
            )) }) }),
            !isEmpty && /* @__PURE__ */ jsxs("div", { className: "p-4 border-t border-gray-100 bg-white pb-[max(1rem,env(safe-area-inset-bottom))]", style: { padding: "16px", borderTop: "1px solid #f1f5f9", paddingBottom: "max(16px, env(safe-area-inset-bottom))" }, children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-end mb-1", style: { display: "flex", justifyContent: "space-between", marginBottom: "4px" }, children: [
                /* @__PURE__ */ jsx("span", { className: "text-slate-600 font-medium", children: t(lang, "cart.subtotal") }),
                /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-slate-900", children: formatPrice($cartTotal, currency) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-slate-400 mb-4 text-right", style: { fontSize: "0.75rem", color: "#94a3b8", textAlign: "right", marginBottom: "16px" }, children: "Shipping & taxes calculated at checkout" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", style: { display: "flex", flexDirection: "column", gap: "12px" }, children: [
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: getLocalizedPath("/checkout/", lang),
                    onClick: handleClose,
                    className: "w-full py-3 bg-[#0077b6] text-white font-bold text-center rounded-xl hover:bg-[#023e8a] transition-all no-underline",
                    style: { display: "block", width: "100%", padding: "14px", backgroundColor: "#0077b6", color: "white", borderRadius: "12px", textAlign: "center", textDecoration: "none", fontWeight: 700 },
                    children: t(lang, "cart.checkout")
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: handleClose,
                    className: "w-full py-2 text-slate-500 font-medium text-sm hover:text-slate-800",
                    style: { width: "100%", background: "none", border: "none", padding: "8px", color: "#64748b", cursor: "pointer" },
                    children: "Continue Shopping"
                  }
                )
              ] })
            ] })
          ] })
        ]
      }
    )
  ] });
}

function CartNotification({ lang = "en" }) {
  const $notification = useStore(cartNotification);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if ($notification) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(clearNotification, 300);
      }, 4e3);
      return () => clearTimeout(timer);
    }
  }, [$notification]);
  if (!$notification) return null;
  const handleViewCart = () => {
    isCartOpen.set(true);
    clearNotification();
  };
  const handleCheckout = () => {
    clearNotification();
    window.location.href = getLocalizedPath("/checkout/", lang);
  };
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(clearNotification, 300);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        position: "fixed",
        top: "120px",
        right: "20px",
        width: "100%",
        maxWidth: "360px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
        zIndex: 10005,
        overflow: "hidden",
        transform: isVisible ? "translateX(0)" : "translateX(120%)",
        opacity: isVisible ? 1 : 0,
        transition: "all 0.3s ease"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { style: {
          padding: "12px 16px",
          background: "linear-gradient(135deg, #0077b6, #023e8a)",
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }, children: [
          /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "2", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }),
          /* @__PURE__ */ jsx("span", { style: { fontWeight: 600, fontSize: "0.95rem" }, children: t(lang, "cart.addedToCart") }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleClose,
              style: {
                marginLeft: "auto",
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "4px",
                display: "flex"
              },
              "aria-label": t(lang, "cart.closeCart"),
              children: /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
                /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { padding: "16px", display: "flex", gap: "12px", alignItems: "center" }, children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: $notification.thumb_src,
              alt: $notification.title,
              style: {
                width: "60px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "8px",
                background: "#f8fafc"
              },
              onError: (e) => {
                e.target.src = "/images/peptide-default.jpg";
              }
            }
          ),
          /* @__PURE__ */ jsxs("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ jsx("h4", { style: {
              margin: "0 0 4px 0",
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "#1e293b",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }, children: $notification.title }),
            /* @__PURE__ */ jsxs("p", { style: { margin: 0, fontSize: "0.95rem", fontWeight: 700, color: "#0077b6" }, children: [
              "£",
              $notification.price.toFixed(2)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          padding: "0 16px 16px 16px",
          display: "flex",
          gap: "10px"
        }, children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleViewCart,
              style: {
                flex: 1,
                padding: "12px 16px",
                background: "white",
                color: "#0077b6",
                border: "2px solid #0077b6",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: "pointer",
                transition: "all 0.2s"
              },
              children: t(lang, "cart.viewCart")
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleCheckout,
              style: {
                flex: 1,
                padding: "12px 16px",
                background: "linear-gradient(135deg, #0077b6, #023e8a)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: "pointer"
              },
              children: t(lang, "cart.checkout")
            }
          )
        ] })
      ]
    }
  );
}

const currentUser = atom(null);
const isAuthenticated = computed(currentUser, (user) => user !== null);
const userOrders = atom([]);
const userAddresses = atom([]);
const isAuthLoading = atom(false);
const authError = atom(null);
const isBrowser = typeof window !== "undefined";
function saveAuthToStorage() {
  if (isBrowser) {
    const user = currentUser.get();
    if (user) {
      localStorage.setItem("peptide-user", JSON.stringify(user));
      localStorage.setItem("peptide-orders", JSON.stringify(userOrders.get()));
      localStorage.setItem("peptide-addresses", JSON.stringify(userAddresses.get()));
    } else {
      localStorage.removeItem("peptide-user");
      localStorage.removeItem("peptide-orders");
      localStorage.removeItem("peptide-addresses");
    }
  }
}
if (isBrowser) {
  const savedUser = localStorage.getItem("peptide-user");
  const savedOrders = localStorage.getItem("peptide-orders");
  const savedAddresses = localStorage.getItem("peptide-addresses");
  if (savedUser) {
    try {
      currentUser.set(JSON.parse(savedUser));
    } catch (e) {
      currentUser.set(null);
    }
  }
  if (savedOrders) {
    try {
      userOrders.set(JSON.parse(savedOrders));
    } catch (e) {
      userOrders.set([]);
    }
  }
  if (savedAddresses) {
    try {
      userAddresses.set(JSON.parse(savedAddresses));
    } catch (e) {
      userAddresses.set([]);
    }
  }
}
function generateId() {
  return "usr_" + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
}
async function loginWithGoogle() {
  isAuthLoading.set(true);
  authError.set(null);
  await new Promise((resolve) => setTimeout(resolve, 1200));
  const mockGoogleUser = {
    id: generateId(),
    email: "demo.user@gmail.com",
    firstName: "Demo",
    lastName: "User",
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    provider: "google",
    avatar: "https://ui-avatars.com/api/?name=Demo+User&background=0077b6&color=fff"
  };
  currentUser.set(mockGoogleUser);
  saveAuthToStorage();
  isAuthLoading.set(false);
  return mockGoogleUser;
}
async function loginWithFacebook() {
  isAuthLoading.set(true);
  authError.set(null);
  await new Promise((resolve) => setTimeout(resolve, 1200));
  const mockFacebookUser = {
    id: generateId(),
    email: "demo.user@facebook.com",
    firstName: "Demo",
    lastName: "User",
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    provider: "facebook",
    avatar: "https://ui-avatars.com/api/?name=Demo+User&background=1877f2&color=fff"
  };
  currentUser.set(mockFacebookUser);
  saveAuthToStorage();
  isAuthLoading.set(false);
  return mockFacebookUser;
}
function logout() {
  currentUser.set(null);
  userOrders.set([]);
  userAddresses.set([]);
  saveAuthToStorage();
}

function AccountButton({ lang = "en" }) {
  const $currentUser = useStore(currentUser);
  const $isAuthenticated = useStore(isAuthenticated);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 12px",
    background: "transparent",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#1e293b",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    textDecoration: "none",
    position: "relative"
  };
  const dropdownStyle = {
    position: "absolute",
    top: "100%",
    right: "0",
    marginTop: "8px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
    border: "1px solid #e2e8f0",
    minWidth: "200px",
    padding: "8px",
    zIndex: 1e3,
    opacity: isDropdownOpen ? 1 : 0,
    visibility: isDropdownOpen ? "visible" : "hidden",
    transform: isDropdownOpen ? "translateY(0)" : "translateY(-10px)",
    transition: "all 0.2s ease"
  };
  const dropdownLinkStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 14px",
    color: "#1e293b",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease"
  };
  if ($isAuthenticated && $currentUser) {
    const displayName = $currentUser.firstName || $currentUser.email.split("@")[0];
    return /* @__PURE__ */ jsxs("div", { ref: dropdownRef, style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => setIsDropdownOpen(!isDropdownOpen),
          style: buttonStyle,
          className: "account-btn",
          children: [
            $currentUser.avatar ? /* @__PURE__ */ jsx(
              "img",
              {
                src: $currentUser.avatar,
                alt: displayName,
                style: {
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  objectFit: "cover"
                }
              }
            ) : /* @__PURE__ */ jsx("div", { style: {
              width: "26px",
              height: "26px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0077b6, #023e8a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "12px",
              fontWeight: "700"
            }, children: displayName[0].toUpperCase() }),
            /* @__PURE__ */ jsx("span", { className: "action-label", style: { maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: displayName }),
            /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", style: { marginLeft: "2px" }, children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { style: dropdownStyle, children: [
        /* @__PURE__ */ jsxs("div", { style: { padding: "12px 14px", borderBottom: "1px solid #f1f5f9", marginBottom: "8px" }, children: [
          /* @__PURE__ */ jsxs("div", { style: { fontWeight: "700", color: "#1e293b", marginBottom: "2px" }, children: [
            $currentUser.firstName,
            " ",
            $currentUser.lastName
          ] }),
          /* @__PURE__ */ jsx("div", { style: { fontSize: "12px", color: "#64748b" }, children: $currentUser.email })
        ] }),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/account/dashboard/",
            style: dropdownLinkStyle,
            className: "dropdown-link",
            children: [
              /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#0077b6", strokeWidth: "2", children: [
                /* @__PURE__ */ jsx("rect", { width: "7", height: "9", x: "3", y: "3", rx: "1" }),
                /* @__PURE__ */ jsx("rect", { width: "7", height: "5", x: "14", y: "3", rx: "1" }),
                /* @__PURE__ */ jsx("rect", { width: "7", height: "9", x: "14", y: "12", rx: "1" }),
                /* @__PURE__ */ jsx("rect", { width: "7", height: "5", x: "3", y: "16", rx: "1" })
              ] }),
              t(lang, "common.dashboard")
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/account/dashboard/?tab=orders",
            style: dropdownLinkStyle,
            className: "dropdown-link",
            children: [
              /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#0077b6", strokeWidth: "2", children: [
                /* @__PURE__ */ jsx("path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" }),
                /* @__PURE__ */ jsx("path", { d: "M3 6h18" }),
                /* @__PURE__ */ jsx("path", { d: "M16 10a4 4 0 0 1-8 0" })
              ] }),
              t(lang, "common.myOrders")
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/account/dashboard/?tab=settings",
            style: dropdownLinkStyle,
            className: "dropdown-link",
            children: [
              /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#0077b6", strokeWidth: "2", children: [
                /* @__PURE__ */ jsx("path", { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" }),
                /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" })
              ] }),
              t(lang, "common.settings")
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { style: { borderTop: "1px solid #f1f5f9", marginTop: "8px", paddingTop: "8px" }, children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              logout();
              window.location.href = "/";
            },
            style: {
              ...dropdownLinkStyle,
              width: "100%",
              border: "none",
              background: "none",
              cursor: "pointer",
              color: "#ef4444"
            },
            className: "dropdown-link logout-link",
            children: [
              /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "#ef4444", strokeWidth: "2", children: [
                /* @__PURE__ */ jsx("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
                /* @__PURE__ */ jsx("polyline", { points: "16 17 21 12 16 7" }),
                /* @__PURE__ */ jsx("line", { x1: "21", x2: "9", y1: "12", y2: "12" })
              ] }),
              t(lang, "common.signOut")
            ]
          }
        ) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: dropdownRef,
      style: { position: "relative" },
      onMouseEnter: () => setIsDropdownOpen(true),
      onMouseLeave: () => setIsDropdownOpen(false),
      children: [
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "/checkout/",
            style: buttonStyle,
            className: "account-btn",
            children: [
              /* @__PURE__ */ jsxs("svg", { width: "22", height: "22", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
                /* @__PURE__ */ jsx("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
                /* @__PURE__ */ jsx("circle", { cx: "12", cy: "7", r: "4" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "action-label", children: t(lang, "nav.account") })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { style: dropdownStyle, children: [
          /* @__PURE__ */ jsxs("div", { style: { padding: "16px 14px", textAlign: "center", borderBottom: "1px solid #f1f5f9", marginBottom: "8px" }, children: [
            /* @__PURE__ */ jsx("div", { style: {
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(0, 119, 182, 0.1), rgba(0, 150, 199, 0.1))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px"
            }, children: /* @__PURE__ */ jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "#0077b6", strokeWidth: "2", children: [
              /* @__PURE__ */ jsx("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
              /* @__PURE__ */ jsx("circle", { cx: "12", cy: "7", r: "4" })
            ] }) }),
            /* @__PURE__ */ jsx("div", { style: { fontWeight: "600", color: "#1e293b", marginBottom: "4px" }, children: t(lang, "common.welcome") }),
            /* @__PURE__ */ jsx("div", { style: { fontSize: "13px", color: "#64748b" }, children: t(lang, "common.signInForBestExperience") })
          ] }),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/checkout/",
              style: {
                display: "block",
                padding: "12px 16px",
                background: "linear-gradient(135deg, #0077b6, #023e8a)",
                color: "white",
                textDecoration: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                textAlign: "center",
                marginBottom: "8px"
              },
              children: t(lang, "common.signIn")
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/checkout/",
              style: {
                display: "block",
                padding: "12px 16px",
                background: "#f8fafc",
                color: "#1e293b",
                textDecoration: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                textAlign: "center",
                border: "1px solid #e2e8f0"
              },
              children: t(lang, "common.createAccount")
            }
          ),
          /* @__PURE__ */ jsxs("div", { style: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "16px 0 8px",
            marginTop: "8px"
          }, children: [
            /* @__PURE__ */ jsx("div", { style: { flex: 1, height: "1px", background: "#e2e8f0" } }),
            /* @__PURE__ */ jsx("span", { style: { fontSize: "12px", color: "#94a3b8" }, children: t(lang, "common.or") }),
            /* @__PURE__ */ jsx("div", { style: { flex: 1, height: "1px", background: "#e2e8f0" } })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "8px" }, children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: async () => {
                  await loginWithGoogle();
                  window.location.href = "/account/dashboard/";
                },
                style: {
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "10px",
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "#374151"
                },
                children: [
                  /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", children: [
                    /* @__PURE__ */ jsx("path", { fill: "#4285F4", d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }),
                    /* @__PURE__ */ jsx("path", { fill: "#34A853", d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }),
                    /* @__PURE__ */ jsx("path", { fill: "#FBBC05", d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }),
                    /* @__PURE__ */ jsx("path", { fill: "#EA4335", d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" })
                  ] }),
                  "Google"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: async () => {
                  await loginWithFacebook();
                  window.location.href = "/account/dashboard/";
                },
                style: {
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  padding: "10px",
                  background: "#1877f2",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: "white"
                },
                children: [
                  /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "white", children: /* @__PURE__ */ jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }) }),
                  "Facebook"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("style", { children: `
        .account-btn:hover {
          background: rgba(0, 119, 182, 0.08) !important;
        }
        .dropdown-link:hover {
          background: #f8fafc !important;
        }
        .logout-link:hover {
          background: #fef2f2 !important;
        }
      ` })
      ]
    }
  );
}

function SearchBar({ lang = "en" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setQuery("");
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    const searchProducts = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data.results || []);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    const debounce = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounce);
  }, [query]);
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
      setQuery("");
      setResults([]);
    }
  };
  return /* @__PURE__ */ jsx("div", { ref: containerRef, className: "position-relative", children: !isOpen ? /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => setIsOpen(true),
      className: "btn btn-link text-dark p-0",
      style: { textDecoration: "none" },
      "aria-label": t(lang, "common.searchLabel"),
      children: /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
        /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
        /* @__PURE__ */ jsx("path", { d: "m21 21-4.3-4.3" })
      ] })
    }
  ) : /* @__PURE__ */ jsxs("div", { className: "search-container", style: { minWidth: "280px" }, children: [
    /* @__PURE__ */ jsxs("div", { className: "input-group", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          ref: inputRef,
          type: "text",
          className: "form-control form-control-sm",
          placeholder: t(lang, "nav.search"),
          value: query,
          onChange: (e) => setQuery(e.target.value),
          onKeyDown: handleKeyDown,
          style: {
            borderRadius: "20px 0 0 20px",
            paddingLeft: "15px"
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "input-group-append", children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "btn btn-sm btn-light",
          type: "button",
          onClick: () => {
            setIsOpen(false);
            setQuery("");
            setResults([]);
          },
          style: { borderRadius: "0 20px 20px 0" },
          children: /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { d: "M18 6 6 18" }),
            /* @__PURE__ */ jsx("path", { d: "m6 6 12 12" })
          ] })
        }
      ) })
    ] }),
    (results.length > 0 || isLoading) && /* @__PURE__ */ jsx(
      "div",
      {
        className: "search-results bg-white shadow rounded mt-2",
        style: {
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          zIndex: 1e3,
          maxHeight: "300px",
          overflowY: "auto"
        },
        children: isLoading ? /* @__PURE__ */ jsx("div", { className: "p-3 text-center text-muted", children: /* @__PURE__ */ jsx("small", { children: t(lang, "common.searching") }) }) : results.map((result) => /* @__PURE__ */ jsxs(
          "a",
          {
            href: result.slug,
            className: "d-flex align-items-center p-2 px-3 text-dark border-bottom search-result-item",
            style: { textDecoration: "none", gap: "10px" },
            onClick: () => {
              setIsOpen(false);
              setQuery("");
              setResults([]);
            },
            children: [
              /* @__PURE__ */ jsxs("div", { style: {
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: result.type === "product" ? "#0077b6" : result.type === "blog" ? "#059669" : "#6366f1",
                color: "white",
                flexShrink: 0
              }, children: [
                result.type === "product" && /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
                  /* @__PURE__ */ jsx("path", { d: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" }),
                  /* @__PURE__ */ jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
                  /* @__PURE__ */ jsx("path", { d: "M16 10a4 4 0 0 1-8 0" })
                ] }),
                result.type === "blog" && /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
                  /* @__PURE__ */ jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
                  /* @__PURE__ */ jsx("polyline", { points: "14 2 14 8 20 8" }),
                  /* @__PURE__ */ jsx("line", { x1: "16", y1: "13", x2: "8", y2: "13" }),
                  /* @__PURE__ */ jsx("line", { x1: "16", y1: "17", x2: "8", y2: "17" })
                ] }),
                result.type === "page" && /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
                  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
                  /* @__PURE__ */ jsx("line", { x1: "12", y1: "16", x2: "12", y2: "12" }),
                  /* @__PURE__ */ jsx("line", { x1: "12", y1: "8", x2: "12.01", y2: "8" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { style: { overflow: "hidden" }, children: [
                /* @__PURE__ */ jsx("div", { style: { fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: result.title }),
                /* @__PURE__ */ jsx("small", { className: "text-muted", style: { textTransform: "capitalize" }, children: result.category })
              ] })
            ]
          },
          result.id
        ))
      }
    ),
    query.length >= 2 && !isLoading && results.length === 0 && /* @__PURE__ */ jsx(
      "div",
      {
        className: "search-results bg-white shadow rounded mt-2 p-3",
        style: {
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          zIndex: 1e3
        },
        children: /* @__PURE__ */ jsx("div", { className: "text-center text-muted", children: /* @__PURE__ */ jsx("small", { children: t(lang, "common.noResultsFound").replace("{query}", query) }) })
      }
    )
  ] }) });
}

const FlagIcon = ({ lang }) => {
  switch (lang) {
    case "en":
      return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 640 480", className: "w-full h-full object-cover", children: [
        /* @__PURE__ */ jsx("path", { fill: "#012169", d: "M0 0h640v480H0z" }),
        /* @__PURE__ */ jsx("path", { fill: "#FFF", d: "m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z" }),
        /* @__PURE__ */ jsx("path", { fill: "#C8102E", d: "m424 281 216 159v40L369 281h55zm-184 20 6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176-26 35L0 47V0z" }),
        /* @__PURE__ */ jsx("path", { fill: "#FFF", d: "M241 0v480h160V0H241zM0 160v160h640V160H0z" }),
        /* @__PURE__ */ jsx("path", { fill: "#C8102E", d: "M0 193v96h640v-96H0zM273 0v480h96V0h-96z" })
      ] });
    case "nl":
      return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 640 480", className: "w-full h-full object-cover", children: [
        /* @__PURE__ */ jsx("path", { fill: "#21468B", d: "M0 0h640v480H0z" }),
        /* @__PURE__ */ jsx("path", { fill: "#FFF", d: "M0 0h640v320H0z" }),
        /* @__PURE__ */ jsx("path", { fill: "#AE1C28", d: "M0 0h640v160H0z" })
      ] });
    case "de":
      return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 640 480", className: "w-full h-full object-cover", children: [
        /* @__PURE__ */ jsx("path", { fill: "#FFCE00", d: "M0 0h640v480H0z" }),
        /* @__PURE__ */ jsx("path", { fill: "#000", d: "M0 0h640v160H0z" }),
        /* @__PURE__ */ jsx("path", { fill: "#DD0000", d: "M0 160h640v160H0z" })
      ] });
    case "fr":
      return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 640 480", className: "w-full h-full object-cover", children: [
        /* @__PURE__ */ jsx("path", { fill: "#EF4135", d: "M0 0h640v480H0z" }),
        /* @__PURE__ */ jsx("path", { fill: "#FFF", d: "M0 0h427v480H0z" }),
        /* @__PURE__ */ jsx("path", { fill: "#0055A4", d: "M0 0h213v480H0z" })
      ] });
    case "es":
      return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 640 480", className: "w-full h-full object-cover", children: [
        /* @__PURE__ */ jsx("path", { fill: "#AA151B", d: "M0 0h640v480H0z" }),
        /* @__PURE__ */ jsx("path", { fill: "#F1BF00", d: "M0 120h640v240H0z" })
      ] });
    case "it":
      return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 640 480", className: "w-full h-full object-cover", children: [
        /* @__PURE__ */ jsx("path", { fill: "#CE2B37", d: "M0 0h640v480H0z" }),
        /* @__PURE__ */ jsx("path", { fill: "#FFF", d: "M0 0h427v480H0z" }),
        /* @__PURE__ */ jsx("path", { fill: "#009246", d: "M0 0h213v480H0z" })
      ] });
    default:
      return null;
  }
};
function LanguageSwitcher({ currentLang = "en" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLanguageChange = (lang) => {
    setIsOpen(false);
    const currentPathWithQuery = window.location.pathname + window.location.search;
    const newPath = getLocalizedPath(currentPathWithQuery, lang);
    window.location.href = newPath;
  };
  const getLanguageName = (code) => {
    return languages[code] || code.toUpperCase();
  };
  return /* @__PURE__ */ jsxs("div", { className: "relative font-sans text-left", ref: dropdownRef, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        "aria-label": "Select language",
        "aria-expanded": isOpen,
        className: `group flex items-center gap-2 pl-2 pr-3 py-2 rounded-full border transition-all duration-300 ease-out
          ${isOpen ? "bg-white border-blue-200 shadow-md ring-2 ring-blue-100/50" : "bg-white/80 border-slate-200 hover:border-blue-200 hover:bg-white hover:shadow-sm"}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: "relative w-6 h-6 rounded-full overflow-hidden shadow-sm shrink-0 ring-1 ring-slate-100 group-hover:ring-slate-200 transition-shadow", children: /* @__PURE__ */ jsx(FlagIcon, { lang: currentLang }) }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-slate-700 tracking-wide uppercase", children: currentLang }),
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              className: `text-slate-400 group-hover:text-blue-500 transition-all duration-300 ${isOpen ? "rotate-180 text-blue-500" : ""}`,
              children: /* @__PURE__ */ jsx("path", { d: "m6 9 6 6 6-6" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `absolute top-[calc(100%+8px)] right-0 w-64 p-2 
          bg-white/95 backdrop-blur-xl border border-white/20
          rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] 
          origin-top-right transition-all duration-200 ease-out z-50
          ${isOpen ? "opacity-100 scale-100 translate-y-0 visible" : "opacity-0 scale-95 -translate-y-2 invisible pointer-events-none"}`,
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsx("div", { className: "px-3 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider", children: "Select Language" }),
          Object.keys(languages).map((lang) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => handleLanguageChange(lang),
              className: `flex items-center gap-3 w-full p-2.5 rounded-xl text-left transition-all duration-200 group relative overflow-hidden
                ${lang === currentLang ? "bg-blue-50 text-blue-700 font-medium ring-1 ring-blue-100" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`,
              children: [
                /* @__PURE__ */ jsx("div", { className: `w-8 h-6 rounded overflow-hidden shadow-sm relative shrink-0 transition-transform duration-300 group-hover:scale-105
                 ${lang === currentLang ? "ring-2 ring-white" : "ring-1 ring-slate-100 opacity-80 group-hover:opacity-100"}`, children: /* @__PURE__ */ jsx(FlagIcon, { lang }) }),
                /* @__PURE__ */ jsx("span", { className: "flex-1 relative z-10", children: getLanguageName(lang) }),
                lang === currentLang && /* @__PURE__ */ jsx("div", { className: "w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    width: "12",
                    height: "12",
                    viewBox: "0 0 12 12",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    className: "text-blue-600",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        d: "M10 3L4.5 8.5L2 6",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }
                    )
                  }
                ) })
              ]
            },
            lang
          ))
        ] })
      }
    )
  ] });
}

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$Astro$3 = createAstro("https://peptide-shop.net");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Header;
  const currentLang = getLangFromUrl(Astro2.url);
  return renderTemplate(_a$2 || (_a$2 = __template$2(["<!-- Top Announcement Bar -->", '<div class="top-bar" data-astro-cid-3ef6ksr2> <div class="container-fluid px-4" data-astro-cid-3ef6ksr2> <div class="top-bar-content" data-astro-cid-3ef6ksr2> <div class="top-bar-left" data-astro-cid-3ef6ksr2> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" data-astro-cid-3ef6ksr2> <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" data-astro-cid-3ef6ksr2></path> </svg> <span data-astro-cid-3ef6ksr2>+44 123 456 7890</span> </div> <div class="top-bar-center" data-astro-cid-3ef6ksr2> <span data-astro-cid-3ef6ksr2>\u2713 ', " | ", '</span> </div> <div class="top-bar-right" data-astro-cid-3ef6ksr2> <span data-astro-cid-3ef6ksr2>\u2709 info@peptide-shop.net | Telegram: @peptideshop</span> </div> </div> </div> </div> <!-- Main Navigation Bar --> <nav class="main-nav" id="navbar" data-astro-cid-3ef6ksr2> <div class="container-fluid px-4" data-astro-cid-3ef6ksr2> <div class="nav-wrapper" data-astro-cid-3ef6ksr2> <!-- Logo --> <a class="nav-logo"', ' data-astro-cid-3ef6ksr2> <div class="logo-icon" data-astro-cid-3ef6ksr2> <img src="/favicon.png" alt="Peptide Shop" width="32" height="32" data-astro-cid-3ef6ksr2> </div> <span class="logo-text" data-astro-cid-3ef6ksr2>Peptide<span class="logo-highlight" data-astro-cid-3ef6ksr2>Shop</span></span> </a> <!-- Right Actions - Only Cart visible on mobile, others in menu --> <div class="nav-actions" data-astro-cid-3ef6ksr2> <!-- Search - Hidden on mobile, shown in menu --> <div class="desktop-only-action" data-astro-cid-3ef6ksr2> ', ' </div> <!-- Language Switcher - Hidden on mobile, shown in menu --> <div class="desktop-only-action" data-astro-cid-3ef6ksr2> ', ' </div> <!-- Account - Hidden on mobile, shown in menu --> <div class="desktop-only-action" data-astro-cid-3ef6ksr2> ', ' </div> <!-- Cart with Count - Always visible --> <div class="cart-wrapper" data-astro-cid-3ef6ksr2> ', ' </div> </div> <!-- Mobile Toggle - Clean hamburger --> <button class="mobile-toggle" type="button" aria-label="Toggle navigation" data-astro-cid-3ef6ksr2> <span class="hamburger-line" data-astro-cid-3ef6ksr2></span> <span class="hamburger-line" data-astro-cid-3ef6ksr2></span> <span class="hamburger-line" data-astro-cid-3ef6ksr2></span> </button> <!-- Mobile Menu - Full-screen slide-out --> <div class="mobile-menu" data-astro-cid-3ef6ksr2> <div class="mobile-menu-header" data-astro-cid-3ef6ksr2> <span class="mobile-menu-title" data-astro-cid-3ef6ksr2>Menu</span> <button class="mobile-menu-close" type="button" aria-label="Close menu" data-astro-cid-3ef6ksr2> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-3ef6ksr2> <line x1="18" y1="6" x2="6" y2="18" data-astro-cid-3ef6ksr2></line> <line x1="6" y1="6" x2="18" y2="18" data-astro-cid-3ef6ksr2></line> </svg> </button> </div> <!-- Search in mobile menu --> <div class="mobile-menu-search" data-astro-cid-3ef6ksr2> ', ' </div> <!-- Navigation Links --> <ul class="nav-links" data-astro-cid-3ef6ksr2> <li class="nav-item dropdown" data-astro-cid-3ef6ksr2> <a class="nav-link"', ' data-astro-cid-3ef6ksr2> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-3ef6ksr2> <rect x="3" y="3" width="7" height="7" data-astro-cid-3ef6ksr2></rect> <rect x="14" y="3" width="7" height="7" data-astro-cid-3ef6ksr2></rect> <rect x="14" y="14" width="7" height="7" data-astro-cid-3ef6ksr2></rect> <rect x="3" y="14" width="7" height="7" data-astro-cid-3ef6ksr2></rect> </svg> <span data-astro-cid-3ef6ksr2>', '</span> <svg class="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-3ef6ksr2> <polyline points="6 9 12 15 18 9" data-astro-cid-3ef6ksr2></polyline> </svg> </a> <ul class="dropdown-menu" data-astro-cid-3ef6ksr2> <li data-astro-cid-3ef6ksr2><a class="dropdown-item"', " data-astro-cid-3ef6ksr2>", '</a></li> <li data-astro-cid-3ef6ksr2><a class="dropdown-item"', " data-astro-cid-3ef6ksr2>", '</a></li> <li data-astro-cid-3ef6ksr2><a class="dropdown-item"', " data-astro-cid-3ef6ksr2>", '</a></li> <li data-astro-cid-3ef6ksr2><a class="dropdown-item"', " data-astro-cid-3ef6ksr2>", '</a></li> <li data-astro-cid-3ef6ksr2><a class="dropdown-item"', " data-astro-cid-3ef6ksr2>", '</a></li> <li data-astro-cid-3ef6ksr2><a class="dropdown-item"', " data-astro-cid-3ef6ksr2>", '</a></li> </ul> </li> <li class="nav-item" data-astro-cid-3ef6ksr2> <a class="nav-link"', ' data-astro-cid-3ef6ksr2> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-3ef6ksr2> <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-astro-cid-3ef6ksr2></path> <polyline points="14 2 14 8 20 8" data-astro-cid-3ef6ksr2></polyline> <line x1="16" y1="13" x2="8" y2="13" data-astro-cid-3ef6ksr2></line> <line x1="16" y1="17" x2="8" y2="17" data-astro-cid-3ef6ksr2></line> </svg> <span data-astro-cid-3ef6ksr2>', '</span> </a> </li> <li class="nav-item" data-astro-cid-3ef6ksr2> <a class="nav-link"', ' data-astro-cid-3ef6ksr2> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-3ef6ksr2> <circle cx="12" cy="12" r="10" data-astro-cid-3ef6ksr2></circle> <line x1="12" y1="16" x2="12" y2="12" data-astro-cid-3ef6ksr2></line> <line x1="12" y1="8" x2="12.01" y2="8" data-astro-cid-3ef6ksr2></line> </svg> <span data-astro-cid-3ef6ksr2>', '</span> </a> </li> <li class="nav-item" data-astro-cid-3ef6ksr2> <a class="nav-link"', ' data-astro-cid-3ef6ksr2> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-3ef6ksr2> <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-astro-cid-3ef6ksr2></path> </svg> <span data-astro-cid-3ef6ksr2>', '</span> </a> </li> <li class="nav-item" data-astro-cid-3ef6ksr2> <a class="nav-link"', ' data-astro-cid-3ef6ksr2> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-3ef6ksr2> <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" data-astro-cid-3ef6ksr2></path> </svg> <span data-astro-cid-3ef6ksr2>', '</span> </a> </li> </ul> <!-- Mobile Menu Footer Actions --> <div class="mobile-menu-footer" data-astro-cid-3ef6ksr2> <!-- Account Button --> <div class="mobile-menu-action" data-astro-cid-3ef6ksr2> ', ' <span class="action-label-text" data-astro-cid-3ef6ksr2>', '</span> </div> <!-- Language Switcher --> <div class="mobile-menu-action mobile-lang-switch" data-astro-cid-3ef6ksr2> ', ' </div> </div> </div> <!-- Mobile Menu Overlay --> <div class="mobile-menu-overlay" data-astro-cid-3ef6ksr2></div> </div> </div> </nav> <!-- Cart Modal - React Component --> ', " <!-- Cart Notification - React Component --> ", "  <script>\n	// Enterprise-grade mobile menu with smooth animations\n	document.addEventListener('DOMContentLoaded', function() {\n		const toggle = document.querySelector('.mobile-toggle');\n		const mobileMenu = document.querySelector('.mobile-menu');\n		const mobileMenuClose = document.querySelector('.mobile-menu-close');\n		const overlay = document.querySelector('.mobile-menu-overlay');\n		const body = document.body;\n		const dropdowns = document.querySelectorAll('.nav-item.dropdown');\n		\n		let scrollPosition = 0;\n\n		function openMenu() {\n			scrollPosition = window.pageYOffset;\n			body.style.top = `-${scrollPosition}px`;\n			mobileMenu?.classList.add('open');\n			overlay?.classList.add('active');\n			toggle?.classList.add('active');\n			body.classList.add('menu-open');\n		}\n\n		function closeMenu() {\n			mobileMenu?.classList.remove('open');\n			overlay?.classList.remove('active');\n			toggle?.classList.remove('active');\n			body.classList.remove('menu-open');\n			body.style.top = '';\n			window.scrollTo(0, scrollPosition);\n		}\n\n		// Toggle button click\n		toggle?.addEventListener('click', function() {\n			if (mobileMenu?.classList.contains('open')) {\n				closeMenu();\n			} else {\n				openMenu();\n			}\n		});\n\n		// Close button click\n		mobileMenuClose?.addEventListener('click', closeMenu);\n\n		// Overlay click\n		overlay?.addEventListener('click', closeMenu);\n\n		// Close menu when clicking nav links\n		mobileMenu?.querySelectorAll('a:not(.dropdown > .nav-link)').forEach(link => {\n			link.addEventListener('click', function() {\n				if (window.innerWidth < 992) {\n					closeMenu();\n				}\n			});\n		});\n\n		// Mobile dropdown accordion\n		dropdowns.forEach(dropdown => {\n			const link = dropdown.querySelector('.nav-link');\n			if (link) {\n				link.addEventListener('click', function(e) {\n					if (window.innerWidth < 992) {\n						e.preventDefault();\n						dropdowns.forEach(d => {\n							if (d !== dropdown) d.classList.remove('open');\n						});\n						dropdown.classList.toggle('open');\n					}\n				});\n			}\n		});\n\n		// Close on resize to desktop\n		window.addEventListener('resize', function() {\n			if (window.innerWidth >= 992) {\n				closeMenu();\n				dropdowns.forEach(d => d.classList.remove('open'));\n			}\n		});\n\n		// Escape key handler\n		document.addEventListener('keydown', function(e) {\n			if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {\n				closeMenu();\n			}\n		});\n	});\n<\/script>"], ["<!-- Top Announcement Bar -->", '<div class="top-bar" data-astro-cid-3ef6ksr2> <div class="container-fluid px-4" data-astro-cid-3ef6ksr2> <div class="top-bar-content" data-astro-cid-3ef6ksr2> <div class="top-bar-left" data-astro-cid-3ef6ksr2> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" data-astro-cid-3ef6ksr2> <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" data-astro-cid-3ef6ksr2></path> </svg> <span data-astro-cid-3ef6ksr2>+44 123 456 7890</span> </div> <div class="top-bar-center" data-astro-cid-3ef6ksr2> <span data-astro-cid-3ef6ksr2>\u2713 ', " | ", '</span> </div> <div class="top-bar-right" data-astro-cid-3ef6ksr2> <span data-astro-cid-3ef6ksr2>\u2709 info@peptide-shop.net | Telegram: @peptideshop</span> </div> </div> </div> </div> <!-- Main Navigation Bar --> <nav class="main-nav" id="navbar" data-astro-cid-3ef6ksr2> <div class="container-fluid px-4" data-astro-cid-3ef6ksr2> <div class="nav-wrapper" data-astro-cid-3ef6ksr2> <!-- Logo --> <a class="nav-logo"', ' data-astro-cid-3ef6ksr2> <div class="logo-icon" data-astro-cid-3ef6ksr2> <img src="/favicon.png" alt="Peptide Shop" width="32" height="32" data-astro-cid-3ef6ksr2> </div> <span class="logo-text" data-astro-cid-3ef6ksr2>Peptide<span class="logo-highlight" data-astro-cid-3ef6ksr2>Shop</span></span> </a> <!-- Right Actions - Only Cart visible on mobile, others in menu --> <div class="nav-actions" data-astro-cid-3ef6ksr2> <!-- Search - Hidden on mobile, shown in menu --> <div class="desktop-only-action" data-astro-cid-3ef6ksr2> ', ' </div> <!-- Language Switcher - Hidden on mobile, shown in menu --> <div class="desktop-only-action" data-astro-cid-3ef6ksr2> ', ' </div> <!-- Account - Hidden on mobile, shown in menu --> <div class="desktop-only-action" data-astro-cid-3ef6ksr2> ', ' </div> <!-- Cart with Count - Always visible --> <div class="cart-wrapper" data-astro-cid-3ef6ksr2> ', ' </div> </div> <!-- Mobile Toggle - Clean hamburger --> <button class="mobile-toggle" type="button" aria-label="Toggle navigation" data-astro-cid-3ef6ksr2> <span class="hamburger-line" data-astro-cid-3ef6ksr2></span> <span class="hamburger-line" data-astro-cid-3ef6ksr2></span> <span class="hamburger-line" data-astro-cid-3ef6ksr2></span> </button> <!-- Mobile Menu - Full-screen slide-out --> <div class="mobile-menu" data-astro-cid-3ef6ksr2> <div class="mobile-menu-header" data-astro-cid-3ef6ksr2> <span class="mobile-menu-title" data-astro-cid-3ef6ksr2>Menu</span> <button class="mobile-menu-close" type="button" aria-label="Close menu" data-astro-cid-3ef6ksr2> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-3ef6ksr2> <line x1="18" y1="6" x2="6" y2="18" data-astro-cid-3ef6ksr2></line> <line x1="6" y1="6" x2="18" y2="18" data-astro-cid-3ef6ksr2></line> </svg> </button> </div> <!-- Search in mobile menu --> <div class="mobile-menu-search" data-astro-cid-3ef6ksr2> ', ' </div> <!-- Navigation Links --> <ul class="nav-links" data-astro-cid-3ef6ksr2> <li class="nav-item dropdown" data-astro-cid-3ef6ksr2> <a class="nav-link"', ' data-astro-cid-3ef6ksr2> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-3ef6ksr2> <rect x="3" y="3" width="7" height="7" data-astro-cid-3ef6ksr2></rect> <rect x="14" y="3" width="7" height="7" data-astro-cid-3ef6ksr2></rect> <rect x="14" y="14" width="7" height="7" data-astro-cid-3ef6ksr2></rect> <rect x="3" y="14" width="7" height="7" data-astro-cid-3ef6ksr2></rect> </svg> <span data-astro-cid-3ef6ksr2>', '</span> <svg class="dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-3ef6ksr2> <polyline points="6 9 12 15 18 9" data-astro-cid-3ef6ksr2></polyline> </svg> </a> <ul class="dropdown-menu" data-astro-cid-3ef6ksr2> <li data-astro-cid-3ef6ksr2><a class="dropdown-item"', " data-astro-cid-3ef6ksr2>", '</a></li> <li data-astro-cid-3ef6ksr2><a class="dropdown-item"', " data-astro-cid-3ef6ksr2>", '</a></li> <li data-astro-cid-3ef6ksr2><a class="dropdown-item"', " data-astro-cid-3ef6ksr2>", '</a></li> <li data-astro-cid-3ef6ksr2><a class="dropdown-item"', " data-astro-cid-3ef6ksr2>", '</a></li> <li data-astro-cid-3ef6ksr2><a class="dropdown-item"', " data-astro-cid-3ef6ksr2>", '</a></li> <li data-astro-cid-3ef6ksr2><a class="dropdown-item"', " data-astro-cid-3ef6ksr2>", '</a></li> </ul> </li> <li class="nav-item" data-astro-cid-3ef6ksr2> <a class="nav-link"', ' data-astro-cid-3ef6ksr2> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-3ef6ksr2> <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-astro-cid-3ef6ksr2></path> <polyline points="14 2 14 8 20 8" data-astro-cid-3ef6ksr2></polyline> <line x1="16" y1="13" x2="8" y2="13" data-astro-cid-3ef6ksr2></line> <line x1="16" y1="17" x2="8" y2="17" data-astro-cid-3ef6ksr2></line> </svg> <span data-astro-cid-3ef6ksr2>', '</span> </a> </li> <li class="nav-item" data-astro-cid-3ef6ksr2> <a class="nav-link"', ' data-astro-cid-3ef6ksr2> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-3ef6ksr2> <circle cx="12" cy="12" r="10" data-astro-cid-3ef6ksr2></circle> <line x1="12" y1="16" x2="12" y2="12" data-astro-cid-3ef6ksr2></line> <line x1="12" y1="8" x2="12.01" y2="8" data-astro-cid-3ef6ksr2></line> </svg> <span data-astro-cid-3ef6ksr2>', '</span> </a> </li> <li class="nav-item" data-astro-cid-3ef6ksr2> <a class="nav-link"', ' data-astro-cid-3ef6ksr2> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-3ef6ksr2> <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-astro-cid-3ef6ksr2></path> </svg> <span data-astro-cid-3ef6ksr2>', '</span> </a> </li> <li class="nav-item" data-astro-cid-3ef6ksr2> <a class="nav-link"', ' data-astro-cid-3ef6ksr2> <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-3ef6ksr2> <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" data-astro-cid-3ef6ksr2></path> </svg> <span data-astro-cid-3ef6ksr2>', '</span> </a> </li> </ul> <!-- Mobile Menu Footer Actions --> <div class="mobile-menu-footer" data-astro-cid-3ef6ksr2> <!-- Account Button --> <div class="mobile-menu-action" data-astro-cid-3ef6ksr2> ', ' <span class="action-label-text" data-astro-cid-3ef6ksr2>', '</span> </div> <!-- Language Switcher --> <div class="mobile-menu-action mobile-lang-switch" data-astro-cid-3ef6ksr2> ', ' </div> </div> </div> <!-- Mobile Menu Overlay --> <div class="mobile-menu-overlay" data-astro-cid-3ef6ksr2></div> </div> </div> </nav> <!-- Cart Modal - React Component --> ', " <!-- Cart Notification - React Component --> ", "  <script>\n	// Enterprise-grade mobile menu with smooth animations\n	document.addEventListener('DOMContentLoaded', function() {\n		const toggle = document.querySelector('.mobile-toggle');\n		const mobileMenu = document.querySelector('.mobile-menu');\n		const mobileMenuClose = document.querySelector('.mobile-menu-close');\n		const overlay = document.querySelector('.mobile-menu-overlay');\n		const body = document.body;\n		const dropdowns = document.querySelectorAll('.nav-item.dropdown');\n		\n		let scrollPosition = 0;\n\n		function openMenu() {\n			scrollPosition = window.pageYOffset;\n			body.style.top = \\`-\\${scrollPosition}px\\`;\n			mobileMenu?.classList.add('open');\n			overlay?.classList.add('active');\n			toggle?.classList.add('active');\n			body.classList.add('menu-open');\n		}\n\n		function closeMenu() {\n			mobileMenu?.classList.remove('open');\n			overlay?.classList.remove('active');\n			toggle?.classList.remove('active');\n			body.classList.remove('menu-open');\n			body.style.top = '';\n			window.scrollTo(0, scrollPosition);\n		}\n\n		// Toggle button click\n		toggle?.addEventListener('click', function() {\n			if (mobileMenu?.classList.contains('open')) {\n				closeMenu();\n			} else {\n				openMenu();\n			}\n		});\n\n		// Close button click\n		mobileMenuClose?.addEventListener('click', closeMenu);\n\n		// Overlay click\n		overlay?.addEventListener('click', closeMenu);\n\n		// Close menu when clicking nav links\n		mobileMenu?.querySelectorAll('a:not(.dropdown > .nav-link)').forEach(link => {\n			link.addEventListener('click', function() {\n				if (window.innerWidth < 992) {\n					closeMenu();\n				}\n			});\n		});\n\n		// Mobile dropdown accordion\n		dropdowns.forEach(dropdown => {\n			const link = dropdown.querySelector('.nav-link');\n			if (link) {\n				link.addEventListener('click', function(e) {\n					if (window.innerWidth < 992) {\n						e.preventDefault();\n						dropdowns.forEach(d => {\n							if (d !== dropdown) d.classList.remove('open');\n						});\n						dropdown.classList.toggle('open');\n					}\n				});\n			}\n		});\n\n		// Close on resize to desktop\n		window.addEventListener('resize', function() {\n			if (window.innerWidth >= 992) {\n				closeMenu();\n				dropdowns.forEach(d => d.classList.remove('open'));\n			}\n		});\n\n		// Escape key handler\n		document.addEventListener('keydown', function(e) {\n			if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {\n				closeMenu();\n			}\n		});\n	});\n<\/script>"])), maybeRenderHead(), t(currentLang, "home.heroBadge"), t(currentLang, "home.stats.purityGuarantee"), addAttribute(getLocalizedPath("/", currentLang), "href"), renderComponent($$result, "SearchBar", SearchBar, { "client:load": true, "lang": currentLang, "client:component-hydration": "load", "client:component-path": "/home/ivan/peptide/astro-peptide/src/components/SearchBar", "client:component-export": "default", "data-astro-cid-3ef6ksr2": true }), renderComponent($$result, "LanguageSwitcher", LanguageSwitcher, { "client:load": true, "currentLang": currentLang, "client:component-hydration": "load", "client:component-path": "/home/ivan/peptide/astro-peptide/src/components/LanguageSwitcher", "client:component-export": "default", "data-astro-cid-3ef6ksr2": true }), renderComponent($$result, "AccountButton", AccountButton, { "client:load": true, "lang": currentLang, "client:component-hydration": "load", "client:component-path": "/home/ivan/peptide/astro-peptide/src/components/AccountButton", "client:component-export": "default", "data-astro-cid-3ef6ksr2": true }), renderComponent($$result, "CartIcon", CartIcon, { "client:load": true, "lang": currentLang, "client:component-hydration": "load", "client:component-path": "/home/ivan/peptide/astro-peptide/src/components/CartIcon", "client:component-export": "default", "data-astro-cid-3ef6ksr2": true }), renderComponent($$result, "SearchBar", SearchBar, { "client:load": true, "lang": currentLang, "client:component-hydration": "load", "client:component-path": "/home/ivan/peptide/astro-peptide/src/components/SearchBar", "client:component-export": "default", "data-astro-cid-3ef6ksr2": true }), addAttribute(getLocalizedPath("/peptides/", currentLang), "href"), t(currentLang, "nav.categories"), addAttribute(getLocalizedPath("/peptides/", currentLang), "href"), t(currentLang, "nav.allPeptides"), addAttribute(getLocalizedPath("/peptides/weight-loss/", currentLang), "href"), t(currentLang, "nav.weightLoss"), addAttribute(getLocalizedPath("/peptides/muscle-recovery/", currentLang), "href"), t(currentLang, "nav.muscleRecovery"), addAttribute(getLocalizedPath("/peptides/growth-hormone/", currentLang), "href"), t(currentLang, "nav.growthHormone"), addAttribute(getLocalizedPath("/peptides/tanning/", currentLang), "href"), t(currentLang, "nav.tanning"), addAttribute(getLocalizedPath("/peptides/cognitive/", currentLang), "href"), t(currentLang, "nav.cognitive"), addAttribute(getLocalizedPath("/blog/", currentLang), "href"), t(currentLang, "nav.blog"), addAttribute(getLocalizedPath("/about/", currentLang), "href"), t(currentLang, "nav.about"), addAttribute(getLocalizedPath("/quality/", currentLang), "href"), t(currentLang, "nav.quality"), addAttribute(getLocalizedPath("/contact/", currentLang), "href"), t(currentLang, "nav.contact"), renderComponent($$result, "AccountButton", AccountButton, { "client:load": true, "lang": currentLang, "client:component-hydration": "load", "client:component-path": "/home/ivan/peptide/astro-peptide/src/components/AccountButton", "client:component-export": "default", "data-astro-cid-3ef6ksr2": true }), t(currentLang, "nav.account"), renderComponent($$result, "LanguageSwitcher", LanguageSwitcher, { "client:load": true, "currentLang": currentLang, "client:component-hydration": "load", "client:component-path": "/home/ivan/peptide/astro-peptide/src/components/LanguageSwitcher", "client:component-export": "default", "data-astro-cid-3ef6ksr2": true }), renderComponent($$result, "CartModal", CartModal, { "client:load": true, "lang": currentLang, "client:component-hydration": "load", "client:component-path": "/home/ivan/peptide/astro-peptide/src/components/CartModal", "client:component-export": "default", "data-astro-cid-3ef6ksr2": true }), renderComponent($$result, "CartNotification", CartNotification, { "client:load": true, "lang": currentLang, "client:component-hydration": "load", "client:component-path": "/home/ivan/peptide/astro-peptide/src/components/CartNotification", "client:component-export": "default", "data-astro-cid-3ef6ksr2": true }));
}, "/home/ivan/peptide/astro-peptide/src/components/Header.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$2 = createAstro("https://peptide-shop.net");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Footer;
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const currentLang = getLangFromUrl(Astro2.url);
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<footer class="site-footer" data-astro-cid-sz7xmlte> <div class="container" data-astro-cid-sz7xmlte> <!-- Mobile: Brand section at top --> <div class="footer-brand-section" data-astro-cid-sz7xmlte> <div class="footer-logo" data-astro-cid-sz7xmlte> <img src="/favicon.png" alt="Peptide Shop" width="36" height="36" style="object-fit: contain;" data-astro-cid-sz7xmlte> <span class="footer-logo-text" data-astro-cid-sz7xmlte>Peptide<span class="highlight" data-astro-cid-sz7xmlte>Shop</span></span> </div> <p class="footer-description" data-astro-cid-sz7xmlte> ', ' </p> <div class="footer-socials" data-astro-cid-sz7xmlte> <a href="mailto:info@peptide-shop.net" class="social-link" aria-label="Email" data-astro-cid-sz7xmlte> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-sz7xmlte> <rect width="20" height="16" x="2" y="4" rx="2" data-astro-cid-sz7xmlte></rect> <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" data-astro-cid-sz7xmlte></path> </svg> </a> <a href="tel:+441234567890" class="social-link" aria-label="Phone" data-astro-cid-sz7xmlte> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-sz7xmlte> <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" data-astro-cid-sz7xmlte></path> </svg> </a> <a href="#" class="social-link" aria-label="Telegram" data-astro-cid-sz7xmlte> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-sz7xmlte> <path d="M21 5L2 12.5l7 1M21 5l-2.5 15L9 13.5M21 5L9 13.5m0 0V19l3.5-3.5" data-astro-cid-sz7xmlte></path> </svg> </a> </div> </div> <!-- Mobile: Collapsible Footer Sections --> <div class="footer-links-grid" data-astro-cid-sz7xmlte> <!-- Products Section --> <div class="footer-section" data-astro-cid-sz7xmlte> <button class="footer-toggle" type="button" aria-expanded="false" data-astro-cid-sz7xmlte> <h4 class="footer-heading" data-astro-cid-sz7xmlte>', '</h4> <svg class="toggle-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-sz7xmlte> <polyline points="6 9 12 15 18 9" data-astro-cid-sz7xmlte></polyline> </svg> </button> <ul class="footer-links" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a', " data-astro-cid-sz7xmlte>", "</a></li> <li data-astro-cid-sz7xmlte><a", " data-astro-cid-sz7xmlte>", "</a></li> <li data-astro-cid-sz7xmlte><a", " data-astro-cid-sz7xmlte>", "</a></li> <li data-astro-cid-sz7xmlte><a", " data-astro-cid-sz7xmlte>", "</a></li> <li data-astro-cid-sz7xmlte><a", " data-astro-cid-sz7xmlte>", '</a></li> </ul> </div> <!-- Company Section --> <div class="footer-section" data-astro-cid-sz7xmlte> <button class="footer-toggle" type="button" aria-expanded="false" data-astro-cid-sz7xmlte> <h4 class="footer-heading" data-astro-cid-sz7xmlte>', '</h4> <svg class="toggle-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-sz7xmlte> <polyline points="6 9 12 15 18 9" data-astro-cid-sz7xmlte></polyline> </svg> </button> <ul class="footer-links" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a', " data-astro-cid-sz7xmlte>", "</a></li> <li data-astro-cid-sz7xmlte><a", " data-astro-cid-sz7xmlte>", "</a></li> <li data-astro-cid-sz7xmlte><a", " data-astro-cid-sz7xmlte>", "</a></li> <li data-astro-cid-sz7xmlte><a", " data-astro-cid-sz7xmlte>", "</a></li> <li data-astro-cid-sz7xmlte><a", " data-astro-cid-sz7xmlte>", '</a></li> </ul> </div> <!-- Legal Section --> <div class="footer-section" data-astro-cid-sz7xmlte> <button class="footer-toggle" type="button" aria-expanded="false" data-astro-cid-sz7xmlte> <h4 class="footer-heading" data-astro-cid-sz7xmlte>', '</h4> <svg class="toggle-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-sz7xmlte> <polyline points="6 9 12 15 18 9" data-astro-cid-sz7xmlte></polyline> </svg> </button> <ul class="footer-links" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a', " data-astro-cid-sz7xmlte>", "</a></li> <li data-astro-cid-sz7xmlte><a", " data-astro-cid-sz7xmlte>", "</a></li> <li data-astro-cid-sz7xmlte><a", " data-astro-cid-sz7xmlte>", "</a></li> <li data-astro-cid-sz7xmlte><a", " data-astro-cid-sz7xmlte>", '</a></li> </ul> </div> <!-- Contact Section --> <div class="footer-section" data-astro-cid-sz7xmlte> <button class="footer-toggle" type="button" aria-expanded="false" data-astro-cid-sz7xmlte> <h4 class="footer-heading" data-astro-cid-sz7xmlte>', '</h4> <svg class="toggle-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-sz7xmlte> <polyline points="6 9 12 15 18 9" data-astro-cid-sz7xmlte></polyline> </svg> </button> <div class="footer-links footer-contact" data-astro-cid-sz7xmlte> <div class="contact-item" data-astro-cid-sz7xmlte> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-sz7xmlte> <rect width="20" height="16" x="2" y="4" rx="2" data-astro-cid-sz7xmlte></rect> <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" data-astro-cid-sz7xmlte></path> </svg> <a href="mailto:info@peptide-shop.net" data-astro-cid-sz7xmlte>info@peptide-shop.net</a> </div> <div class="contact-item" data-astro-cid-sz7xmlte> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-sz7xmlte> <circle cx="12" cy="12" r="10" data-astro-cid-sz7xmlte></circle> <polyline points="12 6 12 12 16 14" data-astro-cid-sz7xmlte></polyline> </svg> <span data-astro-cid-sz7xmlte>', '</span> </div> </div> </div> </div> <!-- Bottom Bar --> <div class="footer-bottom" data-astro-cid-sz7xmlte> <p class="copyright" data-astro-cid-sz7xmlte> ', ' </p> <p class="disclaimer" data-astro-cid-sz7xmlte> ', ".\n</p> </div> </div> </footer>  <script>\n	// Mobile collapsible footer sections\n	document.addEventListener('DOMContentLoaded', function() {\n		const toggles = document.querySelectorAll('.footer-toggle');\n		\n		toggles.forEach(toggle => {\n			toggle.addEventListener('click', function() {\n				// Only work on mobile\n				if (window.innerWidth < 768) {\n					const section = this.closest('.footer-section');\n					const isOpen = section.classList.contains('open');\n					\n					// Close all sections\n					document.querySelectorAll('.footer-section').forEach(s => {\n						s.classList.remove('open');\n					});\n					\n					// Open clicked section if it wasn't open\n					if (!isOpen) {\n						section.classList.add('open');\n					}\n				}\n			});\n		});\n\n		// Reset on resize\n		window.addEventListener('resize', function() {\n			if (window.innerWidth >= 768) {\n				document.querySelectorAll('.footer-section').forEach(s => {\n					s.classList.remove('open');\n				});\n			}\n		});\n	});\n<\/script>"])), maybeRenderHead(), t(currentLang, "home.heroSubtitle"), t(currentLang, "nav.peptides"), addAttribute(getLocalizedPath("/peptides/", currentLang), "href"), t(currentLang, "nav.allPeptides"), addAttribute(getLocalizedPath("/peptides/weight-loss/", currentLang), "href"), t(currentLang, "nav.weightLoss"), addAttribute(getLocalizedPath("/peptides/muscle-recovery/", currentLang), "href"), t(currentLang, "nav.muscleRecovery"), addAttribute(getLocalizedPath("/peptides/growth-hormone/", currentLang), "href"), t(currentLang, "nav.growthHormone"), addAttribute(getLocalizedPath("/peptides/tanning/", currentLang), "href"), t(currentLang, "nav.tanning"), t(currentLang, "footer.aboutUs"), addAttribute(getLocalizedPath("/about/", currentLang), "href"), t(currentLang, "nav.about"), addAttribute(getLocalizedPath("/quality/", currentLang), "href"), t(currentLang, "nav.quality"), addAttribute(getLocalizedPath("/contact/", currentLang), "href"), t(currentLang, "nav.contact"), addAttribute(getLocalizedPath("/faq/", currentLang), "href"), t(currentLang, "product.faq"), addAttribute(getLocalizedPath("/shipping/", currentLang), "href"), t(currentLang, "cart.shipping"), t(currentLang, "footer.legal"), addAttribute(getLocalizedPath("/terms/", currentLang), "href"), t(currentLang, "footer.termsAndConditions"), addAttribute(getLocalizedPath("/privacy/", currentLang), "href"), t(currentLang, "footer.privacyPolicy"), addAttribute(getLocalizedPath("/disclaimer/", currentLang), "href"), t(currentLang, "footer.disclaimer"), addAttribute(getLocalizedPath("/coa-policy/", currentLang), "href"), t(currentLang, "footer.coaPolicy"), t(currentLang, "nav.contact"), t(currentLang, "footer.hoursValue"), t(currentLang, "footer.copyright").replace("{year}", String(currentYear)), t(currentLang, "home.heroSubtitle").split(".")[0]);
}, "/home/ivan/peptide/astro-peptide/src/components/Footer.astro", void 0);

const marketByLang = {
  en: {
    hreflang: "en-GB",
    geoRegion: "GB",
    geoPlacename: "United Kingdom",
    icbm: "51.5074, -0.1278",
    marketName: "UK",
    keywordHint: "buy peptides uk",
    keywords: [
      "peptides for sale uk",
      "buy peptides uk",
      "buy peptides",
      "best peptides for sale uk",
      "peptides for sale online",
      "bpc 157 peptide for sale uk",
      "peptide pens for sale uk",
      "tirzepatide peptide for sale uk",
      "semaglutide peptides uk",
      "research peptides uk"
    ]
  },
  de: {
    hreflang: "de-DE",
    geoRegion: "DE",
    geoPlacename: "Germany",
    icbm: "52.5200, 13.4050",
    marketName: "Germany",
    keywordHint: "peptide kaufen deutschland",
    keywords: [
      "peptide kaufen deutschland",
      "peptide deutschland kaufen",
      "peptide kaufen",
      "bpc 157 peptide kaufen",
      "ghk-cu peptid kaufen",
      "collagen peptides kaufen",
      "peptide online kaufen",
      "forschung peptide kaufen",
      "peptide bodybuilding kaufen",
      "legale peptide kaufen"
    ]
  },
  fr: {
    hreflang: "fr-FR",
    geoRegion: "FR",
    geoPlacename: "France",
    icbm: "48.8566, 2.3522",
    marketName: "France",
    keywordHint: "acheter peptide en france",
    keywords: [
      "acheter peptide",
      "acheter peptides en france",
      "acheter peptide en ligne",
      "acheter peptides collagène",
      "acheter peptide tb 500",
      "acheter peptide sciences",
      "peptides muscu achat",
      "bpc 157 achat",
      "tb 500 achat",
      "acheter peptids"
    ]
  },
  es: {
    hreflang: "es-ES",
    geoRegion: "ES",
    geoPlacename: "Spain",
    icbm: "40.4168, -3.7038",
    marketName: "Spain",
    keywordHint: "comprar peptidos españa",
    keywords: [
      "comprar peptidos",
      "comprar peptidos españa",
      "peptidos donde comprar",
      "péptidos comprar en linea",
      "peptidos culturismo comprar",
      "comprar péptidos",
      "peptidos inyectables comprar",
      "bpc 157 comprar",
      "peptidos precios",
      "tienda peptidos"
    ]
  },
  it: {
    hreflang: "it-IT",
    geoRegion: "IT",
    geoPlacename: "Italy",
    icbm: "41.9028, 12.4964",
    marketName: "Italy",
    keywordHint: "acquistare peptidi italia",
    keywords: [
      "acquistare peptidi",
      "acquistare peptidi online",
      "peptidi acquisto",
      "peptidi dove acquistare",
      "verisol peptidi",
      "acquistare peptide online",
      "peptidi per bodybuilding",
      "comprare peptidi italia",
      "vendita peptidi italia",
      "migliori peptidi"
    ]
  },
  nl: {
    hreflang: "nl-NL",
    geoRegion: "NL",
    geoPlacename: "Netherlands",
    icbm: "52.3676, 4.9041",
    marketName: "Netherlands",
    keywordHint: "peptiden kopen nederland",
    keywords: [
      "peptiden kopen",
      "peptiden nederland",
      "peptiden kopen nederland",
      "peptiden bestellen",
      "bpc 157 kopen",
      "tirzepatide kopen",
      "semaglutide kopen",
      "peptide online kopen",
      "onderzoekspeptiden",
      "peptides nederland"
    ]
  }
};
function getMarket(lang) {
  return marketByLang[lang];
}

const $$Astro$1 = createAstro("https://peptide-shop.net");
const $$SEO = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SEO;
  const { title, description, image, article } = Astro2.props;
  const currentLang = getLangFromUrl(Astro2.url);
  const langProp = Astro2.props.lang ?? currentLang;
  const langForMeta = supportedLanguages.includes(langProp) ? langProp : currentLang;
  const marketForMeta = getMarket(langForMeta);
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const siteUrl = Astro2.site?.origin || "https://peptide-shop.net";
  const metaDescription = description || `Buy peptides ${marketForMeta.marketName} & Europe. Premium research peptides for sale with 99% purity. Fast delivery, COA included. Semaglutide, BPC-157, Tirzepatide & more.`;
  const ogImage = image || "/images/hero-image.webp";
  const languages = supportedLanguages;
  const currentPath = Astro2.url.pathname.replace(/^\/(en|nl|de|fr|es|it)\//, "/");
  const keywords = marketForMeta.keywords ? marketForMeta.keywords.join(", ") : "";
  return renderTemplate`<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/png" href="/favicon.png"><link rel="apple-touch-icon" href="/favicon.png"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="theme-color" content="#0077b6">${keywords && renderTemplate`<meta name="keywords"${addAttribute(keywords, "content")}>`}<!-- Canonical URL --><link rel="canonical"${addAttribute(canonicalURL, "href")}><!-- Hreflang Tags for Internationalization --><link rel="alternate" hreflang="x-default"${addAttribute(`${siteUrl}${currentPath}`, "href")}>${languages.map((langCode) => {
    const hreflang = getMarket(langCode).hreflang;
    const href = langCode === "en" ? `${siteUrl}${currentPath}` : `${siteUrl}/${langCode}${currentPath}`;
    return renderTemplate`<link rel="alternate"${addAttribute(hreflang, "hreflang")}${addAttribute(href, "href")}>`;
  })}<!-- Primary Meta Tags --><title>${title}</title><meta name="title"${addAttribute(title, "content")}><meta name="description"${addAttribute(metaDescription, "content")}><meta name="keywords"${addAttribute(`${marketForMeta.keywordHint}, peptides for sale, buy peptides europe, research peptides, semaglutide, bpc-157, tirzepatide, peptide shop`, "content")}><meta name="author" content="Peptide Shop"><!-- Geo Meta Tags --><meta name="geo.region"${addAttribute(marketForMeta.geoRegion, "content")}><meta name="geo.placename"${addAttribute(marketForMeta.geoPlacename, "content")}>${marketForMeta.icbm && renderTemplate`<meta name="ICBM"${addAttribute(marketForMeta.icbm, "content")}>`}<!-- Open Graph / Facebook --><meta property="og:type"${addAttribute(article ? "article" : "website", "content")}><meta property="og:url"${addAttribute(Astro2.url, "content")}><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(metaDescription, "content")}><meta property="og:image"${addAttribute(new URL(ogImage, siteUrl), "content")}><meta property="og:site_name" content="Peptide Shop"><meta property="og:locale"${addAttribute(marketForMeta.hreflang.replace("-", "_"), "content")}><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"${addAttribute(Astro2.url, "content")}><meta property="twitter:title"${addAttribute(title, "content")}><meta property="twitter:description"${addAttribute(metaDescription, "content")}><meta property="twitter:image"${addAttribute(new URL(ogImage, siteUrl), "content")}><!-- Robots --><meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"><meta name="googlebot" content="index, follow"><meta name="bingbot" content="index, follow">`;
}, "/home/ivan/peptide/astro-peptide/src/components/SEO.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro("https://peptide-shop.net");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description, image, article, breadcrumbs } = Astro2.props;
  const siteUrl = "https://peptide-shop.net";
  const currentLang = getLangFromUrl(Astro2.url);
  const market = getMarket(currentLang);
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`
    }))
  } : null;
  return renderTemplate(_b || (_b = __template(["<html", " data-astro-cid-sckkx6r4> <head>", "", `<!-- Google Fonts - Raleway --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"><!-- Lucide Icons - Premium icon set (pinned version for stability) --><script src="https://unpkg.com/lucide@0.294.0/dist/umd/lucide.min.js" defer><\/script><script>
			document.addEventListener('DOMContentLoaded', function() {
				if (typeof lucide !== 'undefined') {
					lucide.createIcons();
				}
			});
		<\/script><!-- bootstrap.min css --><link rel="stylesheet" href="/plugins/bootstrap/css/bootstrap.min.css"><!-- animate.css --><link rel="stylesheet" href="/plugins/animate-css/animate.css"><!-- Magnify Popup --><link rel="stylesheet" href="/plugins/magnific-popup/dist/magnific-popup.css"><!-- Owl Carousel CSS --><link rel="stylesheet" href="/plugins/slick-carousel/slick/slick.css"><link rel="stylesheet" href="/plugins/slick-carousel/slick/slick-theme.css"><!-- Main Stylesheet --><link rel="stylesheet" href="/css/style.css">`, '</head> <body data-astro-cid-sckkx6r4> <a href="#main-content" class="skip-to-content" data-astro-cid-sckkx6r4>Skip to main content</a> ', ' <div class="main-wrapper" id="main-content" data-astro-cid-sckkx6r4> ', " ", ' </div> <!-- Essential Scripts --> <!-- Main jQuery --> <script src="/plugins/jquery/jquery.js" defer><\/script> <!-- Bootstrap 4.3.1 --> <script src="/plugins/bootstrap/js/bootstrap.min.js" defer><\/script> <!-- Slick Slider --> <script src="/plugins/slick-carousel/slick/slick.min.js" defer><\/script> <!--  Magnific Popup--> <script src="/plugins/magnific-popup/dist/jquery.magnific-popup.min.js" defer><\/script> <!-- Form Validator --> <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.form/3.32/jquery.form.js" defer><\/script> <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.11.1/jquery.validate.min.js" defer><\/script> <!-- Google Map --> <!-- <script is:inline src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBu5nZKbeK-WHQ70oqOWo-_4VmwOwKP9YQ"><\/script> --> <script src="/plugins/google-map/gmap.js" defer><\/script> <script src="/js/script.js" defer><\/script> ', " </body> </html>"])), addAttribute(market.hreflang, "lang"), renderComponent($$result, "SEO", $$SEO, { "title": title, "description": description, "image": image, "article": article, "lang": currentLang, "data-astro-cid-sckkx6r4": true }), breadcrumbSchema && renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JSON.stringify(breadcrumbSchema))), renderHead(), renderComponent($$result, "Header", $$Header, { "data-astro-cid-sckkx6r4": true }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, { "data-astro-cid-sckkx6r4": true }), renderScript($$result, "/home/ivan/peptide/astro-peptide/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts"));
}, "/home/ivan/peptide/astro-peptide/src/layouts/Layout.astro", void 0);

export { $$Layout as $, getLocalizedPath as a, translatePackageSize as b, cleanProductTitle as c, currentCurrency as d, exchangeRate as e, translateCategory as f, getLangFromUrl as g, formatPrice as h, addCartItem as i, translateProductContent as j, getLocalizedPageTitle as k, getLocalizedMetaDescription as l, translateFAQs as m, translateReviews as n, getLocalizedProductSlug as o, pageSlugTranslations as p, productSlugTranslations as q, getMarket as r, supportedLanguages as s, t, translations as u };
