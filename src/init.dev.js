System.trace = true;
System.import('capaj/systemjs-hot-reloader').then(function(HotReloader){
  hr = new HotReloader.default('http://localhost:9001');  // chokidar-socket-emitter port
}).then(function() {
  return System.import('index.dev').then(function () {
    console.log('App initialised at: ', new Date())
  })
});