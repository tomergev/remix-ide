module.exports = function (browser, callback) {
  browser
    .url('http://172.16.4.5:8080/#version=builtin')
    .injectScript('test-browser/helpers/applytestmode.js', function () {
      browser.resizeWindow(2560, 1440, () => {
        browser.click('#autoCompile')
          .perform(function () {
            callback()
          })
      })
    })
}
