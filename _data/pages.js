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
"&populate[sections][on][page-sections.impact-image][populate][impactpoints]=*"


  );

  const json = await res.json();
  return json.data;
};