"use client";

import { useEffect, useState } from "react";
import cheerio from "cheerio";

function BlogId({ post }) {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const initialHtmlContent = `${post.desc}`;

    const $ = cheerio.load(initialHtmlContent);

    // get all img elements from HTML
    const imgTags = $("img");

    // Change attr value "src" for "img"
    imgTags.each((index, element) => {
      const imageUrl = post.images[index];

      // Change attr value
      $(element).attr("src", imageUrl);
    });

    // get HTML after change
    const modifiedHtmlContent = $.html();

    setHtmlContent(modifiedHtmlContent);
  }, [post]);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default BlogId;
