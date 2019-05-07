import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);

const URI = 'mongodb+srv://MONGO_USER:MONGO_PASSWORD@CLUSTER_URL/DB_NAME?retryWrites=true';

mongoose.connect(URI)
  .then(db => console.log('Mongo Cloud Status: \x1b[35m%s\x1b[0m', 'OK'))
  .catch(err => console.error(err));

module.exports = mongoose;
