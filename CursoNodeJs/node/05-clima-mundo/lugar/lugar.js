const axios = require('axios');

const getLugarLatLng = async(dir) => {
    const encodeUrl = encodeURI(dir);
    //console.log(encodeUrl);

    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodeUrl}`,
        timeout: 1000,
        headers: { 'X-RapidAPI-Key': 'b457158bbdmsh93641311b52ee4bp1ae194jsncb2f26e5a2c9' }
    });

    const resp = await instance.get();

    if (resp.data.Results.length === 0) {
        throw new Error(`No hay resultados para ${dir}`);
    }

    const data = resp.data.Results[0];
    const direccion = data.name;
    const lat = data.lat;
    const lng = data.lon;



    /*
    instance.get()
        .then(resp => {
            console.log(resp.data.Results[0]);
        })
        .catch(err => {
            console.log('Error!!!!', err);
        });
    */

    return {
        direccion,
        lat,
        lng
    }
}


module.exports = {
    getLugarLatLng
}