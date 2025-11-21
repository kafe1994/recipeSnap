# 🔧 Solución Error: "uv_interface_addresses returned Unknown system error 13"

## 🚨 **El Error:**
```bash
SystemError [ERR_SYSTEM_ERROR]: A system error occurred: uv_interface_addresses returned Unknown system error 13 (Unknown system error 13)
```

Este error ocurre en entornos de servidor sin interfaces de red configuradas correctamente.

---

## ✅ **SOLUCIONES INMEDIATAS:**

### **🥇 Solución 1: Usar Script Especial (RECOMENDADO)**
```bash
# En el directorio recipeSnap-mobile:
bash start-dev.sh

# El script detectará automáticamente el entorno y configurará todo
```

### **🥈 Solución 2: Comando Directo**
```bash
# Ejecutar con host explícito:
npm run dev -- --host 0.0.0.0 --port 5173

# O usando vite directamente:
npx vite --host 0.0.0.0 --port 5173
```

### **🥉 Solución 3: Configurar Variables**
```bash
# Configurar antes de ejecutar:
export VITE_HOST=0.0.0.0
export VITE_PORT=5173
npm run dev
```

---

## 🔧 **CONFIGURACIÓN ACTUALIZADA:**

### **package.json** (YA ACTUALIZADO)
```json
{
  "scripts": {
    "dev": "vite --host 0.0.0.0 --port 5173",
    "dev:local": "vite --host localhost --port 5173",
    "preview": "vite preview --host 0.0.0.0 --port 4173"
  }
}
```

### **vite.config.js** (YA CREADO)
```javascript
export default defineConfig({
  server: {
    host: '0.0.0.0',  // Evita problemas de interfaz
    port: 5173,
    strictPort: false,
    cors: true,
  }
})
```

---

## 🌟 **INSTRUCCIONES PASO A PASO:**

### **Paso 1: Navegar al directorio**
```bash
cd recipeSnap-mobile
```

### **Paso 2: Usar script automático**
```bash
bash start-dev.sh
```

### **Paso 3: Verificar funcionamiento**
```
✅ El servidor debería iniciar sin errores
✅ Mensaje: "Local: http://localhost:5173"
✅ Mensaje: "Network: http://0.0.0.0:5173"
```

### **Paso 4: Acceder desde navegador**
```
🌐 Abrir: http://localhost:5173
📱 O desde móvil: http://IP_DEL_SERVIDOR:5173
```

---

## 🔍 **EXPLICACIÓN TÉCNICA:**

### **¿Por qué ocurre?**
- Vite intenta detectar interfaces de red automáticamente
- En servidores sin interfaz de red configurada falla
- `uv_interface_addresses` es una función interna de Node.js
- Error 13 = "Permission denied" o "Interface not found"

### **¿Por qué se soluciona?**
- Especificar `--host 0.0.0.0` fuerza usar todas las interfaces
- Evita la detección automática que causa el error
- Configuración robusta en `vite.config.js`

---

## 🎯 **PROBAR EN LOCAL:**

### **Desde tu servidor:**
```bash
# Una vez funcionando:
echo "✅ Servidor iniciado exitosamente"
echo "🌐 Accede a: http://localhost:5173"
```

### **Desde otro dispositivo en la red:**
```bash
# Obtener IP del servidor:
hostname -I | awk '{print $1}'

# Acceder desde móvil/otro PC:
# http://IP_DEL_SERVIDOR:5173
```

---

## 🚨 **Si persiste el error:**

### **Solución adicional 1:**
```bash
# Instalar y configurar interfaz de red:
apt-get update
apt-get install iproute2

# O ejecutar:
ip link show lo
```

### **Solución adicional 2:**
```bash
# Usar modo local únicamente:
npm run dev:local

# Esto solo permite acceso local (localhost)
```

### **Solución adicional 3:**
```bash
# Verificar configuración de red:
netstat -tulpn | grep :5173
ss -tulpn | grep :5173
```

---

## ✅ **CHECKLIST FINAL:**

- [ ] Navegar a directorio `recipeSnap-mobile`
- [ ] Ejecutar `bash start-dev.sh`
- [ ] Verificar que NO hay errores en consola
- [ ] Confirmar mensajes: "Local: http://localhost:5173"
- [ ] Abrir navegador en http://localhost:5173
- [ ] Verificar que la app carga correctamente
- [ ] Probar subir imagen y generar receta

---

## 🆘 **¿Aún tienes problemas?**

1. **Verificar versión de Node.js:**
   ```bash
   node --version  # Debe ser >= 16
   npm --version   # Debe ser >= 8
   ```

2. **Limpiar caché:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Usar versión específica de Vite:**
   ```bash
   npm install vite@5.4.19 --save-dev
   ```

**¡El error debería estar resuelto! 🎉**