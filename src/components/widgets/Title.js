import React, {useState, useEffect} from 'react';

const Title = () => {
  const [title, setTitle] = useState(null);

  const decodeHtmlEntities = (text) => {
    let textArea = document.createElement('textarea');
    textArea.innerText = text;
    return textArea.value;
  }

  useEffect(()=>{
    const timer = setInterval(()=>{
      fetch("https://nofm-radio.com/wp-json/react/v2/radio/")
      .then(response => response.json())
      .then(data => {
        const {title} = data;
        setTitle(title);
      })
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return(
    // <h1 className="f_title">{decodeHtmlEntities(title)}</h1>
    <script type="text/javascript" src="//cdn.voscast.com/stats/display.js?key=d3b9d948ce2a095ad198b852a44fa999&stats=songtitle"></script>
  );
}

export default Title;
