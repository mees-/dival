module.exports = class Result {
  constructor(passed=true, reason='') {
    this.passed = passed;
    this.reason = reason;
  }
}
