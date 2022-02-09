const path = require("path")
const express = require("express")
const app = express()
const publicPath = path.join(__dirname, "..", "public")
const port = app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.use(express.static(publicPath))

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"))
})

app.listen(port, () => {
  console.log("Server is up!")
})