import queryString from "query-string";

// simple query string hook

const queryObject = {
  query: queryString.parse(window.location.search),
  getQuery: function () {
    return this.query;
  },
};

function getQueryString() {
  return queryObject.getQuery();
}

export { getQueryString };
