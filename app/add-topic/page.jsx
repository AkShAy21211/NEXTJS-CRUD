"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
const Page = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        return;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      alert(data.message);
      router.push("/"); // Redirect to home page after successful topic creation
      router.refresh()
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={(e)=>onSubmit(e)}
      className="flex flex-col gap-3 "
      action="
   "
    >
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        id="title"
        value={title}
        onChange={(e)=>handleChange(e)}
        name="title"
        placeholder="Topic Title "
      />
      <input
        className="border border-slate-500 px-8 py-2"
        type="text"
        id="description"
        onChange={(e)=>handleChange(e)}
        value={description}
        name="description"
        placeholder="Topic description "
      />

      <button type="submit" className="bg-green-500 text-white py-3 px-6 w-fit">
        Add Topic
      </button>
    </form>
  );
};

export default Page;
