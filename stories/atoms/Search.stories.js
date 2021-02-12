import React from "react";
import { Search } from "../../components/atoms/Search/Search.atom";

export default {
  title: "Atoms/Search",
};

export const Default = () => <Search action={(event) => console.log(event)} />;
export const Value = () => <Search defaultValue="test value" />;
export const Disabled = () => <Search disabled />;
