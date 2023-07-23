import React, { useState } from "react";
function CardList(props){
    return <div className="card__list">
          <h1 className="result__text">📄 Results</h1>
          <div className="card__list__items">
               <div className="card__item">Adade3 (0 steps)</div>
               {props.data && props.data.length && props.data.map((e,i)=>{
                return <div key={i} className="card__item">{e.password} ({e.steps} steps)</div>
               })}
          </div>
    </div>
}

export default CardList;