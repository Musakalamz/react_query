import SingleItem from "./SingleItem";
import { useFetchData } from "./reactQueryAndCustom";

// const Items = ({ items }) => {
const Items = () => {
  const { data, isLoading, isError, error } = useFetchData();

  if (isLoading) {
    return <p style={{ marginTop: "3rem" }}> Loading ... </p>;
  }

  if (isError) {
    return <p style={{ marginTop: "3rem" }}> There was an error ... </p>;
  }

  console.log(error);

  // if (error) {
  //   return <p style={{ marginTop: "3rem" }}> {error.message} </p>;
  //   return <p style={{ marginTop: "3rem" }}> {error.response.data} </p>;
  // }

  return (
    <div className="items">
      {/* {items.map((item) => { */}
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
