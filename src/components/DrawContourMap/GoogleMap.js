
import React from 'react';
import 'dotenv/config';

function GoogleMap(props) {

  function onScriptLoad() {
      const map = new window.google.maps.Map(document.getElementById(props.id), props.options);
      props.onMapLoad(map);
  }

  if (!window.google) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_KEY}`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important.
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        onScriptLoad();
      })
  } else {
      onScriptLoad();
  }

  return (
    <div style={{ width: 500, height: 500 }} id={props.id} />
  );
    
}

export default GoogleMap;
