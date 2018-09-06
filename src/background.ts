import Tab = chrome.tabs.Tab;

function advance(allTabs: Tab[], currentTab: Tab) {
    const currentTabIndex: number = allTabs.findIndex((tab, index, tabs): boolean => {
        return tab.id == currentTab.id;
    });

    const nextTabIndex = currentTabIndex < allTabs.length ? currentTabIndex + 1 : 0;
    const nextTab = allTabs[nextTabIndex];
    const nextTabId = nextTab.id;

    chrome.tabs.update(nextTabId, {
        active: true,
    });
}

function getAllTabs() {
    chrome.tabs.query({
        currentWindow: true,
    }, getCurrentTab);
}

function getCurrentTab(allTabs: Tab[]) {
    chrome.tabs.query({
        currentWindow: true,
        active: true,
    }, (tabs) => advance(allTabs, tabs[0]));
}

function tick() {
    getAllTabs();
    setTimeout(tick, 1000 * 5);
}

tick();
