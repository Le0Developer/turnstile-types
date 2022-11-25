
declare global {
    interface Window {
        turnstile: {
            render: (
                idOrContainer: string | HTMLElement,
                options: TurnstileOptions
            ) => string;
            reset: (widgetIdOrContainer?: string | HTMLElement) => void;
            getResponse: (
                widgetIdOrContainer?: string | HTMLElement
            ) => string | undefined;
            remove: (widgetIdOrContainer?: string | HTMLElement) => void;
        };
    }
}

export interface TurnstileOptions {
    sitekey: string;
    action?: string;
    cData?: string;
    callback?: (token: string) => void;
    "error-callback"?: () => void;
    "expired-callback"?: () => void;
    "timeout-callback"?: () => void;
    theme?: "light" | "dark" | "auto"; // defaults to auto
    tabindex?: number;
    "response-field"?: boolean; // defaults to true
    "response-field-name"?: string; // defaults to cf-turnstile-response
    size?: "normal" | "invisible" | "compact";
    retry?: "auto" | "never";
    retryInterval?: number; // up to 15m (900_000) in ms, default is 8s
}
