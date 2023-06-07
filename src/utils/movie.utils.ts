import LotrPart1 from "../assets/LotrPart1.jpg";
import LotrPart2 from "../assets/LotrPart2.jpg";
import LotrPart3 from "../assets/LotrPart3.jpg";

export const getImageFromMovie = (movieName: string) => {
  if (movieName === "The Fellowship of the Ring") {
    return LotrPart1;
  }
  if (movieName === "The Two Towers") {
    return LotrPart2;
  }
  if (movieName === "The Return of the King") {
    return LotrPart3;
  }
};