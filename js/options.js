class Options {
    constructor() {
        window.addEventListener(
            "DOMContentLoaded",
            this.onLoaded.bind(this),
            true
        );
    }

    onLoaded() {
        this.readConfig();
        this.addEvents();
    }

    addEvents() {
        document
            .getElementById("save")
            .addEventListener("click", this.save.bind(this));
    }

    readConfig() {
        chrome.storage.sync.get(configKey, options => {
            const page = options[configKey];

            if (page) {
                document.getElementById("url").value = page;
            }
        });
    }

    save() {
        const url = document.getElementById("url").value;

        if (!url && url === "") {
            chrome.storage.sync.remove(configKey);
            this.setNotification("Successful saved");
            return;
        }

        if (!this.isValidUrl(url)) {
            console.error(`Invalid url '${url}'`);

            this.setNotification("Save failed: Invalid URL");
            return;
        }

        const config = { [configKey]: url };
        chrome.storage.sync.set(config);
        this.setNotification("Successful saved");
    }

    clearNotification() {
        document.getElementById("notification").innerHTML = "";
    }

    setNotification(value) {
        document.getElementById("notification").innerText = value;

        setTimeout(() => {
            this.clearNotification();
        }, 5000);
    }

    isValidUrl(url) {
        return (
            url &&
            (url.startsWith("http://") ||
                url.startsWith("https://") ||
                url.startsWith("file://") ||
                url.startsWith("chrome:") ||
                url.startsWith("about:"))
        );
    }
}

new Options();
