var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src-ssr/middlewares/render.js
var render_exports = {};
__export(render_exports, {
  default: () => render_default
});
var import_wrappers2, render_default;
var init_render = __esm({
  "src-ssr/middlewares/render.js"() {
    import_wrappers2 = require("quasar/wrappers");
    render_default = (0, import_wrappers2.ssrMiddleware)(({ app, resolve, render, serve }) => {
      app.get(resolve.urlPath("*"), (req, res) => {
        const userAgent = req.headers["user-agent"] || "";
        const is_h5 = userAgent.includes("Mobile");
        console.log("---logs--userAge-", userAgent);
        console.log("---logs-is_h5--", is_h5);
        res.setHeader("Content-Type", "text/html");
        render({ req, res }).then((html) => {
          res.send(html);
        }).catch((err) => {
          if (err.url) {
            if (err.code) {
              res.redirect(err.code, err.url);
            } else {
              res.redirect(err.url);
            }
          } else if (err.code === 404) {
            res.status(404).send("404 | Page Not Found");
          } else if (true) {
            serve.error({ err, req, res });
          } else {
            res.status(500).send("500 | Internal Server Error");
            if (true) {
              console.error(err.stack);
            }
          }
        });
      });
    });
  }
});

// .quasar/ssr-dev-webserver.js
var ssr_dev_webserver_exports = {};
__export(ssr_dev_webserver_exports, {
  close: () => close,
  create: () => create,
  injectMiddlewares: () => injectMiddlewares,
  listen: () => listen,
  serveStaticContent: () => serveStaticContent
});
module.exports = __toCommonJS(ssr_dev_webserver_exports);

// src-ssr/server.js
var import_express = __toESM(require("express"));
var import_compression = __toESM(require("compression"));
var import_wrappers = require("quasar/wrappers");
var create = (0, import_wrappers.ssrCreate)(() => {
  const app = (0, import_express.default)();
  app.disable("x-powered-by");
  if (false) {
    app.use((0, import_compression.default)());
  }
  return app;
});
var listen = (0, import_wrappers.ssrListen)(async ({ app, port, isReady }) => {
  await isReady();
  return app.listen(port, () => {
    if (false) {
      console.log("Server listening at port " + port);
    }
  });
});
var close = (0, import_wrappers.ssrClose)(({ listenResult }) => {
  return listenResult.close();
});
var maxAge = true ? 0 : 1e3 * 60 * 60 * 24 * 30;
var serveStaticContent = (0, import_wrappers.ssrServeStaticContent)((path, opts) => {
  return import_express.default.static(path, {
    maxAge,
    ...opts
  });
});
var jsRE = /\.js$/;
var cssRE = /\.css$/;
var woffRE = /\.woff$/;
var woff2RE = /\.woff2$/;
var gifRE = /\.gif$/;
var jpgRE = /\.jpe?g$/;
var pngRE = /\.png$/;
var renderPreloadTag = (0, import_wrappers.ssrRenderPreloadTag)((file) => {
  if (jsRE.test(file) === true) {
    return `<link rel="modulepreload" href="${file}" crossorigin>`;
  }
  if (cssRE.test(file) === true) {
    return `<link rel="stylesheet" href="${file}">`;
  }
  if (woffRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  }
  if (woff2RE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  }
  if (gifRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/gif">`;
  }
  if (jpgRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  }
  if (pngRE.test(file) === true) {
    return `<link rel="preload" href="${file}" as="image" type="image/png">`;
  }
  return "";
});

