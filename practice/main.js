class Thing {
  #name = 'Roberto';
  constructor(){
    this.#name = 'Luigi';
  }
}

let instance = new Thing();
console.log(instance.name);
