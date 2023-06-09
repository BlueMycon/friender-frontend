import React, { useState, useEffect, useContext } from "react";
import MatchCard from "./MatchCard";
import FrienderApi from "./api";
import userContext from "./userContext";

/** DESCRIPTION
 *
 * Props:
 *
 * State:
 *
 * PARENT -> Matches -> {CHILDREN}
 */

function Matches({webSocket}) {
  const { user } = useContext(userContext);

  const [isLoading, setIsLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  console.log('matches from Matches', matches)

  //use effect to get the list of potential matches
  useEffect(() => {
    async function getMatches() {
      try {
        const res = await FrienderApi.getMatches(user.email);
        setMatches(res);
        setIsLoading(false);
      } catch (err) {
        console.log("error loading s", err);
      }
    }
    getMatches();
  }, []);

  if (isLoading)
    return <h1 className="position-absolute top-50 start-50">Loading....</h1>;
  //not 100% sure where these will live
  /** renderInfo receives nothing, returns instances of the CompanyCard component*/
  function renderMatchCards() {
    return matches.map((match) => <MatchCard key={match.id} match={match} webSocket={webSocket} />);
  }

  return (
    <div>
      <div className="flex-column">{renderMatchCards()}</div>
    </div>
  );
}

export default Matches;
