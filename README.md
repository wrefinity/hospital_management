# hospital Management System

## modules
1. registeration and login with different roles as doctors, patient, admin, lab-scientist
2. drug purchasing
3. test record adding
4. deaths trackings
5. medical records trackings


### getting started backend

### create your env
```
PORT=
BCRYPT_SALT=
JWT_SECRET=
MONGO_DB_URI =
USER_NAME=admin
EMAIL=admin@admin.com
PASSWORD=
IS_ADMIN=true
```

```
cd backend && npm install
npm start
```

### getting started frontend
### create your env
```
REACT_APP_SERVER_URL=http://localhost:<YOUR-BACKEND-PORT>/api/
REACT_APP_ROLER=admin
REACT_APP_CLOUDINARY_PRESET=
REACT_APP_CLOUDINARY_CLOUD_NAME=
```

```
cd frontend && npm install
npm start
```