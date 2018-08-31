import React from 'react';
import { PulseLoader } from 'react-spinners';

const Loader = () => (

    <div className='loader'>
        <PulseLoader
            sizeUnit={"px"}
            size={20}
            color={'black'}
            // loading={this.state.loading}
        />
    </div> 
)

export default Loader;