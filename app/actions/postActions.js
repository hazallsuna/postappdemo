"use server";
import { PrismaClient } from "@/app/generated/prisma";

//prisma client oluşturuluyor
const prisma = new PrismaClient();

//yeni post oluşturma
export async function createPostAction(formData) {
  const title = formData.get("title");
  const description = formData.get("description");

  //alanlar boşsa hata döndür
  if (!title || !description) {
    return { error: "Title and description are required" };
  }

  try {
    //veritabanına post ekle
    const post = await prisma.post.create({
      data: { title, description },
    });

    return { success: true, post };
  } catch (err) {
    return { error: "Failed to create post" };
  } finally {
    await prisma.$disconnect();
  }
}

//tüm postları getir
export async function getPostsAction() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return { posts };
}

//belirli postu güncelle
export async function updatePostAction(id, formData) {
  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title: formData.get("title"),
        description: formData.get("description"),
      },
    });
    return { success: true, data: post };
  } catch (e) {
    return { success: false, error: "Update failed" };
  }
}

//belirli postu sil
export async function deletePostAction(id) {
  try {
    await prisma.post.delete({ where: { id } });
    return { success: true };
  } catch (e) {
    return { success: false, error: "Delete failed" };
  }
}
