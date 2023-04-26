"""Smoke test setting and getting a single cookie ."""

import streamlit as st
from streamlit_cookies import Cookies

st.title("Streamlit Cookies Smoke Test")

left_col, right_col = st.columns(2)

with left_col:
    st.subheader("Setting the cookie...")
    result = Cookies.set("test-cookie", "test-cookie-value")
    st.write(result)

with right_col:
    st.subheader("Getting the cookie...")
    result = Cookies.get("test-cookie")
    st.write(result)
