
export type ElementId = string;
export type WidgetId = string;
export type Container = ElementId | HTMLElement;

declare global {
    interface Window {
        turnstile: TurnstileObject;
    }
}

export interface TurnstileObject {
    render: (
        container: Container,
        options: TurnstileOptions
    ) => WidgetId;
    reset: (widget?: Container | WidgetId) => void;
    getResponse: (widget?: Container | WidgetId) => string | undefined;
    remove: (widget?: Container | WidgetId) => void;
}

export interface TurnstileOptions {
    sitekey: string;
    action?: string;
    cData?: string;
    callback?: (token: string) => void;
    "error-callback"?: () => void;
    "expired-callback"?: (token: string) => void;
    "timeout-callback"?: () => void;
    theme?: "light" | "dark" | "auto"; // defaults to "auto"
    language?: SupportedLanguages | "auto"; // defaults to "auto"
    tabindex?: number; // defaults to 0
    "response-field"?: boolean; // defaults to true
    "response-field-name"?: string; // defaults to "cf-turnstile-response"
    size?: "normal" | "invisible" | "compact"; // defaults to "normal"
    retry?: "auto" | "never"; // defaults to "auto"
    "retry-interval"?: number; // up to 15m (900_000) in ms, defaults to 8s
    "refresh-expired"?: "auto" | "manual" | "never"; // defaults to "auto"
    appearance?: "always" | "execute" | "interaction-only";
    execution?: "render" |  "execute";
}

export type SupportedLanguages = "ar-eg" | "de" | "en" | "es" | "fa" | "fr" | "id" | "it" | "ja" | "ko" | "nl" | "pl" | "pt-br" | "ru" | "tr" | "zh-cn" | "zh-tw";
