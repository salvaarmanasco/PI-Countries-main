import React from "react";

function ActivityCard(props) {
  return (
    <div>
      {props && (
        <div>
          <p>
            <b>Activity: </b>
            {props.name}
          </p>
          <p>
            <b>Difficulty: </b>
            {props.difficulty}
          </p>
          <p>
            <b>Duration: </b>
            {props.duration} horas
          </p>
          <p>
            <b>Season: </b>
            {props.season}
          </p>
        </div>
      )}
    </div>
  );
}

export default ActivityCard;
