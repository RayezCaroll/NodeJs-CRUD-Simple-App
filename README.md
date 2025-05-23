===================== Installation with Helm =================================

# Step 1: Install only MySQL
helm install myapp ./myapp -n myapp --create-namespace --set deploy.mysql=true,deploy.backend=false,deploy.frontend=false

# Step 2: Upgrade and add backend
helm upgrade myapp ./myapp -n myapp --set deploy.mysql=true,deploy.backend=true,deploy.frontend=false

# Step 3: Upgrade and add frontend
helm upgrade myapp ./myapp -n myapp --set deploy.mysql=true,deploy.backend=true,deploy.frontend=true

# Step 4: Install MetalLB - inside metallb dir
kubectl apply -f metallb-native.yaml
kubectl apply -f metallb-config.yaml

# Step 5: Install Ingress Controller - inside ingress dir
kubectl apply -f deploy.yaml
kubectl apply -f frontend-ingress.yaml

========================== T-Shoot =======================================

# kubectl get ingress -n myapp

# kubectl get all -n metallb-system

# kubectl get svc -n ingress-nginx

# kubectl run -it --rm --image=nicolaka/netshoot test --restart=Never -n myapp -- bash

# mysql -h 127.0.0.1 -u myuser -pmypass studentdb -e "
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL
);"

# mysql -h 127.0.0.1 -u myuser -pmypass studentdb -e "DESCRIBE students;"

# mysql -h 127.0.0.1 -u myuser -pmypass studentdb -e "SELECT * FROM students;"

=============================================================================
