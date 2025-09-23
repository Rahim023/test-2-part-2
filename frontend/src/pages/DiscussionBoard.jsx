import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../services/api";
import PostCard from "../components/PostCard";

export default function DiscussionBoard() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const [authUser, setAuthUser] = useState(storedUser);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [viewYourPosts, setViewYourPosts] = useState(false);
  const [loading, setLoading] = useState(false);

  const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  useEffect(() => {
    if (!authUser) navigate("/login");
    else fetchPosts();
  }, [authUser, navigate]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/post", { headers: authHeader() });
      setAllPosts(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error("fetchPosts error:", err);
      setLoading(false);
    }
  };

  const openModal = (message = "Done") => {
    setModalMessage(message);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 4000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthUser(null);
    navigate("/login");
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!topic.trim() || !description.trim()) return openModal("Topic & description required");

    const formData = new FormData();
    formData.append("topic", topic);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const res = await API.post("/post", formData, {
        headers: { "Content-Type": "multipart/form-data", ...authHeader() },
      });
      if (res.data) setAllPosts((prev) => [res.data, ...prev]);
      setTopic("");
      setDescription("");
      setImage(null);
      openModal("Post created successfully");
    } catch (err) {
      console.error("handlePost error:", err);
      openModal("Failed to create post");
    }
  };

  const handleLike = async (postId) => {
    if (!authUser) return openModal("Login required to like");
    const uid = (authUser.id || authUser._id)?.toString();

    setAllPosts((prev) =>
      prev.map((post) => {
        if (post._id !== postId) return post;
        const hasLiked = (post.likes || []).some((l) => (l.id || l._id)?.toString() === uid);
        return {
          ...post,
          likes: hasLiked
            ? (post.likes || []).filter((l) => (l.id || l._id)?.toString() !== uid)
            : [...(post.likes || []), { id: uid, name: authUser.name || authUser.email }],
        };
      })
    );

    try {
      await API.post(`/post/${postId}/like`, {}, { headers: authHeader() });
    } catch {
      fetchPosts();
    }
  };

  const handleComment = async (postId, text) => {
    if (!authUser) return openModal("Login required to comment");
    if (!text?.trim()) return;

    try {
      await API.post(`/post/${postId}/comment`, { text }, { headers: authHeader() });
      fetchPosts();
    } catch (err) {
      console.error("comment API error:", err);
      openModal("Failed to add comment");
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await API.delete(`/post/${postId}`, { headers: authHeader() });
      openModal("Post deleted");
      fetchPosts();
    } catch {
      openModal("Failed to delete post");
    }
  };

  if (!authUser) return null;

  const uid = (authUser.id || authUser._id)?.toString();
  const userPosts = allPosts.filter(
    (p) => (p.userId || p.user?._id || p.user?.id)?.toString() === uid
  );
  const displayPosts = viewYourPosts ? userPosts : allPosts;

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", paddingBottom: 40 }}>
      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center mb-4 px-3"
        style={{
          background: "linear-gradient(90deg, #ff6ec7, #ff0080)",
          padding: "10px 20px",
        }}
      >
        <div style={{ flex: 1, textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: "2.2rem", margin: 0 }}>Discussion Board</h2>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            color: "#fff",
            border: "1px solid #ff4d4d",
            padding: "6px 12px",
            borderRadius: "8px",
          }}
        >
          Logout
        </button>
      </div>

      <div className="container-fluid py-4">
        <div className="row gx-4">
          {/* LEFT - Create Post */}
          <div className="col-12 col-lg-4 mb-4">
            <div
              className="card shadow-sm p-3"
              style={{ backgroundColor: "#121212", color: "white", borderRadius: 12 }}
            >
              <h4 className="fw-bold mb-3 text-center">Create Post</h4>
              <form onSubmit={handlePost} className="d-flex flex-column gap-2">
                <input
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
                <textarea
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                />
                <input
                  type="file"
                  accept="image/*"
                  className="form-control bg-dark text-white border-secondary"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <button
                  className="btn mt-2"
                  style={{
                    background: "linear-gradient(90deg, #ff6ec7, #8e2de2)",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    padding: "8px 14px",
                  }}
                >
                  Post
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT - Posts */}
          <div className="col-12 col-lg-8">
            <div
              className="p-3"
              style={{ backgroundColor: "#0f0f10", color: "white", borderRadius: 12 }}
            >
              {/* Toggle */}
              <div className="d-flex justify-content-start gap-2 mb-3">
                <button
                  className="btn btn-sm"
                  onClick={() => setViewYourPosts(true)}
                  style={{
                    background: viewYourPosts
                      ? "linear-gradient(90deg, #ff6ec7, #8e2de2)"
                      : "#151515",
                    color: "white",
                    border: "none",
                    borderRadius: 999,
                    padding: "6px 14px",
                  }}
                >
                  Your Posts
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => setViewYourPosts(false)}
                  style={{
                    background: !viewYourPosts
                      ? "linear-gradient(90deg, #ff6ec7, #8e2de2)"
                      : "#151515",
                    color: "white",
                    border: "none",
                    borderRadius: 999,
                    padding: "6px 14px",
                  }}
                >
                  All Posts
                </button>
              </div>

              {/* Posts Grid */}
              {loading ? (
                <div style={{ padding: 20, color: "#bbb" }}>Loading posts...</div>
              ) : displayPosts.length === 0 ? (
                <div style={{ padding: 20, color: "#bbb" }}>No posts to show.</div>
              ) : (
                <div className="row g-3">
                  {displayPosts.map((post) => (
                    <div key={post._id} className="col-12 col-md-6 col-lg-4 d-flex">
                      <PostCard
                        post={post}
                        authUser={authUser}
                        onLike={handleLike}
                        onComment={handleComment}
                        onDelete={handleDelete}
                        isUserPost={(post.userId || post.user?._id || post.user?.id)?.toString() === uid}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
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
              zIndex: 1200,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                background: "#0d0d0d",
                color: "white",
                padding: 20,
                borderRadius: 12,
                boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
                minWidth: 280,
                maxWidth: "90%",
                textAlign: "center",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <div style={{ marginBottom: 12, fontSize: 18, fontWeight: 700 }}>
                {modalMessage}
              </div>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "6px 12px",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
