import { createSignal } from "solid-js";
import S from "./SearchBar.module.css";
import { fetchData } from "../../api";
import { debounce } from "@solid-primitives/scheduled";

export function SearchBar() {
  const [search, setSearch] = createSignal("");
  const [suggestions, setSuggestions] = createSignal([]);

  const debouncedSearch = debounce(async (e) => {
    const response = await fetchData(
      `api/search/keyword?query=${e.target.value}&page=1`
    );
    setSuggestions(response.results);
  }, 700);

  const handleInputChange = async (e) => {
    setSearch(e.target.value);
    debouncedSearch(e);
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
          {(suggestion) => <p>{suggestion.name}</p>}
        </For>
      </div>
    </div>
  );
}
