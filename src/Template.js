export class Template {
  consturctor(plain) {
    this._plainTemplate = plain
    this.type = typeof plain
  }

  validate(data) {
    if (typeof data !== data) {
      return false
    }

    return true
  }
}
