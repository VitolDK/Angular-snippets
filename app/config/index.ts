let CookieLastStore = document.cookie.match(new RegExp('(?:^|; )' + 'last_store'.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
let lastStore = decodeURIComponent(CookieLastStore[1]);
let prod = 'production' === ENV;
let locale = document.querySelector('html').getAttribute('lang');
let host = `https://www.${site}/`;
let locationHost = window.location.host;
let currency = [
  {
    id: 'RUR',
    char: '₽'
  },
  {
    id: 'USD',
    char: '$'
  },
  {
    id: 'EUR',
    char: '€'
  }
];

let googleMapKey = {apiKey: ''};
let cookieUser = 'TEST';
let domain = prod ? `.${site}` : 'localhost';
let subDomain = prod ? locationHost.replace(domain, '') : (lastStore);
let baseHref = prod ? '/manager/' : '/';
let signUp = `//my.${site}/#sign-up`;

let date = new Date();
date.setFullYear(date.getFullYear() + 1);

let cookieOptions: any = {
  path: '/',
  expires: date,
  domain
};

let cookieStoreName: string = cookieUser + '.' + subDomain;

export const Config = {
  prod,
  locale,
  host,
  apiVersion,
  apiLink: host + locale + apiVersion,
  supportPhone,
  assets,
  captcha,
  currency,
  googleMapKey,
  locationHost,
  cookieOptions,
  cookieUser,
  subDomain,
  baseHref,
  signUp,
  site,
  cookieStoreName
};
