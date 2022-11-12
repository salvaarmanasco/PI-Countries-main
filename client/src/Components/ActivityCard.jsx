import React from "react";

function ActivityCard(props) {
  return (
    <div>
      {props && (
        <div>
          <p>
            <b>Actividad: </b>
            {props.name}
          </p>
          <p>
            <b>Dificultad: </b>
            {props.difficulty}
          </p>
          <p>
            <b>Duration: </b>
            {props.duration} horas
          </p>
          <p>
            <b>Temporada: </b>
            {props.season}
          </p>
        </div>
      )}
    </div>
  );
}

export default ActivityCard;
