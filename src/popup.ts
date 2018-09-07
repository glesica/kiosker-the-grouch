import {loadIsEnabled, loadTickDelay, storeIsEnabled, storeTickDelay} from "./shared/persistence";

const isEnabledElement = document.getElementById('isEnabled') as HTMLInputElement;
const tickDelayElement = document.getElementById('tickDelay') as HTMLInputElement;

async function load() {
    isEnabledElement.checked = await loadIsEnabled();
    tickDelayElement.value = (await loadTickDelay()).toString();
}

async function store() {
    await storeIsEnabled(isEnabledElement.checked);

    const stringValue = tickDelayElement.value;
    try {
        const numberValue = parseInt(stringValue);
        await storeTickDelay(numberValue);
    } catch {
        console.warn('invalid tick delay value: ' + stringValue);
    }
}

function setup() {
    isEnabledElement.addEventListener('change', async (event) => {
        await store();
        await load();
    });

    tickDelayElement.addEventListener('change', async (event) => {
        await store();
        await load();
    })
}

(async function() {
    setup();
    await load();
})();
