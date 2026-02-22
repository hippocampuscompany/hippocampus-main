const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

module.exports = async function () {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/blogs?populate[featuredImage]=true&populate[author][populate]=profileImage&populate[categories]=true&populate[tags]=true&sort=blogPublishedAt:desc`
    );

    const json = await res.json();
    console.log(json.data)
  // Return only actual entries
  return json.data;

  } catch (err) {
    console.error("❌ Blog fetch error:", err);
    return [];
  }
};