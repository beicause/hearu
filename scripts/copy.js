const fs = require('fs')

fs.cpSync('hearu_webapp/dist', 'hearu_app/app/src/main/assets', { recursive: true })