class MyNewTab {
    constructor() {
        window.addEventListener("DOMContentLoaded", this.load.bind(this), true);
    }

    load() {
        chrome.storage.sync.get(configKey, options => {
            let page = options[configKey];

            if (typeof page == "undefined") {
                page = defaultPage;
            }

            chrome.tabs.getCurrent(tab => {
                chrome.tabs.update(tab.id, { url: page, highlighted: true });
            });
        });
    }
}

new MyNewTab();
