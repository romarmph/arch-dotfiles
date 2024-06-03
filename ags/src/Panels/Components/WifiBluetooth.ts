import { Button } from "resource:///com/github/Aylur/ags/widgets/button.js";
import Asusctl from "src/Services/Asusctl";
import Gtk from "types/@girs/gtk-3.0/gtk-3.0";

const NetworkService = await Service.import("network");
const BluetoothService = await Service.import("bluetooth");


const ButtonContents = ({ icon, label }) => Widget.Box({
  spacing: 8,
  children: [
    Widget.Icon({
      icon: icon,
      size: 16,
    }),
    Widget.Label({
      label: label,
    }),
  ],
});

const WifiButton = () => Widget.Button({
  setup: (self) => {
    self.hook(NetworkService, (self) => {
      self.child = ButtonContents({
        icon: NetworkService.wifi.enabled ? "wifi-on" : "wifi-off",
        label: NetworkService.wifi.ssid ? NetworkService.wifi.ssid : "Wi-Fi",
      });
      self.class_name = NetworkService.wifi.enabled ? "widget-button active" : "widget-button";
      self.on_clicked = () => NetworkService.toggleWifi();
    });
  }
});

const BluetoothButton = () => Widget.Button({
  setup: (self) => {
    self.hook(BluetoothService, (self) => {
      self.child = ButtonContents({
        icon: BluetoothService.enabled ? "bluetooth_enabled" : "bluetooth_disabled",
        label: BluetoothService.connected_devices.length ? BluetoothService.connected_devices.map(device => device.name).join(", ") : "Bluetooth",
      });
      self.class_name = BluetoothService.enabled ? "widget-button active" : "widget-button";
      self.on_clicked = () => BluetoothService.toggle();
    });
  }
})

const PowerProfileButton = () => Widget.Button({
  setup: (self) => {
    self.hook(Asusctl, (self) => {
      self.child = ButtonContents({
        icon: "toys",
        label: Asusctl.profile,
      });
      self.class_name = "widget-button";
      self.on_clicked = () => Asusctl.nextProfile();
    });
  }
});

const GPUModeButton = () => Widget.Button({
  setup: (self) => {
    self.hook(Asusctl, (self) => {
      self.child = ButtonContents({
        icon: "memory",
        label: Asusctl.mode,
      });
      self.class_name = "widget-button";
      self.on_clicked = () => Asusctl.nextMode();
    });
  }
});

const Row = (children: Button<Gtk.Widget, unknown>[]) => Widget.Box({
  homogeneous: true,
  spacing: 12,
  children: children,
});

export default function() {
  return Widget.Box({
    className: 'connection_box',
    heightRequest: 48,
    hexpand: true,
    vexpand: true,
    homogeneous: true,
    vertical: true,
    spacing: 12,
    children: [
      Row([WifiButton(), BluetoothButton()]),
      Row([PowerProfileButton(), GPUModeButton()]),
    ],
  })
}
