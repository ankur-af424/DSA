import React from 'react';
import { useState, useEffect, useRef } from 'react'

function useDebouncedValue(deboucedValue, delay =0){
  const [debounced, setDebounced] = useState();

  useEffect(()=>{
    const id = setTimeout(() => setDebounced(deboucedValue),delay);
    return () => clearTimeout(id);
  },[deboucedValue,delay])
  return debounced;
}


function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState([]);
  const debouncedQuery = useDebouncedValue(query, 300);
  const abortRef = useRef(null);

  const styles = {
    main: {
      padding: '20px',
    },
    title: {
      color: '#5C6AC4'
    },
  };

  useEffect(() => {
    if(!debouncedQuery?.trim()){
      setResult([]);
      setStatus("idle");
      return;
    }

    abortRef?.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus("loading");
    fetch(`https://dummyjson.com/products/search?q=${debouncedQuery}`,controller.signal)
    .then((res) => res.json())
    .then((data) =>{ console.log(data);setResult(data?.products); setStatus("idle")})
    .catch((error) => {console.log("error");setStatus("error")})



  },[debouncedQuery])


  return (
    <div style={styles.main}>
      <input type="text" onChange={(e) => setQuery(e.target.value)} placeholder="Search..."
        aria-label="Search" />
      {status === "loading" && <p>loading ... </p>}
      {status === "error" && <p>OOPS Something went wrong</p>}
      {status === "idle" && (<ul role="listbox">
      {result.map((r) => (
        <li key={r.id}>{r.title}</li>
      ))}
      </ul>)}      
    </div>
  )
}

export default App
