// src/App.js

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section";
import SongsFilters from "./components/SongsFilters/SongsFilters";
import "./App.css";

function App() {
  // Initialize the filter state to "all" to match the default tab.
  const [filter, setFilter] = useState("all");

  return (
    <div>
      <Navbar />
      <Hero />

      <Section
        title="Top Albums"
        apiEndpoint="https://qtify-backend-labs.crio.do/albums/top"
      />
      <Section
        title="New Albums"
        apiEndpoint="https://qtify-backend-labs.crio.do/albums/new"
      />

      <div
        style={{
          backgroundColor: "black",
          color: "white",
          padding: "1rem",
        }}
      >
        <Section
          title="Songs"
          apiEndpoint="https://qtify-backend-labs.crio.do/songs"
          type="song"
          filter={filter}
          component={<SongsFilters onSelect={(f) => setFilter(f)} />}
        />
      </div>
    </div>
  );
}

export default App;