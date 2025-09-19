import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
        <HashLoader color="#4f46e5" size={70} />
      </div>
    </>
  );
};

export default Loader;
