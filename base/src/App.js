import { useState } from "react";
import Card from "./Funcoes/card";
import getToken from "./Seviços/token";

const baseURL = (pesquisa) =>
  `https://api.spotify.com/v1/search?q=${pesquisa}&type=track&limit=10`;

function App() {
  const [pesquisa, setPesquisa] = useState("");
  const [Tracks, setTracks] = useState([]);
  const [Carregando, setCarregando] = useState(false);
  const [NoResults, setNoResults] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (pesquisa === "") {
      setTracks([]);
      return;
    }

    setCarregando(true);
    setNoResults(false);

    const token = await getToken();

    const response = await fetch(baseURL(pesquisa), {
      headers: { Authorization: token },
    });

    const { tracks } = await response.json();
    if (tracks.items.length === 0) {
      setNoResults(true);
      setCarregando(false);
      setTracks([])
      return;
    }
    setTracks(tracks.items);
    setNoResults("");
    setCarregando(false);
  }

  return (
    <div className="App">
      <h1>Serch your Music here</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pesquisa}
          onChange={(event) => setPesquisa(event.target.value)}
        ></input>
        <button type="submit"></button>
      </form>
      {Carregando && <span>Carregando...</span>}
      {NoResults && <span>Sem resultados</span>}
      {Tracks.map((track) => (
        <Card track={track}></Card>
      ))}
    </div>
  );
}

export default App;
