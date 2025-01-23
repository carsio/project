import { useEffect, useState } from "react";
import { uniqueNamesGenerator, adjectives, animals } from "unique-names-generator";

const useCuteUserName = () => {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const savedName = localStorage.getItem("cuteUserName");

    if (savedName) {
      setUserName(savedName);
      return;
    } 

    const randomName = uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      separator: "-",
      style: "lowerCase",
    });

    localStorage.setItem("cuteUserName", randomName);
    setUserName(randomName);
  }, []);

  return userName;
};

export default useCuteUserName;