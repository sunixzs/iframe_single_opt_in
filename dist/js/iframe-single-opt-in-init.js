!function a(s,r,n){function o(t,e){if(!r[t]){if(!s[t]){var i="function"==typeof require&&require;if(!e&&i)return i(t,!0);if(u)return u(t,!0);throw(i=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",i}i=r[t]={exports:{}},s[t][0].call(i.exports,function(e){return o(s[t][1][e]||e)},i,i.exports,a,s,r,n)}return r[t].exports}for(var u="function"==typeof require&&require,e=0;e<n.length;e++)o(n[e]);return o}({1:[function(e,t,i){"use strict";i.__esModule=!0,i.IframeSingleOptIn=void 0;var u=e("../Language"),l=[{type:"googlemaps",name:"Google Maps"},{type:"youtube",name:"YouTube"},{type:"vimeo",name:"VIMEO"}],c=[{type:"googlemaps",url:"https://www.google.com/intl/de_DE/help/terms_maps/"},{type:"youtube",url:"https://policies.google.com/privacy"},{type:"vimeo",url:"https://vimeo.com/privacy"}],e=(a.prototype._init=function(){this._stage=this._createElement("DIV",this._cssClass+"__stage","",this._container),this._background=this._createElement("DIV",this._cssClass+"__background","",this._stage);var e,t=this._createElement("DIV",this._cssClass+"__interface","",this._stage);this._titleText&&this._createElement("DIV",this._cssClass+"__title",this._titleText,t),this._infoText&&this._createElement("DIV",this._cssClass+"__info",this._infoText,t),this._serviceUrlText&&(e=this._createElement("DIV",this._cssClass+"__privacy-link","",t),(e=this._createElement("A",this._cssClass+"__privacy-link__anchor",this._serviceUrlText,e)).setAttribute("href",this._serviceUrl),e.setAttribute("target","_blank")),this._button=this._createElement("DIV",this._cssClass+"__button",this._showText,t);var i=this;this._button.addEventListener("click",function(){i._container.removeChild(i._stage),i._container.innerHTML=i._isUrlEncoded?decodeURIComponent(i._iframeMarkup):i._iframeMarkup},!1)},a.prototype._createElement=function(e,t,i,a){e=document.createElement(e);return t&&e.setAttribute("class",t),i&&(e.innerHTML=i),a&&a.appendChild(e),e},a);function a(e,t,i,a,s){var r,n,o=this;void 0===a&&(a=!1),void 0===s&&(s={}),this._cssClass="isoi",this._language=new u.Language,this._container=e,this._service=t,this._serviceName=(r=this._service,(t=l.filter(function(e){return e.type==r}))[0]?t[0].name:null),this._serviceUrl=s&&"string"==typeof s.serviceUrl?s.serviceUrl:(n=this._service,(t=c.filter(function(e){return e.type==n}))[0]?t[0].url:null),this._serviceName&&this._serviceUrl?(this._iframeMarkup=i,this._isUrlEncoded=a,s&&s.cssClass&&(this._cssClass=s.cssClass),s&&"object"==typeof s.language&&Object.keys(s.language).forEach(function(e){o._language.data[e]=s.language[e],o._language.setLanguageKey(e)}),i="googlemaps"!==this._service,a={SERVICE_NAME:this._serviceName,SERVICE_URL:this._serviceUrl},this._titleText=s&&"string"==typeof s.titleText?s.titleText:this._language.get(i?"titleTextVideo":"titleTextMap",a),this._serviceUrlText=s&&"string"==typeof s.serviceUrlText?s.serviceUrlText:this._language.get("serviceUrlText",a),this._showText=s&&"string"==typeof s.showText?s.showText:this._language.get(i?"showTextVideo":"showTextMap",a),this._infoText=s&&"string"==typeof s.infoText?s.infoText:this._language.get(i?"infoTextVideo":"infoTextMap",a),this._init()):console.error("Service name or service url could not be determined!","Service: "+this._service,"Service name: "+this._serviceName,"Service URL: "+this._serviceUrl)}i.IframeSingleOptIn=e},{"../Language":4}],2:[function(e,t,i){"use strict";i.__esModule=!0,i.data=void 0,i.data={titleTextVideo:"Wir benötigen Ihre Zustimmung, um das Video zu laden",titleTextMap:"Wir benötigen Ihre Zustimmung, um die Karte zu laden",serviceUrlText:"Mehr Informationen",showTextVideo:"{SERVICE_NAME} Video anzeigen",showTextMap:"{SERVICE_NAME} Karte anzeigen",infoTextVideo:"Wir verwenden einen Service eines Drittanbieters, um Videoinhalte einzubetten. Dieser Service kann Daten zu Ihren Aktivitäten sammeln. Bitte lesen Sie die Details durch und stimmen Sie der Nutzung des Service zu, um dieses Video anzuzeigen.",infoTextMap:"Wir verwenden einen Service eines Drittanbieters, um Karteninhalte einzubetten. Dieser Service kann Daten zu Ihren Aktivitäten sammeln. Bitte lesen Sie die Details durch und stimmen Sie der Nutzung des Service zu, um diese Karte anzuzeigen."}},{}],3:[function(e,t,i){"use strict";i.__esModule=!0,i.data=void 0,i.data={titleTextVideo:"We need your consent to load the video",titleTextMap:"We need your consent to load the map",serviceUrlText:"more information",showTextVideo:"show {SERVICE_NAME} video",showTextMap:"show {SERVICE_NAME}",infoTextVideo:"We use a third party service to embed video content. This service can collect data about your activities. Please read the details and agree to use the service to view this video.",infoTextMap:"We use a third party service to embed map content. This service can collect data about your activities. Please read the details and agree to use the service to view this map."}},{}],4:[function(e,t,i){"use strict";i.__esModule=!0,i.Language=void 0;var a=e("./LanguageData.default"),s=e("./LanguageData.de"),e=(r.prototype.setLanguageKey=function(e){this.languageKey=e},r.prototype.get=function(e,t){void 0===t&&(t={});var i="",i="object"==typeof this.data[this.languageKey]&&"string"==typeof this.data[this.languageKey][e]?this.data[this.languageKey][e]:"string"==typeof this.data.default[e]?this.data.default[e]:"["+e+"]";if("object"==typeof t)for(var a in t)i=i.replace("{"+a+"}",t[a]);return i},r);function r(){var e=document.querySelector("html");this.setLanguageKey(e&&e.hasAttribute("lang")?e.getAttribute("lang"):"default"),this.data={default:a.data,de:s.data}}i.Language=e},{"./LanguageData.de":2,"./LanguageData.default":3}],5:[function(e,t,i){"use strict";i.__esModule=!0;var a=e("./IframeSingleOptIn"),s=document.querySelectorAll('[data-toggle="iframe-single-opt-in"]');if(s)for(var r=0;r<s.length;r++){var n=s[r].hasAttribute("data-service")?s[r].getAttribute("data-service"):"",o=!s[r].hasAttribute("data-is-urlencoded")||"true"===s[r].getAttribute("data-is-urlencoded"),u=s[r].hasAttribute("data-iframe-markup")?s[r].getAttribute("data-iframe-markup"):"";n&&u?new a.IframeSingleOptIn(s[r],n,u,o):console.error("SingleOptIn: Not all required attributes are set.","Service: "+n,"iframeMarkup: "+u)}},{"./IframeSingleOptIn":1}]},{},[5]);