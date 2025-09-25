import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PostCard({ post, authUser, onLike, onComment, onDelete, isUserPost }) {
  const [commentText, setCommentText] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [openModal, setOpenModal] = useState(false);

  const uid = (authUser?.id || authUser?._id)?.toString();
  const hasLiked = (post.likes || []).some((l) => (l.id || l._id)?.toString() === uid);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (onLike) onLike(post._id);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete(post._id);
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      text: commentText,
      userName: authUser?.name || authUser?.email || "User",
      user: authUser,
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [...prev, newComment]);
    setCommentText("");

    if (onComment) {
      try {
        await onComment(post._id, newComment.text);
      } catch {
        setComments((prev) => prev.filter((c) => c !== newComment));
      }
    }
  };

  const imagePath = post.imageUrl || post.image || "";

  return (
    <>
      {/* Post Card */}
      <div
        onClick={(e) => {
          if (e.target.tagName !== "INPUT" && e.target.tagName !== "BUTTON") setOpenModal(true);
        }}
        className="card d-flex flex-column"
        style={{
          background: "#121212",
          color: "#fff",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.03)",
          cursor: "pointer",
          height: 400,
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.boxShadow = "0 8px 25px rgba(255,0,128,0.6), 0 8px 25px rgba(142,45,226,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div style={{ height: 6, background: "linear-gradient(135deg,#ff4da6,#ff0080)" }} />

        {imagePath && (
          <img
            src={imagePath.startsWith("http") ? imagePath : `http://localhost:5000/uploads/${imagePath}`}
            alt="post"
            style={{ width: "100%", height: 150, objectFit: "cover" }}
          />
        )}

        <div className="p-3 d-flex flex-column" style={{ flex: 1, justifyContent: "space-between" }}>
          <div>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-start" style={{ gap: 8 }}>
              <div>
                <h5
                  style={{
                    margin: 0,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {post.topic}
                </h5>
                <small style={{ color: "#bbb" }}>By {post.user?.name || post.userName || "Unknown"}</small>
              </div>
              {isUserPost && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteClick(e); }}
                  title="Delete post"
                  style={{
                    background: "rgba(230,57,70,0.12)",
                    color: "#ff6b6b",
                    border: "none",
                    padding: "6px 8px",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              )}
            </div>

            {/* Description */}
            <p
              style={{
                color: "#ddd",
                marginTop: 6,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 5,
                WebkitBoxOrient: "vertical",
              }}
            >
              {post.description}
            </p>
          </div>

          {/* Like & Comment Row */}
          <div className="d-flex align-items-center" style={{ gap: 8 }}>
            {/* Like Button 30% */}
            <button
              onClick={(e) => { e.stopPropagation(); handleLikeClick(e); }}
              style={{
                width: "30%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "6px 0",
                borderRadius: 999,
                background: hasLiked ? "linear-gradient(90deg,#ff6ec7,#8e2de2)" : "transparent",
                color: "#fff",
                border: hasLiked ? "none" : "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              {hasLiked ? "❤️" : "🤍"} {post.likes?.length || 0}
            </button>

            {/* Comment Button 70% */}
            <button
              onClick={(e) => { e.stopPropagation(); setShowCommentInput((prev) => !prev); }}
              style={{
                width: "70%",
                textAlign: "center",
                padding: "6px 10px",
                borderRadius: 999,
                background: "#1a1a1a",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer",
              }}
            >
              Comments ({comments.length})
            </button>
          </div>

          {/* Comment Input */}
          {showCommentInput && (
            <form onSubmit={submitComment} style={{ marginTop: 8, display: "flex", gap: 6 }}>
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                style={{
                  flex: 1,
                  borderRadius: 6,
                  border: "1px solid #444",
                  padding: "6px 10px",
                  background: "#1a1a1a",
                  color: "#fff",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: "none",
                  background: "linear-gradient(90deg,#ff6ec7,#8e2de2)",
                  color: "#fff",
                }}
              >
                Send
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1500,
              background: "rgba(0,0,0,0.7)",
            }}
            onClick={() => setOpenModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "#121212",
                borderRadius: 12,
                padding: 20,
                width: "90%",
                maxWidth: 700,
                color: "#fff",
                maxHeight: "90vh",
                overflowY: "auto",
              }}
            >
              <h4 style={{ fontWeight: 700 }}>{post.topic}</h4>
              <small style={{ color: "#bbb" }}>By {post.user?.name || post.userName || "Unknown"}</small>
              {imagePath && (
                <img
                  src={imagePath.startsWith("http") ? imagePath : `http://localhost:5000/uploads/${imagePath}`}
                  alt="post"
                  style={{ width: "100%", maxHeight: 300, objectFit: "cover", borderRadius: 8, marginTop: 12 }}
                />
              )}
              <p style={{ marginTop: 12, color: "#ddd" }}>{post.description}</p>

              {/* Likes List */}
              <div style={{ marginTop: 15 }}>
                <h6 style={{ color: "#ff8ccf" }}>Liked by:</h6>
                {post.likes && post.likes.length > 0 ? (
                  post.likes.map((l, idx) => (
                    <div key={idx} style={{ marginBottom: 4 }}>
                      <strong style={{ color: "#ddd" }}>
                        {l.name || l.userName || l.email || "User"}
                      </strong>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#aaa" }}>No likes yet.</p>
                )}
              </div>

              {/* Comments List */}
              <div style={{ marginTop: 15, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 10, maxHeight: 300, overflowY: "auto" }}>
                <h6 style={{ color: "#ff8ccf" }}>Comments:</h6>
                {comments.length > 0 ? (
                  comments.map((c, idx) => (
                    <div key={idx} style={{ marginBottom: 6 }}>
                      <strong style={{ color: "#ff8ccf" }}>{c.userName || c.user?.name || "User"}</strong>
                      <span style={{ color: "#ddd" }}> : {c.text}</span>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "#aaa" }}>No comments yet.</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
