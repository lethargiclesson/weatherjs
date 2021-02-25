
export default () => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      (error) => reject(new Error('Não foi possivel localizar o usuario'))
    )
  );
};

