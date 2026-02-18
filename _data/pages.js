module.exports = async () => {
const res = await fetch(
  "http://localhost:1337/api/pages?" +
  "filters[site][slug][$eq]=hippocampus-main" +
  "&populate[sections][on][page-sections.hero][populate]=*" +
  "&populate[sections][on][page-sections.about-impact][populate]=*" +
  "&populate[sections][on][page-sections.core-tenets][populate]=*" +
  "&populate[sections][on][page-sections.kbc-approach][populate]=*" +
  "&populate[sections][on][page-sections.kbc-slider][populate]=*" +
  "&populate[sections][on][page-sections.team-section][populate][members][populate]=image" +
 "&populate[sections][on][page-sections.timeline][populate][timelineItems][populate]=image" +
  "&populate[sections][on][page-sections.investor-section][populate][investors][populate]=image" +
  "&populate[sections][on][page-sections.home-kbc][populate]=image" +
 "&populate[sections][on][page-sections.home-slide][populate][slides][populate]=image" +
  "&populate[sections][on][page-sections.school-slider][populate][schools][populate]=image"+
  "&populate[sections][on][page-sections.stats-section][populate][stats][populate]=icon" +
"&populate[sections][on][page-sections.home-gallery][populate][galleries][populate]=image" +
"&populate[sections][on][page-sections.media-slider][populate][clientlogo][populate]=image" +
"&populate[sections][on][page-sections.impact-image][populate][impactpoints]=*" +
"&populate[sections][on][page-sections.cta-section][populate]=*" +
"&populate[sections][on][page-sections.testimonial-slider][populate][testimonials][populate]=images" +
"&populate[sections][on][page-sections.wall-of-dreams-hero][populate]=image" +
"&populate[sections][on][page-sections.gallery-section][populate][galleryItem][populate]=image" +
"&populate[sections][on][page-sections.gallery-section][populate][program]=*" +
"&populate[sections][on][page-sections.gallery-section][populate][school]=*"

);
  const json = await res.json();
  console.log(
  json.data.map(p => p.slug)
);
  // Find hippocampus-main page
const page = json.data.find(
  p => p.slug === "wall-of-dreams"
);

if (!page) {
  console.log("Page not found");
} else {
  console.log("Found Page:", page.title);

  const gallerySection = page.sections.find(
    s => s.__component === "page-sections.gallery-section"
  );

  console.log("Gallery Section:", gallerySection);
}
  return json.data;
};