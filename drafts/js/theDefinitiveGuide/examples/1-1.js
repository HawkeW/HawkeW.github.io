class DefaultMap extends Map {
  constructor (defaultValue) {
    super(); //使用超类构造器
    this.defaultValue = defaultValue; // 记住默认值
  }
  get(key) {
    if(this.has(key)) {
      return super.get(key);
    }
    else {
      return this.defaultValue;
    }
  }
}

class Histogram {
  constructor() {
    this.letterCounts = new DefaultMap(0)
    this.totalLetters = 0
  }
  add(text) {
    text = text.replace(/\s/g, "").toUpperCase()
    for(let character of text) {
      let count = this.letterCounts.get(charater)
      this.letterCounts.set(character, count + 1)
      this.totalLetters++
    }
  }
  toString() {
    // 把映射转换为一个[key, value]数组的数组
    let entries = [...this.letterCounts];

    
    entries.sort((a,b)=>{
      if(a[1] === b[1]) {
        return a[0] < b[0] ? -1 : 1
      }
      else {
        return b[1] - a[1]
      }
    })
  }
}