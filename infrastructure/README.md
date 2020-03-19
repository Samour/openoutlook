# Deploy Process

## Infrastructure

### Cloudformation

Create changeset:

```
aws cloudformation deploy --no-execute-changeset --template-file Cloudformation.yaml --stack-name OpenOutlook
```

The changeset can then be reviewed & executed via AWS web interface

### Server environment

1. Install dependencies (Nginx, Node) `setup_environment.sh`

2. Deploy configuration `deploy_config.sh all`

## App deployment

### Frontend

1. Update .env file and robots.txt for environment

2. `npm build`

3. Deploy to EC2 `deploy.sh fe production|staging`

### Backend

1. Build strapi frontend `NODE_ENV=production|staging npm run build`

2. `deploy.sh be production|staging`

### Database

DB can be deployed with `deploy.sh db production|staging`

This will erase any existing DB though, so only deploy in this way if no prod data needs to be retained (esp. enquiries table)

DB & uploaded files can be fetched by using `deploy.sh fetch-db production|staging`
