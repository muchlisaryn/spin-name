import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import "./App.css";

function App() {
  // const { width, height } = useWindowSize();

  const names = ["Ucup", "Budi", "titi", "taga", "bros", "firman", "tits"];

  const [name, setName] = useState(names[0]);
  const [winner, setwinner] = useState([]);
  const [isRendering, setIsRendering] = useState(false);
  const [counts, setCounts] = useState(1);

  const getRandomNames = (count) => {
    const shuffled = [...names].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    if (isRendering) {
      const i = setInterval(() => {
        setName(names[Math.floor(Math.random() * names.length)]);
      }, 30);
      return () => clearInterval(i);
    } else {
    }
  }, [isRendering]);

  const stop = () => {
    const winners = getRandomNames(counts);
    setIsRendering(false);
    setwinner(winners);
  };

  return (
    <>
      <input
        className="border"
        placeholder="count"
        onChange={(e) => setCounts(e.target.value)}
        value={counts}
      />
      {isRendering ? (
        <>
          <div>{name}</div>
          <button onClick={stop}>STOP</button>
        </>
      ) : (
        <>
          {winner.length > 0 ? (
            <>
              <Confetti />
              <div className="flex gap-4">
                {winner.map((item) => (
                  <div className="p-2 border">{item}</div>
                ))}
              </div>
            </>
          ) : (
            <></>
          )}
          <button onClick={() => setIsRendering(!isRendering)}>PLAY</button>
        </>
      )}
    </>
  );
}

export default App;
