import Calendar from "src/Panels/Calendar";
import ControlPanel from "src/Panels/ControlPanel";

const BatteryService = await Service.import("battery");


const TimeIndicator = Widget.Button({
	attribute: Calendar(),
	className: "bar-button",
	hpack: "center",
	child: Widget.Label().poll(
		1000,
		(self) => {
			const date = new Date();
			const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
			const time = date.toLocaleTimeString().split(" ")[0].split(":").slice(0, 2).join(":") + " " + date.toLocaleTimeString().split(" ")[1];
			self.set_text(days[date.getDay()] + " " + time);
			self.css = "font-weight: 400; font-size: 12px;";
		}
	),
	onClicked: (self) => self.attribute.toggle(),
});

const ControlPanelIndicator = Widget.Button({
	className: "bar-button",
	attribute: ControlPanel(),
	child: Widget.Box({
		spacing: 12,
		children: [
			Widget.Icon({
				icon: "wifi-on",
				size: 16,
			}),
			Widget.Icon({
				icon: "control-panel",
				size: 16,
			}),
		],
	}),
	onClicked: (self) => self.attribute.toggle(),
});

const BatteryIcon = (charging: boolean) => Widget.Icon({
	icon: BatteryService.bind("percent").as(percent => {
		const roundedBatteryLevel = Math.round(percent / 10) * 10;
		if (roundedBatteryLevel <= 10) {
			return "battery_critical";
		} else if (roundedBatteryLevel <= 20) {
			return "battery" + (charging ? "_charging" : "") + "_20";
		} else if (roundedBatteryLevel <= 30) {
			return "battery" + (charging ? "_charging" : "") + "_30";
		} else if (roundedBatteryLevel <= 50) {
			return "battery" + (charging ? "_charging" : "") + "_50";
		} else if (roundedBatteryLevel <= 60) {
			return "battery" + (charging ? "_charging" : "") + "_60";
		} else if (roundedBatteryLevel <= 80) {
			return "battery" + (charging ? "_charging" : "") + "_80";
		} else if (roundedBatteryLevel <= 90) {
			return "battery" + (charging ? "_charging" : "") + "_90";
		} else {
			return "battery" + (charging ? "_charging" : "") + "_full";
		}
	}),
	size: 18,
});

const BatteryIndicator = Widget.Button({
	className: "bar-button",
	child: Widget.Box({
		spacing: 4,
		children: [
			Widget.Stack({
				children: {
					charging: BatteryIcon(true),
					discharging: BatteryIcon(false),
				},
				shown: BatteryService.bind("charging").as(charging => charging ? "charging" : "discharging"),
			}),
			Widget.Label({
				label: BatteryService.bind("percent").as(percent => percent + "%"),
				css: "font-size: 12px;",
			}),
		],
	}),
})

export default function() {
	return Widget.Box({
		hpack: "end",
		children: [
			ControlPanelIndicator,
			BatteryIndicator,
			TimeIndicator,
		],
	});
}
