"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const EditTopicForm = ({ id, title, description }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setNewTitle(value);
        break;
      case "description":
        setNewDescription(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = async (e) => {
    if (!newTitle.trim()) {
      setNewTitle(title);
    }
    if (!newDescription.trim()) {
      setNewDescription(description);
    }
    try {
      e.preventDefault();
      await fetch(process.env.NEXT_PUBLIC_API_URL+`/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
        }),
      });
      // Update the topics list to reflect the updated topic
      setNewTitle("");
      setNewDescription("");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="flex flex-col gap-3 "
      action="
   "
    >
      <input
        onChange={(e) => handleChange(e)}
        defaultValue={title}
        className="border border-slate-500 px-8 py-2"
        type="text"
        id="title"
        name="title"
        placeholder="Topic Title "
      />
      <input
        onChange={(e) => handleChange(e)}
        defaultValue={description}
        className="border border-slate-500 px-8 py-2"
        type="text"
        id="description"
        name="description"
        placeholder="Topic description "
      />

      <button type="submit" className="bg-green-500 text-white py-3 px-6 w-fit">
        Update Topic
      </button>
    </form>
  );
};

export default EditTopicForm;
