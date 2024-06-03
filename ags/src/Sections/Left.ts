
const HyprlandService = await Service.import("hyprland");
const SystemTrayService = await Service.import('systemtray')

const revealSystray = Variable(false)

const SysTray = Widget.Box({
  children: SystemTrayService.bind('items').as(items => {
    return items.map(item => {
      return Widget.Button({
        cursor: "pointer",
        widthRequest: 16,
        heightRequest: 16,
        child: Widget.Icon().bind('icon', item, 'icon'),
        onPrimaryClick: (_, event) => item.activate(event),
        onSecondaryClick: (_, event) => item.openMenu(event),
      });
    });
  }),
});

const WorkspaceIndicator = Widget.Box({
  className: "workspace_indicator",
  spacing: 6,
  children: Array.from({ length: 7 }).map((_, i) =>
    Widget.Button({
      className: "workspace",
      hpack: "center",
      cursor: "pointer",
      onPrimaryClick: () =>
        HyprlandService.message(`dispatch workspace ${i + 1}`),
    }).hook(HyprlandService.active.workspace, (self) =>
      self.toggleClassName(
        "active",
        HyprlandService.active.workspace.id === i + 1
      )
    )
  ),
});

export default function() {
  return Widget.Box({
    hpack: "start",
    children: [WorkspaceIndicator, SysTray],
  });
}
