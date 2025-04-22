import {
  createResource,
  Show,
  Switch,
  Match,
  createSignal,
  For,
} from "solid-js";
import { fetchData } from "../../api";
import { MovieCard } from "../MovieCard";
import S from "./MovieGrid.module.css";

const fetchMovies = async (page) => {
  const data = await fetchData(`api/movie/popular?language=en-US&page=${page}`);
  return data;
};

export function MovieGrid() {
  const [page, setPage] = createSignal(1);
  const [data] = createResource(page, fetchMovies);

  return (
    <>
      <Show when={data.loading}>
        <p>Loading...</p>
      </Show>
      <Switch>
        <Match when={data.error}>
          <span>Error: {data.error}</span>
        </Match>
        <Match when={data()}>
          <h1>This week's top TV and movies</h1>
          <ul class={S.grid}>
            <For each={data().results}>
              {(movie) => <MovieCard movie={movie} />}
            </For>
          </ul>
        </Match>
      </Switch>
      {/* <button onClick={() => setPage(page() + 1)}>Next</button> */}
    </>
  );
}
