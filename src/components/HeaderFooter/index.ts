import {InitialService} from './interfaces';

export const initialData: InitialService.IProps = {
  "countries": [],
  "currentSelection": {
    "brand": {
      "code": "TG",
      "author": "web"
    },
    "cultureCode": "es-ES",
    "currencyCode": "EUR",
    "cobrandedId": 201
  },
  "optionParameters": {
    "showSocialNetworks": false,
    "enableSelectLanguage": true,
    "showAdvantioLogo": true,
    "showPCILogo": true,
    "enableSelectCurrencies": false,
    "facebookPluginUrl": "https://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.facebook.com%2Ftravelgenio&amp;send=false&amp;layout=button_count&amp;width=196&amp;show_faces=false&amp;font&amp;colorscheme=light&amp;action=like&amp;height=21",
    "facebookUrl": "https://www.facebook.com/travelgenio",
    "advantioUrl": "https://certs.advantio.com/client/8Oj6aAKrHd1i3Lv"
  },
  "headerItems": {
    "navItemLinks": [
      {
        "id": "home",
        "resourceText": "Inicio",
        "url": "/Home/Index/es-ES/201"
      },
      {
        "id": "flights",
        "resourceText": "Vuelos",
        "url": "/Home/Index/es-ES/201"
      },
      {
        "id": "myFlights",
        "resourceText": "Mis Vuelos",
        "url": "http://v24.checkmyflight.travelgenio.com/Home/Index/es-ES/201"
      },
      {
        "id": "contact",
        "resourceText": "Contacto",
        "url": "https://es.travelgenio.com/customerservices/es-ES/201"
      }
    ]
  },
  "footerItems": {
    "footerSubscription": {
      "id": "newsletterPostUrl",
      "url": "/Flights/Newsletter"
    },
    "footerLinks": [
      {
        "id": "generalInfo",
        "resourceText": "Información General",
        "url": "http://es.travelgenio.com/pages/informacion-general"
      },
      {
        "id": "frequentAsk",
        "resourceText": "Preguntas frecuentes",
        "url": "http://es.travelgenio.com/pages/preguntas-frecuentes/las-10-preguntas-mas-consultadas"
      },
      {
        "id": "press",
        "resourceText": "Sala de Prensa",
        "url": "http://es.travelgenio.com/pages/sala-de-prensa"
      },
      {
        "id": "advertising",
        "resourceText": "Publicidad",
        "url": "http://es.travelgenio.com/pages/publicidad"
      },
      {
        "id": "siteMap",
        "resourceText": "Mapa del sitio",
        "url": "http://es.travelgenio.com/pages/sitemap"
      },
      {
        "id": "affiliates",
        "resourceText": "Afiliados",
        "url": "http://es.travelgenio.com/pages/afiliados"
      },
      {
        "id": "generalConditions",
        "resourceText": "Condiciones Generales",
        "url": "http://es.travelgenio.com/pages/condiciones-generales"
      },
      {
        "id": "contact",
        "resourceText": "Contacto",
        "url": "https://es.travelgenio.com/customerservices/es-ES/201"
      },
      {
        "id": "dataProtection",
        "resourceText": "Protección de Datos",
        "url": "http://es.travelgenio.com/pages/proteccion-de-datos"
      },
      {
        "id": "airlines",
        "resourceText": "Aerolíneas",
        "url": "http://es.travelgenio.com/pages/aerolineas"
      },
      {
        "id": "cookiePolicy",
        "resourceText": "Política de Cookies",
        "url": "http://es.travelgenio.com/pages/politica-de-cookies"
      },
      {
        "id": "cookiePolicy",
        "resourceText": "Política de Cookies",
        "url": "http://es.travelgenio.com/pages/politica-de-cookies"
      }
    ]
  }
}

export const countries:InitialService.ICountry[] =[];
/*
const countries:InitialService.ICountry[] =[
  {
    "cobrandedId": 201,
    "cultureCode": "es-ES",
    "id": "Spain"
  },
  {
    "cobrandedId": 202,
    "cultureCode": "es-AR",
    "id": "Argentine"
  }
];*/

export const currencies:InitialService.ICurrency[]=[];
