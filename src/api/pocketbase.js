import PocketBase from "pocketbase";

const apiUrl = import.meta.env.VITE_PB_CLIENT_MSTR_URL;
const masterpd = new PocketBase(apiUrl);
masterpd.autoCancellation(false);
const pbAppHost = import.meta.env.VITE_APPLICATION_DB;
const pbWebHost = import.meta.env.VITE_WEB_SITE_DB;

const pbWebClient = new PocketBase(pbWebHost);
const pbAppClient = new PocketBase(pbAppHost);
export { pbWebClient, pbAppClient, masterpd };
