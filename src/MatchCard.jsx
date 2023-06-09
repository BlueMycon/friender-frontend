import "./MatchCard.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Messages from "./Messages";

/** DESCRIPTION
 *
 * Props:
 *
 * State:
 *
 * PARENT -> MatchCard -> {CHILDREN}
 */

function MatchCard({
  match: { id, email, firstName, lastName, hobbies, interests, profile_img_url },
}, webSocket) {
  console.log("props", firstName, lastName, interests, profile_img_url);
  return (
    // <Link className="text-decoration-none"to={`/messages/:${id}}`}>
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div className="col-sm-9 mx-auto container p-3 my-3 match-card bg-white">
              <div className="row">
                <div className="col-4 mr-3">
                  <div className="image-container">
                    <img
                      src={profile_img_url}
                      alt="match-logo"
                      className="match-logo px-2 py-2"
                    />
                  </div>
                </div>
                <div className="col-8">
                  <h4 className="match-title text-dark">
                    {firstName} {lastName}
                  </h4>
                  <div className="d-flex flex-column justify-content-center">
                    <p className="text-start text-dark">
                      Interests: {interests}
                    </p>
                    <p className="text-start text-dark">Hobbies: {hobbies}</p>
                  </div>
                </div>
              </div>
            </div>
          </button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <Messages webSocket={webSocket} message_to_email={email}/>
          </div>
        </div>
      </div>
    </div>
    // <div className="col-sm-9 mx-auto container p-3 my-3 match-card bg-white">
    //   <div className="row">
    //     <div className="col-4 mr-3">
    //       <div className="image-container">
    //         <img
    //           src={profile_img_url}
    //           alt="match-logo"
    //           className="match-logo px-2 py-2"
    //         />
    //       </div>
    //     </div>
    //     <div className="col-8">
    //       <h4 className="match-title text-dark">
    //         {firstName} {lastName}
    //       </h4>
    //       <div className="d-flex flex-column justify-content-center">
    //         <p className="text-start text-dark">Interests: {interests}</p>
    //         <p className="text-start text-dark">Hobbies: {hobbies}</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // </Link>
  );
}

export default MatchCard;
