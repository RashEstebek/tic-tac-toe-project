import "./index.css";
import {controller, signal} from "./utils/abortSignal.ts";
import App from "./app.ts";
import SlytherinUser from "./model/SlytherinUser.ts";
import GryffindorUser from "./model/GryffindorUser.ts";
import RavenclawUser from "./model/RavenclawUser.ts";
import HufflepuffUser from "./model/HufflepuffUser.ts";

window.addEventListener("unload", unloadHandler, {once: true});
window.addEventListener("load", loadHandler, {once: true});

function unloadHandler() {
    // NOTE: no need for removeEventListener;
    controller.abort();
}

async function loadHandler() {
    const app = getApp();

    if (!app) {
        return;
    }

    window.addEventListener("pushstate", app.render, {signal});
    window.addEventListener("popstate", app.render, {signal});

    await app.render();
}

function getApp() {
    const appEl = document.getElementById("app");

    if (!appEl) {
        return null;
    }

    const players = getPlayers();

    return new App(appEl, players);
}

function getPlayers() {
    const gryffindorUser = new GryffindorUser();
    const slytherinUser = new SlytherinUser();
    const ravenclawUser = new RavenclawUser();
    const hufflepuffUser = new HufflepuffUser();

    return [gryffindorUser, slytherinUser, ravenclawUser, hufflepuffUser];
}
