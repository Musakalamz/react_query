import { useDeleteData, useEditData } from "./reactQueryAndCustom";

const SingleItem = ({ item }) => {
  const { editPost } = useEditData();
  const { deletePost, deleteLoadingPost } = useDeleteData();

  return (
    <div className="single-item">
      <input
        type="checkbox"
        checked={item.isDone}
        // onChange={() => console.log("edit task")}
        onChange={() => editPost({ TaskId: item.id, isDone: !item.isDone })}
      />
      <p
        style={{
          textTransform: "capitalize",
          textDecoration: item.isDone && "line-through",
        }}
      >
        {item.title}
      </p>
      <button
        className="btn remove-btn"
        type="button"
        disabled={deleteLoadingPost}
        onClick={() => deletePost(item.id)}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
