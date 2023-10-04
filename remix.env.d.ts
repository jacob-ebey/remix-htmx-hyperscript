import "react";
import "@remix-run/dev";
import "@remix-run/node";

interface Headers {
  set(name: "HX-Location", value: string): void;
  set(name: "HX-Push-URL", value: string): void;
  set(name: "HX-Redirect", value: string): void;
  set(name: "HX-Refresh", value: string): void;
  set(name: "HX-Replace-URL", value: string): void;
  set(name: "HX-Reswap", value: string): void;
  set(name: "HX-Retarget", value: string): void;
  set(name: "HX-Reselect", value: string): void;
  set(name: "HX-Trigger", value: string): void;
  set(name: "HX-Trigger-After-Settle", value: string): void;
  set(name: "HX-Trigger-After-Swap", value: string): void;
}

declare module "react" {
  export interface AriaAttributes {
    // Hyperscript
    _?: string;
    // Core
    "hx-boost"?: "true" | "false";
    "hx-get"?: string;
    "hx-post"?: string;
    "hx-on"?: string;
    "hx-push-url"?: string;
    "hx-select"?: string;
    "hx-select-oob"?: string;
    "hx-swap"?: string;
    "hx-swap-oob"?: string;
    "hx-target"?: string;
    "hx-trigger"?: string;
    "hx-vals"?: string;

    // Additional
    "hx-confirm"?: string;
    "hx-delete"?: string;
    "hx-disable"?: string;
    "hx-disabled-elt"?: string;
    "hx-disinherit"?: string;
    "hx-encoding"?: "multipart/form-data" | "application/x-www-form-urlencoded";
    "hx-ext"?: string;
    "hx-headers"?: string;
    "hx-history"?: string;
    "hx-history-elt"?: string;
    "hx-include"?: string;
    "hx-indicator"?: string;
    "hx-params"?: string;
    "hx-patch"?: string;
    "hx-preserve"?: string;
    "hx-prompt"?: string;
    "hx-put"?: string;
    "hx-replace-url"?: boolean | string;
    "hx-request"?: string;
    "hx-sse"?: string;
    "hx-sync"?: string;
    "hx-validate"?: string;
    "hx-vars"?: string;
    "hx-ws"?: string;
  }
}
