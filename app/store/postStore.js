import { create } from 'zustand';

//global post state yöneten store tanımı
const usePostStore = create((set) => ({
  //tüm postları tutan state
  posts: [],
  //düzenlenen post bilgisi
  editingPost: null,

  //post listesini doğrudan güncellemek için set
  setPosts: (posts) => set({ posts }),
  
  //yeni post ekler mevcut listeye
  addPost: (newPost) =>
    set((state) => ({
      posts: [...state.posts, newPost],
    })),

  //post silmek için,idye göre filtrele
  deletePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    })),
  
  //düzenlenmeye başlanılan postu state al
  startEdit: (post) => set({ editingPost: post }),
  
  //düzenleme işlemini iptal et
  cancelEdit: () => set({ editingPost: null }),
}));


export default usePostStore;
