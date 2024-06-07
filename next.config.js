
const nextConfig = {
    api: {
        bodyParser: false,
    },
};

const withNextIntl = require('next-intl/plugin')(
    "./i18s.tsx"
);
 
module.exports = withNextIntl(nextConfig);