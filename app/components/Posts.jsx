"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import usePostStore from "@/app/store/postStore";
import {
  getPostsAction,
  updatePostAction,
  deletePostAction,
} from "@/app/actions/postActions"; 

//form doğrulama şeması: title ve description zorunludur
const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

const Posts = () => {
  //server action'ların yüklenme durumunu yönetir
  const [isPending, startTransition] = useTransition();
  //hangi işlem ve hangi id 
  const [actionType, setActionType] = useState("");
  const [actionId, setActionId] = useState("");

  const {
    posts,
    setPosts,
    editingPost,
    startEdit: startEditInStore,
    cancelEdit: cancelEditInStore,
    deletePost: deletePostInStore,
  } = usePostStore();
  
  //form kontrolü
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(postSchema),
  });
  

  const [loading, setLoading] = useState(true);
  //postları sunucudan getir
  const fetchPosts = async () => {
    const data = await getPostsAction(); //server action
    setPosts(data.posts || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  //postu silme işlemi
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
  if (!confirmDelete) return;
    startTransition(async () => {
      setActionType("delete");
      setActionId(id);

      const result = await deletePostAction(id);
      if (result.success) {
        deletePostInStore(id);
      } else {
        console.error("Delete failed:", result.error);
      }

      setActionType("");
      setActionId("");
    });
  };
  
  //postu düzenleme moduna alma
  const startEdit = (post) => {
    startEditInStore(post);
    setValue("title", post.title);
    setValue("description", post.description);
  };
  
  //düzenleme modunu iptal et
  const cancelEdit = () => {
    cancelEditInStore();
    reset();
  };
  
  //güncelleme formu gönderildiğinde
  const onSubmit = (data) => {
    if (!editingPost) return;

    startTransition(async () => {
      setActionType("update");
      setActionId(editingPost.id);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);

      const result = await updatePostAction(editingPost.id, formData);
      if (result.success) {
        //state içindeki ilgli postu güncelle
        setPosts(
          posts.map((p) =>
            p.id === editingPost.id ? result.data : p
          )
        );
        cancelEditInStore();
        reset();
      } else {
        console.error("Update failed:", result.error);
      }

      setActionType("");
      setActionId("");
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Posts ({posts.length})</h2>

      {posts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No posts yet. Create your first post above!
        </div>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-blue-50 p-4 rounded-md">
              {editingPost?.id === post.id ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Title
                    </label>
                    <input
                      type="text"
                      {...register("title")}
                      className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                        errors.title ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Description
                    </label>
                    <input
                      type="text"
                      {...register("description")}
                      className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                        errors.description ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={isPending && actionType === "update" && actionId === post.id}
                      className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 px-3 py-1 rounded-md text-xs text-white font-semibold disabled:cursor-not-allowed"
                    >
                      {isPending && actionType === "update" && actionId === post.id
                        ? "Saving..."
                        : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded-md text-xs text-white font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <p className="font-semibold">{post.title}</p>
                  <p className="text-gray-700 break-words">{post.description}</p>
                  {post.createdAt && (
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  )}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => startEdit(post)}
                      className="bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-md text-xs text-white font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      disabled={isPending && actionType === "delete" && actionId === post.id}
                      className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 px-2 py-1 rounded-md text-xs text-white font-semibold disabled:cursor-not-allowed"
                    >
                      {isPending && actionType === "delete" && actionId === post.id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
