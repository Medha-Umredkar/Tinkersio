import './Card.css';

const Card = (props) => {
  return(
    <div className="container">
      <img className="image" src={props.image} alt="" />
      <div className="details">
        <div className="text">
          <h1 className="title">{props.name}</h1> 
          <h2 className="attacks">Attacks</h2>
          {props.attacks && props.attacks.map((item, index) => <p  style={{display:"inline",fontSize:"12px"}} key={index}>{item.name}, </p>)}
          
          <h2 className="attacks">Abilities</h2>
          {props.abilities &&  props.abilities.map((item,index) => <p  style={{display:"inline",fontSize:"12px"}} key={index}>{item.name}</p>)}
        </div>

        <div className="hp">
          <h2 className="attacks">Hp</h2>
          {props.hp}
        </div>
      </div>
    </div>
    )
}

export default Card;