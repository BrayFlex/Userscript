import Toastify from 'toastify-js';
import css from 'toastify-js/src/toastify.css';
import {USERSCRIPT_REVISION} from './constants.js';
import {lang} from './lang/language.js';

export const HUDToast = Toastify({
    text: 'PlaceCanada Userscript',
    duration: -1,
    close: false,
    gravity: 'bottom',
    position: 'left',
    style: {
        background: 'rgba(266, 255, 255, 0.9)',
        opacity: 0.9,
        color: 'black',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderImage: 'linear-gradient(180deg, red 25.0%, white 25.0%, white 75.0%, red 75.0%) 1 1',
        zIndex: 100000,
        transition: 'none'
    }
}).showToast();
HUDToast.title = HUDToast.body = '';

export function setHUDTitle(title) {
    HUDToast.title = title;
    reshowHUD();
}

export function setHUDBody(body) {
    HUDToast.body = body;
    reshowHUD();
}

function reshowHUD() {
    HUDToast.options.text = `PlaceCanada Userscript (version ${USERSCRIPT_REVISION.slice(0, 7)}${(typeof unsafeWindow !== 'undefined' ? unsafeWindow : window).PLACENL_USERSCRIPT_AUTO_UPDATER ? '-auto' : ''}) | ${HUDToast.title}\n${HUDToast.body}`;
    HUDToast.hideToast();
    HUDToast.toastElement.parentNode.removeChild(HUDToast.toastElement);
    HUDToast.showToast();
}

export function infoNotification(title, body = undefined, duration = 5000) {
    Toastify({
        text: (body ? (title + '\n' + body) : title),
        duration,
        close: false,
        gravity: 'bottom',
        position: 'right',
        stopOnFocus: true,
        style: {
            color: 'black',
            background: 'rgba(266, 255, 255, 0.8)',
            border: '2px solid red',
            zIndex: 1000
        }
    }).showToast();
}

export function warningNotification(title, body = undefined, duration = 10000) {
    Toastify({
        text: (body ? (title + '\n' + body) : title),
        duration,
        close: false,
        gravity: 'bottom',
        position: 'right',
        stopOnFocus: true,
        style: {
            color: 'black',
            background: 'rgba(266, 255, 255, 0.8)',
            border: '2px solid red',
            zIndex: 1000
        }
    }).showToast();
}

export function createToastifyStyle() {
    const style = document.createElement('style');
    style.innerText = css;
    document.body.appendChild(style);
}

export function hookIntoAutoUpdater() {
    let w = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
    if (!w.PLACENL_USERSCRIPT_AUTO_UPDATER) return;

    w.PLACENL_USERSCRIPT_AUTO_UPDATER.updateHook = () => {
        infoNotification(lang().TOAST_UPDATE_DETECTED);
    };
}
