import React, { useState } from "react";
import axios from "axios";
import { useContextWrapper } from "../contextWrapper/contextWrapper";
import { Select } from "../styledComponents/sharedComponents";

export default function DeleteItem() {
  const [item, setItem] = useState();
  const [id, setId] = useState();
  let API_HOST = useContextWrapper();
  async function deleteItems() {
    try {
      let res = await axios.delete(`${API_HOST}/${item}/${id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div>
      <Select onChange={(e) => setItem(e.target.value)} required>
        <option value="" disabled selected>
          Item
        </option>
        <option value="brewers">Brewers</option>
        <option value="recipes">Recipes</option>
      </Select>
      <input placeholder="id" onChange={(e) => setId(e.target.value)} />
      <button onClick={deleteItems}>Delete</button>
    </div>
  );
}
