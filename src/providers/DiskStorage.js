const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload")

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename( //renomear o local do arquivo
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    );

    return file;
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);

    try {
      await fs.promises.stat(filePath)
    } catch {
      return;
    }

    await fs.promises.unlink(filePath) //Para deletar o arquivo
  }
}

module.exports = DiskStorage