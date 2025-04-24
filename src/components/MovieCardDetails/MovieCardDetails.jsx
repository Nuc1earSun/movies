import { useParams } from "@solidjs/router";
import { createResource } from "solid-js";
import { fetchData } from "../../api";
import S from "./MovieCardDetails.module.css";
import { Layout } from "../Layout";

const fetchMovieById = async (id) => {
  const data = await fetchData(`api/movie/${id}?language=en-US`);
  console.log(data);

  return data;
};

export function MovieCardDetails() {
  const params = useParams();
  const [movie] = createResource(() => params.id, fetchMovieById);

  return (
    <Layout>
      <Show when={movie.loading}>
        <p>Loading...</p>
      </Show>
      <Switch>
        <Match when={movie.error}>
          <span>Error: {movie.error}</span>
        </Match>
        <Match when={movie()}>
          <div class={S.container}>
            <div class={S.image_wrapper}>
              <img
                src={`https://image.tmdb.org/t/p/original${
                  movie().poster_path
                }`}
                alt="123"
              />
            </div>
            <div>
              <h1>{movie().original_title}</h1>
              <div>
                Genre:{" "}
                {movie().genres.map((genre) => (
                  <span>{genre.name} </span>
                ))}
              </div>
            </div>
          </div>
        </Match>
      </Switch>
    </Layout>
  );
}
