import { useState } from "react";

import Button from "../../components/ui/button";
import SearchInput from "../../components/ui/search-input";

const Home = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="relative h-[calc(100vh-112px)] w-full">
      <img
        src="/clothes.jpg"
        alt="Background"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 px-4 text-center text-white lg:px-28">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Style and Sustainability for Every Lifestyle
        </h1>
        <p className="max-w-xl text-lg md:text-xl">
          From fashion to furniture, explore quality second-hand treasures that
          are kind to your wallet — and the planet.
        </p>
        <div className="mt-4 flex gap-2">
          <SearchInput
            placeholder="Search product."
            value={search}
            className="h-12 w-60 rounded-xl p-3 text-shade-dark"
            onChange={handleSearch}
          />
          <Button className="h-12">Search</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
