import { useState, useEffect } from "react";
import { useContextWrapper } from "../cotenxtWrapper/contextWrapper";
const axios = require("axios");

export default function Landing() {
  let API_HOST = useContextWrapper()
  console.log(API_HOST)
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.post(
          `${API_HOST}brewers/`,
          {
            name: "Neal",
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        console.log(res);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
    async function fetchBrewer() {
      try {
        const res = await axios.get(`${API_HOST}brewers/`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        console.log(res);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchBrewer();
  }, []);
  return <div>Landings</div>;
}
