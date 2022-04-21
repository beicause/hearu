const fs = require('fs')

const dest = 'app/app/src/main/assets'
if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true })
fs.cpSync('web/dist', dest, { recursive: true })