import {buildFilter, deleteMethod, getMethod, postMethod, putMethod} from "../../helpers/apiClient";

export const ApiFeUserService = {
    async getDataList ( filters, isSet, setSearchParams )
    {
        const params = buildFilter( filters );
        if ( isSet )
        {
            setSearchParams( params )
        }
        return await getMethod( 'users', params );
    },

    async getDetailData ( id )
    {
        return await getMethod( 'users/' + id );
    }
}
