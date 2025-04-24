import { createSignal } from "solid-js";
import S from "./SearchBar.module.css";
import { fetchData } from "../../api";
import { debounce } from "@solid-primitives/scheduled";
import { A } from "@solidjs/router";

export function SearchBar() {
  const [search, setSearch] = createSignal("");
  const [suggestions, setSuggestions] = createSignal([]);

  const debouncedSearch = debounce(async (e) => {
    console.log(e.target.value);

    const response = await fetchData(
      `api/search/movie?query=${e.target.value}&include_adult=false&language=en-US&page=1`
    );
    console.log(
      response.results.map((movie) => console.log(movie.original_title))
    );

    setSuggestions(
      response.results.map((movie) => ({
        id: movie.id,
        name: movie.original_title,
      }))
    );
  }, 700);

  const handleInputChange = async (e) => {
    setSearch(e.target.value);
    debouncedSearch(e);
  };

  const clearSuggestions = () => {
    setSuggestions([]);
  };

  return (
    <div class={S.container}>
      <input
        type="text"
        placeholder="Search movies"
        class={S.input}
        value={search()}
        onInput={handleInputChange}
      />
      <div class={S.suggestions} id="suggestions">
        <For each={suggestions()}>
          {(suggestion) => (
            <A href={`/${suggestion.id}`} onClick={clearSuggestions}>
              {suggestion.name}
            </A>
          )}
        </For>
      </div>
    </div>
  );
}
