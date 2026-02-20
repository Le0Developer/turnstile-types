/**
 * Represents a rendered Turnstile widget.  Used to identify a specific widget when calling
 * Turnstile methods.
 */
export type WidgetId = string;

/**
 * An HTML element id used as a selector.
 */
export type ElementId = string;

/**
 * Turnstile is Cloudflare’s smart CAPTCHA alternative. It can be embedded into any website
 * without sending traffic through Cloudflare and works without showing visitors a CAPTCHA.
 * It's accessible via `window.turnstile`.
 * @see https://developers.cloudflare.com/turnstile
 */
export interface TurnstileObject {
  /**
   * If using synchronous loading, the callback will be called once the DOM is ready.
   * @see [Explicit Rendering](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#explicitly-render-the-turnstile-widget)
   */
  ready: (callback: () => any) => void;

  /**
   * @see [Implicit Rendering](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#implicitly-render-the-turnstile-widget)
   */
  implicitRender: () => void;

  /**
   * Executes the challenge after the render() function has been called with { ... execution: "execute" },
   * decoupling the appearance and rendering of a widget from its execution.
   * @param container - The ID of the widget, the HTML container, or an element id selector.
   * @param parameters - Configuration options for rendering. See {@link RenderParameters}.
   * @see [Execution Modes](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#execution-modes)
   */
  execute: (
    container?: WidgetId | HTMLElement | ElementId,
    parameters?: RenderParameters,
  ) => void;

  /**
   * Explicitly renders the Turnstile widget.
   * Passed parameters will be combined with `data-` attributes on the container.
   * Only the `sitekey` parameter is required.
   * @param container - HTML container to render the widget, or an element id selector.
   * @param parameters - Configuration options for rendering. See {@link RenderParameters}.
   * @throws {Error} Will throw an error if any parameter is invalid.
   * @returns A `widgetId` string.
   */
  render(
    container: HTMLElement | ElementId,
    parameters?: RenderParameters,
  ): string;

  /**
   * Resets the widget.
   * @param widget - The ID of the widget, the HTML container, or an element id selector.
   */
  reset(widget?: WidgetId | HTMLElement | ElementId): void;

  /**
   * Removes the widget from the page.
   * @param widget - The ID of the widget, the HTML container, or an element id selector.
   */
  remove(widget?: WidgetId | HTMLElement | ElementId): void;

  /**
   * Obtains the widget's response.
   * @param widget - The ID of the widget, the HTML container, or an element id selector.
   */
  getResponse(widget?: WidgetId | HTMLElement | ElementId): string;

  /**
   * Checks if the widget has expired.
   * @param widget - The ID of the widget, the HTML container, or an element id selector.
   */
  isExpired(widget?: WidgetId | HTMLElement | ElementId): boolean;
}

/**
 * @deprecated since version 1.2.0, replaced with RenderParameters
 */
export type TurnstileOptions = RenderParameters;

/**
 * Interface for Turnstile rendering parameters.
 * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
 */
export interface RenderParameters {
  /**
   * Every widget has a sitekey. This sitekey is associated with the corresponding
   * widget configuration and is created upon widget creation in Cloudflare's dashboard.
   * This is the only required parameter.
   * - Data Attribute - `data-sitekey`
   */
  sitekey: string;

  /**
   * A customer value that can be used to differentiate widgets under the same
   * sitekey in analytics and which is returned upon validation. This can only
   * contain up to 32 alphanumeric characters including `_` and `-`.
   * - Data Attribute - `data-action`
   */
  action?: string;

  /**
   * A customer payload that can be used to attach customer data to the challenge
   * throughout its issuance and which is returned upon validation. This can only
   * contain up to 255 alphanumeric characters including `_` and `-`.
   * - Data Attribute - `data-cdata`
   */
  cData?: string;

  /**
   * Callback function invoked upon successful challenge completion.
   * - Data Attribute - `data-callback`
   * @param token - The token passed upon successful challenge.
   * @param preClearanceObtained - A boolean indicating if the clearance was obtained.
   */
  callback?: (token: string, preClearanceObtained: boolean) => void;

  /**
   * Callback invoked when there is an error (e.g., network error, challenge failed).
   * - Data Attribute - `data-error-callback`
   * @param errorCode - The error code specified by Turnstile.
   * @see [Client-side errors](https://developers.cloudflare.com/turnstile/reference/client-side-errors)
   */
  "error-callback"?: (errorCode: string) => void;

  /**
   * Execution controls when to obtain the token of the widget and can be on
   * `"render"` (default) or on `"execute"`.
   * - Data Attribute - `data-execution`
   * @defaultValue "render"
   * @see [Execution modes](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#execution-modes)
   */
  execution?: "render" | "execute";

  /**
   * Callback invoked when the token expires and does not reset the widget.
   * - Data Attribute - `data-expired-callback`
   */
  "expired-callback"?: (token: string) => void;

  /**
   * Callback invoked before the challenge enters interactive mode.
   * - Data Attribute - `data-before-interactive-callback`
   */
  "before-interactive-callback"?: () => void;

