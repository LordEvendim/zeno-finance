import { AvailableNetworks } from "./networks";

interface DeployedContracts { }

export const contractAddresses: {
  [network in AvailableNetworks]: DeployedContracts;
} = {
  local: {},
  aurora: {},
  auroraTestnet: {},
};
