# streamlit-cookies

Cookie manager component for Streamlit

## Requirements

- [Python](https://www.python.org/) 3.10+
- [Poetry](https://python-poetry.org/) (v.1.4 known to work)
- [Nodejs + npm](https://nodejs.org/) (v.16 known to work)
  (`yarn` would probably work too)

----

The instructions below assume you are within the repository root directory, unless otherwise
specified. You can get there by doing:

```sh
cd streamlit-cookies
```
using `bash` or a similar shell.

----

## Setup

### Backend

Enter the repository directory and build the Python virtual environment:

```sh
cd streamlit-cookies
poetry install
```

### Frontend

Enter the `frontend` subdirectory and install the `npm` dependencies:

```sh
cd streamlit_cookies/frontend
npm install
```

## Run the example

### Frontend

Enter the `frontend` subdirectory and run the `npm` script:

```sh
cd streamlit_cookies/frontend
npm start
```

### Backend

Make sure you have activated the Python virtual environment, then run the example Streamlit app
(you need to be in the repository root):

```sh
poetry shell
streamlit run examples/single_cookie.py
```

## Results and comments

The example app will open in your browser and you should be able to see two columns and the `True`
string on the left hand side, the `test-cookie-value` string on the right hand side:

![Example app screenshot](docs/img/single-cookie-example-page.png?raw=true)

### The problem

The issue is that the python script gets rerun all the time, again and again.

If we guard the `Streamlit.setComponentValue(result)` call
(`streamlit_cookies/frontend/src/index.ts:53`) remembering the last `result` value and only
calling it if the value has changed, still there is one redundant call which seems unavoidable.
