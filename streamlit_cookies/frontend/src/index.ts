import {Streamlit, RenderData} from "streamlit-component-lib"
import Cookies from "universal-cookie"

type TMethod = "set" | "get" | "delete"
type TMethodsMap = { [key in TMethod]: (args: TArgs) => string | boolean }
type TArgs = {
  name: string
  value?: string
  expires_at?: string
}

const cookies = new Cookies()

/**
 * Map method names to the cookie-related method bodies.
 */
const cookieMethods: TMethodsMap = {
  set: (args: TArgs): boolean => {
    console.log("set() called with args: " + JSON.stringify(args))

    const expires_at = args.expires_at || "2038-01-01T00:00:00.000Z"
    cookies.set(args.name, args.value, {expires: new Date(expires_at)})

    return true
  },

  get: (args: TArgs): string => {
    console.log("get() with args: " + JSON.stringify(args))

    return cookies.get(args.name)
  },

  delete: (args: TArgs): boolean => {
    console.log("delete() called with args: " + JSON.stringify(args))

    cookies.remove(args.name)

    return true
  },
}

/**
 * Render the component in the browser. Called immediately after the
 * component is initially loaded, and then again every time the component
 * gets new data from the backend. There's no UI for the Streamlit Cookies
 * component, so this is used to just trigger appropriate method calls.
 */
function onRender(event: Event): void {
  const data = (event as CustomEvent<RenderData>).detail
  const method: TMethod = data.args.method || "N/A"

  const result = cookieMethods[method](data.args)
  Streamlit.setComponentValue(result)
}

Streamlit.events.addEventListener(Streamlit.RENDER_EVENT, onRender)
Streamlit.setComponentReady()
