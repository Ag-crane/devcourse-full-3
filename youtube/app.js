const express = require('express');
const app = express();

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
})
app.use(express.json());

const userRouter = require('./routes/users');
const channelRouter = require('./routes/channels');

app.use("/", userRouter);
app.use("/channels", channelRouter);