self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/article/[id]": [
    "static/chunks/pages/article/[id].js"
  ],
  "/category/[category]": [
    "static/chunks/pages/category/[category].js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/_app",
    "/_error",
    "/article/[id]",
    "/category/[category]",
    "/category/[...category]"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()