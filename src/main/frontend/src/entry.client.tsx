import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";
import { LanguageContext } from "./lib/language-context";

hydrate(
    <LanguageContext.Provider value={navigator.language}>
        <RemixBrowser />
    </LanguageContext.Provider>,
    document
);
