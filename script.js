function download_file({fileUrl, fileName}) {

      // for non-IE
      if (!window.ActiveXObject) {
          var save = document.createElement('a');
          save.href = fileUrl;
          save.target = '_blank';
          save.download = fileName
             if ( navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search("Chrome") < 0) {
                  document.location = save.href; 
      // window event not working here
              }else{
                  var evt = new MouseEvent('click', {
                      'view': window,
                      'bubbles': true,
                      'cancelable': false
                  });
                  save.dispatchEvent(evt);
                  (window.URL || window.webkitURL).revokeObjectURL(save.href);
              }   
      }
  }
  
  const $x = (xpath) => {
    let results = [];
    let query = document.evaluate(xpath, document,
        null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0, length = query.snapshotLength; i < length; ++i) {
        results.push(query.snapshotItem(i));
    }
    return results;
  }


if(document.URL === localStorage.getItem("lastUrl")) {
    throw "Done"
}

localStorage.setItem("lastUrl", document.URL)

$x(".//a[contains(@href, '/pdf/')]/@href")
.map(({ textContent }) => textContent.split("/"))
.map(textContent => ({ fileUrl: textContent.join("/"), fileName: textContent[textContent.length - 1] + ".pdf"}))
.forEach(download_file)

$x('.//a[contains(text(), "next") or contains(text(), "Next")]')[0].click()
