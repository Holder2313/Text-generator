import { useState } from "react";

const API_KEY = "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";

function App() {
  const [tweet, setTweet] = useState("");
  const [sentiment, setSentiment] = useState("");

  async function callOpenAIAPI() {
    console.log("calling the open AI API");
    //   -H "Content-Type: application/json" \
    // -H "Authorization: Bearer $OPENAI_API_KEY" \

    const APIBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "invente une blaque avec les éléments suivants:  " ,
        },
        {
          role: "user",
          content: tweet,
        },
      ],
      temperature: 0.7,
      max_tokens: 164,
      top_p: 1,
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': "Bearer " + API_KEY
      },
      body: JSON.stringify(APIBody)
    }).then((data) => {
      return data.json()
    }).then((data) => {
      console.log(data);
      setSentiment(data.choices[0].message.content.trim())
    })
    
  }

  console.log(tweet);

  return (
    <>
      <div className="form">
        
          <textarea
            onChange={(e) => setTweet(e.target.value)}
            name=""
            id=""
            cols={50}
            rows={10}
            placeholder=" Entrez un mot pour créer une blague."
          ></textarea>
       

        <button onClick={callOpenAIAPI}>
          Creer une blague
        </button>
        {sentiment !== "" ? <h3 className="response">{sentiment} </h3> : null}
      </div>
    </>
  );
}

export default App;
