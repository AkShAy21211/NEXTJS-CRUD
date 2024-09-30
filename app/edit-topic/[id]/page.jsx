import EditTopicForm from "@/app/components/EditTopicForm";
import React from "react";

const getTopicById = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const topic = await response.json();
    return topic
  } catch (error) {
    console.log(error);
  }
};
const Page = async ({ params }) => {
  const { id } = params;
  const topic = await getTopicById(id);

  
  const {title, description} = topic;
  
  return <EditTopicForm id={id} title={title} description={description}/>;
};

export default Page;
