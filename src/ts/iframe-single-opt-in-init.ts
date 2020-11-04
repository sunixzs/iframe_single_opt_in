import { IframeSingleOptIn, ServiceType } from "./IframeSingleOptIn";

/**
 * Initializes IframeSingleOptIn by searching for elements with attribute data-toggle="iframe-single-opt-in".
 */
let elements = document.querySelectorAll('[data-toggle="iframe-single-opt-in"]');
if (elements) {
    for (let e = 0; e < elements.length; e++) {
        let service: string = elements[e].hasAttribute("data-service")
            ? elements[e].getAttribute("data-service")
            : "";
        let isUrlEncoded: boolean = elements[e].hasAttribute("data-is-urlencoded")
            ? elements[e].getAttribute("data-is-urlencoded") === "true"
                ? true
                : false
            : true;
        let iframeMarkup: string = elements[e].hasAttribute("data-iframe-markup")
            ? elements[e].getAttribute("data-iframe-markup")
            : "";
        if (!(service && iframeMarkup)) {
            console.error(
                "SingleOptIn: Not all required attributes are set.",
                `Service: ${service}`,
                `iframeMarkup: ${iframeMarkup}`
            );
            continue;
        }

        new IframeSingleOptIn(
            <HTMLElement>elements[e],
            <ServiceType>service,
            iframeMarkup,
            isUrlEncoded
        );
    }
}
