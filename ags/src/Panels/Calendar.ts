import PanelController from "src/Utils/PanelController";
import { calendarRevealer } from "./revealers";

export default function() {
  App.addWindow(
    Widget.Window({
      name: "calendar",
      layer: "overlay",
      monitor: 1,
      anchor: ['top', 'right'],
      margins: [8, 8, 0, 0],
      child: Widget.Box({
        className: "widget-container",
        child: Widget.Revealer({
          revealChild: calendarRevealer.bind(),
          transition: 'slide_down',
          transitionDuration: 250,
          child: Widget.Calendar({
            className: "widget",
            showDayNames: true,
            showWeekNumbers: false,
            vpack: "center",
          }),
        }),
      }),
    })
  )
  return PanelController(calendarRevealer);
}
