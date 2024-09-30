import RemoveButton from "./RemoveButton";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

export const getTopics = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch topics");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const TopicList = async () => {
  const topics = await getTopics();
  return (
    <>
      {topics.map((t, i) => (
        <div key={t._id} className="p-4 flex  justify-between  border-slate-300 gap-5 my-3 items-center">
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
