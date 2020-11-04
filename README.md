# Iframe single opt-in

JavaScript and CSS-styles to get an opt-in for iframe resources like YouTube, VIMEO and Google Maps.

## Add to page

Include the stylesheet located in `dist/css/styles.css` or write your own.

There are at least two ways to include the script in a webpage:

1. Include script `dist/js/iframe-single-opt-in-init.js` in the bottom of the page and let the script find the elements by attribute `data-toggle="iframe-single-opt-in"`.
2. Include script `dist/js/iframe-single-opt-in.js` in the head section of the page and make instances.

### (1) Let the script find the elements.

The script searches for elements with `data-toggle="iframe-single-opt-in"`-attributes.

The following attributes must be set:

-   `data-service`  
    Either 'googlemaps', 'youtube' or 'vimeo'.
-   `data-iframe-markup`  
    The export iframe markup from the service. Either plain markup or urlencoded.

The following attribut is not required and defaults to `true`:

-   `data-is-urlencoded`  
    This declares, if `iframe-markup` is urlencoded or not.

An example markup could look like this:

```html
<div
    class="isoi isoi-dark isoi-ratio isoi-16by9"
    data-toggle="iframe-single-opt-in"
    data-service="youtube"
    data-iframe-markup="%3Ciframe[...]iframe%3E"
    data-is-urlencoded="true"
></div>
```

### (2) Make instances

The script is bind to `window.IframeSingleOptIn`.

Example script:

```html
<div class="isoi isoi-dark isoi-ratio isoi-16by9" id="isoi-example"></div>
<script>
    new IframeSingleOptIn(
        document.querySelector("#isoi-example"),
        'youtube',
        '<iframe [...]></iframe>'
        false
    );
</script>
```

### Interface

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

### Params

| Param            | Type     | Default                                                                    | Description                                                                   |
| ---------------- | -------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `cssClass`       | `string` | 'isoi'                                                                     | CSS-class prefix for the created elements.                                    |
| `title`          | `string` | 'External video' or 'External map'                                         | Type relational visible title translated to DE or EN.                         |
| `serviceUrlText` | `string` | 'more information'                                                         | Visible text for the data privacy link of the service. Translated to DE or EN |
| `showText`       | `string` | 'show {SERVICE_NAME} video'                                                | Type relational visible button text translated to DE or EN.                   |
| `info`           | `string` | 'By loading this resource you agree the privacy policy of {SERVICE_NAME}.' | Type relational visible info text translated to DE or EN.                     |


## Build in CSS

Set `class="isoi"` to the container. `isoi` creates the basic structure.

You should add one of the following classes as 'theme':

* `isoi--dark` for a dark UI.
* `isoi--light` for a light UI.

If you would like to set a predefined ratio, add these classes:

* `isoi--ratio isoi--ratio-16by9`
* `isoi--ratio isoi--ratio-3by2`
* `isoi--ratio isoi--ratio-1by1`

A complete set could be:

``` html
<div class="isoi isoi--dark isoi--ratio isoi--16by9"></div>
```