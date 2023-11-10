import app from './app.js';
import { connectToDatabase } from './database/connection.js';
//connections and listners
connectToDatabase()
    .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log(`Server is open & connected to database`);
    });
}).catch((error) => {
    console.log(error.message);
});
//# sourceMappingURL=index.js.map