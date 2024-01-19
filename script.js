const $x = (xpath, node) => {
    let results = [];
    let query = document.evaluate(xpath, node,
        null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
        results.push(query.snapshotItem(i));
    }
    return results;
}



const data = []

const xpaths = {
    codeTab: './/span[contains(.,"Code")]',
    table: './/div[@class="props-table"]',
    tableName: './/h4/text()',
    tableRow: './/tr',
    tableCell: './/th/text() | .//td/text()'
}

setTimeout(() => $x(xpaths.codeTab, document).click() &&
    setTimeout(() => {
        $x(xpaths.table, document)
            .map(node0 => [
                $x(xpaths.tableName, node0),
                $x(xpaths.tableRow, node0)
                    .map(node1 => $x(xpaths.tableCell, node1)
                        .map(({ textContent }) => textContent))])
    }, 3000), 3000)


