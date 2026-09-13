'use server'

export async function fetchNearbyPlaces(latitude: number, longitude: number) {
  const token = process.env.MAPBOX_ACCESS_TOKEN
  
  if (!token) {
    throw new Error('MAPBOX_ACCESS_TOKEN is not configured in the environment variables.')
  }

  // Search for famous places and attractions
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/tourism.json?proximity=${longitude},${latitude}&limit=10&access_token=${token}`
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Mapbox API error: ${response.statusText}`)
    }
    
    const data = await response.json()
    
    // Process and simplify the results
    const places = data.features.map((feature: any) => {
      // Basic distance calculation is possible, but Mapbox returns a distance property if proximity is used
      // Mapbox Geocoding returns it in meters in some endpoints, but let's just grab the basic info
      return {
        id: feature.id,
        name: feature.text,
        category: feature.properties.category || feature.place_type[0] || 'Place',
        // In Geocoding v5, distance from proximity point is provided in meters if proximity is passed
        distance_meters: feature.properties.distance || null,
        latitude: feature.center[1],
        longitude: feature.center[0],
      }
    })
    
    // If distance_meters is missing, we can optionally calculate it here using haversine
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371; // km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c; // returns km
    }
    
    const processedPlaces = places.map((p: any) => {
      if (!p.distance_meters) {
        p.distance_km = calculateDistance(latitude, longitude, p.latitude, p.longitude).toFixed(1)
      } else {
        p.distance_km = (p.distance_meters / 1000).toFixed(1)
      }
      return p
    })
    
    // Sort by distance
    processedPlaces.sort((a: any, b: any) => parseFloat(a.distance_km) - parseFloat(b.distance_km))

    return {
      success: true,
      places: processedPlaces
    }
    
  } catch (error: any) {
    console.error("Error fetching Mapbox places:", error)
    return {
      success: false,
      error: error.message || "Failed to fetch nearby places"
    }
  }
}
