import { dependencies, sh } from "src/Utils/Utils"

const WP = `${Utils.HOME}/.config/swww/`

class Wallpaper extends Service {
  static {
    Service.register(this, {}, {
      "wallpaper": ["string"],
    })
  }
  #blockMonitor = false

  #wallpaper(path: string) {
    if (!dependencies("swww"))
      return

    const removeCommand = `rm ${WP}current.set`
    const linkCommand = `ln -s ${path} ${WP}current.set`;

    console.log("Remove Command", removeCommand);
    console.log("Link Command", linkCommand);
    sh(removeCommand).then(() => this.changed("wallpaper"));
    sh(linkCommand).then(() => this.changed("wallpaper"));

    sh("hyprctl cursorpos").then(pos => {
      sh([
        "swww", "img",
        "--invert-y",
        "--transition-type", "grow",
        "--transition-pos", pos.replace(" ", ""),
        path!,
      ]).then(() => {
        this.changed("wallpaper")
      })
    })
  }

  async #setWallpaper(path: string) {
    this.#blockMonitor = true
    this.#wallpaper(path)
    this.#blockMonitor = false
  }

  readonly set = (path: string) => {
    console.log("New Wallpaper", path);
    this.#setWallpaper(path)
  }
  get wallpaper() { return WP }

  constructor() {
    super()

    if (!dependencies("swww"))
      return this

    // Utils.monitorFile(WP, () => {
    //   if (!this.#blockMonitor)
    //     this.#wallpaper(WP + "current.set")
    // })

    Utils.execAsync("swww-daemon")
      .then(this.#wallpaper)
      .catch(() => null)
  }
}

export default new Wallpaper
