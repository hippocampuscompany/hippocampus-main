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
  "&populate[sections][on][page-sections.timeline][populate][timelineItems][populate]=image"
);
  const json = await res.json();
  return json.data;
};