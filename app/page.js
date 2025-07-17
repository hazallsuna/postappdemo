import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-4">
      <div className="flex flex-col space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Post Management App</h1>
          <p className="text-gray-600">Create, edit, and manage your posts with ease</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
          <CreatePost />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <Posts />
        </div>
      </div>
    </div>
  );
}
