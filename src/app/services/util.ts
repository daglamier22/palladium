export function determineServerURL(): string {
  const serverPorts = [
    {
      serverName: 'LOCAL',
      hostName: 'localhost',
      sourcePort: '4200',
      destinationProtocol: 'http',
      destinationHostName: 'localhost',
      destinationPort: 3000
    },
    {
      serverName: 'LOCAL',
      hostName: 'localhost',
      sourcePort: '8080',
      destinationProtocol: 'http',
      destinationHostName: 'localhost',
      destinationPort: 3000
    },
    {
      serverName: 'DEV',
      hostName: 'budget-palladium.herokuapp.com',
      sourcePort: '443',
      destinationProtocol: 'https',
      destinationHostName: 'budget-vibranium.herokuapp.com',
      destinationPort: 443
    }
  ];
  let port = 80;
  let sourcePort: string = window.location.port;
  let destinationProtocol: string = '';
  let destinationHostName: string = '';

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
      destinationProtocol = serverPorts[i].destinationProtocol;
      destinationHostName = serverPorts[i].destinationHostName;
      break;
    }
  }
  return destinationProtocol + '://' + destinationHostName + ':' + port;
}
