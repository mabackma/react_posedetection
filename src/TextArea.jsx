import { useState } from 'react';

const TextArea = () => {
  const [value, setValue] = useState('');
  const [summary, setSummary] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    // Create a JSON object with the text area value
    const data = { text: value };

    // Send a POST request to the web address
    fetch('http://127.0.0.1:5000/summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setSummary(data.summary);
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle errors here
    });
  }

  return (
    <div>
      <br/>
      <label htmlFor="textarea">Enter Text:</label>
      <br/>
      <textarea
        id="textarea"
        value={value}
        onChange={handleChange}
        rows={8} 
        cols={50} 
      />
      <br/>
      <button onClick={handleClick}>Send Text</button>
      <div>
          <br />
          <label>Summary:</label>
          <p>{summary}</p>
      </div>
    </div>
  );
}

export default TextArea;