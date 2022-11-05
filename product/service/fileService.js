import * as uuid from 'uuid';
import * as path from 'path';

class FileService {
	saveFile(picture) {
		try {
			const fileName = uuid.v4() + '.jpg';
			const filePath = path.resolve('static', fileName);
			picture.mv(filePath);
			return filePath;
		} catch (e) {
			console.log(e);
		}
	}
}

export default new FileService();
