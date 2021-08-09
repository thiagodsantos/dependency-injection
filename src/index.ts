// Libraries
import 'module-alias/register';
import 'reflect-metadata';

// Bootstrap
import { app } from "@src/bootstrap";

// Infrastructure
import { connect as databaseConnect } from "@src/infrastructure/database/mongodb";
import { disconnect as databaseDisconnect } from "@src/infrastructure/database/mongodb";

// Start server
(async () => {
  try {
    await databaseConnect();
    app.listen(process.env.PORT, () => console.log('Server running on port :' + process.env.PORT));
  } catch (error) {
    await databaseDisconnect();
    console.error(error);
    process.exit(1);
  }
})();
