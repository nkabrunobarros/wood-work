import React from 'react';
import Loader from '../../components/loader/loader';
import LeftOversScreen from '../../components/pages/leftovers/leftovers';

const LeftOvers = () => {
    const loaded = true;

    const parts = [
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'AG L Biscuit Nude 36W 10', comp: 400, larg: 338.5, esp: 16 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'AG L Biscuit Nude 36W 10', comp: 400, larg: 338.5, esp: 16 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'AG L Biscuit Nude 36W 16', comp: 326.5, larg: 184.5, esp: 16 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'AG L Biscuit Nude 36W 16', comp: 326.5, larg: 184.5, esp: 16 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'AG L Biscuit Nude 36W 16', comp: 406, larg: 207, esp: 16 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'AG L Biscuit Nude 36W 16', comp: 406, larg: 207, esp: 16 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'AG L Biscuit Nude 36W 16', comp: 326.5, larg: 184.5, esp: 16 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'AG L Biscuit Nude 36W 16', comp: 326.5, larg: 184.5, esp: 16 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'AG L Biscuit Nude 36W 16', comp: 406, larg: 207, esp: 16 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'AG L Biscuit Nude 36W 16', comp: 406, larg: 207, esp: 16 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'AG L Marmol Hades 19 CNC', comp: 2400, larg: 926, esp: 19 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'HDF 19 ', comp: 540, larg: 70, esp: 19 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'HDF 19 ', comp: 940, larg: 70, esp: 19 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'HDF 19 ', comp: 540, larg: 70, esp: 19 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'MDF Folheado Carv 19', comp: 2394, larg: 560, esp: 19 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'MDF Folheado Carv 19 CNC', comp: 2400, larg: 566, esp: 19 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'MDF Folheado Carv 19 CNC', comp: 1716, larg: 466, esp: 19 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'MDF Folheado Carv 19 CNC', comp: 268, larg: 444, esp: 19 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'MDF Folheado Carv 19 CNC', comp: 268, larg: 444, esp: 19 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'MDF Folheado Carv 19 CNC', comp: 1678, larg: 444, esp: 19 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'MDF Folheado Carv 19 CNC', comp: 400, larg: 283, esp: 19 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'MDF Folheado Carv 19 CNC', comp: 400, larg: 283, esp: 19 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'MDF Folheado Carv 19 CNC', comp: 444, larg: 287, esp: 19 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'MDF Folheado Carv 19 CNC', comp: 444, larg: 287, esp: 19 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'MDF Folheado Carv 19 CNC', comp: 924, larg: 283, esp: 19 },
        { image: 'https://images.unsplash.com/photo-1591195853095-f1681b00e29c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d29vZCUyMHBsYW5rfGVufDB8fDB8fA%3D%3D&w=1000&q=80', material: 'MDF Folheado Carv 19 CNC', comp: 907, larg: 76, esp: 19 },
    ];

    const props = {
        parts
    };

    if (loaded) return <LeftOversScreen {...props} />;

    return <Loader center={true} />;
};

export default LeftOvers;
