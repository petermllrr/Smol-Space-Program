const date = new Date();

module.exports = {
  "year": date.getFullYear(),
  "yyyymmdd": date.toISOString().split('T')[0],
  "formatted": new Intl.DateTimeFormat('en-US',{ year: 'numeric', month: 'long', day: 'numeric' }).format(date)
}
