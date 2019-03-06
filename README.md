# performance-mark-snippet

Minimum `performance.mark` snippet for measure a feature with meta data.

## Usage

Start to mark with `name` and return markEnd function that end to mark with details data.

```js
/**
 * start to mark with `name` and return markEnd function that end to mark with details data
 * @param {string} name 
 */
const mark = (name) => {
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
    }
}

// Usage
const markEnd = mark("item name");
// ...
// ...Do something to measure...    
// ...
markEnd({ key : "value" });
```

Collect results snippet:

```js
console.table(Array.from(performance.getEntries()).filter(entry => entry.entryType === "measure").map(entry => {
  return { name: entry.name, "duration(ms)": entry.duration, ...window.window.__performance_mark_snippet_map.get(entry.name) };
}))
```

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/performance-mark-snippet/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
