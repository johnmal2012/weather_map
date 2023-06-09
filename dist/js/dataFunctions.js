// const WEATHER_API_KEY = 'd096581b92355f3f307cf6af978a57fe';

export const setLocationObject = (locationObj, coordsObj) => {
  const { lat, lon, name, unit } = coordsObj;
  locationObj.setLat(lat);
  locationObj.setLon(lon);
  locationObj.setName(name);
  if (unit) {
    locationObj.setUnit(unit);
  }
};

export const getHomeLocation = () => {
  return localStorage.getItem('defaultWeatherLocation');
};

export const getWeatherFromCoords = async (locationObj) => {
  //   const lat = locationObj.getLat();
  //   const lon = locationObj.getLon();
  //   const units = locationObj.getUnit();
  //   const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${WEATHER_API_KEY}`;
  //   // there is no direct input from user, so no need to encodeURI
  //   // as we programmatically call API
  //   try {
  //     const weatherStream = await fetch(url);
  //     const weatherJson = await weatherStream.json();
  //     console.log('weatherJson from API: ', weatherJson);
  //     return weatherJson;
  //   } catch (err) {
  //     console.error(err);
  //   }

  // serverless funnction
  const urlDataObj = {
    lat: locationObj.getLat(),
    lon: locationObj.getLon(),
    units: locationObj.getUnit(),
  };
  try {
    const weatherStream = await fetch('./.netlify/functions/get_weather', {
      method: 'POST',
      body: JSON.stringify(urlDataObj),
    });
    const weatherJson = await weatherStream.json();
    return weatherJson;
  } catch (err) {
    console.error(err);
  }
};

export const getCoordsFromApi = async (entryText, units) => {
  //   const regex = /^\d+$/g; // zip code
  //   const flag = regex.test(entryText) ? 'zip' : 'q';
  //   const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&units=${units}&appid=${WEATHER_API_KEY}`;
  //   const encodedUrl = encodeURI(url);
  //   try {
  //     const dataStream = await fetch(encodedUrl);
  //     const jsonData = await dataStream.json();
  //     console.log('jsonData from API: ', jsonData);
  //     return jsonData;
  //   } catch (err) {
  //     console.error(err.stack);
  //   }

  // serverless funnction
  const urlDataObj = {
    text: entryText,
    units: units,
  };
  try {
    const dataStream = await fetch('./.netlify/functions/get_coords', {
      method: 'POST',
      body: JSON.stringify(urlDataObj),
    });
    const jsonData = await dataStream.json();
    return jsonData;
  } catch (err) {
    console.error(err);
  }
};

export const cleanText = (text) => {
  const regex = / {2,}/g;
  // remove space with more than 2 and replaced by 1 space within text;
  // then trim() to remove front and end
  const entryText = text.replaceAll(regex, ' ').trim();
  return entryText;
};
