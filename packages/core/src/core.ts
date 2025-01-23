import { loader } from "@/Loader";
import { initLoader } from "@/Loader/init";
import { init } from "@/actions/init";
import { ActionResolve, Init, OnSave } from "@/types/types";
import { getHandlers } from "@/utils/config";
import * as Comlink from "comlink";
import { v4 as uuid } from "uuid";

const savedNodeCB = new Map<HTMLElement, OnSave>();

type IframeHandlers = {
  init: (data: ActionResolve) => void;
  save: (uid: string) => void;
};

export const Core: Init = (config, cb) => {
  if (!config) {
    console.error("config is required");
    return;
  }

  const { container } = config;

  if (!(container instanceof HTMLElement)) {
    console.error("The element must be a valid HTMLElement");
    return;
  }

  const iframe = document.createElement("iframe");
  const spinner = loader(document);

  initLoader(spinner, container);
  const uid = uuid();
  container.dataset.uid = uid;
  iframe.setAttribute("src", `${PUBLIC_HOST}/index.html`);
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.frameBorder = "0";

  iframe.addEventListener("load", async () => {
    const iframeWindow = iframe.contentWindow;

    if (!iframeWindow) {
      console.error("Something went wrong on load iframe");
      return;
    }

    const handlers = getHandlers({
      config,
      iframe,
      container,
      spinner,
      savedNodeCB,
      uid,
    });

    Comlink.expose(handlers, Comlink.windowEndpoint(iframeWindow));

    const iframeApi = Comlink.wrap<IframeHandlers>(Comlink.windowEndpoint(iframeWindow));
    await iframeApi.init(init(config, uid));

    const save = async (cb?: OnSave) => {
      if (typeof cb === "function") {
        savedNodeCB.set(container, cb);
      }
      await iframeApi.save(uid);
    };

    const api = {
      save,
    };

    cb(api);
  });

  container.appendChild(iframe);
};
