import { createSignal } from "solid-js";
import S from "./MovieCard.module.css";
import { useNavigate } from "@solidjs/router";
export function MovieCard(props) {
  const navigate = useNavigate();
  const { movie } = props;
  const [isLoading, setIsLoading] = createSignal(true);
  const bgImage = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  console.log(movie);

  return (
    <li class={S.card} on:click={() => navigate(`/${movie.id}`)}>
      <div>
        <div
          style={isLoading() ? {} : { display: "none" }}
          class={S.skeleton}
        ></div>
        <div style={!isLoading() ? {} : { display: "none" }} class={S.wrapper}>
          <img
            src={bgImage}
            alt="123"
            class={S.image}
            onLoad={() => setIsLoading(false)}
          />
        </div>

        <div class={S.container}>
          <div class={S.container_star}>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              class={S.star}
              viewBox="0 0 24 24"
              fill="currentColor"
              role="presentation"
            >
              <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
            </svg>
            <div>{movie.vote_average.toFixed(1)}</div>
          </div>

          <h2 class={S.title}>{movie.title}</h2>
        </div>
      </div>
    </li>
  );
}
