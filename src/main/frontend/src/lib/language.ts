import { Locales } from "locale";

export function getLanguage(request: Request): string {
    const supportedLocales = new Locales(['en', 'de']);
    const acceptedLocales = new Locales(request.headers.get('accept-language'));
    return acceptedLocales.best(supportedLocales).language;
}