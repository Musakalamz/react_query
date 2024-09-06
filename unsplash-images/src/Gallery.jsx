import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./Context";

// const url =
//   "https://api.unsplash.com/search/photos?client_id=HBJBh6dI7lp5BFOrSbXIk0YfmRVUKzD8wmatSo3v-gE&query=office";

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

// console.log(import.meta.env.VITE_API_KEY);

function Gallery() {
  const { searchTerm } = useGlobalContext();

  const response = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      //   const result = await axios.get(url);
      const result = await axios.get(`${url}&query=${searchTerm}`);

      return result.data;
    },
  });
  console.log(response);

  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    );
  }

  const results = response.data.results;

  if (results.length < 1) {
    if (response.isLoading) {
      return (
        <section className="image-container">
          <h4>No result found...</h4>
        </section>
      );
    }
  }

  return (
    <section className="image-container">
      {results.map((item) => {
        const url = item?.urls?.regular;

        return (
          <img
            src={url}
            alt={item.alt_description}
            key={item.id}
            className="img"
          />
        );
      })}
    </section>
  );
}

export default Gallery;
