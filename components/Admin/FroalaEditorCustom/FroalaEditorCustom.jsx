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
import { saveBlog, updateBlog } from "@/lib/blog/action";
import BlogPostTitle from "../BlogPostTitle/BlogPostTitle";
import useDebounce from "@/hooks/useDebounce/useDebounce";
import ToastMessage from "@/components/ToastMessage/ToastMessage";
import { routes } from "@/routes";
import useParseUrlImg from "@/hooks/useParseUrlImg/useParseUrlImg";

function FroalaEditorCustom({ session, postUpdateId }) {
  const [model, setModel] = useState(() => {
    return localStorage.getItem("backUpContentBlog") || "";
  });
  const [title, setTitle] = useState(postUpdateId?.title || "");
  const [htmlContentUpdate, setHtmlContentUpdate] = useState("");

  const debounceValueTitle = useDebounce(title, 600);

  const router = useRouter();

  //handle update blog post
  const htmlContent = useParseUrlImg(postUpdateId);

  // handle save image to server - handleSaveImage
  const handlePostBlog = async () => {
    const regex = /<img.*?src="(.*?)"/g;
    let match;
    const images = [];
    const desc = htmlContentUpdate
      ? htmlContentUpdate
      : htmlContent
      ? htmlContent
      : model;

    // Check title
    if (!debounceValueTitle) {
      toast.error("Bạn cần nhập tiêu đề cho bài viết!");
      return;
    }

    // find regex (only elements <img />)
    while ((match = regex.exec(desc)) !== null) {
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
        if (postUpdateId) {
          // check model
          if (htmlContentUpdate === "") {
            toast.error("Bạn cần phải nhập thông tin để cập nhật bài viết!");
            return;
          }

          // filter option image when update blog (img !null)
          const isOptionImage = imageUrls.filter((url) => url);

          const listImages = [...postUpdateId.images, ...isOptionImage];

          updateBlog({
            _id: postUpdateId._id,
            model: htmlContentUpdate ? htmlContentUpdate : htmlContent,
            listUrlImageFirebase: listImages,
            title: debounceValueTitle,
          });
        } else {
          // Check model
          if (model === "") {
            toast.error("Bạn cần phải nhập thông tin để đăng bài viết!");
            return;
          }

          saveBlog({
            model: model,
            listUrlImageFirebase: imageUrls,
            userId: session.user.id,
            title: debounceValueTitle,
          });
        }

        setModel("");
        setTitle("");
        setHtmlContentUpdate("");
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

  // handle change write blog post
  const handleChangeWriteBlog = (e) => {
    postUpdateId ? setHtmlContentUpdate(e) : setModel(e);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.left}>
          <BlogPostTitle
            onChange={handleChangeTitleBlog}
            postUpdateId={postUpdateId}
          />

          <FroalaEditor
            model={
              htmlContentUpdate
                ? htmlContentUpdate
                : htmlContent
                ? htmlContent
                : model
            }
            onModelChange={(e) => handleChangeWriteBlog(e)}
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

          <BlogPostForm
            handlePostBlog={handlePostBlog}
            postUpdateId={postUpdateId}
          />
        </div>

        <div className={styles.right}>
          <h1 className={styles.right__title_blog}>
            {debounceValueTitle ? debounceValueTitle : ""}
          </h1>
          <FroalaEditorView
            model={
              htmlContentUpdate
                ? htmlContentUpdate
                : htmlContent
                ? htmlContent
                : model
            }
          />
        </div>
      </div>

      <ToastMessage />
    </div>
  );
}

export default FroalaEditorCustom;
