import {buildFilter, deleteMethod, getMethod, postMethod, putMethod} from "../../helpers/apiClient";

export const ApiFeRoomService = {
    async getDataList ( filters, isSet, setSearchParams )
    {
        const params = buildFilter( filters );
        if ( isSet )
        {
            setSearchParams( params )
        }
        return await getMethod( 'rooms', params );
    },

    async getListMessage ( roomID, filters )
    {
        return await getMethod( `rooms/message/${roomID}`, filters );
    },

    async createChat (roomID, data )
    {
        return await postMethod( `rooms/message/${roomID}`, data);
    },

    async create ( data )
    {
        return await postMethod( 'rooms/add', data);
    }
}
