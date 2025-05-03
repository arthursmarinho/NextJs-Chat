import {useState} from "react";

interface UseDateData {
  currentDate: Date;
}

const useDate = (): UseDateData => {
  const [currentDate] = useState(new Date("2024-12-03T02:59:59.999Z"));

  return {currentDate};
};

export default useDate;
