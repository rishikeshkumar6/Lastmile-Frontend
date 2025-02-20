import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <section className="flex gap-6">
      <Sidebar />
      <div className="m-3 text-xl text-gray-900 font-semibold">
        REACT TAILWIND
      </div>
    </section>
  );
};

export default Home;
