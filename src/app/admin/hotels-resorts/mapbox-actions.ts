'use server'

export async function fetchNearbyPlaces(latitude: number, longitude: number) {
  const token = process.env.MAPBOX_ACCESS_TOKEN
  
  if (!token) {
    throw new Error('MAPBOX_ACCESS_TOKEN is not configured in the environment variables.')
  }

  try {
    const queries = [
      { id: 'attractions', categories: 'tourist_attraction,landmark', limit: 8, keepMax: 5 },
      { id: 'nature', categories: 'waterfall,natural_feature,beach', limit: 6, keepMax: 4 },
      { id: 'historic', categories: 'historic', limit: 4, keepMax: 3 },
      { id: 'transport', categories: 'bus_station,train_station', limit: 4, keepMax: 3 },
      { id: 'food', categories: 'restaurant,cafe', limit: 8, keepMax: 5 }
    ];

    const fetchGroup = async (group: any) => {
      const url = `https://api.mapbox.com/search/searchbox/v1/category/${group.categories}?proximity=${longitude},${latitude}&limit=${group.limit}&access_token=${token}`
      try {
        const response = await fetch(url)
        if (!response.ok) return [];
        const data = await response.json();
        return data.features.map((f: any) => ({ ...f, _groupId: group.id }));
      } catch (e) {
        return [];
      }
    };

    const resultsArray = await Promise.all(queries.map(fetchGroup));
    const allFeatures = resultsArray.flat();
    
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371; // km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    }
    
    let processedPlaces = allFeatures.map((feature: any) => {
      const pLat = feature.geometry.coordinates[1];
      const pLon = feature.geometry.coordinates[0];
      
      let distKm = 0;
      if (feature.properties.distance) {
        distKm = feature.properties.distance / 1000;
      } else {
        distKm = calculateDistance(latitude, longitude, pLat, pLon);
      }

      const name = feature.properties.name || '';
      const isGeneric = name.toLowerCase().includes('tourism office') || name.toLowerCase().includes('tourismusbüro') || name.toLowerCase().includes('tourist district');

      return {
        id: feature.properties.mapbox_id || feature.id,
        name: name,
        category: (feature.properties.poi_category && feature.properties.poi_category[0]) || feature.properties.maki || 'Place',
        distance_km: parseFloat(distKm.toFixed(1)),
        latitude: pLat,
        longitude: pLon,
        isGeneric,
        groupId: feature._groupId
      }
    })
    
    // 1. Filter out generic places, empty names, and strict 20km radius limit
    processedPlaces = processedPlaces.filter((p: any) => p.distance_km <= 20.0 && !p.isGeneric && p.name.trim().length > 0)
    
    // 2. Deduplicate by normalized name
    const seenNames = new Set<string>();
    const deduplicated = [];
    for (const p of processedPlaces) {
      // Normalize name: lowercase, trim, remove special chars to catch "Red Bowl- Pan Asian" vs "Red Bowl Pan Asian"
      const normName = p.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!seenNames.has(normName)) {
        seenNames.add(normName);
        deduplicated.push(p);
      }
    }
    processedPlaces = deduplicated;

    // 3. Group by query id and take top N for each category (they are already naturally sorted by distance by Mapbox)
    const groupedResults: Record<string, any[]> = {};
    queries.forEach(q => groupedResults[q.id] = []);
    
    // Sort all by distance first to ensure we grab the closest when filling quotas
    processedPlaces.sort((a: any, b: any) => a.distance_km - b.distance_km);

    processedPlaces.forEach((p: any) => {
      if (groupedResults[p.groupId]) {
        groupedResults[p.groupId].push(p);
      }
    });

    let finalBalancedPlaces: any[] = [];
    queries.forEach(q => {
      const groupItems = groupedResults[q.id] || [];
      finalBalancedPlaces.push(...groupItems.slice(0, q.keepMax));
    });

    // 4. Final global sort by distance
    finalBalancedPlaces.sort((a: any, b: any) => a.distance_km - b.distance_km);

    return {
      success: true,
      places: finalBalancedPlaces
    }
    
  } catch (error: any) {
    console.error("Error fetching Mapbox places:", error)
    return {
      success: false,
      error: error.message || "Failed to fetch nearby places"
    }
  }
}
