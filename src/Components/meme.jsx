import React, { useState, useEffect } from "react";

export default function Meme(props) {
  const [image, setImage] = useState("");
  const [meme, setMeme] = useState({
    toptext: "",
    bottomtext: "",
    randomimg: "http://i.imgflip.com/1bij.jpg"
  });
  const [text, setText] = useState({ topText: "", bottomText: "" });
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes))
      
      .catch(error => console.log("Error fetching memes:", error));
  }, []);

  function handleText(event) {
    const { name, value } = event.target;
    setText(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function buttonHandler(e) {
    e.preventDefault();
    const randomIndex = Math.floor(Math.random() * allMemes.length);
    const randomMeme = allMemes[randomIndex];
    setMeme(prevMeme => ({
      ...prevMeme,
      randomimg: randomMeme.url
    }));
  }

  return (
    <main>
      <form className="form">
        <input
          type="text"
          className="text"
          placeholder="Top text"
          name="topText"
          onChange={handleText}
          value={text.topText}
        />
        <input
          type="text"
          className="text"
          placeholder="Bottom text"
          name="bottomText"
          onChange={handleText}
          value={text.bottomText}
        />
        <button className="btn" onClick={buttonHandler}>
          Get new Image 🖼️
        </button>
        <div className="meme-container">
        <img src={meme.randomimg} className="meme" alt="meme" />
        <h2 className="text1" top>
          {text.topText}
        </h2>
        <h2 className="text2" bottom>
          {text.bottomText}
        </h2>
        </div>
      </form>

    </main>
  );
}
