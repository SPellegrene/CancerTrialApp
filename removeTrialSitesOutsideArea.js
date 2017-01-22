import geolib from 'geolib';

// Usage: Find sites within 100 miles of Maryland
//
// removeTrialSitesOutsideArea(response.data.trials, {
//   latitude: 39.1292,
//   longitude: -77.2953,
//   radius: 100000
// }));

// The request above gets any trials with at least one sites within the geo range.
export default function removeTrialSitesOutsideArea(trialsNearbyWithAllSites, geoOptions) {

  // Loop through all trials, we need to remove sites that aren't nearby
  let trialsNearby = trialsNearbyWithAllSites.reduce((a, trial) => {

    // Loop through all sites on each trial
    let sites = trial.sites.filter((site) => {

      // Make sure we have coordinates to work with
      if(site.org_coordinates && site.org_coordinates.lat && site.org_coordinates.lon) {

        // We have coordiates so check them for distance from the user
        return (
          geolib.isPointInCircle(
            { latitude: site.org_coordinates.lat, longitude: site.org_coordinates.lon },
            { latitude: geoOptions.latitude, longitude: geoOptions.longitude },
            geoOptions.radius // 5 kilometers
          )
        );
      } else {
        // We don't have coordinates to check so filter out the location
        return false
      }
    });

    // Only keep the trial if there are still sites
    if(sites && sites.length > 0) {
      return a.concat(sites);
    } else {
      return a;
    }

  }, []);

  return trialsNearby;
}
