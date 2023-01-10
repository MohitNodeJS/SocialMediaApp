import fs from "fs";
class FileUpload {
  async singleUpload(parent, args) {
    const { createReadStream, filename } = await args.file;

    const stream = createReadStream();
    const dir = process.cwd() + "/FileUpload/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const out = fs.createWriteStream(`${dir}${filename}`);
    await stream.pipe(out);
  }
}

export default new FileUpload();
