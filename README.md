# Wappler - Cookie Consent Extension

App Connect extension that wraps [Cookie Consent](https://cookieconsent.orestbida.com) library .
Cookie Consent is lightweight & gdpr compliant cookie consent plugin written in plain javascript.

## Installation

1. Open your Project Settings.
2. Go to the `Extensions`
3. Click on `Add extension`
4. Enter `@cdmx/wappler_ac_cookie_consent`
5. Click `save`
6. Click `save` again. This step will install the extension.

## Usage

1. Click `Add new component` in the `App structure` panel.
2. Browse to `Cdmx` folder and add `Cdmx Cookie Consent` to your page. In code view it will look something like this:

    ```html
    <dmx-cdmx-cookie-consent id="consent1" dmx-bind:categories="{necessary:{enabled:true,readOnly:true,autoClear:''}}"></dmx-cdmx-cookie-consent>
    ```

The component is documented in the UI but make sure to check the [library's documentation](https://cookieconsent.orestbida.com)

You can check what it's capable in the demo [website](https://playground.cookieconsent.orestbida.com)

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

Original Package by jonl1

Maintained By Lavi Sidana
