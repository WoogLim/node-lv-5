const { sequelize } = require('./models/index.js');

async function main() {
  await sequelize.sync({ force: false });
}

main();
