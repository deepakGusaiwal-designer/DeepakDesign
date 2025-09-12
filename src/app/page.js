"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Container,
  Grid,
  Box
} from "@mui/material";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import { Gradient } from "./Components/Common/Gradient";
import ModalStyle from "../Styles/Modal.module.css";
import BannerStyle from "../Styles/Banner.module.css";
import NewsCardsStyle from "../Styles/NewsCard.module.css";
import Logo from "../img/logo.png";
import { Modal } from "@mui/base/Modal";

import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";

import Siriwave from "react-siriwave";

const NewsSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  // const [selectedArticle, setSelectedArticle] = useState(null);
  const [news, setNews] = useState([]);
  const state = "Madhya Pradesh";
  const [visibleNewsCount, setVisibleNewsCount] = useState(6); // Number of news articles initially visible
  const [loading, setLoading] = useState(false); // Loading state for fetching more news


  const handleSpeechRecognition = async () => {
    try {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        setQuery(speechToText);
        recognition.stop();
        handleClose(); // Close the modal when recognition is completed
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        recognition.stop();
        handleClose(); // Close the modal on error
      };

      // Open the modal
      setOpen(true);
    } catch (error) {
      console.error("Speech recognition not supported", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const gradient = new Gradient();
  gradient.initGradient("#gradient-canvas");

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=6fce8809a908433da9787321ffa63616`
      );
      const data = await response.json();
      setNews(data.articles.slice(0, 20));
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          query
        )}&apiKey=6fce8809a908433da9787321ffa63616`
      );
      const data = await response.json();
      setNews(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleArticleClick = (article) => {
  //   setSelectedArticle(article);
  //   setOpen(true);
  // };

  const handleExternalLink = (url) => {
    window.open(url, "_blank");
  };

    const handleLoadMore = () => {
      setVisibleNewsCount((prevCount) => prevCount + 6); // Increase the number of visible news articles by 5
    };

  const BootstrapButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px",
    border: "1px solid",
    color: "#fff",
    lineHeight: 1.5,
    height: 54,
    minWidth: 54,
    backgroundColor: "#0063cc",
    borderColor: "#0063cc",
    borderRadius: 100,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#07679f",
      borderColor: "#07679f",
      boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  });

  const MainPrimaryButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px",
    border: "1px solid",
    color: "#fff",
    lineHeight: 1.5,
    height: 54,
    minWidth: 54,
    backgroundColor: "#0063cc",
    borderColor: "#0063cc",
    borderRadius: 100,
    // fontFamily: [
    //   "-apple-system",
    //   "BlinkMacSystemFont",
    //   '"Segoe UI"',
    //   "Roboto",
    //   '"Helvetica Neue"',
    //   "Arial",
    //   "sans-serif",
    //   '"Apple Color Emoji"',
    //   '"Segoe UI Emoji"',
    //   '"Segoe UI Symbol"',
    // ].join(","),
    "&:hover": {
      backgroundColor: "#07679f",
      borderColor: "#07679f",
      boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  });

  return (
    <>
      <div className="stripe-container">
        <div className="stripe">
          <canvas id="gradient-canvas"></canvas>
          <Box className={BannerStyle.mainContainer}>
            <Box>
              <Image
                className="Logo"
                src={Logo}
                width={200}
                height={200}
                alt="Logo"
              />
              {/* <Typography variant="h6">Listening...</Typography> */}
            </Box>
            <Box className={BannerStyle.Container}>
              <input
                className={BannerStyle.InputBanner}
                placeholder="Search for news"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <BootstrapButton
                onClick={handleSearch}
                className={BannerStyle.Button}
              >
                <SearchIcon />
              </BootstrapButton>
              <BootstrapButton
                onClick={handleSpeechRecognition}
                className={BannerStyle.Button}
              >
                <MicIcon />
              </BootstrapButton>
            </Box>
          </Box>
        </div>
      </div>
      <Container fixed className="main-container">
        {news.length > 0 && (
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="h4" className="section-title">
                News
              </Typography>
            </Grid>
            {news.slice(0, visibleNewsCount).map((article, index) => (
              <Grid item md={5} xs={12} key={index}>
                <Box key={index} className={NewsCardsStyle.newsItem}>
                  {article.urlToImage ? (
                    <img
                      height="200"
                      src={article.urlToImage}
                      alt={article.title}
                    />
                  ) : (
                    <img src="https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg" />
                    // <p>No image available</p>
                  )}
                  <Box className={NewsCardsStyle.newsContainer}>
                    <Box>
                      <Typography
                        variant="div"
                        className={NewsCardsStyle.title}
                        mb={1}
                      >
                        {article.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="p"
                      className={NewsCardsStyle.description}
                      mb={2}
                    >
                      {article.description}
                    </Typography>
                    <Box>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => handleExternalLink(article.url)}
                      >
                        Read full article
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Grid container xs={12} justifyContent="center">
                <Grid
                  item
                  mt={5}
                  xs={12}
                  justifyContent="center"
                  style={{ textAlign: "center" }}
                >
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleLoadMore}
                  >
                    Load More Articles
                  </Button>
                  {/* <BootstrapButton
                    variant="contained"
                    color="primary"
                    onClick={handleLoadMore}
                  >
                    Load More Articles
                  </BootstrapButton> */}
                </Grid>
              </Grid>
            )}
          </Grid>
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className={ModalStyle.Modal}
        >
          <div className={ModalStyle.ModalContent}>
            {/* <Siriwave style="ios9" color="#6ec3f4" /> */}
            <Typography variant="h6">Listening...</Typography>
            <Siriwave
              style="ios9"
              color="#000"
              speed="0.09"
              amplitude="0.8"
              frequency="10"
              height={100}
              speedInterpolationSpeed="5"
            />
            {/* <Siriwave style="ios9" /> */}
          </div>
        </Modal>
      </Container>
    </>
  );
};

export default NewsSearch;