  /**
   * Callback invoked when the challenge has left interactive mode.
   * - Data Attribute - `data-after-interactive-callback`
   */
  "after-interactive-callback"?: () => void;

  /**
   * Callback invoked when a given client/browser is not supported.
   * - Data Attribute - `data-unsupported-callback`
   */
  "unsupported-callback"?: () => void;

  /**
   * Callback invoked when the challenge expires.
   * - Data Attribute - `data-timeout-callback`
   */
  "timeout-callback"?: () => void;

  /**
   * The widget theme. Can be `"light"`, `"dark"`, or `"auto"`.
   * - Data Attribute - `data-theme`
   * @defaultValue "auto"
   */
  theme?: "light" | "dark" | "auto";

  /**
   * Language to display, either `"auto"` or an ISO 639-1 two-letter language code.
   * - Data Attribute - `data-language`
   * @see [Supported languages](https://developers.cloudflare.com/turnstile/reference/supported-languages/)
   */
  language?: SupportedLanguages | "auto" | string;

  /**
   * The tabindex of Turnstile's iframe for accessibility purposes.
   * - Data Attribute - `data-tabindex`
   * @defaultValue 0
   */
  tabindex?: number;

  /**
   * Controls if an input element with the response token is created.
   * - Data Attribute - `data-response-field`
   * @defaultValue true
   */
  "response-field"?: boolean;

  /**
   * Name of the input element.
   * - Data Attribute - `data-response-field-name`
   * @defaultValue "cf-turnstile-response"
   */
  "response-field-name"?: string;

  /**
   * The widget size. Can be 'normal' or 'compact'.
   * - Data Attribute - `data-size`
   * @see https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#widget-size
   * @defaultValue "normal"
   */
  size?: "normal" | "flexible" | "compact" | "invisible";

  /**
   * Automatically retry upon failure to obtain a token or never retry.
   * - Data Attribute - `data-retry`
   * @defaultValue "auto"
   */
  retry?: "auto" | "never";

  /**
   * Time between retry attempts in milliseconds. Value must be between `0` and `900000`
   * (15 minutes). Only applies when `retry` is set to `auto`.
   * - Data Attribute - `data-retry-interval`
   * @defaultValue 8000
   */
  "retry-interval"?: number;

  /**
   * Controls the behavior when the token of a Turnstile widget has expired:
   *  - `"auto"` - The widget will automatically reload and restart.
   *  - `"manual"` - The user will be prompted before automatically reloading and restarting.
   *  - `"never"` - The user will not see any difference nor will the widget reload or restart.
   *
   * - Data Attribute - `data-refresh-expired`
   * @defaultValue "auto"
   */
  "refresh-expired"?: "auto" | "manual" | "never";

  /**
   * If a widget is visible, its appearance can be controlled via the `appearance` parameter:
   * - `"always"` - The widget is visible at all times.
   * - `"execute"` - The widget is visible only after the challenge begins.
   * - `"interaction-only"` - The widget is visible only when an interaction is required.
   *
   * - Data Attribute - `data-appearance`
   * @see [Appearance modes](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#appearance-modes)
   * @defaultValue "always"
   */
  appearance?: "always" | "execute" | "interaction-only";

  chlPageData?: string; // ENTERPRISE ONLY - undocumented
}

/**
 * A list of supported languages for Turnstile.
 * @see https://developers.cloudflare.com/turnstile/reference/supported-languages/
 */
export type SupportedLanguages =
  | "ar-eg"
  | "ar"
  | "bg-bg"
  | "bg"
  | "cs-cz"
  | "cs"
  | "da-dk"
  | "da"
  | "de-de"
  | "de"
  | "en-us"
  | "en"
  | "el-gr"
  | "el"
  | "es-es"
  | "es"
  | "fa-ir"
  | "fa"
  | "fi-fi"
  | "fi"
  | "fr"
  | "he-il"
  | "he"
  | "hi-in"
  | "hi"
  | "hr-hr"
  | "hr"
  | "hu-hu"
  | "hu"
  | "id-id"
  | "id"
  | "it-it"
  | "it"
  | "ja-jp"
  | "ja"
  | "ko-kr"
  | "ko"
  | "lt-lt"
  | "lt"
  | "ms-my"
  | "ms"
  | "nl-nl"
  | "nl"
  | "no-no"
  | "no"
  | "pl-pl"
  | "pl"
  | "pt-br"
  | "pt"
  | "ro-ro"
  | "ro"
  | "ru-ru"
  | "ru"
  | "sk-sk"
  | "sk"
  | "sl-si"
  | "sl"
  | "sv-se"
  | "sv"
  | "sr-ba"
  | "sr"
  | "tlh"
  | "tl-ph"
  | "tl"
  | "th-th"
  | "th"
  | "tr-tr"
  | "tr"
  | "uk-ua"
  | "uk"
  | "vi-vn"
  | "vi"
  | "zh-cn"
  | "zh-tw"
  | "zh";

declare global {
  interface Window {
    turnstile: TurnstileObject;
  }
}
