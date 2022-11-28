import { Language } from "../Language";

/**
 * Single opt in for iframe ressources like google maps, youtube and vimeo.
 */

export type ServiceType = "googlemaps" | "youtube" | "vimeo";
export type ServiceName = "Google Maps" | "YouTube" | "VIMEO";

interface ServiceNameInterface {
    type: ServiceType;
    name: ServiceName;
}

interface ServiceUrlInterface {
    type: ServiceType;
    url: string;
}

const SERVICE_NAMES: ServiceNameInterface[] = [
    {
        type: "googlemaps",
        name: "Google Maps",
    },
    {
        type: "youtube",
        name: "YouTube",
    },
    {
        type: "vimeo",
        name: "VIMEO",
    },
];
const SERVICE_URLS: ServiceUrlInterface[] = [
    {
        type: "googlemaps",
        url: "https://www.google.com/intl/de_DE/help/terms_maps/",
    },
    {
        type: "youtube",
        url: "https://policies.google.com/privacy",
    },
    {
        type: "vimeo",
        url: "https://vimeo.com/privacy",
    },
];

let findServiceNameByType = (type: string): ServiceName | null => {
    // find() throws a compiler error:
    // Error TS2339: Property 'find' does not exist on type 'ServiceNameInterface[]'.
    // let serviceName: ServiceNameInterface = SERVICE_NAMES.find(
    //     (serviceName) => serviceName.type == type
    // );
    // return serviceName ? serviceName.name : null;

    // but filter will work - I don't know why.
    let serviceNames: ServiceNameInterface[] = SERVICE_NAMES.filter(
        (serviceName) => serviceName.type == type
    );
    return serviceNames[0] ? serviceNames[0].name : null;
};

let findServiceUrlByType = (type: string): string | null => {
    let serviceUrls: ServiceUrlInterface[] = SERVICE_URLS.filter(
        (serviceName) => serviceName.type == type
    );
    return serviceUrls[0] ? serviceUrls[0].url : null;
};

export class IframeSingleOptIn {
    private _container: HTMLElement;
    private _service: string;
    private _serviceName: string | null;
    private _serviceUrl: string;
    private _iframeMarkup: string;
    private _isUrlEncoded: boolean;

    // main elements
    private _stage: HTMLElement;
    private _background: HTMLElement;
    private _button: HTMLElement;

    // visible texts
    private _titleText: string;
    private _serviceUrlText: string;
    private _showText: string;
    private _infoText: string;

    // class prefix for the elements
    private _cssClass: string = "isoi";
    private _language: Language = new Language();

    constructor(
        container: HTMLElement,
        service: ServiceType,
        iframeMarkup: string,
        isUrlEncoded: boolean = false,
        params: any = {}
    ) {
        this._container = container;
        this._service = service;
        this._serviceName = findServiceNameByType(this._service);
        this._serviceUrl =
            params && typeof params.serviceUrl === "string"
                ? params.serviceUrl
                : findServiceUrlByType(this._service);

        if (!(this._serviceName && this._serviceUrl)) {
            console.error(
                "Service name or service url could not be determined!",
                `Service: ${this._service}`,
                `Service name: ${this._serviceName}`,
                `Service URL: ${this._serviceUrl}`
            );
            return;
        }

        this._iframeMarkup = iframeMarkup;
        this._isUrlEncoded = isUrlEncoded;
        if (params && params.cssClass) {
            this._cssClass = params.cssClass;
        }

        // override language?
        if (params && typeof params.language === "object") {
            Object.keys(params.language).forEach((languageKey) => {
                this._language.data[languageKey] = params.language[languageKey];
                this._language.setLanguageKey(languageKey);
            });
        }

        // texts
        let isVideo = this._service === "googlemaps" ? false : true;
        let replacements = {
            SERVICE_NAME: this._serviceName,
            SERVICE_URL: this._serviceUrl,
        };
        this._titleText =
            params && typeof params.titleText === "string"
                ? params.titleText
                : this._language.get(isVideo ? "titleTextVideo" : "titleTextMap", replacements);
        this._serviceUrlText =
            params && typeof params.serviceUrlText === "string"
                ? params.serviceUrlText
                : this._language.get("serviceUrlText", replacements);
        this._showText =
            params && typeof params.showText === "string"
                ? params.showText
                : this._language.get(isVideo ? "showTextVideo" : "showTextMap", replacements);
        this._infoText =
            params && typeof params.infoText === "string"
                ? params.infoText
                : this._language.get(isVideo ? "infoTextVideo" : "infoTextMap", replacements);

        this._init();
    }

    private _init(): void {
        // container for all
        this._stage = this._createElement("DIV", this._cssClass + "__stage", "", this._container);

        // background
        this._background = this._createElement(
            "DIV",
            this._cssClass + "__background",
            "",
            this._stage
        );

        // container for UI elements
        let interfaceElement = this._createElement(
            "DIV",
            this._cssClass + "__interface",
            "",
            this._stage
        );

        // title
        if (this._titleText) {
            this._createElement(
                "DIV",
                this._cssClass + "__title",
                this._titleText,
                interfaceElement
            );
        }

        // info text
        if (this._infoText) {
            this._createElement("DIV", this._cssClass + "__info", this._infoText, interfaceElement);
        }

        // privacy link
        if (this._serviceUrlText) {
            let privacyLinkElement = this._createElement(
                "DIV",
                this._cssClass + "__privacy-link",
                "",
                interfaceElement
            );

            // concrete privacy link
            let privacyLinkAnchorElement = this._createElement(
                "A",
                this._cssClass + "__privacy-link__anchor",
                this._serviceUrlText,
                privacyLinkElement
            );
            privacyLinkAnchorElement.setAttribute("href", this._serviceUrl);
            privacyLinkAnchorElement.setAttribute("target", "_blank");
        }

        // button
        this._button = this._createElement(
            "BUTTON",
            this._cssClass + "__button",
            this._showText,
            interfaceElement
        );
        this._button.setAttribute('title', this._showText);
        this._button.setAttribute('type', 'button');

        // when button is clicked, replate the content with the iframe
        let _this = this;
        this._button.addEventListener(
            "click",
            function () {
                _this._container.removeChild(_this._stage);
                _this._container.innerHTML = _this._isUrlEncoded
                    ? decodeURIComponent(_this._iframeMarkup)
                    : _this._iframeMarkup;
            },
            false
        );
    }

    private _createElement(
        tagName: string,
        className: string,
        html: string,
        appendTo: HTMLElement
    ): HTMLElement {
        var e = document.createElement(tagName);
        if (className) {
            e.setAttribute("class", className);
        }
        if (html) {
            e.innerHTML = html;
        }
        if (appendTo) {
            appendTo.appendChild(e);
        }
        return e;
    }
}
