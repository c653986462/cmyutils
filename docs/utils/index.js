const fs = require('fs')
fs.readdir('./docs/md', (err, files) => {
  if (err) {
    console.log(err)
  } else {
    const sidebar = files.filter((item) => item.indexOf('.md') > -1 && item !== 'index.md')
    sidebar.sort((a, b) => {
      return a - b
    })
    console.log(1, sidebar)
    const sidebarFull = sidebar.map((item) => ({
      title: item.substr(0, item.length - 3),
      sidebarDepth: 2,
      path: '/md/' + item,
    }))
    const content = `export default${JSON.stringify(sidebarFull)}`
    console.log(content)
    fs.writeFile('./docs/utils/sidebar.js', content, { encoding: 'utf8' }, (err) => {
      console.log(err)
    })
  }
})
