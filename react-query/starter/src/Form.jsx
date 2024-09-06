import { useState } from "react";
import { useCreateData } from "./reactQueryAndCustom";

const Form = () => {
  const [newItemName, setNewItemName] = useState("");
  const { createPost, isLoading } = useCreateData();

  const handleSubmit = (e) => {
    e.preventDefault();

    // createPost();
    createPost(newItemName, {
      onSuccess: () => {
        setNewItemName("");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>task bud</h4>
      <div className="form-control">
        <input
          type="text "
          className="form-input"
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type="submit" className="btn" disabled={isLoading}>
          add task
        </button>
      </div>
    </form>
  );
};
export default Form;
