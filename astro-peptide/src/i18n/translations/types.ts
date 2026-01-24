// Translation type definitions
// This file contains the interface for all translation strings

export type SupportedLanguage = 'en' | 'nl' | 'de' | 'fr' | 'es' | 'it';

export const languages: Record<SupportedLanguage, string> = {
  en: 'English',
  nl: 'Nederlands',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  it: 'Italiano',
};

export const supportedLanguages = Object.keys(languages) as SupportedLanguage[];

export const languageFlags: Record<SupportedLanguage, string> = {
  en: '🇬🇧',
  nl: '🇳🇱',
  de: '🇩🇪',
  fr: '🇫🇷',
  es: '🇪🇸',
  it: '🇮🇹',
};

export const defaultLang: SupportedLanguage = 'en';

export interface Translations {
  nav: {
    home: string;
    peptides: string;
    categories: string;
    allPeptides: string;
    weightLoss: string;
    muscleRecovery: string;
    growthHormone: string;
    tanning: string;
    cognitive: string;
    supplies: string;
    blog: string;
    about: string;
    quality: string;
    contact: string;
    cart: string;
    account: string;
    search: string;
    menu: string;
  };
  aboutPage: {
    title: string;
    subtitle: string;
    sections: {
      excellence: string;
      mission: string;
      quality: string;
    };
    content: {
      excellence: string;
      mission: string;
      quality: string;
    };
    features: {
      hplc: string;
      hplcSubtitle: string;
      massSpec: string;
      massSpecSubtitle: string;
      storage: string;
      storageSubtitle: string;
    };
  };
  contactPage: {
    title: string;
    subtitle: string;
    section: {
      sendMessage: string;
    };
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      submit: string;
    };
  };
  shopPage: {
    title: string;
    subtitle: string;
    showing: string;
    sort: {
      featured: string;
      priceLowHigh: string;
      priceHighLow: string;
      nameAZ: string;
    };
  };
  faqPage: {
    title: string;
    categories: {
      general: string;
      quality: string;
      payment: string;
    };
  };
  qualityPage: {
    title: string;
    subtitle: string;
    description: string;
    hplcTitle: string;
    hplcDescription: string;
    purityStandard: string;
    msTitle: string;
    msDescription: string;
    molecularConfirmation: string;
    verified: string;
    coaTitle: string;
    coaDescription: string;
    coaItems: {
      batchNumber: string;
      dateOfAnalysis: string;
      molecularWeight: string;
      hplcChromatogram: string;
      physicalAppearance: string;
      solubilityProfile: string;
    };
    storageTitle: string;
    storageDescription: string;
    storageItems: {
      lyophilizedTitle: string;
      lyophilizedDescription: string;
      lightProtectionTitle: string;
      lightProtectionDescription: string;
      freezeThawTitle: string;
      freezeThawDescription: string;
    };
  };
  shippingPage: {
    title: string;
    subtitle: string;
    description: string;
  };
  termsPage: {
    title: string;
    description: string;
  };
  privacyPage: {
    title: string;
    description: string;
  };
  disclaimerPage: {
    title: string;
    description: string;
  };
  coaPolicyPage: {
    title: string;
    description: string;
  };
  blogPage: {
    title: string;
    description: string;
    readMore: string;
    publishedOn: string;
    byAuthor: string;
    categories: string;
    recentPosts: string;
    searchPosts: string;
    noPosts: string;
    featuredArticles: string;
    latestArticles: string;
    comingSoon: string;
    comingSoonDesc: string;
    aboutBlog: string;
    aboutBlogDesc: string;
    stayUpdated: string;
    stayUpdatedDesc: string;
    subscribe: string;
    emailPlaceholder: string;
    relatedArticles: string;
    shopPeptides: string;
    shopPeptidesDesc: string;
  };
  learnPage: {
    title: string;
    description: string;
    whatArePeptides: string;
    browsePeptides: string;
    understandingPeptides: string;
  };
  bundlesPage: {
    title: string;
    description: string;
  };
  wholesalePage: {
    title: string;
    subtitle: string;
    description: string;
    applyNow: string;
    getStarted: string;
  };
  accountPage: {
    title: string;
    description: string;
    dashboard: string;
    totalOrders: string;
    inProgress: string;
    recentOrders: string;
    myOrders: string;
    savedAddresses: string;
    addressesSavedDuringCheckout: string;
    accountSettings: string;
    profileInfo: string;
    firstName: string;
    lastName: string;
    memberSince: string;
    dangerZone: string;
    overview: string;
    orders: string;
    addresses: string;
    settings: string;
    logout: string;
    googleAccount: string;
    facebookAccount: string;
    noOrders: string;
    noOrdersDesc: string;
    shopNow: string;
    noAddresses: string;
    noAddressesDesc: string;
    editProfile: string;
    saveChanges: string;
    cancel: string;
    phone: string;
    deleteAccount: string;
    deleteAccountDesc: string;
    redirecting: string;
    completed: string;
    viewAll: string;
    welcomeBack: string;
    dashboardDesc: string;
    phoneOptional: string;
  };
  checkout: {
    steps: {
      account: string;
      shipping: string;
      payment: string;
      review: string;
    };
    titles: {
      accountDetails: string;
      shippingAddress: string;
      paymentMethod: string;
      billingAddress: string;
    };
    fields: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      street: string;
      city: string;
      postcode: string;
      country: string;
      phone: string;
    };
    shipping: {
      standard: string;
      express: string;
    };
    payment: {
      bankTransfer: string;
      bitcoin: string;
    };
    actions: {
      continue: string;
      placeOrder: string;
      back: string;
      login: string;
      guest: string;
    };
  };
  reviews: {
    title: string;
    showAll: string;
    basedOn: string;
    stars: string;
    star: string;
    verified: string;
    noReviews: string;
  };
  home: {
    heroBadge: string;
    heroTitle: string;
    heroTitleHighlight: string;
    heroSubtitle: string;
    shopNow: string;
    viewLabReports: string;
    stats: {
      ordersDelivered: string;
      purityGuarantee: string;
      expressShipping: string;
      researchLabs: string;
    };
    categories: {
      title: string;
      subtitle: string;
      desc: {
        weightLoss: string;
        muscleRecovery: string;
        cognitive: string;
        antiAging: string;
        tanning: string;
        growthHormone: string;
      };
    };
    bestSellers: {
      title: string;
      subtitle: string;
      viewAll: string;
      viewAllPeptides: string;
    };
    filters: {
      antiAging: string;
    };
    about: {
      title: string;
      subtitle: string;
      description: string;
      learnMore: string;
      features: {
        isoCertified: string;
        isoCertifiedDesc: string;
        fastDispatch: string;
        fastDispatchDesc: string;
        expertTeam: string;
        expertTeamDesc: string;
        globalReach: string;
        globalReachDesc: string;
      };
    };
    blog: {
      title: string;
      subtitle: string;
      description: string;
      viewAll: string;
    };
    testimonials: {
      title: string;
      subtitle: string;
    };
    faq: {
      title: string;
      subtitle: string;
    };
    cta: {
      title: string;
      subtitle: string;
      placeholder: string;
      button: string;
    };
  };
  product: {
    addToCart: string;
    addedToCart: string;
    buyNow: string;
    inStock: string;
    outOfStock: string;
    purity: string;
    description: string;
    specifications: string;
    reviews: string;
    faq: string;
    relatedProducts: string;
    viewOptions: string;
    wishlistAdd: string;
    wishlistRemove: string;
    casNo: string;
    molecularWeight: string;
    storage: string;
    availableSizes: string;
    priceRangeLabel: string;
    downloadCoa: string;
    researchOnlyTitle: string;
    researchOnlyText: string;
    minQuantity: string;
    off: string;
    pack: string;
    packs: string;
    vial: string;
    vials: string;
    bottle: string;
    bottles: string;
    unit: string;
    units: string;
    pricePer: string;
    perUnit: string;
    selectQuantity: string;
    belowMin: string;
    minRequired: string;
    addMore: string;
    discountBanner: string;
    youSave: string;
    trust: {
      purity: string;
      coa: string;
      delivery: string;
    };
  };
  cart: {
    title: string;
    empty: string;
    heroTitle: string;
    heroSubtitle: string;
    secureCheckout: string;
    sslEncrypted: string;
    checkoutSubtitle: string;
    readyToCheckout: string;
    freeDeliveryIncluded: string;
    addMoreForFreeDelivery: string;
    browsePeptides: string;
    cartItemsLabel: string;
    item: string;
    items: string;
    inStockFastDelivery: string;
    each: string;
    subtotal: string;
    shipping: string;
    calculatedAtCheckout: string;
    total: string;
    checkout: string;
    proceedToCheckout: string;
    secureSslEncryptedCheckout: string;
    orderSummary: string;
    bulkDiscountsApplied: string;
    freeDelivery: string;
    deliveryOptions: string;
    standardDelivery: string;
    standardDeliveryTime: string;
    expressDelivery: string;
    expressDeliveryTime: string;
    ordersOverThreshold: string;
    secureBadge: string;
    pureBadge: string;
    fastDeliveryBadge: string;
    yourCartCount: string;
    closeCart: string;
    addProductsToGetStarted: string;
    browseProducts: string;
    viewCart: string;
    addedToCart: string;
    continueShopping: string;
    remove: string;
    quantity: string;
  };
  footer: {
    newsletter: string;
    subscribe: string;
    aboutUs: string;
    customerService: string;
    legal: string;
    copyright: string;
    termsAndConditions: string;
    privacyPolicy: string;
    disclaimer: string;
    coaPolicy: string;
    emailLabel: string;
    hoursLabel: string;
    hoursValue: string;
    disclaimerLabel: string;
  };
  common: {
    all: string;
    viewOptions: string;
    learnMore: string;
    readMore: string;
    loading: string;
    error: string;
    success: string;
    skipToMainContent: string;
    free: string;
    searchLabel: string;
    searching: string;
    noResultsFound: string;
    welcome: string;
    signInForBestExperience: string;
    signIn: string;
    createAccount: string;
    or: string;
    dashboard: string;
    myOrders: string;
    settings: string;
    signOut: string;
    backTo: string;
    home: string;
    name: string;
    email: string;
    phone: string;
    notSet: string;
  };
  legalPages: {
    lastUpdated: string;
    terms: {
      title: string;
      subtitle: string;
      acceptance: { title: string; content: string; };
      researchUse: { title: string; warning: string; notHumans: string; notFood: string; notHousehold: string; acknowledgment: string; };
      purchaser: { title: string; intro: string; age: string; institution: string; hazards: string; handling: string; };
      liability: { title: string; content: string; };
      governing: { title: string; content: string; };
    };
    privacy: {
      title: string;
      subtitle: string;
      infoCollect: { title: string; content: string; };
      howUse: { title: string; intro: string; orders: string; coa: string; questions: string; legal: string; };
      security: { title: string; content: string; };
      cookies: { title: string; content: string; };
    };
    disclaimer: {
      title: string;
      subtitle: string;
      warning: string;
      warningText: string;
      lead: string;
      patent: string;
      qualified: string;
      rights: string;
    };
    shipping: {
      title: string;
      subtitle: string;
      policyTitle: string;
      processing: string;
      method: string;
      temperature: string;
      returnsTitle: string;
      customsTitle: string;
      customsContent: string;
    };
    coaPolicy: {
      title: string;
      subtitle: string;
      batchTitle: string;
      batchContent: string;
      methodsTitle: string;
      hplc: string;
      ms: string;
      availTitle: string;
      availContent: string;
    };
  };
}
