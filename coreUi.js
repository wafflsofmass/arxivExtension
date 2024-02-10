const last = (arr) => arr[arr.length - 1]

const jsx = [
    './/div[following-sibling::h2[contains(.//text(), "API")] and @class="docs-example-snippet docs-code-snippet"]',
    './/pre[@class="prism-code language-jsx"]/div[@class="token-line" and ./span[not(contains(./text(), "...")) and not(contains(./text(), "const"))]]'
]

const apiSection = [
    './/h2[contains(./text(), "API")]/following-sibling::*[self::div or self::h3]',
    './/*[self::div[@class="highlight"] or self::thead or self::tbody]'
]

const $x = (xpath, node) => {
    let results = [];
    let query = document.evaluate(xpath, node,
        null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
        results.push(query.snapshotItem(i));
    }
    return results;
}

const addImportsAndProps = (node0) => $x(apiSection[1], node0).reduce((p, c) => ({
    'DIV': () => ({ imports: c.textContent }),
    'THEAD': () => ({ ...p, table: [$x('.//th', c).map(({ textContent }) => textContent)] }),
    'TBODY': () => ({ ...p, table: [p.table[0], ...$x('.//tr', c).map(node1 => $x('./td', node1).map(({ textContent }) => textContent))] })
})[c.nodeName](), {})
console.log('Script Loaded')
const process = () => {
    console.log("Executing Process")
    /*Collect Title */
    const title = $x('.//h1', document)[0].textContent
    /* Recurse & Collect jsx */
    const samples = $x(jsx[0], document).map(node0 => $x(jsx[1], node0).map(({ textContent }) => textContent).join(""))
    /* Collect API ref name & Recurse & Collect code and table */



    const result = $x(apiSection[0], document)
        .reduce((p, c) =>
            ({
                'H3': () => Object.assign(p, { refName: c.textContent }),
                'DIV': () => Object.assign(p, addImportsAndProps(c))
            })[c.nodeName]()
            , {})


    const storageObject = JSON.parse(localStorage.getItem('Collected')) || []

    localStorage.setItem('Collected', JSON.stringify([...storageObject, {
        title,
        samples,
        api: result
    }]))
}

const getUrl = () => window.location.href

let lastUrl = getUrl()

window.addEventListener('click', () => lastUrl !== getUrl() && process())