import Tab = chrome.tabs.Tab;
import {loadIsEnabled, loadTickDelay} from "./shared/persistence";

function advance(allTabs: Tab[], currentTab: Tab) {
    if (allTabs.length === 0) {
        throw 'allTabs must be non-empty';
    }

    if (currentTab === null) {
        throw 'currentTab must be non-null';
    }

    const currentTabIndex: number = allTabs.findIndex((tab, index, tabs): boolean => {
        return tab.id == currentTab.id;
    });

    const nextTabIndex = currentTabIndex < allTabs.length - 1 ? currentTabIndex + 1 : 0;
    const nextTab = allTabs[nextTabIndex];

    const nextTabId = nextTab.id;

    chrome.tabs.update(nextTabId, {
        active: true,
    });
}

// TODO: Convert to use promise
function getAllTabs() {
    chrome.tabs.query({
        currentWindow: true,
    }, getCurrentTab);
}

// TODO: Convert to use promise
function getCurrentTab(allTabs: Tab[]) {
    chrome.tabs.query({
        currentWindow: true,
        active: true,
    }, (tabs) => advance(allTabs, tabs[0]));
}

async function tick() {
    const isEnabled = await loadIsEnabled();
    const tickDelay = await loadTickDelay();

    if (isEnabled) {
        getAllTabs();
    }

    setTimeout(tick, tickDelay * 1000);
}

(async function() {
    await tick();
})();
