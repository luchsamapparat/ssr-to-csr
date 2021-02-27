import { IncomingMessage } from "http";
import { Locales } from "locale";
import React from "react";

export const LanguageContext = React.createContext('en');

export function getLanguage(request: IncomingMessage): string {
    const supportedLocales = new Locales(['en', 'de']);
    const acceptedLocales = new Locales(request.headers['accept-language']);
    return acceptedLocales.best(supportedLocales).language;
}