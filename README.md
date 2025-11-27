# Pawty Server - Variables d'environnement requises

## Configuration Vercel

Sur Vercel, configurez les variables d'environnement suivantes :

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
TOKEN_SECRET=your-super-secret-jwt-token
CLOUD_NAME=your-cloudinary-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret
ORIGIN=https://pawty.netlify.app,http://localhost:5173
PORT=5005
```

## Notes importantes

- `MONGODB_URI` doit pointer vers votre cluster MongoDB Atlas
- Assurez-vous que l'IP `0.0.0.0/0` est autorisée dans MongoDB Atlas Network Access
- Vercel définit automatiquement `NODE_ENV=production`
