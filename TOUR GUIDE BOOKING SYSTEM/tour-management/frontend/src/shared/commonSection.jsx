import React from "react";
import "./common-section.css";

const CommonSection = ({ title }) => {  // ✅ Accept `title` as a prop
  return (
    <section className="common__section">
      <h1>{title}</h1>
    </section>
  );
};

export default CommonSection;
