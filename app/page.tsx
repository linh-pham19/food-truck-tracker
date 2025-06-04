import Maps from "@/maps/maps";
// import { useState } from "react";

export default function Home() {
  return (
    <main className="container">
      <header className="navbar">
        <nav>
        <h1>I am a food truck</h1>
        </nav>
      </header>
      <section className="search-section">
        <input type="text" placeholder="Search for food trucks..." />
        <button>Search</button>
      </section>
      <section className="map-section">
 
        <br/>
    <Maps>

    </Maps>
      </section>
    </main>
   
  
  );
}
