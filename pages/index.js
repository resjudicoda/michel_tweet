import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>Tweet de Montaigne</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Tweet de Montaigne</h1>
          </div>
          <div className="header-subtitle">
            <h2>Give Michel de Montaigne a topic and he will write you a tweet! The simpler the better.</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea 
            placeholder="start typing here" 
            className="prompt-box" 
            value={userInput}
            onChange={onUserChangedText}
          />
            <div className="prompt-buttons">
              <a className="generate-button" onClick={callGenerateEndpoint}>
                <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
                </div>
              </a>
            </div>
            {apiOutput && (
              <div className="output">
                <div className="output-header-container">
                  <div className="output-header">
                    <h3>Output</h3>
                  </div>
                </div>
                <div className="output-content">
                  <p>{apiOutput}</p>
                </div>
              </div>
            )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
