function init() {
    chrome.storage.local.get(configKey, options => {
        const page = options[configKey];

        if (page) {
            document.getElementById("url").value = page;
        }
    });
}

function clearNotification() {
    document.getElementById("notification").innerHTML = "";
}

function setNotification(value) {
    document.getElementById("notification").innerText = value;

    setTimeout(() => {
        clearNotification();
    }, 5000);
}

function isValidUrl(url) {
    return (
        url &&
        (url.startsWith("http://") ||
            url.startsWith("https://") ||
            url.startsWith("file://"))
    );
}

document.getElementById("save").addEventListener("click", () => {
    const url = document.getElementById("url").value;

    if (!isValidUrl(url)) {
        console.error(`Invalid url '${url}'`);

        setNotification("Save failed: Invalid URL");
        return;
    }

    const config = { [configKey]: url };
    chrome.storage.local.set(config);
    setNotification("Successful saved");
});

window.addEventListener("DOMContentLoaded", init, true);
