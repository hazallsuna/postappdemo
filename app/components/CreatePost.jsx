"use client";
import { useForm } from "react-hook-form";
import { createPostAction } from "@/app/actions/postActions";
import usePostStore from "@/app/store/postStore";
import { useState } from "react";

const CreatePost = () => {
  const { addPost } = usePostStore(); //yeni postu global state eklemek için
  const [errorMsg, setErrorMsg] = useState(""); //hata mesajını göstermek için local state

  //form kontrolü
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //form gönderilince tetiklenen fonksiyon
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    const result = await createPostAction(formData);

    if (result.error) {
      setErrorMsg(result.error);
    } else {
      addPost(result.post);
      reset();
      setErrorMsg("");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errorMsg && (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <span className="font-medium">Error:</span> {errorMsg}
        </div>
      )}

      <div className="grid gap-6 mb-4 grid-cols-1 md:grid-cols-2">

  
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            className={`bg-gray-50 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            {...register("title", { required: true })}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">Required</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="Description"
            className={`bg-gray-50 border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">Required</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Create
      </button>
    </form>
  );
};

export default CreatePost;
