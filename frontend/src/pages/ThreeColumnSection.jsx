import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

export default function ThreeColumnSection() {
  const items = [
    {
      title: "Column 1",
      description: "Explore the beauty of nature with our unique experiences.",
      img: "https://source.unsplash.com/random/400x300?sig=1",
    },
    {
      title: "Column 2",
      description: "Discover hidden gems and make your adventures memorable.",
      img: "https://source.unsplash.com/random/400x300?sig=2",
    },
    {
      title: "Column 3",
      description: "Join our community and share your favorite memories.",
      img: "https://source.unsplash.com/random/400x300?sig=3",
    },
  ];

  const [selectedItem, setSelectedItem] = useState(null);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 25px rgba(255,110,199,0.7), 0 0 50px rgba(142,45,226,0.5)",
    },
  };

  const popupVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 700, damping: 20 } },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", paddingTop: 40, paddingBottom: 40 }}>
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-5"
        style={{
          color: "#fff",
          textShadow: "2px 2px 12px rgba(255,255,255,0.4)",
          fontWeight: "700",
          fontSize: "3rem",
        }}
      >
        Three Column Section
      </motion.h1>

      <Container>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Row>
            {items.map((item, idx) => (
              <Col key={idx} xs={12} md={6} lg={4} className="mb-4">
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                  onClick={() => setSelectedItem(item)}
                  style={{ cursor: "pointer" }}
                >
                  <Card
                    style={{
                      borderRadius: 16,
                      overflow: "hidden",
                      border: "3px solid",
                      borderImage: "linear-gradient(90deg, #ff6ec7, #8e2de2) 1",
                      backgroundColor: "#1a1a1a",
                      color: "#fff",
                    }}
                  >
                    <div
                      style={{
                        background: "linear-gradient(90deg, #ff6ec7, #8e2de2)",
                        padding: "6px 0",
                        textAlign: "center",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                      }}
                    >
                      {item.title}
                    </div>
                    <Card.Img variant="top" src={item.img} />
                    <Card.Body style={{ backgroundColor: "#1a1a1a", color: "#fff" }}>
                      <Card.Text>{item.description}</Card.Text>
                      <Button
                        style={{
                          background: "linear-gradient(90deg, #ff6ec7, #8e2de2)",
                          border: "none",
                          color: "#fff",
                          fontWeight: "600",
                        }}
                        onClick={() => setSelectedItem(item)}
                      >
                        View More
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>

      {/* Popup Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: "rgba(0,0,0,0.8)", zIndex: 1050 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-white text-center p-4 rounded-4"
              style={{
                background: "linear-gradient(90deg, #ff6ec7, #8e2de2)",
                minWidth: "300px",
                maxWidth: "90%",
              }}
            >
              <h2 className="mb-3">{selectedItem.title}</h2>
              <img
                src={selectedItem.img}
                alt={selectedItem.title}
                className="img-fluid rounded mb-3"
              />
              <p>{selectedItem.description}</p>
              <Button variant="dark" onClick={() => setSelectedItem(null)}>
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
