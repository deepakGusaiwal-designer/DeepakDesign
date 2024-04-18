import React, { useState } from "react";
import { Modal } from "@mui/base/Modal";

function NewsModal() {
  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${state}&apiKey=6fce8809a908433da9787321ffa63616`
      );
      const data = await response.json();
      setNews(data.articles.slice(0, 20));
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modal-container">
          {selectedArticle && (
            <div>
              <h3>{selectedArticle.title}</h3>
              <p>{selectedArticle.content}</p>
              {selectedArticle.urlToImage && (
                <img
                  src={selectedArticle.urlToImage}
                  alt={selectedArticle.title}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              )}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default NewsModal;
