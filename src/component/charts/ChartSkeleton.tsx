const ChartSkeleton = () => (

    <div
        style={{
            width: "100%",
            height: "65vh",
            borderRadius: 12,
            background:
                "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 37%, #f0f0f0 63%)",
            backgroundSize: "400% 100%",
            animation: "shimmer 1.4s ease infinite",
        }}
    />
);

export default ChartSkeleton;
