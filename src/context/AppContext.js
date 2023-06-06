import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("tomorrow_night");
  const [fontFamily, setFontFamily] = useState("Consolas");
  const [fontSize, setFontSize] = useState(24);
  const [wrap, setWrap] = useState(true);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [alignment, setAlignment] = useState("right");
  const [language, setLanguage] = useState("python");

  const [code, setCode] = useState("");
  const [stdIn, setStdIn] = useState("");
  const [output, setOutput] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [headTags, setHeadTags] = useState("");
  const [cssFramework, setCssFramework] = useState("none");
  const [error, setError] = useState("");

  const [jntu, setJntu] = useState("");
  const [dept, setDept] = useState("");
  const [batch, setBatch] = useState("");
  const [sem, setSem] = useState("");
  const [usetType, setUserType] = useState("");
  const [actualOutputValue, setActualOutputValue] = useState("");
  const [wrongAnswerCheck, setWrongAnswerCheck] = useState(false);
  const [compiled, setCompiled] = useState(false);
  const [customInputDisplay, setCustomInputDisplay] = useState(false);
  const [customInputsOutput, setCustomInputsOutput] = useState([]);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        fontFamily,
        setFontFamily,
        fontSize,
        setFontSize,
        wrap,
        setWrap,
        showLineNumbers,
        setShowLineNumbers,
        alignment,
        setAlignment,
        language,
        setLanguage,
        code,
        setCode,
        stdIn,
        setStdIn,
        output,
        setOutput,
        isSubmitting,
        setIsSubmitting,
        headTags,
        setHeadTags,
        cssFramework,
        setCssFramework,
        error,
        setError,
        submitted,
        setSubmitted,
        jntu,
        setJntu,
        dept,
        setDept,
        batch,
        setBatch,
        sem,
        setSem,
        usetType,
        setUserType,
        actualOutputValue,
        setActualOutputValue,
        wrongAnswerCheck,
        setWrongAnswerCheck,
        compiled,
        setCompiled,
        customInputsOutput,
        setCustomInputsOutput,
        customInputDisplay,
        setCustomInputDisplay,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useEditor = () => useContext(AppContext);
