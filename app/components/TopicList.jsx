export const dynamic = "force-dynamic";

import RemoveButton from "./RemoveButton";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const TopicList = async () => {
  const getTopics = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/topics",
        {
          cache: "no-store",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch topics");
      }

      return response.json();
    } catch (error) {
      console.log("Error fetching topics:", error);
      return [];
    }
  };

  const topics = await getTopics();

  if (topics.length === 0) {
    return <p className="text-red-500">No topics found or failed to load topics.</p>;
  }

  return (
    <>
      {topics.map((t) => (
        <div
          key={t._id}
          className="p-4 flex justify-between border-slate-300 gap-5 my-3 items-center"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <p>{t.description}</p>
          </div>
          <div className="flex gap-2">
            <RemoveButton id={t._id} />
            <Link href={`/edit-topic/${t._id}`}>
              <HiPencilAlt size="24" />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicList;
