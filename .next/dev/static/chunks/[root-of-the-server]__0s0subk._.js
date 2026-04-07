(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime/runtime-types.d.ts" />
/// <reference path="../../../shared/runtime/dev-globals.d.ts" />
/// <reference path="../../../shared/runtime/dev-protocol.d.ts" />
/// <reference path="../../../shared/runtime/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateB.type === 'total') {
        // A total update replaces the entire chunk, so it supersedes any prior update.
        return updateB;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/lib/data.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

// ─── Simulated Admin Settings ───
const AdminConfig = {
    floatingBlogCard: {
        enabled: true,
        displayRules: {
            showOn: 'all'
        },
        triggerSettings: {
            type: 'time',
            value: 1 // 1 second delay
        },
        position: 'bottom-right',
        recommendedPostId: 1,
        customOverride: {
        }
    },
    languageSwitcher: {
        enabled: true,
        defaultLanguage: 'en',
        allowedLanguages: [
            {
                code: 'en',
                name: 'English',
                flag: '🇺🇸'
            },
            {
                code: 'es',
                name: 'Spanish',
                flag: '🇪🇸'
            },
            {
                code: 'hi',
                name: 'Hindi',
                flag: '🇮🇳'
            },
            {
                code: 'fr',
                name: 'French',
                flag: '🇫🇷'
            }
        ]
    },
    searchSettings: {
        enabled: true,
        trendingKeywords: [
            'H1B Visa 2025',
            'Green Card Priority Dates',
            'USCIS Processing Times',
            'F1 OPT Extension',
            'Immigration Reform Bill',
            'B1/B2 Visa Interview'
        ],
        searchPriority: 'blogs',
        noResultBehavior: 'popular',
        voiceSearchEnabled: true
    },
    relatedArticles: {
        enabled: true,
        mode: 'auto',
        manualIds: [
            3,
            5,
            8,
            10
        ]
    },
    sponsoredContent: {
        enabled: true,
        maxItems: 6,
        items: [
            {
                id: 1,
                title: 'Expert Immigration Lawyers Ready to Help',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKyR3TjqB6H5OPwDD5Vz__oLTQIgC0VBZ9C2ZYm0RyBpgwXOH7WTjXTgwXJqWkuf7gRFQsTLhbqloYl9yK55LeUDv8sKXz1ekJHun-CZk70aVh5t5VEAxPFqHGZhcNKKjySgnb-cr9Endyb8WZaM1-i-HhW2s5LrwsuMcpUNBBkzzfJUa5SI_56b3PrbUkM48CFUJsvPnOULDbOk-7MbOO2Pfvwp6Adwopm5-RRqt7piQ5YH79s2ShR6BJ8_KPM-Y-cw18-MzUinI',
                url: '#',
                sponsor: 'Global Law Firm'
            },
            {
                id: 2,
                title: 'Invest in the USA: EB-5 Projects Explained',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOUgkbn0ejx90kCo_WeuweNcC65_qQXwgeYf0l_IkxuatVrUe987ygmQ6qrFxfTEj1neDn7iQXX9JTzQaRhcH_f7xPo4kq5bIUNlRibi9DukYjZvnk0kP2w0gEc9ZZaqG0K-1lZwmGT1e5ZQ9XxahHOsJRXf9s83cryBJmDoeO1t7G6zt6Nsl6PPZ9Ephlcr4fWzHt6UtzjqAkf2eXYkBSawGCgUxNfjJEM-I8AdbfyveerG3Ivnl0OyJPP6z5RCBAlP1qjUHkMbo',
                url: '#',
                sponsor: 'EB5 Capital Group'
            },
            {
                id: 3,
                title: 'Need Fast Visa Stamping Appointments?',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATI85OtLzj_sQ0MJSzY7OKWNh756JbG2932o_Ri9ycQHBm4OUaRqbyh-FeoXP0XLK493eluw7EUp-4FIA4-9luW02by7tRs_mL_MR_Ws222g37OrmvEvjAYGl9unpTvv8orNCrC9rejkU4y7tGbBYbgwpbx9fjIe5PLKHuEmm0OMlCoPk09_tkiejWjtYv2DTF5AsYoI39e1G3_eTfY8wHtn03Bugod6gUkWAKFyunVqistTzLjMBr3-q_ODnv9-mLSblCOpny5Vs',
                url: '#',
                sponsor: 'VisaSpeed'
            },
            {
                id: 4,
                title: 'Top Ranked Universities Offering Day 1 CPT',
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKs0Kp0aBoh8ydCgZzM4KwfpiM3qCjegaJqFzBP4vQpITa4xP7FwBjBwaqMJDszQRyfMTxdDdwG-tqc5bIUdPEcmoyWQJPQbDzFdsOsTjwwDmIyY1dbuV0JdPVuVAKedrbRT7z1wJOV23Jrfe5Luy8lRk2kGiZ-yfqPXbVoZKqrxszIB5FsxT_szvcPdBzR07-lGT75o2eW8PqXKHF2j4v448g5e_28trTBeZO2L97lDX2Nfc3LmkLW2_gVBrnBwhtO4h-JtINVFg',
                url: '#',
                sponsor: 'EduPath USA'
            }
        ]
    }
};
// ─── Unique Article Content Payloads ───
const content_h1b_cap = `
  <p class="text-xl text-slate-900 font-medium mb-8">USCIS has officially announced the FY 2025 H-1B cap registration dates, marking the beginning of a high-stakes season for thousands of employers and beneficiaries seeking specialty occupation visas.</p>
  <p>The electronic registration period will open on <strong>March 1, 2025</strong>, at 12:00 PM Eastern Time and will close on <strong>March 18, 2025</strong>. This 18-day window is consistent with prior years but comes with significant procedural changes designed to curb abuse of the lottery system.</p>
  <blockquote class="border-l-4 border-primary pl-6 my-8 italic text-slate-800">"The beneficiary-centric selection model ensures every individual has exactly one chance at selection, regardless of the number of registrations submitted on their behalf."</blockquote>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">Key Changes for FY 2025</h2>
  <p class="mb-6">Under the new beneficiary-centric model, USCIS will select unique beneficiaries rather than individual registrations. If a beneficiary is selected, any eligible registrations submitted by different employers for that beneficiary will be approved for filing.</p>
  <div class="my-10 p-8 bg-blue-50 border border-blue-100">
    <h3 class="font-bold text-primary mb-4 flex items-center gap-2"><span class="material-symbols-outlined pb-1">info</span> Critical Dates for H-1B Cap</h3>
    <ul class="space-y-3 text-sm text-slate-600 list-disc pl-5">
      <li><strong>myUSCIS Account Setup:</strong> Create or verify accounts by February 15, 2025.</li>
      <li><strong>Registration Opens:</strong> March 1, 2025, at 12:00 PM ET.</li>
      <li><strong>Registration Closes:</strong> March 18, 2025, at 12:00 PM ET.</li>
      <li><strong>Selection Notifications:</strong> Expected by March 31, 2025.</li>
      <li><strong>Filing Window:</strong> April 1 – June 30, 2025.</li>
    </ul>
  </div>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">What Employers Need to Know</h2>
  <p class="mb-6">Employers must ensure their organizational accounts are up to date and that all legal representatives are properly linked. The $10 registration fee per beneficiary remains unchanged, but USCIS has hinted at potential fee adjustments in future cycles.</p>
  <p>Immigration attorneys recommend reviewing all pending labor condition applications (LCAs) and ensuring wage level compliance before the registration window opens. Any discrepancies could lead to denial or requests for evidence (RFEs) during the petition phase.</p>
  <p class="mt-6">For beneficiaries currently in valid H-1B status, the cap-exempt extension process remains available. Those changing employers should consult with counsel about the transfer timeline relative to the cap season.</p>
`;
const content_eb1_expansion = `
  <p class="text-xl text-slate-900 font-medium mb-8">As the H-1B visa cap continues to leave thousands of highly skilled workers without options, major technology hubs across the United States are pushing for a significant expansion of the EB-1 extraordinary ability visa category.</p>
  <p>Leaders from Silicon Valley, Austin, Boston, and Seattle have jointly submitted a policy proposal to Congress advocating for tripling the annual allotment of EB-1 visas. The proposal argues that the current cap fails to meet the demands of the rapidly evolving AI and semiconductor industries.</p>
  <blockquote class="border-l-4 border-primary pl-6 my-8 italic text-slate-800">"We are in a global talent war. Every EB-1 visa we don't issue is a world-class researcher who ends up building technology for a competitor nation." — Sarah Chen, TechBridge Alliance</blockquote>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">The Current EB-1 Landscape</h2>
  <p class="mb-6">The EB-1 category currently accounts for approximately 28.6% of the total employment-based green card allotment. Unlike the H-1B, it does not require a labor certification, making it attractive for self-petitioning researchers and artists.</p>
  <div class="my-10 p-8 bg-blue-50 border border-blue-100">
    <h3 class="font-bold text-primary mb-4 flex items-center gap-2"><span class="material-symbols-outlined pb-1">trending_up</span> EB-1 by the Numbers</h3>
    <ul class="space-y-3 text-sm text-slate-600 list-disc pl-5">
      <li><strong>Annual EB-1 Allotment:</strong> ~40,040 visas across three subcategories.</li>
      <li><strong>EB-1A (Extraordinary Ability):</strong> No employer sponsorship required.</li>
      <li><strong>EB-1B (Outstanding Researchers):</strong> Requires university or research institution sponsorship.</li>
      <li><strong>EB-1C (Multinational Managers):</strong> For intracompany transferees in executive roles.</li>
    </ul>
  </div>
  <p>The proposal has received bipartisan interest, though immigration hawks have voiced concerns about potential fraud. Tech industry groups counter that the EB-1's rigorous evidentiary standards already provide sufficient safeguards.</p>
  <p class="mt-6">If enacted, the expansion would take effect in fiscal year 2026, providing immediate relief to thousands of applicants currently facing multi-year backlogs in the EB-2 and EB-3 categories.</p>
`;
const content_h1b_rfe = `
  <p class="text-xl text-slate-900 font-medium mb-8">Receiving a Request for Evidence (RFE) on your H-1B petition can be stressful, but with the right strategy, most RFEs can be resolved favorably. This guide walks you through the process step by step.</p>
  <p>An RFE is not a denial—it's USCIS asking for additional documentation to support your petition. Common reasons include insufficient evidence of specialty occupation, wage level concerns, or questions about the employer-employee relationship.</p>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">Step 1: Analyze the RFE Notice Carefully</h2>
  <p class="mb-6">Read every line of the RFE notice. USCIS will specify exactly what additional evidence they need. Most RFEs fall into one of these categories:</p>
  <div class="my-10 p-8 bg-blue-50 border border-blue-100">
    <h3 class="font-bold text-primary mb-4 flex items-center gap-2"><span class="material-symbols-outlined pb-1">checklist</span> Common RFE Categories</h3>
    <ul class="space-y-3 text-sm text-slate-600 list-disc pl-5">
      <li><strong>Specialty Occupation:</strong> Proving the role requires a minimum of a bachelor's degree in a specific field.</li>
      <li><strong>Beneficiary Qualifications:</strong> Demonstrating the worker has the required education and experience.</li>
      <li><strong>Employer-Employee Relationship:</strong> Showing the petitioner has the right to control the work.</li>
      <li><strong>Wage Level:</strong> Justifying that the offered wage meets prevailing wage requirements.</li>
    </ul>
  </div>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">Step 2: Gather Supporting Documentation</h2>
  <p class="mb-6">Work closely with your immigration attorney to compile comprehensive evidence. Expert opinion letters from professors in the field can be particularly persuasive for specialty occupation RFEs.</p>
  <blockquote class="border-l-4 border-primary pl-6 my-8 italic text-slate-800">"The strongest RFE responses don't just answer the question—they overwhelm the adjudicator with evidence that makes approval the only reasonable conclusion."</blockquote>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">Step 3: Submit Before the Deadline</h2>
  <p>You typically have 84 calendar days (12 weeks) to respond. Never wait until the last minute. Submit your response via trackable mail and keep copies of everything. Late responses are treated as abandonments.</p>
`;
const content_asylum = `
  <p class="text-xl text-slate-900 font-medium mb-8">In a landmark 6-3 decision, the Supreme Court has ruled on the scope of asylum protections available to individuals simultaneously pursuing green card applications through family-based immigration channels.</p>
  <p>The ruling in <em>Garcia v. Mayorkas</em> addresses whether asylum seekers who have pending I-130 family petitions can maintain both applications concurrently, or whether they must elect one pathway. The Court sided with broader protections, affirming that dual-track processing is constitutionally permissible.</p>
  <blockquote class="border-l-4 border-primary pl-6 my-8 italic text-slate-800">"The statutory framework does not require an applicant to choose between seeking humanitarian protection and pursuing family unity. Both interests are fundamental to our immigration system." — Justice Elena Kagan, majority opinion</blockquote>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">Immediate Impact on Pending Cases</h2>
  <p class="mb-6">The ruling is expected to affect approximately 47,000 pending cases where applicants had been forced to withdraw either their asylum application or family petition. USCIS will need to issue new guidance within 90 days.</p>
  <div class="my-10 p-8 bg-amber-50 border border-amber-200">
    <h3 class="font-bold text-amber-800 mb-4 flex items-center gap-2"><span class="material-symbols-outlined pb-1">gavel</span> What This Means for You</h3>
    <ul class="space-y-3 text-sm text-slate-600 list-disc pl-5">
      <li>Applicants with both pending asylum and family petitions can maintain both.</li>
      <li>Previously withdrawn applications may be eligible for reopening.</li>
      <li>Immigration courts must apply the new standard immediately.</li>
      <li>Legal aid organizations are preparing pro bono clinics to assist affected individuals.</li>
    </ul>
  </div>
  <p>Immigration advocates have praised the decision as a significant victory for immigrant families. Opponents argue it could create administrative backlogs, but the Court noted that procedural efficiency cannot override constitutional protections.</p>
`;
const content_i485 = `
  <p class="text-xl text-slate-900 font-medium mb-8">USCIS has released updated processing timelines for I-485 Adjustment of Status applications, revealing significant variations across service centers and field offices for the 2024 fiscal year.</p>
  <p>The new data shows that median processing times for employment-based I-485s range from <strong>8.5 months</strong> at the Nebraska Service Center to <strong>23 months</strong> at the National Benefits Center. Family-based applications show similarly wide disparities.</p>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">Processing Times by Category</h2>
  <div class="my-10 p-8 bg-blue-50 border border-blue-100">
    <h3 class="font-bold text-primary mb-4 flex items-center gap-2"><span class="material-symbols-outlined pb-1">schedule</span> Current Median Processing Times</h3>
    <ul class="space-y-3 text-sm text-slate-600 list-disc pl-5">
      <li><strong>EB-1 (All):</strong> 6.5 – 14 months depending on service center.</li>
      <li><strong>EB-2 (NIW):</strong> 12 – 18 months; premium processing now available.</li>
      <li><strong>EB-3 (Skilled Workers):</strong> 10 – 22 months.</li>
      <li><strong>Family-Based (IR-1):</strong> 9 – 16 months.</li>
      <li><strong>Family-Based (F2A):</strong> 14 – 26 months.</li>
    </ul>
  </div>
  <blockquote class="border-l-4 border-primary pl-6 my-8 italic text-slate-800">"The disparity between service centers is unacceptable. Applicants in identical categories shouldn't face processing times that differ by over a year based on geography." — AILA President</blockquote>
  <p>USCIS Director Ur Jaddou has acknowledged the issue and committed to a redistribution initiative that will route cases between service centers to equalize wait times. The agency also announced expanded premium processing for additional I-485 categories beginning in Q3 2024.</p>
  <p class="mt-6">Applicants experiencing processing times beyond the posted ranges should consider filing an inquiry through the USCIS Contact Center or submitting a case inquiry through their congressional representative's office.</p>
`;
const content_gc_interview = `
  <p class="text-xl text-slate-900 font-medium mb-8">The green card marriage interview is one of the most critical steps in the family-based immigration process. Being prepared can make the difference between approval and a lengthy review. Here are the 10 most common questions and how to approach them.</p>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">1. How Did You Meet?</h2>
  <p class="mb-6">Officers want a natural, detailed story. Include specifics: the date, location, who introduced you, what you were both doing at the time. Vague answers raise red flags.</p>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">2. When Did You Start Dating?</h2>
  <p class="mb-6">Be specific about the timeline. Officers often cross-reference this with social media evidence and photographs. Inconsistencies between spouses' answers are noted.</p>
  <div class="my-10 p-8 bg-emerald-50 border border-emerald-200">
    <h3 class="font-bold text-emerald-800 mb-4 flex items-center gap-2"><span class="material-symbols-outlined pb-1">tips_and_updates</span> Pro Tips from Immigration Attorneys</h3>
    <ul class="space-y-3 text-sm text-slate-600 list-disc pl-5">
      <li>Bring <strong>organized evidence</strong>: joint bank statements, lease agreements, utility bills, insurance policies.</li>
      <li>Photographs should span the entire relationship, not just the wedding.</li>
      <li>If you have children together, bring birth certificates.</li>
      <li>Practice answering together, but don't memorize scripts—officers can tell.</li>
    </ul>
  </div>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">3–5: Daily Life Questions</h2>
  <p class="mb-6">Expect questions about your daily routine, sleeping arrangements, who cooks, what you did last weekend, and your spouse's work schedule. These questions are designed to verify you live together as a married couple.</p>
  <blockquote class="border-l-4 border-primary pl-6 my-8 italic text-slate-800">"The interview is not designed to trick you. It's designed to confirm what you've already documented. If your relationship is genuine, the truth is your best preparation."</blockquote>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">6–10: Future Plans & Family</h2>
  <p>Officers may ask about holiday plans, in-laws, future children, and financial arrangements. The key is consistency—both spouses should naturally align on these topics. If there are cultural differences in your relationship, be prepared to explain them openly.</p>
`;
const content_uscis_fees = `
  <p class="text-xl text-slate-900 font-medium mb-8">In a surprising reversal, USCIS has officially rejected a proposed fee increase for family-based immigration petitions following intense public commentary and advocacy from immigration rights organizations.</p>
  <p>The proposed rule, which would have raised I-130 petition fees by 35% and naturalization application fees by 20%, drew over 120,000 public comments during the notice-and-comment period—with the vast majority opposing the increases.</p>
  <blockquote class="border-l-4 border-primary pl-6 my-8 italic text-slate-800">"Pricing families out of the immigration system is not a solution to processing backlogs. We applaud USCIS for listening to the community." — National Immigration Law Center</blockquote>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">Current Fee Structure Remains</h2>
  <p class="mb-6">The following fees will remain unchanged for the foreseeable future:</p>
  <div class="my-10 p-8 bg-blue-50 border border-blue-100">
    <h3 class="font-bold text-primary mb-4 flex items-center gap-2"><span class="material-symbols-outlined pb-1">payments</span> Key Immigration Filing Fees</h3>
    <ul class="space-y-3 text-sm text-slate-600 list-disc pl-5">
      <li><strong>I-130 (Family Petition):</strong> $535</li>
      <li><strong>I-485 (Adjustment of Status):</strong> $1,140</li>
      <li><strong>N-400 (Naturalization):</strong> $640</li>
      <li><strong>I-765 (Employment Authorization):</strong> $410</li>
      <li><strong>I-131 (Travel Document):</strong> $575</li>
    </ul>
  </div>
  <p>However, USCIS emphasized that fee adjustments remain necessary to fund operations and reduce backlogs. The agency plans to submit a revised fee proposal in 2025 that incorporates a sliding scale based on household income, a concept that received broad support during the comment period.</p>
  <p class="mt-6">Fee waiver eligibility remains available for applicants demonstrating financial hardship. Form I-912 can be filed concurrently with most benefit applications.</p>
`;
const content_f1_grants = `
  <p class="text-xl text-slate-900 font-medium mb-8">A coalition of venture capital firms and university incubators has launched a landmark $200 million grant program specifically designed for immigrant founders currently holding F-1 OPT work authorization.</p>
  <p>The initiative, called <strong>FounderBridge</strong>, aims to address the unique challenges faced by international student entrepreneurs who often cannot access traditional startup funding due to their immigration status constraints.</p>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">Program Structure</h2>
  <p class="mb-6">FounderBridge offers three tiers of support:</p>
  <div class="my-10 p-8 bg-blue-50 border border-blue-100">
    <h3 class="font-bold text-primary mb-4 flex items-center gap-2"><span class="material-symbols-outlined pb-1">rocket_launch</span> Grant Tiers</h3>
    <ul class="space-y-3 text-sm text-slate-600 list-disc pl-5">
      <li><strong>Seed Stage ($25K–$50K):</strong> For pre-revenue startups with a working prototype. Includes visa advisory support.</li>
      <li><strong>Growth Stage ($100K–$250K):</strong> For startups with initial traction. Includes O-1 visa sponsorship guidance.</li>
      <li><strong>Scale Stage ($500K–$1M):</strong> For companies ready to hire. Includes full immigration legal support for founder and key employees.</li>
    </ul>
  </div>
  <blockquote class="border-l-4 border-primary pl-6 my-8 italic text-slate-800">"40% of Fortune 500 companies were founded by immigrants or their children. We're ensuring the next generation of founders doesn't slip through the cracks of our immigration system." — Marcus Wei, FounderBridge Director</blockquote>
  <p>Applications open on April 1, 2024, with rolling admissions through December. The program also pairs founders with immigration attorneys who specialize in O-1A extraordinary ability petitions and EB-1A self-petitions.</p>
`;
const content_f1_stem = `
  <p class="text-xl text-slate-900 font-medium mb-8">The Student and Exchange Visitor Program (SEVP) has announced new reporting requirements for F-1 students on STEM OPT extensions, effective for the 2024-2025 academic year.</p>
  <p>Under the updated regulations, STEM OPT participants must now submit quarterly validation reports through the SEVP Portal, replacing the previous semi-annual reporting cycle. The change was prompted by audit findings showing that 23% of STEM OPT employers were not meeting their training plan obligations.</p>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">New Quarterly Requirements</h2>
  <div class="my-10 p-8 bg-amber-50 border border-amber-200">
    <h3 class="font-bold text-amber-800 mb-4 flex items-center gap-2"><span class="material-symbols-outlined pb-1">warning</span> Compliance Deadlines</h3>
    <ul class="space-y-3 text-sm text-slate-600 list-disc pl-5">
      <li><strong>Q1 Report:</strong> Due by January 15 for the Oct–Dec period.</li>
      <li><strong>Q2 Report:</strong> Due by April 15 for the Jan–Mar period.</li>
      <li><strong>Q3 Report:</strong> Due by July 15 for the Apr–Jun period.</li>
      <li><strong>Q4 Report:</strong> Due by October 15 for the Jul–Sep period.</li>
    </ul>
  </div>
  <blockquote class="border-l-4 border-primary pl-6 my-8 italic text-slate-800">"Students who fail to submit quarterly reports will receive a 30-day cure notice. Continued non-compliance will result in SEVIS record termination." — SEVP Policy Guidance</blockquote>
  <p class="mb-6">Designated School Officials (DSOs) will also be required to verify employer training plan compliance during each reporting cycle. Universities with large international student populations are scrambling to hire additional advisors to handle the increased workload.</p>
  <p>STEM OPT participants are advised to set calendar reminders for each reporting deadline and maintain ongoing communication with both their employer's training supervisor and their university's international student office.</p>
`;
const content_digital_nomad = `
  <p class="text-xl text-slate-900 font-medium mb-8">As remote work becomes permanent for millions of professionals, the question of legal status while working abroad has created a complex intersection between B1/B2 tourist visas and the growing category of digital nomad visas offered by other countries.</p>
  <p>The critical distinction that many travelers miss: <strong>a B1/B2 visa does not authorize employment for a US company while physically present in the United States</strong>. However, if you're a foreign national working remotely for a non-US employer while visiting on B1/B2 status, the legal analysis becomes surprisingly nuanced.</p>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">Digital Nomad Visas: Top Options for 2024</h2>
  <div class="my-10 p-8 bg-blue-50 border border-blue-100">
    <h3 class="font-bold text-primary mb-4 flex items-center gap-2"><span class="material-symbols-outlined pb-1">public</span> Countries with Active Digital Nomad Programs</h3>
    <ul class="space-y-3 text-sm text-slate-600 list-disc pl-5">
      <li><strong>Portugal:</strong> D7 Visa – $760/mo income requirement. Pathway to EU residency.</li>
      <li><strong>Spain:</strong> Digital Nomad Visa – Must earn 200% of Spanish minimum wage.</li>
      <li><strong>Croatia:</strong> 1-year permit – No local income tax on foreign earnings.</li>
      <li><strong>Thailand:</strong> Long-Term Resident Visa – 10-year visa for high earners.</li>
      <li><strong>Colombia:</strong> Digital Nomad Visa – 2-year renewable, $3K/mo income minimum.</li>
    </ul>
  </div>
  <blockquote class="border-l-4 border-primary pl-6 my-8 italic text-slate-800">"The biggest mistake remote workers make is assuming their B1/B2 allows them to work remotely during short US visits. The law is not that simple, and violations can result in future visa denials."</blockquote>
  <p>For US citizens and green card holders working abroad, the key considerations are tax obligations (the US taxes worldwide income regardless of location) and maintaining ties for immigration purposes. Green card holders who spend extended periods outside the US risk abandonment of permanent residence.</p>
`;
const content_consulate_wait = `
  <p class="text-xl text-slate-900 font-medium mb-8">New data from the State Department reveals a significant drop in consulate interview wait times for B1/B2 tourist visa applicants at several high-volume posts across India and Southeast Asia.</p>
  <p>The improvements are attributed to a combination of increased staffing, expanded interview capacity, and the introduction of interview waiver programs for certain renewal applicants. The changes represent the most significant improvement in consular processing since the post-pandemic recovery began.</p>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">Current Wait Times at Key Posts</h2>
  <div class="my-10 p-8 bg-blue-50 border border-blue-100">
    <h3 class="font-bold text-primary mb-4 flex items-center gap-2"><span class="material-symbols-outlined pb-1">location_on</span> Tourist Visa (B1/B2) Wait Times</h3>
    <ul class="space-y-3 text-sm text-slate-600 list-disc pl-5">
      <li><strong>Mumbai:</strong> 45 days (down from 400+ days in 2023)</li>
      <li><strong>New Delhi:</strong> 30 days (down from 350 days)</li>
      <li><strong>Chennai:</strong> 21 days (down from 280 days)</li>
      <li><strong>Hyderabad:</strong> 28 days (down from 320 days)</li>
      <li><strong>Bangkok:</strong> 14 days (down from 90 days)</li>
      <li><strong>Manila:</strong> 18 days (down from 120 days)</li>
    </ul>
  </div>
  <blockquote class="border-l-4 border-primary pl-6 my-8 italic text-slate-800">"We've processed more visa interviews in Q1 2024 than in all of 2022. The staffing surge authorized by Congress is delivering real results." — State Department Consular Affairs spokesperson</blockquote>
  <p>H-1B and L-1 visa wait times have also improved but remain significantly longer than tourist visas at most posts. The State Department has prioritized student (F-1) and exchange visitor (J-1) visas ahead of the fall academic season.</p>
`;
const content_visa_bulletin = `
  <p class="text-xl text-slate-900 font-medium mb-8">The April 2024 Visa Bulletin has sent shockwaves through the immigration community, revealing massive retrogression in the EB-2 category for India-born applicants—the largest single-month backward movement in over a decade.</p>
  <p>The EB-2 India priority date has retrogressed from <strong>January 1, 2012</strong> to <strong>June 1, 2009</strong>—a staggering backward movement of approximately 2.5 years in a single bulletin cycle. This means thousands of applicants who were current last month are no longer eligible to file their I-485 applications.</p>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">Category-by-Category Analysis</h2>
  <div class="my-10 p-8 bg-rose-50 border border-rose-200">
    <h3 class="font-bold text-rose-800 mb-4 flex items-center gap-2"><span class="material-symbols-outlined pb-1">trending_down</span> April 2024 Final Action Dates</h3>
    <ul class="space-y-3 text-sm text-slate-600 list-disc pl-5">
      <li><strong>EB-1 India:</strong> Current (no change)</li>
      <li><strong>EB-2 India:</strong> June 1, 2009 (retrogressed from Jan 1, 2012)</li>
      <li><strong>EB-3 India:</strong> July 1, 2012 (advanced 2 weeks)</li>
      <li><strong>EB-2 China:</strong> March 1, 2020 (retrogressed from June 15, 2020)</li>
      <li><strong>EB-5 (Unreserved):</strong> Current for all countries</li>
    </ul>
  </div>
  <blockquote class="border-l-4 border-primary pl-6 my-8 italic text-slate-800">"This retrogression is devastating for Indian professionals who have been waiting over a decade. Many will now face an additional 3–5 years of uncertainty." — Cyrus Mehta, immigration attorney</blockquote>
  <p>Immigration attorneys are advising affected clients to explore EB-1 self-petition options, EB-3 downgrade strategies, and National Interest Waiver (NIW) filings as potential alternatives. The retrogression also highlights the urgent need for legislative reform to eliminate per-country caps.</p>
`;
const content_premium_processing = `
  <p class="text-xl text-slate-900 font-medium mb-8">Is the newly expanded premium processing service worth its multi-thousand dollar price tag? We break down the costs, benefits, and strategic considerations for every major petition category now eligible for expedited adjudication.</p>
  <p>USCIS has significantly expanded premium processing availability in 2024, extending the service to I-140 EB-1C and EB-2 NIW petitions, certain I-539 change of status applications, and I-765 employment authorization documents for specific categories.</p>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">Current Premium Processing Fees</h2>
  <div class="my-10 p-8 bg-blue-50 border border-blue-100">
    <h3 class="font-bold text-primary mb-4 flex items-center gap-2"><span class="material-symbols-outlined pb-1">speed</span> Fee Structure by Form Type</h3>
    <ul class="space-y-3 text-sm text-slate-600 list-disc pl-5">
      <li><strong>I-129 (H-1B, L-1, O-1, etc.):</strong> $2,805 – 15 business day processing.</li>
      <li><strong>I-140 (EB-1, EB-2, EB-3):</strong> $2,805 – 45 calendar day processing.</li>
      <li><strong>I-539 (Change of Status):</strong> $1,750 – 30 business day processing.</li>
      <li><strong>I-765 (EAD):</strong> $1,500 – 30 business day processing.</li>
    </ul>
  </div>
  <h2 class="text-2xl font-bold text-slate-900 mt-12 mb-4 font-['Plus_Jakarta_Sans']">When It's Worth It</h2>
  <p class="mb-6">Premium processing makes strategic sense when: you're facing an expiring status deadline, you need work authorization to start a new position, or uncertainty is costing you business opportunities. For I-140 petitions, premium processing also provides faster approval for H-1B extensions beyond the 6-year limit.</p>
  <blockquote class="border-l-4 border-primary pl-6 my-8 italic text-slate-800">"Premium processing isn't just about speed—it's about certainty. In immigration, knowing your answer in 15 days versus 15 months can be worth far more than the filing fee."</blockquote>
  <p>However, premium processing does not guarantee approval. If USCIS issues an RFE during premium processing, the 15-day clock resets once you respond. For straightforward petitions with strong evidence, the investment usually pays for itself in reduced anxiety and faster authorization.</p>
`;
const NewsData = [
    {
        id: 999,
        title: 'DUMMY ARTICLE FOR LAYOUT TESTING',
        category: 'visa-news',
        subcategory: 'h1b-visa',
        date: 'APR 05, 2026',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATI85OtLzj_sQ0MJSzY7OKWNh756JbG2932o_Ri9ycQHBm4OUaRqbyh-FeoXP0XLK493eluw7EUp-4FIA4-9luW02by7tRs_mL_MR_Ws222g37OrmvEvjAYGl9unpTvv8orNCrC9rejkU4y7tGbBYbgwpbx9fjIe5PLKHuEmm0OMlCoPk09_tkiejWjtYv2DTF5AsYoI39e1G3_eTfY8wHtn03Bugod6gUkWAKFyunVqistTzLjMBr3-q_ODnv9-mLSblCOpny5Vs',
        tag: 'TEST',
        content: '<p>This is a completely new dummy article to securely bypass the Vercel cache and test the new layout!</p><p>Check the width of the article container vs the width of the related articles component underneath this text!</p>'
    },
    // Visa News > H1B Visa
    {
        id: 1,
        title: 'USCIS Announces FY 2025 H-1B Cap Registration Dates',
        category: 'visa-news',
        subcategory: 'h1b-visa',
        date: 'MAR 14, 2024',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATI85OtLzj_sQ0MJSzY7OKWNh756JbG2932o_Ri9ycQHBm4OUaRqbyh-FeoXP0XLK493eluw7EUp-4FIA4-9luW02by7tRs_mL_MR_Ws222g37OrmvEvjAYGl9unpTvv8orNCrC9rejkU4y7tGbBYbgwpbx9fjIe5PLKHuEmm0OMlCoPk09_tkiejWjtYv2DTF5AsYoI39e1G3_eTfY8wHtn03Bugod6gUkWAKFyunVqistTzLjMBr3-q_ODnv9-mLSblCOpny5Vs',
        tag: 'H1B VISA',
        content: content_h1b_cap
    },
    {
        id: 2,
        title: 'Tech Hubs Push for EB-1 Expansion Amidst H-1B Shortages',
        category: 'visa-news',
        subcategory: 'h1b-visa',
        date: 'MAR 12, 2024',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoplYKZG0QKQQ9IQdfcHZhK3y9AwyMxcMCse8pg22L8N4EOb0u0_21wvZOODKiTWUVzzDhXQCmC43rxzxi0rVKUTgaZng0AS2OgM_o1LTi_RI9W3oyxRlnfT5_2BD4g2Nu8BUymyUE3WPC_GgPuhCxWVjk-tcRHE1DVQzXQ5Q534fbhwgIMqeyshtNl3L6idfwwlp1HYcfNxPD5NMSe1mI4hoJdTytWjFQ_w3wZVPRW9FQtf6KsesizAgwvuEUJQ2KEHNYc-BzLDA',
        tag: 'H1B VISA',
        content: content_eb1_expansion
    },
    // Visa Guides > How-To
    {
        id: 3,
        title: 'How to Respond to an H-1B Request for Evidence (RFE)',
        category: 'visa-guides',
        subcategory: 'how-to',
        date: 'MAR 10, 2024',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOUgkbn0ejx90kCo_WeuweNcC65_qQXwgeYf0l_IkxuatVrUe987ygmQ6qrFxfTEj1neDn7iQXX9JTzQaRhcH_f7xPo4kq5bIUNlRibi9DukYjZvnk0kP2w0gEc9ZZaqG0K-1lZwmGT1e5ZQ9XxahHOsJRXf9s83cryBJmDoeO1t7G6zt6Nsl6PPZ9Ephlcr4fWzHt6UtzjqAkf2eXYkBSawGCgUxNfjJEM-I8AdbfyveerG3Ivnl0OyJPP6z5RCBAlP1qjUHkMbo',
        tag: 'HOW-TO',
        content: content_h1b_rfe
    },
    // Visa News > Green Card
    {
        id: 4,
        title: 'Supreme Court Rules on Asylum Protections for Green Card Seekers',
        category: 'visa-news',
        subcategory: 'green-card',
        date: 'MAR 14, 2024',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKyR3TjqB6H5OPwDD5Vz__oLTQIgC0VBZ9C2ZYm0RyBpgwXOH7WTjXTgwXJqWkuf7gRFQsTLhbqloYl9yK55LeUDv8sKXz1ekJHun-CZk70aVh5t5VEAxPFqHGZhcNKKjySgnb-cr9Endyb8WZaM1-i-HhW2s5LrwsuMcpUNBBkzzfJUa5SI_56b3PrbUkM48CFUJsvPnOULDbOk-7MbOO2Pfvwp6Adwopm5-RRqt7piQ5YH79s2ShR6BJ8_KPM-Y-cw18-MzUinI',
        tag: 'GREEN CARD',
        content: content_asylum
    },
    // Processing Times
    {
        id: 5,
        title: 'Understanding the 2024 Processing Timeline for I-485 Applications',
        category: 'processing-times',
        subcategory: 'index',
        date: 'MAR 11, 2024',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKs0Kp0aBoh8ydCgZzM4KwfpiM3qCjegaJqFzBP4vQpITa4xP7FwBjBwaqMJDszQRyfMTxdDdwG-tqc5bIUdPEcmoyWQJPQbDzFdsOsTjwwDmIyY1dbuV0JdPVuVAKedrbRT7z1wJOV23Jrfe5Luy8lRk2kGiZ-yfqPXbVoZKqrxszIB5FsxT_szvcPdBzR07-lGT75o2eW8PqXKHF2j4v448g5e_28trTBeZO2L97lDX2Nfc3LmkLW2_gVBrnBwhtO4h-JtINVFg',
        tag: 'PROCESSING TIMES',
        content: content_i485
    },
    // Visa Guides > How-To
    {
        id: 6,
        title: 'Green Card Marriage Interview: 10 Questions to Prepare For',
        category: 'visa-guides',
        subcategory: 'how-to',
        date: 'FEB 28, 2024',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdy4uD-BQ03LhtM8lZrABIkK0qOX4d2sGQJkbi3giDIUF3KG86OFIwheFA9pZSh0OgSzW4yVfpZ2UgQ1im5w7KDIy0sTg01HBEFW6gFmw2h4vGlWaacqGnI4JQRxu3EjG9dqreIp2AJ6qUXM-SPetQ75U0J0VRH0I3jxVuvyHzlZdV_sNcqeAd22jJfCF03ZnRQlkp4dnfRpL3s9igCZOrC5pJcVXMgfue_QyH0itIy8ojMUiWizLukhQDcurQgTsz9NiSSBcFMXQ',
        tag: 'HOW-TO',
        content: content_gc_interview
    },
    // Visa News > USCIS Updates
    {
        id: 7,
        title: 'USCIS Rejects Proposed Green Card Fee Hikes for Family Petitions',
        category: 'visa-news',
        subcategory: 'uscis',
        date: 'FEB 25, 2024',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATI85OtLzj_sQ0MJSzY7OKWNh756JbG2932o_Ri9ycQHBm4OUaRqbyh-FeoXP0XLK493eluw7EUp-4FIA4-9luW02by7tRs_mL_MR_Ws222g37OrmvEvjAYGl9unpTvv8orNCrC9rejkU4y7tGbBYbgwpbx9fjIe5PLKHuEmm0OMlCoPk09_tkiejWjtYv2DTF5AsYoI39e1G3_eTfY8wHtn03Bugod6gUkWAKFyunVqistTzLjMBr3-q_ODnv9-mLSblCOpny5Vs',
        tag: 'USCIS UPDATES',
        content: content_uscis_fees
    },
    // Visa News > F1 & OPT/CPT
    {
        id: 8,
        title: 'New Grant Programs for Immigrant Founders on F-1 OPT',
        category: 'visa-news',
        subcategory: 'f1-opt-cpt',
        date: 'MAR 08, 2024',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdy4uD-BQ03LhtM8lZrABIkK0qOX4d2sGQJkbi3giDIUF3KG86OFIwheFA9pZSh0OgSzW4yVfpZ2UgQ1im5w7KDIy0sTg01HBEFW6gFmw2h4vGlWaacqGnI4JQRxu3EjG9dqreIp2AJ6qUXM-SPetQ75U0J0VRH0I3jxVuvyHzlZdV_sNcqeAd22jJfCF03ZnRQlkp4dnfRpL3s9igCZOrC5pJcVXMgfue_QyH0itIy8ojMUiWizLukhQDcurQgTsz9NiSSBcFMXQ',
        tag: 'F1 & OPT/CPT',
        content: content_f1_grants
    },
    {
        id: 9,
        title: 'F-1 Students Face New Reporting Requirements for STEM OPT',
        category: 'visa-news',
        subcategory: 'f1-opt-cpt',
        date: 'FEB 20, 2024',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoplYKZG0QKQQ9IQdfcHZhK3y9AwyMxcMCse8pg22L8N4EOb0u0_21wvZOODKiTWUVzzDhXQCmC43rxzxi0rVKUTgaZng0AS2OgM_o1LTi_RI9W3oyxRlnfT5_2BD4g2Nu8BUymyUE3WPC_GgPuhCxWVjk-tcRHE1DVQzXQ5Q534fbhwgIMqeyshtNl3L6idfwwlp1HYcfNxPD5NMSe1mI4hoJdTytWjFQ_w3wZVPRW9FQtf6KsesizAgwvuEUJQ2KEHNYc-BzLDA',
        tag: 'F1 & OPT/CPT',
        content: content_f1_stem
    },
    // Visa News > B1/B2
    {
        id: 10,
        title: 'Digital Nomad Visa Options for 2024 vs B1/B2 Renewals',
        category: 'visa-news',
        subcategory: 'b1-b2',
        date: 'MAR 14, 2024',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOUgkbn0ejx90kCo_WeuweNcC65_qQXwgeYf0l_IkxuatVrUe987ygmQ6qrFxfTEj1neDn7iQXX9JTzQaRhcH_f7xPo4kq5bIUNlRibi9DukYjZvnk0kP2w0gEc9ZZaqG0K-1lZwmGT1e5ZQ9XxahHOsJRXf9s83cryBJmDoeO1t7G6zt6Nsl6PPZ9Ephlcr4fWzHt6UtzjqAkf2eXYkBSawGCgUxNfjJEM-I8AdbfyveerG3Ivnl0OyJPP6z5RCBAlP1qjUHkMbo',
        tag: 'B1/B2',
        content: content_digital_nomad
    },
    // Processing Times > Consulate Alerts
    {
        id: 11,
        title: 'Consulate Interview Wait Times Drop for Tourist Visas in India',
        category: 'processing-times',
        subcategory: 'consulate',
        date: 'JAN 15, 2024',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOUgkbn0ejx90kCo_WeuweNcC65_qQXwgeYf0l_IkxuatVrUe987ygmQ6qrFxfTEj1neDn7iQXX9JTzQaRhcH_f7xPo4kq5bIUNlRibi9DukYjZvnk0kP2w0gEc9ZZaqG0K-1lZwmGT1e5ZQ9XxahHOsJRXf9s83cryBJmDoeO1t7G6zt6Nsl6PPZ9Ephlcr4fWzHt6UtzjqAkf2eXYkBSawGCgUxNfjJEM-I8AdbfyveerG3Ivnl0OyJPP6z5RCBAlP1qjUHkMbo',
        tag: 'CONSULATE ALERTS',
        content: content_consulate_wait
    },
    // Visa Bulletin
    {
        id: 12,
        title: 'Visa Bulletin For April 2024: Massive Retrogression in EB-2',
        category: 'visa-bulletin',
        subcategory: 'index',
        date: 'MAR 10, 2024',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKs0Kp0aBoh8ydCgZzM4KwfpiM3qCjegaJqFzBP4vQpITa4xP7FwBjBwaqMJDszQRyfMTxdDdwG-tqc5bIUdPEcmoyWQJPQbDzFdsOsTjwwDmIyY1dbuV0JdPVuVAKedrbRT7z1wJOV23Jrfe5Luy8lRk2kGiZ-yfqPXbVoZKqrxszIB5FsxT_szvcPdBzR07-lGT75o2eW8PqXKHF2j4v448g5e_28trTBeZO2L97lDX2Nfc3LmkLW2_gVBrnBwhtO4h-JtINVFg',
        tag: 'VISA BULLETIN',
        content: content_visa_bulletin
    },
    // Visa Guides > FAQs
    {
        id: 13,
        title: 'Is Premium Processing Worth the Increased Multi-Thousand Dollar Cost?',
        category: 'visa-guides',
        subcategory: 'faqs',
        date: 'FEB 01, 2024',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKs0Kp0aBoh8ydCgZzM4KwfpiM3qCjegaJqFzBP4vQpITa4xP7FwBjBwaqMJDszQRyfMTxdDdwG-tqc5bIUdPEcmoyWQJPQbDzFdsOsTjwwDmIyY1dbuV0JdPVuVAKedrbRT7z1wJOV23Jrfe5Luy8lRk2kGiZ-yfqPXbVoZKqrxszIB5FsxT_szvcPdBzR07-lGT75o2eW8PqXKHF2j4v448g5e_28trTBeZO2L97lDX2Nfc3LmkLW2_gVBrnBwhtO4h-JtINVFg',
        tag: 'FAQS',
        content: content_premium_processing
    }
];
// ─── Live Updates Data ───
const LiveUpdatesData = [
    {
        slug: 'h1b-visa-reform-2025',
        title: 'H-1B Visa Reform Act 2025: Live Congressional Updates',
        category: 'H1B VISA',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATI85OtLzj_sQ0MJSzY7OKWNh756JbG2932o_Ri9ycQHBm4OUaRqbyh-FeoXP0XLK493eluw7EUp-4FIA4-9luW02by7tRs_mL_MR_Ws222g37OrmvEvjAYGl9unpTvv8orNCrC9rejkU4y7tGbBYbgwpbx9fjIe5PLKHuEmm0OMlCoPk09_tkiejWjtYv2DTF5AsYoI39e1G3_eTfY8wHtn03Bugod6gUkWAKFyunVqistTzLjMBr3-q_ODnv9-mLSblCOpny5Vs',
        video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        startDate: 'MAR 28, 2025',
        summary: 'Follow live as Congress debates the most significant H-1B visa reform in over a decade. The bill proposes changes to the lottery system, wage requirements, and employer accountability measures.',
        isLive: true,
        updates: [
            {
                id: 1,
                time: '2:45 PM',
                date: 'MAR 28',
                type: 'pinned',
                headline: 'Bill Officially Introduced on Senate Floor',
                content: 'Senator Johnson introduces the H-1B Modernization Act of 2025, co-sponsored by 14 senators from both parties. The bill proposes replacing the random lottery with a wage-based selection system.',
                media: null
            },
            {
                id: 2,
                time: '2:30 PM',
                date: 'MAR 28',
                type: 'breaking',
                headline: 'BREAKING: Committee Votes 18-7 to Advance Bill',
                content: 'The Senate Judiciary Committee has voted overwhelmingly to advance the H-1B reform bill to the full Senate floor. This bipartisan vote signals strong momentum for the legislation.',
                media: {
                    type: 'video',
                    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                    caption: 'Senate Judiciary Committee vote announcement'
                }
            },
            {
                id: 3,
                time: '1:55 PM',
                date: 'MAR 28',
                type: 'important',
                headline: 'Tech Industry Coalition Issues Joint Statement',
                content: 'A coalition of 45 major technology companies including Google, Microsoft, and Meta have issued a joint statement supporting the wage-based selection model but opposing the proposed 20% fee increase for large employers.',
                media: {
                    type: 'image',
                    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoplYKZG0QKQQ9IQdfcHZhK3y9AwyMxcMCse8pg22L8N4EOb0u0_21wvZOODKiTWUVzzDhXQCmC43rxzxi0rVKUTgaZng0AS2OgM_o1LTi_RI9W3oyxRlnfT5_2BD4g2Nu8BUymyUE3WPC_GgPuhCxWVjk-tcRHE1DVQzXQ5Q534fbhwgIMqeyshtNl3L6idfwwlp1HYcfNxPD5NMSe1mI4hoJdTytWjFQ_w3wZVPRW9FQtf6KsesizAgwvuEUJQ2KEHNYc-BzLDA',
                    caption: 'Tech leaders meeting with Senate staffers on Capitol Hill'
                }
            },
            {
                id: 4,
                time: '1:20 PM',
                date: 'MAR 28',
                type: 'normal',
                headline: 'Key Amendment Proposed for STEM Workers',
                content: 'Senator Martinez introduces an amendment that would create a separate allocation pool for STEM PhD graduates, exempting them from the annual cap entirely. The amendment mirrors provisions in the failed EAGLE Act.',
                media: null
            },
            {
                id: 5,
                time: '12:45 PM',
                date: 'MAR 28',
                type: 'normal',
                headline: 'USCIS Director Testifies on Implementation Timeline',
                content: 'USCIS Director Ur Jaddou tells the committee that implementing the wage-based selection system would require 18-24 months and an estimated $340 million in technology upgrades to the current registration system.',
                media: {
                    type: 'video',
                    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                    caption: 'USCIS Director testimony highlights'
                }
            },
            {
                id: 6,
                time: '12:10 PM',
                date: 'MAR 28',
                type: 'important',
                headline: 'Opposition Bloc Forms Against Wage Threshold Increase',
                content: 'A group of 8 senators from both parties are opposing the provision that would raise the minimum prevailing wage requirement from Level 1 to Level 2, arguing it would disproportionately impact startups and universities.',
                media: null
            },
            {
                id: 7,
                time: '11:30 AM',
                date: 'MAR 28',
                type: 'normal',
                headline: 'Immigration Attorneys Association Warns of Transition Issues',
                content: 'AILA President issued a statement warning that the proposed 6-month transition period is insufficient and could create a "processing cliff" affecting tens of thousands of pending petitions.',
                media: null
            },
            {
                id: 8,
                time: '10:55 AM',
                date: 'MAR 28',
                type: 'normal',
                headline: 'Labor Department Releases Impact Analysis',
                content: 'The Department of Labor projects that the wage-based selection model would increase average H-1B salaries by 12-18% while reducing total approvals by approximately 15,000 annually.',
                media: {
                    type: 'image',
                    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKs0Kp0aBoh8ydCgZzM4KwfpiM3qCjegaJqFzBP4vQpITa4xP7FwBjBwaqMJDszQRyfMTxdDdwG-tqc5bIUdPEcmoyWQJPQbDzFdsOsTjwwDmIyY1dbuV0JdPVuVAKedrbRT7z1wJOV23Jrfe5Luy8lRk2kGiZ-yfqPXbVoZKqrxszIB5FsxT_szvcPdBzR07-lGT75o2eW8PqXKHF2j4v448g5e_28trTBeZO2L97lDX2Nfc3LmkLW2_gVBrnBwhtO4h-JtINVFg',
                    caption: 'Projected impact on H-1B approvals under wage-based model'
                }
            },
            {
                id: 9,
                time: '10:15 AM',
                date: 'MAR 28',
                type: 'normal',
                headline: 'Hearing Opens with Bipartisan Tone',
                content: 'Committee Chair Senator Durbin opens the hearing emphasizing that immigration reform is "not a partisan issue but an economic imperative" as the US faces a shortage of 1.4 million tech workers by 2026.',
                media: null
            },
            {
                id: 10,
                time: '9:30 AM',
                date: 'MAR 28',
                type: 'normal',
                headline: 'Protesters Gather Outside Capitol',
                content: 'Hundreds of H-1B holders and their families gather on the National Mall to advocate for reform. Many carry signs reading "We Built Silicon Valley" and "Fix the Backlog."',
                media: {
                    type: 'image',
                    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOUgkbn0ejx90kCo_WeuweNcC65_qQXwgeYf0l_IkxuatVrUe987ygmQ6qrFxfTEj1neDn7iQXX9JTzQaRhcH_f7xPo4kq5bIUNlRibi9DukYjZvnk0kP2w0gEc9ZZaqG0K-1lZwmGT1e5ZQ9XxahHOsJRXf9s83cryBJmDoeO1t7G6zt6Nsl6PPZ9Ephlcr4fWzHt6UtzjqAkf2eXYkBSawGCgUxNfjJEM-I8AdbfyveerG3Ivnl0OyJPP6z5RCBAlP1qjUHkMbo',
                    caption: 'Immigration advocates rally at the National Mall'
                }
            },
            {
                id: 11,
                time: '8:45 AM',
                date: 'MAR 28',
                type: 'normal',
                headline: 'White House Issues Statement of Support',
                content: 'The White House released a Statement of Administration Policy expressing support for the bill\'s core provisions while requesting modifications to the employer penalty provisions.',
                media: null
            },
            {
                id: 12,
                time: '8:00 AM',
                date: 'MAR 28',
                type: 'normal',
                headline: 'Pre-Hearing Briefing: What to Expect Today',
                content: 'Today\'s Senate Judiciary Committee hearing will feature testimony from USCIS leadership, tech industry representatives, labor economists, and immigration attorneys. The session is expected to last 4-6 hours.',
                media: null
            }
        ],
        // Queued updates that simulate "real-time" arrivals
        pendingUpdates: [
            {
                id: 13,
                time: '3:10 PM',
                date: 'MAR 28',
                type: 'breaking',
                headline: 'BREAKING: Full Senate Vote Scheduled for Next Week',
                content: 'Senate Majority Leader has confirmed that a full Senate vote on the H-1B Modernization Act will be scheduled for the week of April 7, 2025. This is faster than most analysts predicted.',
                media: null
            },
            {
                id: 14,
                time: '3:25 PM',
                date: 'MAR 28',
                type: 'normal',
                headline: 'CBO Releases Cost Estimate for the Bill',
                content: 'The Congressional Budget Office estimates the bill would reduce the federal deficit by $2.1 billion over 10 years through increased filing fees and economic growth from higher-wage workers.',
                media: null
            }
        ]
    },
    {
        slug: 'uscis-green-card-backlog-crisis',
        title: 'USCIS Green Card Backlog Crisis: Emergency Measures Live',
        category: 'GREEN CARD',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKyR3TjqB6H5OPwDD5Vz__oLTQIgC0VBZ9C2ZYm0RyBpgwXOH7WTjXTgwXJqWkuf7gRFQsTLhbqloYl9yK55LeUDv8sKXz1ekJHun-CZk70aVh5t5VEAxPFqHGZhcNKKjySgnb-cr9Endyb8WZaM1-i-HhW2s5LrwsuMcpUNBBkzzfJUa5SI_56b3PrbUkM48CFUJsvPnOULDbOk-7MbOO2Pfvwp6Adwopm5-RRqt7piQ5YH79s2ShR6BJ8_KPM-Y-cw18-MzUinI',
        startDate: 'MAR 27, 2025',
        summary: 'USCIS announces emergency measures to address the employment-based green card backlog affecting over 1.8 million applicants. Follow live updates as the agency rolls out unprecedented processing changes.',
        isLive: true,
        updates: [
            {
                id: 1,
                time: '4:15 PM',
                date: 'MAR 27',
                type: 'pinned',
                headline: 'USCIS Announces "Operation Clear Path" Initiative',
                content: 'Director Jaddou unveils a comprehensive 12-month plan to reduce the employment-based green card backlog by 40%. The initiative includes weekend processing, temporary duty assignments, and AI-assisted adjudication for straightforward cases.',
                media: null
            },
            {
                id: 2,
                time: '3:50 PM',
                date: 'MAR 27',
                type: 'breaking',
                headline: 'BREAKING: Per-Country Cap Waiver for FY2025',
                content: 'In a historic move, USCIS will temporarily waive per-country caps for employment-based green cards for the remainder of FY2025, citing extraordinary circumstances under INA Section 202(a)(5).',
                media: null
            },
            {
                id: 3,
                time: '3:20 PM',
                date: 'MAR 27',
                type: 'important',
                headline: '150,000 Employment Authorization Extensions Approved',
                content: 'USCIS has batch-approved 150,000 pending employment authorization document (EAD) renewals for applicants with pending I-485s, effective immediately. Cards will be mailed within 30 days.',
                media: null
            },
            {
                id: 4,
                time: '2:45 PM',
                date: 'MAR 27',
                type: 'normal',
                headline: 'Congressional Leaders React to Emergency Measures',
                content: 'Bipartisan support emerges on Capitol Hill, with both the House and Senate Judiciary Committee chairs praising the measures as "long overdue" and "a critical step toward fixing a broken system."',
                media: null
            },
            {
                id: 5,
                time: '2:10 PM',
                date: 'MAR 27',
                type: 'normal',
                headline: 'Nebraska Service Center to Process Cases 24/7',
                content: 'The Nebraska Service Center will begin round-the-clock processing of I-140 petitions starting April 1. USCIS is hiring 500 temporary adjudicators to support the effort.',
                media: {
                    type: 'image',
                    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9ZoBZ1yL9qO2FirlFxN5SWJI9GjoCuiRJRG2mrB6tL4dRvn2ToeTjM83RDnhyI3XiKnbKXbw8C3bklN42LpkxD3Gd-yZg-AjW41k-rshwEjmN8vSqiXMdNM5hFYJdP5XEQpXiWgb2iKttuplx2Qh_hsnT2s3YlkF9Me-HuM1vNi6y6Eb1f8eZQpSf4HJifM2M7IlwjkvVpfrfSSMmKjR9ybToNFdEN1ro4uAfl7UpDV5OPPAuW2P-7V0vkb9gm6W7olroJyg9zCY',
                    caption: 'USCIS Nebraska Service Center expanding operations'
                }
            },
            {
                id: 6,
                time: '1:30 PM',
                date: 'MAR 27',
                type: 'normal',
                headline: 'Immigration Attorneys Report Flood of Inquiries',
                content: 'Major immigration law firms report a 300% increase in client inquiries following the announcement. AILA has scheduled an emergency webinar for tomorrow to help attorneys navigate the changes.',
                media: null
            },
            {
                id: 7,
                time: '12:50 PM',
                date: 'MAR 27',
                type: 'normal',
                headline: 'Indian and Chinese Nationals Most Impacted',
                content: 'Analysis shows that Indian nationals (68%) and Chinese nationals (14%) will benefit most from the per-country cap waiver. Combined, they represent over 1.4 million of the 1.8 million backlogged applicants.',
                media: null
            },
            {
                id: 8,
                time: '12:00 PM',
                date: 'MAR 27',
                type: 'normal',
                headline: 'Tech Companies Pledge Support for Implementation',
                content: 'Major employers including Amazon, Google, and Microsoft pledge to dedicate HR resources to help employees navigate the expedited processing, including dedicated immigration support desks.',
                media: null
            }
        ],
        pendingUpdates: [
            {
                id: 9,
                time: '4:45 PM',
                date: 'MAR 27',
                type: 'breaking',
                headline: 'Premium Processing Expanded to ALL I-485 Categories',
                content: 'USCIS announces immediate expansion of premium processing to all employment-based I-485 applications. The $2,805 fee will guarantee adjudication within 45 calendar days.',
                media: null
            }
        ]
    }
];
module.exports = {
    AdminConfig,
    NewsData,
    LiveUpdatesData
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/SearchOverlay.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SearchOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const { NewsData, AdminConfig } = __turbopack_context__.r("[project]/lib/data.js [client] (ecmascript)");
const STORAGE_KEY = 'dd_recent_searches';
const MAX_RECENT = 5;
function getRecent() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch  {
        return [];
    }
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
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [recentSearches, setRecentSearches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showResults, setShowResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const trending = AdminConfig?.searchSettings?.trendingKeywords || [];
    // Focus input when opened
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchOverlay.useEffect": ()=>{
            if (isOpen) {
                setRecentSearches(getRecent());
                setTimeout({
                    "SearchOverlay.useEffect": ()=>inputRef.current?.focus()
                }["SearchOverlay.useEffect"], 100);
            } else {
                setQuery('');
                setResults([]);
                setShowResults(false);
            }
        }
    }["SearchOverlay.useEffect"], [
        isOpen
    ]);
    // Live search filtering
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchOverlay.useEffect": ()=>{
            if (!query.trim()) {
                setShowResults(false);
                setResults([]);
                return;
            }
            const q = query.toLowerCase();
            const matched = NewsData.filter({
                "SearchOverlay.useEffect.matched": (a)=>a.title.toLowerCase().includes(q) || a.tag.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
            }["SearchOverlay.useEffect.matched"]).slice(0, 8);
            setResults(matched);
            setShowResults(true);
        }
    }["SearchOverlay.useEffect"], [
        query
    ]);
    const handleSearch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SearchOverlay.useCallback[handleSearch]": (term)=>{
            if (!term.trim()) return;
            saveRecent(term.trim());
            setQuery(term);
            // Navigate to category or show filtered results
            onClose();
        }
    }["SearchOverlay.useCallback[handleSearch]"], [
        onClose
    ]);
    const handleResultClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SearchOverlay.useCallback[handleResultClick]": (articleId)=>{
            if (query.trim()) saveRecent(query.trim());
            onClose();
            router.push(`/article/${articleId}`);
        }
    }["SearchOverlay.useCallback[handleResultClick]"], [
        query,
        onClose,
        router
    ]);
    const popularArticles = NewsData.slice(0, 5);
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "ac2cfbcc95dc197d",
                children: ".search-overlay.jsx-ac2cfbcc95dc197d{z-index:100;background:#fff;animation:.35s cubic-bezier(.25,.8,.25,1) forwards slideUp;position:fixed;inset:0}@keyframes slideUp{0%{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}.skeleton-bar.jsx-ac2cfbcc95dc197d{background:linear-gradient(90deg,#e2e8f0 25%,#f1f5f9 50%,#e2e8f0 75%) 0 0/200% 100%;animation:1.5s infinite shimmer}@keyframes shimmer{0%{background-position:-200% 0}to{background-position:200% 0}}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-ac2cfbcc95dc197d" + " " + "search-overlay lg:hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-ac2cfbcc95dc197d" + " " + "min-h-screen flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-ac2cfbcc95dc197d" + " " + "sticky top-0 z-10 bg-white/90 backdrop-blur-md px-4 pt-4 pb-3 border-b border-slate-100",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-ac2cfbcc95dc197d" + " " + "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        className: "jsx-ac2cfbcc95dc197d" + " " + "w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors active:scale-95 shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-ac2cfbcc95dc197d" + " " + "flex-1 flex items-center bg-slate-100 px-4 h-12 rounded-full border border-slate-200 shadow-sm relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-ac2cfbcc95dc197d" + " " + "material-symbols-outlined text-slate-400 text-lg mr-2",
                                                children: "search"
                                            }, void 0, false, {
                                                fileName: "[project]/components/SearchOverlay.js",
                                                lineNumber: 113,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                            query && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setQuery(''),
                                                className: "jsx-ac2cfbcc95dc197d" + " " + "text-slate-400 hover:text-slate-700 transition-colors ml-1 shrink-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-ac2cfbcc95dc197d" + " " + "flex-1 px-4 py-5 space-y-6 overflow-y-auto",
                            children: !showResults ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    recentSearches.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-ac2cfbcc95dc197d" + " " + "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-ac2cfbcc95dc197d" + " " + "flex items-center justify-between mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "jsx-ac2cfbcc95dc197d" + " " + "text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-ac2cfbcc95dc197d" + " " + "flex flex-wrap gap-2",
                                                children: recentSearches.map((term, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            setQuery(term);
                                                            handleSearch(term);
                                                        },
                                                        className: "jsx-ac2cfbcc95dc197d" + " " + "px-3 py-1.5 bg-slate-100 text-sm text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-ac2cfbcc95dc197d" + " " + "mb-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "jsx-ac2cfbcc95dc197d" + " " + "text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-ac2cfbcc95dc197d" + " " + "flex flex-wrap gap-2",
                                                children: trending.map((term, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-ac2cfbcc95dc197d",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "jsx-ac2cfbcc95dc197d" + " " + "text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-ac2cfbcc95dc197d" + " " + "space-y-1",
                                                children: popularArticles.map((article)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleResultClick(article.id),
                                                        className: "jsx-ac2cfbcc95dc197d" + " " + "w-full flex items-center gap-3 p-2 hover:bg-slate-50 transition-colors text-left",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: article.image,
                                                                alt: "",
                                                                className: "jsx-ac2cfbcc95dc197d" + " " + "w-14 h-10 object-cover shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/SearchOverlay.js",
                                                                lineNumber: 196,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-ac2cfbcc95dc197d" + " " + "flex-1 min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "jsx-ac2cfbcc95dc197d" + " " + "text-sm font-semibold text-slate-800 truncate",
                                                                        children: article.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/SearchOverlay.js",
                                                                        lineNumber: 198,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                            }, void 0, true) : results.length > 0 ? /* Live Results */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-ac2cfbcc95dc197d" + " " + "space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "jsx-ac2cfbcc95dc197d" + " " + "text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                    results.map((article)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleResultClick(article.id),
                                            className: "jsx-ac2cfbcc95dc197d" + " " + "w-full flex items-center gap-3 p-2 hover:bg-slate-50 transition-colors text-left animate-fadeIn",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: article.image,
                                                    alt: "",
                                                    className: "jsx-ac2cfbcc95dc197d" + " " + "w-14 h-10 object-cover shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/SearchOverlay.js",
                                                    lineNumber: 218,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-ac2cfbcc95dc197d" + " " + "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "jsx-ac2cfbcc95dc197d" + " " + "text-sm font-semibold text-slate-800 line-clamp-2",
                                                            children: article.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/SearchOverlay.js",
                                                            lineNumber: 220,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                            }, this) : /* No Results */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-ac2cfbcc95dc197d" + " " + "text-center py-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-ac2cfbcc95dc197d" + " " + "material-symbols-outlined text-[48px] text-slate-300 mb-3 block",
                                        children: "search_off"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SearchOverlay.js",
                                        lineNumber: 229,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-ac2cfbcc95dc197d" + " " + "text-sm font-semibold text-slate-500 mb-1",
                                        children: "No results found"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SearchOverlay.js",
                                        lineNumber: 230,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-ac2cfbcc95dc197d" + " " + "text-xs text-slate-400",
                                        children: "Try a different keyword or check trending topics"
                                    }, void 0, false, {
                                        fileName: "[project]/components/SearchOverlay.js",
                                        lineNumber: 231,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-ac2cfbcc95dc197d" + " " + "mt-5 flex flex-wrap gap-2 justify-center",
                                        children: trending.slice(0, 3).map((term, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
_s(SearchOverlay, "Wx3+iUT9iO5mw9iomGzrPgNC+H0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = SearchOverlay;
var _c;
__turbopack_context__.k.register(_c, "SearchOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Header.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SearchOverlay$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/SearchOverlay.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchOpen, setSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [expandedAccordion, setExpandedAccordion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Close mobile menu on route change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const handleRouteChange = {
                "Header.useEffect.handleRouteChange": ()=>{
                    setMobileMenuOpen(false);
                    setExpandedAccordion(null);
                }
            }["Header.useEffect.handleRouteChange"];
            router.events.on('routeChangeComplete', handleRouteChange);
            return ({
                "Header.useEffect": ()=>router.events.off('routeChangeComplete', handleRouteChange)
            })["Header.useEffect"];
        }
    }["Header.useEffect"], [
        router
    ]);
    const closeMobileMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Header.useCallback[closeMobileMenu]": ()=>{
            setMobileMenuOpen(false);
            setExpandedAccordion(null);
        }
    }["Header.useCallback[closeMobileMenu]"], []);
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
    const searchBtnRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const menuBtnRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                id: "c8197009176c7aee",
                children: '.material-symbols-outlined{font-variation-settings:"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24}.headline-font{font-family:Poppins,sans-serif}*,:before,:after{border-radius:0!important}.nav-dropdown{opacity:0;visibility:hidden;transition:all .2s ease-out;transform:translateY(8px)}.nav-item:hover .nav-dropdown{opacity:1;visibility:visible;transform:translateY(0)}.mob-icon-btn{-webkit-backdrop-filter:blur(16px)saturate(1.8);cursor:pointer;-webkit-tap-highlight-color:transparent;isolation:isolate;background:linear-gradient(145deg,#ffffffd9,#f8fafcbf);border:1px solid #e2e8f099;justify-content:center;align-items:center;width:44px;height:44px;transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .35s,background .3s;display:flex;position:relative;overflow:hidden;box-shadow:0 2px 8px #0000000a,0 4px 16px #00000008,inset 0 1px #ffffffe6,inset 0 -1px #00000005;border-radius:13px!important}.mob-icon-btn:before{content:"";background:radial-gradient(circle at var(--ripple-x,50%) var(--ripple-y,50%), #1c4ed81f 0%, transparent 60%);opacity:0;z-index:0;transition:opacity .4s;position:absolute;inset:0;border-radius:13px!important}.mob-icon-btn:active:before{opacity:1}.mob-icon-btn:after{content:"";opacity:0;z-index:-1;filter:blur(2px);background:linear-gradient(135deg,#3b82f61f,#6366f114,#9333ea0f);transition:opacity .35s;position:absolute;inset:-3px;border-radius:16px!important}.mob-icon-btn:active:after{opacity:1}@keyframes iconBounce{0%{transform:scale(1)}30%{transform:scale(.9)}60%{transform:scale(1.04)}to{transform:scale(1)}}.mob-icon-btn:active{animation:.35s forwards iconBounce}.mob-icon-btn:hover{box-shadow:0 4px 20px #00000014,0 8px 32px #1c4ed80f,inset 0 1px #fffffff2}.hamburger-bars{z-index:1;flex-direction:column;justify-content:space-between;width:20px;height:14px;display:flex;position:relative}.hamburger-bars span{transform-origin:50%;background:#334155;height:2px;transition:transform .35s cubic-bezier(.68,-.6,.32,1.6),opacity .25s,width .3s cubic-bezier(.25,.8,.25,1),background .3s;display:block;border-radius:3px!important}.hamburger-bars span:first-child{width:100%;height:2.2px}.hamburger-bars span:nth-child(2){width:14px;height:1.8px;transition-delay:50ms}.hamburger-bars span:nth-child(3){width:18px;height:2px;transition-delay:.1s}.mob-icon-btn:hover .hamburger-bars span{width:100%!important}.mob-icon-btn.is-active .hamburger-bars span:first-child{background:#1c4ed8;width:100%;transform:translateY(6px)rotate(45deg)}.mob-icon-btn.is-active .hamburger-bars span:nth-child(2){opacity:0;width:0;transform:translate(8px)}.mob-icon-btn.is-active .hamburger-bars span:nth-child(3){background:#1c4ed8;width:100%;transform:translateY(-6px)rotate(-45deg)}.mob-icon-btn.is-active{background:linear-gradient(145deg,#f1f5f9f2,#e2e8f0d9);box-shadow:0 2px 12px #1c4ed814,inset 0 1px #ffffffe6}.search-icon-svg{stroke:#334155;stroke-width:1.8px;stroke-linecap:round;stroke-linejoin:round;fill:none;filter:drop-shadow(0 1px 1px #0000000f);z-index:1;width:20px;height:20px;transition:stroke .25s,filter .25s,transform .25s;position:relative}.mob-icon-btn:active .search-icon-svg{stroke:#1c4ed8;filter:drop-shadow(0 0 4px #1c4ed840);transform:scale(1.08)}.mob-icon-btn:hover .search-icon-svg{stroke:#475569}.mobile-overlay{z-index:40;opacity:0;visibility:hidden;background-color:#0f172a66;transition:opacity .4s,visibility .4s;position:fixed;inset:64px 0 0}.mobile-overlay.is-open{opacity:1;visibility:visible}.mobile-drawer{opacity:0;visibility:hidden;will-change:transform, opacity;width:100%;max-height:calc(100vh - 64px);transition:transform .4s cubic-bezier(.25,.8,.25,1),opacity .4s,visibility .4s;position:absolute;top:100%;left:0;transform:translate(-100%)}.mobile-drawer.is-open{opacity:1;visibility:visible;transform:translate(0)}.mob-panel{opacity:0;visibility:hidden;grid-template-rows:0fr;transition:grid-template-rows .35s cubic-bezier(.25,.8,.25,1),opacity .35s,visibility .35s;display:grid}.mob-panel.is-open{opacity:1;visibility:visible;grid-template-rows:1fr}.mob-panel-inner{overflow:hidden}@keyframes fadeIn{0%{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}.animate-fadeIn{animation:.4s ease-out forwards fadeIn}'
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "jsx-c8197009176c7aee" + " " + "sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-200 ease-in-out",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-c8197009176c7aee" + " " + "max-w-screen-2xl mx-auto flex items-center justify-between px-6 py-4 h-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-c8197009176c7aee" + " " + "flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "text-2xl font-black tracking-tighter text-slate-900",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-c8197009176c7aee" + " " + "hidden lg:flex items-center gap-1 h-full",
                                children: NAV_ITEMS.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-c8197009176c7aee" + " " + `${item.dropdown ? 'nav-item group' : ''} relative h-full flex items-center px-2`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: item.href,
                                                className: `font-['Plus_Jakarta_Sans'] tracking-tight text-sm font-semibold transition-all flex items-center gap-0.5 ${router.pathname === item.href ? 'text-blue-700 border-b-2 border-blue-700 pb-1' : 'text-slate-600 hover:text-slate-900'}`,
                                                children: [
                                                    item.label,
                                                    item.dropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                            item.dropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-c8197009176c7aee" + " " + "nav-dropdown absolute top-full left-0 w-64 bg-white border border-slate-200 shadow-xl p-2 z-[60]",
                                                children: item.dropdown.map((sub, sidx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-c8197009176c7aee" + " " + "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-c8197009176c7aee" + " " + "hidden xl:flex items-center bg-slate-100 px-4 py-1.5 border border-slate-200 relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-c8197009176c7aee" + " " + "material-symbols-outlined text-slate-400 text-sm",
                                                children: "search"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Header.js",
                                                lineNumber: 242,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "jsx-c8197009176c7aee" + " " + "bg-primary text-white px-6 py-2 font-bold text-sm tracking-wide uppercase hover:opacity-90 transition-all scale-100 active:scale-[0.98]",
                                        children: "Subscribe"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Header.js",
                                        lineNumber: 245,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        ref: searchBtnRef,
                                        "aria-label": "Search",
                                        onPointerDown: (e)=>handleRipple(e, searchBtnRef),
                                        onClick: ()=>setSearchOpen(true),
                                        className: "jsx-c8197009176c7aee" + " " + "lg:hidden mob-icon-btn ml-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            viewBox: "0 0 24 24",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            className: "jsx-c8197009176c7aee" + " " + "search-icon-svg",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                    className: "jsx-c8197009176c7aee",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                                                        id: "search-inner-glow",
                                                        className: "jsx-c8197009176c7aee",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                                                in: "SourceAlpha",
                                                                stdDeviation: "0.5",
                                                                result: "blur",
                                                                className: "jsx-c8197009176c7aee"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Header.js",
                                                                lineNumber: 260,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feOffset", {
                                                                dx: "0",
                                                                dy: "0.5",
                                                                className: "jsx-c8197009176c7aee"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Header.js",
                                                                lineNumber: 261,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
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
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feFlood", {
                                                                floodColor: "rgba(0,0,0,0.08)",
                                                                className: "jsx-c8197009176c7aee"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Header.js",
                                                                lineNumber: 263,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feComposite", {
                                                                operator: "in",
                                                                in2: "blur",
                                                                className: "jsx-c8197009176c7aee"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/Header.js",
                                                                lineNumber: 264,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                                                className: "jsx-c8197009176c7aee",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                                                        className: "jsx-c8197009176c7aee"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/Header.js",
                                                                        lineNumber: 265,
                                                                        columnNumber: 30
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
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
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        ref: menuBtnRef,
                                        "aria-label": "Menu",
                                        onPointerDown: (e)=>handleRipple(e, menuBtnRef),
                                        onClick: ()=>setMobileMenuOpen(!mobileMenuOpen),
                                        className: "jsx-c8197009176c7aee" + " " + `lg:hidden mob-icon-btn ml-1 ${mobileMenuOpen ? 'is-active' : ''}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-c8197009176c7aee" + " " + "hamburger-bars",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-c8197009176c7aee"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Header.js",
                                                    lineNumber: 282,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "jsx-c8197009176c7aee"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/Header.js",
                                                    lineNumber: 282,
                                                    columnNumber: 30
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: closeMobileMenu,
                        className: "jsx-c8197009176c7aee" + " " + `lg:hidden mobile-overlay ${mobileMenuOpen ? 'is-open' : ''}`
                    }, void 0, false, {
                        fileName: "[project]/components/Header.js",
                        lineNumber: 289,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-c8197009176c7aee" + " " + `lg:hidden mobile-drawer bg-white border-t border-slate-200 w-full overflow-y-auto shadow-2xl z-50 ${mobileMenuOpen ? 'is-open' : ''}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-c8197009176c7aee" + " " + "p-4 space-y-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c8197009176c7aee" + " " + "border-b border-slate-100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/live/h1b-visa-reform-2025",
                                        className: "flex items-center gap-2 py-3 px-2 font-['Plus_Jakarta_Sans'] font-semibold text-slate-900 text-base",
                                        onClick: closeMobileMenu,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c8197009176c7aee" + " " + "border-b border-slate-100",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
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
                                NAV_ITEMS.filter((item)=>item.dropdown && item.label !== 'Home').map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-c8197009176c7aee" + " " + "border-b border-slate-100",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>toggleAccordion(idx),
                                                className: "jsx-c8197009176c7aee" + " " + "w-full text-left py-3 px-2 font-['Plus_Jakarta_Sans'] font-semibold text-slate-900 text-base flex justify-between items-center",
                                                children: [
                                                    item.label,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-c8197009176c7aee" + " " + `mob-panel pl-4 border-l-2 border-primary ml-4 ${expandedAccordion === idx ? 'is-open' : ''}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-c8197009176c7aee" + " " + "mob-panel-inner pb-3 space-y-0",
                                                    children: item.dropdown.map((sub, sidx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-c8197009176c7aee" + " " + "pt-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$SearchOverlay$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
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
_s(Header, "2EAj5XR8yOlzbDVmIWsBozgH2lc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Footer.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
;
;
function Footer() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "py-12 bg-[#F9FAFB] text-slate-600",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full px-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-2xl font-extrabold tracking-tighter headline-font block mb-6 text-slate-900",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        alt: "The Digital Diplomat Logo",
                                        className: "w-auto object-contain mb-6 h-14",
                                        src: "/Logo.png"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Footer.js",
                                        lineNumber: 10,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.js",
                                    lineNumber: 9,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm leading-relaxed text-slate-600",
                                    children: "The premier destination for accurate, real-time news and analysis regarding US immigration policy and global mobility."
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.js",
                                    lineNumber: 12,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Footer.js",
                            lineNumber: 8,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-bold uppercase tracking-widest text-xs mb-6 text-slate-900",
                                    children: "RESOURCES"
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.js",
                                    lineNumber: 15,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-3 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "hover:text-primary transition-colors",
                                                href: "/category/visa-guides/faqs",
                                                children: "Visa Fee Calculator"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 17,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 17,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "hover:text-primary transition-colors",
                                                href: "/category/processing-times",
                                                children: "USCIS Processing Times"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 18,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 18,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "hover:text-primary transition-colors",
                                                href: "/category/visa-bulletin",
                                                children: "Visa Bulletin Archive"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 19,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 19,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "hover:text-primary transition-colors",
                                                href: "/category/visa-news/h1b-visa",
                                                children: "H1B Lottery Data"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 20,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 20,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Footer.js",
                                    lineNumber: 16,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Footer.js",
                            lineNumber: 14,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-bold uppercase tracking-widest text-xs mb-6 text-slate-900",
                                    children: "COMPANY"
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.js",
                                    lineNumber: 24,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-3 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "hover:text-primary transition-colors",
                                                href: "/",
                                                children: "About Us"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 26,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 26,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "hover:text-primary transition-colors",
                                                href: "/",
                                                children: "Editorial Guidelines"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 27,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 27,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "hover:text-primary transition-colors",
                                                href: "/",
                                                children: "Contact"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 28,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 28,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "hover:text-primary transition-colors",
                                                href: "/",
                                                children: "Advertising"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 29,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 29,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Footer.js",
                                    lineNumber: 25,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Footer.js",
                            lineNumber: 23,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-bold uppercase tracking-widest text-xs mb-6 text-slate-900",
                                    children: "CONNECT"
                                }, void 0, false, {
                                    fileName: "[project]/components/Footer.js",
                                    lineNumber: 33,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-4 mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            className: "w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary transition-colors bg-slate-200",
                                            href: "#",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-sm text-slate-600",
                                                children: "alternate_email"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 35,
                                                columnNumber: 141
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 35,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            className: "w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary transition-colors bg-slate-200",
                                            href: "#",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "material-symbols-outlined text-sm text-slate-600",
                                                children: "share"
                                            }, void 0, false, {
                                                fileName: "[project]/components/Footer.js",
                                                lineNumber: 36,
                                                columnNumber: 141
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/Footer.js",
                                            lineNumber: 36,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Footer.js",
                                    lineNumber: 34,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Footer.js",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Footer.js",
                    lineNumber: 7,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Footer.js",
                lineNumber: 6,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-slate-100 dark:border-slate-900 py-8 px-8 text-center text-slate-400 text-xs",
                children: "© 2024 The Digital Diplomat. All rights reserved."
            }, void 0, false, {
                fileName: "[project]/components/Footer.js",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Footer.js",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/_app.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MyApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Header.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Footer.js [client] (ecmascript)");
;
;
;
;
function MyApp({ Component, pageProps }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/_app.js",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
                ...pageProps
            }, void 0, false, {
                fileName: "[project]/pages/_app.js",
                lineNumber: 9,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/_app.js",
                lineNumber: 10,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c = MyApp;
var _c;
__turbopack_context__.k.register(_c, "MyApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/_app.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/_app";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/_app.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if ("TURBOPACK compile-time truthy", 1) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/_app\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/_app.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__0s0subk._.js.map