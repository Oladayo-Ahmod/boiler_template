module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    await deploy('Escrow', {
      from: deployer,
      args: [], // contract argument
      log: true,
    });
  };
  module.exports.tags = ['Escrow'];