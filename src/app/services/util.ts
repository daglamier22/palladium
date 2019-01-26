export function determineServerURL(): string {
  const serverPorts = [
    { serverName: 'LOCAL', hostName: 'localhost', sourcePort: '4200', destinationHostName: 'localhost', destinationPort: 3000 },
    { serverName: 'DEV', hostName: 'daglamier22.github.io', sourcePort: '443', destinationHostName: 'budget22.herokuapp.com', destinationPort: 443 }
  ];
  let port = 80;
  let sourcePort = window.location.port;

  if (!sourcePort) {
    if (window.location.protocol === 'http') {
      sourcePort = '80';
    } else {
      sourcePort = '443';
    }
  }

  for (let i = 0; i < serverPorts.length; i++) {
    if (window.location.hostname === serverPorts[i].hostName && sourcePort === serverPorts[i].sourcePort) {
      port = serverPorts[i].destinationPort;
      break;
    }
  }
  return window.location.protocol + '//' + window.location.hostname + ':' + port;
}
