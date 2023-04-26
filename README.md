# streamlit-cookies

Cookie manager component for Streamlit

## Requirements

- [Python](https://www.python.org/) 3.10+
- [Poetry](https://python-poetry.org/) (v.1.4 known to work)
- [Nodejs + npm](https://nodejs.org/) (v.16 known to work;
  `yarn` would probably work too)

----

The instructions below assume you have cloned the repository and are within the repo root
directory (unless stated otherwise). You can do this with:

```sh
git clone https://github.com/ya55en/streamlit-cookies.git
cd streamlit-cookies
```

----

## Setup

### Frontend

Enter the `frontend` subdirectory and install the `npm` dependencies:

```sh
cd streamlit_cookies/frontend
npm install
```

### Backend

From the repo root, build the Python virtual environment:

```sh
poetry install
```

## Run the example

### Frontend

Enter the `frontend` subdirectory and run the development server:

```sh
cd streamlit_cookies/frontend
npm start
```

### Backend

Make sure you have activated the Python virtual environment, then from the repository root, run
the example Streamlit app:

```sh
poetry shell
streamlit run examples/single_cookie.py
```

## Results and comments

The example app will open in your browser and you should be able to see two columns and the `True`
string on the left hand side, the `test-cookie-value` string on the right hand side:

![Example app screenshot](docs/img/single-cookie-example-page.png?raw=true)

### The problem

The issue is that the python script gets re-run constantly, all the time.

If we guard the `Streamlit.setComponentValue(result)` call
(`streamlit_cookies/frontend/src/index.ts:53`) remembering the last `result` value and only
calling it if the value has changed, the re-runs are not endless anymore and stop after a while
but still, there are at least as many redundant re-runs as the number of cookie method
invocations, which is far from ideal.