// .quasar/ssr-middlewares.js
function injectMiddlewares(opts) {
  return Promise.all([
    Promise.resolve().then(() => (init_render(), render_exports))
  ]).then(async (rawMiddlewares) => {
    const middlewares = rawMiddlewares.map((entry) => entry.default);
    for (let i = 0; i < middlewares.length; i++) {
      try {
        await middlewares[i](opts);
      } catch (err) {
        console.error("[Quasar SSR] middleware error:", err);
        return;
      }
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  close,
  create,
  injectMiddlewares,
  listen,
  serveStaticContent
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjLXNzci9taWRkbGV3YXJlcy9yZW5kZXIuanMiLCAiLi4vc3NyLWRldi13ZWJzZXJ2ZXIuanMiLCAiLi4vLi4vc3JjLXNzci9zZXJ2ZXIuanMiLCAiLi4vc3NyLW1pZGRsZXdhcmVzLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKlxuICogQERlc2NyaXB0aW9uOiBcbiAqIEBEYXRlOiAyMDIzLTA5LTMwIDIxOjA2OjQyXG4gKiBARmlsZVBhdGg6IFxcd2ViLXByb2plY3RcXHZ1ZTNcXHZ1ZTMtcXVhc2FyLXNzclxcc3JjLXNzclxcbWlkZGxld2FyZXNcXHJlbmRlci5qc1xuICovXG5pbXBvcnQgeyBzc3JNaWRkbGV3YXJlIH0gZnJvbSAncXVhc2FyL3dyYXBwZXJzJ1xuXG4vLyBUaGlzIG1pZGRsZXdhcmUgc2hvdWxkIGV4ZWN1dGUgYXMgbGFzdCBvbmVcbi8vIHNpbmNlIGl0IGNhcHR1cmVzIGV2ZXJ5dGhpbmcgYW5kIHRyaWVzIHRvXG4vLyByZW5kZXIgdGhlIHBhZ2Ugd2l0aCBWdWVcblxuZXhwb3J0IGRlZmF1bHQgc3NyTWlkZGxld2FyZSgoeyBhcHAsIHJlc29sdmUsIHJlbmRlciwgc2VydmUgfSkgPT4ge1xuICAvLyBjb25zb2xlLmxvZygnLS0tbG9ncy1jb250ZXh0LS0nLGFwcCk7XG4gIFxuICAvLyB3ZSBjYXB0dXJlIGFueSBvdGhlciBFeHByZXNzIHJvdXRlIGFuZCBoYW5kIGl0XG4gIC8vIG92ZXIgdG8gVnVlIGFuZCBWdWUgUm91dGVyIHRvIHJlbmRlciBvdXIgcGFnZVxuICBhcHAuZ2V0KHJlc29sdmUudXJsUGF0aCgnKicpLCAocmVxLCByZXMpID0+IHtcbiAgICBjb25zdCB1c2VyQWdlbnQgPSByZXEuaGVhZGVyc1sndXNlci1hZ2VudCddIHx8IFwiXCI7XG4gICAgY29uc3QgaXNfaDUgPSB1c2VyQWdlbnQuaW5jbHVkZXMoXCJNb2JpbGVcIilcbiAgICAvLyBjb25zb2xlLmxvZygnLS0tbG9ncy0tcmVxLScscmVxLmhlYWRlcnMpO1xuICAgIGNvbnNvbGUubG9nKCctLS1sb2dzLS11c2VyQWdlLScsdXNlckFnZW50KTtcbiAgICBjb25zb2xlLmxvZygnLS0tbG9ncy1pc19oNS0tJyxpc19oNSk7XG4gICAgXG4gICAgXG4gICAgXG4gICAgcmVzLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQvaHRtbCcpXG5cbiAgICByZW5kZXIoLyogdGhlIHNzckNvbnRleHQ6ICovIHsgcmVxLCByZXMgfSlcbiAgICAgIC50aGVuKGh0bWwgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnLS0tbG9ncy0taHRtbC0nLGh0bWwpO1xuICAgICAgICBcbiAgICAgICAgLy8gbm93IGxldCdzIHNlbmQgdGhlIHJlbmRlcmVkIGh0bWwgdG8gdGhlIGNsaWVudFxuICAgICAgICByZXMuc2VuZChodG1sKVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAvLyBvb3BzLCB3ZSBoYWQgYW4gZXJyb3Igd2hpbGUgcmVuZGVyaW5nIHRoZSBwYWdlXG5cbiAgICAgICAgLy8gd2Ugd2VyZSB0b2xkIHRvIHJlZGlyZWN0IHRvIGFub3RoZXIgVVJMXG4gICAgICAgIGlmIChlcnIudXJsKSB7XG4gICAgICAgICAgaWYgKGVyci5jb2RlKSB7XG4gICAgICAgICAgICByZXMucmVkaXJlY3QoZXJyLmNvZGUsIGVyci51cmwpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlcy5yZWRpcmVjdChlcnIudXJsKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChlcnIuY29kZSA9PT0gNDA0KSB7XG4gICAgICAgICAgLy8gaG1tLCBWdWUgUm91dGVyIGNvdWxkIG5vdCBmaW5kIHRoZSByZXF1ZXN0ZWQgcm91dGVcblxuICAgICAgICAgIC8vIFNob3VsZCByZWFjaCBoZXJlIG9ubHkgaWYgbm8gXCJjYXRjaC1hbGxcIiByb3V0ZVxuICAgICAgICAgIC8vIGlzIGRlZmluZWQgaW4gL3NyYy9yb3V0ZXNcbiAgICAgICAgICByZXMuc3RhdHVzKDQwNCkuc2VuZCgnNDA0IHwgUGFnZSBOb3QgRm91bmQnKVxuICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52LkRFVikge1xuICAgICAgICAgIC8vIHdlbGwsIHdlIHRyZWF0IGFueSBvdGhlciBjb2RlIGFzIGVycm9yO1xuICAgICAgICAgIC8vIGlmIHdlJ3JlIGluIGRldiBtb2RlLCB0aGVuIHdlIGNhbiB1c2UgUXVhc2FyIENMSVxuICAgICAgICAgIC8vIHRvIGRpc3BsYXkgYSBuaWNlIGVycm9yIHBhZ2UgdGhhdCBjb250YWlucyB0aGUgc3RhY2tcbiAgICAgICAgICAvLyBhbmQgb3RoZXIgdXNlZnVsIGluZm9ybWF0aW9uXG5cbiAgICAgICAgICAvLyBzZXJ2ZS5lcnJvciBpcyBhdmFpbGFibGUgb24gZGV2IG9ubHlcbiAgICAgICAgICBzZXJ2ZS5lcnJvcih7IGVyciwgcmVxLCByZXMgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB3ZSdyZSBpbiBwcm9kdWN0aW9uLCBzbyB3ZSBzaG91bGQgaGF2ZSBhbm90aGVyIG1ldGhvZFxuICAgICAgICAgIC8vIHRvIGRpc3BsYXkgc29tZXRoaW5nIHRvIHRoZSBjbGllbnQgd2hlbiB3ZSBlbmNvdW50ZXIgYW4gZXJyb3JcbiAgICAgICAgICAvLyAoZm9yIHNlY3VyaXR5IHJlYXNvbnMsIGl0J3Mgbm90IG9rIHRvIGRpc3BsYXkgdGhlIHNhbWUgd2VhbHRoXG4gICAgICAgICAgLy8gb2YgaW5mb3JtYXRpb24gYXMgd2UgZG8gaW4gZGV2ZWxvcG1lbnQpXG5cbiAgICAgICAgICAvLyBSZW5kZXIgRXJyb3IgUGFnZSBvbiBwcm9kdWN0aW9uIG9yXG4gICAgICAgICAgLy8gY3JlYXRlIGEgcm91dGUgKC9zcmMvcm91dGVzKSBmb3IgYW4gZXJyb3IgcGFnZSBhbmQgcmVkaXJlY3QgdG8gaXRcbiAgICAgICAgICByZXMuc3RhdHVzKDUwMCkuc2VuZCgnNTAwIHwgSW50ZXJuYWwgU2VydmVyIEVycm9yJylcblxuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5ERUJVR0dJTkcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgfSlcbn0pXG4iLCAiLyogZXNsaW50LWRpc2FibGUgKi9cbi8qKlxuICogVEhJUyBGSUxFIElTIEdFTkVSQVRFRCBBVVRPTUFUSUNBTExZLlxuICogRE8gTk9UIEVESVQuXG4gKiovXG5cbmltcG9ydCB7IGNyZWF0ZSwgbGlzdGVuLCBjbG9zZSwgc2VydmVTdGF0aWNDb250ZW50IH0gZnJvbSAnLi4vc3JjLXNzci9zZXJ2ZXInXG5pbXBvcnQgaW5qZWN0TWlkZGxld2FyZXMgZnJvbSAnLi9zc3ItbWlkZGxld2FyZXMnXG5cbmV4cG9ydCB7XG4gIGNyZWF0ZSxcbiAgbGlzdGVuLFxuICBjbG9zZSxcbiAgc2VydmVTdGF0aWNDb250ZW50LFxuICBpbmplY3RNaWRkbGV3YXJlc1xufVxuIiwgIi8qKlxuICogTW9yZSBpbmZvIGFib3V0IHRoaXMgZmlsZTpcbiAqIGh0dHBzOi8vdjIucXVhc2FyLmRldi9xdWFzYXItY2xpLXZpdGUvZGV2ZWxvcGluZy1zc3Ivc3NyLXdlYnNlcnZlclxuICpcbiAqIFJ1bnMgaW4gTm9kZSBjb250ZXh0LlxuICovXG5cbi8qKlxuICogTWFrZSBzdXJlIHRvIHlhcm4gYWRkIC8gbnBtIGluc3RhbGwgKGluIHlvdXIgcHJvamVjdCByb290KVxuICogYW55dGhpbmcgeW91IGltcG9ydCBoZXJlIChleGNlcHQgZm9yIGV4cHJlc3MgYW5kIGNvbXByZXNzaW9uKS5cbiAqL1xuaW1wb3J0IGV4cHJlc3MgZnJvbSAnZXhwcmVzcydcbmltcG9ydCBjb21wcmVzc2lvbiBmcm9tICdjb21wcmVzc2lvbidcbmltcG9ydCB7XG4gIHNzckNsb3NlLFxuICBzc3JDcmVhdGUsXG4gIHNzckxpc3RlbixcbiAgc3NyUmVuZGVyUHJlbG9hZFRhZyxcbiAgc3NyU2VydmVTdGF0aWNDb250ZW50XG59IGZyb20gJ3F1YXNhci93cmFwcGVycydcblxuLyoqXG4gKiBDcmVhdGUgeW91ciB3ZWJzZXJ2ZXIgYW5kIHJldHVybiBpdHMgaW5zdGFuY2UuXG4gKiBJZiBuZWVkZWQsIHByZXBhcmUgeW91ciB3ZWJzZXJ2ZXIgdG8gcmVjZWl2ZVxuICogY29ubmVjdC1saWtlIG1pZGRsZXdhcmVzLlxuICpcbiAqIFNob3VsZCBOT1QgYmUgYXN5bmMhXG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGUgPSBzc3JDcmVhdGUoKC8qIHsgLi4uIH0gKi8pID0+IHtcbiAgY29uc3QgYXBwID0gZXhwcmVzcygpXG5cbiAgLy8gYXR0YWNrZXJzIGNhbiB1c2UgdGhpcyBoZWFkZXIgdG8gZGV0ZWN0IGFwcHMgcnVubmluZyBFeHByZXNzXG4gIC8vIGFuZCB0aGVuIGxhdW5jaCBzcGVjaWZpY2FsbHktdGFyZ2V0ZWQgYXR0YWNrc1xuICBhcHAuZGlzYWJsZSgneC1wb3dlcmVkLWJ5JylcblxuICAvLyBwbGFjZSBoZXJlIGFueSBtaWRkbGV3YXJlcyB0aGF0XG4gIC8vIGFic29sdXRlbHkgbmVlZCB0byBydW4gYmVmb3JlIGFueXRoaW5nIGVsc2VcbiAgaWYgKHByb2Nlc3MuZW52LlBST0QpIHtcbiAgICBhcHAudXNlKGNvbXByZXNzaW9uKCkpXG4gIH1cblxuICByZXR1cm4gYXBwXG59KVxuXG4vKipcbiAqIFlvdSBuZWVkIHRvIG1ha2UgdGhlIHNlcnZlciBsaXN0ZW4gdG8gdGhlIGluZGljYXRlZCBwb3J0XG4gKiBhbmQgcmV0dXJuIHRoZSBsaXN0ZW5pbmcgaW5zdGFuY2Ugb3Igd2hhdGV2ZXIgeW91IG5lZWQgdG9cbiAqIGNsb3NlIHRoZSBzZXJ2ZXIgd2l0aC5cbiAqXG4gKiBUaGUgXCJsaXN0ZW5SZXN1bHRcIiBwYXJhbSBmb3IgdGhlIFwiY2xvc2UoKVwiIGRlZmluaXRpb24gYmVsb3dcbiAqIGlzIHdoYXQgeW91IHJldHVybiBoZXJlLlxuICpcbiAqIEZvciBwcm9kdWN0aW9uLCB5b3UgY2FuIGluc3RlYWQgZXhwb3J0IHlvdXJcbiAqIGhhbmRsZXIgZm9yIHNlcnZlcmxlc3MgdXNlIG9yIHdoYXRldmVyIGVsc2UgZml0cyB5b3VyIG5lZWRzLlxuICovXG5leHBvcnQgY29uc3QgbGlzdGVuID0gc3NyTGlzdGVuKGFzeW5jICh7IGFwcCwgcG9ydCwgaXNSZWFkeSB9KSA9PiB7XG4gIGF3YWl0IGlzUmVhZHkoKVxuICByZXR1cm4gYXBwLmxpc3Rlbihwb3J0LCAoKSA9PiB7XG4gICAgaWYgKHByb2Nlc3MuZW52LlBST0QpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdTZXJ2ZXIgbGlzdGVuaW5nIGF0IHBvcnQgJyArIHBvcnQpXG4gICAgfVxuICB9KVxufSlcblxuLyoqXG4gKiBTaG91bGQgY2xvc2UgdGhlIHNlcnZlciBhbmQgZnJlZSB1cCBhbnkgcmVzb3VyY2VzLlxuICogV2lsbCBiZSB1c2VkIG9uIGRldmVsb3BtZW50IG9ubHkgd2hlbiB0aGUgc2VydmVyIG5lZWRzXG4gKiB0byBiZSByZWJvb3RlZC5cbiAqXG4gKiBTaG91bGQgeW91IG5lZWQgdGhlIHJlc3VsdCBvZiB0aGUgXCJsaXN0ZW4oKVwiIGNhbGwgYWJvdmUsXG4gKiB5b3UgY2FuIHVzZSB0aGUgXCJsaXN0ZW5SZXN1bHRcIiBwYXJhbS5cbiAqXG4gKiBDYW4gYmUgYXN5bmMuXG4gKi9cbmV4cG9ydCBjb25zdCBjbG9zZSA9IHNzckNsb3NlKCh7IGxpc3RlblJlc3VsdCB9KSA9PiB7XG4gIHJldHVybiBsaXN0ZW5SZXN1bHQuY2xvc2UoKVxufSlcblxuY29uc3QgbWF4QWdlID0gcHJvY2Vzcy5lbnYuREVWXG4gID8gMFxuICA6IDEwMDAgKiA2MCAqIDYwICogMjQgKiAzMFxuXG4vKipcbiAqIFNob3VsZCByZXR1cm4gbWlkZGxld2FyZSB0aGF0IHNlcnZlcyB0aGUgaW5kaWNhdGVkIHBhdGhcbiAqIHdpdGggc3RhdGljIGNvbnRlbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBzZXJ2ZVN0YXRpY0NvbnRlbnQgPSBzc3JTZXJ2ZVN0YXRpY0NvbnRlbnQoKHBhdGgsIG9wdHMpID0+IHtcbiAgcmV0dXJuIGV4cHJlc3Muc3RhdGljKHBhdGgsIHtcbiAgICBtYXhBZ2UsXG4gICAgLi4ub3B0c1xuICB9KVxufSlcblxuY29uc3QganNSRSA9IC9cXC5qcyQvXG5jb25zdCBjc3NSRSA9IC9cXC5jc3MkL1xuY29uc3Qgd29mZlJFID0gL1xcLndvZmYkL1xuY29uc3Qgd29mZjJSRSA9IC9cXC53b2ZmMiQvXG5jb25zdCBnaWZSRSA9IC9cXC5naWYkL1xuY29uc3QganBnUkUgPSAvXFwuanBlP2ckL1xuY29uc3QgcG5nUkUgPSAvXFwucG5nJC9cblxuLyoqXG4gKiBTaG91bGQgcmV0dXJuIGEgU3RyaW5nIHdpdGggSFRNTCBvdXRwdXRcbiAqIChpZiBhbnkpIGZvciBwcmVsb2FkaW5nIGluZGljYXRlZCBmaWxlXG4gKi9cbmV4cG9ydCBjb25zdCByZW5kZXJQcmVsb2FkVGFnID0gc3NyUmVuZGVyUHJlbG9hZFRhZygoZmlsZSkgPT4ge1xuICBpZiAoanNSRS50ZXN0KGZpbGUpID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGA8bGluayByZWw9XCJtb2R1bGVwcmVsb2FkXCIgaHJlZj1cIiR7ZmlsZX1cIiBjcm9zc29yaWdpbj5gXG4gIH1cblxuICBpZiAoY3NzUkUudGVzdChmaWxlKSA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiIGhyZWY9XCIke2ZpbGV9XCI+YFxuICB9XG5cbiAgaWYgKHdvZmZSRS50ZXN0KGZpbGUpID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGA8bGluayByZWw9XCJwcmVsb2FkXCIgaHJlZj1cIiR7ZmlsZX1cIiBhcz1cImZvbnRcIiB0eXBlPVwiZm9udC93b2ZmXCIgY3Jvc3NvcmlnaW4+YFxuICB9XG5cbiAgaWYgKHdvZmYyUkUudGVzdChmaWxlKSA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBgPGxpbmsgcmVsPVwicHJlbG9hZFwiIGhyZWY9XCIke2ZpbGV9XCIgYXM9XCJmb250XCIgdHlwZT1cImZvbnQvd29mZjJcIiBjcm9zc29yaWdpbj5gXG4gIH1cblxuICBpZiAoZ2lmUkUudGVzdChmaWxlKSA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBgPGxpbmsgcmVsPVwicHJlbG9hZFwiIGhyZWY9XCIke2ZpbGV9XCIgYXM9XCJpbWFnZVwiIHR5cGU9XCJpbWFnZS9naWZcIj5gXG4gIH1cblxuICBpZiAoanBnUkUudGVzdChmaWxlKSA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiBgPGxpbmsgcmVsPVwicHJlbG9hZFwiIGhyZWY9XCIke2ZpbGV9XCIgYXM9XCJpbWFnZVwiIHR5cGU9XCJpbWFnZS9qcGVnXCI+YFxuICB9XG5cbiAgaWYgKHBuZ1JFLnRlc3QoZmlsZSkgPT09IHRydWUpIHtcbiAgICByZXR1cm4gYDxsaW5rIHJlbD1cInByZWxvYWRcIiBocmVmPVwiJHtmaWxlfVwiIGFzPVwiaW1hZ2VcIiB0eXBlPVwiaW1hZ2UvcG5nXCI+YFxuICB9XG5cbiAgcmV0dXJuICcnXG59KVxuIiwgIi8qIGVzbGludC1kaXNhYmxlICovXG4vKipcbiAqIFRISVMgRklMRSBJUyBHRU5FUkFURUQgQVVUT01BVElDQUxMWS5cbiAqIERPIE5PVCBFRElULlxuICoqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbmplY3RNaWRkbGV3YXJlcyAob3B0cykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgIFxuICAgIGltcG9ydCgnc3JjLXNzci9taWRkbGV3YXJlcy9yZW5kZXInKVxuICAgIFxuICBdKS50aGVuKGFzeW5jIHJhd01pZGRsZXdhcmVzID0+IHtcbiAgICBjb25zdCBtaWRkbGV3YXJlcyA9IHJhd01pZGRsZXdhcmVzXG4gICAgICAubWFwKGVudHJ5ID0+IGVudHJ5LmRlZmF1bHQpXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1pZGRsZXdhcmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBtaWRkbGV3YXJlc1tpXShvcHRzKVxuICAgICAgfVxuICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdbUXVhc2FyIFNTUl0gbWlkZGxld2FyZSBlcnJvcjonLCBlcnIpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgfSlcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBS0FBLGtCQU1PO0FBWFA7QUFBQTtBQUtBLElBQUFBLG1CQUE4QjtBQU05QixJQUFPLHFCQUFRLGdDQUFjLENBQUMsRUFBRSxLQUFLLFNBQVMsUUFBUSxNQUFNLE1BQU07QUFLaEUsVUFBSSxJQUFJLFFBQVEsUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLFFBQVE7QUFDMUMsY0FBTSxZQUFZLElBQUksUUFBUSxpQkFBaUI7QUFDL0MsY0FBTSxRQUFRLFVBQVUsU0FBUyxRQUFRO0FBRXpDLGdCQUFRLElBQUkscUJBQW9CLFNBQVM7QUFDekMsZ0JBQVEsSUFBSSxtQkFBa0IsS0FBSztBQUluQyxZQUFJLFVBQVUsZ0JBQWdCLFdBQVc7QUFFekMsZUFBNkIsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUN0QyxLQUFLLFVBQVE7QUFJWixjQUFJLEtBQUssSUFBSTtBQUFBLFFBQ2YsQ0FBQyxFQUNBLE1BQU0sU0FBTztBQUlaLGNBQUksSUFBSSxLQUFLO0FBQ1gsZ0JBQUksSUFBSSxNQUFNO0FBQ1osa0JBQUksU0FBUyxJQUFJLE1BQU0sSUFBSSxHQUFHO0FBQUEsWUFDaEMsT0FBTztBQUNMLGtCQUFJLFNBQVMsSUFBSSxHQUFHO0FBQUEsWUFDdEI7QUFBQSxVQUNGLFdBQVcsSUFBSSxTQUFTLEtBQUs7QUFLM0IsZ0JBQUksT0FBTyxHQUFHLEVBQUUsS0FBSyxzQkFBc0I7QUFBQSxVQUM3QyxXQUFXLE1BQWlCO0FBTzFCLGtCQUFNLE1BQU0sRUFBRSxLQUFLLEtBQUssSUFBSSxDQUFDO0FBQUEsVUFDL0IsT0FBTztBQVFMLGdCQUFJLE9BQU8sR0FBRyxFQUFF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
