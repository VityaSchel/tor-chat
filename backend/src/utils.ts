import { networkInterfaces } from 'os'

export const getIP = () => {
  const nets = networkInterfaces()
  const results = {}

  for (const [name, netList] of Object.entries(nets)) {
    results[name] = netList
      .filter(net => {
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        return net.family === familyV4Value && !net.internal
      })
      .map(net => net.address)
  }

  return results['en0'][0]
}
