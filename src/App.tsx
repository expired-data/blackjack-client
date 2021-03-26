import "./App.css";
import { useClient } from "./client";
import { CardDisplay } from "./components/CardDisplay";
import { StatsPanel } from "./components/StatsPanel"; 

const App = () => {
  const [hand, client, stats] = useClient();
  if (!hand || !client) {
    return <>Loading...</>;
  }
  return (
    <div className="App">
      <h1>Welcome to Blackjack</h1>
      <CardDisplay hand={hand} />
      <div className="buttonContainer">
        {hand.value <= 21 && <button onClick={() => client?.hit()}>Hit</button>}
        <button className={hand.value > 21 ? "bust" : ""} onClick={() =>{ client.reset().then(() => client.stats()) }}>
          {hand.value > 21 ? "Try again." : "Stick"}
        </button>
      </div>

      <StatsPanel stats={stats} /> 
    </div>
  );
};

export default App;
