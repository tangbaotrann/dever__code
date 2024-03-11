"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

function FroalaEditorCustom({ session }) {
  const [model, setModel] = useState(() => {
    return localStorage.getItem("backUpContentBlog") || "";
  });

  // handle save image to server - handleSaveImage
  const handlePostBlog = async () => {
    const regex = /<img.*?src="(.*?)"/g;
    let match;
    const images = [];

    // Check model
    if (model === "") {
      alert("Bạn cần phải nhập thông tin để có thể đăng bài viết!");
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
        });

        setModel("");
        localStorage.setItem("backUpContentBlog", "");
        toast.success("Đăng bài thành công❤️❤️");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Đăng bài không thành công :((");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.left}>
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
          <FroalaEditorView model={model} />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      ></ToastContainer>
    </div>
  );
}

export default FroalaEditorCustom;
