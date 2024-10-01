"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

const RemoveButton = ({ id }) => {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm(`Are you sure you want to delete`);

      if (confirm) {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL+`/api/topics?id=${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete topic");
        }

        const data = await response.json();
        router.refresh();
        alert(data.message);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={() => handleDelete(id)}>
      <HiOutlineTrash size="24" />
    </button>
  );
};

export default RemoveButton;
