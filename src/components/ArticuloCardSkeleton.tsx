// src/components/ArticuloCardSkeleton.tsx
export function ArticuloCardSkeleton() {
  return (
    <div className="col-md-6 col-lg-6">
      <div className="post-card">
        <div
          className="post-card__image-wrapper"
          style={{
            height: "220px",
            background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.4s infinite",
          }}
        />
        <div className="post-card__body">
          <div style={{ height: "16px", width: "40%", borderRadius: "6px", background: "#e0e0e0", marginBottom: "12px" }} />
          <div style={{ height: "20px", width: "90%", borderRadius: "6px", background: "#e0e0e0", marginBottom: "8px" }} />
          <div style={{ height: "20px", width: "70%", borderRadius: "6px", background: "#e0e0e0", marginBottom: "16px" }} />
          <div style={{ height: "14px", width: "60%", borderRadius: "6px", background: "#e0e0e0", marginBottom: "12px" }} />
          <div style={{ height: "14px", width: "100%", borderRadius: "6px", background: "#e0e0e0", marginBottom: "6px" }} />
          <div style={{ height: "14px", width: "80%", borderRadius: "6px", background: "#e0e0e0" }} />
        </div>
      </div>
    </div>
  )
}