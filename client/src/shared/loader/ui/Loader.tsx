import React from 'react';
import '../style/loader.css'

const Loader = () => {
    return (
        <div className='w-full h-[50dvh] flex justify-center p-2 fixed'>
            <span className="loader2"></span>
            {/*<span className='loaderCircle h-[50%] w-[50%]'></span>*/}
        </div>

    );
};

export default Loader;