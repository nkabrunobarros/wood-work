import React, { useState } from 'react';
import LeftOversScreen from '../../components/pages/leftovers/leftovers';
import Loader from '../../components/loader/loader';

const LeftOvers = () => {

    const [loaded, setLoaded] = useState(true);
    // useEffect(() => {
    //     async function test() {


    //         const axios = require('axios');

    //         const config = {
    //             method: 'get',
    //             url: 'http://193.136.195.33:1026/ngsi-ld/v1/entities?type=Part&q=belongsTo=="urn:ngsi-ld:Project:MC_MUEBLETV_A"&options=sysAttrs&options=keyValues&q=sort=="Painel"',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Link': '<https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld>;type="application/ld+json"',
    //                 'Fiware-Service': 'woodwork40'
    //             }
    //         };

    //         axios(config)
    //             .then(function (response) {
    //                 console.log(JSON.stringify(response.data));
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });



    //     }

    //     test();
    // }, []);

    if (loaded) return <LeftOversScreen />;
    else return <Loader center={true} />;
};

export default LeftOvers;
