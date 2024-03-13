"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import FroalaEditor from "react-froala-wysiwyg";

// Css
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
// Load all plugins
import "froala-editor/js/plugins.pkgd.min.js";

// Preview
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

import styles from "./FroalaEditorCustom.module.css";
import { storage } from "@/utils/firebase";
import BlogPostForm from "../BlogPostForm/BlogPostForm";
import { saveBlog } from "@/lib/blog/action";
import BlogPostTitle from "../BlogPostTitle/BlogPostTitle";
import useDebounce from "@/hooks/useDebounce/useDebounce";
import ToastMessage from "@/components/ToastMessage/ToastMessage";
import { routes } from "@/routes";

function FroalaEditorCustom({ session }) {
  const [model, setModel] = useState(() => {
    return localStorage.getItem("backUpContentBlog") || "";
  });
  const [title, setTitle] = useState("");
  const debounceValueTitle = useDebounce(title, 600);

  const router = useRouter();

  // handle save image to server - handleSaveImage
  const handlePostBlog = async () => {
    const regex = /<img.*?src="(.*?)"/g;
    let match;
    const images = [];

    // Check title
    if (!debounceValueTitle) {
      toast.error("Bạn cần nhập tiêu đề cho bài viết!");
      return;
    }

    // Check model
    if (model === "") {
      toast.error("Bạn cần phải nhập thông tin để có thể đăng bài viết!");
      return;
    }

    while ((match = regex.exec(model)) !== null) {
      images.push(match[1]);
    }

    // save images to storage of firebase
    const uploadPromises = images.map(async (image, index) => {
      const storageRef = ref(storage, `images/image_${Date.now()}_${index}`);

      try {
        const response = await fetch(image);
        const blob = await response.blob();
        await uploadBytes(storageRef, blob);
        const imageUrl = await getDownloadURL(storageRef);

        return imageUrl; // arrays
      } catch (error) {
        console.error("Error uploading image:", error);
        return null;
      }
    });

    // save to database
    Promise.all(uploadPromises)
      .then((imageUrls) => {
        saveBlog({
          model: model,
          listUrlImageFirebase: imageUrls,
          userId: session.user.id,
          title: debounceValueTitle,
        });

        setModel("");
        setTitle("");
        localStorage.setItem("backUpContentBlog", "");
        router.push(routes.BLOG_URL);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Đăng bài không thành công :((");
      });
  };

  // handle change title blog post
  const handleChangeTitleBlog = (e) => {
    const value = e.target.value;

    setTitle(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.left}>
          <BlogPostTitle onChange={handleChangeTitleBlog} />

          <FroalaEditor
            model={model}
            onModelChange={(e) => setModel(e)}
            config={{
              placeholderText: "Viết blog ngay ở đây...",
              charCounter: true,
              saveInterval: 2000,
              events: {
                // save
                "save.before": (html) => {
                  return localStorage.setItem("backUpContentBlog", html);
                },
              },
            }}
            tag="textarea"
          />

          <BlogPostForm handlePostBlog={handlePostBlog} />
        </div>

        <div className={styles.right}>
          <h1 className={styles.right__title_blog}>
            {debounceValueTitle ? debounceValueTitle : ""}
          </h1>
          <FroalaEditorView model={model} />
        </div>
      </div>

      <ToastMessage />
    </div>
  );
}

export default FroalaEditorCustom;
