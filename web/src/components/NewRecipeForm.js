import { useState, useEffect } from "react";
import React from "react";
import { useContextWrapper } from "../cotenxtWrapper/contextWrapper";
import axios from "axios";
import { Select } from "../styledComponents/sharedComponents";

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
  useEffect(() => {
    async function fecthBrewers() {
      try {
        let res = await axios.get(`${API_HOST}/brewers/`, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });
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
      await axios.post(
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
      <Select onChange={(e) => setBrewerId(e.target.value)} required>
        <option key={0} value="" disabled selected>
          select brewer
        </option>
        {brewers.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </Select>
      <input placeholder="title" onChange={(e) => setTitle(e.target.value)} />
      <input
        placeholder="description"
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Select onChange={(e) => setBeanType(e.target.value)} required>
        <option value="" disabled selected>bean type</option>
        <option value={"Robusta"}>Robusta</option>
        <option value={"Liberica"}>Liberica</option>
        <option value={"Arabica"}>Arabica</option>
        <option value={"Other"}>Other</option>
      </Select>
      <Select onChange={(e) => setBrewTime(e.target.value)} required>
        <option value="" disabled selected>brew time</option>
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
      </Select>
      <Select onChange={(e) => setBrewMethod(e.target.value)} required>
        <option value="" disabled selected>brew method</option>
        <option value={"French Press"}>French Press</option>
        <option value={"Drip"}>Drip</option>
        <option value={"Pour Over"}>Pour Over</option>
        <option value={"Cold Brew"}>Cold Brew</option>
        <option value={"Cold Brew Bottle"}>Cold Brew Bottle</option>
        <option value={"Siphon"}>Siphon</option>
        <option value={"AeroPress"}>AeroPress</option>
        <option value={"Bialetti"}>Bialetti</option>
        <option value={"Chemex"}>Chemex</option>
        <option value={"Espresso"}>Expresso</option>
        <option value={"Milk & Art"}>Milk & Art</option>
        <option value={"Nel Drip"}>Nel Drip</option>
        <option value={"Iced"}>Iced</option>
        <option value={"Other"}>Other</option>
      </Select>
      <input
        placeholder="taste notes"
        onChange={(e) => setTasteNotes(e.target.value)}
        required
      />
      <Select onChange={(e) => setTags(e.target.value)} required>
        <option value="" disabled selected>tags</option>
        <option value={"Light"}>Light</option>
        <option value={"Medium"}>Medium</option>
        <option value={"Strong"}>Strong</option>
        <option value={"Extra Strong"}>Extra Strong</option>
      </Select>
      <button type="submit">Submit</button>
      <p>{response}</p>
    </form>
  );
}
