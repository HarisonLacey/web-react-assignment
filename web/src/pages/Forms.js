import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import NewBrewerForm from "../components/NewBrewerForm";
import NewRecipeForm from "../components/NewRecipeForm";
import { Helmet } from "react-helmet";

// new brewer or recipe page

// render either the form to create a new brewer or recipe based on the url param id
export default function Forms() {
  const [formRender, setFormRender] = useState();
  // get url param
  const { id } = useParams();
  useEffect(() => {
    setFormRender(id);
  }, [id]);
  function Capital(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  return (
    <>
      <Helmet>
        <title>new {Capital(id)}</title>
      </Helmet>
      {formRender === "brewer" && <NewBrewerForm />}
      {formRender === "recipe" && <NewRecipeForm />}
    </>
  );
}
