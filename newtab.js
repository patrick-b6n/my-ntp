function load() {
    chrome.storage.local.get(configKey, options => {
        const page = options[configKey];

        if (typeof page == "undefined") {
            page = "options.html";
        }

        if (page == "about:blank") {
            return;
        }

        chrome.tabs.getCurrent(tab => {
            chrome.tabs.update(tab.id, { url: page, highlighted: true });
        });
    });
}

window.addEventListener("DOMContentLoaded", load, true);
