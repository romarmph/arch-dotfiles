import PanelController from "src/Utils/PanelController";
import BrightnessService from "src/Services/Brightness";
import { controlPanelRevealer } from "./revealers";
import UserHeader from "src/Panels/Components/UserHeader";
import MusicPlayer from "src/Panels/Components/MusicPlayer";
import ControlButtons from "./Components/WifiBluetooth";

const AudioService = await Service.import("audio");

const Slider = ({ icon, value, onChange }) => {
  return Widget.Box({
    spacing: 8,
    children: [
      Widget.Icon({
        icon: icon,
        size: 20,
      }),
      Widget.Slider({
        value: value,
        onChange: onChange,
        className: "slider",
        drawValue: false,
        hexpand: true,
      })
    ]
  })
}

const Sliders = Widget.Box({
  className: "widget-section",
  vertical: true,
  spacing: 12,
  children: [
    Slider({
      icon: "brightness_5",
      value: BrightnessService.bind("screen_value"),
      onChange: ({ value }) => BrightnessService.screen_value = value,
    }),
    Slider({
      icon: "volume_up",
      value: AudioService.speaker.bind("volume"),
      onChange: ({ value }) => AudioService.speaker.volume = value,
    }),
  ]
});


export default function() {
  App.addWindow(
    Widget.Window({
      name: "control-panel",
      layer: "overlay",
      monitor: 1,
      anchor: ['top', 'right'],
      margins: [8, 8, 0, 0],
      child: Widget.Box({
        hexpand: true,
        vexpand: true,
        widthRequest: 400,
        className: "widget-container",
        child: Widget.Revealer({
          revealChild: controlPanelRevealer.bind(),
          transition: 'slide_down',
          transitionDuration: 300,
          child: Widget.Box({
            className: "widget",
            hexpand: true,
            vertical: true,
            spacing: 12,
            vpack: "center",
            children: [
              UserHeader(),
              Sliders,
              ControlButtons(),
              MusicPlayer(),
            ],
          }),
        }),
      }),
    })
  )

  return PanelController(controlPanelRevealer);
}
