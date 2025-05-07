===================== Installation with Helm =================================

# Step 1: Install only MySQL
helm install myapp ./myapp -n myapp --create-namespace \
  --set deploy.mysql=true,deploy.backend=false,deploy.frontend=false

# Step 2: Upgrade and add backend
helm upgrade myapp ./myapp -n myapp \
  --set deploy.mysql=true,deploy.backend=true,deploy.frontend=false

# Step 3: Upgrade and add frontend
helm upgrade myapp ./myapp -n myapp \
  --set deploy.mysql=true,deploy.backend=true,deploy.frontend=true

========================== T-Shoot =======================================

# kubectl run -it --rm --image=nicolaka/netshoot test --restart=Never -n myapp -- bash

# mysql -h 127.0.0.1 -u myuser -pmypass studentdb -e "
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL
);"

# mysql -h 127.0.0.1 -u myuser -pmypass studentdb -e "DESCRIBE students;"

# mysql -h 127.0.0.1 -u myuser -pmypass studentdb -e "SELECT * FROM students;"
