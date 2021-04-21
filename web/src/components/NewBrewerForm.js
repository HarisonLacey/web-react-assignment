import React, { useState } from 'react';
import axios from "axios";
import { useContextWrapper } from "../cotenxtWrapper/contextWrapper";


// new brewer form

export default function NewBrewerForm() {
  const [name, setName] = useState();
  const [response, setResponse] = useState();
  let API_HOST = useContextWrapper();
  // set name and response and fetch brewer save api
  async function formHandle(e) {
    e.preventDefault();
    try {
      await axios.post(
        `${API_HOST}/brewers/`,
        {
          name: name,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      setResponse("Brewer saved!");
    } catch (err) {
      console.log(err.message);
      setResponse("Brewer already exists!");
    }
  }
  return (
    // new brewer save form
    <form onSubmit={formHandle}>
      <input
        placeholder="Brewer Name"
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Submit</button>
      <p>{response}</p>
    </form>
  );
}
