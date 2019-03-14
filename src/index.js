/**
 * start to mark with `name` and return markEnd function that end to mark with details data
 * @param {string} name 
 * @returns {Function} markEnd function
 */
export const mark = (name) => {
    const currentId = window.__performance_mark_snippet_id || 0;
    window.__performance_mark_snippet_id = currentId + 1;
    const markName = name + "::start" + currentId;
    performance.mark(markName);
    return function markEnd(details) {
        performance.mark(name + "::end" + currentId);
        performance.measure(name + "::" + currentId, name + "::start" + currentId, name + "::end" + currentId);
        if (details) {
            const map = window.__performance_mark_snippet_map || new Map();
            map.set(name + "::" + currentId, details);
            window.__performance_mark_snippet_map = map;
        }
        performance.clearMarks(name + "::start" + currentId);
        performance.clearMarks(name + "::end" + currentId);
        performance.clearMeasures(name + "::" + currentId);
    }
}