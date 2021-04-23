import queryString from "query-string";

// simple hook I built that gets the query string object

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
