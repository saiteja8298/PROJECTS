const calculateAvgRating = (reviews) => {
  const totalRating = reviews?.reduce((sum, review) => sum + review.rating, 0) || 0;
  const avgRating = reviews?.length ? (totalRating / reviews.length).toFixed(1) : 0;
  return { totalRating, avgRating };
};

export default calculateAvgRating;
