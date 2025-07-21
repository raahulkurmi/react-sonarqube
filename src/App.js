function App() {
  return (
    <div className="App">
      <h1>Hi, this is for test</h1>
    </div>
  );
}

export default App;
function App() {
  const userInput = "<img src=x onerror=alert('XSS')>";

  // ⚠️ Eval usage — security hotspot
  const result = eval("2 + 2");

  // ⚠️ Hardcoded secret — code smell
  const apiKey = "my-hardcoded-api-key";

  return (
    <div className="App">
      <h1>Hi, this is for test</h1>

      {/* ⚠️ XSS vulnerability */}
      <div dangerouslySetInnerHTML={{ __html: userInput }} />

      {/* Eval output */}
      <p>Eval result: {result}</p>

      {/* Hardcoded secret */}
      <p>API Key: {apiKey}</p>
    </div>
  );
}

export default App;
