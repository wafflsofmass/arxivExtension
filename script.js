const $x = (xpath) => {
    let results = [];
    let query = document.evaluate(xpath, document,
        null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
        results.push(query.snapshotItem(i));
    }
    return results;
}



const data = []

setTimeout(() => $x('').click(), 3000)

setTimeout(() => $x('').click() &&
    setTimeout(() => {
        const componentNames = $x('')
        const datum = componentNames.map(({ textContent }) =>
        ({
            [textContent]: $x(`//tr[ancestor::preceding-sibling[h4[contains(.,${textContent})]]]`)
                .map((({ children }) => [...children]))
                .map(children => children.map(({ textContent }) => textContent))
        }))
        data.push(datum)
    }, 3000), 3000)


