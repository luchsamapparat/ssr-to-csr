import { renderToString } from "react-dom/server";
import type { EntryContext } from "remix";
import { RemixServer } from "remix";
import { getLanguage } from "./lib/language";
import { LanguageContext } from "./lib/language-context";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const language = getLanguage(request);

  const markup = renderToString(
    <LanguageContext.Provider value={language}>
      <RemixServer context={remixContext} url={request.url} />
    </LanguageContext.Provider>
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}
