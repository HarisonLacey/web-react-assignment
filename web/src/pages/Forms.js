import { useState, useEffect } from "react";
import React from 'react';
import { useParams } from "react-router-dom";
import NewBrewerForm from "../components/NewBrewerForm";
import NewRecipeForm from "../components/NewRecipeForm";

// new brewer or recipe page

// render either the form to create a new brewer or recipe based on the url param id
export default function Forms() {
  const [formRender, setFormRender] = useState();
  const { id } = useParams();
  useEffect(() => {
    setFormRender(id);
  }, [id]);
  return (
    <div>
      {formRender === "brewer" && <NewBrewerForm />}
      {formRender === "recipe" && <NewRecipeForm />}
    </div>
  );
}
