"use strict";

import { data as dataDefault } from "./LanguageData.default";
import { data as dataDE } from "./LanguageData.de";

export class Language {
    languageKey: string;
    data: any;

    constructor() {
        let html = document.querySelector("html");
        this.setLanguageKey(
            html && html.hasAttribute("lang") ? html.getAttribute("lang") : "default"
        );
        this.data = {
            default: dataDefault,
            de: dataDE,
        };
    }

    /**
     * @param languageKey
     */
    setLanguageKey(languageKey: string) {
        this.languageKey = languageKey;
    }

    /**
     * Returns a single translation.
     *
     * @param pointer
     * @param replacements Key value pairs. {REPLACE_ME: "replace with"}. "{REPLACE_ME}" in string will be replaced with "replace with".
     */
    get(pointer: string, replacements: any = {}) {
        let returnString = "";

        if (
            typeof this.data[this.languageKey] === "object" &&
            typeof this.data[this.languageKey][pointer] === "string"
        ) {
            returnString = this.data[this.languageKey][pointer];
        } else if (typeof this.data.default[pointer] === "string") {
            returnString = this.data.default[pointer];
        } else {
            // if nothing found, return the pointer
            returnString = "[" + pointer + "]";
        }

        if (typeof replacements === "object") {
            for (let needle in replacements) {
                returnString = returnString.replace("{" + needle + "}", replacements[needle]);
            }
        }

        return returnString;
    }
}
