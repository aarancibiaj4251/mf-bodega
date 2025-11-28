import React, {useEffect} from 'react';

const Chatbot = () => {

  useEffect(() => {
    (function(d, m){
      var kommunicateSettings =
        {"appId":"27235aa49fe0c369ca24fa8b1f20969a4","popupWidget":true,"automaticChatOpenOnNavigation":true};
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      (window as any).kommunicate = m; m._globals = kommunicateSettings;
    })(document, (window as any).kommunicate || {});
  }, [])

  return (
    <></>
  );
};

export default Chatbot;
