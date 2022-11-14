import React from 'react'

export default function AllData() {
  const [data, setData] = React.useState('')
    
    React.useEffect(() => {
  
      fetch('/account/all')
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((err) => console.log(err) )
        ;
    }, []);
  return (
    <>
      <h1>AllData</h1>
      <br /><h5>{data}</h5>
    </>
  )
}
