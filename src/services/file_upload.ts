import fs from 'fs'
class FileUpload{
   async singleUpload(parent,args){
   
    // console.log(args)
    // console.log("hhhh")
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

export default new FileUpload