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
			name: req.body.name || email,
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
	} catch ( e )
	{
		res.status( 404 )
		res.send( { message: e?.message } )
	}
};

exports.login = async ( req, res ) =>
{
	try
	{
		const email = req.body.email.toLowerCase();
		const user = await User.findOne( { email: email } );
		if ( !user ) return res.status( 200 ).json( { message: 'Tài khoản không tồn tại', status: 400 } );

		const isPasswordValid = bcrypt.compareSync( req.body.password, user.password );
		if ( !isPasswordValid )
		{
			return res.status( 200 ).json( { message: 'Mật khẩu không chính xác', status: 400 } );
		}

		const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
		const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

		const dataForAccessToken = {
			email: user.email,
		};
		const accessToken = await this.generateToken(
			dataForAccessToken,
			accessTokenSecret,
			accessTokenLife,
		);
		if ( !accessToken )
		{
			return res
				.status( 401 )
				.send( { message: 'Đăng nhập không thành công, vui lòng thử lại.' } );
		}
		const response = {
			access_token: accessToken,
			user: user
		}
		return res.status( 200 ).json( { data: response, status: 200 } );
	} catch ( e )
	{
		res.status( 404 )
		res.send( { message: e?.message } )
	}


};

exports.generateToken = async ( payload, secretSignature, tokenLife ) =>
{
	try
	{
		return await sign(
			{
				payload,
			},
			secretSignature,
			{
				algorithm: 'HS256',
				expiresIn: tokenLife,
			},
		);
	} catch ( error )
	{
		console.log( `Error in generate access token:  + ${ error }` );
		return null;
	}
};
