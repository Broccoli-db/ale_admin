import { useDispatch } from "react-redux";
import { useState } from "react";

// 二次封装useDispatch
export const useAppDispatch = () => useDispatch();
/*
  二次封装useState
*/
export const useAllState = (val) => {
  let [state, setState] = useState(() => {
    return typeof val === "function" ? val() : val;
  });
  
  const setObjState = (newVal) => {
    if (typeof newVal === "function") {
      newVal = newVal(state);
    }
    setState((pre) => {
      if (Object.prototype.toString.call(newVal).includes("Object")) {
        return { ...pre, ...newVal };
      } else {
        return newVal;
      }
    });
  };
  return [state, setObjState];
};
