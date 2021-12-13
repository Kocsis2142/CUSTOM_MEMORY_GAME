import { v4 as uuidv4 } from 'uuid';

export const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = res => {
        resolve(res.target.result);
      };
      reader.onerror = err => reject(err);
      reader.readAsDataURL(file);
    });
  }

export const readImgFile = async (file, actualArray, arraySetter) => {
    let input = file.target
    let array = Object.values(input.files)
    let jsArray = []
    await Promise.all(array.map( async (arr, i) => {
      let obj = {id: uuidv4(), imageFile: await readFile(arr), cardTurned: false, success: false}
      if (actualArray.filter(act => act.imageFile === obj.imageFile).length === 0) jsArray.push(obj)
    }))
    arraySetter([...actualArray, ...jsArray])
  }

