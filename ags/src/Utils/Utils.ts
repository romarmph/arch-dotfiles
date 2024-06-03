export async function sh(cmd: string | string[]) {
  return Utils.execAsync(cmd).catch(err => {
    console.error(typeof cmd === "string" ? cmd : cmd.join(" "), err)
    return ""
  })
}


export function dependencies(...bins: string[]) {
  const missing = bins.filter(bin => Utils.exec({
    cmd: `which ${bin}`,
    out: () => false,
    err: () => true,
  }))

  if (missing.length > 0) {
    console.warn(Error(`missing dependencies: ${missing.join(", ")}`))
    Utils.notify(`missing dependencies: ${missing.join(", ")}`)
  }

  return missing.length === 0
}
