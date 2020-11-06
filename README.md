# Iframe single opt-in

JavaScript and CSS-styles to get an opt-in for iframe resources like YouTube, VIMEO and Google Maps.

## Install

### github

```sh
git clone https://github.com/sunixzs/iframe_single_opt_in.git
```

or as submodule:

```sh
git init submodule
git submodule add https://github.com/sunixzs/iframe_single_opt_in.git path/to/be
```

### NPM

```sh
npm i iframe_single_optin
```

or

```sh
yarn add iframe_single_optin
```

## Add to page

Include the stylesheet located in `./dist/css/iframe-single-opt-in.css` or write your own. Of course you also may include the sources in `./src/scss`.

There are at least two ways to include the script in a webpage:

### 1. Let the script find the elements / use `data-toggle="iframe-single-opt-in"`-attribute

Include script `./dist/js/iframe-single-opt-in-init.js` in the bottom of the page and let the script find the elements by attribute `data-toggle="iframe-single-opt-in"`.

The following attributes must further be set to the element:

-   `data-service`  
    Either 'googlemaps', 'youtube' or 'vimeo'.
-   `data-iframe-markup`  
    The export iframe markup of the service. Either plain markup or urlencoded. In all the services you find a share button. There is an option to embed into a webpage which produces an iframe tag. Just like you want to embed without opt-in.

The following attribut is not required and defaults to `true`:

-   `data-is-urlencoded`  
    This declares, if `iframe-markup` is urlencoded or not.

An example markup could look like this:

```html
<div
    class="isoi isoi--dark isoi--ratio isoi--16by9"
    data-toggle="iframe-single-opt-in"
    data-service="youtube"
    data-iframe-markup="%3Ciframe[...]iframe%3E"
    data-is-urlencoded="true"
></div>
```

### 2. Make instances of `IframeSingleOptIn()`

Include script `./dist/js/iframe-single-opt-in.js` in the head section of the page (or just before calling `IframeSingleOptIn`). The script is bind to `window.IframeSingleOptIn`.

Example:

```html
<div class="isoi isoi--dark isoi--ratio isoi--16by9" id="isoi-example"></div>
<script>
    new IframeSingleOptIn(
        document.querySelector("#isoi-example"),
        'youtube',
        '<iframe [...]></iframe>'
        false
    );
</script>
```

## Interface

```js
/**
 * @param {HTMLElement} container       The container where the iframe should be placed in.
 * @param {ServiceType} service         Either 'googlemaps', 'youtube' or 'vimeo'.
 * @param {string}      iframeMarkup    The iframe markup - urlencoded or not.
 * @param {boolean}     isUrlEncoded    Is iframeMarkup urlencoded?
 * @param {}            params          Additional params - see below
 */
IframeSingleOptIn(container, service, iframeMarkup, (isUrlEncoded = false), (params = {}));
```

To urlencode the iframe markup you may use https://www.urlencoder.org/ which worked for me.

## Params

| Param            | Type     | Default                                                                    | Description                                                                                                                                             |
| ---------------- | -------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `titleText`      | `string` | 'External video' or 'External map'                                         | Type relational visible title.                                                                                                                          |
| `infoText`       | `string` | 'By loading this resource you agree the privacy policy of {SERVICE_NAME}.' | Type relational visible info text.                                                                                                                      |
| `serviceUrlText` | `string` | 'more information'                                                         | Visible text for the data privacy link of the service.                                                                                                  |
| `showText`       | `string` | 'show {SERVICE_NAME} video'                                                | Type relational visible button text.                                                                                                                    |
| `serviceUrl`     | `string` | 'http://[vimeo.com\|youtube.com\|maps.google.com]...'                      | Data privay URI of the service.                                                                                                                         |
| `cssClass`       | `string` | 'isoi'                                                                     | CSS-class prefix for the created elements.                                                                                                              |
| `language`       | `object` | {languageKey: { titleText:'Hey user', [...]}}                              | Another way to override the texts. `languageKey` will be set as current language. Have a look at `./src/ts/Language/LanguageData.default.ts` for the text keys. |

Texts for english and german are built in. Use `params.*Text` to override some of them. The language will be determined by reading the `lang`-attribute of the `html`-tag (`de` for german and others for english).

There is another way to override a complete language set by using `params.language`. There is an example at the end of this page.

## Build in CSS

Set `class="isoi"` to the container. `isoi` creates the basic structure.

You could add one of the following classes as 'theme':

-   `isoi--dark` for a dark UI.
-   `isoi--light` for a light UI.

If you would like to set a predefined ratio, add these classes:

-   `isoi--ratio isoi--ratio-16by9`
-   `isoi--ratio isoi--ratio-3by2`
-   `isoi--ratio isoi--ratio-4by3`
-   `isoi--ratio isoi--ratio-1by1`

A complete set could be:

```html
<div class="isoi isoi--dark isoi--ratio isoi--16by9"></div>
```

## Examples

There are some examples in <a href="./dist/example.data-attribute.html">./dist/example.data-attribute.html</a>, <a href="./dist/example.instance.html">./dist/example.instance.html</a> and <a href="./dist/example.override-language.html">./dist/example.override-language.html</a>.

### Another service

The `service` parameter is only used to automatically use the build in texts. If you want to use another service, override the texts, but use one of the service names:

```html
<div class="isoi isoi--dark isoi--ratio isoi--16by9" id="isoi-another-service"></div>
<script>
    new IframeSingleOptIn(
        document.querySelector("#isoi-another-service"),
        'vimeo',
        '<iframe src="https://another-one-bites-the.dust" [...]></iframe>'
        false,
        {
            titleText: 'Queen: Another one bites the dust',
            infoText: 'Maybe Queen makes you emotional, so we have to warn you before you load the stuff ;-)',
            serviceUrlText: '',
            showText: 'Let\'s rock'
        }
    );
</script>
```

Here is another example using the `language` parameter. Supported markers are `{SERVICE_NAME}` and `{SERVICE_URL}`

```html
<div class="isoi isoi--dark isoi--ratio isoi--16by9" id="isoi-another-language"></div>
<script>
    let languageDeDu = {
        titleTextMap: "Wir benötigen Deine Zustimmung für {SERVICE_NAME}",
        serviceUrlText: "Datenschutzerklärung: {SERVICE_URL}",
        showTextMap: "Zeig mir die Karte!",
        infoTextMap: "Wir verwenden {SERVICE_NAME}. Ein Drittanbieter, um Karteninhalte einzubetten. Dieser Service kann Daten zu Deinen Aktivitäten sammeln. Bitte lese die Details durch und stimme der Nutzung zu, um die Karte anzuzeigen."
    };

    new IframeSingleOptIn(
        document.querySelector("#isoi-another-language"),
        "googlemaps",
        `%3Ciframe[...]iframe%3E`,
        true,
        {
            language: {
                deDu: languageDeDu
            }
        }
    );
</script>
```
