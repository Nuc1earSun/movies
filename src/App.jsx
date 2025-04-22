import { Layout } from "./components/Layout";
import { MovieGrid } from "./components/MovieGrid";
import "./reset.css";

function App() {
  return (
    <>
      <Layout>
        <MovieGrid />
      </Layout>
    </>
  );
}

export default App;
