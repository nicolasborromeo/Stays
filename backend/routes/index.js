const express = require('express')
const router = express.Router()
const apiRouter = require('./api');

// Static routes WHEN IN PRODUCTION
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    // Serve the frontend's index.html file at the root route
    router.get('/', (req, res) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      return res.sendFile(
        path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
      );
    });

    // Serve the frontend's index.html file at all other routes NOT starting with /api
    router.get(/^(?!\/?api).*/, (req, res) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      return res.sendFile(
        path.resolve(__dirname, '../../frontend', 'dist', 'index.html')
      );
    });

     // Serve the static assets in the frontend's dist folder
     router.use(express.static(path.resolve("../frontend/dist")));

}

//IN DEVELOPMENT
if (process.env.NODE_ENV !== 'production') {
    router.get('/api/csrf/restore', (req, res) => {
      res.cookie('XSRF-TOKEN', req.csrfToken());
      return res.json({});
    });
  }


router.use('/api', apiRouter);

module.exports = router