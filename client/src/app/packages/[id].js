import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const PackageDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/categories/${id}`)
        .then((res) => setCategory(res.data))
        .catch((err) => console.error("Failed to fetch category", err));
    }
  }, [id]);

  if (!category) return <p>Loading...</p>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
      <p>{category.description}</p>
      {/* Add more data here if needed */}
    </div>
  );
};

export default PackageDetail;
