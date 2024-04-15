import React from 'react';
import LastProduct from './LastProduct';
import ListCategories from './ListCategories';

function ContentRowCenter(){
    return (
        <div className="row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastProduct />
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <ListCategories />

        </div>
    )
}

export default ContentRowCenter;