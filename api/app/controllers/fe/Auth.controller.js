const User = require( "./../../models/User.model" ) // new
const bcrypt = require( 'bcryptjs' );

const jwt = require( 'jsonwebtoken' );
const promisify = require( 'util' ).promisify;

const sign = promisify( jwt.sign ).bind( jwt );
const verify = promisify( jwt.verify ).bind( jwt );

exports.register = async ( req, res ) =>
{
    try
    {
        console.log( '----------- req: ', req.body );
        const email = req.body.email.toLowerCase();
        const checkUser = await User.findOne( { email: email } );
        if ( checkUser ) return res.status( 200 ).json( { message: 'Email này đã được sử dụng', status: 400 } );

        const hashPassword = bcrypt.hashSync( req.body.password, 12 );
        console.log( '---------- hasPassword', hashPassword );
        const user = new User( {
            email: email,
            password: hashPassword,
            name: req.body.name,
            age: req.body.age,
            sex: req.body.sex,
            birthday: req.body.birthday,
            phone: req.body.phone,
            avatar: req.body.avatar,
        } );

        console.log( '----------- user: ', user );

        await user.save();

        console.log( '--------- user: ', user );

        return res.status( 200 ).json( { data: user, status: 200 } );
    } catch (e){
        res.status( 404 )
        res.send( { message: e?.message } )
    }
};
