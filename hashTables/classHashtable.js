const hashStringToInt = (str, tableSize) => {
  let hash = 17;

  for (let i = 0; i < str.length; i++) {
    hash = (13 * hash * str.charCodeAt(i)) % tableSize;
  }

  return hash;
};

class Hashtable {
  table = new Array(3);
  numItems = 0;

  resize = () => {
    //   should be next prime number but keeping it simple
    const newTable = new Array(this.table.length * 2);

    // O(n^2)
    this.table.forEach((item) => {
      if (item) {
        item.forEach(([key, value]) => {
          const index = hashStringToInt(key, newTable.length);
          if (newTable[index]) {
            newTable[index].push([key, value]);
          } else {
            newTable[index] = [[key, value]];
          }
        });
      }
    });
    this.table = newTable;
  };

  setItem = (key, value) => {
    this.numItems++;
    const loadFactor = this.numItems / this.table.length;

    if (loadFactor > 0.8) {
      //   resize table
      this.resize();
    }

    const index = hashStringToInt(key, this.table.length);
    if (this.table[index]) {
      this.table[index].push([key, value]);
    } else {
      this.table[index] = [[key, value]];
    }
  };

  getItem = (key) => {
    const index = hashStringToInt(key, this.table.length);
    if (!this.table[index]) {
      return null;
    }

    // O(n)
    return this.table[index].find((x) => x[0] === key)[1];
  };
}

const myTable = new Hashtable();

console.log(myTable.table.length);

myTable.setItem("firstName", "bob");
myTable.setItem("lastName", "tim");
myTable.setItem("age", 29);
myTable.setItem("dob", "1/2/3");

console.log(myTable.table.length);
console.log(myTable.table);
console.log(myTable.getItem("lastName"));
console.log(myTable.getItem("firstName"));
console.log(myTable.getItem("age"));
console.log(myTable.getItem("dob"));
