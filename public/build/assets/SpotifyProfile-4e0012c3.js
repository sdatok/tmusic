import{r as s,j as r}from"./app-eb26a8d9.js";function l(){const[e,a]=s.useState(null);return s.useEffect(()=>{const o=localStorage.getItem("spotify_token");if(!o){console.log("Spotify access token is not available in local storage.");return}(async()=>{try{const t=await fetch("https://api.spotify.com/v1/me",{headers:{Authorization:`Bearer ${o}`}});if(!t.ok)throw new Error(`Spotify API responded with status ${t.status}`);const i=await t.json();a(i)}catch(t){console.error("Error fetching user profile:",t)}})()},[]),e?r.jsxs("div",{children:[e.images.length>0&&r.jsx("img",{src:e.images[0].url,alt:e.display_name,className:"w-32 h-32 rounded-full object-cover"}),r.jsxs("h1",{className:"text-lg font-medium text-gray-900 dark:text-gray-100",children:["Welcome, ",e.display_name,"!"]})]}):r.jsx("div",{children:"Loading..."})}export{l as default};