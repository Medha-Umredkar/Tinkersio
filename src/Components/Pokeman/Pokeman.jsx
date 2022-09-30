import './Pokeman.css'
import Card from "../Card/Card";
import { useEffect, useState, useRef, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Pokeman = () => {
  const [datas, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const loader = useRef(null);
    
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
      setLoading(true);
      setError(false);
      fetch(`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=10`,{signal})
      .then((res) => {
        return res.json();
      }).then((data)=>{
        // console.log(data)
        setData((prev) => [...prev, ...data.data]);
        setLoading(false);
      }).catch( (err) =>{
        setLoading(false);
        setError(err);
      })

    return()=>{
        controller.abort();
    }
  }, [page]);
    
  useEffect(() => {
    const option = {
        root: null,
        rootMargin: "10px",
        threshold: 0
    };
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    },option);
    if (loader.current) observer.observe(loader.current);
    return(()=>{
        observer.disconnect();
    })
  }, []);

  return(
      <Fragment>
          <div className="pokeman">
            {Object.keys(datas).map((item) => {
                return <Card key={uuidv4()} name={datas[item].name} attacks={datas[item].attacks} hp={datas[item].hp} abilities={datas[item].abilities} image={datas[item].images.large} />
            })}
            
          </div>
          {loading && <p>Loading...</p>}
          {error && <p>Something Went Wrong...</p>}
          <div ref={loader} />
      </Fragment>
  )
}

export default Pokeman;
