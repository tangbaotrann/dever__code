"use client";

import cheerio from "cheerio";

import { useEffect, useState } from "react";

function useParseUrlImg(contentHTML) {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    if (contentHTML) {
      const initialHtmlContent = `${contentHTML.desc}`;

      const $ = cheerio.load(initialHtmlContent);

      // get all img elements from HTML
      const imgTags = $("img");

      // Change attr value "src" for "img"
      imgTags.each((index, element) => {
        const imageUrl = contentHTML.images[index];

        // Change attr value
        $(element).attr("src", imageUrl);
      });

      // get HTML after change
      const modifiedHtmlContent = $.html();

      setHtmlContent(modifiedHtmlContent);
    }
  }, [contentHTML]);

  return htmlContent;
}

export default useParseUrlImg;
