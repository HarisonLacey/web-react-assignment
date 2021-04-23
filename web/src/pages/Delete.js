import React from "react";
import axios from "axios";
import { useContextWrapper } from "../contextWrapper/contextWrapper";

export default function DeleteItem() {
  const [id, setId] = useState();
  let API_HOST = useContextWrapper();
  async function deleteItems() {
    try {
      let res = await axios.delete(`${API_HOST}/recipes/${id}`, {
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
      <input onChange={(e) => setId(e.target.value)} />
      <button onClick={deleteItems}>Delete</button>
    </div>
  );
}
