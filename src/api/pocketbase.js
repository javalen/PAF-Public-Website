import PocketBase from "pocketbase";

const pbAppHost = import.meta.env.VITE_APPLICATION_DB;
const pbWebHost = import.meta.env.VITE_WEB_SITE_DB;

const pbWebClient = new PocketBase(pbWebHost);
const pbAppClient = new PocketBase(pbAppHost);
export { pbWebClient, pbAppClient };
