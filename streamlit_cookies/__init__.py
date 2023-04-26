"""Initialize the `streamlit_cookies` package."""

from pathlib import Path
import streamlit.components.v1 as components

_RELEASE = False

if _RELEASE:
    _component_func = components.declare_component(
        "streamlit_cookies",
        path=str(Path(__file__).parent / 'build'),
    )
else:
    _component_func = components.declare_component(
        "streamlit_cookies",
        url="http://localhost:3001",
    )


class Cookies:
    @staticmethod
    def set(name, value, key="set"):
        return _component_func(method="set", name=name, value=value, key=key)

    @staticmethod
    def get(name, key="get"):
        return _component_func(method="get", name=name, key=key)

    @staticmethod
    def delete(name, key="delete"):
        return _component_func(method="delete", name=name, key=key)
