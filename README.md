# To-Do App

This repository contains six implementations of a to-do app ranging from pure server-side rendering to client-side rendering using an single-page application framework.

Each implementation has its own branch. That way you can compare the implementations using GitHub's branch comparison feature.

1. [Server-Side Rendering](https://github.com/luchsamapparat/ssr-to-csr/tree/01-ssr)&nbsp;&nbsp;&nbsp;<small>[💻 Live-Demo](https://todo-app-1.holisticon.de/)</small>

    This implementation uses server-side rendering only and does not contain any client-side scripting. Each content update requires a full page reload.

    The server is implemented with [Spring Boot](https://spring.io/projects/spring-boot) and uses the [Thymeleaf](https://www.thymeleaf.org/) templating engine.

2. [Server-Side Rendering with Progressive Enhancement](https://github.com/luchsamapparat/ssr-to-csr/tree/02-ssr-with-progressive-enhancement)&nbsp;&nbsp;&nbsp;<small>[🔎 compare with previous](https://github.com/luchsamapparat/ssr-to-csr/compare/01-ssr...02-ssr-with-progressive-enhancement#files_bucket)&nbsp;&nbsp;&nbsp;[💻 Live-Demo](https://todo-app-2.holisticon.de/)</small>

    This implementation is basically identical to the pure server-side rendering variant however [some client-side scripting](https://github.com/luchsamapparat/ssr-to-csr/blob/02-ssr-with-progressive-enhancement/src/main/resources/static/script.js) to progressively enhance the page for a slightly better user experience:

    * The task list form will be submitted automatically when marking a task as completed.
    * Thus, the "Mark as Completed" button will ne removed as it is no longer required.
    * The form fields of the "New Task" won't have validation styling until they've been touched for the first time.

3. [Server-Side Rendering with Partial DOM Updates](https://github.com/luchsamapparat/ssr-to-csr/tree/03-ssr-with-partial-dom-updates)&nbsp;&nbsp;&nbsp;<small>[🔎 compare with previous](https://github.com/luchsamapparat/ssr-to-csr/compare/02-ssr-with-progressive-enhancement...03-ssr-with-partial-dom-updates#files_bucket)&nbsp;&nbsp;&nbsp;[💻 Live-Demo](https://todo-app-3.holisticon.de/)</small>

    Again, the server-side rendering implementation is the same as in the previous two iterations, but content updates do not require a page reload anymore. Instead, the [client implementation](https://github.com/luchsamapparat/ssr-to-csr/tree/03-ssr-with-partial-dom-updates/src/main/resources/static) now updates the UI dynamically:
       
    * The task list form and the "New Task" form are submitted as asynchronous background requests.
    * Outdated parts of the UI are then replaced by the updated parts from the HTML response via DOM manipulation.

    To keep the client-side code maintainable, [Backbone.js](https://backbonejs.org/) is introduced as library to encapsulate different parts of the UI as views.
    
    This implementation is still works by progressively enhancing the initial server-side rendered page. If JavaScript is not available, the application behaves excactly the same as the first one without client-side scripting.

4. [Server-Side Rendering with Partial Client-Side Rendering](https://github.com/luchsamapparat/ssr-to-csr/tree/04-ssr-with-partial-csr)&nbsp;&nbsp;&nbsp;<small>[🔎 compare with previous](https://github.com/luchsamapparat/ssr-to-csr/compare/03-ssr-with-partial-dom-updates...04-ssr-with-partial-csr#files_bucket)&nbsp;&nbsp;&nbsp;[💻 Live-Demo](https://todo-app-4.holisticon.de/)</small>

    In this iteration, [a JSON API](https://github.com/luchsamapparat/ssr-to-csr/blob/04-ssr-with-partial-csr/src/main/java/org/luchs/marvin/ssrtodo/TodoApiController.java) has been added, which is used by the client instead of the [HTML API](https://github.com/luchsamapparat/ssr-to-csr/blob/04-ssr-with-partial-csr/src/main/java/org/luchs/marvin/ssrtodo/TodoController.java):
    
    * The server now exposes JSON endpoints in addition to the existing HTML endpoints.
    * The client communicates with the JSON API when submitting the task list and "New Task" forms.
    * To translate the JSON responses into DOM updates, the client uses templates to render HTML.

    As with the previous implementation, progressive enhancement techniques still allow the application to work when JavaScript is not available.

5. [Client-Side Rendering with a Single-Page Application](https://github.com/luchsamapparat/ssr-to-csr/tree/05-csr-with-spa)&nbsp;&nbsp;&nbsp;<small>[🔎 compare with previous](https://github.com/luchsamapparat/ssr-to-csr/compare/04-ssr-with-partial-csr...05-csr-with-spa#files_bucket)&nbsp;&nbsp;&nbsp;[💻 Live-Demo](https://todo-app-5.holisticon.de/)</small>

    By implementing [the UI as a single-page application](https://github.com/luchsamapparat/ssr-to-csr/tree/05-csr-with-spa/src/main/frontend), the to-do app has been split into two separate applications:

    * The server application has been greatly simplified by only providing a JSON API and serving static assets for the client.
    * The UI is implement by a separate client application which acts as a single-page application which means that the client takes on all rendering responsibilities and even "page" changes are done by the content of the current page dynamically.
    * Both applications are more loosly coupled to each other as all communication between the two only happens based via the JSON API.
    * The complexity of the client now requires its own build process.
    
    By moving all rendering responsibilities to the client, this iteration does not work at all without JavaScript.

    Backbone.js has been replaced with [React](https://reactjs.org/) to implement the client as a single-page application.

6. [Server-Side Rendering with Client-Side Rehydration](https://github.com/luchsamapparat/ssr-to-csr/tree/06-ssr-with-rehydration)&nbsp;&nbsp;&nbsp;<small>[🔎 compare with previous](https://github.com/luchsamapparat/ssr-to-csr/compare/05-csr-with-spa...06-ssr-with-rehydration#files_bucket)&nbsp;&nbsp;&nbsp;[💻 Live-Demo](https://todo-app-6.holisticon.de/)</small>

    Making use of the [server-side rendering capabilities](https://github.com/luchsamapparat/ssr-to-csr/blob/06-ssr-with-rehydration/src/main/frontend/src/pages/index.tsx#L49) of the client-side application framework, the initial rendering is now done server-side again. After that, the client application takes over and does all further rendering even when navigating to other "pages".

    * Using client-side technologies for server-side rendering requires a JavaScript-based server runtime. Therefore, the client is not being served by the existing server application anymore but brings its own webserver.
    * Data fetching in the client application has been updated to enable server-side rendering.
    
    At this point the API application does not know anything about its client anymore besides its ability to communicate via HTTP and JSON.

    The existing client application has been migrated to [Next.js](https://nextjs.org/) to be able to use server-side rendering with React.