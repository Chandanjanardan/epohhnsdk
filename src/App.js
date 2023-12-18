import React,{useEffect,useRef,useState} from 'react'
import Logo from "./EPOHHN.png"
// import Loading from './Loading';
import "./App.css"


function Loading() {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p>Processing the text...</p>
    </div>
  );
}

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    setText(e.target.value);
  };


  let data = { text:text.trim(), lang: 'en' };

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [text]);

  async function handleSubmit() {
    try {
      setLoading(true); // Set loading to true when starting the request

      const response = await fetch('https://e8a6-49-249-159-230.ngrok-free.app/TTS', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioURL = URL.createObjectURL(audioBlob);
        const audioElement = new Audio(audioURL);

        // Set up an event listener for when the audio has finished loading
        audioElement.addEventListener('canplaythrough', () => {
          setLoading(false); // Set loading to false when audio has finished loading
          audioElement.play(); // Start playing the audio
        });
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  }

  // handle submit 
  function handleClear(){
    setText("")
  }
  return (
    <>
    <div className='main'>

      <div className='epohhn-container'>
        <div className='nav-container'>

          <img className="epohhn-logo"src={Logo} alt='EPOHHN'/>
          <h2 className='epohhn-heading'>Text To Speech</h2>
        </div>
        <div className='epohhn-textbox-container'>
        <textarea
        className="textarea"
        ref={textareaRef}
        value={text}
        onChange={handleInputChange}
        placeholder="Enter Text To Run..."
        style={{
          width:"70%",
          // height:"400px !important",
        
        }}
        />
        </div>
        <div className='btn'>

        <button className="clear" onClick={handleClear}>
                Clear
            </button>
            { text.length!==0 ?
            <button onClick={handleSubmit}className="submit">
                Submit
            </button>
              :<button disabled={true}>Submit</button>
            }
              </div>
      </div>
      {loading && <div className="loader"><Loading/></div>}
        </div>
    </>
  )
}

export default App