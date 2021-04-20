import { useState, useLayoutEffect } from "react";
import { useContextWrapper } from "../cotenxtWrapper/contextWrapper";
const axios = require("axios");

// new recipe form

export default function NewRecipeForm() {
  const [brewers, setBrewers] = useState([]);
  const [brewerId, setBrewerId] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [beanType, setBeanType] = useState();
  const [brewTime, setBrewTime] = useState();
  const [brewMethod, setBrewMethod] = useState();
  const [tasteNotes, setTasteNotes] = useState();
  const [tags, setTags] = useState();
  const [response, setResponse] = useState();
  let API_HOST = useContextWrapper();
  // set required body and fetch recipe save api
  useLayoutEffect(() => {
    async function fecthBrewers() {
      try {
        let res = await axios.get(`${API_HOST}/brewers/`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
        console.log(res.data);
        setBrewers(res.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fecthBrewers();
  }, [API_HOST]);
  async function formHandle(e) {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${API_HOST}/brewers/${brewerId}/recipes/`,
        {
          title: title,
          description: description,
          bean_type: beanType,
          brew_time: brewTime,
          brew_method: brewMethod,
          taste_notes: tasteNotes,
          tags: tags,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      setResponse("Recipe saved!");
    } catch (err) {
      console.log(err);
      setResponse("Something went wrong!");
    }
  }
  return (
    // new recipe save form
    <form onSubmit={formHandle}>
      <select onChange={(e) => setBrewerId(e.target.value)} required>
        <option key={0} value="">
          select brewer
        </option>
        {brewers.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </select>
      <input placeholder="title" onChange={(e) => setTitle(e.target.value)} />
      <input
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        placeholder="bean type"
        onChange={(e) => setBeanType(e.target.value)}
        required
      />
      <select onChange={(e) => setBrewTime(e.target.value)} required>
        <option value="">brew time</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value={10}>10</option>
      </select>
      <input
        placeholder="brew method"
        onChange={(e) => setBrewMethod(e.target.value)}
        required
      />
      <input
        placeholder="taste notes"
        onChange={(e) => setTasteNotes(e.target.value)}
        required
      />
      <select onChange={(e) => setTags(e.target.value)} required>
        <option value="">tags</option>
        <option value={1}>light</option>
        <option value={2}>medium</option>
        <option value={3}>strong</option>
        <option value={4}>extra strong</option>
      </select>
      <button type="submit">Submit</button>
      <p>{response}</p>
    </form>
  );
}
