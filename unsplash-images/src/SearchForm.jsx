import { useGlobalContext } from "./Context";

function SearchForm() {
  const { setSearchTerm } = useGlobalContext();

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event.target.elements);
    const searchInput = event.target.elements.search.value;

    if (!searchInput) return;
    console.log(searchInput);
    setSearchTerm(searchInput);
  }

  return (
    <section>
      <h1 className="title">Unsplash images</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="cat"
          className="form-input search-input"
        />
        <button className="btn" type="submit">
          {" "}
          submit
        </button>
      </form>
    </section>
  );
}

export default SearchForm;
