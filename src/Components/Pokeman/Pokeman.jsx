import './Pokeman.css'
import Card from "../Card/Card";
import { useEffect, useState } from 'react';


const Pokeman = () => {
    const [datas, setData] = useState([])
    const [isFetching, setIsFetching] = useState(false);
    
    let pageSize = 10;

    const getPosts = async () => {
        setIsFetching(true)
        const response = await fetch(
          `https://api.pokemontcg.io/v2/cards?page=1&pageSize=${pageSize}`
        );
        const data = await response.json();
        setData([...datas, ...data.data]);
        setIsFetching(false)
    };

    function getMorePosts() {
        setTimeout(() => {
            pageSize+=10;
            getPosts();
            }, 4000);
    }

    useEffect(() => {
        getPosts();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

      
    useEffect(() => {
        if (!isFetching) return;
        getMorePosts();
    }, [isFetching]);

    const handleScroll = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight
        )
          return;
        setIsFetching(true);
    }

    return(
        <div className="pokeman">
            {Object.keys(datas).map((item) => {
                return <Card name={datas[item].name} attacks={datas[item].attacks} hp={datas[item].hp} abilities={datas[item].abilities} image={datas[item].images.large} />
            })}
        </div>
    )
}

export default Pokeman;
