/**
 * Return true if the extension is enabled and false otherwise
 * or if there is no value available.
 */
export async function loadIsEnabled(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
        chrome.storage.sync.get({
            isEnabled: false,
        }, items => {
            if (chrome.runtime.lastError != undefined) {
                console.warn('loadIsEnabled: storage error: ' + chrome.runtime.lastError);
            } else {
                console.info('loadIsEnabled: loaded: ' + items.isEnabled);
            }
            resolve(items.isEnabled as boolean);
        });
    });
}

/**
 * Store the given value as the new is enabled.
 *
 * @param isEnabled - whether the extension should be enabled
 */
export async function storeIsEnabled(isEnabled: boolean): Promise<void> {
    return new Promise<void>(resolve => {
        chrome.storage.sync.set({
            isEnabled: isEnabled,
        }, () => {
            if (chrome.runtime.lastError != undefined) {
                console.warn('storeIsEnabled: storage error: ' + chrome.runtime.lastError);
            } else {
                console.info('storeIsEnabled: stored');
            }
            resolve();
        });
    });
}

/**
 * Return the tick delay in seconds including a default value
 * if there is no other value available.
 */
export async function loadTickDelay(): Promise<number> {
    return new Promise<number>(resolve => {
        chrome.storage.sync.get({
            tickDelay: 10
        }, items => {
            if (chrome.runtime.lastError != undefined) {
                console.warn('loadTickDelay: storage error: ' + chrome.runtime.lastError);
            } else {
                console.info('loadTickDelay: loaded: ' + items.tickDelay);
            }
            resolve(items.tickDelay as number);
        });
    });
}

/**
 * Store the given value as the new tick delay, in seconds.
 *
 * @param tickDelay - the new value, in seconds
 */
export async function storeTickDelay(tickDelay: number): Promise<void> {
    return new Promise<void>(resolve => {
        chrome.storage.sync.set({
            tickDelay: tickDelay,
        }, () => {
            if (chrome.runtime.lastError != undefined) {
                console.warn('storeTickDelay: storage error: ' + chrome.runtime.lastError);
            } else {
                console.info('storeTickDelay: stored');
            }
            resolve();
        });
    });
}
