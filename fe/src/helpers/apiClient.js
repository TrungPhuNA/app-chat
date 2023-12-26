import axios from 'axios';

const axiosClient = axios.create( {
    baseURL: process.env.REACT_APP_URL_API,
    headers: {
        'Content-Type': 'application/json',
    },
} )

axiosClient.interceptors.response.use(
    async ( response ) =>
    {
        let data = response.data;
        if ( ( data && data.code === '401' ) )
        {
            localStorage.removeItem( 'access_token' );
            localStorage.removeItem( 'user' );
            window.location.href = `/`;
            console.log( 401 );
        } else if ( data.code === 'LG0403' )
        {
            localStorage.removeItem( 'access_token' );
            localStorage.removeItem( 'user' );
            window.location.href = `/`;
        }
        return response.data;
    },
    async ( error ) =>
    {
        console.log('-===================== ERRORS: ', error);
        return error
    }
);

const headers = {
    "authorization": localStorage.getItem( 'access_token' )
};


export const postMethod = ( path, data ) =>
{
    return axiosClient.post( `${ path }`, data, { headers: headers } )
        .then( response => response )
        .catch( error =>
        {
            console.log('--------------- error: ', error);
            return {
                status: 'error',
                message: 'Error create data'
            }
        } );
}

export const getMethod = async ( path, params ) =>
{
    return await axiosClient.get( `${ path }`, { headers: headers, params: params } )
        .then( response =>
        {
            return response;
        } )
        .catch( error =>
        {
            return {
                status: 'error',
                message: 'Error get data'
            }
        } );

}

export const putMethod = ( path, data ) =>
{
    return axiosClient.put( `${ path }`, data, { headers: headers } )
        .then( response => response )
        .catch( error =>
        {
            return {
                status: 'error',
                message: 'Error update data'
            }
        } );

}

export const deleteMethod = ( path ) =>
{
    return axiosClient.delete( `${ path }`, { headers: headers } )
        .then( response => response )
        .catch( error =>
        {
            return {
                status: 'error',
                message: 'Error delete data'
            }
        } );
}

export const buildFilter = ( values ) =>
{
    delete values.total;
    delete values.total_page;
    let params = {};
    if ( values )
    {
        let arrCondition = Object.entries( values );

        params = arrCondition.reduce( ( param, item ) =>
        {
            if ( item[ 1 ] != null )
            {
                param = { ...param, ...buildItemParam( item[ 0 ], item[ 1 ], param ) }
            }
            return param;
        }, {} );
    }
    return params;
}

export const buildItemParam = ( key, value, params ) =>
{
    if ( key === 'page' && !value )
    {
        params[ 'page' ] = value;
    } else if ( value )
    {
        params[ `${ key }` ] = value;
    }
    return params;
}
