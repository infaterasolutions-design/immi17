module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/vm [external] (vm, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("vm", () => require("vm"));

module.exports = mod;
}),
"[project]/lib/data.js [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

// ── ES6 module re-export of data for Next.js SSR pages ──
// The original data.js uses window globals for the browser SPA.
// This file provides the same data as ES6 exports for server-side use.
// We dynamically read the data.js file and extract the objects
// Since data.js uses template literals and window globals that can't run on server,
// we maintain a simplified reference here.
// For SSR pages, import from this file: import { NewsData } from '../lib/data'
const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
const vm = __turbopack_context__.r("[externals]/vm [external] (vm, cjs)");
function loadData() {
    const dataPath = path.join(process.cwd(), 'public', 'data.js');
    const code = fs.readFileSync(dataPath, 'utf-8');
    // Create a sandboxed context with a fake window object
    const sandbox = {
        window: {}
    };
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox);
    return {
        AdminConfig: sandbox.window.AdminConfig,
        NewsData: sandbox.window.NewsData,
        LiveUpdatesData: sandbox.window.LiveUpdatesData
    };
}
const data = loadData();
module.exports = {
    AdminConfig: data.AdminConfig,
    NewsData: data.NewsData,
    LiveUpdatesData: data.LiveUpdatesData
};
}),
"[project]/pages/article/[id].js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ArticlePage,
    "getServerSideProps",
    ()=>getServerSideProps
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
;
;
;
;
const { NewsData, AdminConfig } = __turbopack_context__.r("[project]/lib/data.js [ssr] (ecmascript)");
function ArticlePage({ article, relatedArticles, sponsoredContent, latestNews, mostViewed }) {
    const sliderRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const scrollLeft = ()=>{
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: -320,
                behavior: 'smooth'
            });
        }
    };
    const scrollRight = ()=>{
        if (sliderRef.current) {
            sliderRef.current.scrollBy({
                left: 320,
                behavior: 'smooth'
            });
        }
    };
    if (!article) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-[60vh]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "text-slate-500 text-lg",
                children: "Article not found."
            }, void 0, false, {
                fileName: "[project]/pages/article/[id].js",
                lineNumber: 23,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/article/[id].js",
            lineNumber: 22,
            columnNumber: 7
        }, this);
    }
    const location = article.location || 'Washington, D.C.';
    const time = article.time || '10:00 AM EDT';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: [
                            article.title,
                            " | The Digital Diplomat"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: article.title
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: article.title
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:image",
                        content: article.image
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:type",
                        content: "article"
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/article/[id].js",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "max-w-[1320px] mx-auto px-6 py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "max-w-[1100px] mx-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-8 w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "mb-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] font-bold text-primary uppercase tracking-widest",
                                                            children: article.category?.replace(/-/g, ' ')
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/article/[id].js",
                                                            lineNumber: 53,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "w-1 h-1 bg-slate-300"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/article/[id].js",
                                                            lineNumber: 56,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] font-bold text-primary uppercase tracking-widest",
                                                            children: article.tag
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/article/[id].js",
                                                            lineNumber: 57,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 52,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                                    className: "text-3xl lg:text-4xl font-bold headline-font text-slate-900 leading-tight mb-4",
                                                    children: article.title
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 59,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-slate-500 mt-2",
                                                    children: [
                                                        location,
                                                        " • ",
                                                        article.date,
                                                        " at ",
                                                        time
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 62,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 51,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "mb-10",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                src: article.image,
                                                alt: article.title,
                                                className: "w-full h-auto max-h-[500px] object-cover"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 67,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 66,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "prose prose-slate prose-lg max-w-none mb-16",
                                            dangerouslySetInnerHTML: {
                                                __html: article.content
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 71,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "mb-16 flex flex-wrap gap-2 items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-bold text-slate-800 mr-2",
                                                    children: "Suggested Topics:"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 78,
                                                    columnNumber: 15
                                                }, this),
                                                article.tag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-full hover:bg-slate-200 cursor-pointer transition-colors",
                                                    children: [
                                                        "#",
                                                        article.tag
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 80,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 77,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 48,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("aside", {
                                    className: "lg:col-span-4 space-y-12",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "relative space-y-12",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "bg-slate-50 border border-slate-200 p-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                        className: "font-bold text-sm tracking-widest uppercase text-primary mb-6 font-['Plus_Jakarta_Sans']",
                                                        children: "Latest News"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 94,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "space-y-6",
                                                        children: latestNews?.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                href: `/article/${item.id}`,
                                                                className: "group block",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        className: "text-[10px] font-bold text-slate-500 mb-1",
                                                                        children: i === 0 ? 'BREAKING' : item.date
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/article/[id].js",
                                                                        lineNumber: 98,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                                        className: "text-sm font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors",
                                                                        children: item.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/article/[id].js",
                                                                        lineNumber: 99,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, item.id, true, {
                                                                fileName: "[project]/pages/article/[id].js",
                                                                lineNumber: 97,
                                                                columnNumber: 21
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 95,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 93,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "mb-12",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                        className: "font-bold text-sm tracking-widest uppercase text-slate-900 mb-6 font-['Plus_Jakarta_Sans']",
                                                        children: "Most Viewed"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 107,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "space-y-8",
                                                        children: mostViewed?.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "flex gap-4 relative group cursor-pointer hover:bg-slate-50 transition-colors p-2 -mx-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                        href: `/article/${item.id}`,
                                                                        className: "absolute inset-0 z-10",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "sr-only",
                                                                            children: "Read More"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/article/[id].js",
                                                                            lineNumber: 111,
                                                                            columnNumber: 92
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/article/[id].js",
                                                                        lineNumber: 111,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        className: "text-3xl font-black text-slate-200 italic font-['Plus_Jakarta_Sans']",
                                                                        children: String(i + 1).padStart(2, '0')
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/article/[id].js",
                                                                        lineNumber: 112,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                                                className: "text-sm font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors",
                                                                                children: item.title
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/article/[id].js",
                                                                                lineNumber: 114,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                                className: "text-[10px] text-slate-500 font-medium uppercase tracking-tighter",
                                                                                children: [
                                                                                    item.tag,
                                                                                    " • ",
                                                                                    Math.floor(Math.random() * 15 + 5),
                                                                                    "k views"
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/pages/article/[id].js",
                                                                                lineNumber: 115,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/pages/article/[id].js",
                                                                        lineNumber: 113,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, item.id, true, {
                                                                fileName: "[project]/pages/article/[id].js",
                                                                lineNumber: 110,
                                                                columnNumber: 21
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 108,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 106,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "bg-primary p-8 text-white relative overflow-hidden",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "relative z-10",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "material-symbols-outlined mb-4",
                                                            children: "mail"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/article/[id].js",
                                                            lineNumber: 125,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                            className: "font-extrabold text-xl mb-2 font-['Plus_Jakarta_Sans']",
                                                            children: "Editorial Digest"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/article/[id].js",
                                                            lineNumber: 126,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: "text-sm text-white/80 leading-relaxed mb-6",
                                                            children: "Stay updated with critical immigration law changes delivered to your inbox weekly."
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/article/[id].js",
                                                            lineNumber: 127,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "space-y-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                    className: "w-full bg-white/10 border-white/20 px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none",
                                                                    placeholder: "Email address",
                                                                    type: "email"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/article/[id].js",
                                                                    lineNumber: 129,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                    className: "w-full bg-white text-primary font-bold py-3 px-4 text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-colors",
                                                                    children: "Subscribe Now"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/article/[id].js",
                                                                    lineNumber: 130,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/article/[id].js",
                                                            lineNumber: 128,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 124,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 123,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 89,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/article/[id].js",
                            lineNumber: 45,
                            columnNumber: 9
                        }, this),
                        relatedArticles?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                            className: "border-t border-slate-200 pt-10 mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                            className: "text-xl md:text-2xl font-bold headline-font text-slate-900 border-l-4 border-primary pl-4",
                                            children: "Related Articles"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 146,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "hidden md:flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    onClick: scrollLeft,
                                                    className: "w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-slate-600",
                                                        children: "chevron_left"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 149,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 148,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    onClick: scrollRight,
                                                    className: "w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-slate-600",
                                                        children: "chevron_right"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 152,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 151,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 147,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 145,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        ref: sliderRef,
                                        className: `flex overflow-x-auto snap-x snap-mandatory gap-6 pb-2 ${relatedArticles.length < 3 ? 'md:justify-center' : ''}`,
                                        style: {
                                            scrollbarWidth: 'none',
                                            msOverflowStyle: 'none'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("style", {
                                                dangerouslySetInnerHTML: {
                                                    __html: `
                  div::-webkit-scrollbar { display: none; }
                `
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 164,
                                                columnNumber: 17
                                            }, this),
                                            relatedArticles.map((related)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/article/${related.id}`,
                                                    className: "snap-start shrink-0 group border border-slate-200/60 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 w-[85%] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex flex-col bg-white",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "aspect-[16/9] w-full relative overflow-hidden bg-slate-100",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                                src: related.image,
                                                                alt: related.title,
                                                                className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                                                                loading: "lazy"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/article/[id].js",
                                                                lineNumber: 176,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/article/[id].js",
                                                            lineNumber: 175,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "p-5 flex-grow flex flex-col",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] font-bold text-primary uppercase tracking-widest mb-2 inline-block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left w-max",
                                                                    children: related.tag
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/article/[id].js",
                                                                    lineNumber: 184,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                                    className: "text-lg font-bold headline-font text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-2",
                                                                    children: related.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/article/[id].js",
                                                                    lineNumber: 187,
                                                                    columnNumber: 23
                                                                }, this),
                                                                related.shortDesc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-slate-500 line-clamp-2 mt-auto",
                                                                    children: related.shortDesc
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/article/[id].js",
                                                                    lineNumber: 191,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/article/[id].js",
                                                            lineNumber: 183,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, related.id, true, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 170,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 158,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 157,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/article/[id].js",
                            lineNumber: 144,
                            columnNumber: 11
                        }, this),
                        sponsoredContent?.enabled && sponsoredContent?.items?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                            className: "border-t border-slate-200 pt-10 pb-8 mt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center mb-6 px-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                            className: "text-[16px] md:text-[18px] font-bold text-slate-700 tracking-tight",
                                            children: "Sponsored Content"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 207,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            className: "text-[11px] font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider",
                                            children: "Advertise Here"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 208,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 206,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "bg-white border border-slate-200 py-6 px-4 sm:px-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8",
                                        children: sponsoredContent.items.slice(0, sponsoredContent.maxItems || 6).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                                href: item.url,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "flex items-start justify-between gap-4 group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 pr-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                                className: "text-[13px] sm:text-[14px] font-semibold text-slate-700 group-hover:text-primary transition-colors leading-[1.4] mb-1.5",
                                                                children: item.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/article/[id].js",
                                                                lineNumber: 222,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "text-[11px] text-slate-400 font-medium tracking-tight",
                                                                children: [
                                                                    "Sponsored by ",
                                                                    item.sponsor
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/article/[id].js",
                                                                lineNumber: 225,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 221,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "w-[85px] h-[85px] shrink-0 bg-slate-100 overflow-hidden",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                            src: item.image,
                                                            alt: item.title,
                                                            className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500",
                                                            loading: "lazy"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/article/[id].js",
                                                            lineNumber: 230,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 229,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, item.id, true, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 214,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 212,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 211,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/article/[id].js",
                            lineNumber: 205,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/article/[id].js",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/article/[id].js",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
async function getServerSideProps(context) {
    const { id } = context.params;
    const articleId = parseInt(id, 10);
    const article = NewsData.find((a)=>a.id === articleId) || null;
    if (!article) {
        return {
            notFound: true
        };
    }
    // ── Dynamic hybrid caching based on article age ──
    const publishDate = new Date(article.date);
    const now = new Date();
    const ageDays = (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24);
    if (ageDays > 3) {
        // Old article → SSG-like: cache at edge for 24 hours
        context.res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400');
    } else {
        // New article → SSR: re-render every 60 seconds
        context.res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=59');
    }
    // Data logic for related articles
    const relatedConfig = AdminConfig?.relatedArticles || {
        enabled: true,
        mode: 'auto',
        manualIds: []
    };
    let rawRelatedArticles = [];
    if (relatedConfig.enabled) {
        if (relatedConfig.mode === 'manual' && relatedConfig.manualIds?.length > 0) {
            rawRelatedArticles = NewsData.filter((a)=>relatedConfig.manualIds.includes(a.id)).slice(0, 4);
        } else {
            // Auto mode: Same category, then tags, exclude current, sort by latest (assuming IDs descending for latest), limit 4
            rawRelatedArticles = NewsData.filter((a)=>a.id !== article.id && a.category === article.category).sort((a, b)=>b.id - a.id).slice(0, 4);
        }
    }
    const relatedArticles = rawRelatedArticles.map(({ content, ...rest })=>({
            ...rest,
            shortDesc: content?.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' || ''
        }));
    const sponsoredContent = AdminConfig?.sponsoredContent || {
        enabled: false,
        items: []
    };
    // Sidebar data: Latest News (3 most recent, exclude current)
    const latestNews = NewsData.filter((a)=>a.id !== articleId && a.id !== 999).sort((a, b)=>b.id - a.id).slice(0, 3).map(({ content, ...rest })=>rest);
    // Sidebar data: Most Viewed (pick 3 different articles)
    const mostViewed = NewsData.filter((a)=>a.id !== articleId && a.id !== 999).slice(0, 6).sort(()=>0.5 - Math.random()).slice(0, 3).map(({ content, ...rest })=>rest);
    return {
        props: {
            article,
            relatedArticles,
            sponsoredContent,
            latestNews,
            mostViewed
        }
    };
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0qqf~hm._.js.map