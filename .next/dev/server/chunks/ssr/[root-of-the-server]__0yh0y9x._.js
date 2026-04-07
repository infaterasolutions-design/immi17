module.exports = [
"[project]/lib/data.js [ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

// ── ES6 module re-export of data for Next.js SSR pages ──
// The original data.js uses window globals for the browser SPA.
// This file provides the same data as ES6 exports for server-side use.
// We dynamically read the data.js file and extract the objects
// Since data.js uses template literals and window globals that can't run on server,
// we maintain a simplified reference here.
// For SSR pages, import from this file: import { NewsData } from '../lib/data'
let AdminConfig, NewsData, LiveUpdatesData;
if ("TURBOPACK compile-time truthy", 1) {
    // Server-side: Safely require Node modules hiding them from Webpack static analysis
    // Webpack uses static analysis, so eval prevents 'Module not found' errors on client builds.
    const fs = eval("require('fs')");
    const path = eval("require('path')");
    const vm = eval("require('vm')");
    const dataPath = path.join(process.cwd(), 'public', 'data.js');
    const code = fs.readFileSync(dataPath, 'utf-8');
    // Create a sandboxed context with a fake window object
    const sandbox = {
        window: {}
    };
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox);
    AdminConfig = sandbox.window.AdminConfig;
    NewsData = sandbox.window.NewsData;
    LiveUpdatesData = sandbox.window.LiveUpdatesData;
} else //TURBOPACK unreachable
;
module.exports = {
    AdminConfig,
    NewsData,
    LiveUpdatesData
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
/* ═══════════════════════════════════════════════════════
   ArticleBlock — Self-contained article with its own state
   Includes: Keep Reading, Suggested Topics, Related Articles, Sponsored Content
   ═══════════════════════════════════════════════════════ */ function ArticleBlock({ art, isFirst, onVisible, allArticles, sponsoredContent }) {
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [shareOpen, setShareOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const shareRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const sentinelRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const sliderRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const location = art.location || 'Washington, D.C.';
    const time = art.time || '10:00 AM EDT';
    // Compute related articles for this article (same category, exclude self)
    const relatedArticles = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        return (allArticles || []).filter((a)=>a.id !== art.id && a.category === art.category).sort((a, b)=>b.id - a.id).slice(0, 4).map(({ content, ...rest })=>({
                ...rest,
                shortDesc: content?.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' || ''
            }));
    }, [
        art.id,
        art.category,
        allArticles
    ]);
    const scrollLeft = ()=>{
        if (sliderRef.current) sliderRef.current.scrollBy({
            left: -320,
            behavior: 'smooth'
        });
    };
    const scrollRight = ()=>{
        if (sliderRef.current) sliderRef.current.scrollBy({
            left: 320,
            behavior: 'smooth'
        });
    };
    // Close share dropdown on outside click
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        function handleClickOutside(e) {
            if (shareRef.current && !shareRef.current.contains(e.target)) {
                setShareOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return ()=>document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    // IntersectionObserver to update URL when this article is in view
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!sentinelRef.current) return;
        const observer = new IntersectionObserver(([entry])=>{
            if (entry.isIntersecting && onVisible) {
                onVisible(art.id, art.title);
            }
        }, {
            threshold: 0.3
        });
        observer.observe(sentinelRef.current);
        return ()=>observer.disconnect();
    }, [
        art.id,
        art.title,
        onVisible
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("article", {
        ref: sentinelRef,
        className: "article-instance relative pb-12 border-b-2 border-slate-100",
        "data-article-id": art.id,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "bg-blue-100 text-primary px-3 py-1 text-[10px] font-bold tracking-widest uppercase font-['Inter']",
                                children: [
                                    art.category?.replace(/-/g, ' '),
                                    art.tag ? ` | ${art.tag}` : ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "text-slate-300 text-xs",
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "text-slate-500 text-xs font-medium",
                                children: "8 min read"
                            }, void 0, false, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: `${isFirst ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'} font-extrabold font-['Plus_Jakarta_Sans'] leading-[1.1] text-slate-900 mb-6 tracking-tight`,
                        children: art.title
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    art.shortDesc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-xl md:text-[22px] text-slate-500 font-light leading-snug mb-10",
                        children: art.shortDesc
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 mb-10 pb-8 border-b border-slate-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "w-12 h-12 overflow-hidden bg-slate-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                    className: "w-full h-full object-cover",
                                    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlpFlSWOxpjJiSoeARkHCAEsvWdJ2SZDIpSxixs1n3L0rg6kDpyx4fBBsQUzO3AC-OSmrkT36GClfkVfQLMRGcckkL6D3hyt3sLTNovArIgGZXzAqZgE4gYg81EiYz0YQEtFYaQVRuX8VqDZ9bVzy_H71rQpkYYYzmeT0GHoAMKQhg3OIFsfeaBavT5evFro0cvQVHv80qgh7lAqczXoHTa6qu3lRhBHtZskD9IeB8ndXzJ4phYM2bbTP5lKG7a709K-YpX9pg9lM",
                                    alt: "Editorial Team"
                                }, void 0, false, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "text-slate-900 font-bold text-sm",
                                        children: "Editorial Team"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 93,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "text-slate-500 text-xs",
                                        children: [
                                            location,
                                            " • ",
                                            art.date,
                                            " at ",
                                            time
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 94,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/article/[id].js",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "mb-12 relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex justify-end items-center gap-2 mb-2 relative z-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                title: "Like this article",
                                className: "w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all duration-300 text-slate-600 shadow-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined text-[18px]",
                                    children: "favorite"
                                }, void 0, false, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                title: "Save article",
                                className: "w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 hover:text-slate-900 transition-all duration-300 text-slate-600 shadow-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined text-[18px]",
                                    children: "bookmark"
                                }, void 0, false, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 106,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "relative",
                                ref: shareRef,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        title: "Share this article",
                                        onClick: ()=>setShareOpen(!shareOpen),
                                        className: "share-btn w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 text-slate-600 shadow-sm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined text-[18px]",
                                            children: "share"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 110,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: `absolute top-full right-0 mt-3 bg-white shadow-2xl border border-slate-100 rounded-lg py-2 px-1 w-auto flex flex-col items-center gap-1 z-30 transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] origin-top-right ${shareOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "flex items-center justify-center w-10 h-10 hover:bg-slate-100 transition-colors rounded",
                                                onClick: ()=>window.open('https://facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.origin + '/article/' + art.id)),
                                                title: "Share on Facebook",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                    src: "/Facebook.jpeg",
                                                    className: "w-6 h-6 rounded-sm object-cover",
                                                    alt: "Facebook"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 114,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 113,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "flex items-center justify-center w-10 h-10 hover:bg-slate-100 transition-colors rounded",
                                                onClick: ()=>window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.origin + '/article/' + art.id)),
                                                title: "Share on X",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                    src: "/Twitter.jpg",
                                                    className: "w-6 h-6 rounded-sm object-cover",
                                                    alt: "X / Twitter"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 117,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 116,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "flex items-center justify-center w-10 h-10 hover:bg-slate-100 transition-colors rounded",
                                                onClick: ()=>window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.origin + '/article/' + art.id)),
                                                title: "Share on LinkedIn",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                    src: "/Linkdin.png",
                                                    className: "w-6 h-6 rounded-sm object-cover",
                                                    alt: "LinkedIn"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 120,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 119,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "flex items-center justify-center w-10 h-10 hover:bg-slate-100 transition-colors rounded",
                                                onClick: ()=>{
                                                    window.location.href = 'mailto:?subject=Read this article&body=' + encodeURIComponent(window.location.origin + '/article/' + art.id);
                                                },
                                                title: "Share via Email",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                    src: "/Mail.jpeg",
                                                    className: "w-6 h-6 rounded-sm object-cover",
                                                    alt: "Email"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 123,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 122,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "h-px bg-slate-100 my-1 w-full mx-2"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 125,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "flex items-center justify-center w-10 h-10 hover:bg-slate-100 transition-colors rounded text-slate-500",
                                                onClick: ()=>{
                                                    navigator.clipboard.writeText(window.location.origin + '/article/' + art.id);
                                                    setShareOpen(false);
                                                },
                                                title: "Copy Link",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "material-symbols-outlined text-[18px]",
                                                    children: "link"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 127,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 126,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 112,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "overflow-hidden shadow-2xl shadow-slate-200/50",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                src: art.image,
                                alt: art.title,
                                className: "w-full aspect-[16/9] object-cover"
                            }, void 0, false, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "p-4 bg-slate-50 text-slate-500 text-[11px] italic font-medium",
                                children: "Photography by USCIS Editorial Team."
                            }, void 0, false, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 132,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/article/[id].js",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "relative mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "relative overflow-hidden transition-all duration-1000 ease-in-out",
                        style: {
                            maxHeight: expanded ? '50000px' : '400px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "prose prose-slate prose-lg max-w-none",
                                dangerouslySetInnerHTML: {
                                    __html: art.content
                                }
                            }, void 0, false, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this),
                            expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "mt-16 mb-4 flex flex-wrap gap-2 items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold text-slate-800 mr-2",
                                        children: "Suggested Topics:"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 152,
                                        columnNumber: 15
                                    }, this),
                                    art.tag && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-full hover:bg-slate-200 cursor-pointer transition-colors",
                                        children: [
                                            "#",
                                            art.tag
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 154,
                                        columnNumber: 17
                                    }, this),
                                    art.category && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-full hover:bg-slate-200 cursor-pointer transition-colors",
                                        children: [
                                            "#",
                                            art.category.replace(/-/g, ' ')
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 159,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 151,
                                columnNumber: 13
                            }, this),
                            !expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10"
                            }, void 0, false, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 168,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    !expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex justify-center -mt-6 relative z-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: ()=>setExpanded(true),
                            className: "bg-slate-900 text-white font-bold text-xs tracking-widest uppercase px-8 py-4 shadow-xl hover:bg-primary transition-colors flex items-center gap-2",
                            children: [
                                "Keep Reading ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                    className: "material-symbols-outlined text-sm",
                                    children: "expand_more"
                                }, void 0, false, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 178,
                                    columnNumber: 28
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/article/[id].js",
                            lineNumber: 174,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 173,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/article/[id].js",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                children: [
                    relatedArticles.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "w-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                            className: "border-t border-slate-200 pt-10 mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                            className: "text-xl md:text-2xl font-bold headline-font text-slate-900 border-l-4 border-primary pl-4",
                                            children: "Related Articles"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 192,
                                            columnNumber: 21
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
                                                        lineNumber: 195,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 194,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    onClick: scrollRight,
                                                    className: "w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "material-symbols-outlined text-slate-600",
                                                        children: "chevron_right"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 198,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 197,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 193,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 191,
                                    columnNumber: 19
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
                                        children: relatedArticles.map((related)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                                            lineNumber: 215,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 214,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "p-5 flex-grow flex flex-col",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] font-bold text-primary uppercase tracking-widest mb-2 inline-block w-max",
                                                                children: related.tag
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/article/[id].js",
                                                                lineNumber: 218,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                                className: "text-lg font-bold headline-font text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-2",
                                                                children: related.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/article/[id].js",
                                                                lineNumber: 221,
                                                                columnNumber: 29
                                                            }, this),
                                                            related.shortDesc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-slate-500 line-clamp-2 mt-auto",
                                                                children: related.shortDesc
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/article/[id].js",
                                                                lineNumber: 225,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 217,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, related.id, true, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 209,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 203,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 202,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/article/[id].js",
                            lineNumber: 190,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 189,
                        columnNumber: 13
                    }, this),
                    sponsoredContent?.enabled && sponsoredContent?.items?.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            width: '160%',
                            maxWidth: '1050px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                            className: "border-t border-slate-200 pt-10 pb-4 mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center mb-6 px-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                            className: "text-[16px] md:text-[18px] font-bold text-slate-700 tracking-tight",
                                            children: "Sponsored Content"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 241,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            className: "text-[11px] font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider",
                                            children: "Advertise Here"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 242,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 240,
                                    columnNumber: 19
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
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                                className: "text-[13px] sm:text-[14px] font-semibold text-slate-700 group-hover:text-primary transition-colors leading-[1.4] mb-1.5",
                                                                children: item.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/article/[id].js",
                                                                lineNumber: 249,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "text-[11px] text-slate-400 font-medium tracking-tight",
                                                                children: [
                                                                    "Sponsored by ",
                                                                    item.sponsor
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/article/[id].js",
                                                                lineNumber: 252,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 248,
                                                        columnNumber: 27
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
                                                            lineNumber: 255,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 254,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, item.id, true, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 247,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 245,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 244,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/article/[id].js",
                            lineNumber: 239,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 238,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/article/[id].js",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
function ArticlePage({ article, sponsoredContent, latestNews, mostViewed, nextArticles, allArticles }) {
    const loadTriggerRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [loadedArticles, setLoadedArticles] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([
        article
    ]);
    const [nextQueue, setNextQueue] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(nextArticles || []);
    // Update browser URL when a different article scrolls into view
    const handleArticleVisible = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((id, title)=>{
        const newUrl = `/article/${id}`;
        if (window.location.pathname !== newUrl) {
            window.history.replaceState(null, title, newUrl);
            document.title = `${title} | The Digital Diplomat`;
        }
    }, []);
    // IntersectionObserver to load next article when user reaches bottom
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!loadTriggerRef.current || nextQueue.length === 0) return;
        const observer = new IntersectionObserver(([entry])=>{
            if (entry.isIntersecting && nextQueue.length > 0) {
                setLoadedArticles((prev)=>[
                        ...prev,
                        nextQueue[0]
                    ]);
                setNextQueue((prev)=>prev.slice(1));
            }
        }, {
            rootMargin: '600px'
        });
        observer.observe(loadTriggerRef.current);
        return ()=>observer.disconnect();
    }, [
        nextQueue
    ]);
    if (!article) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-[60vh]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                className: "text-slate-500 text-lg",
                children: "Article not found."
            }, void 0, false, {
                fileName: "[project]/pages/article/[id].js",
                lineNumber: 308,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/article/[id].js",
            lineNumber: 307,
            columnNumber: 7
        }, this);
    }
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
                        lineNumber: 316,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: article.title
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: article.title
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 318,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:image",
                        content: article.image
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 319,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:type",
                        content: "article"
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 320,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/article/[id].js",
                lineNumber: 315,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "max-w-[1320px] mx-auto px-6 py-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "max-w-[1100px] mx-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("aside", {
                                className: "hidden xl:flex lg:col-span-1 flex-col items-center gap-6 sticky top-52 h-fit",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "w-10 h-10 rounded-full flex items-center justify-center bg-white text-slate-500 hover:text-primary transition-all shadow-sm border border-slate-200/50",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined text-[20px]",
                                            children: "share"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 330,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 329,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "w-10 h-10 rounded-full flex items-center justify-center bg-white text-slate-500 hover:text-primary transition-all shadow-sm border border-slate-200/50",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined text-[20px]",
                                            children: "bookmark"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 333,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 332,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "w-px h-12 bg-slate-200/30"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 335,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "w-10 h-10 rounded-full flex items-center justify-center bg-white text-slate-500 hover:text-primary transition-all shadow-sm border border-slate-200/50",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined text-[20px]",
                                            children: "thumb_up"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 337,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 336,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 328,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-7 w-full space-y-24",
                                children: [
                                    loadedArticles.map((art, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(ArticleBlock, {
                                            art: art,
                                            isFirst: idx === 0,
                                            onVisible: handleArticleVisible,
                                            allArticles: allArticles,
                                            sponsoredContent: sponsoredContent
                                        }, art.id, false, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 344,
                                            columnNumber: 15
                                        }, this)),
                                    nextQueue.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        ref: loadTriggerRef,
                                        className: "h-1"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 356,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 342,
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
                                                    lineNumber: 366,
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
                                                                    lineNumber: 370,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                                    className: "text-sm font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors",
                                                                    children: item.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/article/[id].js",
                                                                    lineNumber: 371,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, item.id, true, {
                                                            fileName: "[project]/pages/article/[id].js",
                                                            lineNumber: 369,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 367,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 365,
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
                                                    lineNumber: 379,
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
                                                                        lineNumber: 383,
                                                                        columnNumber: 92
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/article/[id].js",
                                                                    lineNumber: 383,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    className: "text-3xl font-black text-slate-200 italic font-['Plus_Jakarta_Sans']",
                                                                    children: String(i + 1).padStart(2, '0')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/article/[id].js",
                                                                    lineNumber: 384,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                                            className: "text-sm font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors",
                                                                            children: item.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/article/[id].js",
                                                                            lineNumber: 386,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] text-slate-500 font-medium uppercase tracking-tighter",
                                                                            children: [
                                                                                item.tag,
                                                                                " • ",
                                                                                item.id % 15 + 5,
                                                                                "k views"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/pages/article/[id].js",
                                                                            lineNumber: 387,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/pages/article/[id].js",
                                                                    lineNumber: 385,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, item.id, true, {
                                                            fileName: "[project]/pages/article/[id].js",
                                                            lineNumber: 382,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 380,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 378,
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
                                                        lineNumber: 397,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                        className: "font-extrabold text-xl mb-2 font-['Plus_Jakarta_Sans']",
                                                        children: "Editorial Digest"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 398,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-white/80 leading-relaxed mb-6",
                                                        children: "Stay updated with critical immigration law changes delivered to your inbox weekly."
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 399,
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
                                                                lineNumber: 401,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                className: "w-full bg-white text-primary font-bold py-3 px-4 text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-colors",
                                                                children: "Subscribe Now"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/article/[id].js",
                                                                lineNumber: 402,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 400,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 396,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 395,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 362,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 361,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 325,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/article/[id].js",
                    lineNumber: 324,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/article/[id].js",
                lineNumber: 323,
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
    // Generate short description from content (strip HTML, truncate)
    const plainText = article.content?.replace(/<[^>]*>?/gm, '').trim() || '';
    article.shortDesc = plainText.length > 200 ? plainText.substring(0, 200) + '...' : plainText;
    context.res.setHeader('Cache-Control', 'no-store');
    const sponsoredContent = AdminConfig?.sponsoredContent || {
        enabled: false,
        items: []
    };
    // Sidebar data: Latest News
    const latestNews = NewsData.filter((a)=>a.id !== articleId && a.id !== 999).sort((a, b)=>b.id - a.id).slice(0, 3).map(({ content, ...rest })=>rest);
    // Sidebar data: Most Viewed
    const mostViewed = NewsData.filter((a)=>a.id !== articleId && a.id !== 999).slice(0, 6).sort(()=>0.5 - Math.random()).slice(0, 3).map(({ content, ...rest })=>rest);
    // ── Next articles queue for infinite scroll ──
    const nextArticles = NewsData.filter((a)=>a.id !== articleId && a.id !== 999).sort((a, b)=>b.id - a.id).slice(0, 5).map((a)=>{
        const pt = a.content?.replace(/<[^>]*>?/gm, '').trim() || '';
        return {
            ...a,
            shortDesc: pt.length > 200 ? pt.substring(0, 200) + '...' : pt
        };
    });
    // ── All articles (lightweight, for computing per-article related) ──
    const allArticles = NewsData.filter((a)=>a.id !== 999).map((a)=>({
            id: a.id,
            title: a.title,
            category: a.category,
            tag: a.tag,
            date: a.date,
            image: a.image,
            content: a.content
        }));
    return {
        props: {
            article,
            sponsoredContent,
            latestNews,
            mostViewed,
            nextArticles,
            allArticles
        }
    };
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0yh0y9x._.js.map