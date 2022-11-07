import jwt from 'jsonwebtoken';
import Token from '../modules/Token.js';

class TokenService {
	getTokens(payload) {
		const accesToken = jwt.sign(payload, process.env.SECRET_ACCES, {
			expiresIn: '10s',
		});
		const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH, {
			expiresIn: '20s',
		});

		return {
			accesToken,
			refreshToken,
		};
	}

	async saveToken(userId, refresh, role) {
		const tokenInfo = await Token.findOne({ user: userId });

		if (tokenInfo) {
			tokenInfo.refresh = refresh;
			return tokenInfo.save();
		}
		const userRefresh = await Token.create({ user: userId, refresh, role });

		return userRefresh;
	}

	checkRefresh(refresh) {
		try {
			const refreshToken = jwt.verify(
				refresh,
				process.env.SECRET_REFRESH
			);
			return refreshToken;
		} catch (e) {
			return null;
		}
	}

	checkAcces(acces) {
		try {
			const accesToken = jwt.verify(acces, process.env.SECRET_ACCES);
			return accesToken;
		} catch (e) {
			return null;
		}
	}

	async removeToken(refresh) {
		const refreshToken = await Token.deleteOne({ refresh });
		return refreshToken;
	}

	async findToken(refresh) {
		const refreshToken = await Token.findOne({ refresh });
		return refreshToken;
	}
}

export default new TokenService();
