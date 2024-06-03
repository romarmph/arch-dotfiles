import Bar from "./src/Bar"

App.config({
  icons: App.configDir + "/src/assets/",
  style: App.configDir + "/out.css",
  windows: [
    Bar(1),
  ],
})

export { }
