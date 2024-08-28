import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js';


dmx.Component("cdmx-cookie-consent", {
    attributes: {
        autoShow: { type: Boolean, default: true },
        noAutoClearCookies: { type: Boolean, default: false },
        revision: { type: Number, default: 0 },
        disablePageInteraction: { type: Boolean, default: false },
        language: { type: Object, default: { default: "en", translations: { en:"/js/cdmx-cookie-consent/locale/en.json"}} },
        guiOptions: { type: Object, default: {} },
        categories: { type: Object, default: {} },
        gtm_id: { type: String, default: null }
    },

    init() {

        let categories = this.props.categories;
        let isGoogleAnalyticsEnabled = "google_analytics" in categories && (this.props.gtm_id !== "" && this.props.gtm_id !== null);
        // categories.includes("google_analytics");

        if(isGoogleAnalyticsEnabled) {
            window.dataLayer = window.dataLayer || [];

            gtag("consent", "default", {
                ad_user_data: "denied",
                ad_personalization: "denied",
                ad_storage: "denied",
                analytics_storage: "denied",
                wait_for_update: 2000 // milliseconds to wait for update
            });
        }

        console.log(isGoogleAnalyticsEnabled);

        const config = {
            language: {
                default: this.props.language.default,
                translations: {
                    en: async () => {
                        const res = await fetch(this.props.language.translations[this.props.language.default]);
                        return await res.json();
                    }
                              }
            },
            categories: categories,
            guiOptions: this.props.guiOptions,
            disablePageInteraction: this.props.disablePageInteraction,
            autoShow: this.props.autoShow,
            noAutoClearCookies: this.props.noAutoClearCookies,
            revision: this.props.revision,
            onFirstConsent: ({ cookie }) => {
                console.log("onFirstConsent", cookie);
                if (isGoogleAnalyticsEnabled) {
                    let userSelection = cookie.categories.includes("google_analytics") ? "granted" : "denied";

                    gtag("consent", "update", {
                        ad_user_data: userSelection,
                        ad_personalization: userSelection,
                        ad_storage: userSelection,
                        analytics_storage: userSelection,
                        wait_for_update: 2000 // milliseconds to wait for update
                    });

                    gtm_start_fn(window, document, 'script', 'dataLayer', this.props.gtm_id);
                }
            },
            onConsent: ({ cookie }) => {
                console.log("onConsent", cookie);
                if (isGoogleAnalyticsEnabled) {
                    let userSelection = cookie.categories.includes("google_analytics") ? "granted" : "denied";
                    gtag("consent", "update", {
                        ad_user_data: userSelection,
                        ad_personalization: userSelection,
                        ad_storage: userSelection,
                        analytics_storage: userSelection,
                        wait_for_update: 2000 // milliseconds to wait for update
                    });

                    gtm_start_fn(window, document, 'script', 'dataLayer', this.props.gtm_id);
                }
            },
            onChange: ({ cookie, changedCategories, changedServices }) => {
                console.log("onChange", cookie, changedCategories, changedServices);
                if (isGoogleAnalyticsEnabled) {
                    let userSelection = cookie.categories.includes("google_analytics") ? "granted" : "denied";
                    gtag("consent", "update", {
                        ad_user_data: userSelection,
                        ad_personalization: userSelection,
                        ad_storage: userSelection,
                        analytics_storage: userSelection,
                        wait_for_update: 2000 // milliseconds to wait for update
                    });

                    if (userSelection === "denied") {
                        deleteCookieByPrefix('_ga');
                    }

                    gtm_start_fn(window, document, 'script', 'dataLayer', this.props.gtm_id);
                }
            }
        };



        console.log(config);

        /**
 * All config. options available here:
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 */
        CookieConsent.run(config);
    },
    methods: {
        run(config) {
            CookieConsent.run(config);
        },
        showConsent() {
            CookieConsent.show();
        },
        hideConsent() {
            CookieConsent.hide();
        },
        showPreferences() {
            CookieConsent.showPreferences();
        },
        hidePreferences() {
            CookieConsent.hidePreferences();
        },
        acceptCategory(category, value) {
            CookieConsent.acceptCategory(category, value);
        },
        eraseCookies(cookies, path, domain) {
            CookieConsent.eraseCookies(cookies, path, domain);
        },
        loadScript(src, attrs) {
            return CookieConsent.loadScript(src, attrs);
        },
        setLanguage(lang, force) {
            CookieConsent.setLanguage(lang, force);
        },
        setCookieData(data, mode) {
            CookieConsent.setCookieData(data, mode);
        },
        reset(deleteCookie) {
            CookieConsent.reset(deleteCookie);
        }
    },
    requestUpdate(prop, oldValue) {
        // Handle updates when properties change
        if (prop === 'language') {
            this.setLanguage(this.props.language);
        }
    },
    performUpdate(updatedProps) {
        // Update logic based on updated properties
        updatedProps.forEach((oldValue, prop) => {
            if (prop === 'language') {
                this.setLanguage(this.props.language);
            }
        });
    },
    destroy() {
        // Cleanup resources when the component is destroyed
        console.log("Cookie Consent component destroyed");
    }
});


const gtm_start_fn = function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
}

function gtag() {
    console.log('here', arguments);
    dataLayer.push(arguments);
}

function deleteCookieByPrefix(prefix) {
    // Get all cookies
    const cookies = document.cookie.split(';');

    // Iterate over each cookie
    cookies.forEach(function (cookie) {
        // Trim any leading spaces
        const cookieName = cookie.split('=')[0].trim();

        // Check if the cookie name starts with the specified prefix
        if (cookieName.startsWith(prefix)) {
            // Delete the cookie by setting its expiration date to a past date
            document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname + ';';
        }
    });
}
