import React from "react";
const additions = [
  {
    title: "Free Shipping",
    description: "Free shipping worldwide",
  },
  {
    title: "24 x 7 service",
    description: "Free shipping worldwide",
  },
  {
    title: "Festival offer",
    description: "Free shipping worldwide",
  },
];
const Addition = () => {
  return (
    <section className=" bg-slate-100" id="Additions">
      <div className="flex padding items-center justify-around">
        {additions.map((addition, index) => (
          <div key={index}>
            <h4 className="font-medium text-2xl uppercase pb-2">
              {addition.title}
            </h4>
            <p className=" text-slate-gray italic">{addition.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Addition;
