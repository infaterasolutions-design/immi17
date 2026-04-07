module.exports = [
"[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("styled-jsx/style.js", () => require("styled-jsx/style.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

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
"[project]/components/SearchOverlay.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchOverlay
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
;
;
;
;
;
const { NewsData, AdminConfig } = __turbopack_context__.r("[project]/lib/data.js [ssr] (ecmascript)");
const STORAGE_KEY = 'dd_recent_searches';
const MAX_RECENT = 5;
function getRecent() {
    if ("TURBOPACK compile-time truthy", 1) return [];
    //TURBOPACK unreachable
    ;
}
function saveRecent(term) {
    const list = getRecent().filter((t)=>t !== term);
    list.unshift(term);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, MAX_RECENT)));
}
function clearRecent() {
    localStorage.removeItem(STORAGE_KEY);
}
function SearchOverlay({ isOpen, onClose }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [recentSearches, setRecentSearches] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [showResults, setShowResults] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const trending = AdminConfig?.searchSettings?.trendingKeywords || [];
    // Focus input when opened
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (isOpen) {
            setRecentSearches(getRecent());
            setTimeout(()=>inputRef.current?.focus(), 100);
        } else {
            setQuery('');
            setResults([]);
            setShowResults(false);
        }
    }, [
        isOpen
    ]);
    // Live search filtering
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!query.trim()) {
            setShowResults(false);
            setResults([]);
            return;
        }
        const q = query.toLowerCase();
        const matched = NewsData.filter((a)=>a.title.toLowerCase().includes(q) || a.tag.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)).slice(0, 8);
        setResults(matched);
        setShowResults(true);
    }, [
        query
    ]);
    const handleSearch = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((term)=>{
        if (!term.trim()) return;
        saveRecent(term.trim());
        setQuery(term);
        // Navigate to category or show filtered results
        onClose();
    }, [
        onClose
    ]);
    const handleResultClick = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])((articleId)=>{
        if (query.trim()) saveRecent(query.trim());
        onClose();
        router.push(`/article/${articleId}`);
    }, [
        query,
        onClose,
        router
    ]);
    const popularArticles = NewsData.slice(0, 5);
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "ac2cfbcc95dc197d",
                children: ".search-overlay.jsx-ac2cfbcc95dc197d{z-index:100;background:#fff;animation:.35s cubic-bezier(.25,.8,.25,1) forwards slideUp;position:fixed;inset:0}@keyframes slideUp{0%{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}.skeleton-bar.jsx-ac2cfbcc95dc197d{background:linear-gradient(90deg,#e2e8f0 25%,#f1f5f9 50%,#e2e8f0 75%) 0 0/200% 100%;animation:1.5s infinite shimmer}@keyframes shimmer{0%{background-position:-200% 0}to{background-position:200% 0}}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "jsx-ac2cfbcc95dc197d" + " " + "search-overlay lg:hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-ac2cfbcc95dc197d" + " " + "min-h-screen flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-ac2cfbcc95dc197d" + " " + "sticky top-0 z-10 bg-white/90 backdrop-blur-md px-4 pt-4 pb-3 border-b border-slate-100",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-ac2cfbcc95dc197d" + " " + "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        className: "jsx-ac2cfbcc95dc197d" + " " + "w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors active:scale-95 shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "jsx-ac2cfbcc95dc197d" + " " + "material-symbols-outlined text-[20px]",
                                            children: "arrow_back"
                                        }, void 0, false, {
                                            fileName: "[project]/components/SearchOverlay.js",
                                            lineNumber: 110,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/SearchOverlay.js",
                                        lineNumber: 106,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-ac2cfbcc95dc197d" + " " + "flex-1 flex items-center bg-slate-100 px-4 h-12 rounded-full border border-slate-200 shadow-sm relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "jsx-ac2cfbcc95dc197d" + " " + "material-symbols-outlined text-slate-400 text-lg mr-2",
                                                children: "search"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SearchOverlay.js",
                                                lineNumber: 113,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                ref: inputRef,
                                                value: query,
                                                onChange: (e)=>setQuery(e.target.value),
                                                onKeyDown: (e)=>e.key === 'Enter' && handleSearch(query),
                                                placeholder: "Search visa news, guides...",
                                                type: "text",
                                                autoComplete: "off",
                                                className: "jsx-ac2cfbcc95dc197d" + " " + "bg-transparent border-none focus:ring-0 focus:outline-none text-sm w-full font-['Inter'] text-slate-800 placeholder-slate-400"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SearchOverlay.js",
                                                lineNumber: 114,
                                                columnNumber: 17
                                            }, this),
                                            query && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setQuery(''),
                                                className: "jsx-ac2cfbcc95dc197d" + " " + "text-slate-400 hover:text-slate-700 transition-colors ml-1 shrink-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "jsx-ac2cfbcc95dc197d" + " " + "material-symbols-outlined text-[18px]",
                                                    children: "close"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/SearchOverlay.js",
                                                    lineNumber: 126,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/SearchOverlay.js",
                                                lineNumber: 125,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/SearchOverlay.js",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SearchOverlay.js",
                                lineNumber: 105,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/SearchOverlay.js",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-ac2cfbcc95dc197d" + " " + "flex-1 px-4 py-5 space-y-6 overflow-y-auto",
                            children: !showResults ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                children: [
                                    recentSearches.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-ac2cfbcc95dc197d" + " " + "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-ac2cfbcc95dc197d" + " " + "flex items-center justify-between mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                        className: "jsx-ac2cfbcc95dc197d" + " " + "text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "jsx-ac2cfbcc95dc197d" + " " + "material-symbols-outlined text-[14px]",
                                                                children: "history"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/SearchOverlay.js",
                                                                lineNumber: 142,
                                                                columnNumber: 25
                                                            }, this),
                                                            " Recent Searches"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/SearchOverlay.js",
                                                        lineNumber: 141,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            clearRecent();
                                                            setRecentSearches([]);
                                                        },
                                                        className: "jsx-ac2cfbcc95dc197d" + " " + "text-[10px] font-semibold text-primary hover:underline",
                                                        children: "Clear All"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/SearchOverlay.js",
                                                        lineNumber: 144,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/SearchOverlay.js",
                                                lineNumber: 140,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-ac2cfbcc95dc197d" + " " + "flex flex-wrap gap-2",
                                                children: recentSearches.map((term, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setQuery(term);
                                                            handleSearch(term);
                                                        },
                                                        className: "jsx-ac2cfbcc95dc197d" + " " + "px-3 py-1.5 bg-slate-100 text-sm text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "jsx-ac2cfbcc95dc197d" + " " + "material-symbols-outlined text-[14px] text-slate-400",
                                                                children: "history"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/SearchOverlay.js",
                                                                lineNumber: 158,
                                                                columnNumber: 27
                                                            }, this),
                                                            term
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/components/SearchOverlay.js",
                                                        lineNumber: 153,
                                                        columnNumber: 25
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/SearchOverlay.js",
                                                lineNumber: 151,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/SearchOverlay.js",
                                        lineNumber: 139,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-ac2cfbcc95dc197d" + " " + "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                className: "jsx-ac2cfbcc95dc197d" + " " + "text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "jsx-ac2cfbcc95dc197d" + " " + "material-symbols-outlined text-[14px] text-orange-500",
                                                        children: "local_fire_department"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/SearchOverlay.js",
                                                        lineNumber: 169,
                                                        columnNumber: 21
                                                    }, this),
                                                    " Trending Searches"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/SearchOverlay.js",
                                                lineNumber: 168,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-ac2cfbcc95dc197d" + " " + "flex flex-wrap gap-2",
                                                children: trending.map((term, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setQuery(term);
                                                        },
                                                        className: "jsx-ac2cfbcc95dc197d" + " " + "px-3 py-1.5 bg-blue-50 text-sm text-blue-700 font-medium hover:bg-blue-100 transition-colors",
                                                        children: term
                                                    }, i, false, {
                                                        fileName: "[project]/components/SearchOverlay.js",
                                                        lineNumber: 173,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/SearchOverlay.js",
                                                lineNumber: 171,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/SearchOverlay.js",
                                        lineNumber: 167,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-ac2cfbcc95dc197d",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                className: "jsx-ac2cfbcc95dc197d" + " " + "text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "jsx-ac2cfbcc95dc197d" + " " + "material-symbols-outlined text-[14px] text-primary",
                                                        children: "star"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/SearchOverlay.js",
                                                        lineNumber: 187,
                                                        columnNumber: 21
                                                    }, this),
                                                    " Popular Right Now"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/SearchOverlay.js",
                                                lineNumber: 186,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-ac2cfbcc95dc197d" + " " + "space-y-1",
                                                children: popularArticles.map((article)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleResultClick(article.id),
                                                        className: "jsx-ac2cfbcc95dc197d" + " " + "w-full flex items-center gap-3 p-2 hover:bg-slate-50 transition-colors text-left",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                                src: article.image,
                                                                alt: "",
                                                                className: "jsx-ac2cfbcc95dc197d" + " " + "w-14 h-10 object-cover shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/SearchOverlay.js",
                                                                lineNumber: 196,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "jsx-ac2cfbcc95dc197d" + " " + "flex-1 min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                        className: "jsx-ac2cfbcc95dc197d" + " " + "text-sm font-semibold text-slate-800 truncate",
                                                                        children: article.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/SearchOverlay.js",
                                                                        lineNumber: 198,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                        className: "jsx-ac2cfbcc95dc197d" + " " + "text-[10px] text-slate-400 uppercase font-bold tracking-wide",
                                                                        children: article.tag
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/SearchOverlay.js",
                                                                        lineNumber: 199,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/SearchOverlay.js",
                                                                lineNumber: 197,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, article.id, true, {
                                                        fileName: "[project]/components/SearchOverlay.js",
                                                        lineNumber: 191,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/SearchOverlay.js",
                                                lineNumber: 189,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/SearchOverlay.js",
                                        lineNumber: 185,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true) : results.length > 0 ? /* Live Results */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-ac2cfbcc95dc197d" + " " + "space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                        className: "jsx-ac2cfbcc95dc197d" + " " + "text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "jsx-ac2cfbcc95dc197d" + " " + "material-symbols-outlined text-[14px]",
                                                children: "article"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SearchOverlay.js",
                                                lineNumber: 210,
                                                columnNumber: 19
                                            }, this),
                                            " Results"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/SearchOverlay.js",
                                        lineNumber: 209,
                                        columnNumber: 17
                                    }, this),
                                    results.map((article)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleResultClick(article.id),
                                            className: "jsx-ac2cfbcc95dc197d" + " " + "w-full flex items-center gap-3 p-2 hover:bg-slate-50 transition-colors text-left animate-fadeIn",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                    src: article.image,
                                                    alt: "",
                                                    className: "jsx-ac2cfbcc95dc197d" + " " + "w-14 h-10 object-cover shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/SearchOverlay.js",
                                                    lineNumber: 218,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "jsx-ac2cfbcc95dc197d" + " " + "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: "jsx-ac2cfbcc95dc197d" + " " + "text-sm font-semibold text-slate-800 line-clamp-2",
                                                            children: article.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/SearchOverlay.js",
                                                            lineNumber: 220,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: "jsx-ac2cfbcc95dc197d" + " " + "text-[10px] text-slate-400 uppercase font-bold tracking-wide",
                                                            children: [
                                                                article.tag,
                                                                " • ",
                                                                article.date
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/SearchOverlay.js",
                                                            lineNumber: 221,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/SearchOverlay.js",
                                                    lineNumber: 219,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, article.id, true, {
                                            fileName: "[project]/components/SearchOverlay.js",
                                            lineNumber: 213,
                                            columnNumber: 19
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SearchOverlay.js",
                                lineNumber: 208,
                                columnNumber: 15
                            }, this) : /* No Results */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-ac2cfbcc95dc197d" + " " + "text-center py-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "jsx-ac2cfbcc95dc197d" + " " + "material-symbols-outlined text-[48px] text-slate-300 mb-3 block",
                                        children: "search_off"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SearchOverlay.js",
                                        lineNumber: 229,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-ac2cfbcc95dc197d" + " " + "text-sm font-semibold text-slate-500 mb-1",
                                        children: "No results found"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SearchOverlay.js",
                                        lineNumber: 230,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-ac2cfbcc95dc197d" + " " + "text-xs text-slate-400",
                                        children: "Try a different keyword or check trending topics"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SearchOverlay.js",
                                        lineNumber: 231,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-ac2cfbcc95dc197d" + " " + "mt-5 flex flex-wrap gap-2 justify-center",
                                        children: trending.slice(0, 3).map((term, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setQuery(term),
                                                className: "jsx-ac2cfbcc95dc197d" + " " + "px-3 py-1.5 bg-slate-100 text-sm text-slate-600",
                                                children: term
                                            }, i, false, {
                                                fileName: "[project]/components/SearchOverlay.js",
                                                lineNumber: 234,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/SearchOverlay.js",
                                        lineNumber: 232,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/SearchOverlay.js",
                                lineNumber: 228,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/SearchOverlay.js",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/SearchOverlay.js",
                    lineNumber: 102,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/SearchOverlay.js",
                lineNumber: 101,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/components/Header.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SearchOverlay$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SearchOverlay.js [ssr] (ecmascript)");
;
;
;
;
;
;
/* ── Navigation data structure ── */ const NAV_ITEMS = [
    {
        label: 'Home',
        href: '/',
        dropdown: [
            {
                label: 'Latest News',
                href: '/'
            },
            {
                label: 'Trending Immigration News',
                href: '/category/visa-news'
            }
        ]
    },
    {
        label: 'Visa News',
        href: '/category/visa-news',
        dropdown: [
            {
                label: 'H1B Visa',
                href: '/category/visa-news/h1b-visa'
            },
            {
                label: 'Green Card',
                href: '/category/visa-news/green-card'
            },
            {
                label: 'F1 & OPT/CPT',
                href: '/category/visa-news/f1-opt-cpt'
            },
            {
                label: 'B1/B2 (Tourist & Business)',
                href: '/category/visa-news/b1-b2'
            },
            {
                label: 'USCIS Updates',
                href: '/category/visa-news/uscis'
            },
            {
                label: 'Consulate Alerts',
                href: '/category/processing-times/consulate'
            }
        ]
    },
    {
        label: 'Visa Guides',
        href: '/category/visa-guides',
        dropdown: [
            {
                label: 'How-To Articles',
                href: '/category/visa-guides/how-to'
            },
            {
                label: 'Application Steps',
                href: '/category/visa-guides/steps'
            },
            {
                label: 'FAQs',
                href: '/category/visa-guides/faqs'
            }
        ]
    },
    {
        label: 'Visa Bulletin',
        href: '/category/visa-bulletin'
    },
    {
        label: 'Processing Times',
        href: '/category/processing-times',
        dropdown: [
            {
                label: 'USCIS Service Center Timelines',
                href: '/category/processing-times'
            },
            {
                label: 'Consulate Appointment Wait Times',
                href: '/category/processing-times/consulate'
            }
        ]
    },
    {
        label: 'Fee Calculator',
        href: '#',
        dropdown: [
            {
                label: 'Tool Page',
                href: '#'
            },
            {
                label: 'Fee Breakdown',
                href: '#'
            }
        ]
    },
    {
        label: 'Tools',
        href: '#',
        dropdown: [
            {
                label: 'Visa Status Checker',
                href: '#'
            },
            {
                label: 'USCIS Case Tracker',
                href: '#'
            },
            {
                label: 'H1B Lottery Tracker',
                href: '#'
            }
        ]
    },
    {
        label: 'About',
        href: '#',
        dropdown: [
            {
                label: 'Mission Statement',
                href: '#'
            },
            {
                label: 'Disclaimer',
                href: '#'
            },
            {
                label: 'Contact Info',
                href: '#'
            }
        ]
    }
];
function Header() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [searchOpen, setSearchOpen] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [expandedAccordion, setExpandedAccordion] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    // Close mobile menu on route change
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const handleRouteChange = ()=>{
            setMobileMenuOpen(false);
            setExpandedAccordion(null);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return ()=>router.events.off('routeChangeComplete', handleRouteChange);
    }, [
        router
    ]);
    const closeMobileMenu = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useCallback"])(()=>{
        setMobileMenuOpen(false);
        setExpandedAccordion(null);
    }, []);
    const toggleAccordion = (index)=>{
        setExpandedAccordion(expandedAccordion === index ? null : index);
    };
    // Ripple coordinates for premium icons
    const handleRipple = (e, btnRef)=>{
        if (!btnRef.current) return;
        const rect = btnRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
        const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
        btnRef.current.style.setProperty('--ripple-x', x + '%');
        btnRef.current.style.setProperty('--ripple-y', y + '%');
    };
    const searchBtnRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const menuBtnRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "c8197009176c7aee",
                children: '.material-symbols-outlined{font-variation-settings:"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24}.headline-font{font-family:Poppins,sans-serif}*,:before,:after{border-radius:0!important}.nav-dropdown{opacity:0;visibility:hidden;transition:all .2s ease-out;transform:translateY(8px)}.nav-item:hover .nav-dropdown{opacity:1;visibility:visible;transform:translateY(0)}.mob-icon-btn{-webkit-backdrop-filter:blur(16px)saturate(1.8);cursor:pointer;-webkit-tap-highlight-color:transparent;isolation:isolate;background:linear-gradient(145deg,#ffffffd9,#f8fafcbf);border:1px solid #e2e8f099;justify-content:center;align-items:center;width:44px;height:44px;transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .35s,background .3s;display:flex;position:relative;overflow:hidden;box-shadow:0 2px 8px #0000000a,0 4px 16px #00000008,inset 0 1px #ffffffe6,inset 0 -1px #00000005;border-radius:13px!important}.mob-icon-btn:before{content:"";background:radial-gradient(circle at var(--ripple-x,50%) var(--ripple-y,50%), #1c4ed81f 0%, transparent 60%);opacity:0;z-index:0;transition:opacity .4s;position:absolute;inset:0;border-radius:13px!important}.mob-icon-btn:active:before{opacity:1}.mob-icon-btn:after{content:"";opacity:0;z-index:-1;filter:blur(2px);background:linear-gradient(135deg,#3b82f61f,#6366f114,#9333ea0f);transition:opacity .35s;position:absolute;inset:-3px;border-radius:16px!important}.mob-icon-btn:active:after{opacity:1}@keyframes iconBounce{0%{transform:scale(1)}30%{transform:scale(.9)}60%{transform:scale(1.04)}to{transform:scale(1)}}.mob-icon-btn:active{animation:.35s forwards iconBounce}.mob-icon-btn:hover{box-shadow:0 4px 20px #00000014,0 8px 32px #1c4ed80f,inset 0 1px #fffffff2}.hamburger-bars{z-index:1;flex-direction:column;justify-content:space-between;width:20px;height:14px;display:flex;position:relative}.hamburger-bars span{transform-origin:50%;background:#334155;height:2px;transition:transform .35s cubic-bezier(.68,-.6,.32,1.6),opacity .25s,width .3s cubic-bezier(.25,.8,.25,1),background .3s;display:block;border-radius:3px!important}.hamburger-bars span:first-child{width:100%;height:2.2px}.hamburger-bars span:nth-child(2){width:14px;height:1.8px;transition-delay:50ms}.hamburger-bars span:nth-child(3){width:18px;height:2px;transition-delay:.1s}.mob-icon-btn:hover .hamburger-bars span{width:100%!important}.mob-icon-btn.is-active .hamburger-bars span:first-child{background:#1c4ed8;width:100%;transform:translateY(6px)rotate(45deg)}.mob-icon-btn.is-active .hamburger-bars span:nth-child(2){opacity:0;width:0;transform:translate(8px)}.mob-icon-btn.is-active .hamburger-bars span:nth-child(3){background:#1c4ed8;width:100%;transform:translateY(-6px)rotate(-45deg)}.mob-icon-btn.is-active{background:linear-gradient(145deg,#f1f5f9f2,#e2e8f0d9);box-shadow:0 2px 12px #1c4ed814,inset 0 1px #ffffffe6}.search-icon-svg{stroke:#334155;stroke-width:1.8px;stroke-linecap:round;stroke-linejoin:round;fill:none;filter:drop-shadow(0 1px 1px #0000000f);z-index:1;width:20px;height:20px;transition:stroke .25s,filter .25s,transform .25s;position:relative}.mob-icon-btn:active .search-icon-svg{stroke:#1c4ed8;filter:drop-shadow(0 0 4px #1c4ed840);transform:scale(1.08)}.mob-icon-btn:hover .search-icon-svg{stroke:#475569}.mobile-overlay{z-index:40;opacity:0;visibility:hidden;background-color:#0f172a66;transition:opacity .4s,visibility .4s;position:fixed;inset:64px 0 0}.mobile-overlay.is-open{opacity:1;visibility:visible}.mobile-drawer{opacity:0;visibility:hidden;will-change:transform, opacity;width:100%;max-height:calc(100vh - 64px);transition:transform .4s cubic-bezier(.25,.8,.25,1),opacity .4s,visibility .4s;position:absolute;top:100%;left:0;transform:translate(-100%)}.mobile-drawer.is-open{opacity:1;visibility:visible;transform:translate(0)}.mob-panel{opacity:0;visibility:hidden;grid-template-rows:0fr;transition:grid-template-rows .35s cubic-bezier(.25,.8,.25,1),opacity .35s,visibility .35s;display:grid}.mob-panel.is-open{opacity:1;visibility:visible;grid-template-rows:1fr}.mob-panel-inner{overflow:hidden}@keyframes fadeIn{0%{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}.animate-fadeIn{animation:.4s ease-out forwards fadeIn}'
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("nav", {
                className: "jsx-c8197009176c7aee" + " " + "sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-200 ease-in-out",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-c8197009176c7aee" + " " + "max-w-screen-2xl mx-auto flex items-center justify-between px-6 py-4 h-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-c8197009176c7aee" + " " + "flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "text-2xl font-black tracking-tighter text-slate-900",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        alt: "The Digital Diplomat Logo",
                                        src: "/Logo.png",
                                        className: "jsx-c8197009176c7aee" + " " + "w-auto object-contain h-12"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.js",
                                        lineNumber: 208,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.js",
                                    lineNumber: 207,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/Header.js",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-c8197009176c7aee" + " " + "hidden lg:flex items-center gap-1 h-full",
                                children: NAV_ITEMS.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-c8197009176c7aee" + " " + `${item.dropdown ? 'nav-item group' : ''} relative h-full flex items-center px-2`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: item.href,
                                                className: `font-['Plus_Jakarta_Sans'] tracking-tight text-sm font-semibold transition-all flex items-center gap-0.5 ${router.pathname === item.href ? 'text-blue-700 border-b-2 border-blue-700 pb-1' : 'text-slate-600 hover:text-slate-900'}`,
                                                children: [
                                                    item.label,
                                                    item.dropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "jsx-c8197009176c7aee" + " " + "material-symbols-outlined text-xs",
                                                        children: "expand_more"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Header.js",
                                                        lineNumber: 223,
                                                        columnNumber: 37
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Header.js",
                                                lineNumber: 216,
                                                columnNumber: 17
                                            }, this),
                                            item.dropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-c8197009176c7aee" + " " + "nav-dropdown absolute top-full left-0 w-64 bg-white border border-slate-200 shadow-xl p-2 z-[60]",
                                                children: item.dropdown.map((sub, sidx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        href: sub.href,
                                                        className: "block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-100/50 hover:text-slate-900 transition-colors",
                                                        children: sub.label
                                                    }, sidx, false, {
                                                        fileName: "[project]/components/Header.js",
                                                        lineNumber: 228,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/Header.js",
                                                lineNumber: 226,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "[project]/components/Header.js",
                                        lineNumber: 215,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/components/Header.js",
                                lineNumber: 213,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-c8197009176c7aee" + " " + "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-c8197009176c7aee" + " " + "hidden xl:flex items-center bg-slate-100 px-4 py-1.5 border border-slate-200 relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "jsx-c8197009176c7aee" + " " + "material-symbols-outlined text-slate-400 text-sm",
                                                children: "search"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Header.js",
                                                lineNumber: 242,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                placeholder: "Search news...",
                                                type: "text",
                                                autoComplete: "off",
                                                className: "jsx-c8197009176c7aee" + " " + "bg-transparent border-none focus:ring-0 text-sm w-48"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Header.js",
                                                lineNumber: 243,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Header.js",
                                        lineNumber: 241,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "jsx-c8197009176c7aee" + " " + "bg-primary text-white px-6 py-2 font-bold text-sm tracking-wide uppercase hover:opacity-90 transition-all scale-100 active:scale-[0.98]",
                                        children: "Subscribe"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.js",
                                        lineNumber: 245,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        ref: searchBtnRef,
                                        "aria-label": "Search",
                                        onPointerDown: (e)=>handleRipple(e, searchBtnRef),
                                        onClick: ()=>setSearchOpen(true),
                                        className: "jsx-c8197009176c7aee" + " " + "lg:hidden mob-icon-btn ml-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                            viewBox: "0 0 24 24",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            className: "jsx-c8197009176c7aee" + " " + "search-icon-svg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("defs", {
                                                    className: "jsx-c8197009176c7aee",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("filter", {
                                                        id: "search-inner-glow",
                                                        className: "jsx-c8197009176c7aee",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("feGaussianBlur", {
                                                                in: "SourceAlpha",
                                                                stdDeviation: "0.5",
                                                                result: "blur",
                                                                className: "jsx-c8197009176c7aee"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Header.js",
                                                                lineNumber: 260,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("feOffset", {
                                                                dx: "0",
                                                                dy: "0.5",
                                                                className: "jsx-c8197009176c7aee"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Header.js",
                                                                lineNumber: 261,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("feComposite", {
                                                                in2: "SourceAlpha",
                                                                operator: "arithmetic",
                                                                k2: "-1",
                                                                k3: "1",
                                                                className: "jsx-c8197009176c7aee"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Header.js",
                                                                lineNumber: 262,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("feFlood", {
                                                                floodColor: "rgba(0,0,0,0.08)",
                                                                className: "jsx-c8197009176c7aee"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Header.js",
                                                                lineNumber: 263,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("feComposite", {
                                                                operator: "in",
                                                                in2: "blur",
                                                                className: "jsx-c8197009176c7aee"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Header.js",
                                                                lineNumber: 264,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("feMerge", {
                                                                className: "jsx-c8197009176c7aee",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("feMergeNode", {
                                                                        className: "jsx-c8197009176c7aee"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Header.js",
                                                                        lineNumber: 265,
                                                                        columnNumber: 30
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("feMergeNode", {
                                                                        in: "SourceGraphic",
                                                                        className: "jsx-c8197009176c7aee"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Header.js",
                                                                        lineNumber: 265,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/Header.js",
                                                                lineNumber: 265,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/Header.js",
                                                        lineNumber: 259,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Header.js",
                                                    lineNumber: 258,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("circle", {
                                                    cx: "10.5",
                                                    cy: "10.5",
                                                    r: "6.5",
                                                    filter: "url(#search-inner-glow)",
                                                    className: "jsx-c8197009176c7aee"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Header.js",
                                                    lineNumber: 268,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("line", {
                                                    x1: "15.5",
                                                    y1: "15.5",
                                                    x2: "20",
                                                    y2: "20",
                                                    className: "jsx-c8197009176c7aee"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Header.js",
                                                    lineNumber: 269,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Header.js",
                                            lineNumber: 257,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.js",
                                        lineNumber: 250,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        ref: menuBtnRef,
                                        "aria-label": "Menu",
                                        onPointerDown: (e)=>handleRipple(e, menuBtnRef),
                                        onClick: ()=>setMobileMenuOpen(!mobileMenuOpen),
                                        className: "jsx-c8197009176c7aee" + " " + `lg:hidden mob-icon-btn ml-1 ${mobileMenuOpen ? 'is-active' : ''}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "jsx-c8197009176c7aee" + " " + "hamburger-bars",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "jsx-c8197009176c7aee"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Header.js",
                                                    lineNumber: 282,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "jsx-c8197009176c7aee"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Header.js",
                                                    lineNumber: 282,
                                                    columnNumber: 30
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    className: "jsx-c8197009176c7aee"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Header.js",
                                                    lineNumber: 282,
                                                    columnNumber: 43
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/Header.js",
                                            lineNumber: 281,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.js",
                                        lineNumber: 274,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Header.js",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Header.js",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        onClick: closeMobileMenu,
                        className: "jsx-c8197009176c7aee" + " " + `lg:hidden mobile-overlay ${mobileMenuOpen ? 'is-open' : ''}`
                    }, void 0, false, {
                        fileName: "[project]/components/Header.js",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-c8197009176c7aee" + " " + `lg:hidden mobile-drawer bg-white border-t border-slate-200 w-full overflow-y-auto shadow-2xl z-50 ${mobileMenuOpen ? 'is-open' : ''}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-c8197009176c7aee" + " " + "p-4 space-y-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-c8197009176c7aee" + " " + "border-b border-slate-100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/live/h1b-visa-reform-2025",
                                        className: "flex items-center gap-2 py-3 px-2 font-['Plus_Jakarta_Sans'] font-semibold text-slate-900 text-base",
                                        onClick: closeMobileMenu,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                style: {
                                                    animation: 'livePulse 1.5s ease-in-out infinite'
                                                },
                                                className: "jsx-c8197009176c7aee" + " " + "w-2 h-2 bg-red-600 inline-block"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Header.js",
                                                lineNumber: 297,
                                                columnNumber: 17
                                            }, this),
                                            " Live Updates"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Header.js",
                                        lineNumber: 296,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.js",
                                    lineNumber: 295,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-c8197009176c7aee" + " " + "border-b border-slate-100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        className: "block py-3 px-2 font-['Plus_Jakarta_Sans'] font-semibold text-slate-900 text-base",
                                        onClick: closeMobileMenu,
                                        children: "Home"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.js",
                                        lineNumber: 302,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.js",
                                    lineNumber: 301,
                                    columnNumber: 13
                                }, this),
                                NAV_ITEMS.filter((item)=>item.dropdown && item.label !== 'Home').map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-c8197009176c7aee" + " " + "border-b border-slate-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>toggleAccordion(idx),
                                                className: "jsx-c8197009176c7aee" + " " + "w-full text-left py-3 px-2 font-['Plus_Jakarta_Sans'] font-semibold text-slate-900 text-base flex justify-between items-center",
                                                children: [
                                                    item.label,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "jsx-c8197009176c7aee" + " " + `material-symbols-outlined text-sm transition-transform duration-200 ${expandedAccordion === idx ? 'rotate-180' : ''}`,
                                                        children: "expand_more"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/Header.js",
                                                        lineNumber: 313,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/Header.js",
                                                lineNumber: 308,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-c8197009176c7aee" + " " + `mob-panel pl-4 border-l-2 border-primary ml-4 ${expandedAccordion === idx ? 'is-open' : ''}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "jsx-c8197009176c7aee" + " " + "mob-panel-inner pb-3 space-y-0",
                                                    children: item.dropdown.map((sub, sidx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            href: sub.href,
                                                            className: "block py-2.5 px-3 text-sm text-slate-600 hover:bg-slate-50",
                                                            onClick: closeMobileMenu,
                                                            children: sub.label
                                                        }, sidx, false, {
                                                            fileName: "[project]/components/Header.js",
                                                            lineNumber: 320,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Header.js",
                                                    lineNumber: 318,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/Header.js",
                                                lineNumber: 317,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, idx, true, {
                                        fileName: "[project]/components/Header.js",
                                        lineNumber: 307,
                                        columnNumber: 15
                                    }, this)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-c8197009176c7aee" + " " + "pt-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "jsx-c8197009176c7aee" + " " + "w-full bg-primary text-white py-3 px-4 font-bold text-sm tracking-wide uppercase hover:opacity-90 transition-all",
                                        children: "Subscribe"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.js",
                                        lineNumber: 331,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Header.js",
                                    lineNumber: 330,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Header.js",
                            lineNumber: 293,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/Header.js",
                        lineNumber: 292,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Header.js",
                lineNumber: 203,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SearchOverlay$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: searchOpen,
                onClose: ()=>setSearchOpen(false)
            }, void 0, false, {
                fileName: "[project]/components/Header.js",
                lineNumber: 340,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
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
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Header.js [ssr] (ecmascript)");
;
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
                                lineNumber: 75,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "text-slate-300 text-xs",
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 78,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: "text-slate-500 text-xs font-medium",
                                children: "8 min read"
                            }, void 0, false, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 79,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                        className: `${isFirst ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'} font-extrabold font-['Plus_Jakarta_Sans'] leading-[1.1] text-slate-900 mb-6 tracking-tight`,
                        children: art.title
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    art.shortDesc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        className: "text-xl md:text-[22px] text-slate-500 font-light leading-snug mb-10",
                        children: art.shortDesc
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 85,
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
                                    lineNumber: 91,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 90,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "text-slate-900 font-bold text-sm",
                                        children: "Editorial Team"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 94,
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
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/article/[id].js",
                lineNumber: 73,
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
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 103,
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
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 106,
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
                                            lineNumber: 111,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 110,
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
                                                    lineNumber: 115,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 114,
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
                                                    lineNumber: 118,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 117,
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
                                                    lineNumber: 121,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 120,
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
                                                    lineNumber: 124,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 123,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "h-px bg-slate-100 my-1 w-full mx-2"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 126,
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
                                                    lineNumber: 128,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 127,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 113,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 102,
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
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "p-4 bg-slate-50 text-slate-500 text-[11px] italic font-medium",
                                children: "Photography by USCIS Editorial Team."
                            }, void 0, false, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/article/[id].js",
                lineNumber: 101,
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
                                lineNumber: 145,
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
                                        lineNumber: 153,
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
                                        lineNumber: 155,
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
                                        lineNumber: 160,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 152,
                                columnNumber: 13
                            }, this),
                            !expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10"
                            }, void 0, false, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 169,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 141,
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
                                    lineNumber: 179,
                                    columnNumber: 28
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/article/[id].js",
                            lineNumber: 175,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 174,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/article/[id].js",
                lineNumber: 140,
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
                                            lineNumber: 193,
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
                                                        lineNumber: 196,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 195,
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
                                                        lineNumber: 199,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 198,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 194,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 192,
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
                                                            lineNumber: 216,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 215,
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
                                                                lineNumber: 219,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                                className: "text-lg font-bold headline-font text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-2",
                                                                children: related.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/article/[id].js",
                                                                lineNumber: 222,
                                                                columnNumber: 29
                                                            }, this),
                                                            related.shortDesc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-slate-500 line-clamp-2 mt-auto",
                                                                children: related.shortDesc
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/article/[id].js",
                                                                lineNumber: 226,
                                                                columnNumber: 31
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 218,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, related.id, true, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 210,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 204,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 203,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/article/[id].js",
                            lineNumber: 191,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 190,
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
                                            lineNumber: 242,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("a", {
                                            href: "#",
                                            className: "text-[11px] font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider",
                                            children: "Advertise Here"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 243,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 241,
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
                                                                lineNumber: 250,
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
                                                                lineNumber: 253,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 249,
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
                                                            lineNumber: 256,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 255,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, item.id, true, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 248,
                                                columnNumber: 25
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 246,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 245,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/article/[id].js",
                            lineNumber: 240,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 239,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/article/[id].js",
        lineNumber: 67,
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
                lineNumber: 309,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/article/[id].js",
            lineNumber: 308,
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
                        lineNumber: 317,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: article.title
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 318,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:title",
                        content: article.title
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 319,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:image",
                        content: article.image
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 320,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        property: "og:type",
                        content: "article"
                    }, void 0, false, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 321,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/article/[id].js",
                lineNumber: 316,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/article/[id].js",
                lineNumber: 324,
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
                                            lineNumber: 333,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 332,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "w-10 h-10 rounded-full flex items-center justify-center bg-white text-slate-500 hover:text-primary transition-all shadow-sm border border-slate-200/50",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined text-[20px]",
                                            children: "bookmark"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 336,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 335,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "w-px h-12 bg-slate-200/30"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 338,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                        className: "w-10 h-10 rounded-full flex items-center justify-center bg-white text-slate-500 hover:text-primary transition-all shadow-sm border border-slate-200/50",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "material-symbols-outlined text-[20px]",
                                            children: "thumb_up"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 340,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 339,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 331,
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
                                            lineNumber: 347,
                                            columnNumber: 15
                                        }, this)),
                                    nextQueue.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        ref: loadTriggerRef,
                                        className: "h-1"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/article/[id].js",
                                        lineNumber: 359,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 345,
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
                                                    lineNumber: 369,
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
                                                                    lineNumber: 373,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                                    className: "text-sm font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors",
                                                                    children: item.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/article/[id].js",
                                                                    lineNumber: 374,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, item.id, true, {
                                                            fileName: "[project]/pages/article/[id].js",
                                                            lineNumber: 372,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 370,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 368,
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
                                                    lineNumber: 382,
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
                                                                        lineNumber: 386,
                                                                        columnNumber: 92
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/article/[id].js",
                                                                    lineNumber: 386,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    className: "text-3xl font-black text-slate-200 italic font-['Plus_Jakarta_Sans']",
                                                                    children: String(i + 1).padStart(2, '0')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/article/[id].js",
                                                                    lineNumber: 387,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                                            className: "text-sm font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors",
                                                                            children: item.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/article/[id].js",
                                                                            lineNumber: 389,
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
                                                                            lineNumber: 390,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/pages/article/[id].js",
                                                                    lineNumber: 388,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, item.id, true, {
                                                            fileName: "[project]/pages/article/[id].js",
                                                            lineNumber: 385,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/article/[id].js",
                                                    lineNumber: 383,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 381,
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
                                                        lineNumber: 400,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                        className: "font-extrabold text-xl mb-2 font-['Plus_Jakarta_Sans']",
                                                        children: "Editorial Digest"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 401,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-white/80 leading-relaxed mb-6",
                                                        children: "Stay updated with critical immigration law changes delivered to your inbox weekly."
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 402,
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
                                                                lineNumber: 404,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                className: "w-full bg-white text-primary font-bold py-3 px-4 text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-colors",
                                                                children: "Subscribe Now"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/article/[id].js",
                                                                lineNumber: 405,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/article/[id].js",
                                                        lineNumber: 403,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/article/[id].js",
                                                lineNumber: 399,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/article/[id].js",
                                            lineNumber: 398,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/article/[id].js",
                                    lineNumber: 365,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/article/[id].js",
                                lineNumber: 364,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/article/[id].js",
                        lineNumber: 328,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/article/[id].js",
                    lineNumber: 327,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/article/[id].js",
                lineNumber: 326,
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
    // ── Dynamic hybrid caching based on article age ──
    const publishDate = new Date(article.date);
    const now = new Date();
    const ageDays = (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24);
    if (ageDays > 3) {
        context.res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=86400');
    } else {
        context.res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=59');
    }
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

//# sourceMappingURL=%5Broot-of-the-server%5D__0e23~sy._.js.map