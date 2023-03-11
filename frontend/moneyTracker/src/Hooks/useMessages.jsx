import React from "react";
import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";

const MsgContext = createContext({
  message: null,
  setMessage: () => null,
});

export function MsgProvider({ children }) {
  const [message, setMessage] = useState(null);

  const value = { message, setMessage };

  return <MsgContext.Provider value={value}>{children}</MsgContext.Provider>;
}

export default function useMessage() {
  return useContext(MsgContext);
}

// setMessage({ type: "error", description: "invalid password" });
