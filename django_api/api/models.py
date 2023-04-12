from django.db import models

# Class Producto
class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.FloatField()
    imagen = models.ImageField(upload_to='productos')

#Class Usuario
class Usuario(models.Model):
    email = models.EmailField()
    password = models.CharField(max_length=100)
    admin = models.BooleanField()
    
#Class Carrito
class Carrito(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField
    fecha = models.DateTimeField(auto_now_add=True)

#Class Pedido
class Pedido(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField
    fecha = models.DateTimeField(auto_now_add=True)

#Class Comentario
class Comentario(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    comentario = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)

#Class Valoracion  
class Valoracion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    valoracion = models.IntegerField
    fecha = models.DateTimeField(auto_now_add=True)



